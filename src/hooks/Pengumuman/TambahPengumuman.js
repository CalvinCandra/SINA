import axios from "axios";
import baseUrl from "../../utils/config/baseUrl";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useTambahPengumuman = () => {
  const [deskirpsi, setEditorData] = useState("");
  const [kategori, setKategori] = useState("");
  const [judul, setJudul] = useState("");
  const [Gambar, setGambar] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const navigate = useNavigate();
  const token = sessionStorage.getItem("session");

  const kategoriOptions = [
    { value: "berita", label: "Berita" },
    { value: "pengumuman", label: "Pengumuman" },
  ];

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

    if (judul.trim() === "") {
      setTimeout(() => {
        setToastMessage("Judul tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }

    if (deskirpsi.trim() === "") {
      setTimeout(() => {
        setToastMessage("Deskripsi tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }

    if (kategori.trim() === "") {
      setTimeout(() => {
        setToastMessage("Kategori  tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }

    if (!Gambar || !(Gambar instanceof File)) {
      setTimeout(() => {
        setToastMessage("Gambar tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("judul", judul);
      formData.append("isi", deskirpsi);
      formData.append("foto", Gambar);
      formData.append("tipe", kategori);

      const response = await axios.post(
        `${baseUrl.apiUrl}/admin/berita`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        localStorage.setItem("informasiAdded", "success");
        setTimeout(() => {
          setIsLoading(false);
          navigate("/dashboard/pengumuman");
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      // Menangani error yang dikirimkan oleh server
      let errorMessage = "Login Gagal";

      if (error.response && error.response.data.error.message) {
        // Jika error dari server ada di response.data
        if (error.response.data.error.message) {
          errorMessage = error.response.data.error.message; // Tampilkan pesan dari server jika ada
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
    toastMessage,
    toastVariant,
    deskirpsi,
    setEditorData,
    kategori,
    setKategori,
    judul,
    setJudul,
    Gambar,
    setGambar,
    kategoriOptions,
    handleImageChange,
    handleSubmit,
  };
};
