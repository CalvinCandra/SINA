import Calender from "../../../components/Calender/Calender";
import SelectField from "../../../../component/Input/SelectField";
import Search from "../../../../component/Input/Search";
import ButtonHref from "../../../../component/Button/ButtonHref";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useSiswaKelas } from "../../../../hooks/Siswa/SiswaKelas";
import { formatTahun } from "../../../../utils/helper/dateFormat";

export default function AbsenKelasSiswa() {
  const { kelas, isLoading } = useSiswaKelas();

  return (
    <div className="lg:py-5">
      <div className="flex flex-col lg:flex-row w-full justify-between items-center">
        <h2 className="text-2xl font-semibold">Data Absensi Siswa</h2>
        <Calender className="w-40 lg:w-full"></Calender>
      </div>

      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* header tabel */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <div className="lg:w-50 mb-6 lg:mb-0">
            <h2 className="text-lg font-semibold">Nama Kelas</h2>
          </div>
        </div>

        <hr className="border-border-grey border"></hr>

        {/* tabel */}
        <div className="overflow-x-auto wf-full">
          <table className="table w-full">
            <thead>
              <tr className="border-b border-t border-border-grey">
                <td>No</td>
                <td>Nama Kelas</td>
                <td>Tingat Kelas</td>
                <td>Wali Kelas</td>
                <td>Kurikulum</td>
                <td>Tahun Akademik</td>
                <td>Aksi</td>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-base italic text-gray-400 mt-5 text-center py-4"
                  >
                    Loading...
                  </td>
                </tr>
              ) : kelas.length == 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-base italic text-gray-400 mt-5 text-center py-4"
                  >
                    Data Kelas Belum Ada
                  </td>
                </tr>
              ) : (
                kelas.map((data, index) => (
                  <tr className="border-b border-border-grey" key={index + 1}>
                    <td>{index + 1}</td>
                    <td>{data.nama_kelas}</td>
                    <td>{data.tingkat}</td>
                    <td className="whitespace-nowrap">
                      {data.nama_guru || `Belum Ada`}
                    </td>
                    <td>{data.nama_kurikulum}</td>
                    <td className="whitespace-nowrap">
                      {formatTahun(data.tahun_mulai)} -{" "}
                      {formatTahun(data.tahun_berakhir)}
                    </td>

                    <td>
                      <div className="flex items-center lg:flex-row">
                        <ButtonHref
                          href={`/dashboard/siswa/absen/${data.kelas_id}`}
                          text=<span className="flex items-center gap-2 hover:underline">
                            <DocumentMagnifyingGlassIcon className="w-5 h-5 text-sky-500"></DocumentMagnifyingGlassIcon>
                            <span className="whitespace-nowrap">
                              Data Absensi Siswa
                            </span>
                          </span>
                        ></ButtonHref>
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
