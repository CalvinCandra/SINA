import React from "react";
import Calender from "../../../components/Calender/Calender";
import ButtonHref from "../../../../component/Button/ButtonHref";
import Search from "../../../../component/Input/Search";
import {
  PencilSquareIcon,
  TrashIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/16/solid";
import Button from "../../../../component/Button/Button";
import { useState, useEffect } from "react";
import DataGuruu from "../../../../data/Guru/DataGuruu";
import Toast from "../../../../component/Toast/Toast";
import Loading from "../../../../component/Loading/Loading";

export default function DataGuru() {
  // simpan data
  const [isLoading, setIsLoading] = useState(false);
  const [dataGuru, setdataGuru] = useState([]);
  const [selectedGuru, setSelectedGuru] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;

  useEffect(() => {
    const fetchData = () => {
      const storedData = localStorage.getItem("guruList");
      if (!storedData || storedData === "undefined") {
        localStorage.setItem("guruList", JSON.stringify(DataGuruu));
        setdataGuru(DataGuruu);
      } else {
        try {
          const parsedData = JSON.parse(storedData);
          setdataGuru(parsedData);
        } catch (e) {
          console.error("Data di localStorage rusak:", e);
          setdataGuru(DataGuruu); // fallback
        }
      }
    };

    // Tampilkan toast bila tambah atau update berhasil
    const invalidStatus = localStorage.getItem("guruInvalid");
    const addedStatus = localStorage.getItem("guruAdded");
    const updateStatus = localStorage.getItem("guruUpdate");
    const deleteStatus = localStorage.getItem("guruDelete");

    if (invalidStatus === "error") {
      setToastMessage("Guru Tidak ditemukan");
      setToastVariant("error");
      localStorage.removeItem("guruInvalid");
    }

    if (addedStatus === "success") {
      setToastMessage("Guru berhasil ditambahkan");
      setToastVariant("success");
      localStorage.removeItem("guruAdded");
    }

    if (updateStatus === "success") {
      setToastMessage("Guru berhasil diupdate");
      setToastVariant("success");
      localStorage.removeItem("guruUpdate");
    }

    if (deleteStatus === "success") {
      setToastMessage("Guru berhasil dihapus");
      setToastVariant("success");
      localStorage.removeItem("guruDelete");
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
  const currentData = dataGuru
    .sort((a, b) => b.id - a.id)
    .slice(indexOfFirstData, indexOfLastData);
  const totalPages = Math.ceil(dataGuru.length / dataPerPage);

  // Hapus (method kosong, Anda bisa implementasikan)
  const handleDeleteGuru = (e) => {
    e.preventDefault();

    if (!selectedGuru) return;

    setIsLoading(true); // Set loading state

    // Hapus admin dari data
    const filteredData = dataGuru.filter((item) => item.id !== selectedGuru.id);

    // Simpan data yang sudah dihapus ke localStorage
    localStorage.setItem("guruList", JSON.stringify(filteredData));

    // reset
    setToastMessage("");
    setToastVariant("");

    // Simulasi delay untuk loading
    setTimeout(() => {
      setIsLoading(false); // Reset loading state
      setdataGuru(filteredData); // Update state dataAdmin
      setSelectedGuru(null); // Reset selectedAdmin
      // Set toast message setelah berhasil hapus
      setToastMessage("Guru berhasil dihapus");
      setToastVariant("success");
      document.getElementById("my_modal_3").close(); // Tutup modal
    }, 1000); // Delay 2 detik
  };

  return (
    <div className="lg:py-5">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="flex flex-col lg:flex-row w-full justify-between items-center">
        <h2 className="text-2xl font-semibold">Guru</h2>
        <Calender className="w-40 lg:w-full"></Calender>
      </div>

      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <div className="lg:w-60 mb-6 lg:mb-0">
            <ButtonHref
              text="Tambah Guru"
              href="/dashboard/guru/tambah"
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
                  <th>Name</th>
                  <th>NIP</th>
                  <th>Email</th>
                  <th>Bergabung</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((data, index) => (
                  <tr
                    className="border-b border-t border-border-grey"
                    key={data.id}
                  >
                    <td>{index + 1}</td>
                    <td className="whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-circle w-12 h-12">
                            {data.image ? (
                              <img src={data.image} alt="Avatar" />
                            ) : (
                              <img
                                src="https://manbengkuluselatan.sch.id/assets/img/profile/default.jpg"
                                alt="Avatar"
                              ></img>
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{data.nama}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap">{data.nip}</td>
                    <td className="whitespace-nowrap">{data.email}</td>
                    <td className="whitespace-nowrap">{data.tgl}</td>
                    <td>
                      <div className="flex items-center justify-evenly w-20">
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
                          href={`/dashboard/guru/update/${data.id}`}
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
                ))}
              </tbody>
            </table>
          ) : (
            <div className="italic text-gray-400 mt-5 text-center">
              Data Guru Belum Ada
            </div>
          )}
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
                  <span className="font-bold">{selectedGuru.nama}</span>
                </h1>
                <table className="table w-full mt-10 mx-auto">
                  <tbody className="">
                    <tr className="border-y border-border-grey">
                      <td className="text-lg font-bold">Nama :</td>
                      <td className="text-lg">{selectedGuru.nama}</td>
                    </tr>
                    <tr className="border-y border-border-grey">
                      <td className="text-lg font-bold">NIP :</td>
                      <td className="text-lg">{selectedGuru.nip}</td>
                    </tr>
                    <tr className="border-y border-border-grey">
                      <td className="text-lg font-bold">Email :</td>
                      <td className="text-lg">{selectedGuru.email}</td>
                    </tr>
                    <tr className="border-y border-border-grey">
                      <td className="text-lg font-bold">
                        Tempat, Tanggal Lahir :
                      </td>
                      <td className="text-lg">
                        {selectedGuru.tempat_lahir}, {selectedGuru.tgl_lahir}
                      </td>
                    </tr>
                    <tr className="border-y border-border-grey">
                      <td className="text-lg font-bold">Agama :</td>
                      <td className="text-lg">{selectedGuru.agama}</td>
                    </tr>
                    <tr className="border-y border-border-grey">
                      <td className="text-lg font-bold">Jenis Kelamin :</td>
                      <td className="text-lg">{selectedGuru.kelamin}</td>
                    </tr>
                    <tr className="border-y border-border-grey">
                      <td className="text-lg font-bold">No Telepon :</td>
                      <td className="text-lg">{selectedGuru.telp}</td>
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
                Anda yakin ingin menghapus data <b>{selectedGuru.nama}</b>?
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
    </div>
  );
}
