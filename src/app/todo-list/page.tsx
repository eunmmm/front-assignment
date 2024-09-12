import TodoListClient from './TodoListClient';
import ThemeToggleButton from '@/components/ui/ThemeToggleButton/ThemeToggleButton';

import { getTodos } from '@/lib/api';

import styles from './TodoListPage.module.scss';

const TodoListPage = async () => {
  const todos = await getTodos();

  return (
    <div className="container">
      <h1 className={styles.title}>Todo List</h1>
      <ThemeToggleButton />
      <TodoListClient initialTodos={todos} />
    </div>
  );
};

export default TodoListPage;
