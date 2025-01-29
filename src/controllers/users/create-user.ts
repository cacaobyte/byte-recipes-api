import { CreateUserData } from "@/data/user/create-user"
import { userSchema, userSchemaOpenApi } from "@/data/user/schema"
import { authenticate } from "@/middlewares/authenticate"
import { type AppRouteHandler } from "@/types/hono"
import { NotFoundError } from "@/utils/errors"
import { createRoute } from "@hono/zod-openapi"

export const createUserSchema = {
    body: userSchema.pick({
        email: true,
        password: true,
        name: true,
        is_active: true,
        role: true,
    }),
    response: userSchemaOpenApi
}

export const createUserRoute = createRoute({
    middleware: [authenticate],
    security: [{ bearerAuth: [] }],
    method: "post",
    path: "/users",
    tags: ["Users"],
    summary: "Create a user",
    description: "Create a new user",
    request: {
        body: {
            content: {
                'application/json': {
                    schema: createUserSchema.body
                }
            }   
        }
    },
    responses: {
        201: {
            content: {
                "application/json": {
                    schema: createUserSchema.response
                }
            },
            description: "User created successfully"
        }
    }
})

export const createUserRouteHandler: AppRouteHandler<typeof createUserRoute> = async (c) => {
    const dbClient = c.get('dbClient')
    const body = c.req.valid('json')

    const createdUser = await CreateUserData({dbClient, values: body})

    if(!createdUser) throw new NotFoundError('No user created. Please try again.')

    return c.json(createdUser, {status: 201})
}