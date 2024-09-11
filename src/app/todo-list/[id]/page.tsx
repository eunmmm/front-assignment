import { getTodo } from '@/lib/api';

import TodoDetail from '@/components/todo/TodoDetail/TodoDetail';
interface TodoDetailPageProps {
  params: { id: string };
}

const TodoDetailPage = async ({ params }: TodoDetailPageProps) => {
  const todo = await getTodo(params.id);

  return (
    <div className="container">
      <TodoDetail todo={todo} />
    </div>
  );
};

export default TodoDetailPage;
