import Calender from "../../../components/Calender/Calender";
import ButtonHref from "../../../../component/Button/ButtonHref";
import Button from "../../../../component/Button/Button";
import Search from "../../../../component/Input/Search";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import { useRapotSiswa } from "../../../../hooks/Rapot/RapotSiswa";
import baseUrl from "../../../../utils/config/baseUrl";
import Toast from "../../../../component/Toast/Toast";
import Loading from "../../../../component/Loading/Loading";

export default function DataSiswaPage() {
  const {
    dataKelas,
    dataSiswa,
    currentData,
    isLoading,
    toastMessage,
    toastVariant,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    totalPages,
    indexOfLastData,
    indexOfFirstData,
    handleRapot,
  } = useRapotSiswa();
  return (
    <>
      <div className="lg:py-5">
        {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
        <div className="flex flex-col lg:flex-row w-full lg:justify-between items-center">
          <div className="flex items-center">
            <div className="me-3">
              <ButtonHref
                text=<ArrowLeftCircleIcon className="w-6 h-6 "></ArrowLeftCircleIcon>
                href="/dashboard/akademik/rapot"
              />
            </div>
            <h2 className="text-2xl font-semibold mb-3 lg:mb-0">
              Data Siswa {dataKelas.nama_kelas} Tingkat {dataKelas.tingkat}
            </h2>
          </div>
          <Calender className="w-40 lg:w-full"></Calender>
        </div>

        <div className="w-full p-5 rounded-md bg-white mt-5">
          <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
            <Search
              className="bg-white"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <hr className="border-border-grey border" />

          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              <thead>
                <tr className="border-b border-t border-border-grey">
                  <th>No</th>
                  <th>Nama</th>
                  <th>NISN</th>
                  <th>NIS</th>
                  <th>Jenis Kelamin</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="italic text-gray-400 mt-5 text-center py-4"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : currentData.length == 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="italic text-gray-400 mt-5 text-center py-4"
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
                      <td>{indexOfFirstData + index + 1}</td>
                      <td className="whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-circle w-12 h-12">
                              <img
                                src={`${baseUrl.apiUrlImageSiswa}/Upload/profile_image/${data.foto_profil}`}
                                alt="Avatar"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{data.nama_siswa}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap">{data.nisn}</td>
                      <td className="whitespace-nowrap">{data.nis}</td>
                      <td className="whitespace-nowrap capitalize">
                        {data.jenis_kelamin}
                      </td>
                      <td>
                        <button
                          className="border-0 cursor-pointer  hover:underline"
                          onClick={(e) => {
                            e.preventDefault();
                            handleRapot(e, data.nis);
                          }}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <Loading />
                          ) : (
                            <span className="flex items-center gap-1.5">
                              <DocumentMagnifyingGlassIcon className="w-5 h-5 text-sky-500" />
                              Preview
                            </span>
                          )}
                        </button>
                      </td>
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
            dari {dataSiswa.length} Data Siswa {dataKelas.nama_kelas} Tingkat{" "}
            {dataKelas.tingkat}
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

        {/* Modal Konfirmasi Send Mail All */}
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box bg-white rounded-lg">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div className="mt-5">
              <h1 className="font-bold text-3xl text-center">Informasi!</h1>
              <p className="text-center my-2">Masih Belum Tahap Yudisium</p>
              <div className="w-56 mx-auto p-1 flex justify-between items-center mt-4">
                <form method="dialog" className="w-full me-1">
                  <Button variant="button_submit_dash" text="Kembali" />
                </form>
              </div>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
}
