import Calender from "../../../components/Calender/Calender";
import Search from "../../../../component/Input/Search";
import ButtonHref from "../../../../component/Button/ButtonHref";
import { ArrowLeftCircleIcon } from "@heroicons/react/16/solid";
import baseUrl from "../../../../utils/config/baseUrl";
import { useAbsenSiswa } from "../../../../hooks/Siswa/Absen/AbsenSiswa";

export default function AbsenSiswaPage() {
  const {
    defaultImage,
    dataKelas,
    dataSiswa,
    currentData,
    isLoading,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    totalPages,
    indexOfFirstData,
    indexOfLastData,
  } = useAbsenSiswa();
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
            Absensi Siswa Kelas {dataKelas.nama_kelas} Tingkat{" "}
            {dataKelas.tingkat}
          </h2>
        </div>
        <Calender className="w-40 lg:w-full"></Calender>
      </div>

      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* header tabel */}
        <div className="w-full flex justify-end items-center -mb-0.5">
          <Search
            className="bg-white"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          ></Search>
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
              {isLoading ? (
                <tr>
                  <td
                    colSpan="8"
                    className="text-base italic text-gray-400 mt-5 text-center py-4"
                  >
                    Loading...
                  </td>
                </tr>
              ) : currentData.length == 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="text-base italic text-gray-400 mt-5 text-center py-4"
                  >
                    Data Siswa Belum Ada
                  </td>
                </tr>
              ) : (
                currentData.map((data, index) => (
                  <tr
                    className="border-b border-t border-border-grey"
                    key={index + 1}
                  >
                    <td>{index + 1}</td>
                    <td className="whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-circle w-12 h-12">
                            <img
                              src={
                                data.foto_profil
                                  ? `${baseUrl.apiUrlImageSiswa}/Upload/profile_image/${data.foto_profil}`
                                  : defaultImage
                              }
                              alt="Avatar"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold capitalize">
                            {data.nama_siswa}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap">{data.nisn}</td>
                    <td className="whitespace-nowrap">{data.nis}</td>
                    <td className="text-green-500">{data.hadir}</td>
                    <td className="text-sky-500">{data.izin}</td>
                    <td className="text-amber-500">{data.sakit}</td>
                    <td className="text-red-500">{data.alpa}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col lg:flex-row justify-between items-center w-full my-4">
        <p className="text-sm mb-3 lg:mb-0">
          Menampilkan Data {indexOfFirstData + 1} -{" "}
          {indexOfLastData > dataSiswa.length
            ? dataSiswa.length
            : indexOfLastData}{" "}
          dari {dataSiswa.length} Data Siswa Kelas {dataKelas.nama_kelas}{" "}
          Tingkat {dataKelas.tingkat}
        </p>
        <div className="join">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`join-item btn border-0 ${
                currentPage === index + 1
                  ? "bg-biru-primary text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
