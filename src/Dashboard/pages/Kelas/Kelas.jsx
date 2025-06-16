import Calender from "../../components/Calender/Calender";
import ButtonHref from "../../../component/Button/ButtonHref";
import Search from "../../../component/Input/Search";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import Button from "../../../component/Button/Button";
import Toast from "../../../component/Toast/Toast";
import Loading from "../../../component/Loading/Loading";
import { useKelas } from "../../../hooks/Kelas/Kelas";
import {
  formatTahun,
  formatTanggalLengkap,
} from "../../../utils/helper/dateFormat";

export default function Kelas() {
  const {
    dataKelas,
    currentData,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    totalPages,
    indexOfFirstData,
    indexOfLastData,
    selectedKelas,
    setSelectedKelas,
    isLoading,
    toastMessage,
    toastVariant,
    handleDeleteKelas,
  } = useKelas();

  return (
    <div className="lg:py-5">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="flex flex-col lg:flex-row w-full justify-between items-center">
        <div className="flex items-center">
          <h2 className="text-2xl font-semibold me-2">Data Kelas</h2>
        </div>
        <Calender className="w-40 lg:w-full"></Calender>
      </div>

      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <div className="lg:w-40 mb-6 lg:mb-0">
            <ButtonHref
              text="Tambah Kelas"
              href="/dashboard/kelas/tambah"
              variant="tambah"
            ></ButtonHref>
          </div>
          <Search
            className="bg-white"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          ></Search>
        </div>

        <hr className="border-border-grey border"></hr>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr className="border-b border-t border-border-grey">
                <th>No</th>
                <th>Nama Kelas</th>
                <th>Tingkat Kelas</th>
                <th>Wali Kelas</th>
                <th>Tahun Akademik</th>
                <th>Dibuat</th>
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
              ) : currentData.length == 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-base italic text-gray-400 mt-5 text-center py-4"
                  >
                    Data Kelas Belum Ada
                  </td>
                </tr>
              ) : (
                currentData.map((data, index) => (
                  <tr
                    className="border-b border-t border-border-grey"
                    key={data.kelas_id}
                  >
                    <td>{index + 1}</td>
                    <td className="whitespace-nowrap">{data.nama_kelas}</td>
                    <td className="whitespace-nowrap">{data.tingkat}</td>
                    <td className="whitespace-nowrap">
                      {data.nama_guru || `Belum Ada`}
                    </td>
                    <td className="whitespace-nowrap">
                      {formatTahun(data.tahun_mulai)} -{" "}
                      {formatTahun(data.tahun_berakhir)}
                    </td>
                    <td className="whitespace-nowrap">
                      {formatTanggalLengkap(data.created_at)}
                    </td>
                    <td>
                      <div className="flex items-center justify-evenly w-20">
                        <ButtonHref
                          href={`/dashboard/kelas/update/${data.kelas_id}`}
                          variant="update"
                          text=<PencilSquareIcon className="w-5 h-5 text-amber-300"></PencilSquareIcon>
                        ></ButtonHref>
                        |
                        <button
                          className="border-0 cursor-pointer"
                          onClick={() => {
                            setSelectedKelas(data); // simpan data ke state
                            document.getElementById("my_modal_3").showModal();
                          }}
                        >
                          <TrashIcon className="w-5 h-5 text-red-500"></TrashIcon>
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
          {indexOfLastData > dataKelas.length
            ? dataKelas.length
            : indexOfLastData}{" "}
          dari {dataKelas.length} Data Kelas
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

      {/* Modal */}
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
            {selectedKelas && (
              <p className="text-center my-2">
                Anda yakin ingin menghapus data{" "}
                <b>
                  {selectedKelas.nama_kelas} Tingkat {selectedKelas.tingkat}
                </b>
                ?
              </p>
            )}
            <div className="w-56 mx-auto p-1 flex justify-between items-center mt-4">
              <form method="dialog" className="w-full me-1">
                <Button variant="button_submit_cancel" text="Cancel"></Button>
              </form>
              <form className="w-full ms-1" onSubmit={handleDeleteKelas}>
                <div className="w-full">
                  <Button
                    variant="button_submit_dash"
                    text={isLoading ? <Loading /> : "Hapus Kelas"}
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
