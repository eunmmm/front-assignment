'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Button from '@/components/ui/Button/Button';
import Checkbox from '@/components/ui/Checkbox/Checkbox';
import TodoEditForm from '@/components/todo/TodoEditForm/TodoEditForm';
import AlertDialog from '@/components/todo/AlertDialog/AlertDialog';
import Loading from '@/components/ui/Loading/Loading';
import Toast from '@/components/ui/Toast/Toast';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    setLoading(true);

    try {
      await handleDeleteTodo(todo.id);
      setIsAlertOpen(false);
      router.push('/todo-list');
    } catch (error) {
      setError('Todo 삭제 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    setIsAlertOpen(false);
  };

  const handleCheckboxChange = async (checked: boolean) => {
    setLoading(true);
    try {
      const updatedTodo = { ...todo, completed: checked };
      setCompleted(checked);
      await updateTodo(todo.id, updatedTodo);
    } catch (error) {
      setError('Todo 업데이트 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleToastClose = () => {
    setError(null);
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
          {loading && <Loading />}
          {!loading && (
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
                  <Button
                    text="delete"
                    theme="dangerous"
                    onClick={handleDelete}
                  />
                </div>
              </div>
              <p className={styles.description}>{todo.description}</p>
            </>
          )}
        </>
      )}
      <AlertDialog
        isOpen={isAlertOpen}
        message="정말 삭제하시겠습니까?"
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
      {error && <Toast message={error} onClose={handleToastClose} />}
    </section>
  );
};

export default TodoDetail;
