import { useState } from "react";
import FieldInput from "../../component/Input/FieldInput";
import Button from "../../component/Button/Button";
import InputFile from "../../component/Input/InputFile";
import ButtonHref from "../../component/Button/ButtonHref";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function Profile() {
  const [namaAdmin, setNamaAdmin] = useState("");
  const [emailAdmin, setEmailAdmin] = useState("");

  const [Password, setPassword] = useState(true);
  // Fungsi untuk toggle tipe input
  const togglePasswordVisibility = () => {
    setPassword((prevPassword) => !prevPassword);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      const fileSizeLimit = 5 * 1024 * 1024; // 5MB limit

      if (!allowedTypes.includes(file.type)) {
        setToastMessage("File harus berformat PNG, JPG, atau JPEG");
        setToastVariant("error");
        setPreview(
          "https://manbengkuluselatan.sch.id/assets/img/profile/default.jpg"
        );
        document.getElementById("file-name").textContent = "No file chosen";
        return;
      }

      if (file.size > fileSizeLimit) {
        setToastMessage("Ukuran file terlalu besar. Maksimum 5MB.");
        setToastVariant("error");
        setPreview(
          "https://manbengkuluselatan.sch.id/assets/img/profile/default.jpg"
        );
        document.getElementById("file-name").textContent = "No file chosen";
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        document.getElementById("file-name").textContent = file.name;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="lg:py-5">
      <div className="w-full p-5 rounded-md bg-white mt-5">
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg">Profile</p>
        </div>

        <hr className="border-border-grey border"></hr>

        <form>
          {/* Gambar */}
          <div className="flex flex-col justify-center items-center">
            <div className="p-1 w-60 h-64 my-3 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Preview"
                id="ImagePreview"
                className="w-full h-full object-object rounded"
              />
            </div>

            <InputFile text="Pilih Foto" fungsi={handleImageChange} />
          </div>

          {/* Input Field */}
          <div className="w-full flex flex-col lg:flex-row justify-between mt-5">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                text={
                  <span>
                    Nama Lengkap <span className="text-red-500">*</span>
                  </span>
                }
                type="text"
                variant="biasa_text_sm"
                value={namaAdmin}
                onChange={(e) => setNamaAdmin(e.target.value)}
              />
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                text={
                  <span>
                    Email Admin <span className="text-red-500">*</span>
                  </span>
                }
                type="email"
                variant="biasa_text_sm"
                value={emailAdmin}
                onChange={(e) => setEmailAdmin(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/2 lg:me-1">
              <div className="w-full relative">
                <FieldInput
                  text="Password Baru"
                  type={`${Password ? "password" : "text"}`}
                  variant="biasa_text_base"
                  name="password"
                ></FieldInput>

                <span onClick={togglePasswordVisibility}>
                  {Password ? (
                    <EyeIcon className="absolute w-10 h-5 bottom-3.5 right-2 cursor-pointer"></EyeIcon>
                  ) : (
                    <EyeSlashIcon className="absolute w-10 h-5 bottom-3.5 right-2 cursor-pointer"></EyeSlashIcon>
                  )}
                </span>
              </div>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <div className="w-full relative">
                <FieldInput
                  text="Password Baru"
                  type={`${Password ? "password" : "text"}`}
                  variant="biasa_text_base"
                  name="password"
                ></FieldInput>

                <span onClick={togglePasswordVisibility}>
                  {Password ? (
                    <EyeIcon className="absolute w-10 h-5 bottom-3.5 right-2 cursor-pointer"></EyeIcon>
                  ) : (
                    <EyeSlashIcon className="absolute w-10 h-5 bottom-3.5 right-2 cursor-pointer"></EyeSlashIcon>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-end items-center mt-5">
            <div className="me-2">
              <ButtonHref text="Cancel" variant="cancel" href="/dashboard" />
            </div>
            <div className="w-40">
              <Button text="Update Profile" variant="button_submit_dash" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
