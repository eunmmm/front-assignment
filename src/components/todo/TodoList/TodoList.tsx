import TodoItem from '@/components/todo/TodoItem/TodoItem';

import { Todo } from '@/types/todo';

interface TodoListProps {
  todos: Todo[];
  onUpdate: (todo: Todo) => void;
}

const TodoList = ({ todos, onUpdate }: TodoListProps) => {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onUpdate={onUpdate} />
      ))}
    </div>
  );
};

export default TodoList;
