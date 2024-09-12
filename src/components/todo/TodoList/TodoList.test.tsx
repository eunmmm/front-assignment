import { render, screen } from '@testing-library/react';

import TodoList from './TodoList';

import { Todo } from '@/types/todo';

const mockOnUpdate = jest.fn();
const mockOnDelete = jest.fn();
const mockOnCheckboxChange = jest.fn();

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

describe('TodoList 컴포넌트', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('할 일 목록을 렌더링해야 합니다', () => {
    render(
      <TodoList
        todos={mockTodos}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
        onCheckboxChange={mockOnCheckboxChange}
      />,
    );

    const firstTodoTitle = screen.getByLabelText(/test todo 1/i);
    const secondTodoTitle = screen.getByLabelText(/test todo 2/i);

    expect(firstTodoTitle).toBeInTheDocument();
    expect(secondTodoTitle).toBeInTheDocument();
  });
});
