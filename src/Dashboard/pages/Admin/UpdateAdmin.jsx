import { useState, useEffect } from "react";
import FieldInput from "../../../component/Input/FieldInput";
import Button from "../../../component/Button/Button";
import InputFile from "../../../component/Input/InputFile";
import ButtonHref from "../../../component/Button/ButtonHref";
import { useNavigate, useParams } from "react-router-dom";
import Toast from "../../../component/Toast/Toast";
import Loading from "../../../component/Loading/Loading";
import baseUrl from "../../../utils/config/baseUrl";
import axios from "axios";

export default function UpdateAdmin() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [preview, setPreview] = useState("");
  const [Gambar, setGambar] = useState(null);
  const [namaAdmin, setNamaAdmin] = useState("");
  const [emailAdmin, setEmailAdmin] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // get token
  const token = sessionStorage.getItem("session");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl.apiUrl}/admin/admin2/${id}`,
          {
            headers: {
              Authorization: `Beazer ${token}`,
            },
          }
        );

        console.log(response);

        if (response.status == 200 || response.status == 201) {
          setNamaAdmin(response.data.username);
          setEmailAdmin(response.data.email);
          setGambar(response.data.foto_profil);
        }
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        setToastMessage("Gagal mengambil data");
        setToastVariant("error");
      }
    };

    fetchData();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      const fileSizeLimit = 5 * 1024 * 1024;

      if (!allowedTypes.includes(file.type)) {
        setToastMessage("File harus berformat PNG, JPG, atau JPEG");
        setToastVariant("error");
        return;
      }

      if (file.size > fileSizeLimit) {
        setToastMessage("Ukuran file terlalu besar. Maksimum 5MB.");
        setToastVariant("error");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setGambar(file);
        document.getElementById("file-name").textContent = file.name;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // reset pesan toast
    setToastMessage("");
    setToastVariant("");

    if (namaAdmin.trim() === "" || emailAdmin.trim() === "") {
      setTimeout(() => {
        setToastMessage("Nama dan Email tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("username", namaAdmin);
      formData.append("email", emailAdmin);
      formData.append("foto_profile", Gambar);

      const response = await axios.put(
        `${baseUrl.apiUrl}/admin/admin2/${id}`,
        formData,
        {
          headers: {
            Authorization: `Beazer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status == 200 || response.status == 201) {
        localStorage.setItem("adminUpdate", "success");
        setTimeout(() => {
          setIsLoading(false);
          navigate("/dashboard/admin");
        }, 1000);
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

      setIsLoading(false);
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
          <p className="font-semibold text-lg">Perbaharui Data Admin</p>
        </div>

        <hr className="border-border-grey border" />

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center items-center">
            <div className="p-1 w-full lg:w-60 h-64 my-3 overflow-hidden">
              <img
                src={
                  preview
                    ? preview
                    : Gambar
                    ? `${baseUrl.apiUrlImage}/Upload/profile_image/${Gambar}`
                    : ""
                }
                id="ImagePreview"
                className="w-full h-full object-cover rounded"
              />
            </div>
            <InputFile text="Pilih Foto Baru" fungsi={handleImageChange} />
          </div>

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
                name="email_admin"
                variant="biasa_text_sm"
                value={emailAdmin}
                onChange={(e) => setEmailAdmin(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end items-center mt-5">
            <div className="me-2">
              <ButtonHref
                text="Batal"
                variant="cancel"
                href="/dashboard/admin"
              />
            </div>
            <div className="w-40">
              <Button
                text={isLoading ? <Loading /> : "Perbaharui"}
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
