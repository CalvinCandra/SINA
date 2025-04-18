import { Outlet } from "react-router-dom";

function AppShell() {
  return (
    <div className="overflow-x-hidden overflow-y-hidden relative">
      <Outlet />
    </div>
  );
}

export default AppShell;
