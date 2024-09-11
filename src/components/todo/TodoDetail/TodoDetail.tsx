'use client';

import { Todo } from '@/types/todo';

import Button from '@/components/ui/Button/Button';
import Checkbox from '@/components/ui/Checkbox/Checkbox';

import styles from './TodoDetail.module.scss';

type TodoDetailProps = {
  todo: Todo;
};

const TodoDetail = ({ todo }: TodoDetailProps) => {
  return (
    <section className={styles.todoDetail}>
      <div className={styles.header}>
        <Checkbox
          label={todo.title}
          defaultChecked={todo.completed}
          onChange={() => {}}
        />
        <div className={styles.buttonGroup}>
          <Button text="update" theme="primary" />
          <Button text="delete" theme="dangerous" />
        </div>
      </div>
      <p className={styles.description}>{todo.description}</p>
    </section>
  );
};

export default TodoDetail;
