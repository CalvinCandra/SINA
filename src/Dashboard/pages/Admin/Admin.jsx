import React from "react";
import Calender from "../../components/Calender/Calender";
import ButtonHref from "../../../component/Button/ButtonHref";
import Search from "../../../component/Input/Search";
import DataAdmin from "../../../data/Admin/DataAdmin";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import Button from "../../../component/Button/Button";
import { useState } from "react";

export default function Admin() {
  // simpan data admin
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  return (
    <div className="lg:py-5">
      <div className="flex flex-col lg:flex-row w-full justify-between items-center">
        <h2 className="text-2xl font-semibold">Admin / Staf</h2>
        <Calender className="w-40 lg:w-full"></Calender>
      </div>

      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <div className="lg:w-40 mb-6 lg:mb-0">
            <ButtonHref
              text="Tambah Admin"
              href="/dashboard/admin/tambah"
              variant="tambah"
            ></ButtonHref>
          </div>
          <Search className="bg-white"></Search>
        </div>

        <hr className="border-border-grey border"></hr>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          {DataAdmin && DataAdmin.length > 0 ? (
            <table className="table w-full">
              <thead>
                <tr className="border-b border-t border-border-grey">
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Bergabung</th>
                </tr>
              </thead>
              <tbody>
                {DataAdmin.map((data, index) => (
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
                    <td className="whitespace-nowrap">{data.email}</td>
                    <td className="whitespace-nowrap">{data.tgl}</td>
                    <td>
                      <div className="flex items-center justify-evenly w-20">
                        <ButtonHref
                          href="/dashboard/admin/update"
                          variant="update"
                          text=<PencilSquareIcon className="w-5 h-5 text-amber-300"></PencilSquareIcon>
                        ></ButtonHref>
                        |
                        <button
                          className="border-0 cursor-pointer"
                          onClick={() => {
                            setSelectedAdmin(data); // simpan data ke state
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
              Data Admin Belum Ada
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col lg:flex-row justify-between items-center w-full my-4">
        <p className="text-sm mb-3 lg:mb-0">
          Menampilkan Data 6 Dari 100 Data Admin
        </p>
        <div className="join">
          <button className="join-item btn border-0 rounded-ss rounded-es bg-biru-primary text-white">
            1
          </button>
          <button className="join-item btn border-0 bg-biru-primary text-white">
            2
          </button>
          <button className="join-item btn border-0 bg-gray-400 text-white">
            ...
          </button>
          <button className="join-item btn border-0 bg-biru-primary text-white">
            99
          </button>
          <button className="join-item btn border-0 rounded-se rounded-ee bg-biru-primary text-white">
            100
          </button>
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
            {selectedAdmin && (
              <p className="text-center my-2">
                Anda yakin ingin menghapus data <b>{selectedAdmin.nama}</b>?
              </p>
            )}
            <div className="w-56 mx-auto p-1 flex justify-between items-center mt-4">
              <form method="dialog" className="w-full me-1">
                <Button variant="button_submit_cancel" text="Cancel"></Button>
              </form>
              <form className="w-full ms-1">
                <div className="w-full">
                  <Button variant="button_submit_dash" text="Hapus"></Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}
