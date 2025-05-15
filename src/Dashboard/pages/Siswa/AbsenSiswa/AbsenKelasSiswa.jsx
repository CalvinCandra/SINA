import React, { useState } from "react";
import Calender from "../../../components/Calender/Calender";
import SelectField from "../../../../component/Input/SelectField";
import Search from "../../../../component/Input/Search";
import ButtonHref from "../../../../component/Button/ButtonHref";
import {
  TrashIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/16/solid";
import DataKelas from "../../../../data/Kelas/DataKelas";

export default function AbsenKelasSiswa() {
  const tahunoptions = [
    { value: "2023/2024 Genap", label: "2023/2024 Genap" },
    { value: "2023/2024 Ganjil", label: "2023/2024 Ganjil" },
    { value: "2024/2025 Genap", label: "2024/2025 Ganjil" },
  ];

  const [tahunAkademik, setTahunAkademik] = useState("");

  return (
    <div className="lg:py-5">
      <div className="flex flex-col lg:flex-row w-full justify-between items-center">
        <h2 className="text-2xl font-semibold">Data Absensi Siswa</h2>
        <Calender className="w-40 lg:w-full"></Calender>
      </div>

      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* header tabel */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center -mb-0.5">
          <SelectField
            text="Tahun Akademik"
            option={tahunoptions}
            value="2023/2024 Genap"
            onChange={(e) => setTahunAkademik(e.target.value)}
          />
          <Search className="bg-white"></Search>
        </div>

        <hr className="border-border-grey border"></hr>

        {/* tabel */}
        <div className="overflow-x-auto wf-full">
          {DataKelas && DataKelas.length > 0 ? (
            <table className="table w-full">
              <thead>
                <tr className="border-b border-t border-border-grey">
                  <td>No</td>
                  <td>Nama Kelas</td>
                  <td>Tingat Kelas</td>
                  <td>Aksi</td>
                </tr>
              </thead>
              <tbody>
                {DataKelas.map((data, index) => (
                  <tr className="border-b border-border-grey" key={data.id}>
                    <td>{index + 1}</td>
                    <td>{data.nama_kelas}</td>
                    <td>{data.tingkat}</td>

                    <td>
                      <div className="flex items-center lg:flex-row">
                        <ButtonHref
                          href={`/dashboard/siswa/absen/${encodeURIComponent(
                            data.nama_kelas
                          )}/${encodeURIComponent(`Tingkat ${data.tingkat}`)}`}
                          text=<span className="flex items-center">
                            <DocumentMagnifyingGlassIcon className="lg:w-5 lg:h-5 w-6 h-6 me-2 text-sky-500"></DocumentMagnifyingGlassIcon>
                            <span className="whitespace-nowrap">
                              Data Absensi Siswa
                            </span>
                          </span>
                        ></ButtonHref>

                        {/* <button className="border-0 cursor-pointer ms-5">
                          <div className="flex items-center w-full">
                            <TrashIcon className="w-5 h-5 me-2 text-red-500"></TrashIcon>
                            <span className="whitespace-nowrap">
                              Hapus Semua Absensi Siswa
                            </span>
                          </div>
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex items-center justify-center w-full h-40">
              <p className="text-gray-500">Tidak ada data kelas</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
