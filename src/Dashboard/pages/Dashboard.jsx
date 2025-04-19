import React from "react";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import Grafik from "../components/Chart/Grafik";

function Dashboard() {
  return (
    <div className="">
      <h2 className="text-2xl font-semibold">Highlight</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-normal text-lg mb-10">Siswa Keseluruhan</h3>
          <div className="flex items-center justify-between">
            <UserGroupIcon className="w-9 h-9"></UserGroupIcon>
            <p className="font-semibold text-xl">1950</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-normal text-lg mb-10">Siswa Keseluruhan</h3>
          <div className="flex items-center justify-between">
            <UserGroupIcon className="w-9 h-9"></UserGroupIcon>
            <p className="font-semibold text-xl">1950</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-normal text-lg mb-10">Siswa Keseluruhan</h3>
          <div className="flex items-center justify-between">
            <UserGroupIcon className="w-9 h-9"></UserGroupIcon>
            <p className="font-semibold text-xl">1950</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-normal text-lg mb-10">Siswa Keseluruhan</h3>
          <div className="flex items-center justify-between">
            <UserGroupIcon className="w-9 h-9"></UserGroupIcon>
            <p className="font-semibold text-xl">1950</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 w-full lg:w-[60%] mt-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <h3 className="font-normal text-lg lg:mb-10">Rekapan Absen</h3>
            <h3 className="font-normal text-md mb-10 text-gray-500">
              Semua Kelas
            </h3>
          </div>
          <div className="flex items-center justify-between">
            <Grafik className="w-10"></Grafik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
