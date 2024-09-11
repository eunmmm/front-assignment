import TodoItem from '@/components/todo/TodoItem/TodoItem';

import { Todo } from '@/types/todo';

interface TodoListProps {
  todos: Todo[];
  onUpdate: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onCheckboxChange: (todo: Todo, completed: boolean) => Promise<void>;
}

const TodoList = ({
  todos,
  onUpdate,
  onDelete,
  onCheckboxChange,
}: TodoListProps) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onCheckboxChange={onCheckboxChange}
        />
      ))}
    </div>
  );
};

export default TodoList;
