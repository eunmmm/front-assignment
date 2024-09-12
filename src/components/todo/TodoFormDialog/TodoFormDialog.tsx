'use client';

import { useState, useEffect } from 'react';

import Dialog from '@/components/ui/Dialog/Dialog';
import Button from '@/components/ui/Button/Button';
import TodoForm from '@/components/todo/TodoForm/TodoForm';
import AlertDialog from '@/components/todo/AlertDialog/AlertDialog';

import styles from './TodoFormDialog.module.scss';

type TodoFormDialogProps = {
  isOpen: boolean;
  mode: 'create' | 'update';
  onClose: () => void;
  onSubmit: (title: string, description: string) => void;
  initialTitle?: string;
  initialDescription?: string;
};

const TodoFormDialog = ({
  isOpen,
  mode,
  onClose,
  onSubmit,
  initialTitle = '',
  initialDescription = '',
}: TodoFormDialogProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setTitle('');
      setDescription('');
    } else if (mode === 'update') {
      setTitle(initialTitle);
      setDescription(initialDescription);
    }
  }, [isOpen, mode, initialTitle, initialDescription]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit(title, description);
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

  return (
    <>
      <Dialog isOpen={isOpen}>
        <div className={styles.dialogContent}>
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
        </div>
      </Dialog>
      <AlertDialog
        isOpen={isAlertOpen}
        message="변경사항이 있습니다. 수정을 취소할까요?"
        onClose={handleAlertClose}
        onConfirm={handleAlertConfirm}
      />
    </>
  );
};

export default TodoFormDialog;
