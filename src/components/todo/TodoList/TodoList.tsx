import TodoItem from '@/components/todo/TodoItem/TodoItem';

import { Todo } from '@/types/todo';

interface TodoListProps {
  todos: Todo[];
  onUpdate: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

const TodoList = ({ todos, onUpdate, onDelete }: TodoListProps) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;
