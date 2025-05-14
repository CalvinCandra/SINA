import { Link, useLocation } from "react-router-dom";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import {
  Cog6ToothIcon,
  UserIcon,
  BookOpenIcon,
  UserGroupIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import ImageImport from "../../../data/ImageImport";
import { useEffect } from "react";

function Sidebar() {
  const location = useLocation();
  const path = location.pathname;

  const close = () => {
    document.getElementById("left-sidebar-drawer").click();
  };

  // Active states
  const isDashboardActive = path === "/dashboard";
  const isAdminActive = path.startsWith("/dashboard/admin");
  const isKelasActive = path.startsWith("/dashboard/kelas");
  const isAkademikActive = path.startsWith("/dashboard/akademik"); //untuk dropdown
  const isKurikulumActive = path.startsWith("/dashboard/akademik/kurikulum");
  const isTahunAkademikActive = path.startsWith(
    "/dashboard/akademik/tahun-akademik"
  );
  const isJadwalActive = path.startsWith("/dashboard/akademik/jadwal");
  const isMataPelajaranActive = path.startsWith(
    "/dashboard/akademik/mata-pelajaran"
  );
  const isKhsActive = path.startsWith("/dashboard/akademik/khs");
  const isGuruActive = path.startsWith("/dashboard/guru"); //untuk dropdown
  const isSiswaActive = path.startsWith("/dashboard/siswa"); //untuk dropdown
  const isPengumumanActive = path.startsWith("/dashboard/pengumuman");

  // useEffect untuk menghapus localStorage saat berpindah dari halaman
  useEffect(() => {
    // Jika berpindah dari halaman
    if (!isAdminActive) {
      localStorage.removeItem("adminList");
    }
  }, [isAdminActive]); // Memantau perubahan path

  // useEffect untuk menghapus localStorage saat berpindah dari halaman
  useEffect(() => {
    // Jika berpindah dari halaman
    if (!isKelasActive) {
      localStorage.removeItem("kelasList");
    }
  }, [isKelasActive]); // Memantau perubahan path

  // useEffect untuk menghapus localStorage saat berpindah dari halaman
  useEffect(() => {
    // Jika berpindah dari halaman
    if (!isKurikulumActive) {
      localStorage.removeItem("kurikulumList");
    }
  }, [isKurikulumActive]); // Memantau perubahan path

  // useEffect untuk menghapus localStorage saat berpindah dari halaman
  useEffect(() => {
    // Jika berpindah dari halaman
    if (!isTahunAkademikActive) {
      localStorage.removeItem("tahunList");
    }
  }, [isTahunAkademikActive]); // Memantau perubahan path

  // useEffect untuk menghapus localStorage saat berpindah dari halaman
  useEffect(() => {
    // Jika berpindah dari halaman
    if (!isMataPelajaranActive) {
      localStorage.removeItem("pelajaranList");
    }
  }, [isMataPelajaranActive]); // Memantau perubahan path

  // useEffect untuk menghapus localStorage saat berpindah dari halaman
  useEffect(() => {
    // Jika berpindah dari halaman
    if (!isGuruActive) {
      localStorage.removeItem("guruList");
    }
  }, [isGuruActive]); // Memantau perubahan path

  // useEffect untuk menghapus localStorage saat berpindah dari halaman
  useEffect(() => {
    // Jika berpindah dari halaman
    if (!isSiswaActive) {
      localStorage.removeItem("siswaList");
    }
  }, [isSiswaActive]); // Memantau perubahan path

  // useEffect untuk menghapus localStorage saat berpindah dari halaman
  useEffect(() => {
    // Jika berpindah dari halaman
    if (!isJadwalActive) {
      localStorage.removeItem("jadwalList");
    }
  }, [isJadwalActive]); // Memantau perubahan path

  return (
    <div className="drawer-side z-30 shadow-black shadow-md font-semibold">
      <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
      <ul className="menu pt-2 w-72 bg-white min-h-full text-base-content">
        {/* Tombol close untuk mobile */}
        <button
          className="btn btn-ghost bg-base-300 btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden"
          onClick={close}
        >
          <XMarkIcon className="h-5 w-5" />
        </button>

        {/* Logo + Brand */}
        <li className="mb-2 font-semibold text-xl">
          <Link to="/dashboard">
            <img
              className="w-full object-cover"
              src={ImageImport.logoNav}
              alt="Logo"
            />
          </Link>
        </li>

        {/* Menu Title */}
        <h1 className="text-lg font-semibold mb-5">Menu</h1>

        {/* Dashboard */}
        <li
          className={`mb-3 ${
            isDashboardActive ? "bg-biru-active text-white  rounded-sm" : ""
          }`}
        >
          <Link
            to="/dashboard"
            className="flex items-center w-full  rounded-sm"
          >
            <Cog6ToothIcon className="w-6 h-6 me-1" />
            <span>Dashboard</span>
          </Link>
        </li>

        {/* Admin */}
        <li
          className={`mb-3 ${
            isAdminActive ? "bg-biru-active text-white  rounded-sm" : ""
          }`}
        >
          <Link
            to="/dashboard/admin"
            className="flex items-center w-full rounded-sm"
          >
            <UserIcon className="w-6 h-6 me-1" />
            <span>Admin</span>
          </Link>
        </li>

        {/* Kelas */}
        <li
          className={`mb-3 ${
            isKelasActive ? "bg-biru-active text-white  rounded-sm" : ""
          }`}
        >
          <Link
            to="/dashboard/kelas"
            className="flex items-center w-full rounded-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              className="me-1"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M13 4h3a2 2 0 0 1 2 2v14M2 20h3m8 0h9m-12-8v.01m3-7.448v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z"
              ></path>
            </svg>
            <span>Kelas</span>
          </Link>
        </li>

        {/* Akademik Dropdown */}
        <li className="mb-3">
          <details open={isAkademikActive}>
            <summary
              className={`flex items-center cursor-pointer rounded-sm ${
                isAkademikActive ? "bg-biru-active text-white" : ""
              }`}
            >
              <BookOpenIcon className="w-6 h-6 me-1" />
              <span>Akademik</span>
            </summary>
            <ul className="pl-6 mt-2 text-sm">
              {/* sub menu */}
              <li className="mb-2">
                <Link
                  to="/dashboard/akademik/kurikulum"
                  className={`block py-1 ${
                    isKurikulumActive
                      ? "text-black font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  Kurikulum
                </Link>
              </li>
              {/* sub menu */}
              <li className="mb-2">
                <Link
                  to="/dashboard/akademik/tahun-akademik"
                  className={`block py-1 ${
                    isTahunAkademikActive
                      ? "text-black font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  Tahun Akademik
                </Link>
              </li>
              {/* sub menu */}
              <li className="mb-2">
                <Link
                  to="/dashboard/akademik/mata-pelajaran"
                  className={`block py-1 ${
                    isMataPelajaranActive
                      ? "text-black font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  Mata Pelajaran
                </Link>
              </li>
              {/* sub menu */}
              <li className="mb-2">
                <Link
                  to="/dashboard/akademik/jadwal"
                  className={`block py-1 ${
                    isJadwalActive
                      ? "text-black font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  Jadwal
                </Link>
              </li>
              {/* sub menu */}
              <li className="mb-2">
                <Link
                  to="/dashboard/akademik/khs"
                  className={`block py-1 ${
                    isKhsActive ? "text-black font-semibold" : "text-gray-500"
                  }`}
                >
                  KHS
                </Link>
              </li>
            </ul>
          </details>
        </li>

        {/* Guru Dropdown */}
        <li className="mb-3">
          <details open={isGuruActive}>
            <summary
              className={`flex items-center cursor-pointer py-2 ${
                isGuruActive ? "bg-biru-active text-white  rounded-sm" : ""
              }`}
            >
              <UserGroupIcon className="w-6 h-6 me-1" />
              <span>Guru</span>
            </summary>
            <ul className="pl-6 mt-2 text-sm">
              {/* sub menu */}
              <li className="mb-2">
                <Link
                  to="/dashboard/guru"
                  className={`block py-1 ${
                    isGuruActive ? "text-black font-semibold" : "text-gray-500"
                  }`}
                >
                  Data Guru
                </Link>
              </li>
              {/* sub menu */}
              <li className="mb-2">
                <Link
                  to="/dashboard/guru/absen"
                  className={`block py-1 ${
                    path === "/dashboard/guru/absen"
                      ? "text-black font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  Absen Guru
                </Link>
              </li>
            </ul>
          </details>
        </li>

        {/* Siswa Dropdown */}
        <li className="mb-3">
          <details open={isSiswaActive}>
            <summary
              className={`flex items-center cursor-pointer py-2 ${
                isSiswaActive ? "bg-biru-active text-white  rounded-sm" : ""
              }`}
            >
              <UserGroupIcon className="w-6 h-6 me-1" />
              <span>Siswa</span>
            </summary>
            <ul className="pl-6 mt-2 text-sm">
              {/* sub menu */}
              <li className="mb-2">
                <Link
                  to="/dashboard/siswa"
                  className={`block py-1 ${
                    isSiswaActive ? "text-black font-semibold" : "text-gray-500"
                  }`}
                >
                  Data Siswa
                </Link>
              </li>
              {/* sub menu */}
              <li className="mb-2">
                <Link
                  to="/dashboard/siswa/absen"
                  className={`block py-1 ${
                    path === "/dashboard/siswa/absen"
                      ? "text-black font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  Absen Siswa
                </Link>
              </li>
            </ul>
          </details>
        </li>

        {/* Pengumuman */}
        <li
          className={`mb-3 ${
            isPengumumanActive ? "bg-biru-active text-white  rounded-sm" : ""
          }`}
        >
          <Link
            to="/dashboard/pengumuman"
            className="flex items-center w-full rounded-sm"
          >
            <InformationCircleIcon className="w-6 h-6 me-1" />
            <span>Pengumuman</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
