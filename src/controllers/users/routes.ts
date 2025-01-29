import { HonoEnv } from "@/types/hono";
import { OpenAPIHono } from "@hono/zod-openapi";
import { createUserRoute, createUserRouteHandler } from "./create-user";


const usersRoutes = new OpenAPIHono<HonoEnv>()
    .openapi(createUserRoute, createUserRouteHandler)

export default usersRoutes;