import Calender from "../../components/Calender/Calender";
import ButtonHref from "../../../component/Button/ButtonHref";
import Search from "../../../component/Input/Search";
import {
  PencilSquareIcon,
  TrashIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/16/solid";
import Button from "../../../component/Button/Button";
import Toast from "../../../component/Toast/Toast";
import Loading from "../../../component/Loading/Loading";
import baseUrl from "../../../utils/config/baseUrl";
import { useAdmin } from "../../../hooks/Admin/Admin";
import { formatTanggalLengkap } from "../../../utils/helper/dateFormat";

export default function Admin() {
  const {
    dataAdmin,
    selectedAdmin,
    setSelectedAdmin,
    currentData,
    isLoading,
    toastMessage,
    toastVariant,
    indexOfFirstData,
    indexOfLastData,
    totalPages,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    handleDeleteAdmin,
    handleSendMailAdmin,
    handleSendMail,
  } = useAdmin();

  return (
    <>
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}

      <div className="lg:py-5">
        <div className="flex flex-col lg:flex-row w-full justify-between items-center">
          <h2 className="text-2xl font-semibold">Data Admin / Staf</h2>
          <Calender className="w-40 lg:w-full"></Calender>
        </div>

        <div className="w-full p-5 rounded-md bg-white mt-5">
          <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center gap-y-3 mb-5">
            <div className="flex items-center gap-2 lg:gap-0">
              <div className="lg:w-40">
                <ButtonHref
                  text="Tambah Admin"
                  href="/dashboard/admin/tambah"
                  variant="tambah"
                />
              </div>
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
                  <th>Email</th>
                  <th>Bergabung</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-4 text-base italic text-gray-400 mt-5 text-center"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : currentData.length == 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-4 text-base italic text-gray-400 mt-5 text-center"
                    >
                      Data Admin Tidak Ada
                    </td>
                  </tr>
                ) : (
                  currentData.map((data, index) => (
                    <tr
                      className="border-b border-t border-border-grey"
                      key={data.admin_id}
                    >
                      <td>{index + 1}</td>
                      <td className="whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-circle w-12 h-12">
                              <img
                                src={`${baseUrl.apiUrlImage}/Upload/profile_image/${data.foto_profil}`}
                                alt="Avatar"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{data.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap">{data.email}</td>
                      <td className="whitespace-nowrap">
                        {formatTanggalLengkap(data.created_at)}
                      </td>
                      <td>
                        <div className="flex items-center justify-between w-14 gap-1.5">
                          <button
                            className="border-0 cursor-pointer"
                            onClick={() => {
                              setSelectedAdmin(data);
                              document.getElementById("my_modal_4").showModal();
                            }}
                          >
                            <PaperAirplaneIcon className="w-5 h-5 text-green-500" />
                          </button>
                          |
                          <ButtonHref
                            href={`/dashboard/admin/update/${data.admin_id}`}
                            variant="update"
                            text={
                              <PencilSquareIcon className="w-5 h-5 text-amber-300" />
                            }
                          />
                          |
                          <button
                            className="border-0 cursor-pointer"
                            onClick={() => {
                              setSelectedAdmin(data);
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
            Menampilkan {indexOfFirstData + 1} -{" "}
            {indexOfLastData > dataAdmin.length
              ? dataAdmin.length
              : indexOfLastData}{" "}
            dari {dataAdmin.length} Data Admin
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
              {selectedAdmin && (
                <p className="text-center my-2">
                  Anda yakin ingin menghapus data{" "}
                  <b>{selectedAdmin.username}</b>?
                </p>
              )}
              <div className="w-56 mx-auto p-1 flex justify-between items-center mt-4">
                <form method="dialog" className="w-full me-1">
                  <Button variant="button_submit_cancel" text="Cancel" />
                </form>
                <form className="w-full ms-1" onSubmit={handleDeleteAdmin}>
                  <div className="w-full">
                    <Button
                      text={isLoading ? <Loading /> : "Hapus Admin"}
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
              {selectedAdmin && (
                <p className="text-center my-2">
                  Anda yakin ingin mengirim email kepada {""}
                  <b>{selectedAdmin.username}</b>?
                </p>
              )}
              <div className="w-56 mx-auto p-1 flex justify-between items-center mt-4">
                <form method="dialog" className="w-full me-1">
                  <Button variant="button_submit_cancel" text="Cancel" />
                </form>
                <form
                  className="w-full ms-1"
                  onSubmit={(e) => {
                    handleSendMailAdmin(e, selectedAdmin.admin_id);
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
