import { useState } from 'react';
import { RESOURCES } from '../data/resources';
import { DOMAINS } from '../data/curriculum';

export default function Resources() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? RESOURCES
    : RESOURCES.filter((r) => r.domains.includes(filter));

  return (
    <>
      <h1 className="page-title">Learning Resources</h1>
      <p className="page-subtitle">
        Free educational websites hand-picked for pre-schoolers
      </p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        <button
          className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ padding: '8px 16px', fontSize: '0.9rem' }}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        {Object.values(DOMAINS).map((d) => (
          <button
            key={d.id}
            className={`btn ${filter === d.id ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 16px', fontSize: '0.9rem' }}
            onClick={() => setFilter(d.id)}
          >
            {d.icon} {d.title}
          </button>
        ))}
      </div>

      <div className="resource-grid">
        {filtered.map((resource) => (
          <a
            key={resource.id}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="resource-card"
          >
            <div className="resource-icon">{resource.icon}</div>
            <div className="resource-info">
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <span className="resource-badge">Ages {resource.ageRange}</span>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
