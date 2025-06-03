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
import { formatTahun } from "../../../../utils/helper/dateFormat";
import { useTahunAkademik } from "../../../../hooks/TahunAkademik/TahunAkademik";

export default function TahunAkademik() {
  const {
    selectedTahun,
    setSelectedTahun,
    dataTahun,
    isLoading,
    toastMessage,
    toastVariant,
    searchQuery,
    setSearchQuery,
    setCurrentPage,
    indexOfLastData,
    indexOfFirstData,
    currentData,
    currentPage,
    totalPages,
    handleDeleteTahun,
  } = useTahunAkademik();

  return (
    <div className="lg:py-5">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="flex flex-col lg:flex-row w-full justify-between items-center">
        <h2 className="text-2xl font-semibold">Tahun Akademik</h2>
        <Calender className="w-40 lg:w-full"></Calender>
      </div>

      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <div className="lg:w-60 mb-6 lg:mb-0">
            <ButtonHref
              text="Tambah Tahun Akademik"
              href="/dashboard/akademik/tahun-akademik/tambah"
              variant="tambah"
            ></ButtonHref>
          </div>
          <Search
            className="bg-white"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          ></Search>
        </div>

        <hr className="border-border-grey border"></hr>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          {currentData && currentData.length > 0 ? (
            <table className="table w-full">
              <thead>
                <tr className="border-b border-t border-border-grey">
                  <th>No</th>
                  <th>Nama Kurikulum</th>
                  <th>Tahun Mulai</th>
                  <th>Tahun Berakhir</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((data, index) => (
                  <tr
                    className="border-b border-t border-border-grey"
                    key={data.tahun_akademik_id}
                  >
                    <td>{index + 1}</td>
                    <td className="whitespace-nowrap">{data.nama_kurikulum}</td>
                    <td className="text-justify">
                      {formatTahun(data.tahun_mulai)}
                    </td>
                    <td className="whitespace-nowrap">
                      {formatTahun(data.tahun_berakhir)}
                    </td>
                    <td className="whitespace-nowrap">
                      <p
                        className={`w-24 p-0.5 text-center rounded-full text-white capitalize ${
                          data.status == "aktif" ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {data.status}
                      </p>
                    </td>
                    <td>
                      <div className="flex items-center justify-evenly w-20">
                        <ButtonHref
                          href={`/dashboard/akademik/tahun-akademik/update/${data.tahun_akademik_id}`}
                          variant="update"
                          text=<PencilSquareIcon className="w-5 h-5 text-amber-300"></PencilSquareIcon>
                        ></ButtonHref>
                        |
                        <button
                          className="border-0 cursor-pointer"
                          onClick={() => {
                            setSelectedTahun(data); // simpan data ke state
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
              Data Tahun Kurikulum Belum Ada
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col lg:flex-row justify-between items-center w-full my-4">
        <p className="text-sm mb-3 lg:mb-0">
          Menampilkan Data {indexOfFirstData + 1} -{" "}
          {indexOfLastData > dataTahun.length
            ? dataTahun.length
            : indexOfLastData}{" "}
          dari {dataTahun.length} Data Tahun Akademik
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
            {selectedTahun && (
              <p className="text-center my-2">
                Anda yakin ingin menghapus data{" "}
                <b>{selectedTahun.nama_kurikulum}</b>{" "}
                <b>{formatTahun(selectedTahun.tahun_mulai)}</b> -{" "}
                <b>{formatTahun(selectedTahun.tahun_berakhir)}</b>?
              </p>
            )}
            <div className="w-56 mx-auto p-1 flex justify-between items-center mt-4">
              <form method="dialog" className="w-full me-1">
                <Button variant="button_submit_cancel" text="Cancel"></Button>
              </form>
              <form className="w-full ms-1" onSubmit={handleDeleteTahun}>
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
