import axios from "axios";
import baseUrl from "../../utils/config/baseUrl";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useTambahMataPelajaran = () => {
  const navigate = useNavigate();
  const [nama_mapel, setNamaMapel] = useState("");
  const [kkm, setKkm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const token = sessionStorage.getItem("session");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // reset pesan toast terlebih dahulu
    setToastMessage("");
    setToastVariant("");

    // Validasi input
    if (nama_mapel.trim() === "") {
      setTimeout(() => {
        setToastMessage("Nama mata pelajaran tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }

    if (kkm.trim() === "") {
      setTimeout(() => {
        setToastMessage("KKM tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${baseUrl.apiUrl}/admin/mapel`,
        {
          nama_mapel,
          kkm,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        localStorage.setItem("pelajaranAdded", "success");

        setTimeout(() => {
          setIsLoading(false);
          navigate("/dashboard/akademik/mata-pelajaran");
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      // Menangani error yang dikirimkan oleh server
      let errorMessage = "Gagal Tambah";

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

  return {
    nama_mapel,
    setNamaMapel,
    kkm,
    setKkm,
    isLoading,
    toastMessage,
    toastVariant,
    handleSubmit,
  };
};
