/* TaskInput.jsx */
import React, { useState } from 'react';

// PUBLIC_INTERFACE
export default function TaskInput({ onAdd }) {
  /** Task input field with an "Add" action. Calls onAdd(title) when submitted. */
  const [value, setValue] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const title = value.trim();
    if (!title) return;
    onAdd(title);
    setValue('');
  };

  return (
    <form className="task-input" onSubmit={submit} aria-label="Add new task">
      <input
        id="new-task-input"
        className="input"
        type="text"
        placeholder="Add a new task..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="New task title"
      />
      <button type="submit" className="btn btn-primary" aria-label="Add task">
        Add
      </button>
    </form>
  );
}
