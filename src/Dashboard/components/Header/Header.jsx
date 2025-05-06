import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import {
  ArrowLeftStartOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

function Header() {
  const navigate = useNavigate(); // Hook untuk navigasi

  const handleLogout = (e) => {
    e.preventDefault();

    sessionStorage.removeItem("session");
    navigate("/");
    window.location.reload();
  };
  return (
    <div className="navbar sticky top-0 z-10 bg-white">
      {/* Sidebar toggle for mobile */}
      <div className="flex-1">
        <label
          htmlFor="left-sidebar-drawer"
          className="btn btn-primary drawer-button lg:hidden border-0"
        >
          <Bars3Icon className="h-5 w-5" />
        </label>
      </div>

      {/* Right side controls */}
      <div className="flex-none">
        {/* Profile dropdown (static) */}
        <div className="dropdown dropdown-end ml-4">
          <div
            tabIndex={0}
            className="flex items-center btn border-0 btn-ghost"
          >
            <div className="w-10 h-10 overflow-hidden rounded-full">
              {/* Avatar */}
              <div className="w-full object-cover">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="profile"
                />
              </div>
            </div>

            {/* Nama Pengguna */}
            <h1 className="text-sm font-semibold ms-2">Super Admin</h1>

            {/* Ikon panah dropdown */}
            <ChevronDownIcon className="w-5 h-5 ml-2" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow rounded-box w-52 bg-white border-border-grey"
          >
            <li className="hover:bg-biru-hover hover:text-white">
              <Link
                to="/dashboard/profile"
                className="flex items-center w-full rounded-sm"
              >
                <UserCircleIcon className="w-6 h-6 me-1" />
                <span>Profile</span>
              </Link>
            </li>
            <div className="divider mt-0 mb-0"></div>
            <li className="hover:bg-biru-hover hover:text-white">
              <button
                onClick={handleLogout}
                className="flex items-center w-full rounded-sm"
              >
                <ArrowLeftStartOnRectangleIcon className="w-6 h-6 me-1" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
