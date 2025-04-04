import React, { useState, useEffect } from 'react';
import minibgImg from './assets/Pikachu.jpg';
import { Toaster, toast } from 'sonner';


const TaskApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  

  const PORT = import.meta.env.VITE_PORT || 'http://localhost:5000/tasks';
  const API_URL = PORT 

  // Fetch all tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        
        const data = await response.json();
        setTasks(data);
        setError(null);
      } catch (err) {
        setError('Failed to load tasks. Please try again later.');
        console.error('Error fetching tasks:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Add a new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    
    if (!newTask.trim()) return;
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTask }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add task');
      }
      
      const addedTask = await response.json();
      setTasks([...tasks, addedTask]);
      setNewTask('');
      toast.success('Task added Successfully') 
    } catch (err) {
      setError('Failed to add task. Please try again.');
      console.error('Error adding task:', err);
    }
  };

  // Delete a task
  const handleDeleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new toast.warn('Failed to delete task') 
      }
      
      setTasks(tasks.filter(task => task._id !== id));
      toast.error('Deleted Successfully') 
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div className="max-w-md mx-auto py-5 p-2 bg-white rounded-lg shadow-md">
       <img src={minibgImg} alt="mini-bg-img" className="" />
      <h1 className="text-2xl font-bold text-center my-6">Cognocore Task Manager</h1>
      
      {/* Task Form */}
      <form onSubmit={handleAddTask} className="mb-6">
        <div className="flex">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow px-4 py-2 border rounded-l focus:outline-none"
          />
          <button 
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
          >
            Add
          </button>
          <Toaster position="top-center" expand={false} richColors />
        </div>
      </form>
      
      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      

      {isLoading ? (
        <p className="text-center text-gray-500">Loading tasks...</p>
      ) : (
        <ul className="space-y-2">
          {tasks.length === 0 ? (
            <p className="text-center text-gray-500">No tasks yet. Add one above!</p>
          ) : (
            tasks.map((task) => (
              <li 
                key={task._id} 
                className="flex justify-between items-center p-3 bg-gray-50 rounded"
              >
                <span>{task.title}</span>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default TaskApp;