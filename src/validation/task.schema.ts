import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().trim().min(1,'Title is required').max(100,'Title must be at most 100 characters'),
  description: z.string().trim().max(500,'Description must be at most 500 characters').optional(),
  completed: z.boolean().optional()
});
export const updateTaskSchema = createTaskSchema.partial().refine(value => Object.keys(value).length > 0,{ message:'At least one field is required' });
