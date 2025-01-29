import { AppRouteHandler } from "@/types/hono";
import { createRoute } from "@hono/zod-openapi";
import { sign } from "hono/jwt";
import { setSignedCookie } from "hono/cookie";
import { z } from "zod";
import { CreateSessionData } from "@/data/user-session/create-session";
import { getUserData } from "@/data/user/get-user";
import { userSchema } from "@/data/user/schema";
import { formatDateToISO } from "@/utils/date";

export const loginSchema = {
  body: userSchema.pick({
    email: true,
    password: true,
  }),
  response: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
  }),
};

export const loginRoute = createRoute({
  middleware: [],
  security: [{ bearerAuth: [] }],
  method: "post",
  path: "/auth/login",
  tags: ["Auth"],
  summary: "Login",
  description: "Login user and return token",
  request: {
    body: {
      content: {
        "application/json": {
          schema: loginSchema.body,
        },
      },
    },
  },
  responses: {
    201: {
      content: {
        "application/json": {
          schema: loginSchema.response,
        },
      },
      description: "User logged in successfully",
    },
    401: {
      description: "Invalid email or password",
    },
  },
});

export const loginRouteHandler: AppRouteHandler<typeof loginRoute> = async (c) => {
  const dbClient = c.get("dbClient");
  const { email, password } = c.req.valid("json");

  try {
    const user = await getUserData({ dbClient, email });

    if (!user || user.password !== password) {
      return c.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const secretKey = c.env.JWT_SECRET;
    const refreshSecret = c.env.JWT_REFRESH_SECRET;

    const tokenPayload = {
      id_user: user.id_user,
      email: user.email,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + 60 * 15,
    };

    const refreshPayload = {
      id_user: user.id_user,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    };

    const accessToken = await sign(tokenPayload, secretKey, "HS256");
    const refreshToken = await sign(refreshPayload, refreshSecret, "HS256");

    const values = {
      user_id: user.id_user,
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_at: formatDateToISO(new Date(tokenPayload.exp * 1000)),
    };

    const createdSession = await CreateSessionData({ dbClient, values });

    await setSignedCookie(c, "accessToken", accessToken, secretKey, {
      path: "/",
      secure: true,
      maxAge: 15 * 60, // 15 minutes
      httpOnly: true,
      expires: new Date(tokenPayload.exp * 1000),
      sameSite: "Strict",
    });

    await setSignedCookie(c, "refreshToken", refreshToken, refreshSecret, {
      path: "/",
      secure: true,
      maxAge: 7 * 24 * 60 * 60, // 7 days
      httpOnly: true,
      sameSite: "Strict",
    });

    return c.json(
      {
        accessToken: createdSession.access_token,
        refreshToken: createdSession.refresh_token,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Login Error:", err);
    return c.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
