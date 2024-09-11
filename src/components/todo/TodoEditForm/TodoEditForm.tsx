import Button from '@/components/ui/Button/Button';
import TodoForm from '@/components/todo/TodoForm/TodoForm';

import styles from './TodoEditForm.module.scss';

type TodoEditFormProps = {
  todo: {
    id: string;
    title: string;
    description: string;
  };
};

const TodoEditForm = ({ todo }: TodoEditFormProps) => {
  return (
    <form>
      <TodoForm
        title={todo.title}
        description={todo.description}
        onTitleChange={() => {}}
        onDescriptionChange={() => {}}
        formTitle="Edit Todo"
      />
      <div className={styles.buttonGroup}>
        <Button text="Cancel" theme="dangerous" />
        <Button text="Save" type="submit" theme="primary" />
      </div>
    </form>
  );
};

export default TodoEditForm;
