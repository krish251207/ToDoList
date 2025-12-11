import React, { useState } from 'react';
import { Plus, Trash2, Check } from 'lucide-react';

export default function App() {
  // 1. STATE: Where we store our data
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // 2. FUNCTION: Add a new task
  const addTask = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const newTask = {
      id: Date.now(),
      text: inputValue,
      completed: false
    };

    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  // 3. FUNCTION: Toggle completed status
  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // 4. FUNCTION: Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="app-page">
      <div className="app-container">
        
        <h1 className="header">My Simple To-Do List</h1>

        {/* INPUT FORM */}
        <form onSubmit={addTask} className="todo-form">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new task..."
            className="input-field"
          />
          <button 
            type="submit" 
            className="add-button"
            disabled={inputValue.trim() === ''}
          >
            <Plus size={20} />
          </button>
        </form>

        {/* TASK LIST */}
        <div className="task-list">
          {tasks.length === 0 && (
            <p className="empty-message">No tasks yet! Time to add one.</p>
          )}

          {tasks.map(task => (
            <div 
              key={task.id} 
              className={`task-item ${task.completed ? 'completed' : ''}`}
            >
              <div className="task-content">
                {/* Checkbox Button */}
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`checkbox ${task.completed ? 'checked' : ''}`}
                >
                  {task.completed && <Check size={14} color="#fff" />}
                </button>
                
                {/* Task Text */}
                <span className="task-text">
                  {task.text}
                </span>
              </div>

              {/* Delete Button */}
              <button 
                onClick={() => deleteTask(task.id)}
                className="delete-button"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}