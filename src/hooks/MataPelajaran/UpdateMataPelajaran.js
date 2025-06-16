import axios from "axios";
import baseUrl from "../../utils/config/baseUrl";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const useUpdateMataPelajaran = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nama_mapel, setNamaMapel] = useState("");
  const [kkm, setKkm] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const token = sessionStorage.getItem("session");

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${baseUrl.apiUrl}/admin/mapel/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNamaMapel(response.data.nama_mapel);
      setKkm(response.data.kkm);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
      setToastMessage("Data tidak ditemukan");
      setToastVariant("error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // reset pesan toast
    setToastMessage("");
    setToastVariant("");

    if (nama_mapel.trim() === "" || String(kkm).trim() === "") {
      setTimeout(() => {
        setToastMessage("Nama Mata Pelajaran atau KKM tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.put(
        `${baseUrl.apiUrl}/admin/mapel/${id}`,
        {
          nama_mapel: nama_mapel,
          kkm: kkm,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("pelajaranUpdate", "success");

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
    toastMessage,
    toastVariant,
    isLoading,
    handleSubmit,
  };
};
