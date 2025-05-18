import { z } from 'zod';

export const paginationSchema = z.object({
  limit: z
    .string()
    .optional()
    .transform(val => parseInt(val || '12'))
    .refine(n => n >= 1 && n <= 50, { message: 'Limit must be between 1 and 50' }),
  offset: z
    .string()
    .optional()
    .transform(val => parseInt(val || '0'))
    .refine(n => n >= 0, { message: 'Offset must be a non-negative number' }),
});

export const searchSchema = paginationSchema.extend({
  q: z.string().min(1, 'Search query is required'),
});
