import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:3001/tasks/by-deadline');
    setTasks(response.data);
  };

  const addTask = async (e) => {
    e.preventDefault();

    if (!title) {
      alert('Please enter a task.');
      return;
    }

    await axios.post('http://localhost:3001/tasks', { title, deadline });
    setTitle('');
    setDeadline('');
    fetchTasks();
  };

  const toggleCompletion = async (id, isCompleted) => {
    await axios.put(`http://localhost:3001/tasks/${id}`, { isCompleted: !isCompleted });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:3001/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <form onSubmit={addTask}>
        <div className="form-group">
          <label htmlFor="title">Task</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add task..."
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="deadline">Deadline</label>
          <input
            type="datetime-local"
            id="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button type="submit">Add</button>
        </div>
      </form>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => toggleCompletion(task.id, task.isCompleted)}
            />
            {task.title} - Deadline: {task.deadline ? new Date(task.deadline).toLocaleString() : 'No Deadline'}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
