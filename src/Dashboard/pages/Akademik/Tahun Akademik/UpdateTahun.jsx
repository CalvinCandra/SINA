import { useState } from "react";
import FieldInput from "../../../../component/Input/FieldInput";
import Button from "../../../../component/Button/Button";
import ButtonHref from "../../../../component/Button/ButtonHref";
import SelectField from "../../../../component/Input/SelectField";

export default function UpdateTahun() {
  const Kurikulum = [
    {
      value: "Kurikulum Mederka Belajar 1",
      label: "Kurikulum Mederka Belajar 1",
    },
    {
      value: "Kurikulum Mederka Belajar 1",
      label: "Kurikulum Mederka Belajar 1",
    },
    {
      value: "Kurikulum Mederka Belajar 1",
      label: "Kurikulum Mederka Belajar 1",
    },
  ];
  return (
    <div className="lg:py-5">
      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg">Update Data Tahun Kurikulum</p>
        </div>

        <hr className="border-border-grey border"></hr>

        {/* Form */}
        <form>
          {/* Input Field */}

          <div className="w-full me-1 mt-5">
            <SelectField text="Nama Kurikulum" option={Kurikulum}></SelectField>
          </div>

          <div className="flex flex-col lg:flex-row w-full justify-between">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                text=<span>
                  Tanggal Mulai <span className="text-red-500">*</span>
                </span>
                type="date"
                name="tgl_mulai"
                variant="biasa_text_sm"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                text=<span>
                  Tanggal Akhir <span className="text-red-500">*</span>
                </span>
                type="date"
                name="tgl_akhir"
                variant="biasa_text_sm"
              ></FieldInput>
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-end items-center mt-5">
            <div className="me-2">
              <ButtonHref
                text="Cancel"
                variant="cancel"
                href="/dashboard/akademik/tahun-akademik"
              ></ButtonHref>
            </div>
            <div className="w-40">
              <Button
                text="Update Kurikulum"
                variant="button_submit_dash"
              ></Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
