import { Todo } from '@/types/todo';
import { TodoSchema } from './validations';
import { handleCreateTodo, handleUpdateTodo } from '@/app/todo-list/actions';

export function validateTodoForm(title: string, description: string) {
  const validation = TodoSchema.safeParse({ title, description });

  if (!validation.success) {
    return validation.error.errors[0].message;
  }

  return null;
}

export async function submitTodoForm(
  mode: 'create' | 'update',
  todoId: string | undefined,
  title: string,
  description: string,
  onSuccess: (todo: Todo) => void,
  onError: (error: string) => void,
  onClose: () => void,
) {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);

  const result =
    mode === 'create'
      ? await handleCreateTodo(formData)
      : await handleUpdateTodo(todoId!, formData);

  if (result.error) {
    onError(result.error);
  } else if (result.todo) {
    onSuccess(result.todo);
    onClose();
  }
}
