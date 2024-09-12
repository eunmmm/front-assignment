'use client';

import { useState } from 'react';

import TodoList from '@/components/todo/TodoList/TodoList';
import Button from '@/components/ui/Button/Button';
import TodoFormDialog from '@/components/todo/TodoFormDialog/TodoFormDialog';
import AlertDialog from '@/components/todo/AlertDialog/AlertDialog';
import Loading from '@/components/ui/Loading/Loading';
import Toast from '@/components/ui/Toast/Toast';

import { Todo } from '@/types/todo';
import { handleDeleteTodo } from '@/app/todo-list/actions';
import { updateTodo } from '@/lib/api';
import { validateTodoForm, submitTodoForm } from '@/lib/formHandlers';

import styles from './TodoListContent.module.scss';

type TodoListContentProps = {
  initialTodos: Todo[];
};

const TodoListContent = ({ initialTodos }: TodoListContentProps) => {
  const [todos, setTodos] = useState(initialTodos);
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dialogState, setDialogState] = useState({
    isDialogOpen: false,
    isAlertOpen: false,
    deleteTodoId: null as string | null,
  });

  const openDialog = (todo: Todo | null = null) => {
    setEditTodo(todo);
    setDialogState({ ...dialogState, isDialogOpen: true });
  };

  const closeDialog = () => {
    setEditTodo(null);
    setDialogState({ ...dialogState, isDialogOpen: false });
  };

  const handleSuccess = (newTodo: Todo) => {
    setTodos((prevTodos) => {
      const isUpdate =
        newTodo.id && prevTodos.some((todo) => todo.id === newTodo.id);

      if (isUpdate) {
        return prevTodos.map((todo) =>
          todo.id === newTodo.id ? newTodo : todo,
        );
      } else {
        if (!newTodo.id || !prevTodos.some((todo) => todo.id === newTodo.id)) {
          return [...prevTodos, newTodo];
        }

        return prevTodos;
      }
    });

    closeDialog();
  };

  const handleDelete = async () => {
    const { deleteTodoId } = dialogState;

    if (!deleteTodoId) return;

    setLoading(true);

    try {
      await handleDeleteTodo(deleteTodoId);

      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.id !== deleteTodoId),
      );
    } catch {
      setError('Todo 삭제 중 오류가 발생했습니다.');
    } finally {
      setDialogState({
        ...dialogState,
        deleteTodoId: null,
        isAlertOpen: false,
      });

      setLoading(false);
    }
  };

  const handleCheckboxChange = async (todo: Todo, completed: boolean) => {
    setLoading(true);
    try {
      const updatedTodo = { ...todo, completed };

      await updateTodo(todo.id, updatedTodo);

      handleSuccess(updatedTodo);
    } catch {
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
        editTodo ? 'update' : 'create',
        editTodo?.id,
        title,
        description,
        handleSuccess,
        setError,
        closeDialog,
      );
    } catch {
      setError('Todo 저장 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleToastClose = () => setError(null);

  return (
    <>
      {loading && <Loading />}
      <Button
        text="create"
        theme="primary"
        className={styles.createButton}
        onClick={() => openDialog()}
      />
      <div className={styles.todoListWrapper}>
        <TodoList
          todos={todos}
          onUpdate={openDialog}
          onDelete={(id) =>
            setDialogState({
              ...dialogState,
              deleteTodoId: id,
              isAlertOpen: true,
            })
          }
          onCheckboxChange={handleCheckboxChange}
        />
      </div>
      <TodoFormDialog
        isOpen={dialogState.isDialogOpen}
        onClose={closeDialog}
        onSubmit={handleSubmit}
        mode={editTodo ? 'update' : 'create'}
        initialTitle={editTodo?.title || ''}
        initialDescription={editTodo?.description || ''}
      />
      <AlertDialog
        isOpen={dialogState.isAlertOpen}
        message="정말 삭제하시겠습니까?"
        onClose={() => setDialogState({ ...dialogState, isAlertOpen: false })}
        onConfirm={handleDelete}
      />
      {error && <Toast message={error} onClose={handleToastClose} />}
    </>
  );
};

export default TodoListContent;
