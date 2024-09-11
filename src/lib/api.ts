import { Todo } from '@/types/todo';
import { API_URL } from '@/constants/api';

export async function getTodos(): Promise<Todo[]> {
  try {
    const res = await fetch(`${API_URL}/todos`);

    if (!res.ok) throw new Error('할 일 목록을 가져오는데 실패했습니다.');

    return res.json();
  } catch (error) {
    console.error('네트워크 오류 또는 서버 문제:', error);

    throw new Error('할 일 목록을 가져오는 도중 문제가 발생했습니다.');
  }
}

export async function getTodo(id: string): Promise<Todo> {
  try {
    const res = await fetch(`${API_URL}/todos/${id}`);

    if (!res.ok) throw new Error('할 일을 가져오는데 실패했습니다.');

    return res.json();
  } catch (error) {
    console.error('네트워크 오류 또는 서버 문제:', error);

    throw new Error('할 일을 가져오는 도중 문제가 발생했습니다.');
  }
}
