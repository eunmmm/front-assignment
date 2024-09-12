import { render, screen, fireEvent } from '@testing-library/react';

import TodoItem from './TodoItem';

import { Todo } from '@/types/todo';

const mockOnUpdate = jest.fn();
const mockOnDelete = jest.fn();
const mockOnCheckboxChange = jest.fn();

const mockTodo: Todo = {
  id: '1',
  title: 'Initial Todo',
  description: 'Initial Description',
  completed: false,
};

describe('TodoItem 컴포넌트', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('할 일 항목의 제목과 설명을 렌더링해야 합니다', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
        onCheckboxChange={mockOnCheckboxChange}
      />,
    );

    const titleElement = screen.getByLabelText(/initial todo/i);
    const descriptionElement = screen.getByText(/initial description/i);

    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  it('체크박스를 클릭하면 onCheckboxChange 함수가 호출되어야 합니다', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
        onCheckboxChange={mockOnCheckboxChange}
      />,
    );

    const checkbox = screen.getByLabelText(/initial todo/i);
    fireEvent.click(checkbox);

    expect(mockOnCheckboxChange).toHaveBeenCalledTimes(1);
    expect(mockOnCheckboxChange).toHaveBeenCalledWith(mockTodo, true);
  });

  it('update 버튼을 클릭하면 onUpdate 함수가 호출되어야 합니다', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
        onCheckboxChange={mockOnCheckboxChange}
      />,
    );

    const updateButton = screen.getByRole('button', { name: /update/i });
    fireEvent.click(updateButton);

    expect(mockOnUpdate).toHaveBeenCalledTimes(1);
    expect(mockOnUpdate).toHaveBeenCalledWith(mockTodo);
  });

  it('delete 버튼을 클릭하면 onDelete 함수가 호출되어야 합니다', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
        onCheckboxChange={mockOnCheckboxChange}
      />,
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith(mockTodo.id);
  });
});
