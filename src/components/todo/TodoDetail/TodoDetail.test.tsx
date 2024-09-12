import { useRouter } from 'next/navigation';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import TodoDetail from './TodoDetail';

import { Todo } from '@/types/todo';
import { updateTodo } from '@/lib/api';
import { handleDeleteTodo } from '@/app/todo-list/actions';
import { validateTodoForm, submitTodoForm } from '@/lib/formHandlers';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/app/todo-list/actions', () => ({
  handleDeleteTodo: jest.fn(),
}));

jest.mock('@/lib/api', () => ({
  updateTodo: jest.fn(),
}));

jest.mock('@/lib/formHandlers', () => ({
  validateTodoForm: jest.fn(),
  submitTodoForm: jest.fn(),
}));

describe('TodoDetail 컴포넌트', () => {
  const mockTodo: Todo = {
    id: '1',
    title: 'Test Todo',
    description: 'Test Description',
    completed: false,
  };

  const mockRouter = { push: jest.fn() };
  (useRouter as jest.Mock).mockReturnValue(mockRouter);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('초기 렌더링 시 할 일의 제목, 설명, 완료 상태가 표시되어야 합니다', () => {
    render(<TodoDetail todo={mockTodo} />);
    expect(screen.getByLabelText(/test todo/i)).toBeInTheDocument();
    expect(screen.getByText(/test description/i)).toBeInTheDocument();
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('"update" 버튼 클릭 시 편집 모드로 전환되어야 합니다', () => {
    render(<TodoDetail todo={mockTodo} />);
    const updateButton = screen.getByRole('button', { name: /update/i });
    fireEvent.click(updateButton);

    expect(screen.getByText(/edit todo/i)).toBeInTheDocument();
  });

  it('편집 모드에서 Save 버튼 클릭 시 submitTodoForm 함수가 호출되어야 합니다', async () => {
    (validateTodoForm as jest.Mock).mockReturnValue('');
    render(<TodoDetail todo={mockTodo} />);

    const updateButton = screen.getByRole('button', { name: /update/i });
    fireEvent.click(updateButton);

    fireEvent.change(screen.getByPlaceholderText(/enter todo title/i), {
      target: { value: 'Updated Todo Title' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter todo description/i), {
      target: { value: 'Updated Todo Description' },
    });

    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);

    await waitFor(() => expect(submitTodoForm).toHaveBeenCalledTimes(1));
    expect(submitTodoForm).toHaveBeenCalledWith(
      'update',
      mockTodo.id,
      'Updated Todo Title',
      'Updated Todo Description',
      expect.any(Function),
      expect.any(Function),
      expect.any(Function),
    );
  });

  it('delete 버튼 클릭 시 AlertDialog가 표시되어야 합니다', () => {
    render(<TodoDetail todo={mockTodo} />);
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(screen.getByText(/정말 삭제하시겠습니까\?/i)).toBeInTheDocument();
  });

  it('AlertDialog에서 Ok 버튼 클릭 시 handleDeleteTodo 함수가 호출되어야 합니다', async () => {
    render(<TodoDetail todo={mockTodo} />);
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    const confirmButton = screen.getByRole('button', { name: /ok/i });
    fireEvent.click(confirmButton);

    await waitFor(() => expect(handleDeleteTodo).toHaveBeenCalledTimes(1));
    expect(handleDeleteTodo).toHaveBeenCalledWith('1');
  });

  it('체크박스 클릭 시 updateTodo 함수가 호출되고 완료 상태가 변경되어야 합니다', async () => {
    render(<TodoDetail todo={mockTodo} />);
    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);

    await waitFor(() => expect(updateTodo).toHaveBeenCalledTimes(1));
    expect(updateTodo).toHaveBeenCalledWith(mockTodo.id, {
      ...mockTodo,
      completed: true,
    });
  });

  it('오류 발생 시 Toast 메시지가 표시되어야 합니다', async () => {
    render(<TodoDetail todo={mockTodo} />);
    (handleDeleteTodo as jest.Mock).mockRejectedValue(new Error('삭제 오류'));

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    const confirmButton = screen.getByRole('button', { name: /ok/i });
    fireEvent.click(confirmButton);

    await waitFor(() =>
      expect(
        screen.getByText(/todo 삭제 중 오류가 발생했습니다./i),
      ).toBeInTheDocument(),
    );
  });
});
