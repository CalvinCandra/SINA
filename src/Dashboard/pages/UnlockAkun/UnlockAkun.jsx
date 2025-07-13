import Calender from "../../components/Calender/Calender";
import Search from "../../../component/Input/Search";
import { LockOpenIcon } from "@heroicons/react/16/solid";
import Button from "../../../component/Button/Button";
import Toast from "../../../component/Toast/Toast";
import Loading from "../../../component/Loading/Loading";
import { formatTanggalLengkap } from "../../../utils/helper/dateFormat";
import { useUnlockAkun } from "../../../hooks/UnlockAkun/UnlockAkun";

export default function UnlockAkun() {
  const {
    dataAkun,
    selectedAkun,
    setSelectedAkun,
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
    handleOpenAkun,
  } = useUnlockAkun();

  return (
    <>
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}

      <div className="lg:py-5">
        <div className="flex flex-col lg:flex-row w-full justify-between items-center">
          <h2 className="text-2xl font-semibold">Akun Terblokir</h2>
          <Calender className="w-40 lg:w-full"></Calender>
        </div>

        <div className="w-full p-5 rounded-md bg-white mt-5">
          <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center gap-y-3 mb-5">
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
                  <th>Username</th>
                  <th>Email</th>
                  <th>Sebagai</th>
                  <th>Tanggal Terblokir</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="py-4 text-base italic text-gray-400 mt-5 text-center"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : currentData.length == 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="py-4 text-base italic text-gray-400 mt-5 text-center"
                    >
                      Data Akun Terblokir Tidak Ada
                    </td>
                  </tr>
                ) : (
                  currentData.map((data, index) => (
                    <tr
                      className="border-b border-t border-border-grey"
                      key={data.index + 1}
                    >
                      <td>{index + 1}</td>
                      <td className="whitespace-nowrap font-bold">
                        {data.username}
                      </td>
                      <td className="whitespace-nowrap">{data.email}</td>
                      <td className="whitespace-nowrap">{data.role}</td>
                      <td className="whitespace-nowrap">
                        {formatTanggalLengkap(data.last_failed_at)}
                      </td>
                      <td>
                        <div className="flex items-center justify-between">
                          <button
                            className="border-0 cursor-pointer flex items-center gap-2 hover:underline"
                            onClick={() => {
                              setSelectedAkun(data);
                              document.getElementById("my_modal_3").showModal();
                            }}
                          >
                            <LockOpenIcon className="w-5 h-5 text-red-500" />
                            Buka Blokir
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
            Menampilkan {indexOfFirstData + 1} -{" "}
            {indexOfLastData > dataAkun.length
              ? dataAkun.length
              : indexOfLastData}{" "}
            dari {dataAkun.length} Data Akun Terblokir
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
              {selectedAkun && (
                <p className="text-center my-2">
                  Anda yakin ingin membuka akun <b>{selectedAkun.username}</b>?
                </p>
              )}
              <div className="w-56 mx-auto p-1 flex justify-between items-center mt-4">
                <form method="dialog" className="w-full me-1">
                  <Button variant="button_submit_cancel" text="Cancel" />
                </form>
                <form className="w-full ms-1" onSubmit={handleOpenAkun}>
                  <div className="w-full">
                    <Button
                      text={isLoading ? <Loading /> : "Buka Blokir"}
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
