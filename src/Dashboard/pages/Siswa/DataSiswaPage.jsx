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
import axios from "axios";
import baseUrl from "../../../utils/config/baseUrl";

export default function DataSiswaPage() {
  const { kelas_id } = useParams(); // Ambil kelas dan tingkat dari URL
  const [isLoading, setIsLoading] = useState(false);
  const [dataSiswa, setdataSiswa] = useState([]);
  const [dataKelas, setdataKelas] = useState([]);
  const [selectedSiswa, setSelectedSiswa] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;

  const token = sessionStorage.getItem("session");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl.apiUrl}/admin/siswa_kelas/${kelas_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response);

        if (response.status == 200) {
          setdataSiswa(response.data.siswa);
          setdataKelas(response.data.kelas_info);
        }
      } catch (error) {
        console.log(error);
        setToastMessage("Gagal ambil data");
        setToastVariant("error");
      }
    };

    // Tampilkan toast bila tambah atau update berhasil
    const invalidStatus = localStorage.getItem("siswaInvalid");
    const addedStatus = localStorage.getItem("siswaAdded");
    const updateStatus = localStorage.getItem("siswaUpdate");

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

    fetchData();
  }, [kelas_id]);

  // Pagination
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = dataSiswa
    .sort((a, b) => b.id - a.id)
    .slice(indexOfFirstData, indexOfLastData);
  const totalPages = Math.ceil(dataSiswa.length / dataPerPage);

  const handleDeleteSiswa = async (e) => {
    e.preventDefault();

    if (!selectedSiswa) return;

    try {
      await axios.delete(`${baseUrl.apiUrl}/admin/siswa/${selectedSiswa.nis}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // reset
      setToastMessage("");
      setToastVariant("");

      // Simulasi delay untuk loading
      setTimeout(() => {
        setIsLoading(false); // Reset loading state
        setToastMessage("Siswa berhasil dihapus");
        setToastVariant("success");
        // Hapus data dari state tanpa perlu fetch ulang
        setdataSiswa((prevData) =>
          prevData.filter((item) => item.nis !== selectedBerita.nis)
        );
        document.getElementById("my_modal_3").close();
      }, 1000);
    } catch (error) {
      console.error("Gagal menghapus data:", error);
      setToastMessage("Gagal menghapus data");
      setToastVariant("error");
      document.getElementById("my_modal_3").close();
    }
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
              Data Siswa Kelas {dataKelas.nama_kelas} Tingkat{" "}
              {dataKelas.tingkat}
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
                  href={`/dashboard/siswa/${dataKelas.kelas_id}/tambahExcel`}
                  variant="tambah"
                />
              </div>
              <div className="lg:w-40 mb-6 lg:mb-0">
                <ButtonHref
                  text="Tambah Siswa"
                  href={`/dashboard/siswa/${dataKelas.kelas_id}/tambah`}
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
                      key={data.nis}
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
                            <div className="font-bold capitalize">
                              {data.nama_siswa}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap">{data.nisn}</td>
                      <td className="whitespace-nowrap">{data.nis}</td>
                      <td className="whitespace-nowrap capitalize">
                        {data.jenis_kelamin}
                      </td>
                      <td>
                        <div className="flex items-center justify-between w-14">
                          <ButtonHref
                            href={`/dashboard/siswa/${dataKelas.kelas_id}/detail/${data.nis}`}
                            text=<DocumentMagnifyingGlassIcon className="w-5 h-5 text-sky-500"></DocumentMagnifyingGlassIcon>
                          ></ButtonHref>
                          |
                          <ButtonHref
                            href={`/dashboard/siswa/${dataKelas.kelas_id}/update/${data.nis}`}
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
            dari {dataSiswa.length} Data Siswa Kelas {dataKelas.nama_kelas}{" "}
            Tingkat {dataKelas.tingkat}
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
