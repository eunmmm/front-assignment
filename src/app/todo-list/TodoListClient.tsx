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

  const handleCreateSuccess = (newTodo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setIsDialogOpen(false);
  };

  return (
    <>
      <Button
        text="create"
        theme="primary"
        className={styles.createButton}
        onClick={() => setIsDialogOpen(true)}
      />
      <div className={styles.todoListWrapper}>
        <TodoList todos={todos} />
      </div>
      <TodoFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={handleCreateSuccess}
        mode="create"
      />
    </>
  );
};

export default TodoListClient;
