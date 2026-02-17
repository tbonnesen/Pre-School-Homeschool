import { useMemo, useState } from 'react';

const WEEKS = 12;

function getWeekStart(weeksAgo) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  // Go back to Monday of current week, then subtract more weeks
  const dayOfWeek = d.getDay() === 0 ? 6 : d.getDay() - 1; // Mon=0
  d.setDate(d.getDate() - dayOfWeek - weeksAgo * 7);
  return d;
}

function formatWeekLabel(date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function ActivityHeatmap({ activityLog, domains }) {
  const [tooltip, setTooltip] = useState(null);

  const { grid, weekLabels } = useMemo(() => {
    // Build week start dates (oldest first)
    const weekStarts = Array.from({ length: WEEKS }, (_, i) =>
      getWeekStart(WEEKS - 1 - i)
    );
    const weekLabels = weekStarts.map(formatWeekLabel);

    // Build grid: grid[weekIdx][domainId] = count
    const domainIds = Object.keys(domains);
    const grid = weekStarts.map((weekStart) => {
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 7);
      const row = {};
      domainIds.forEach((d) => { row[d] = 0; });

      for (const entry of activityLog || []) {
        const t = new Date(entry.timestamp);
        if (t >= weekStart && t < weekEnd) {
          if (row[entry.domainId] !== undefined) row[entry.domainId]++;
        }
      }
      return row;
    });

    return { grid, weekLabels };
  }, [activityLog, domains]);

  const domainIds = Object.keys(domains);

  // Color helper: 0 = gray, 1 = light domain color, 2+ = full domain color
  function cellColor(domain, count) {
    if (count === 0) return 'var(--border-color)';
    const base = domains[domain]?.color || '#888';
    if (count === 1) return base + '66'; // 40% opacity
    if (count === 2) return base + 'AA'; // 67% opacity
    return base; // full
  }

  return (
    <div className="heatmap-wrap">
      <div className="heatmap-grid-outer">
        {/* Y-axis: domain labels */}
        <div className="heatmap-y-labels">
          <div className="heatmap-corner" /> {/* top-left spacer */}
          {domainIds.map((d) => (
            <div key={d} className="heatmap-y-label">
              {domains[d]?.icon} <span className="heatmap-domain-name">{domains[d]?.title?.split(' ')[0]}</span>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div className="heatmap-scroll">
          {/* X-axis: week labels */}
          <div className="heatmap-x-labels">
            {weekLabels.map((label, wi) => (
              <div key={wi} className="heatmap-x-label">{label}</div>
            ))}
          </div>

          {/* Cells per domain row */}
          {domainIds.map((domainId) => (
            <div key={domainId} className="heatmap-row">
              {grid.map((weekData, wi) => {
                const count = weekData[domainId];
                const label = weekLabels[wi];
                return (
                  <div
                    key={wi}
                    className="heatmap-cell"
                    style={{ background: cellColor(domainId, count) }}
                    onMouseEnter={(e) => setTooltip({ domainId, count, label, x: e.clientX, y: e.clientY })}
                    onMouseLeave={() => setTooltip(null)}
                    title={`${domains[domainId]?.title}: ${count} activit${count === 1 ? 'y' : 'ies'} — week of ${label}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="heatmap-legend">
        <span className="heatmap-legend-label">Less</span>
        {[0, 1, 2, 3].map((level) => (
          <div
            key={level}
            className="heatmap-legend-cell"
            style={{
              background: level === 0
                ? 'var(--border-color)'
                : level === 1 ? '#4ECDC466' : level === 2 ? '#4ECDC4AA' : '#4ECDC4',
            }}
          />
        ))}
        <span className="heatmap-legend-label">More</span>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="heatmap-tooltip"
          style={{ left: tooltip.x + 12, top: tooltip.y - 36, position: 'fixed' }}
        >
          {domains[tooltip.domainId]?.icon} {tooltip.count} {tooltip.count === 1 ? 'activity' : 'activities'} — {tooltip.label}
        </div>
      )}
    </div>
  );
}
