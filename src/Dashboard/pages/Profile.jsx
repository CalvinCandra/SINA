import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import FieldInput from "../../component/Input/FieldInput";
import Button from "../../component/Button/Button";
import InputFile from "../../component/Input/InputFile";
import ButtonHref from "../../component/Button/ButtonHref";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Toast from "../../component/Toast/Toast";
import Loading from "../../component/Loading/Loading";
import axios from "axios";
import baseUrl from "../../utils/config/baseUrl";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [namaAdmin, setNamaAdmin] = useState("");
  const [emailAdmin, setEmailAdmin] = useState("");
  const [passSekarang, setpassSekarang] = useState("");
  const [passBaru, setpassBaru] = useState("");
  const [passKonfirm, setpassKonfrim] = useState("");
  const [Gambar, setGambar] = useState(null);
  const [GambarPreview, setGambarPreview] = useState("");

  const [showPassLama, setShowPassLama] = useState(true);
  const [showPassBaru, setShowPassBaru] = useState(true);
  const [ShowPassKonfirm, setShowPassKonfirm] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  const token = sessionStorage.getItem("session");

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          try {
            const response = await axios.get(
              `${baseUrl.apiUrl}/admin/profile`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (response.status === 200 || response.status === 201) {
              setNamaAdmin(response.data.data.username);
              setEmailAdmin(response.data.data.email);
              setGambar(response.data.data.foto_profil);
            }
          } catch (error) {}
        } catch (error) {
          console.error("Token tidak valid:", error);
        }
      }
    };

    fetchData();
  }, [token]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      const fileSizeLimit = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        setToastMessage("File harus berformat PNG, JPG, atau JPEG");
        setToastVariant("error");
        document.getElementById("file-name").textContent = "No file chosen";
        return;
      }

      if (file.size > fileSizeLimit) {
        setToastMessage("Ukuran file terlalu besar. Maksimum 5MB.");
        setToastVariant("error");
        document.getElementById("file-name").textContent = "No file chosen";
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setGambarPreview(reader.result);
        setGambar(file);
        document.getElementById("file-name").textContent = file.name;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // reset pesan toast terlebih dahulu
    setToastMessage("");
    setToastVariant("");

    if (namaAdmin.trim() === "") {
      setTimeout(() => {
        setToastMessage("Nama Admin tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }

    if (emailAdmin.trim() === "") {
      setTimeout(() => {
        setToastMessage("Email Admin tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }

    if (passSekarang.trim() !== "") {
      if (passBaru.trim() === "") {
        setTimeout(() => {
          setToastMessage("Masukan Password Baru");
          setToastVariant("error");
        }, 10);
        return;
      }

      if (passKonfirm.trim() === "") {
        setTimeout(() => {
          setToastMessage("Isi Konfrimasi Password");
          setToastVariant("error");
        }, 10);
        return;
      }

      if (passBaru !== passKonfirm) {
        setTimeout(() => {
          setToastMessage("Password baru dan Konfirmasi Password tidak sama");
          setToastVariant("error");
        }, 10);
        return;
      }
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("username", namaAdmin);
      formData.append("email", emailAdmin);
      formData.append("oldpassword", passSekarang);
      formData.append("password", passBaru);
      formData.append("file", Gambar);
      const response = await axios.put(
        `${baseUrl.apiUrl}/admin/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setTimeout(() => {
          setIsLoading(false);
          localStorage.setItem("profile", "success");
          localStorage.setItem("updateProfile", "true");
          // Redirect ke halaman dashboard
          navigate("/dashboard");
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      // Menangani error yang dikirimkan oleh server
      let errorMessage = "Gagal";

      if (error.response && error.response.data.message) {
        // Jika error dari server ada di response.data
        if (error.response.data.message) {
          errorMessage = error.response.data.message; // Tampilkan pesan dari server jika ada
        }
      } else {
        // Jika error tidak ada response dari server
        errorMessage = error.message;
      }

      setIsLoading(false); // jangan lupa set false
      setTimeout(() => {
        setToastMessage(`${errorMessage}`);
        setToastVariant("error");
      }, 10);
      return;
    }
  };

  return (
    <div className="lg:py-5">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="w-full p-5 rounded-md bg-white mt-5">
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg">Profile</p>
        </div>

        <hr className="border-border-grey border"></hr>

        <form onSubmit={handleSubmit}>
          {/* Gambar */}
          <div className="flex flex-col justify-center items-center">
            <div className="p-1 w-60 h-64 my-3 overflow-hidden">
              <img
                src={
                  GambarPreview
                    ? GambarPreview
                    : `${baseUrl.apiUrlImage}/Upload/profile_image/${Gambar}`
                }
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
            <div className="w-full lg:w-1/2">
              <div className="w-full relative">
                <FieldInput
                  text="Password Lama"
                  type={`${showPassLama ? "password" : "text"}`}
                  variant="biasa_text_base"
                  value={passSekarang}
                  onChange={(e) => setpassSekarang(e.target.value)}
                ></FieldInput>

                <span onClick={() => setShowPassLama(!showPassLama)}>
                  {showPassLama ? (
                    <EyeIcon className="absolute w-10 h-5 bottom-3.5 right-1 cursor-pointer"></EyeIcon>
                  ) : (
                    <EyeSlashIcon className="absolute w-10 h-5 bottom-3.5 right-1 cursor-pointer"></EyeSlashIcon>
                  )}
                </span>
              </div>
            </div>

            <div className="w-full lg:w-1/2 lg:mx-2">
              <div className="w-full relative">
                <FieldInput
                  text="Password Baru"
                  type={`${showPassBaru ? "password" : "text"}`}
                  variant="biasa_text_base"
                  value={passBaru}
                  onChange={(e) => setpassBaru(e.target.value)}
                ></FieldInput>

                <span onClick={() => setShowPassBaru(!showPassBaru)}>
                  {showPassBaru ? (
                    <EyeIcon className="absolute w-10 h-5 bottom-3.5 right-1 cursor-pointer"></EyeIcon>
                  ) : (
                    <EyeSlashIcon className="absolute w-10 h-5 bottom-3.5 right-1 cursor-pointer"></EyeSlashIcon>
                  )}
                </span>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="w-full relative">
                <FieldInput
                  text="Password Baru"
                  type={`${ShowPassKonfirm ? "password" : "text"}`}
                  variant="biasa_text_base"
                  value={passKonfirm}
                  onChange={(e) => setpassKonfrim(e.target.value)}
                ></FieldInput>

                <span onClick={() => setShowPassKonfirm(!ShowPassKonfirm)}>
                  {ShowPassKonfirm ? (
                    <EyeIcon className="absolute w-10 h-5 bottom-3.5 right-1 cursor-pointer"></EyeIcon>
                  ) : (
                    <EyeSlashIcon className="absolute w-10 h-5 bottom-3.5 right-1 cursor-pointer"></EyeSlashIcon>
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
              <Button
                text={isLoading ? <Loading /> : "Update Profile"}
                variant="button_submit_dash"
                disabled={isLoading}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
