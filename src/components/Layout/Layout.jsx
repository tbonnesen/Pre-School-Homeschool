import { NavLink } from 'react-router-dom';

export default function Layout({ children, onParentMode }) {
  return (
    <>
      <nav className="navbar">
        <NavLink to="/" className="navbar-brand">
          🏠 Pre-School Homeschool
        </NavLink>
        <div className="navbar-links">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
            Learn
          </NavLink>
          <NavLink to="/resources" className={({ isActive }) => isActive ? 'active' : ''}>
            Resources
          </NavLink>
          <button onClick={onParentMode}>
            Parent
          </button>
        </div>
      </nav>
      <main className="page">
        {children}
      </main>
    </>
  );
}
