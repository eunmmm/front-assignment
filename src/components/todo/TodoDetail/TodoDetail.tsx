'use client';

import { useState } from 'react';

import Button from '@/components/ui/Button/Button';
import Checkbox from '@/components/ui/Checkbox/Checkbox';
import TodoEditForm from '@/components/todo/TodoEditForm/TodoEditForm';

import { Todo } from '@/types/todo';

import styles from './TodoDetail.module.scss';

type TodoDetailProps = {
  todo: Todo;
};

const TodoDetail = ({ todo }: TodoDetailProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateSuccess = () => {
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
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
              checked={todo.completed}
              onChange={() => {}}
            />
            <div className={styles.buttonGroup}>
              <Button
                text="update"
                theme="primary"
                onClick={() => setIsEditing(true)}
              />
              <Button text="delete" theme="dangerous" />
            </div>
          </div>
          <p className={styles.description}>{todo.description}</p>
        </>
      )}
    </section>
  );
};

export default TodoDetail;
