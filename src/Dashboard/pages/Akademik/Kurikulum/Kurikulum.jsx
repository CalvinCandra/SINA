import Calender from "../../../components/Calender/Calender";
import ButtonHref from "../../../../component/Button/ButtonHref";
import Search from "../../../../component/Input/Search";
import {
  PencilSquareIcon,
  TrashIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/16/solid";
import Button from "../../../../component/Button/Button";
import Toast from "../../../../component/Toast/Toast";
import Loading from "../../../../component/Loading/Loading";
import { formatTanggalLengkap } from "../../../../utils/helper/dateFormat";
import { useKurikulum } from "../../../../hooks/Kurikulum/Kurikulum";

export default function Kurikulum() {
  const {
    isLoading,
    toastMessage,
    toastVariant,
    indexOfFirstData,
    indexOfLastData,
    dataKurikulum,
    selectedKurikulum,
    setSelectedKurikulum,
    totalPages,
    currentData,
    currentPage,
    handleDeleteKurikulum,
    setCurrentPage,
    setSearchQuery,
    searchQuery,
  } = useKurikulum();
  return (
    <div className="lg:py-5">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="flex flex-col lg:flex-row w-full justify-between items-center">
        <h2 className="text-2xl font-semibold">Data Kurikulum</h2>
        <Calender className="w-40 lg:w-full"></Calender>
      </div>

      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <div className="lg:w-60 mb-6 lg:mb-0">
            <ButtonHref
              text="Tambah Kurikulum"
              href="/dashboard/akademik/kurikulum/tambah"
              variant="tambah"
            ></ButtonHref>
          </div>
          <Search
            className="bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          ></Search>
        </div>

        <hr className="border-border-grey border"></hr>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          {currentData && currentData.length > 0 ? (
            <table className="table w-full">
              <thead>
                <tr className="border-b border-t border-border-grey">
                  <th>No</th>
                  <th>Nama Kurikulum</th>
                  <th>Deskripsi</th>
                  <th>Dibuat</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((data, index) => (
                  <tr
                    className="border-b border-t border-border-grey"
                    key={data.kurikulum_id}
                  >
                    <td>{index + 1}</td>
                    <td className="align-middle">{data.nama_kurikulum}</td>
                    <td className="align-middle text-justify line-clamp-3 w-[600px]">
                      <p className="h-[50px]">{data.deskripsi}</p>
                    </td>
                    <td className="align-middle whitespace-nowrap">
                      {formatTanggalLengkap(data.created_at)}
                    </td>
                    <td>
                      <div className="flex items-center justify-evenly w-20">
                        <button
                          className="border-0 cursor-pointer"
                          onClick={() => {
                            setSelectedKurikulum(data); // simpan data ke state
                            document.getElementById("my_modal_4").showModal();
                          }}
                        >
                          <DocumentMagnifyingGlassIcon className="w-5 h-5 text-sky-500"></DocumentMagnifyingGlassIcon>
                        </button>
                        |
                        <ButtonHref
                          href={`/dashboard/akademik/kurikulum/update/${data.kurikulum_id}`}
                          variant="update"
                          text=<PencilSquareIcon className="w-5 h-5 text-amber-300"></PencilSquareIcon>
                        ></ButtonHref>
                        |
                        <button
                          className="border-0 cursor-pointer"
                          onClick={() => {
                            setSelectedKurikulum(data); // simpan data ke state
                            document.getElementById("my_modal_3").showModal();
                          }}
                        >
                          <TrashIcon className="w-5 h-5 text-red-500"></TrashIcon>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="italic text-gray-400 mt-5 text-center">
              Data Kurikulum Belum Ada
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col lg:flex-row justify-between items-center w-full my-4">
        <p className="text-sm mb-3 lg:mb-0">
          Menampilkan Data {indexOfFirstData + 1} -{" "}
          {indexOfLastData > dataKurikulum.length
            ? dataKurikulum.length
            : indexOfLastData}{" "}
          dari {dataKurikulum.length} Data Kurikulum
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

      {/* Modal Detail*/}
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl bg-white rounded-lg">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="mt-5">
            {selectedKurikulum && (
              <>
                <h1 className="text-3xl text-center">Informasi Kurikulum</h1>
                <table className="table w-full mt-10 mx-auto">
                  <tbody className="">
                    <tr className="border-y border-border-grey">
                      <td className="text-lg font-bold whitespace-nowrap">
                        Nama Kurikulum :
                      </td>
                      <td className="text-lg">
                        {selectedKurikulum.nama_kurikulum}
                      </td>
                    </tr>
                    <tr className="border-y border-border-grey">
                      <td className="text-lg font-bold">Deskripsi :</td>
                      <td className="text-lg">{selectedKurikulum.deskripsi}</td>
                    </tr>
                    <tr className="border-y border-border-grey">
                      <td className="text-lg font-bold">Tanggal dibuat:</td>
                      <td className="text-lg">
                        {formatTanggalLengkap(selectedKurikulum.created_at)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </dialog>

      {/* Modal Hapus*/}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-white rounded-lg">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="mt-5">
            <h1 className="font-bold text-3xl text-center">Konfirmasi!</h1>
            {selectedKurikulum && (
              <p className="text-center my-2">
                Anda yakin ingin menghapus data{" "}
                <b>{selectedKurikulum.nama_kurikulum}</b>?
              </p>
            )}
            <div className="w-56 mx-auto p-1 flex justify-between items-center mt-4">
              <form method="dialog" className="w-full me-1">
                <Button variant="button_submit_cancel" text="Cancel"></Button>
              </form>
              <form className="w-full ms-1" onSubmit={handleDeleteKurikulum}>
                <div className="w-full">
                  <Button
                    variant="button_submit_dash"
                    text={isLoading ? <Loading /> : "Hapus"}
                    disabled={isLoading}
                  ></Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}
