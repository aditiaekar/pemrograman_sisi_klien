import { Outlet } from "react-router-dom";
export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gray-100 grid place-items-center p-4">
      <Outlet />
    </div>
  );
}
