import ThemeToggleButton from '@/components/ui/ThemeToggleButton/ThemeToggleButton';
import TodoListContent from '@/components/todo/TodoListContent/TodoListContent';

import { getTodos } from '@/lib/api';

import styles from './TodoListPage.module.scss';

const TodoListPage = async () => {
  const todos = await getTodos();

  return (
    <div className="container">
      <h1 className={styles.title}>Todo List</h1>
      <ThemeToggleButton />
      <TodoListContent initialTodos={todos} />
    </div>
  );
};

export default TodoListPage;
