export default function Sidebar() {
  return (
    <aside className="bg-blue-800 text-white h-full transition-all duration-300 w-20 lg:w-64">
      {" "}
      {/* shell sidebar */}
      <div className="flex justify-between items-center p-4 border-b border-blue-700">
        {" "}
        {/* header */}
        <span className="text-2xl font-bold hidden lg:block">Admin</span> {/* brand */}
      </div>
      <nav className="p-4 space-y-2">
        {" "}
        {/* menu */}
        <a href="#" className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-blue-700">
          {" "}
          {/* item */}
          <span className="text-lg">🏠</span>
          <span className="hidden lg:inline">Dashboard</span>
        </a>
        <a href="#" className="flex items-center space-x-2 px-4 py-2 rounded bg-blue-700">
          {" "}
          {/* item aktif */}
          <span className="text-lg">🎓</span>
          <span className="hidden lg:inline">Mahasiswa</span>
        </a>
        {/* TIP: gunakan <NavLink to="/admin"> untuk SPA + active state */}
      </nav>
    </aside>
  );
}
