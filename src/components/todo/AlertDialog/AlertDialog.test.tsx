import { render, screen, fireEvent } from '@testing-library/react';

import AlertDialog from './AlertDialog';

describe('AlertDialog 컴포넌트', () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('AlertDialog이 열려 있을 때 메시지를 렌더링해야 합니다', () => {
    render(
      <AlertDialog
        isOpen={true}
        message="정말 삭제하시겠습니까?"
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />,
    );

    const messageElement = screen.getByText(/정말 삭제하시겠습니까?/i);
    expect(messageElement).toBeInTheDocument();
  });

  it('Cancel 버튼을 클릭하면 onClose 함수가 호출되어야 합니다', () => {
    render(
      <AlertDialog
        isOpen={true}
        message="정말 삭제하시겠습니까?"
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />,
    );

    const cancelButton = screen.getByRole('button', { name: /cancel/i });

    fireEvent.click(cancelButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('Ok 버튼을 클릭하면 onConfirm 함수가 호출되어야 합니다', () => {
    render(
      <AlertDialog
        isOpen={true}
        message="정말 삭제하시겠습니까?"
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />,
    );

    const okButton = screen.getByRole('button', { name: /ok/i });

    fireEvent.click(okButton);
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it('AlertDialog이 열려 있지 않을 때는 아무것도 렌더링하지 않아야 합니다', () => {
    render(
      <AlertDialog
        isOpen={false}
        message="정말 삭제하시겠습니까?"
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
      />,
    );

    const messageElement = screen.queryByText(/정말 삭제하시겠습니까?/i);
    expect(messageElement).not.toBeInTheDocument();
  });
});
