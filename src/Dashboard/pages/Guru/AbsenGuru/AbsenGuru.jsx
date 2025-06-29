import Calender from "../../../components/Calender/Calender";
import Search from "../../../../component/Input/Search";
import baseUrl from "../../../../utils/config/baseUrl";
import { useAbsenGuru } from "../../../../hooks/Guru/Absen/AbsenGuru";
import Toast from "../../../../component/Toast/Toast";

export default function AbsenGuru() {
  const {
    defaultImage,
    dataGuru,
    currentData,
    TahunOption,
    TahunAkademik,
    setTahunAkademik,
    isLoading,
    toastMessage,
    toastVariant,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    totalPages,
    indexOfFirstData,
    indexOfLastData,
  } = useAbsenGuru();

  return (
    <div className="lg:py-5">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="flex flex-col lg:flex-row w-full justify-between items-center">
        <h2 className="text-2xl font-semibold">Data Absensi Guru</h2>
        <Calender className="w-40 lg:w-full"></Calender>
      </div>

      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* header tabel */}
        <div className="w-full flex flex-col-reverse lg:flex-row justify-between lg:items-center -mb-0.5">
          <select
            className="select bg-white border border-border-grey w-40 rounded-lg mt-5 lg:mt-0"
            value={TahunAkademik}
            onChange={(e) => {
              setTahunAkademik(e.target.value);
              setCurrentPage(1);
            }}
          >
            {TahunOption.map((tahun) => (
              <option key={tahun.value} value={tahun.value}>
                {tahun.label}
              </option>
            ))}
          </select>

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
                                  ? `${baseUrl.apiUrlImage}/Upload/profile_image/${data.foto_profil}`
                                  : defaultImage
                              }
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{data.nama_guru}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap">{data.nip}</td>
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
