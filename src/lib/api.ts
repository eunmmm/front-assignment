import { Todo } from '@/types/todo';
import { API_URL } from '@/constants/api';
import { fetchWithErrorHandling } from './api-utils';

export async function getTodos(): Promise<Todo[]> {
  const res = await fetchWithErrorHandling(`${API_URL}/todos`, {
    method: 'GET',
  });

  try {
    const todos: Todo[] = await res.json();

    return todos;
  } catch (error) {
    console.error('응답을 JSON으로 변환하는 중 오류:', error);

    throw new Error('서버 응답을 처리하는 데 문제가 발생했습니다.');
  }
}

export async function getTodo(id: string): Promise<Todo> {
  const res = await fetchWithErrorHandling(`${API_URL}/todos/${id}`, {
    method: 'GET',
  });

  try {
    const todo: Todo = await res.json();

    return todo;
  } catch (error) {
    console.error('응답을 JSON으로 변환하는 중 오류:', error);

    throw new Error('서버 응답을 처리하는 데 문제가 발생했습니다.');
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

  try {
    const todo: Todo = await res.json();

    return todo;
  } catch (error) {
    console.error('응답을 JSON으로 변환하는 중 오류:', error);

    throw new Error('서버 응답을 처리하는 데 문제가 발생했습니다.');
  }
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

  try {
    const todo: Todo = await res.json();

    return todo;
  } catch (error) {
    console.error('응답을 JSON으로 변환하는 중 오류:', error);

    throw new Error('서버 응답을 처리하는 데 문제가 발생했습니다.');
  }
}

export async function deleteTodo(id: string): Promise<void> {
  await fetchWithErrorHandling(`${API_URL}/todos/${id}`, {
    method: 'DELETE',
  });
}
