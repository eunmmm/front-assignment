import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import TodoListContent from './TodoListContent';

import { updateTodo } from '@/lib/api';
import { handleDeleteTodo } from '@/app/todo-list/actions';

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

const { submitTodoForm, validateTodoForm } =
  jest.requireMock('@/lib/formHandlers');

describe('TodoListContent 컴포넌트', () => {
  const mockInitialTodos = [
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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('초기 렌더링 시 할 일 목록을 표시해야 합니다', () => {
    render(<TodoListContent initialTodos={mockInitialTodos} />);

    const todoItems = screen.getAllByRole('checkbox');
    expect(todoItems).toHaveLength(mockInitialTodos.length);
  });

  it('create 버튼 클릭 시 TodoFormDialog가 열려야 합니다', () => {
    render(<TodoListContent initialTodos={mockInitialTodos} />);

    const createButton = screen.getByRole('button', { name: /create/i });
    fireEvent.click(createButton);

    const dialogTitle = screen.getByText(/create todo/i);
    expect(dialogTitle).toBeInTheDocument();
  });

  it('create 모드에서 TodoFormDialog에서 값을 입력하고 Submit 버튼 클릭 시 submitTodoForm 함수가 호출되어야 합니다', async () => {
    validateTodoForm.mockReturnValue('');

    render(<TodoListContent initialTodos={mockInitialTodos} />);

    const createButton = screen.getByRole('button', { name: /create/i });
    fireEvent.click(createButton);

    const dialogTitle = screen.getByText(/create todo/i);
    expect(dialogTitle).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText(/enter todo title/i), {
      target: { value: 'New Todo Title' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter todo description/i), {
      target: { value: 'New Todo Description' },
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(submitTodoForm).toHaveBeenCalledTimes(1));
    expect(submitTodoForm).toHaveBeenCalledWith(
      'create',
      undefined,
      'New Todo Title',
      'New Todo Description',
      expect.any(Function),
      expect.any(Function),
      expect.any(Function),
    );
  });

  it('update 버튼 클릭 시 TodoFormDialog가 update 모드로 열려야 합니다', () => {
    render(<TodoListContent initialTodos={mockInitialTodos} />);

    const updateButton = screen.getAllByRole('button', { name: /update/i })[0];
    fireEvent.click(updateButton);

    const dialogTitle = screen.getByText(/update todo/i);
    expect(dialogTitle).toBeInTheDocument();
  });

  it('update 모드에서 Submit 버튼 클릭 시 submitTodoForm 함수가 호출되어야 합니다', async () => {
    validateTodoForm.mockReturnValue('');

    render(<TodoListContent initialTodos={mockInitialTodos} />);

    const updateButton = screen.getAllByRole('button', { name: /update/i })[0];
    fireEvent.click(updateButton);

    fireEvent.change(screen.getByPlaceholderText(/enter todo title/i), {
      target: { value: 'Updated Todo Title' },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter todo description/i), {
      target: { value: 'Updated Todo Description' },
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(submitTodoForm).toHaveBeenCalledTimes(1));
    expect(submitTodoForm).toHaveBeenCalledWith(
      'update',
      '1',
      'Updated Todo Title',
      'Updated Todo Description',
      expect.any(Function),
      expect.any(Function),
      expect.any(Function),
    );
  });

  it('체크박스 클릭 시 handleCheckboxChange 함수가 호출되어야 합니다', async () => {
    render(<TodoListContent initialTodos={mockInitialTodos} />);

    const checkbox = screen.getByLabelText(/test todo 1/i);
    fireEvent.click(checkbox);

    await waitFor(() => expect(updateTodo).toHaveBeenCalledTimes(1));
    expect(updateTodo).toHaveBeenCalledWith(mockInitialTodos[0].id, {
      ...mockInitialTodos[0],
      completed: true,
    });
  });

  it('delete 버튼 클릭 시 AlertDialog가 열려야 합니다', () => {
    render(<TodoListContent initialTodos={mockInitialTodos} />);

    const deleteButton = screen.getAllByRole('button', { name: /delete/i })[0];
    fireEvent.click(deleteButton);

    const alertMessage = screen.getByText(/정말 삭제하시겠습니까\?/i);
    expect(alertMessage).toBeInTheDocument();
  });

  it('AlertDialog에서 Ok 버튼 클릭 시 handleDelete 함수가 호출되어야 합니다', async () => {
    render(<TodoListContent initialTodos={mockInitialTodos} />);

    const deleteButton = screen.getAllByRole('button', { name: /delete/i })[0];
    fireEvent.click(deleteButton);

    const confirmButton = screen.getByRole('button', { name: /ok/i });
    fireEvent.click(confirmButton);

    await waitFor(() => expect(handleDeleteTodo).toHaveBeenCalledTimes(1));
    expect(handleDeleteTodo).toHaveBeenCalledWith('1');
  });
});
