import axios from "axios";
import baseUrl from "../../utils/config/baseUrl";
import { useEffect, useState } from "react";

export const useJadwalKelas = () => {
  const [dataKelas, setdataKelas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const [selectedKelas, setSelectedKelas] = useState(null);
  const token = sessionStorage.getItem("session");

  // get data
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${baseUrl.apiUrl}/admin/kelas/aktif`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status == 200 || response.status == 201) {
        const sortedData = response.data.sort((a, b) => {
          // Bandingkan tingkat (VII, VIII, IX, dst)
          if (a.tingkat !== b.tingkat) {
            return a.tingkat.localeCompare(b.tingkat);
          }
          // Jika tingkat sama, bandingkan nama_kelas (A, B, C)
          return a.nama_kelas.localeCompare(b.nama_kelas);
        });
        setdataKelas(sortedData);
      }
    } catch (error) {
      console.log(error);
      setToastMessage("Gagal Ambil Data");
      setToastVariant("error");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleDelete = async (e) => {
    e.preventDefault();

    if (!selectedKelas?.kelas_id) return;

    setIsLoading(true);

    setToastMessage("");
    setToastVariant("");

    try {
      const response = await axios.delete(
        `${baseUrl.apiUrl}/admin/jadwalbykelas/${selectedKelas.kelas_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status == 200 || response.status == 201) {
        setTimeout(() => {
          setIsLoading(false);
          setToastMessage(
            `Berhasil Hapus Semua Jadwal Pada Kelas ${selectedKelas.nama_kelas} Tingkat ${selectedKelas.tingkat}`
          );
          setToastVariant("success");
          document.getElementById("my_modal_3").close();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        setIsLoading(false);
        setToastMessage(error.response.data.message);
        setToastVariant("error");
        document.getElementById("my_modal_3").close();
      }, 1000);
    }
  };

  return {
    dataKelas,
    isLoading,
    toastMessage,
    toastVariant,
    handleDelete,
    selectedKelas,
    setSelectedKelas,
  };
};
