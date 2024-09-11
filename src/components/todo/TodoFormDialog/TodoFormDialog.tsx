'use client';

import { useState, useEffect } from 'react';

import Dialog from '@/components/ui/Dialog/Dialog';
import Button from '@/components/ui/Button/Button';
import TodoForm from '@/components/todo/TodoForm/TodoForm';
import AlertDialog from '@/components/todo/AlertDialog/AlertDialog';
import Loading from '@/components/ui/Loading/Loading';
import Toast from '@/components/ui/Toast/Toast';

import { Todo } from '@/types/todo';
import { validateTodoForm, submitTodoForm } from '@/lib/formHandlers';

import styles from './TodoFormDialog.module.scss';

type TodoFormDialogProps = {
  isOpen: boolean;
  mode: 'create' | 'update';
  onClose: () => void;
  onSuccess: (todo: Todo) => void;
  initialTitle?: string;
  initialDescription?: string;
  todoId?: string;
};

const TodoFormDialog = ({
  isOpen,
  mode,
  onClose,
  onSuccess,
  initialTitle = '',
  initialDescription = '',
  todoId,
}: TodoFormDialogProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [error, setError] = useState<string | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setTitle('');
      setDescription('');
      setError(null);
    } else if (mode === 'update') {
      setTitle(initialTitle);
      setDescription(initialDescription);
    }
  }, [isOpen, mode, initialTitle, initialDescription]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errorMessage = validateTodoForm(title, description);

    if (errorMessage) {
      setError(errorMessage);

      return;
    }

    setLoading(true);

    try {
      await submitTodoForm(
        mode,
        todoId,
        title,
        description,
        onSuccess,
        setError,
        onClose,
      );
    } catch (error) {
      setError('Todo 저장 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (
      mode === 'update' &&
      (title !== initialTitle || description !== initialDescription)
    ) {
      setIsAlertOpen(true);
    } else {
      onClose();
    }
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  const handleAlertConfirm = () => {
    setIsAlertOpen(false);
    onClose();
  };

  const handleToastClose = () => {
    setError(null);
  };

  return (
    <>
      <Dialog isOpen={isOpen}>
        <div className={styles.dialogContent}>
          {loading && <Loading />}
          {!loading && (
            <>
              <form onSubmit={handleSubmit} className={styles.form}>
                <TodoForm
                  title={title}
                  description={description}
                  onTitleChange={setTitle}
                  onDescriptionChange={setDescription}
                  formTitle={mode === 'create' ? 'Create Todo' : 'Update Todo'}
                />
                <Button
                  text="Submit"
                  theme="primary"
                  size="medium"
                  type="submit"
                  className={styles.submitButton}
                />
              </form>
              <button
                type="button"
                className={styles.closeButton}
                onClick={handleClose}
              >
                <img src="/icon/icon-close.png" alt="Close" />
              </button>
            </>
          )}
        </div>
      </Dialog>
      <AlertDialog
        isOpen={isAlertOpen}
        message="변경사항이 있습니다. 수정을 취소할까요?"
        onClose={handleAlertClose}
        onConfirm={handleAlertConfirm}
      />
      {error && <Toast message={error} onClose={handleToastClose} />}
    </>
  );
};

export default TodoFormDialog;
