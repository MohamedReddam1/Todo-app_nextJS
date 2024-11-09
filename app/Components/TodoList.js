"use client"; // Add this line at the top

import { useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const startEditing = (index) => {
    setEditIndex(index);
    setEditText(tasks[index].text);
  };

  const saveEdit = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = editText;
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditText('');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen w-full ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className=" p-6">
        <div className="flex justify-end">
          <button
            onClick={toggleDarkMode}
            className="p-2 text-xl"
          >
            {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
          </button>
        </div>

        <div className={`px-64 py-20 rounded-xl ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-900'}`}>
            <h2 className="text-2xl font-semibold text-center mb-4">To-Do List</h2>
            
            <div className="flex mb-4">
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task"
                className={`flex-grow p-2 border rounded-l-md focus:outline-none ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-900 border-gray-300'} focus:border-blue-500`}
            />
            <button
                onClick={addTask}
                className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600"
            >
                Add
            </button>
            </div>
            
            <ul className="space-y-2">
            {tasks.map((task, index) => (
                <li
                key={index}
                className={`flex justify-between items-center p-2 border rounded-md ${
                    task.completed ? 'line-through' : darkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}
                >
                {editIndex === index ? (
                    <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className={`flex-grow mr-2 border-none outline-none rounded-md ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-900 border-gray-300'}`}
                    />
                ) : (
                    <span
                    onClick={() => toggleTask(index)}
                    className="cursor-pointer flex-grow"
                    >
                    {task.text}
                    </span>
                )}

                {editIndex === index ? (
                    <button
                    onClick={() => saveEdit(index)}
                    className="ml-2 text-green-500 hover:text-green-700"
                    >
                    Save
                    </button>
                ) : (
                    <button
                    onClick={() => startEditing(index)}
                    className="ml-2 text-yellow-500 hover:text-yellow-700"
                    >
                    Edit
                    </button>
                )}
                
                <button
                    onClick={() => deleteTask(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                >
                    Delete
                </button>
                </li>
            ))}
            </ul>
        </div>
        
        
      </div>
    </div>
  );
}
