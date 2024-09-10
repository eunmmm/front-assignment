'use client';

import TodoDetail from '@/components/todo/TodoDetail/TodoDetail';
import AlertDialog from '@/components/todo/AlertDialog/AlertDialog';

const TodoDetailPage = (): JSX.Element => {
  const todo = {
    id: '1',
    title: 'Todo 1',
    description: '첫번째 투두 입니다.',
    completed: false,
  };

  return (
    <div className="container">
      <TodoDetail todo={todo} />
      <AlertDialog
        isOpen={false}
        onClose={() => {}}
        message="todo를 정말 삭제할까요?"
      />
    </div>
  );
};

export default TodoDetailPage;
