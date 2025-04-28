import React from "react";
import { UserGroupIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import Grafik from "../components/Chart/Grafik";
import Calender from "../components/Calender/Calender";

export default function Dashboard() {
  return (
    <div className="lg:py-5">
      <div className="flex w-full justify-between items-center">
        <h2 className="text-2xl font-semibold">Highlight</h2>
        <Calender></Calender>
      </div>

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

      <div className="flex flex-col lg:flex-row justify-between w-full mt-8">
        <div className="bg-white p-4 rounded-lg shadow-md my-2 lg:my-0">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <h3 className="font-normal text-lg lg:mb-10">
              Rekapan Absen Siswa
            </h3>
            <h3 className="font-normal text-md mb-10 text-gray-500">
              Semua Kelas
            </h3>
          </div>
          <div className="flex items-center justify-between">
            <Grafik className="w-10"></Grafik>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md my-2 lg:my-0">
          <h3 className="font-normal text-lg lg:mb-10 text-center mb-10">
            Rekapan Guru
          </h3>
          <div className="flex items-center justify-between">
            <Grafik className="w-10"></Grafik>
          </div>
        </div>
      </div>
    </div>
  );
}
