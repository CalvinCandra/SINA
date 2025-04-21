import { useState } from "react";
import FieldInput from "../../../component/Input/FieldInput";
import Button from "../../../component/Button/Button";
import InputFile from "../../../component/Input/InputFile";
import ButtonHref from "../../../component/Button/ButtonHref";

export default function UpdateAdmin() {
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

  return (
    <div className="lg:py-5">
      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg">Update Data Admin / Staf</p>
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
          <div className="w-full flex justify-between">
            <div className="w-1/2 me-1">
              <FieldInput
                text="Nama Lengkap"
                type="text"
                name="nama_admin"
                variant="biasa_text_sm"
              ></FieldInput>
            </div>

            <div className="w-1/2 ms-1">
              <FieldInput
                text="Email Admin"
                type="email"
                name="email"
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
                href="/dashboard/admin"
              ></ButtonHref>
            </div>
            <div className="w-40">
              <Button text="Update Admin" variant="button_submit_dash"></Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
