import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';

const Home = () => {
  const [taskName, setTaskName] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskName, setEditingTaskName] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/tasks');
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = async () => {
    if (taskName.trim() === '') return;

    try {
      await axios.post('http://localhost:8080/tasks', {
        name: taskName,
        status: 'open',
      });
      setTaskName('');
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleEditTask = (task) => {
    setEditingTaskId(task.id);
    setEditingTaskName(task.name);
  };

  const handleSaveTask = async (taskId, status) => {
    try {
      await axios.put(`http://localhost:8080/tasks/${taskId}`, {
        name: editingTaskName,
        status,
      });
      setEditingTaskId(null);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8080/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="home-container">
      <h1>Task Manager</h1>
      <div className="task-input">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter task name"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            {editingTaskId === task.id ? (
              <input
                type="text"
                value={editingTaskName}
                onChange={(e) => setEditingTaskName(e.target.value)}
              />
            ) : (
              <span>{task.name}</span>
            )}
            <select
              value={task.status}
              onChange={(e) => handleSaveTask(task.id, e.target.value)}
            >
              <option value="open">Open</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            {editingTaskId === task.id ? (
              <button onClick={() => handleSaveTask(task.id, task.status)}>Save</button>
            ) : (
              <button onClick={() => handleEditTask(task)}>Edit</button>
            )}
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;