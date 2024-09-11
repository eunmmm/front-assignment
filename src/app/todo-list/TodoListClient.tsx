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

import styles from './TodoListPage.module.scss';

type TodoListClientProps = {
  initialTodos: Todo[];
};

const TodoListClient = ({ initialTodos }: TodoListClientProps) => {
  const [todos, setTodos] = useState(initialTodos);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [deleteTodoId, setDeleteTodoId] = useState<string | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openCreateDialog = () => {
    setEditTodo(null);
    setIsDialogOpen(true);
  };

  const handleCreateSuccess = (newTodo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setIsDialogOpen(false);
  };

  const openUpdateDialog = (todo: Todo) => {
    setEditTodo(todo);
    setIsDialogOpen(true);
  };

  const handleUpdateSuccess = (updatedTodo: Todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo,
      ),
    );
    setIsDialogOpen(false);
    setEditTodo(null);
  };

  const handleDelete = (id: string) => {
    setDeleteTodoId(id);
    setIsAlertOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (deleteTodoId) {
      setLoading(true);

      try {
        await handleDeleteTodo(deleteTodoId);

        setTodos((prevTodos) =>
          prevTodos.filter((todo) => todo.id !== deleteTodoId),
        );
      } catch (error) {
        setError('Todo 삭제 중 오류가 발생했습니다.');
      } finally {
        setDeleteTodoId(null);
        setIsAlertOpen(false);
        setLoading(false);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteTodoId(null);
    setIsAlertOpen(false);
  };

  const handleCheckboxChange = async (todo: Todo, completed: boolean) => {
    setLoading(true);

    try {
      const updatedTodo = { ...todo, completed };
      await updateTodo(todo.id, updatedTodo);

      setTodos((prevTodos) =>
        prevTodos.map((todoItem) =>
          todoItem.id === todo.id ? updatedTodo : todoItem,
        ),
      );
    } catch (error) {
      setError('Todo 업데이트 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditTodo(null);
  };

  const handleToastClose = () => {
    setError(null);
  };

  return (
    <>
      <Button
        text="create"
        theme="primary"
        className={styles.createButton}
        onClick={openCreateDialog}
      />
      <div className={styles.todoListWrapper}>
        {loading ? (
          <Loading />
        ) : (
          <TodoList
            todos={todos}
            onUpdate={openUpdateDialog}
            onDelete={handleDelete}
            onCheckboxChange={handleCheckboxChange}
          />
        )}
      </div>
      <TodoFormDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onSuccess={editTodo ? handleUpdateSuccess : handleCreateSuccess}
        mode={editTodo ? 'update' : 'create'}
        initialTitle={editTodo?.title || ''}
        initialDescription={editTodo?.description || ''}
        todoId={editTodo?.id}
      />
      <AlertDialog
        isOpen={isAlertOpen}
        message="정말 삭제하시겠습니까?"
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
      {error && <Toast message={error} onClose={handleToastClose} />}
    </>
  );
};

export default TodoListClient;
