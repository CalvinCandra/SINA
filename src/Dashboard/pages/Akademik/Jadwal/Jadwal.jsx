import React, { useState, useEffect } from "react";
import Calender from "../../../components/Calender/Calender";
import Search from "../../../../component/Input/Search";
import ButtonHref from "../../../../component/Button/ButtonHref";
import {
  PlusCircleIcon,
  TrashIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/16/solid";
import DataKelas from "../../../../data/Kelas/DataKelas";

export default function Jadwal() {
  useEffect(() => {
    localStorage.removeItem("jadwalList");
    console.log(localStorage.getItem("jadwalList")); // Cek setelah dihapus
  }, []);

  return (
    <div className="lg:py-5">
      <div className="flex flex-col lg:flex-row w-full justify-between items-center">
        <h2 className="text-2xl font-bold">Data Jadwal Pelajaran</h2>
        <Calender className="w-40 lg:w-full"></Calender>
      </div>

      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <div className="lg:w-50 mb-6 lg:mb-0">
            <h2 className="text-lg font-semibold">Nama Kelas</h2>
          </div>
          <Search className="bg-white"></Search>
        </div>

        <hr className="border-border-grey border"></hr>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          {DataKelas && DataKelas.length > 0 ? (
            <table className="table w-full">
              <thead>
                <tr className="border-b border-t border-border-grey">
                  <th>No</th>
                  <th>Nama Kelas</th>
                  <th>Tingkat</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {DataKelas.map((data, index) => (
                  <tr
                    className="border-b border-t border-border-grey"
                    key={data.id}
                  >
                    <td className="whitespace-nowrap">{index + 1}</td>
                    <td className="whitespace-nowrap">{data.nama_kelas}</td>
                    <td className="whitespace-nowrap">{data.tingkat}</td>
                    <td>
                      <div className="flex flex-row items-center">
                        <ButtonHref
                          href={`/dashboard/akademik/jadwal-kelas/${encodeURIComponent(
                            data.nama_kelas
                          )}/${encodeURIComponent(`Tingkat ${data.tingkat}`)}`}
                          variant="update"
                          text={
                            <span className="flex items-center mr-6 text-base">
                              <DocumentMagnifyingGlassIcon className="w-5 h-5 text-blue-600 mr-2" />
                              Data Jadwal
                            </span>
                          }
                        />
                        <ButtonHref
                          href="/dashboard/akademik/jadwal"
                          variant="update"
                          text={
                            <span className="flex items-center text-base">
                              <TrashIcon className="w-5 h-5 text-red-500 mr-2" />
                              Hapus Semua Jadwal
                            </span>
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <h2 className="text-lg font-semibold">Tidak ada data</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
