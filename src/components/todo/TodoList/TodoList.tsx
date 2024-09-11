import { Todo } from '@/types/todo';

import TodoItem from '@/components/todo/TodoItem/TodoItem';

interface TodoListProps {
  todos: Todo[];
}

const TodoList = ({ todos }: TodoListProps): React.ReactNode => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
