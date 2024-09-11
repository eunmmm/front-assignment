import Dialog from '@/components/ui/Dialog/Dialog';
import Button from '@/components/ui/Button/Button';
import TodoForm from '@/components/todo/TodoForm/TodoForm';

import styles from './TodoFormDialog.module.scss';

type TodoFormDialogProps = {
  isOpen: boolean;
  mode: 'create' | 'update';
};

const TodoFormDialog = ({ isOpen, mode }: TodoFormDialogProps) => {
  return (
    <Dialog isOpen={isOpen}>
      <div className={styles.dialogContent}>
        <form className={styles.form}>
          <TodoForm
            title=""
            description=""
            onTitleChange={() => {}}
            onDescriptionChange={() => {}}
            formTitle={mode === 'create' ? 'Create Todo' : 'Update Todo'}
          />
          <Button
            text="Submit"
            theme="primary"
            size="medium"
            className={styles.submitButton}
          />
        </form>
        <button type="button" className={styles.closeButton}>
          <img src="/icon/icon-close.png" alt="Close" />
        </button>
      </div>
    </Dialog>
  );
};

export default TodoFormDialog;
