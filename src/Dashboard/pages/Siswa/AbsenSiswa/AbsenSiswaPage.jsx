import React from "react";
import Calender from "../../../components/Calender/Calender";
import Search from "../../../../component/Input/Search";
import { useParams } from "react-router-dom";
import ButtonHref from "../../../../component/Button/ButtonHref";
import { ArrowLeftCircleIcon } from "@heroicons/react/16/solid";

export default function AbsenSiswaPage() {
  const kelas = useParams(); // ambil data kelas dari URL
  return (
    <div className="lg:py-5">
      <div className="flex flex-col lg:flex-row w-full justify-between items-center">
        <div className="flex items-center">
          <div className="me-3">
            <ButtonHref
              text=<ArrowLeftCircleIcon className="w-6 h-6 "></ArrowLeftCircleIcon>
              href="/dashboard/siswa/absen"
            />
          </div>
          <h2 className="text-2xl font-semibold">
            Absensi Siswa {decodeURIComponent(kelas.nama_kelas)}{" "}
            {decodeURIComponent(kelas.tingkat)}
          </h2>
        </div>
        <Calender className="w-40 lg:w-full"></Calender>
      </div>

      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* header tabel */}
        <div className="w-full flex justify-end items-center -mb-0.5">
          <Search className="bg-white"></Search>
        </div>

        <hr className="border-border-grey border mt-4"></hr>

        {/* tabel */}
        <div className="overflow-x-auto wf-full">
          <table className="table w-full">
            <thead>
              <tr className="border-b border-t border-border-grey">
                <td>No</td>
                <td>Nama</td>
                <td>NIS</td>
                <td>NISN</td>
                <td>H</td>
                <td>I</td>
                <td>S</td>
                <td>A</td>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border-grey">
                <td>1</td>
                <td>John Doe</td>
                <td>123456789</td>
                <td>2312673516</td>
                <td>1</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
