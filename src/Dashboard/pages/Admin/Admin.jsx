import React, { useEffect, useState } from "react";
import Calender from "../../components/Calender/Calender";
import ButtonHref from "../../../component/Button/ButtonHref";
import Search from "../../../component/Input/Search";
import DataAdmin from "../../../data/Admin/DataAdmin";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import Button from "../../../component/Button/Button";
import Toast from "../../../component/Toast/Toast";
import Loading from "../../../component/Loading/Loading";

export default function Admin() {
  const [isLoading, setIsLoading] = useState(false);
  const [dataAdmin, setdataAdmin] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;

  useEffect(() => {
    const fetchData = () => {
      const storedData = localStorage.getItem("adminList");
      if (!storedData || storedData === "undefined") {
        localStorage.setItem("adminList", JSON.stringify(DataAdmin));
        setdataAdmin(DataAdmin);
      } else {
        try {
          const parsedData = JSON.parse(storedData);
          setdataAdmin(parsedData);
        } catch (e) {
          console.error("Data di localStorage rusak:", e);
          setdataAdmin(DataAdmin); // fallback
        }
      }
    };

    // Tampilkan toast bila tambah atau update berhasil
    const addedStatus = localStorage.getItem("adminAdded");
    const updateStatus = localStorage.getItem("adminUpdate");
    const deleteStatus = localStorage.getItem("adminDelete");

    if (addedStatus === "success") {
      setToastMessage("Admin berhasil ditambahkan");
      setToastVariant("success");
      localStorage.removeItem("adminAdded");
    }

    if (updateStatus === "success") {
      setToastMessage("Admin berhasil diupdate");
      setToastVariant("success");
      localStorage.removeItem("adminUpdate");
    }

    if (deleteStatus === "success") {
      setToastMessage("Admin berhasil dihapus");
      setToastVariant("success");
      localStorage.removeItem("adminDelete");
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
  const currentData = dataAdmin.slice(indexOfFirstData, indexOfLastData);
  const totalPages = Math.ceil(dataAdmin.length / dataPerPage);

  // Hapus admin (method kosong, Anda bisa implementasikan)
  const handleDeleteAdmin = () => {
    if (!selectedAdmin) return;

    setIsLoading(true); // Set loading state

    // Hapus admin dari data
    const filteredData = dataAdmin.filter((d) => d.id !== selectedAdmin.id);

    // Simpan data yang sudah dihapus ke localStorage
    localStorage.setItem("adminList", JSON.stringify(filteredData));

    // reset
    setToastMessage("");
    setToastVariant("");

    // Simulasi delay untuk loading
    setTimeout(() => {
      setIsLoading(false); // Reset loading state
      setdataAdmin(filteredData); // Update state dataAdmin
      setSelectedAdmin(null); // Reset selectedAdmin
      // Set toast message setelah berhasil hapus
      setToastMessage("Admin berhasil dihapus");
      setToastVariant("success");
      document.getElementById("my_modal_3").close(); // Tutup modal
    }, 2000); // Delay 2 detik
  };

  return (
    <>
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}

      <div className="lg:py-5">
        <div className="flex flex-col lg:flex-row w-full justify-between items-center">
          <h2 className="text-2xl font-semibold">Admin / Staf</h2>
          <Calender className="w-40 lg:w-full"></Calender>
        </div>

        <div className="w-full p-5 rounded-md bg-white mt-5">
          <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
            <div className="lg:w-40 mb-6 lg:mb-0">
              <ButtonHref
                text="Tambah Admin"
                href="/dashboard/admin/tambah"
                variant="tambah"
              />
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
                    <th>Name</th>
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
                      <td className="whitespace-nowrap">{data.email}</td>
                      <td className="whitespace-nowrap">{data.tgl}</td>
                      <td>
                        <div className="flex items-center justify-between w-14">
                          <ButtonHref
                            href={`/dashboard/admin/update/${data.id}`}
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
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="italic text-gray-400 mt-5 text-center">
                Data Admin Belum Ada
              </div>
            )}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex flex-col lg:flex-row justify-between items-center w-full my-4">
          <p className="text-sm mb-3 lg:mb-0">
            Menampilkan Data {indexOfFirstData + 1} -{" "}
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
                  Anda yakin ingin menghapus data <b>{selectedAdmin.nama}</b>?
                </p>
              )}
              <div className="w-56 mx-auto p-1 flex justify-between items-center mt-4">
                <form method="dialog" className="w-full me-1">
                  <Button variant="button_submit_cancel" text="Cancel" />
                </form>
                <form
                  className="w-full ms-1"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleDeleteAdmin();
                  }}
                >
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
      </div>
    </>
  );
}
