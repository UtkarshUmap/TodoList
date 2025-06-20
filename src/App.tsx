import  { useState } from 'react';
import './App.css';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  const addOrEditTodo = () => {
    if (input.trim() === '') return;

    if (editingId !== null) {
      setTodos(
        todos.map(todo =>
          todo.id === editingId ? { ...todo, text: input.trim() } : todo
        )
      );
      setEditingId(null);
    } else {
      const newTodo: Todo = {
        id: Date.now(),
        text: input.trim(),
        completed: false,
      };
      setTodos([newTodo, ...todos]);
    }

    setInput('');
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setInput('');
    }
  };

  const startEdit = (id: number) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    if (todoToEdit) {
      setInput(todoToEdit.text);
      setEditingId(id);
    }
  };

  return (
    <div className="app-container">
      <h1>ToDo List App</h1>
      <div className="todo-input">
        <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Add a new task"/>
        <button onClick={addOrEditTodo}>{editingId !== null ? 'Update' : 'Add'}</button>
      </div>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <span onClick={() => toggleComplete(todo.id)}>{todo.text}</span>
            <button onClick={() => startEdit(todo.id)}>Edit</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
