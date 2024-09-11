import { z } from 'zod';

export const TodoSchema = z.object({
  title: z
    .string()
    .min(1, '제목은 필수입니다.')
    .max(100, '제목은 100자를 넘을 수 없습니다.'),
  description: z.string().max(500, '설명은 500자를 넘을 수 없습니다.'),
});

export type TodoFormData = z.infer<typeof TodoSchema>;
