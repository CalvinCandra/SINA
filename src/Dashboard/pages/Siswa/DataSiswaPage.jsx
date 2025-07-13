import Calender from "../../components/Calender/Calender";
import ButtonHref from "../../../component/Button/ButtonHref";
import Search from "../../../component/Input/Search";
import {
  PencilSquareIcon,
  TrashIcon,
  DocumentMagnifyingGlassIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/16/solid";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import Button from "../../../component/Button/Button";
import Toast from "../../../component/Toast/Toast";
import Loading from "../../../component/Loading/Loading";
import baseUrl from "../../../utils/config/baseUrl";
import { useSiswa } from "../../../hooks/Siswa/Siswa";

export default function DataSiswaPage() {
  const {
    defaultImage,
    dataKelas,
    dataSiswa,
    selectedSiswa,
    setSelectedSiswa,
    currentData,
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
    handleDeleteSiswa,
    handleSendMailSiswa,
    handleSendMail,
  } = useSiswa();

  return (
    <>
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}

      <div className="lg:py-5">
        <div className="flex flex-col lg:flex-row w-full lg:justify-between items-center">
          <div className="flex items-center">
            <div className="me-3">
              <ButtonHref
                text=<ArrowLeftCircleIcon className="w-6 h-6 "></ArrowLeftCircleIcon>
                href="/dashboard/siswa"
              />
            </div>
            <h2 className="text-2xl font-semibold mb-3 lg:mb-0">
              Data Siswa Kelas {dataKelas.nama_kelas} Tingkat{" "}
              {dataKelas.tingkat}
            </h2>
          </div>
          <Calender className="w-40 lg:w-full"></Calender>
        </div>

        <div className="w-full p-5 rounded-md bg-white mt-5">
          <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center mb-5 gap-y-3">
            <div className="flex flex-col lg:gap-5">
              <div className="flex flex-col lg:flex-row lg:items-center lg:gap-2">
                <div className="">
                  <ButtonHref
                    text="Tambah Siswa"
                    href={`/dashboard/siswa/${dataKelas.kelas_id}/tambah`}
                    variant="tambah"
                  />
                </div>
                <div className="mt-5 mb-4 lg:mt-0 lg:mb-0">
                  <ButtonHref
                    text="Tambah Siswa Via Excel"
                    href={`/dashboard/siswa/${dataKelas.kelas_id}/tambahExcel`}
                    variant="tambah"
                  />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center lg:gap-2">
                <div className="">
                  <button
                    className="lg:w-full px-3 bg-green-500 text-sm hover:bg-green-600 py-2 font-semibold text-white rounded cursor-pointer"
                    onClick={() => {
                      document.getElementById("my_modal_5").showModal();
                    }}
                  >
                    Kirim Semua Email
                  </button>
                </div>
              </div>
            </div>
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
                      className="text-base italic text-gray-400 mt-5 text-center"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : currentData.length == 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-base italic text-gray-400 mt-5 text-center"
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
                      <td className="whitespace-nowrap capitalize">
                        {data.jenis_kelamin}
                      </td>
                      <td>
                        <div className="flex items-center justify-between w-14 gap-1.5">
                          <button
                            className="border-0 cursor-pointer"
                            onClick={() => {
                              setSelectedSiswa(data);
                              document.getElementById("my_modal_4").showModal();
                            }}
                          >
                            <PaperAirplaneIcon className="w-5 h-5 text-green-500" />
                          </button>
                          |
                          <ButtonHref
                            href={`/dashboard/siswa/${dataKelas.kelas_id}/detail/${data.nis}`}
                            text=<DocumentMagnifyingGlassIcon className="w-5 h-5 text-sky-500"></DocumentMagnifyingGlassIcon>
                          ></ButtonHref>
                          |
                          <ButtonHref
                            href={`/dashboard/siswa/${dataKelas.kelas_id}/update/${data.nis}`}
                            variant="update"
                            text={
                              <PencilSquareIcon className="w-5 h-5 text-amber-300" />
                            }
                          />
                          |
                          <button
                            className="border-0 cursor-pointer"
                            onClick={() => {
                              setSelectedSiswa(data);
                              document.getElementById("my_modal_3").showModal();
                            }}
                          >
                            <TrashIcon className="w-5 h-5 text-red-500" />
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

        {/* Modal Konfirmasi Hapus */}
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box bg-white rounded-lg">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div className="mt-5">
              <h1 className="font-bold text-3xl text-center">Konfirmasi!</h1>
              {selectedSiswa && (
                <p className="text-center my-2">
                  Anda yakin ingin menghapus data{" "}
                  <b>{selectedSiswa.nama_siswa}</b>?
                </p>
              )}
              <div className="w-56 mx-auto p-1 flex justify-between items-center mt-4">
                <form method="dialog" className="w-full me-1">
                  <Button variant="button_submit_cancel" text="Cancel" />
                </form>
                <form className="w-full ms-1" onSubmit={handleDeleteSiswa}>
                  <div className="w-full">
                    <Button
                      text={isLoading ? <Loading /> : "Hapus Siswa"}
                      variant="button_submit_dash"
                      disabled={isLoading}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </dialog>

        {/* Modal Konfirmasi Send Mail */}
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box bg-white rounded-lg">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div className="mt-5">
              <h1 className="font-bold text-3xl text-center">Konfirmasi!</h1>
              {selectedSiswa && (
                <p className="text-center my-2">
                  Anda yakin ingin mengirim email kepada {""}
                  <b>{selectedSiswa.nama_siswa}</b>?
                </p>
              )}
              <div className="w-56 mx-auto p-1 flex justify-between items-center mt-4">
                <form method="dialog" className="w-full me-1">
                  <Button variant="button_submit_cancel" text="Cancel" />
                </form>
                <form
                  className="w-full ms-1"
                  onSubmit={(e) => {
                    handleSendMailSiswa(e, selectedSiswa.nis);
                  }}
                >
                  <div className="w-full">
                    <Button
                      text={isLoading ? <Loading /> : "Kirim Email"}
                      variant="button_submit_dash"
                      disabled={isLoading}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </dialog>

        {/* Modal Konfirmasi Send Mail All */}
        <dialog id="my_modal_5" className="modal">
          <div className="modal-box bg-white rounded-lg">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div className="mt-5">
              <h1 className="font-bold text-3xl text-center">Konfirmasi!</h1>
              <p className="text-center my-2">Kirim Email Secara Bersamaan?</p>
              <div className="w-56 mx-auto p-1 flex justify-between items-center mt-4">
                <form method="dialog" className="w-full me-1">
                  <Button variant="button_submit_cancel" text="Cancel" />
                </form>
                <form className="w-full ms-1" onSubmit={handleSendMail}>
                  <div className="w-full">
                    <Button
                      text={isLoading ? <Loading /> : "Kirim Email"}
                      variant="button_submit_dash"
                      disabled={isLoading}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
}
