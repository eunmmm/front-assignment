import { render, screen, fireEvent } from '@testing-library/react';

import TodoForm from './TodoForm';

describe('TodoForm 컴포넌트', () => {
  const mockOnTitleChange = jest.fn();
  const mockOnDescriptionChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('폼 제목, 입력 필드 및 텍스트 영역을 렌더링해야 합니다', () => {
    render(
      <TodoForm
        formTitle="Add Todo"
        title=""
        description=""
        onTitleChange={mockOnTitleChange}
        onDescriptionChange={mockOnDescriptionChange}
      />,
    );

    const formTitleElement = screen.getByText(/add todo/i);
    const titleInput = screen.getByPlaceholderText(/enter todo title/i);
    const descriptionTextarea = screen.getByPlaceholderText(
      /enter todo description/i,
    );

    expect(formTitleElement).toBeInTheDocument();
    expect(titleInput).toBeInTheDocument();
    expect(descriptionTextarea).toBeInTheDocument();
  });

  it('제목 입력 필드의 값이 변경되면 onTitleChange 함수가 호출되어야 합니다', () => {
    render(
      <TodoForm
        formTitle="Add Todo"
        title=""
        description=""
        onTitleChange={mockOnTitleChange}
        onDescriptionChange={mockOnDescriptionChange}
      />,
    );

    const titleInput = screen.getByPlaceholderText(/enter todo title/i);
    fireEvent.change(titleInput, { target: { value: 'New Todo Title' } });

    expect(mockOnTitleChange).toHaveBeenCalledTimes(1);
    expect(mockOnTitleChange).toHaveBeenCalledWith('New Todo Title');
  });

  it('설명 텍스트 영역의 값이 변경되면 onDescriptionChange 함수가 호출되어야 합니다', () => {
    render(
      <TodoForm
        formTitle="Add Todo"
        title=""
        description=""
        onTitleChange={mockOnTitleChange}
        onDescriptionChange={mockOnDescriptionChange}
      />,
    );

    const descriptionTextarea = screen.getByPlaceholderText(
      /enter todo description/i,
    );
    fireEvent.change(descriptionTextarea, {
      target: { value: 'New Todo Description' },
    });

    expect(mockOnDescriptionChange).toHaveBeenCalledTimes(1);
    expect(mockOnDescriptionChange).toHaveBeenCalledWith(
      'New Todo Description',
    );
  });
});
