'use client';

import { useState, useEffect } from 'react';
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
import { validateTodoForm, submitTodoForm } from '@/lib/formHandlers';

import styles from './TodoDetail.module.scss';

type TodoDetailProps = {
  todo: Todo | null;
};

const TodoDetail = ({ todo }: TodoDetailProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [completed, setCompleted] = useState(todo?.completed || false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (!todo) {
      router.push('/todo-list');
    }
  }, [todo, router]);

  if (!todo) {
    return null;
  }

  const handleDelete = async () => {
    setLoading(true);
    setIsAlertOpen(false);

    try {
      await handleDeleteTodo(todo.id);
      router.push('/todo-list');
    } catch (error) {
      setError('Todo 삭제 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (checked: boolean) => {
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

  const handleSubmit = async (title: string, description: string) => {
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
        () => {
          setIsEditing(false);
        },
        setError,
        () => setIsEditing(false),
      );
    } catch (error) {
      setError('Todo 업데이트 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.todoDetail}>
      {isEditing ? (
        <TodoEditForm
          todo={todo}
          onCancel={() => setIsEditing(false)}
          onSubmit={handleSubmit}
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
                  onChange={(checked) => handleUpdate(checked)}
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
                    onClick={() => setIsAlertOpen(true)}
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
        onClose={() => setIsAlertOpen(false)}
        onConfirm={handleDelete}
      />
      {error && <Toast message={error} onClose={() => setError(null)} />}
    </section>
  );
};

export default TodoDetail;
