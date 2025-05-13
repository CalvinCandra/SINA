import React, { useEffect, useState } from "react";
import Calender from "../../components/Calender/Calender";
import ButtonHref from "../../../component/Button/ButtonHref";
import Search from "../../../component/Input/Search";
import DataSiswa from "../../../data/Siswa/DataSiswa";
import {
  PencilSquareIcon,
  TrashIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/16/solid";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import Button from "../../../component/Button/Button";
import Toast from "../../../component/Toast/Toast";
import Loading from "../../../component/Loading/Loading";
import { useParams } from "react-router-dom";

export default function DataSiswaPage() {
  const kelas = useParams(); // Ambil kelas dan tingkat dari URL
  const [isLoading, setIsLoading] = useState(false);
  const [dataSiswa, setdataSiswa] = useState([]);
  const [selectedSiswa, setSelectedSiswa] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;

  useEffect(() => {
    const fetchData = () => {
      const storedData = localStorage.getItem("siswaList");
      const key = `${decodeURIComponent(kelas.nama_kelas)} ${decodeURIComponent(
        kelas.tingkat
      )}`;

      let finalData = [];

      if (!storedData || storedData === "undefined") {
        const newData = DataSiswa[key] || [];
        localStorage.setItem("siswaList", JSON.stringify({ [key]: newData }));
        finalData = newData;
      } else {
        try {
          const parsed = JSON.parse(storedData);
          finalData = parsed[key] || [];
        } catch (e) {
          console.error("Data rusak:", e);
        }
      }

      setdataSiswa(finalData);
    };

    // Memanggil fetchData untuk mendapatkan data siswa
    fetchData();

    // Tampilkan toast bila tambah atau update berhasil
    const invalidStatus = localStorage.getItem("siswaInvalid");
    const addedStatus = localStorage.getItem("siswaAdded");
    const updateStatus = localStorage.getItem("siswaUpdate");
    const deleteStatus = localStorage.getItem("siswaDelete");

    if (invalidStatus === "error") {
      setToastMessage("Siswa Tidak ditemukan");
      setToastVariant("error");
      localStorage.removeItem("siswaInvalid");
    }

    if (addedStatus === "success") {
      setToastMessage("Siswa berhasil ditambahkan");
      setToastVariant("success");
      localStorage.removeItem("siswaAdded");
    }

    if (updateStatus === "success") {
      setToastMessage("Siswa berhasil diupdate");
      setToastVariant("success");
      localStorage.removeItem("siswaUpdate");
    }

    if (deleteStatus === "success") {
      setToastMessage("Siswa berhasil dihapus");
      setToastVariant("success");
      localStorage.removeItem("siswaDelete");
    }

    // Tambah event listener untuk menangani perubahan localStorage
    const handleStorageChange = () => {
      fetchData();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [kelas]);

  // Pagination
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = dataSiswa
    .sort((a, b) => b.id - a.id)
    .slice(indexOfFirstData, indexOfLastData);
  const totalPages = Math.ceil(dataSiswa.length / dataPerPage);

  const handleDeleteSiswa = (e) => {
    e.preventDefault();

    if (!selectedSiswa) return;

    setToastMessage("");
    setToastVariant("");

    setIsLoading(true);

    setTimeout(() => {
      const storedData = localStorage.getItem("siswaList");
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

      // Hapus siswa berdasarkan ID
      const updatedSiswa = filtered.filter(
        (siswa) => siswa.id !== selectedSiswa.id
      );

      // Update data pada key tersebut
      finalData[key] = updatedSiswa;

      // Simpan kembali ke localStorage
      localStorage.setItem("siswaList", JSON.stringify(finalData));

      // Update state
      setdataSiswa(updatedSiswa);

      // Tampilkan toast
      setToastMessage("Siswa berhasil dihapus");
      setToastVariant("success");
      localStorage.setItem("siswaDelete", "success");

      setIsLoading(false);
      setSelectedSiswa(null);

      // Tutup modal
      document.getElementById("my_modal_3").close();
    }, 1000); // Simulasi loading
  };

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
              Data Siswa {decodeURIComponent(kelas.nama_kelas)}{" "}
              {decodeURIComponent(kelas.tingkat)}
            </h2>
          </div>
          <Calender className="w-40 lg:w-full"></Calender>
        </div>

        <div className="w-full p-5 rounded-md bg-white mt-5">
          <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-56 mb-6 lg:mb-0">
                <ButtonHref
                  text="Tambah Siswa Via Excel"
                  href={`/dashboard/siswa/${decodeURIComponent(
                    kelas.nama_kelas
                  )}/${decodeURIComponent(kelas.tingkat)}/tambahExcel`}
                  variant="tambah"
                />
              </div>
              <div className="lg:w-40 mb-6 lg:mb-0">
                <ButtonHref
                  text="Tambah Siswa"
                  href={`/dashboard/siswa/${decodeURIComponent(
                    kelas.nama_kelas
                  )}/${decodeURIComponent(kelas.tingkat)}/tambah`}
                  variant="tambah"
                />
              </div>
            </div>
            <Search className="bg-white" />
          </div>

          <hr className="border-border-grey border" />

          <div className="overflow-x-auto w-full">
            {currentData && currentData.length > 0 ? (
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
                  {currentData.map((data, index) => (
                    <tr
                      className="border-b border-t border-border-grey"
                      key={data.id}
                    >
                      <td>{indexOfFirstData + index + 1}</td>
                      <td className="whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-circle w-12 h-12">
                              <img
                                src={
                                  data.image ||
                                  "https://manbengkuluselatan.sch.id/assets/img/profile/default.jpg"
                                }
                                alt="Avatar"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{data.nama}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap">{data.nisn}</td>
                      <td className="whitespace-nowrap">{data.nis}</td>
                      <td className="whitespace-nowrap">{data.kelamin}</td>
                      <td>
                        <div className="flex items-center justify-between w-14">
                          <ButtonHref
                            href={`/dashboard/siswa/${encodeURIComponent(
                              kelas.nama_kelas
                            )}/${encodeURIComponent(
                              kelas.tingkat
                            )}/${encodeURIComponent(data.id)}`}
                            text=<DocumentMagnifyingGlassIcon className="w-5 h-5 text-sky-500"></DocumentMagnifyingGlassIcon>
                          ></ButtonHref>
                          |
                          <ButtonHref
                            href={`/dashboard/siswa/${decodeURIComponent(
                              kelas.nama_kelas
                            )}/${decodeURIComponent(kelas.tingkat)}/update/${
                              data.id
                            }`}
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
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="italic text-gray-400 mt-5 text-center">
                Data Siswa Belum Ada
              </div>
            )}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex flex-col lg:flex-row justify-between items-center w-full my-4">
          <p className="text-sm mb-3 lg:mb-0">
            Menampilkan Data {indexOfFirstData + 1} -{" "}
            {indexOfLastData > dataSiswa.length
              ? dataSiswa.length
              : indexOfLastData}{" "}
            dari {dataSiswa.length} Data Siswa{" "}
            {decodeURIComponent(kelas.nama_kelas)}{" "}
            {decodeURIComponent(kelas.tingkat)}
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
                  Anda yakin ingin menghapus data <b>{selectedSiswa.nama}</b>?
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
      </div>
    </>
  );
}
