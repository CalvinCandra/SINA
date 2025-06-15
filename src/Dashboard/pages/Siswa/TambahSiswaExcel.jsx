import { useState, useEffect } from "react";
import InputFile from "../../../component/Input/InputFile";
import ButtonHref from "../../../component/Button/ButtonHref";
import Textarea from "../../../component/Input/Textarea";
import { useParams } from "react-router-dom";
import Button from "../../../component/Button/Button";
import Loading from "../../../component/Loading/Loading";

export default function TambahSiswaExcel() {
  const { data } = useParams();

  return (
    <div className="lg:py-5 min-h-screen lg:min-h-0">
      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg mb-3">
            Tambah Data Siswa (Excel)
          </p>
          <div className="w-[177px]">
            <ButtonHref
              text="Download Template"
              variant="tambah"
              href="#"
            ></ButtonHref>
          </div>
        </div>

        <hr className="border-border-grey border"></hr>

        <form onSubmit={handleSubmit}>
          <div>
            <div className="w-full my-5">
              <InputFile
                variant="w_full"
                text="Pilih File Excel"
                optional="excel"
              />
            </div>

            {/* Button */}
            <div className="flex justify-end items-center mt-10">
              <div className="me-2">
                <ButtonHref
                  text="Kembali"
                  variant="cancel"
                  href={`/dashboard/siswa/${encodeURIComponent(
                    data.nama_kelas
                  )}/${encodeURIComponent(data.tingkat)}`}
                ></ButtonHref>
              </div>
              <div className="w-40">
                <Button
                  text={isLoading ? <Loading /> : "Tambah Siswa"}
                  variant="button_submit_dash"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
