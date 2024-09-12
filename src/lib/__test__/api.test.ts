import { Todo } from '@/types/todo';
import { getTodos, getTodo, createTodo, updateTodo, deleteTodo } from '../api';
import { fetchWithErrorHandling } from '../api-utils';

jest.mock('@/constants/api', () => ({
  API_URL: 'http://localhost:3001',
}));

jest.mock('../api-utils', () => ({
  fetchWithErrorHandling: jest.fn(),
}));

describe('API 함수 테스트', () => {
  const mockTodos: Todo[] = [
    {
      id: '1',
      title: 'Test Todo 1',
      description: '첫번째 테스트 투두 입니다',
      completed: false,
    },
    {
      id: '2',
      title: 'Test Todo 2',
      description: '두번째 테스트 투두 입니다',
      completed: true,
    },
  ];

  const mockTodo: Todo = {
    id: '1',
    title: 'Test Todo 1',
    description: '첫번째 테스트 투두 입니다',
    completed: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getTodos 함수는 할 일 목록을 반환해야 합니다', async () => {
    (fetchWithErrorHandling as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockTodos),
    });

    const todos = await getTodos();

    expect(fetchWithErrorHandling).toHaveBeenCalledWith(
      'http://localhost:3001/todos',
      { method: 'GET' },
    );
    expect(todos).toEqual(mockTodos);
  });

  it('getTodo 함수는 특정 할 일을 반환해야 합니다', async () => {
    (fetchWithErrorHandling as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockTodo),
    });

    const todo = await getTodo('1');

    expect(fetchWithErrorHandling).toHaveBeenCalledWith(
      'http://localhost:3001/todos/1',
      { method: 'GET' },
    );
    expect(todo).toEqual(mockTodo);
  });

  it('createTodo 함수는 새로 생성된 할 일을 반환해야 합니다', async () => {
    (fetchWithErrorHandling as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockTodo),
    });

    const newTodoData = {
      title: 'New Todo',
      description: 'New Description',
      completed: false,
    };
    const newTodo = await createTodo(newTodoData);

    expect(fetchWithErrorHandling).toHaveBeenCalledWith(
      'http://localhost:3001/todos',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodoData),
      },
    );
    expect(newTodo).toEqual(mockTodo);
  });

  it('updateTodo 함수는 업데이트된 할 일을 반환해야 합니다', async () => {
    (fetchWithErrorHandling as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockTodo),
    });

    const updatedTodoData = {
      title: 'Updated Todo',
      description: 'Updated Description',
      completed: true,
    };
    const updatedTodo = await updateTodo('1', updatedTodoData);

    expect(fetchWithErrorHandling).toHaveBeenCalledWith(
      'http://localhost:3001/todos/1',
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTodoData),
      },
    );
    expect(updatedTodo).toEqual(mockTodo);
  });

  it('deleteTodo 함수는 특정 할 일을 삭제해야 합니다', async () => {
    (fetchWithErrorHandling as jest.Mock).mockResolvedValue({});

    await deleteTodo('1');

    expect(fetchWithErrorHandling).toHaveBeenCalledWith(
      'http://localhost:3001/todos/1',
      { method: 'DELETE' },
    );
  });
});
