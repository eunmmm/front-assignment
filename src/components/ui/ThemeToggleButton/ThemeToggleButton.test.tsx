import { render, screen, fireEvent } from '@testing-library/react';

import ThemeToggleButton from './ThemeToggleButton';

const mockToggleTheme = jest.fn();
jest.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: 'light',
    toggleTheme: mockToggleTheme,
  }),
}));

describe('ThemeToggleButton 컴포넌트', () => {
  it('버튼을 렌더링하고 현재 테마를 표시해야 합니다', () => {
    render(<ThemeToggleButton />);

    const buttonElement = screen.getByRole('button', { name: /light mode/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('버튼 클릭 시 테마를 전환하는 함수를 호출해야 합니다', () => {
    render(<ThemeToggleButton />);

    const buttonElement = screen.getByRole('button', { name: /light mode/i });
    fireEvent.click(buttonElement);
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
});
