'use client';

import { useState } from 'react';

import Button from '@/components/ui/Button/Button';
import TodoForm from '@/components/todo/TodoForm/TodoForm';
import AlertDialog from '@/components/todo/AlertDialog/AlertDialog';
import Loading from '@/components/ui/Loading/Loading';
import Toast from '@/components/ui/Toast/Toast';

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
  const [loading, setLoading] = useState(false);

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
        'update',
        todo.id,
        title,
        description,
        onSuccess,
        setError,
        onCancel,
      );
    } catch (error) {
      setError('Todo 업데이트 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
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

  const handleToastClose = () => {
    setError(null);
  };

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <form onSubmit={handleSubmit}>
          <TodoForm
            title={title}
            description={description}
            onTitleChange={setTitle}
            onDescriptionChange={setDescription}
            formTitle="Edit Todo"
          />
          <div className={styles.buttonGroup}>
            <Button
              text="Cancel"
              theme="dangerous"
              onClick={handleCancelClick}
            />
            <Button text="Save" type="submit" theme="primary" />
          </div>
        </form>
      )}
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

export default TodoEditForm;
