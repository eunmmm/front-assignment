'use client';

import { useState, useEffect } from 'react';

import Button from '@/components/ui/Button/Button';
import TodoForm from '@/components/todo/TodoForm/TodoForm';
import AlertDialog from '@/components/todo/AlertDialog/AlertDialog';

import { Todo } from '@/types/todo';

import styles from './TodoEditForm.module.scss';

type TodoEditFormProps = {
  todo: Todo;
  onCancel: () => void;
  onSubmit: (title: string, description: string) => void;
};

const TodoEditForm = ({ todo, onCancel, onSubmit }: TodoEditFormProps) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  useEffect(() => {
    setTitle(todo.title);
    setDescription(todo.description);
  }, [todo]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(title, description);
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
