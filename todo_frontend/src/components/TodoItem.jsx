/* TodoItem.jsx */
import React, { useState } from 'react';

// PUBLIC_INTERFACE
export default function TodoItem({ task, onToggle, onDelete, onEdit }) {
  /** Single task row with completion toggle, inline edit, and delete controls. */
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);

  const completeAria = task.completed ? 'true' : 'false';

  const startEdit = () => {
    setDraft(task.title);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setDraft(task.title);
    setIsEditing(false);
  };

  const saveEdit = () => {
    const text = (draft || '').trim();
    if (text) {
      onEdit(task.id, text);
      setIsEditing(false);
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`} data-task={task.title}>
      <div className="bg" aria-hidden="true" />
      <div className="inner">
        <button
          className="task-check"
          aria-label={`Toggle: ${task.title}`}
          aria-pressed={completeAria}
          onClick={() => onToggle(task.id)}
          title={task.completed ? 'Mark as active' : 'Mark as completed'}
        />

        {!isEditing ? (
          <div
            className="task-title typo-6"
            role="textbox"
            aria-readonly="true"
            title={task.title}
            onDoubleClick={startEdit}
          >
            {task.title}
          </div>
        ) : (
          <input
            className="input edit-input"
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') saveEdit();
              if (e.key === 'Escape') cancelEdit();
            }}
            aria-label={`Edit task: ${task.title}`}
            autoFocus
          />
        )}

        <div className="actions">
          {!isEditing ? (
            <>
              <button type="button" className="btn" onClick={startEdit} aria-label={`Edit ${task.title}`}>
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => onDelete(task.id)}
                aria-label={`Delete ${task.title}`}
              >
                Delete
              </button>
            </>
          ) : (
            <>
              <button type="button" className="btn btn-primary" onClick={saveEdit} aria-label="Save edit">
                Save
              </button>
              <button type="button" className="btn" onClick={cancelEdit} aria-label="Cancel edit">
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
