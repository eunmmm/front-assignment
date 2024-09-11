'use client';

import { useState } from 'react';

import TodoList from '@/components/todo/TodoList/TodoList';
import Button from '@/components/ui/Button/Button';
import TodoFormDialog from '@/components/todo/TodoFormDialog/TodoFormDialog';
import AlertDialog from '@/components/todo/AlertDialog/AlertDialog';

import { Todo } from '@/types/todo';
import { handleDeleteTodo } from '@/app/todo-list/actions';

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
      await handleDeleteTodo(deleteTodoId);

      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.id !== deleteTodoId),
      );

      setDeleteTodoId(null);
      setIsAlertOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteTodoId(null);
    setIsAlertOpen(false);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditTodo(null);
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
        <TodoList
          todos={todos}
          onUpdate={openUpdateDialog}
          onDelete={handleDelete}
        />
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
    </>
  );
};

export default TodoListClient;
