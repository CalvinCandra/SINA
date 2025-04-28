import { useState } from "react";
import FieldInput from "../../../../component/Input/FieldInput";
import Button from "../../../../component/Button/Button";
import InputFile from "../../../../component/Input/InputFile";
import ButtonHref from "../../../../component/Button/ButtonHref";
import SelectField from "../../../../component/Input/SelectField";
import Textarea from "../../../../component/Input/Textarea";

export default function TambahDataGuru() {
  const [preview, setPreview] = useState(
    "https://manbengkuluselatan.sch.id/assets/img/profile/default.jpg"
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        document.getElementById("file-name").textContent = file.name;
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(
        "https://manbengkuluselatan.sch.id/assets/img/profile/default.jpg"
      );
      document.getElementById("file-name").textContent = "No file chosen";
    }
  };

  const agama = [
    {
      value: "Hindu",
      label: "Hindu",
    },
    {
      value: "Buddha",
      label: "Buddha",
    },
    {
      value: "Kristen Katolik",
      label: "Kristen Katolik",
    },
    {
      value: "Kristen Protestan",
      label: "Kristen Protestan",
    },
    {
      value: "Islam",
      label: "Islam",
    },
  ];

  const kelamin = [
    {
      value: "Laki - Laki",
      label: "Laki - Laki",
    },
    {
      value: "Perempuan",
      label: "Perempuan",
    },
  ];

  return (
    <div className="lg:py-5">
      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg">Tambah Data Guru</p>
        </div>

        <hr className="border-border-grey border"></hr>

        {/* Form */}
        <form>
          {/* Gambar */}
          <div className="flex flex-col justify-center items-center">
            <div className="p-1 w-60 h-64 my-3 overflow-hidden">
              <img
                src={preview}
                id="ImagePreview"
                className="w-full h-full object-object rounded"
              ></img>
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
                name="nama_guru"
                variant="biasa_text_sm"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                text=<span>
                  Email Guru <span className="text-red-500">*</span>
                </span>
                type="email"
                name="email"
                variant="biasa_text_sm"
              ></FieldInput>
            </div>
          </div>

          <div className="w-full flex flex-col lg:flex-row justify-between mt-5">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                text=<span>
                  Tempat Lahir <span className="text-red-500">*</span>
                </span>
                type="text"
                name="tempat_lahir"
                variant="biasa_text_sm"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                text=<span>
                  Tanggal Lahir <span className="text-red-500">*</span>
                </span>
                type="date"
                name="tgl_lahir"
                variant="biasa_text_sm"
              ></FieldInput>
            </div>
          </div>

          <div className="w-full flex flex-col lg:flex-row justify-between mt-5">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                text=<span>
                  No telepon <span className="text-red-500">*</span>
                </span>
                type="text"
                name="telp"
                variant="biasa_text_sm"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:me-1">
              <SelectField text="Agama" option={agama}></SelectField>
            </div>
            <div className="w-full lg:w-1/2 lg:me-1">
              <SelectField text="Jenis Kelamin" option={kelamin}></SelectField>
            </div>
          </div>
          <div className="w-full mt-5">
            <Textarea
              text=<span>
                Alamat <span className="text-red-500">*</span>
              </span>
            ></Textarea>
          </div>

          {/* Button */}
          <div className="flex justify-end items-center mt-5">
            <div className="me-2">
              <ButtonHref
                text="Cancel"
                variant="cancel"
                href="/dashboard/guru"
              ></ButtonHref>
            </div>
            <div className="w-40">
              <Button text="Tambah Guru" variant="button_submit_dash"></Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
