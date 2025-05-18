import React from "react";
import Calender from "../../../components/Calender/Calender";
import ButtonHref from "../../../../component/Button/ButtonHref";
import Search from "../../../../component/Input/Search";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import Button from "../../../../component/Button/Button";
import { useState, useEffect } from "react";
import Toast from "../../../../component/Toast/Toast";
import Loading from "../../../../component/Loading/Loading";
import axios from "axios";
import baseUrl from "../../../../utils/config/baseUrl";

export default function MataPelajaran() {
  // simpan data
  const [selectedPelajaran, setSelectedPelajaran] = useState(null);
  const [dataPelajaran, setdataPelajaran] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;

  // get token
  const token = sessionStorage.getItem("session");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${baseUrl.apiUrl}/admin/mapel`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setdataPelajaran(response.data);
          console.log(response);
        }
      } catch (error) {
        console.error("Gagal mengambil data pelajaran:", error);
        setToastMessage("Gagal mengambil data pelajaran");
        setToastVariant("error");
      } finally {
        setIsLoading(false);
      }
    };

    // Tampilkan toast bila tambah atau update berhasil
    const invalidStatus = localStorage.getItem("pelajaranInvalid");
    const addedStatus = localStorage.getItem("pelajaranAdded");
    const updateStatus = localStorage.getItem("pelajaranUpdate");

    if (invalidStatus === "error") {
      setToastMessage("Data Mata Pelajaran Tidak ditemukan");
      setToastVariant("error");
      localStorage.removeItem("pelajaranInvalid");
    }

    if (addedStatus === "success") {
      setToastMessage("Mata Pelajaran berhasil ditambahkan");
      setToastVariant("success");
      localStorage.removeItem("pelajaranAdded");
    }

    if (updateStatus === "success") {
      setToastMessage("Mata Pelajaran berhasil diupdate");
      setToastVariant("success");
      localStorage.removeItem("pelajaranUpdate");
    }

    fetchData();
  }, []);

  // Pagination
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = dataPelajaran
    .sort((a, b) => b.id - a.id)
    .slice(indexOfFirstData, indexOfLastData);
  const totalPages = Math.ceil(dataPelajaran.length / dataPerPage);

  // Hapus
  const handleDeletePelajaran = async (e) => {
    e.preventDefault();
    if (!selectedPelajaran) return;

    setIsLoading(true);

    try {
      await axios.delete(
        `${baseUrl.apiUrl}/admin/mapel/${selectedPelajaran.mapel_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // reset
      setToastMessage("");
      setToastVariant("");

      // Simulasi delay untuk loading
      setTimeout(() => {
        setIsLoading(false); // Reset loading state
        setToastMessage("Mata Pelajaran berhasil dihapus");
        setToastVariant("success");
        // Hapus data dari state tanpa perlu fetch ulang
        setdataPelajaran((prevData) =>
          prevData.filter(
            (item) => item.mapel_id !== selectedPelajaran.mapel_id
          )
        );
        document.getElementById("my_modal_3").close();
      }, 1000);
    } catch (error) {
      console.error("Gagal menghapus data pelajaran:", error);
      setToastMessage("Gagal menghapus data pelajaran");
      setToastVariant("error");
      document.getElementById("my_modal_3").close();
    }
  };

  return (
    <div className="lg:py-5">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="flex flex-col lg:flex-row w-full justify-between items-center">
        <h2 className="text-2xl font-semibold">Mata Pelajaran</h2>
        <Calender className="w-40 lg:w-full"></Calender>
      </div>

      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <div className="lg:w-60 mb-6 lg:mb-0">
            <ButtonHref
              text="Tambah Mata Pelajaran"
              href="/dashboard/akademik/mata-pelajaran/tambah"
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
                  <th>Mata Pelajaran</th>
                  <th>KKM</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((data, index) => (
                  <tr
                    className="border-b border-t border-border-grey"
                    key={data.mapel_id}
                  >
                    <td>{index + 1}</td>
                    <td className="whitespace-nowrap">{data.nama_mapel}</td>
                    <td className="text-justify">{data.kkm}</td>
                    <td>
                      <div className="flex items-center justify-evenly w-20">
                        <ButtonHref
                          href={`/dashboard/akademik/mata-pelajaran/update/${data.mapel_id}`}
                          variant="update"
                          text=<PencilSquareIcon className="w-5 h-5 text-amber-300"></PencilSquareIcon>
                        ></ButtonHref>
                        |
                        <button
                          className="border-0 cursor-pointer"
                          onClick={() => {
                            setSelectedPelajaran(data); // simpan data ke state
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
              Data Mata Pelajaran Belum Ada
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col lg:flex-row justify-between items-center w-full my-4">
        <p className="text-sm mb-3 lg:mb-0">
          Menampilkan Data {indexOfFirstData + 1} -{" "}
          {indexOfLastData > dataPelajaran.length
            ? dataPelajaran.length
            : indexOfLastData}{" "}
          dari {dataPelajaran.length} Data Pelajaran
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
            {selectedPelajaran && (
              <p className="text-center my-2">
                Anda yakin ingin menghapus data{" "}
                <b>{selectedPelajaran.nama_mapel}</b>?
              </p>
            )}
            <div className="w-56 mx-auto p-1 flex justify-between items-center mt-4">
              <form method="dialog" className="w-full me-1">
                <Button variant="button_submit_cancel" text="Cancel"></Button>
              </form>
              <form className="w-full ms-1" onSubmit={handleDeletePelajaran}>
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
