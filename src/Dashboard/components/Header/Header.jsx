import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import {
  ArrowLeftStartOnRectangleIcon,
  UserCircleIcon,
  GlobeAltIcon,
  WindowIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import baseUrl from "../../../utils/config/baseUrl";
import axios from "axios";

function Header() {
  const location = useLocation();
  const navigate = useNavigate(); // Hook untuk navigasi
  const [Nama, setNama] = useState("");
  const defaultImage =
    "https://manbengkuluselatan.sch.id/assets/img/profile/default.jpg";
  const [Gambar, setGambar] = useState(defaultImage);

  const handleLogout = (e) => {
    e.preventDefault();

    sessionStorage.removeItem("session");
    navigate("/");
    window.location.reload();
  };

  const token = sessionStorage.getItem("session");

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          try {
            const response = await axios.get(
              `${baseUrl.apiUrl}/admin/profile`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (response.status === 200 || response.status === 201) {
              setNama(response.data.data.username);
              if (response.data.data.foto_profil) {
                setGambar(response.data.data.foto_profil);
              }
            }
          } catch (error) {
            console.error("Errro:", error);
          }
        } catch (error) {
          console.error("Token tidak valid:", error);
        }
      }
    };

    if (localStorage.getItem("updateProfile") == "true") {
      localStorage.removeItem("updateProfile");
      fetchData();
    } else {
      fetchData();
    }
  }, [token, location]);

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
              <img
                src={`${baseUrl.apiUrlImage}/Upload/profile_image/${Gambar}`}
                alt="profile"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Nama Pengguna */}
            <h1 className="text-sm font-semibold ms-2">{Nama}</h1>

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
                onClick={() => navigate("/landing-page")}
                className="flex items-center w-full rounded-sm"
              >
                <WindowIcon className="w-6 h-6 me-1" />
                <span>Landing Page</span>
              </button>
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
