'use client';

import { useState } from 'react';

import TodoList from '@/components/todo/TodoList/TodoList';
import Button from '@/components/ui/Button/Button';
import TodoFormDialog from '@/components/todo/TodoFormDialog/TodoFormDialog';

import { Todo } from '@/types/todo';

import styles from './TodoListPage.module.scss';

type TodoListClientProps = {
  initialTodos: Todo[];
};

const TodoListClient = ({ initialTodos }: TodoListClientProps) => {
  const [todos, setTodos] = useState(initialTodos);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editTodo, setEditTodo] = useState<Todo | null>(null);

  const handleCreateSuccess = (newTodo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setIsDialogOpen(false);
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

  const openCreateDialog = () => {
    setEditTodo(null);
    setIsDialogOpen(true);
  };

  const openUpdateDialog = (todo: Todo) => {
    setEditTodo(todo);
    setIsDialogOpen(true);
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
        <TodoList todos={todos} onUpdate={openUpdateDialog} />
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
    </>
  );
};

export default TodoListClient;
