import axios from "axios";
import baseUrl from "../../utils/config/baseUrl";
import { useEffect, useState } from "react";

export const useSiswaKelas = () => {
  const [kelas, setDataKelas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const token = sessionStorage.getItem("session");

  const fecthData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${baseUrl.apiUrl}/admin/kelas/aktif`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status == 200) {
        const sortedData = response.data.sort((a, b) => {
          // Bandingkan tingkat (VII, VIII, IX, dst)
          if (a.tingkat !== b.tingkat) {
            return a.tingkat.localeCompare(b.tingkat);
          }
          // Jika tingkat sama, bandingkan nama_kelas (A, B, C)
          return a.nama_kelas.localeCompare(b.nama_kelas);
        });
        setDataKelas(sortedData);
      }
    } catch (error) {
      console.log(error);
      setToastMessage(`Gagal Mengambil Data`);
      setToastVariant("error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fecthData();
  }, [token]);

  return {
    kelas,
    toastMessage,
    toastVariant,
    isLoading,
  };
};
