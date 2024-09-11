import { getTodo } from '@/lib/api';

import TodoDetail from '@/components/todo/TodoDetail/TodoDetail';
import AlertDialog from '@/components/todo/AlertDialog/AlertDialog';

interface TodoDetailPageProps {
  params: { id: string };
}

const TodoDetailPage = async ({ params }: TodoDetailPageProps) => {
  const todo = await getTodo(params.id);

  return (
    <div className="container">
      <TodoDetail todo={todo} />
      <AlertDialog isOpen={false} message="todo를 정말 삭제할까요?" />
    </div>
  );
};

export default TodoDetailPage;
