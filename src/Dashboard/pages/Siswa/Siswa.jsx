import Calender from "../../components/Calender/Calender";
import ButtonHref from "../../../component/Button/ButtonHref";
import {
  TrashIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/16/solid";
import Toast from "../../../component/Toast/Toast";
import { useSiswaKelas } from "../../../hooks/Siswa/SiswaKelas";
import { formatTahun } from "../../../utils/helper/dateFormat";

export default function Siswa() {
  const { kelas, toastMessage, toastVariant, isLoading } = useSiswaKelas();

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
        </div>

        <hr className="border-border-grey border"></hr>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr className="border-b border-t border-border-grey">
                <th>No</th>
                <th>Nama Kelas</th>
                <th>Tingkat</th>
                <th>Wali Kelas</th>
                <th>Tahun Akademik</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-base italic text-gray-400 mt-5 text-center py-4"
                  >
                    Loading...
                  </td>
                </tr>
              ) : kelas.length == 0 && kelas == 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-base italic text-gray-400 mt-5 text-center py-4"
                  >
                    Data Kelas Belum Ada
                  </td>
                </tr>
              ) : (
                kelas.map((data, index) => (
                  <tr
                    className="border-b border-t border-border-grey"
                    key={data.kelas_id}
                  >
                    <td className="whitespace-nowrap">{index + 1}</td>
                    <td className="whitespace-nowrap">{data.nama_kelas}</td>
                    <td className="whitespace-nowrap">{data.tingkat}</td>
                    <td className="whitespace-nowrap">{data.nama_guru}</td>
                    <td className="whitespace-nowrap">
                      {formatTahun(data.tahun_mulai)} -{" "}
                      {formatTahun(data.tahun_berakhir)}
                    </td>
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
