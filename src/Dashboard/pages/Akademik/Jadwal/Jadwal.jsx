import { useState, useEffect } from "react";
import Calender from "../../../components/Calender/Calender";
import Search from "../../../../component/Input/Search";
import ButtonHref from "../../../../component/Button/ButtonHref";
import {
  TrashIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/16/solid";
import DataKelas from "../../../../data/Kelas/DataKelas";
import axios from "axios";
import baseUrl from "../../../../utils/config/baseUrl";

export default function Jadwal() {
  const [setKelas, setdataKelas] = useState([]);
  const token = sessionStorage.getItem("session");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl.apiUrl}/admin/kelas`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status == 200 || response.status == 201) {
          setdataKelas(response.data);
        }
      } catch (error) {}
    };

    fetchData();
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
          {setKelas && setKelas.length > 0 ? (
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
                {setKelas.map((data, index) => (
                  <tr
                    className="border-b border-t border-border-grey"
                    key={data.kelas_id}
                  >
                    <td className="whitespace-nowrap">{index + 1}</td>
                    <td className="whitespace-nowrap">{data.nama_kelas}</td>
                    <td className="whitespace-nowrap">{data.tingkat}</td>
                    <td>
                      <div className="flex flex-row items-center">
                        <ButtonHref
                          href={`/dashboard/akademik/jadwal-kelas/${data.kelas_id}`}
                          variant="update"
                          text={
                            <span className="flex items-center mr-6 text-base">
                              <DocumentMagnifyingGlassIcon className="w-5 h-5 text-sky-500 mr-2" />
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
            <div className="italic text-gray-400 mt-5 text-center">
              Data Kelas Belum Ada
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
