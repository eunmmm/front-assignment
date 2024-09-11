'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Button from '@/components/ui/Button/Button';
import Checkbox from '@/components/ui/Checkbox/Checkbox';
import TodoEditForm from '@/components/todo/TodoEditForm/TodoEditForm';
import AlertDialog from '@/components/todo/AlertDialog/AlertDialog';

import { Todo } from '@/types/todo';
import { handleDeleteTodo } from '@/app/todo-list/actions';
import { updateTodo } from '@/lib/api';

import styles from './TodoDetail.module.scss';

type TodoDetailProps = {
  todo: Todo;
};

const TodoDetail = ({ todo }: TodoDetailProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [completed, setCompleted] = useState(todo.completed);

  const router = useRouter();

  const handleUpdateSuccess = () => {
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    setIsAlertOpen(true);
  };

  const handleDeleteConfirm = async () => {
    await handleDeleteTodo(todo.id);
    setIsAlertOpen(false);
    router.push('/todo-list');
  };

  const handleDeleteCancel = () => {
    setIsAlertOpen(false);
  };

  const handleCheckboxChange = async (checked: boolean) => {
    const updatedTodo = { ...todo, completed: checked };
    setCompleted(checked);
    await updateTodo(todo.id, updatedTodo);
  };

  return (
    <section className={styles.todoDetail}>
      {isEditing ? (
        <TodoEditForm
          todo={todo}
          onCancel={handleCancelEdit}
          onSuccess={handleUpdateSuccess}
        />
      ) : (
        <>
          <div className={styles.header}>
            <Checkbox
              label={todo.title}
              checked={completed}
              onChange={handleCheckboxChange}
            />
            <div className={styles.buttonGroup}>
              <Button
                text="update"
                theme="primary"
                onClick={() => setIsEditing(true)}
              />
              <Button text="delete" theme="dangerous" onClick={handleDelete} />
            </div>
          </div>
          <p className={styles.description}>{todo.description}</p>
        </>
      )}
      <AlertDialog
        isOpen={isAlertOpen}
        message="정말 삭제하시겠습니까?"
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </section>
  );
};

export default TodoDetail;
