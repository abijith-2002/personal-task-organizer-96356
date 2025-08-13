/* FilterBar.jsx */
import React from 'react';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
];

// PUBLIC_INTERFACE
export default function FilterBar({ current, onChange }) {
  /** Filter controls to switch task list view. */
  return (
    <div className="filters" role="toolbar" aria-label="Task filters">
      {FILTERS.map(f => (
        <button
          key={f.key}
          type="button"
          className="btn filter-btn"
          aria-pressed={current === f.key ? 'true' : 'false'}
          onClick={() => onChange(f.key)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
