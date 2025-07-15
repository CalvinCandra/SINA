import Calender from "../../../components/Calender/Calender";
import ButtonHref from "../../../../component/Button/ButtonHref";
import Search from "../../../../component/Input/Search";
import {
  PencilSquareIcon,
  TrashIcon,
  DocumentMagnifyingGlassIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/16/solid";
import Button from "../../../../component/Button/Button";
import Toast from "../../../../component/Toast/Toast";
import Loading from "../../../../component/Loading/Loading";
import baseUrl from "../../../../utils/config/baseUrl";
import { formatTanggalLengkap } from "../../../../utils/helper/dateFormat";
import { useGuru } from "../../../../hooks/Guru/Guru";

export default function DataGuru() {
  const {
    dataGuru,
    selectedGuru,
    setSelectedGuru,
    currentData,
    isLoading,
    toastMessage,
    toastVariant,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    indexOfFirstData,
    indexOfLastData,
    totalPages,
    handleDeleteGuru,
    handleSendMail,
    handleSendMailGuru,
  } = useGuru();

  return (
    <div className="lg:py-5">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="flex flex-col lg:flex-row w-full justify-between items-center">
        <h2 className="text-2xl font-semibold">Guru</h2>
        <Calender className="w-40 lg:w-full"></Calender>
      </div>

      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center gap-y-3 mb-5">
          <div className="flex items-center gap-2 lg:gap-0">
            <div className="me-2">
              <ButtonHref
                text="Tambah Guru"
                href="/dashboard/guru/tambah"
                variant="tambah"
              />
            </div>
            <div className="">
              <button
                className="lg:w-full px-3 bg-green-500 text-sm hover:bg-green-600 py-2 font-semibold text-white rounded cursor-pointer"
                onClick={() => {
                  document.getElementById("my_modal_6").showModal();
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

        <hr className="border-border-grey border"></hr>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr className="border-b border-t border-border-grey">
                <th>No</th>
                <th>Name</th>
                <th>NIP</th>
                <th>Email</th>
                <th>Bergabung</th>
                <th>Aksi</th>
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
                    <td className="whitespace-nowrap">{data.email}</td>
                    <td className="whitespace-nowrap">
                      {formatTanggalLengkap(data.created_at)}
                    </td>
                    <td>
                      <div className="flex items-center justify-evenly w-20 gap-1.5">
                        <button
                          className="border-0 cursor-pointer"
                          onClick={() => {
                            setSelectedGuru(data);
                            document.getElementById("my_modal_5").showModal();
                          }}
                        >
                          <PaperAirplaneIcon className="w-5 h-5 text-green-500" />
                        </button>
                        |
                        <button
                          className="border-0 cursor-pointer"
                          onClick={() => {
                            setSelectedGuru(data); // simpan data ke state
                            document.getElementById("my_modal_4").showModal();
                          }}
                        >
                          <DocumentMagnifyingGlassIcon className="w-5 h-5 text-sky-500"></DocumentMagnifyingGlassIcon>
                        </button>
                        |
                        <ButtonHref
                          href={`/dashboard/guru/update/${data.nip}`}
                          variant="update"
                          text=<PencilSquareIcon className="w-5 h-5 text-amber-300"></PencilSquareIcon>
                        ></ButtonHref>
                        |
                        <button
                          className="border-0 cursor-pointer"
                          onClick={() => {
                            setSelectedGuru(data); // simpan data ke state
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
            {selectedGuru && (
              <>
                <h1 className="text-3xl text-center">
                  Informasi Biodata Guru{" "}
                  <span className="font-bold capitalize">
                    {selectedGuru.nama_guru}
                  </span>
                </h1>
                <table className="table w-full mt-10 mx-auto">
                  <tbody className="">
                    <tr className="border-y border-border-grey">
                      <td className="text-lg font-bold">Nama :</td>
                      <td className="text-lg capitalize">
                        {selectedGuru.nama_guru}
                      </td>
                    </tr>
                    <tr className="border-y border-border-grey">
                      <td className="text-lg font-bold">NIP :</td>
                      <td className="text-lg v">{selectedGuru.nip}</td>
                    </tr>
                    <tr className="border-y border-border-grey">
                      <td className="text-lg font-bold">Email :</td>
                      <td className="text-lg capitalize">
                        {selectedGuru.email}
                      </td>
                    </tr>
                    <tr className="border-y border-border-grey">
                      <td className="text-lg font-bold">
                        Tempat, Tanggal Lahir :
                      </td>
                      <td className="text-lg capitalize">
                        {selectedGuru.tempat_lahir_guru},{" "}
                        {formatTanggalLengkap(selectedGuru.tanggal_lahir_guru)}
                      </td>
                    </tr>
                    <tr className="border-y border-border-grey">
                      <td className="text-lg font-bold">Agama :</td>
                      <td className="text-lg capitalize">
                        {selectedGuru.agama_guru}
                      </td>
                    </tr>
                    <tr className="border-y border-border-grey">
                      <td className="text-lg font-bold">Jenis Kelamin :</td>
                      <td className="text-lg capitalize">
                        {selectedGuru.jenis_kelamin_guru}
                      </td>
                    </tr>
                    <tr className="border-y border-border-grey">
                      <td className="text-lg font-bold">No Telepon :</td>
                      <td className="text-lg capitalize">
                        {selectedGuru.no_telepon}
                      </td>
                    </tr>
                    <tr className="border-y border-border-grey">
                      <td className="text-lg font-bold">Alamat :</td>
                      <td className="text-lg text-justify">
                        {selectedGuru.alamat}
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
            {selectedGuru && (
              <p className="text-center my-2">
                Anda yakin ingin menghapus data <b>{selectedGuru.nama_guru}</b>?
              </p>
            )}
            <div className="w-56 mx-auto p-1 flex justify-between items-center mt-4">
              <form method="dialog" className="w-full me-1">
                <Button variant="button_submit_cancel" text="Cancel"></Button>
              </form>
              <form className="w-full ms-1" onSubmit={handleDeleteGuru}>
                <div className="w-full">
                  <Button
                    variant="button_submit_dash"
                    text={isLoading ? <Loading /> : "Hapus"}
                  ></Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </dialog>

      {/* Modal Send Mail*/}
      <dialog id="my_modal_5" className="modal">
        <div className="modal-box bg-white rounded-lg">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="mt-5">
            <h1 className="font-bold text-3xl text-center">Konfirmasi!</h1>
            {selectedGuru && (
              <p className="text-center my-2">
                Anda yakin ingin mengirim email kepada {""}
                <b>{selectedGuru.nama_guru}</b>?
              </p>
            )}
            <div className="w-56 mx-auto p-1 flex justify-between items-center mt-4">
              <form method="dialog" className="w-full me-1">
                <Button variant="button_submit_cancel" text="Cancel" />
              </form>
              <form
                className="w-full ms-1"
                onSubmit={(e) => {
                  handleSendMailGuru(e, selectedGuru.nip);
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
      <dialog id="my_modal_6" className="modal">
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
  );
}
