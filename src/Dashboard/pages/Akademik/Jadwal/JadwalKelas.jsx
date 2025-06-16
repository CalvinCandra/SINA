import React from "react";
import Calender from "../../../components/Calender/Calender";
import ButtonHref from "../../../../component/Button/ButtonHref";
import Button from "../../../../component/Button/Button";
import {
  PencilSquareIcon,
  TrashIcon,
  ArrowLeftCircleIcon,
} from "@heroicons/react/16/solid";
import Toast from "../../../../component/Toast/Toast";
import Loading from "../../../../component/Loading/Loading";
import { useJadwal } from "../../../../hooks/Jadwal/Jadwal";

export default function JadwalKelas() {
  const {
    toastMessage,
    toastVariant,
    isLoading,
    kelas_id,
    selectedJadwal,
    setSelectedJadwal,
    dataLain,
    jadwalSiapTampil,
    handleDelete,
  } = useJadwal();
  return (
    <>
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="lg:py-5">
        <div className="flex flex-col lg:flex-row w-full justify-between items-center">
          <div className="flex items-center">
            <div className="me-3">
              <ButtonHref
                text=<ArrowLeftCircleIcon className="w-6 h-6"></ArrowLeftCircleIcon>
                href="/dashboard/akademik/jadwal"
              />
            </div>
            <h2 className="text-2xl font-bold">
              Jadwal Pelajaran Kelas {dataLain.nama_kelas} Tingkat{" "}
              {dataLain.tingkat}
            </h2>
          </div>

          <Calender className="w-40 lg:w-full"></Calender>
        </div>

        <div className="w-full p-5 rounded-md bg-white mt-5">
          {/* Header Table */}
          <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
            <div className="mb-6 lg:mb-0">
              <ButtonHref
                text="Tambah Jadwal Pelajaran"
                href={`/dashboard/akademik/jadwal-kelas/${kelas_id}/tambah`}
                variant="tambah"
              ></ButtonHref>
            </div>
          </div>

          <hr className="border-border-grey border"></hr>

          {/* Table */}
          <div className="overflow-x-auto w-full">
            <table className="table w-full text-sm">
              <thead>
                <tr className="border-b border-t border-border-grey font-semibold text-left">
                  <th className="md:w-[10%]">Hari</th>
                  <th className="md:w-[20%]">Jam ke (Waktu)</th>
                  <th className="md:w-[25%]">Guru Pengampu</th>
                  <th className="md:w-[20%]">Mata Pelajaran</th>
                  <th className="md:w-[10%]">Ruangan</th>
                  <th className="md:w-20 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-base italic text-gray-400 mt-5 text-center py-4 "
                    >
                      Loading...
                    </td>
                  </tr>
                ) : jadwalSiapTampil.length == 0 && jadwalSiapTampil == 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-base italic text-gray-400 mt-5 text-center py-4"
                    >
                      Data Jadwal Belum Ada
                    </td>
                  </tr>
                ) : (
                  jadwalSiapTampil.map((data, index) => (
                    <React.Fragment key={data.hari}>
                      {data.sesiList.map((item, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-border-grey align-middle"
                        >
                          {idx === 0 && (
                            <>
                              <td
                                rowSpan={data.sesiList.length}
                                className="border border-border-grey capitalize font-semibold"
                              >
                                {data.hari}
                              </td>
                            </>
                          )}
                          <td>
                            Sesi {item.sesi} ({item.jam})
                          </td>
                          <td>{item.pengajar}</td>
                          <td className="font-medium">{item.nama_mapel}</td>
                          <td className="font-medium">{item.ruangan}</td>
                          <td className="text-center">
                            <div className="flex items-center justify-center gap-2">
                              <ButtonHref
                                href={`/dashboard/akademik/jadwal-kelas/${kelas_id}/update/${item.jadwal_id}`}
                                variant="update"
                                text={
                                  <PencilSquareIcon className="w-5 h-5 text-amber-300" />
                                }
                              />
                              <button
                                className="border-0 cursor-pointer"
                                onClick={() => {
                                  setSelectedJadwal(item);
                                  document
                                    .getElementById("my_modal_3")
                                    .showModal();
                                }}
                              >
                                <TrashIcon className="w-5 h-5 text-red-500" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
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
              {selectedJadwal && (
                <p className="text-center my-2">
                  Anda yakin ingin menghapus data jadwal pelajaran{" "}
                  <b>{selectedJadwal.nama_mapel}</b> ?
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
    </>
  );
}
