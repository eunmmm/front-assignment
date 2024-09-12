import { render, screen, fireEvent } from '@testing-library/react';

import TodoFormDialog from './TodoFormDialog';

const mockOnClose = jest.fn();
const mockOnSubmit = jest.fn();

describe('TodoFormDialog 컴포넌트', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('create 모드에서 폼을 렌더링해야 합니다', () => {
    render(
      <TodoFormDialog
        isOpen={true}
        mode="create"
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />,
    );

    const formTitle = screen.getByText(/create todo/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    expect(formTitle).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('update 모드에서 폼을 렌더링해야 합니다', () => {
    render(
      <TodoFormDialog
        isOpen={true}
        mode="update"
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        initialTitle="Initial Todo"
        initialDescription="Initial Description"
      />,
    );

    const formTitle = screen.getByText(/update todo/i);
    const titleInput = screen.getByDisplayValue(/initial todo/i);
    const descriptionTextarea =
      screen.getByDisplayValue(/initial description/i);

    expect(formTitle).toBeInTheDocument();
    expect(titleInput).toBeInTheDocument();
    expect(descriptionTextarea).toBeInTheDocument();
  });

  it('변경 사항이 있을 때 닫기 버튼 클릭 시 AlertDialog가 표시되어야 합니다', () => {
    render(
      <TodoFormDialog
        isOpen={true}
        mode="update"
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        initialTitle="Initial Title"
        initialDescription="Initial Description"
      />,
    );

    const titleInput = screen.getByPlaceholderText(/enter todo title/i);
    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    const alertMessage = screen.getByText(
      /변경사항이 있습니다. 수정을 취소할까요\?/i,
    );
    expect(alertMessage).toBeInTheDocument();
  });

  it('AlertDialog에서 Ok 버튼 클릭 시 onClose 함수가 호출되어야 합니다', () => {
    render(
      <TodoFormDialog
        isOpen={true}
        mode="update"
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        initialTitle="Initial Title"
        initialDescription="Initial Description"
      />,
    );

    const titleInput = screen.getByPlaceholderText(/enter todo title/i);
    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    const confirmButton = screen.getByRole('button', { name: /ok/i });
    fireEvent.click(confirmButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('AlertDialog에서 Cancel 버튼 클릭 시 AlertDialog가 닫혀야 합니다', () => {
    render(
      <TodoFormDialog
        isOpen={true}
        mode="update"
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        initialTitle="Initial Title"
        initialDescription="Initial Description"
      />,
    );

    const titleInput = screen.getByPlaceholderText(/enter todo title/i);
    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    const alertMessage = screen.queryByText(
      /변경사항이 있습니다. 수정을 취소할까요\?/i,
    );
    expect(alertMessage).not.toBeInTheDocument();
  });
});
