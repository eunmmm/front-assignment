import { render, screen } from '@testing-library/react';

import Dialog from './Dialog';

describe('Dialog 컴포넌트', () => {
  it('isOpen이 true일 때 Dialog가 렌더링되어야 합니다', () => {
    render(
      <Dialog isOpen={true}>
        <p>Dialog 내용</p>
      </Dialog>,
    );

    const dialogContent = screen.getByText('Dialog 내용');
    expect(dialogContent).toBeInTheDocument();
  });

  it('isOpen이 false일 때 Dialog가 렌더링되지 않아야 합니다', () => {
    render(
      <Dialog isOpen={false}>
        <p>Dialog 내용</p>
      </Dialog>,
    );

    const dialogContent = screen.queryByText('Dialog 내용');
    expect(dialogContent).not.toBeInTheDocument();
  });

  it('자식 요소가 렌더링되어야 합니다', () => {
    render(
      <Dialog isOpen={true}>
        <h2>제목</h2>
        <p>본문</p>
        <button>확인</button>
      </Dialog>,
    );

    expect(screen.getByText('제목')).toBeInTheDocument();
    expect(screen.getByText('본문')).toBeInTheDocument();
    expect(screen.getByText('확인')).toBeInTheDocument();
  });
});
