import TodoItem from '@/components/todo/TodoItem/TodoItem';

const TodoList = () => {
  const todos = [
    {
      id: 1,
      title: 'Todo 1',
      description: '첫번째 투두 입니다.',
      completed: false,
    },
    {
      id: 2,
      title: 'Todo 2',
      description: '두번째 투두 입니다.',
      completed: true,
    },
    {
      id: 3,
      title: 'Todo 3',
      description: '세번째 투두 입니다.',
      completed: false,
    },
  ];

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          title={todo.title}
          description={todo.description}
          completed={todo.completed}
        />
      ))}
    </div>
  );
};

export default TodoList;
