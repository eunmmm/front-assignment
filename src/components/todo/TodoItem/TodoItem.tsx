import Link from 'next/link';

import { Todo } from '@/types/todo';

import Checkbox from '@/components/ui/Checkbox/Checkbox';
import Button from '@/components/ui/Button/Button';

import styles from './TodoItem.module.scss';

type TodoItemProps = {
  todo: Todo;
};

const TodoItem = ({ todo }: TodoItemProps) => {
  return (
    <section className={styles.todoItem}>
      <div className={styles.todoContent}>
        <Checkbox label={todo.title} defaultChecked={todo.completed} />
        <Link href={`/todo-list/${todo.id}`}>
          <p className={styles.description}>{todo.description}</p>
        </Link>
      </div>
      <div className={styles.buttonGroup}>
        <Button text="update" theme="primary" />
        <Button text="delete" theme="dangerous" />
      </div>
    </section>
  );
};

export default TodoItem;
