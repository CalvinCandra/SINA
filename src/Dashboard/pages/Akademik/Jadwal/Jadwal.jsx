import Calender from "../../../components/Calender/Calender";
import ButtonHref from "../../../../component/Button/ButtonHref";
import {
  TrashIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/16/solid";
import { useJadwalKelas } from "../../../../hooks/Jadwal/JadwalKelas";
import Toast from "../../../../component/Toast/Toast";
import Button from "../../../../component/Button/Button";
import Loading from "../../../../component/Loading/Loading";
import { formatTahun } from "../../../../utils/helper/dateFormat";

export default function Jadwal() {
  const {
    dataKelas,
    isLoading,
    toastMessage,
    toastVariant,
    handleDelete,
    selectedKelas,
    setSelectedKelas,
  } = useJadwalKelas();
  return (
    <div className="lg:py-5">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="flex flex-col lg:flex-row w-full justify-between items-center">
        <h2 className="text-2xl font-bold">Data Jadwal Pelajaran</h2>
        <Calender className="w-40 lg:w-full"></Calender>
      </div>

      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <div className="lg:w-50 mb-6 lg:mb-0">
            <h2 className="text-lg font-semibold">Nama Kelas</h2>
          </div>
        </div>

        <hr className="border-border-grey border"></hr>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr className="border-b border-t border-border-grey">
                <th>No</th>
                <th>Nama Kelas</th>
                <th>Tingkat</th>
                <th>Wali Kelas</th>
                <th>Kurikulum</th>
                <th>Tahun Akademik</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-base italic text-gray-400 mt-5 text-center py-4"
                  >
                    Loading...
                  </td>
                </tr>
              ) : dataKelas.length == 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-base italic text-gray-400 mt-5 text-center py-4"
                  >
                    Data Kelas Belum Ada
                  </td>
                </tr>
              ) : (
                dataKelas.map((data, index) => (
                  <tr
                    className="border-b border-t border-border-grey"
                    key={data.kelas_id}
                  >
                    <td className="whitespace-nowrap">{index + 1}</td>
                    <td className="whitespace-nowrap">{data.nama_kelas}</td>
                    <td className="whitespace-nowrap">{data.tingkat}</td>
                    <td className="whitespace-nowrap">
                      {data.nama_guru || `Belum Ada`}
                    </td>
                    <td className="whitespace-nowrap">{data.nama_kurikulum}</td>
                    <td className="whitespace-nowrap">
                      {formatTahun(data.tahun_mulai)} -{" "}
                      {formatTahun(data.tahun_berakhir)}
                    </td>
                    <td>
                      <div className="flex flex-row items-center">
                        <ButtonHref
                          href={`/dashboard/akademik/jadwal-kelas/${data.kelas_id}`}
                          variant="update"
                          text={
                            <span className="flex items-center mr-6 gap-2 hover:underline">
                              <DocumentMagnifyingGlassIcon className="w-5 h-5 text-sky-500" />
                              <span className="whitespace-nowrap">
                                Data Jadwal
                              </span>
                            </span>
                          }
                        />
                        <button
                          className="border-0 cursor-pointer"
                          onClick={() => {
                            setSelectedKelas(data);
                            document.getElementById("my_modal_3").showModal();
                          }}
                        >
                          {" "}
                          <span className="flex items-center gap-2 cursor-pointer hover:underline">
                            <TrashIcon className="w-5 h-5 text-red-500" />
                            <span className="whitespace-nowrap">
                              Hapus Semua Jadwal
                            </span>
                          </span>
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
            {selectedKelas && (
              <p className="text-center my-2">
                Anda yakin ingin menghapus semua data jadwal pelajaran di Kelas{" "}
                <b>
                  {selectedKelas.nama_kelas} Tingkat {selectedKelas.tingkat}
                </b>
                ?
              </p>
            )}
            <div className="w-56 mx-auto p-1 flex justify-between items-center mt-4">
              <form method="dialog" className="w-full me-1">
                <Button variant="button_submit_cancel" text="Cancel" />
              </form>
              <form className="w-full ms-1" onSubmit={handleDelete}>
                <div className="w-full">
                  <Button
                    text={isLoading ? <Loading /> : "Hapus Jadwal"}
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
