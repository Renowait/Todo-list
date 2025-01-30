'use client';

import { useState, useEffect } from 'react';

interface Todo {
  id: number;
  task: string;
  status: 'Pending' | 'Completed';
  createdAt: string;
  completedAt?: string;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTask = () => {
    if (newTask.trim() === '') return;
    const newTodo: Todo = {
      id: Date.now(),
      task: newTask,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    setTodos([...todos, newTodo]);
    setNewTask('');
  };

  const editTask = (id: number, updatedTask: string) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, task: updatedTask } : todo
    );
    setTodos(updatedTodos);
  };

  const removeTask = (id: number) => {
    const filteredTodos = todos.filter(todo => todo.id !== id);
    setTodos(filteredTodos);
  };

  const toggleStatus = (id: number) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        const newStatus: 'Pending' | 'Completed' = todo.status === 'Pending' ? 'Completed' : 'Pending';
        const completedAt = newStatus === 'Completed' ? new Date().toISOString() : undefined;
        return { ...todo, status: newStatus, completedAt };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg shadow-md ">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="mb-4">
        <input
          type="text"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          className="border p-2 mr-2"
          placeholder="Add a new task"
        />
        <button onClick={addTask} className="bg-blue-500 text-white p-2">
          Add Task
        </button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className="mb-2">
            <input
              type="text"
              value={todo.task}
              onChange={e => editTask(todo.id, e.target.value)}
              className={`border p-2 mr-2 ${
                todo.status === 'Completed' ? 'line-through' : ''
              }`}
            />
            <button
              onClick={() => toggleStatus(todo.id)}
              className={`p-2 ${
                todo.status === 'Pending' ? 'bg-yellow-500' : 'bg-green-500'
              } text-white mr-2`}
            >
              {todo.status}
            </button>
            <button
              onClick={() => removeTask(todo.id)}
              className="bg-red-500 text-white p-2"
            >
              Remove
            </button>
            <div className="text-sm text-gray-500 mt-1">
              สร้างเมื่อ: {new Date(todo.createdAt).toLocaleString()}
              {todo.status === 'Completed' && todo.completedAt && (
                <>
                  <span className="mx-2">|</span>
                  เสร็จสิน: {new Date(todo.completedAt).toLocaleString()}
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;