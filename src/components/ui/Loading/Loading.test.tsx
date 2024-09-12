import { render, screen } from '@testing-library/react';

import Loading from './Loading';

describe('Loading 컴포넌트', () => {
  it('로딩 텍스트를 렌더링해야 합니다', () => {
    render(<Loading />);

    const loadingText = screen.getByText(/loading.../i);
    expect(loadingText).toBeInTheDocument();
  });
});
