import React from "react";
import { useParams } from "react-router-dom";
import DataPengumuman from "../../../data/Pengumuman/DataPengumuman";
import ButtonHref from "../../../component/Button/ButtonHref";

export default function DetailPengumuman() {
  const { id } = useParams();
  // Cari data berdasarkan id
  const dataPengumuman = DataPengumuman.find(
    (item) => item.id === parseInt(id)
  );

  return (
    <div className="lg:py-5">
      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg">Detail Pengumuman</p>
        </div>

        <hr className="border-border-grey border"></hr>

        <div className="w-full mt-8">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="gambar pengumuman"
            className="h-[384px] w-full rounded-md object-cover"
          />
          <p className="mt-8 font-medium text-base text-gray-400">
            Diupload {dataPengumuman.tgl} | Dibuat oleh {dataPengumuman.dibuat}
          </p>
          <h1 className="mt-6 font-bold text-2xl">{dataPengumuman.judul}</h1>
          <p className="mt-3 text-xs text-justify">{dataPengumuman.isi}</p>
        </div>
        {/* Button */}
        <div className="flex justify-end items-center mt-10">
          <div className="">
            <ButtonHref
              text="Keluar"
              variant="cancel"
              href="/dashboard/pengumuman"
            ></ButtonHref>
          </div>
        </div>
      </div>
    </div>
  );
}
