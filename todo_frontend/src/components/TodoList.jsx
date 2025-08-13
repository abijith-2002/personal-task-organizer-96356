/* TodoList.jsx */
import React from 'react';
import TodoItem from './TodoItem';

// PUBLIC_INTERFACE
export default function TodoList({ tasks, onToggle, onDelete, onEdit }) {
  /** Renders a list of tasks using TodoItem components. */
  if (!tasks.length) {
    return (
      <section className="task-list" aria-label="Task list">
        <p className="typo-5" role="status" aria-live="polite">No tasks to show.</p>
      </section>
    );
  }

  return (
    <section className="task-list" aria-label="Task list">
      {tasks.map((t) => (
        <TodoItem
          key={t.id}
          task={t}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </section>
  );
}
