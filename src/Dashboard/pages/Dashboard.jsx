import React from "react";
import {
  UserGroupIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import Grafik from "../components/Chart/Grafik";
import Calender from "../components/Calender/Calender";
import Toast from "../../component/Toast/Toast";
import { useState } from "react";

export default function Dashboard() {
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  const statusLogin = localStorage.getItem("login");
  const statusUdpdate = localStorage.getItem("profile");

  if (statusLogin == "success") {
    setToastMessage("Berhasil Login");
    setToastVariant("success");
    localStorage.removeItem("login");
  }

  if (statusUdpdate == "success") {
    setToastMessage("Berhasil Update Profile");
    setToastVariant("success");
    localStorage.removeItem("profile");
  }
  return (
    <div className="lg:py-5">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="flex w-full justify-between items-center">
        <h2 className="text-2xl font-semibold">Highlight</h2>
        <Calender></Calender>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-medium text-sm mb-10">Siswa Keseluruhan</h3>
          <div className="flex items-center justify-between">
            <UserGroupIcon className="w-9 h-9"></UserGroupIcon>
            <p className="font-semibold text-xl">1950</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-medium text-sm mb-10">Guru Keseluruhan</h3>
          <div className="flex items-center justify-between">
            <UserGroupIcon className="w-9 h-9"></UserGroupIcon>
            <p className="font-semibold text-xl">95</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-medium text-sm mb-10">Admin / Staf</h3>
          <div className="flex items-center justify-between">
            <UserGroupIcon className="w-9 h-9"></UserGroupIcon>
            <p className="font-semibold text-xl">4</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-medium text-sm mb-10">Pengumuman</h3>
          <div className="flex items-center justify-between">
            <InformationCircleIcon className="w-9 h-9"></InformationCircleIcon>
            <p className="font-semibold text-xl">3</p>
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
