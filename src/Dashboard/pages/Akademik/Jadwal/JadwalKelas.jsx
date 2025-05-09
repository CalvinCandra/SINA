import React from "react";
import Calender from "../../../components/Calender/Calender";
import Search from "../../../../component/Input/Search";
import ButtonHref from "../../../../component/Button/ButtonHref";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import { useParams } from "react-router-dom";
import DataKelas from "../../../../data/Kelas/DataKelas";
import DataJadwal from "../../../../data/Akademik/Jadwal/DataJadwal";

export default function JadwalKelas() {
  const { idKelas } = useParams();
  const dataKelas = DataKelas.find((k) => k.id === parseInt(idKelas));
  const jadwalKelas = DataJadwal.filter(
    (item) => item.id_kelas === parseInt(idKelas)
  );

  // Simulasi data jadwal pelajaran
  const jadwal = {
    Senin: [
      { jam: "07.15 – 09.45", ruang: "AKIII.5", sesi: 1 },
      { jam: "09.45 – 10.45", ruang: "AKIII.5", sesi: 2 },
      { jam: "09.45 – 10.45", ruang: "AKIII.5", sesi: 4 },
    ],
    Kamis: [
      { jam: "07.15 – 09.45", ruang: "AKIII.5", sesi: 1 },
      { jam: "09.45 – 10.45", ruang: "AKIII.5", sesi: 2 },
      { jam: "09.45 – 10.45", ruang: "AKIII.5", sesi: 4 },
    ],
  };

  return (
    <div className="lg:py-5">
      <div className="flex flex-col lg:flex-row w-full justify-between items-center">
        <h2 className="text-2xl font-bold">
          Jadwal Pelajaran {dataKelas?.nama_kelas}
        </h2>

        <Calender className="w-40 lg:w-full"></Calender>
      </div>

      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <div className="mb-6 lg:mb-0">
            <ButtonHref
              text="Tambah Jadwal Pelajaran"
              href={`/dashboard/akademik/jadwal-kelas/${idKelas}/tambah`}
              variant="tambah"
            ></ButtonHref>
          </div>
          <Search className="bg-white"></Search>
        </div>

        <hr className="border-border-grey border"></hr>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr className="border-b border-t border-border-grey font-semibold">
                <th>No</th>
                <th>Mata Pelajaran</th>
                <th>Guru Pengampu</th>
                <th>Hari - Jam ke (Waktu)</th>
                <th>Aksi</th> {/* Tetap rata kiri */}
              </tr>
            </thead>
            <tbody>
              {jadwalKelas.map((data, index) => (
                <tr
                  key={index}
                  className="border-b border-t border-border-grey align-top"
                >
                  <td className="align-top">{index + 1}</td>
                  <td className="align-top">{data.nama_mapel}</td>
                  <td className="align-top">{data.guru_pengampu}</td>
                  <td className="align-top">
                    <div className="space-y-4 ">
                      {Object.entries(jadwal).map(([hari, sesiList]) => (
                        <div key={hari}>
                          <p className="font-semibold text-base">{hari}</p>
                          <ul className="list-disc ml-6 text-sm space-y-1">
                            {sesiList.map((sesi, index) => (
                              <li key={index}>
                                {sesi.sesi} ({sesi.jam}) – {sesi.ruang}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="align-top">
                    <div className="flex items-center gap-2 pr-2">
                      <ButtonHref
                        href={`/dashboard/akademik/jadwal-kelas/edit/${data.id}`}
                        variant="update"
                        text={
                          <PencilSquareIcon className="w-5 h-5 text-amber-300" />
                        }
                      />
                      <span>|</span>
                      <button
                        className="border-0 cursor-pointer"
                        onClick={() => {
                          document.getElementById("my_modal_3").showModal();
                        }}
                      >
                        <TrashIcon className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
