import React, { useEffect, useState } from "react";
import Calender from "../../../components/Calender/Calender";
import Search from "../../../../component/Input/Search";
import ButtonHref from "../../../../component/Button/ButtonHref";
import Button from "../../../../component/Button/Button";
import {
  PencilSquareIcon,
  TrashIcon,
  ArrowLeftCircleIcon,
} from "@heroicons/react/16/solid";
import { useParams } from "react-router-dom";
import Toast from "../../../../component/Toast/Toast";
import Loading from "../../../../component/Loading/Loading";
import axios from "axios";
import baseUrl from "../../../../utils/config/baseUrl";

export default function JadwalKelas() {
  const { kelas_id } = useParams();
  const [nama_kelas, setNamaKelas] = useState("");
  const [tingkat_kelas, setTingkatKelas] = useState("");
  const [selectedJadwal, setSelectedJadwal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dataJadwal, setdataJadwal] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;

  const token = sessionStorage.getItem("session");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseKelas = await axios.get(
          `${baseUrl.apiUrl}/admin/kelas/${kelas_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(responseKelas);

        if (responseKelas.status == 200) {
          setNamaKelas(responseKelas.data.nama_kelas);
          setTingkatKelas(responseKelas.data.tingkat);
        }
      } catch (error) {}

      setdataJadwal(finalData);
    };

    fetchData();

    // Tampilkan toast bila tambah atau update berhasil
    const invalidStatus = localStorage.getItem("jadwalInvalid");
    const addedStatus = localStorage.getItem("jadwalAdded");
    const updateStatus = localStorage.getItem("jadwalUpdate");

    if (invalidStatus === "error") {
      setToastMessage("Jadwal Tidak ditemukan");
      setToastVariant("error");
      localStorage.removeItem("jadwalInvalid");
    }

    if (addedStatus === "success") {
      setToastMessage("Jadwal berhasil ditambahkan");
      setToastVariant("success");
      localStorage.removeItem("jadwalAdded");
    }

    if (updateStatus === "success") {
      setToastMessage("Jadwal berhasil diupdate");
      setToastVariant("success");
      localStorage.removeItem("jadwalUpdate");
    }

    fetchData();
  }, [kelas_id]);

  // Pagination
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = dataJadwal
    .sort((a, b) => b.id - a.id)
    .slice(indexOfFirstData, indexOfLastData);
  const totalPages = Math.ceil(dataJadwal.length / dataPerPage);

  const handleDeleteJadwal = (e) => {
    e.preventDefault();

    if (!selectedJadwal) return;

    setToastMessage("");
    setToastVariant("");

    setIsLoading(true);

    setTimeout(() => {
      const storedData = localStorage.getItem("jadwalList");
      let finalData = {};

      try {
        finalData = JSON.parse(storedData);
      } catch (e) {
        console.error("Gagal parsing data:", e);
      }

      const key = `${decodeURIComponent(kelas.nama_kelas)} ${decodeURIComponent(
        kelas.tingkat
      )}`;
      const filtered = finalData[key] || [];

      // Hapus jadwal berdasarkan ID
      const updatedJadwal = filtered.filter(
        (jadwal) => jadwal.id !== selectedJadwal.id
      );

      // Update data pada key tersebut
      finalData[key] = updatedJadwal;

      // Simpan kembali ke localStorage
      localStorage.setItem("jadwalList", JSON.stringify(finalData));

      // Update state
      setdataJadwal(updatedJadwal);

      // Tampilkan toast
      setToastMessage("Jadwal berhasil dihapus");
      setToastVariant("success");
      localStorage.setItem("jadwalDelete", "success");

      setIsLoading(false);
      setSelectedJadwal(null);

      // Tutup modal
      document.getElementById("my_modal_3").close();
    }, 1000); // Simulasi loading
  };

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
              Jadwal Pelajaran Kelas {nama_kelas} Tingkat {tingkat_kelas}
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
            <Search className="bg-white"></Search>
          </div>

          <hr className="border-border-grey border"></hr>

          {/* Table */}
          <div className="overflow-x-auto w-full">
            {currentData && currentData.length > 0 ? (
              <table className="table w-full">
                <thead>
                  <tr className="border-b border-t border-border-grey font-semibold">
                    <th>No</th>
                    <th>Mata Pelajaran</th>
                    <th>Guru Pengampu</th>
                    <th>Hari - Jam ke (Waktu)</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((data, index) => (
                    <tr
                      key={data.id}
                      className="border-b border-t border-border-grey align-middle"
                    >
                      <td className="align-middle">{index + 1}</td>
                      <td className="align-middle">{data.nama_mapel}</td>
                      <td className="align-middle">{data.pengajar}</td>
                      <td className="align-middle">
                        <div className="space-y-4 ">
                          {data.jadwal &&
                            Object.entries(data.jadwal).map(
                              ([hari, sesiList]) => (
                                <div key={hari}>
                                  <p className="font-semibold text-base">
                                    {hari}
                                  </p>
                                  <ul className="list-disc ml-6 text-sm space-y-1">
                                    {sesiList.map((sesi, index) => (
                                      <li key={index}>
                                        {sesi.sesi} ({sesi.jam}) –{" "}
                                        {sesi.ruangan}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )
                            )}
                        </div>
                      </td>
                      <td className="align-middle">
                        <div className="flex items-center gap-2 pr-2">
                          <ButtonHref
                            href={`/dashboard/akademik/jadwal-kelas/${kelas_id}/update/${data.id}`}
                            variant="update"
                            text={
                              <PencilSquareIcon className="w-5 h-5 text-amber-300" />
                            }
                          />
                          <span>|</span>
                          <button
                            className="border-0 cursor-pointer"
                            onClick={() => {
                              setSelectedJadwal(data);
                              document.getElementById("my_modal_3").showModal();
                            }}
                          >
                            <TrashIcon className="w-5 h-5 text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="italic text-gray-400 mt-5 text-center">
                Data Jadwal Belum Ada
              </div>
            )}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex flex-col lg:flex-row justify-between items-center w-full my-4">
          <p className="text-sm mb-3 lg:mb-0">
            Menampilkan Data {indexOfFirstData + 1} -{" "}
            {indexOfLastData > dataJadwal.length
              ? dataJadwal.length
              : indexOfLastData}{" "}
            dari {dataJadwal.length} Data Jadwal Kelas {nama_kelas} Tingkat{" "}
            {tingkat_kelas}
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
              {selectedJadwal && (
                <p className="text-center my-2">
                  Anda yakin ingin menghapus data jadwal pelajaran{" "}
                  <b>{selectedJadwal.nama_mapel}</b>?
                </p>
              )}
              <div className="w-56 mx-auto p-1 flex justify-between items-center mt-4">
                <form method="dialog" className="w-full me-1">
                  <Button variant="button_submit_cancel" text="Cancel" />
                </form>
                <form className="w-full ms-1" onSubmit={handleDeleteJadwal}>
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
