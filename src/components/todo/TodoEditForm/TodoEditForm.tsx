'use client';

import { useState } from 'react';

import Button from '@/components/ui/Button/Button';
import TodoForm from '@/components/todo/TodoForm/TodoForm';
import AlertDialog from '@/components/todo/AlertDialog/AlertDialog';

import { Todo } from '@/types/todo';
import { validateTodoForm, submitTodoForm } from '@/lib/formHandlers';

import styles from './TodoEditForm.module.scss';

type TodoEditFormProps = {
  todo: Todo;
  onCancel: () => void;
  onSuccess: (todo: Todo) => void;
};

const TodoEditForm = ({ todo, onCancel, onSuccess }: TodoEditFormProps) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errorMessage = validateTodoForm(title, description);
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    submitTodoForm(
      'update',
      todo.id,
      title,
      description,
      onSuccess,
      setError,
      onCancel,
    );
  };

  const handleCancelClick = () => {
    if (title !== todo.title || description !== todo.description) {
      setIsAlertOpen(true);
    } else {
      onCancel();
    }
  };

  const handleAlertConfirm = () => {
    setIsAlertOpen(false);
    onCancel();
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TodoForm
          title={title}
          description={description}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
          formTitle="Edit Todo"
        />
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.buttonGroup}>
          <Button text="Cancel" theme="dangerous" onClick={handleCancelClick} />
          <Button text="Save" type="submit" theme="primary" />
        </div>
      </form>

      <AlertDialog
        isOpen={isAlertOpen}
        message="변경사항이 있습니다. 수정을 취소할까요?"
        onClose={handleAlertClose}
        onConfirm={handleAlertConfirm}
      />
    </>
  );
};

export default TodoEditForm;
