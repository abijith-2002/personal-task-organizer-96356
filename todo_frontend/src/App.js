import React, { useEffect, useMemo, useState } from 'react';
import './styles/common.css';
import './styles/figma-todo.css';
import './App.css';
import TodoList from './components/TodoList';
import TaskInput from './components/TaskInput';
import FilterBar from './components/FilterBar';

// Types
/**
 * @typedef {'all' | 'active' | 'completed'} FilterType
 */

/**
 * Shape of a task item.
 * @typedef {Object} Task
 * @property {string} id - Unique identifier for the task
 * @property {string} title - Task title/description
 * @property {boolean} completed - Whether the task is completed
 */

// Storage key for persistence
const STORAGE_KEY = 'TODO_APP_TASKS_V1';

// Seed tasks based on extracted design
const seedTasks = () => ([
  { id: 't1', title: 'Implement Figma design', completed: false },
  { id: 't2', title: 'Fix UI bugs', completed: false },
  { id: 't3', title: 'Test features', completed: false },
  { id: 't4', title: 'Add SVG icons', completed: true },
]);

// PUBLIC_INTERFACE
function App() {
  /** Main Todo application component: state management, layout, and orchestration of child components. */
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      // ignore
    }
    return seedTasks();
  });
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed'

  // Persist changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      // ignore storage errors
    }
  }, [tasks]);

  const total = tasks.length;
  const completedCount = useMemo(() => tasks.filter(t => t.completed).length, [tasks]);

  const visibleTasks = useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter(t => !t.completed);
      case 'completed':
        return tasks.filter(t => t.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  // PUBLIC_INTERFACE
  const addTask = (title) => {
    /** Add a new task by title. */
    const text = (title || '').trim();
    if (!text) return;
    const id = `t_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    setTasks(prev => [{ id, title: text, completed: false }, ...prev]);
  };

  // PUBLIC_INTERFACE
  const toggleTask = (id) => {
    /** Toggle completion state of a task by id. */
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  // PUBLIC_INTERFACE
  const deleteTask = (id) => {
    /** Delete a task by id. */
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  // PUBLIC_INTERFACE
  const editTask = (id, newTitle) => {
    /** Edit an existing task title. */
    const text = (newTitle || '').trim();
    if (!text) return;
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, title: text } : t)));
  };

  // PUBLIC_INTERFACE
  const changeFilter = (nextFilter) => {
    /** Set active filter: 'all' | 'active' | 'completed'. */
    setFilter(nextFilter);
  };

  // Focus the TaskInput from floating add button
  const focusNewTaskInput = () => {
    const el = document.getElementById('new-task-input');
    if (el) el.focus();
  };

  return (
    <div className="page">
      <main className="frame todo-screen" role="main" aria-label="Todo screen (React)">
        <header className="header" role="banner">
          <div className="header-text">
            <h1 className="title typo-4">Tasks</h1>
            <p className="subtitle typo-5">
              {completedCount} of {total} completed
            </p>
          </div>
        </header>

        <section className="content" aria-label="Controls and task list">
          <div className="controls-row">
            <TaskInput onAdd={addTask} />
            <FilterBar current={filter} onChange={changeFilter} />
          </div>

          <TodoList
            tasks={visibleTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={editTask}
          />
        </section>

        {/* Floating Add Button styled as per extracted CSS */}
        <button
          className="add-btn"
          id="add_task_btn"
          aria-label="Add task"
          title="Add a new task"
          onClick={focusNewTaskInput}
        />
      </main>
    </div>
  );
}

export default App;
