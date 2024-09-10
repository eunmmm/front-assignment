import Checkbox from '@/components/ui/Checkbox/Checkbox';
import Button from '@/components/ui/Button/Button';

import styles from './TodoItem.module.scss';

type TodoItemProps = {
  title: string;
  description: string;
  completed: boolean;
};

const TodoItem = ({
  title,
  description,
  completed,
}: TodoItemProps): JSX.Element => {
  return (
    <section className={styles.todoItem}>
      <div className={styles.todoContent}>
        <Checkbox label={title} defaultChecked={completed} />
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.buttonGroup}>
        <Button text="update" theme="primary" />
        <Button text="delete" theme="dangerous" />
      </div>
    </section>
  );
};

export default TodoItem;
