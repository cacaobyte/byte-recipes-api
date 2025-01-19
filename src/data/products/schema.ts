import { z } from "zod";

export const productsSchema = z.object({
    id: z.string().uuid(),
    create_at: z.union([z.coerce.date(), z.string()]).openapi({
        example: new Date().toISOString()
    }),
    update_at: z.union([z.coerce.date(), z.string()]).openapi({
        example: new Date().toISOString()
    }),
    deleted_at: z.union([z.coerce.date(), z.string()]).nullable().optional().openapi({
        example: null
    }),
    name: z.string().openapi({
        example: "Product 1"
    }),
    description: z.string().nullable().optional().openapi({
        example: 'Some Description'
    }),
    price: z.number().openapi({
        example: 99.99
    }),
})

export const productsOpenApiSchema = productsSchema.openapi('Product')