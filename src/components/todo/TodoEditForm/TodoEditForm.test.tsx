import { render, screen, fireEvent } from '@testing-library/react';

import TodoEditForm from './TodoEditForm';

import { Todo } from '@/types/todo';

describe('TodoEditForm 컴포넌트', () => {
  const mockTodo: Todo = {
    id: '1',
    title: 'Initial Todo',
    description: 'Initial Description',
    completed: false,
  };

  const mockOnCancel = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('초기 렌더링 시 제목과 설명이 표시되어야 합니다', () => {
    render(
      <TodoEditForm
        todo={mockTodo}
        onCancel={mockOnCancel}
        onSubmit={mockOnSubmit}
      />,
    );

    const titleInput = screen.getByDisplayValue(/initial todo/i);
    const descriptionInput = screen.getByDisplayValue(/initial description/i);

    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
  });

  it('Save 버튼 클릭 시 onSubmit 함수가 호출되어야 합니다', () => {
    render(
      <TodoEditForm
        todo={mockTodo}
        onCancel={mockOnCancel}
        onSubmit={mockOnSubmit}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText(/enter todo title/i), {
      target: { value: 'Updated Todo' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter todo description/i), {
      target: { value: 'Updated Description' },
    });

    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith(
      'Updated Todo',
      'Updated Description',
    );
  });

  it('Cancel 버튼 클릭 시 변경사항이 있으면 AlertDialog가 표시되어야 합니다', () => {
    render(
      <TodoEditForm
        todo={mockTodo}
        onCancel={mockOnCancel}
        onSubmit={mockOnSubmit}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText(/enter todo title/i), {
      target: { value: 'Changed Todo' },
    });

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    const alertDialog = screen.getByText(
      /변경사항이 있습니다. 수정을 취소할까요\?/i,
    );
    expect(alertDialog).toBeInTheDocument();
  });

  it('AlertDialog에서 Ok 버튼 클릭 시 onCancel 함수가 호출되어야 합니다', () => {
    render(
      <TodoEditForm
        todo={mockTodo}
        onCancel={mockOnCancel}
        onSubmit={mockOnSubmit}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText(/enter todo title/i), {
      target: { value: 'Changed Todo' },
    });

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    const confirmButton = screen.getByRole('button', { name: /ok/i });
    fireEvent.click(confirmButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });
});
