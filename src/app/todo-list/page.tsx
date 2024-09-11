import { getTodos } from '@/lib/api';

import TodoList from '@/components/todo/TodoList/TodoList';
import Button from '@/components/ui/Button/Button';

import styles from './TodoListPage.module.scss';

const TodoListPage = async () => {
  const todos = await getTodos();

  return (
    <div className="container">
      <h1 className={styles.title}>Todo List</h1>
      <Button text="create" theme="primary" className={styles.createButton} />
      <div className={styles.todoListWrapper}>
        <TodoList todos={todos} />
      </div>
    </div>
  );
};

export default TodoListPage;
