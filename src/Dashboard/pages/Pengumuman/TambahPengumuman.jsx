import React from "react";
import { useState } from "react";
import FieldInput from "../../../component/Input/FieldInput";
import Button from "../../../component/Button/Button";
import ButtonHref from "../../../component/Button/ButtonHref";
import Textarea from "../../../component/Input/Textarea";
import InputFile from "../../../component/Input/InputFile";
import SelectField from "../../../component/Input/SelectField";

export default function TambahPengumuman() {
  const [preview, setPreview] = useState(null);

  const kategoriOptions = [
    { value: "Berita", label: "Berita" },
    { value: "Pengumuman", label: "Pengumuman" },
  ];
  const [kategori, setKategori] = useState("");

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
      document.getElementById("file-name").textContent = "No file chosen";
    }
  };

  return (
    <div className="lg:py-5">
      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg">Tambah Data Informasi</p>
        </div>

        <hr className="border-border-grey border"></hr>

        {/* Form */}
        <form>
          {/* Input Field */}
          <div className="w-full mt-5">
            <FieldInput
              text=<span>
                Judul <span className="text-red-500">*</span>
              </span>
              type="text"
              name="judul_pengumuman"
              variant="biasa_text_sm"
            ></FieldInput>
          </div>

          <div className="w-full mt-5">
            <Textarea
              text=<span>
                Deskripsi <span className="text-red-500">*</span>
              </span>
            ></Textarea>
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
              <Button text="Tambah" variant="button_submit_dash"></Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
