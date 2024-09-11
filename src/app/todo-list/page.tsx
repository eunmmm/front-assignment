import TodoListClient from './TodoListClient';

import { getTodos } from '@/lib/api';

import styles from './TodoListPage.module.scss';

const TodoListPage = async () => {
  const todos = await getTodos();

  return (
    <div className="container">
      <h1 className={styles.title}>Todo List</h1>
      <TodoListClient initialTodos={todos} />
    </div>
  );
};

export default TodoListPage;
