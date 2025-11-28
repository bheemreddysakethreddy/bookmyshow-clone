import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const linkStyle = ({ isActive }) =>
    `hover:text-red-400 transition ${
      isActive ? "text-red-500 font-semibold" : ""
    }`;

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-red-500">
        🎬 BookMyShow
      </Link>

        <div className="space-x-6">
          <NavLink to="/" className={linkStyle}>
            Movies
          </NavLink>
          <NavLink to="/events" className={linkStyle}>
            Events
          </NavLink>
          <NavLink to="/sports" className={linkStyle}>
            Sports
          </NavLink>
        </div>
    </nav>
  );
}
