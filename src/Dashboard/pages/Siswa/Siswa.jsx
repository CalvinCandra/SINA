import { useEffect, useState } from "react";
import Calender from "../../components/Calender/Calender";
import ButtonHref from "../../../component/Button/ButtonHref";
import Search from "../../../component/Input/Search";
import {
  TrashIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/16/solid";
import Toast from "../../../component/Toast/Toast";
import DataKelas from "../../../data/Kelas/DataKelas";
import axios from "axios";
import baseUrl from "../../../utils/config/baseUrl";

export default function Siswa() {
  const [kelas, setDataKelas] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const token = sessionStorage.getItem("session");
  useEffect(() => {
    const fecthData = async () => {
      try {
        const respones = await axios.get(`${baseUrl.apiUrl}/admin/kelas`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (respones.status == 200) {
          setDataKelas(respones.data);
        }
      } catch (error) {
        console.log(error);
        setToastMessage(`Gagal Mengambil Data`);
        setToastVariant("error");
      }
    };

    fecthData();
  });

  return (
    <div className="lg:py-5">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="flex flex-col lg:flex-row w-full justify-between items-center">
        <h2 className="text-2xl font-semibold">Data Siswa</h2>
        <Calender className="w-40 lg:w-full"></Calender>
      </div>

      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <div className="lg:w-40 mb-6 lg:mb-0">
            <h1 className="text-lg font-semibold">Daftar Kelas</h1>
          </div>
          <Search className="bg-white"></Search>
        </div>

        <hr className="border-border-grey border"></hr>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          {kelas && kelas.length > 0 ? (
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
                {kelas.map((data, index) => (
                  <tr
                    className="border-b border-t border-border-grey"
                    key={data.kelas_id}
                  >
                    <td className="whitespace-nowrap">{index + 1}</td>
                    <td className="whitespace-nowrap">{data.nama_kelas}</td>
                    <td className="whitespace-nowrap">{data.tingkat}</td>
                    <td>
                      <div className="flex items-center lg:flex-row">
                        <ButtonHref
                          href={`/dashboard/siswa/${data.kelas_id}`}
                          text=<span className="flex items-center">
                            <DocumentMagnifyingGlassIcon className="lg:w-5 lg:h-5 w-6 h-6 me-2 text-sky-500"></DocumentMagnifyingGlassIcon>
                            <span className="whitespace-nowrap">
                              Data Siswa
                            </span>
                          </span>
                        ></ButtonHref>

                        <button className="border-0 cursor-pointer ms-5">
                          <div className="flex items-center w-full">
                            <TrashIcon className="w-5 h-5 me-2 text-red-500"></TrashIcon>
                            <span className="whitespace-nowrap">
                              Hapus Semua Data Siswa
                            </span>
                          </div>
                        </button>
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
