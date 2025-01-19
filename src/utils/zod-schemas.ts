import { z } from 'zod';

export const paginationSchema = z.object({
  total_pages: z.number(),
  current_page: z.number(),
  next_page: z.number().nullable(),
  previous_page: z.number().nullable(),
});

export const listQuerySchema = z.object({
  limit: z.coerce.number().optional(),
  page: z.coerce.number().optional(),
  sort_by: z.string().optional(),
  order_by: z.enum(['asc', 'desc']).optional(),
  include_archived: z.boolean().optional(),
});
