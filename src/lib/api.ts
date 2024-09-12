import { Todo } from '@/types/todo';
import { API_URL } from '@/constants/api';
import { fetchWithErrorHandling } from './api-utils';

export async function getTodos(): Promise<Todo[]> {
  const res = await fetchWithErrorHandling(`${API_URL}/todos`, {
    method: 'GET',
  });

  const todos: Todo[] = await res.json();

  return todos;
}

export async function getTodo(id: string): Promise<Todo | null> {
  try {
    const res = await fetch(`${API_URL}/todos/${id}`, {
      method: 'GET',
    });

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }

      throw new Error(`요청이 실패했습니다. ${res.status}`);
    }

    const todo: Todo = await res.json();

    return todo;
  } catch (error) {
    console.error('Error in getTodo:', error);

    throw error;
  }
}

export async function createTodo(data: {
  title: string;
  description: string;
  completed: boolean;
}): Promise<Todo> {
  const res = await fetchWithErrorHandling(`${API_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const todo: Todo = await res.json();

  return todo;
}

export async function updateTodo(
  id: string,
  data: {
    title: string;
    description: string;
    completed: boolean;
  },
): Promise<Todo> {
  const res = await fetchWithErrorHandling(`${API_URL}/todos/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const todo: Todo = await res.json();

  return todo;
}

export async function deleteTodo(id: string): Promise<void> {
  await fetchWithErrorHandling(`${API_URL}/todos/${id}`, {
    method: 'DELETE',
  });
}
