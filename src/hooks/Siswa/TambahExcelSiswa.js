import axios from "axios";
import baseUrl from "../../utils/config/baseUrl";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const useTambahExcelSiswa = () => {
  const { kelas_id } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  const token = sessionStorage.getItem("session");

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
      ];
      const fileSizeLimit = 10 * 1024 * 1024;

      if (!allowedTypes.includes(file.type)) {
        setToastMessage("File harus berformat PNG, JPG, atau JPEG");
        setToastVariant("error");
        document.getElementById("file-name").textContent = "No file chosen";
        return;
      }

      if (file.size >= fileSizeLimit) {
        setToastMessage("Ukuran file terlalu besar. Maksimum 5MB.");
        setToastVariant("error");
        document.getElementById("file-name").textContent = "No file chosen";
        return;
      }

      // Valid file, simpan ke state
      setFile(file);
      document.getElementById("file-name").textContent = file.name;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // reset pesan toast terlebih dahulu
    setToastMessage("");
    setToastVariant("");

    // validasi input
    if (!file) {
      setTimeout(() => {
        setToastMessage("File belum diinput");
        setToastVariant("error");
      }, 10);
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("fileExcel", file);

      const response = await axios.post(
        `${baseUrl.apiUrl}/admin/siswa/${kelas_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status == 200 || response.status == 201) {
        // Simpan status berhasil tambah
        localStorage.setItem("siswaAdded", "success");

        setTimeout(() => {
          setIsLoading(false);
          navigate(`/dashboard/siswa/${kelas_id}`);
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
    kelas_id,
    file,
    setFile,
    isLoading,
    toastMessage,
    toastVariant,
    handleFile,
    handleSubmit,
  };
};
