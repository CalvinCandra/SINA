import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import baseUrl from "../../utils/config/baseUrl";
import axios from "axios";

export const useUpdateKurikulum = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [namaKurikulum, setNamaKurikulum] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const token = sessionStorage.getItem("session");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${baseUrl.apiUrl}/admin/kurikulum/${id}`,
          {
            headers: {
              Authorization: `Beazer ${token}`,
            },
          }
        );

        if (response.status == 200 || response.status == 201) {
          setNamaKurikulum(response.data.nama_kurikulum);
          setDeskripsi(response.data.deskripsi);
        }
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        setToastMessage("Data tidak ditemukan");
        setToastVariant("error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // reset pesan toast
    setToastMessage("");
    setToastVariant("");

    if (namaKurikulum.trim() === "" || deskripsi.trim() === "") {
      setTimeout(() => {
        setToastMessage("Nama Kurikulum atau Deskripsi tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.put(
        `${baseUrl.apiUrl}/admin/kurikulum/${id}`,
        {
          nama_kurikulum: namaKurikulum,
          deskripsi: deskripsi,
        },
        {
          headers: {
            Authorization: `Beazer ${token}`,
          },
        }
      );

      if (response.status == 200 || response.status == 201) {
        localStorage.setItem("kurikulumUpdate", "success");
        setTimeout(() => {
          setIsLoading(false);
          navigate("/dashboard/akademik/kurikulum");
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      // Menangani error yang dikirimkan oleh server
      let errorMessage = "Gagal Update";

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
    namaKurikulum,
    setNamaKurikulum,
    deskripsi,
    setDeskripsi,
    isLoading,
    toastMessage,
    toastVariant,
    handleSubmit,
  };
};
