import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="nav-brand">TimeBoxing</div>

        <div className="nav-links">
          <NavLink  
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/planner"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Planner
          </NavLink>
        </div>

        <div className="nav-avatar">
          👤
        </div>
      </nav>

      <div className="accent-line" />
    </>
  );
}