import React, { useEffect, useState } from "react";
import ImageImport from "../../data/ImageImport";
import { useInformasiSekolah } from "../../hooks/Landing/ProfileWebsite";
import baseUrl from "../../utils/config/baseUrl";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { informasi } = useInformasiSekolah();

  useEffect(() => {
    // Cek kedua storage sekaligus
    const token = sessionStorage.getItem("session"); // Dari login
    const localStorageStatus = localStorage.getItem("login") === "success"; // Dari login

    setIsLoggedIn(!!token || localStorageStatus);

    // Handle perubahan storage
    const handleStorageChange = () => {
      const updatedToken = sessionStorage.getItem("session");
      const updatedLocalStatus = localStorage.getItem("login") === "success";
      setIsLoggedIn(!!updatedToken || updatedLocalStatus);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="navbar bg-white shadow-sm px-8 fixed top-0 z-50">
      {/* Logo di kiri */}
      <div className="navbar-start">
        <div className="flex items-center space-x-2">
          {" "}
          <img
            className="h-8 object-cover"
            src={
              informasi.logo
                ? `${baseUrl.apiUrl}/admin/sekolah/${informasi.logo}`
                : ImageImport.logoIcon
            }
            alt="Logo"
          />
          <span className="font-bold text-2xl">
            {informasi.singkatan || "SINA"}
          </span>{" "}
        </div>
      </div>

      {/* Menu di kanan*/}
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="/landing-page">Home</a>
          </li>
          <li>
            <a href="/tentang-sina">Tentang</a>
          </li>
          <li>
            <a href="/informasi">Berita & Pengumuman</a>
          </li>
          {isLoggedIn && (
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
          )}
        </ul>
      </div>

      {/* Hamburger menu mobile*/}
      <div className="navbar-end lg:hidden">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
          >
            <li>
              <a
                className="hover:bg-biru-hover hover:text-white"
                href="/landing-page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                className="hover:bg-biru-hover hover:text-white"
                href="/tentang-sina"
              >
                Tentang
              </a>
            </li>
            <li>
              <a
                className="hover:bg-biru-hover hover:text-white"
                href="/informasi"
              >
                Berita & Pengumuman
              </a>
            </li>
            {isLoggedIn && (
              <li>
                <a
                  className="hover:bg-biru-hover hover:text-white"
                  href="/dashboard"
                >
                  Dashboard
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
