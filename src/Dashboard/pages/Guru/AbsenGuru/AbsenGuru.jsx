import Calender from "../../../components/Calender/Calender";
import Search from "../../../../component/Input/Search";
import ButtonHref from "../../../../component/Button/ButtonHref";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import { useGuru } from "../../../../hooks/Guru/Guru";
import baseUrl from "../../../../utils/config/baseUrl";

export default function AbsenGuru() {
  const {
    dataGuru,
    currentData,
    isLoading,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    indexOfFirstData,
    indexOfLastData,
    totalPages,
  } = useGuru();

  return (
    <div className="lg:py-5">
      <div className="flex flex-col lg:flex-row w-full justify-between items-center">
        <h2 className="text-2xl font-semibold">Data Absensi Guru</h2>
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
                <td>NIP</td>
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
                    colSpan="7"
                    className="text-base italic text-gray-400 mt-5 text-center py-4"
                  >
                    Loading...
                  </td>
                </tr>
              ) : currentData.length == 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-base italic text-gray-400 mt-5 text-center py-4"
                  >
                    Data Guru Belum Ada
                  </td>
                </tr>
              ) : (
                currentData.map((data, index) => (
                  <tr
                    className="border-b border-t border-border-grey"
                    key={data.nip}
                  >
                    <td>{index + 1}</td>
                    <td className="whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-circle w-12 h-12">
                            {data.foto_profil ? (
                              <img
                                src={`${baseUrl.apiUrlImage}/Upload/profile_image/${data.foto_profil}`}
                                alt="Avatar"
                              />
                            ) : (
                              <img
                                src="https://manbengkuluselatan.sch.id/assets/img/profile/default.jpg"
                                alt="Avatar"
                              ></img>
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{data.nama_guru}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap">{data.nip}</td>
                    <td className="whitespace-nowrap">1</td>
                    <td className="whitespace-nowrap">0</td>
                    <td className="whitespace-nowrap">0</td>
                    <td className="whitespace-nowrap">0</td>
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
          {indexOfLastData > dataGuru.length
            ? dataGuru.length
            : indexOfLastData}{" "}
          dari {dataGuru.length} Data Guru
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
