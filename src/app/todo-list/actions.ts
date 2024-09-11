'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { Todo } from '@/types/todo';
import { TodoSchema } from '@/lib/validations';
import { createTodo } from '@/lib/api';

export async function handleCreateTodo(
  formData: FormData,
): Promise<{ todo?: Todo; error?: string }> {
  try {
    const validatedData = TodoSchema.parse({
      title: formData.get('title'),
      description: formData.get('description'),
    });

    const newTodo = await createTodo({ ...validatedData, completed: false });

    revalidatePath('/todo-list');

    return { todo: newTodo };
  } catch (error) {
    console.error('Error creating todo:', error);

    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }

    return { error: '할 일을 생성하는 데 실패했습니다. 다시 시도해 주세요.' };
  }
}
