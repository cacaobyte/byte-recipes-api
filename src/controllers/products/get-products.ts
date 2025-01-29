import { getProductsData, GetProductsDataArgs } from '@/data/product/get-products';
import { productsOpenApiSchema } from '@/data/product/schema';
import { type AppRouteHandler } from '@/types/hono';
import { listQuerySchema, paginationSchema } from '@/utils/zod-schemas';
import { createRoute, z } from '@hono/zod-openapi';

export const getProductsSchema = {
  query: listQuerySchema,
  response: paginationSchema.extend({
    records: z.array(productsOpenApiSchema),
    total_records: z.number(),
  }),
};

export const getProductsRoute = createRoute({
  middleware: [],
  security: [{ bearerAuth: [] }],
  method: 'get',
  path: '/products',
  tags: ['products'],
  summary: 'List all products',
  description: 'Returns a list of all products',
  request: {
    query: getProductsSchema.query,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: getProductsSchema.response,
        },
      },
      description: 'Products retrieved successfully',
    },
  },
});

export const getProductsRouteHandler: AppRouteHandler<typeof getProductsRoute> = async c => {
  const dbClient = c.get('dbClient');
  const query = c.req.valid('query');

  const data = await getProductsData({
    dbClient,
    sortBy: query?.sort_by as GetProductsDataArgs['sortBy'],
    orderBy: query?.order_by,
    limit: query?.limit,
    page: query?.page,
    includeArchived: query?.include_archived === true,
  });

  return c.json(data, {});
};
