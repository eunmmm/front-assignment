import { render, screen, fireEvent } from '@testing-library/react';

import Button from './Button';

describe('Button 컴포넌트', () => {
  it('텍스트로 버튼을 렌더링해야 합니다', () => {
    render(<Button text="Click Me" theme="primary" size="large" />);

    const buttonElement = screen.getByText(/click me/i);

    expect(buttonElement).toBeInTheDocument();
  });

  it('클릭 이벤트를 처리해야 합니다', () => {
    const handleClick = jest.fn();

    render(<Button text="Click Me" onClick={handleClick} />);

    const buttonElement = screen.getByText(/click me/i);
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
