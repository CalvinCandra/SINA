import React from "react";
import Calender from "../../components/Calender/Calender";
import ButtonHref from "../../../component/Button/ButtonHref";
import Search from "../../../component/Input/Search";
import DataKelas from "../../../data/Kelas/DataKelas";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import Button from "../../../component/Button/Button";
import { useState, useEffect } from "react";
import Toast from "../../../component/Toast/Toast";
import Loading from "../../../component/Loading/Loading";

export default function Kelas() {
  // simpan data kelas
  const [selectedKelas, setSelectedKelas] = useState(null);
  const [dataKelas, setdatakelas] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;

  useEffect(() => {
    const fetchData = () => {
      const storedData = localStorage.getItem("kelasList");
      if (!storedData || storedData === "undefined") {
        localStorage.setItem("kelasList", JSON.stringify(DataKelas));
        setdatakelas(DataKelas);
      } else {
        try {
          const parsedData = JSON.parse(storedData);
          setdatakelas(parsedData);
        } catch (e) {
          console.error("Data di localStorage rusak:", e);
          setdatakelas(DataKelas); // fallback
        }
      }
    };

    // Tampilkan toast bila tambah atau update berhasil
    const invalidStatus = localStorage.getItem("kelasInvalid");
    const addedStatus = localStorage.getItem("kelasAdded");
    const updateStatus = localStorage.getItem("kelasUpdate");
    const deleteStatus = localStorage.getItem("kelasDelete");

    if (invalidStatus === "error") {
      setToastMessage("Kelas tidak ditemukan");
      setToastVariant("error");
      localStorage.removeItem("adminInvalid");
    }

    if (addedStatus === "success") {
      setToastMessage("Kelas berhasil ditambahkan");
      setToastVariant("success");
      localStorage.removeItem("kelasAdded");
    }

    if (updateStatus === "success") {
      setToastMessage("Kelas berhasil diupdate");
      setToastVariant("success");
      localStorage.removeItem("kelasUpdate");
    }

    if (deleteStatus === "success") {
      setToastMessage("Kelas berhasil dihapus");
      setToastVariant("success");
      localStorage.removeItem("kelasDelete");
    }

    fetchData();

    // Tambah event listener untuk menangani perubahan localStorage
    const handleStorageChange = () => {
      fetchData();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Pagination
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = dataKelas
    .sort((a, b) => b.id - a.id)
    .slice(indexOfFirstData, indexOfLastData);
  const totalPages = Math.ceil(dataKelas.length / dataPerPage);

  const handleDeleteKelas = () => {
    if (!selectedKelas) return;

    setIsLoading(true); // Set loading state

    // Hapus dari data
    const filteredData = dataKelas.filter(
      (item) => item.id !== selectedKelas.id
    );

    // Simpan data yang sudah dihapus ke localStorage
    localStorage.setItem("kelasList", JSON.stringify(filteredData));

    // reset
    setToastMessage("");
    setToastVariant("");

    setTimeout(() => {
      setIsLoading(false); // Reset loading state
      setdatakelas(filteredData);
      setSelectedKelas(null);
      // Set toast message setelah berhasil hapus
      setToastMessage("Kelas berhasil dihapus");
      setToastVariant("success");
      document.getElementById("my_modal_3").close(); // Tutup modal
    }, 1000);
  };

  return (
    <div className="lg:py-5">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="flex flex-col lg:flex-row w-full justify-between items-center">
        <h2 className="text-2xl font-semibold">Kelas</h2>
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
          <Search className="bg-white"></Search>
        </div>

        <hr className="border-border-grey border"></hr>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          {currentData && currentData.length > 0 ? (
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
                {currentData.map((data, index) => (
                  <tr
                    className="border-b border-t border-border-grey"
                    key={data.id}
                  >
                    <td>{indexOfFirstData + index + 1}</td>
                    <td className="whitespace-nowrap">{data.nama_kelas}</td>
                    <td className="whitespace-nowrap">{data.tingkat}</td>
                    <td className="whitespace-nowrap">{data.wali_kelas}</td>
                    <td className="whitespace-nowrap">{data.tahun_akademik}</td>
                    <td className="whitespace-nowrap">{data.tgl}</td>
                    <td>
                      <div className="flex items-center justify-evenly w-20">
                        <ButtonHref
                          href={`/dashboard/kelas/update/${data.id}`}
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
                ))}
              </tbody>
            </table>
          ) : (
            <div className="italic text-gray-400 mt-5 text-center">
              Data Kelas Belum Ada
            </div>
          )}
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
              <form
                className="w-full ms-1"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleDeleteKelas();
                }}
              >
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
