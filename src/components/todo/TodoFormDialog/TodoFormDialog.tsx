'use client';

import { useState, useEffect } from 'react';

import Dialog from '@/components/ui/Dialog/Dialog';
import Button from '@/components/ui/Button/Button';
import TodoForm from '@/components/todo/TodoForm/TodoForm';

import { Todo } from '@/types/todo';
import { TodoSchema } from '@/lib/validations';
import { handleCreateTodo } from '@/app/todo-list/actions';

import styles from './TodoFormDialog.module.scss';

type TodoFormDialogProps = {
  isOpen: boolean;
  mode: 'create' | 'update';
  onClose: () => void;
  onSuccess: (todo: Todo) => void;
  initialTitle?: string;
  initialDescription?: string;
};

const TodoFormDialog = ({
  isOpen,
  mode,
  onClose,
  onSuccess,
  initialTitle = '',
  initialDescription = '',
}: TodoFormDialogProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [error, setError] = useState<string | null>(null);

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

    const validation = TodoSchema.safeParse({ title, description });

    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const result = await handleCreateTodo(formData);

    if (result.error) {
      setError(result.error);
    } else if (result.todo) {
      onSuccess(result.todo);
      onClose();
    }
  };

  return (
    <Dialog isOpen={isOpen}>
      <div className={styles.dialogContent}>
        {error && <p className={styles.error}>{error}</p>}
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
        <button type="button" className={styles.closeButton} onClick={onClose}>
          <img src="/icon/icon-close.png" alt="Close" />
        </button>
      </div>
    </Dialog>
  );
};

export default TodoFormDialog;
