import { useState, useEffect } from "react";
import FieldInput from "../../../../component/Input/FieldInput";
import Button from "../../../../component/Button/Button";
import InputFile from "../../../../component/Input/InputFile";
import ButtonHref from "../../../../component/Button/ButtonHref";
import SelectField from "../../../../component/Input/SelectField";
import Textarea from "../../../../component/Input/Textarea";
import { useNavigate, useParams } from "react-router-dom";
import Toast from "../../../../component/Toast/Toast";
import Loading from "../../../../component/Loading/Loading";
import axios from "axios";
import baseUrl from "../../../../utils/config/baseUrl";
import { useUpdateGuru } from "../../../../hooks/Guru/UpdateGuru";

export default function UpdateDataGuru() {
  const {
    isLoading,
    toastMessage,
    toastVariant,
    preview,
    form,
    setform,
    agamaOption,
    kelaminOption,
    handleImageChange,
    handleSubmit,
  } = useUpdateGuru();
  return (
    <div className="lg:py-5">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg">Perbaharui Data Guru</p>
        </div>

        <hr className="border-border-grey border"></hr>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Gambar */}
          <div className="flex flex-col justify-center items-center">
            <div className="p-1 w-60 h-64 my-3 overflow-hidden">
              <img
                src={
                  preview
                    ? preview
                    : `${baseUrl.apiUrlImage}/Upload/profile_image/${form.Gambar}`
                }
                id="ImagePreview"
                className="w-full h-full object-cover rounded"
              />
            </div>

            <InputFile fungsi={handleImageChange}></InputFile>
          </div>

          {/* Input Field */}
          <div className="w-full flex flex-col lg:flex-row justify-between mt-5">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                text=<span>
                  Nama Lengkap <span className="text-red-500">*</span>
                </span>
                type="text"
                value={form.namaGuru}
                onChange={(e) => setform.setNamaGuru(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                text=<span>
                  NIP Guru <span className="text-red-500">*</span>
                </span>
                type="number"
                value={form.nipGuru}
                onChange={(e) => setform.setNipGuru(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>
          </div>

          <div className="w-full flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                text=<span>
                  Email Guru <span className="text-red-500">*</span>
                </span>
                type="email"
                value={form.emailGuru}
                onChange={(e) => setform.setEmailGuru(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>
            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                text=<span>
                  No telepon <span className="text-red-500">*</span>
                </span>
                type="text"
                value={form.telp}
                onChange={(e) => setform.setTelp(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>
          </div>

          <div className="w-full flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                text=<span>
                  Tempat Lahir <span className="text-red-500">*</span>
                </span>
                type="text"
                value={form.tempat_lahir}
                onChange={(e) => setform.setTempatLahir(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                text=<span>
                  Tanggal Lahir <span className="text-red-500">*</span>
                </span>
                type="date"
                value={form.tgl_lahir}
                onChange={(e) => setform.setTglLahir(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>
          </div>

          <div className="w-full flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/2 lg:me-1">
              <SelectField
                text="Agama"
                option={agamaOption}
                value={form.agamaGuru}
                onChange={(e) => setform.setAgama(e.target.value)}
              ></SelectField>
            </div>
            <div className="w-full lg:w-1/2 lg:ms-1">
              <SelectField
                text="Jenis Kelamin"
                option={kelaminOption}
                value={form.kelaminGuru}
                onChange={(e) => setform.setKelamin(e.target.value)}
              ></SelectField>
            </div>
          </div>

          <div className="w-full">
            <Textarea
              text=<span>
                Alamat <span className="text-red-500">*</span>
              </span>
              value={form.alamat}
              onChange={(e) => setform.setAlamat(e.target.value)}
            ></Textarea>
          </div>

          {/* Button */}
          <div className="flex justify-end items-center mt-5">
            <div className="me-2">
              <ButtonHref
                text="Batal"
                variant="cancel"
                href="/dashboard/guru"
              ></ButtonHref>
            </div>
            <div className="w-40">
              <Button
                text={isLoading ? <Loading /> : "Perbaharui"}
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
