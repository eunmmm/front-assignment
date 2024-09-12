import { render, screen } from '@testing-library/react';

import Toast from './Toast';

describe('Toast 컴포넌트', () => {
  jest.useFakeTimers();

  it('토스트 메시지를 렌더링해야 합니다', () => {
    render(<Toast message="테스트 메시지" onClose={jest.fn()} />);

    const messageElement = screen.getByText(/테스트 메시지/i);
    expect(messageElement).toBeInTheDocument();
  });

  it('지정된 시간 후에 onClose를 호출해야 합니다', () => {
    const onCloseMock = jest.fn();

    render(
      <Toast message="테스트 메시지" onClose={onCloseMock} duration={3000} />,
    );

    jest.advanceTimersByTime(3000);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
