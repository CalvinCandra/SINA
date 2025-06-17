import { useNavigate } from "react-router-dom";
import baseUrl from "../../utils/config/baseUrl";
import axios from "axios";
import { useState } from "react";
import ImageImport from "../../data/ImageImport";
import { getDefaultImageAsFile } from "../../utils/helper/defaultImage";

export const useTambah = () => {
  // state
  const navigate = useNavigate();
  const defaultImage = ImageImport.defaultGambar;
  const [preview, setPreview] = useState("");
  const [namaAdmin, setNamaAdmin] = useState("");
  const [emailAdmin, setEmailAdmin] = useState("");
  const [Gambar, setGambar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  // get token
  const token = sessionStorage.getItem("session");

  // preview gambar
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
        setPreview(reader.result);
        setGambar(file);
        document.getElementById("file-name").textContent = file.name;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("username", namaAdmin);
      formData.append("email", emailAdmin);

      // Gambar default
      let finalGambar = Gambar;
      if (!finalGambar) {
        finalGambar = await getDefaultImageAsFile(defaultGambar);
      }

      formData.append("foto_profile", finalGambar);

      const response = await axios.post(
        `${baseUrl.apiUrl}/admin/admin2`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        localStorage.setItem("adminAdded", "success");
        setTimeout(() => {
          setIsLoading(false);
          navigate("/dashboard/admin");
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

      setIsLoading(false);
      setToastMessage(errorMessage);
      setToastVariant("error");
    }
  };

  return {
    isLoading,
    defaultImage,
    toastMessage,
    toastVariant,
    preview,
    namaAdmin,
    emailAdmin,
    setEmailAdmin,
    setNamaAdmin,
    handleImageChange,
    handleSubmit,
  };
};
