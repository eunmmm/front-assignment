import Link from 'next/link';

import { Todo } from '@/types/todo';

import Checkbox from '@/components/ui/Checkbox/Checkbox';
import Button from '@/components/ui/Button/Button';

import styles from './TodoItem.module.scss';

type TodoItemProps = {
  todo: Todo;
  onUpdate: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onCheckboxChange: (todo: Todo, completed: boolean) => Promise<void>;
};

const TodoItem = ({
  todo,
  onUpdate,
  onDelete,
  onCheckboxChange,
}: TodoItemProps) => {
  const handleCheckboxChange = (checked: boolean) => {
    onCheckboxChange(todo, checked);
  };

  return (
    <section className={styles.todoItem}>
      <div className={styles.todoContent}>
        <Checkbox
          label={todo.title}
          checked={todo.completed}
          onChange={handleCheckboxChange}
        />
        <Link href={`/todo-list/${todo.id}`}>
          <p className={styles.description}>{todo.description}</p>
        </Link>
      </div>
      <div className={styles.buttonGroup}>
        <Button text="update" theme="primary" onClick={() => onUpdate(todo)} />
        <Button
          text="delete"
          theme="dangerous"
          onClick={() => onDelete(todo.id)}
        />
      </div>
    </section>
  );
};

export default TodoItem;
