import { NavLink } from "react-router-dom";

const itemClass = ({ isActive }) =>
  `flex items-center space-x-2 px-4 py-2 rounded transition
   ${isActive ? "bg-blue-700 text-white" : "hover:bg-blue-700"}`;

export default function Sidebar() {
  return (
    <aside className="bg-blue-800 text-white h-full w-20 lg:w-64 transition-all duration-300">
      <div className="flex items-center p-4 border-b border-blue-700">
        <span className="text-2xl font-bold hidden lg:block">Admin</span>
      </div>
      <nav className="p-4 space-y-2">
        <NavLink to="/admin/dashboard" className={itemClass} end>
          <span className="text-lg">🏠</span>
          <span className="menu-text hidden lg:inline">Dashboard</span>
        </NavLink>

        <NavLink to="/admin/mahasiswa" className={itemClass} end>
          <span className="text-lg">🎓</span>
          <span className="menu-text hidden lg:inline">Mahasiswa</span>
        </NavLink>
      </nav>
    </aside>
  );
}
