import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FieldInput from "../../../component/Input/FieldInput";
import Button from "../../../component/Button/Button";
import ButtonHref from "../../../component/Button/ButtonHref";
import InputFile from "../../../component/Input/InputFile";
import SelectField from "../../../component/Input/SelectField";
import axios from "axios";
import baseUrl from "../../../utils/config/baseUrl";
import Loading from "../../../component/Loading/Loading";
import Toast from "../../../component/Toast/Toast";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useUpdatePengumuman } from "../../../hooks/Pengumuman/UpdatePengumuman";

export default function UpdatePengumuman() {
  const {
    isLoading,
    toastMessage,
    toastVariant,
    judul,
    setJudul,
    kategori,
    setKategori,
    deskirpsi,
    setDeskripsi,
    fileName,
    kategoriOptions,
    handleImageChange,
    handleSubmit,
  } = useUpdatePengumuman();

  return (
    <div className="lg:py-5">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg capitalize">
            Edit Informasi {kategori}
          </p>
        </div>

        <hr className="border-border-grey border"></hr>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className={`${isLoading ? "pointer-events-none opacity-50" : ""}`}
        >
          {/* Input Field */}
          <div className="w-full mt-5">
            <FieldInput
              text=<span>
                Judul <span className="text-red-500">*</span>
              </span>
              type="text"
              variant="biasa_text_sm"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
            ></FieldInput>
          </div>

          <div className="w-full mt-5">
            <label className="block mb-2 text-sm font-medium text-black">
              Deskripsi
            </label>
            <CKEditor
              editor={ClassicEditor}
              config={{
                toolbar: ["bold", "italic", "undo", "redo"],
              }}
              data={deskirpsi}
              onChange={(event, editor) => setDeskripsi(editor.getData())}
            />
          </div>

          <div className="w-full mt-5 flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <SelectField
                text="Kategori Informasi"
                option={kategoriOptions}
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-end mt-4 md:mt-0">
              <InputFile
                text="Gambar"
                fungsi={handleImageChange}
                variant="w_full"
                filename={fileName}
              />
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-end items-center mt-10">
            <div className="me-2">
              <ButtonHref
                text="Batal"
                variant="cancel"
                href="/dashboard/pengumuman"
              ></ButtonHref>
            </div>
            <div className="w-40">
              <Button
                text={isLoading ? <Loading /> : "Update"}
                variant="button_submit_dash"
                disabled={isLoading}
              ></Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
