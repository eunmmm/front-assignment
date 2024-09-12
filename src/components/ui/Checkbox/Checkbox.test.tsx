import { render, screen, fireEvent } from '@testing-library/react';

import Checkbox from './Checkbox';

describe('Checkbox 컴포넌트', () => {
  it('체크박스가 렌더링되어야 합니다', () => {
    render(<Checkbox label="테스트 체크박스" />);

    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByText('테스트 체크박스');

    expect(checkbox).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it('초기 체크 상태가 설정되어야 합니다', () => {
    render(<Checkbox label="테스트 체크박스" checked={true} />);

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('체크박스 클릭 시 상태가 변경되어야 합니다', () => {
    const handleChange = jest.fn();

    render(<Checkbox label="테스트 체크박스" onChange={handleChange} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(true);
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalledWith(false);
  });
});
