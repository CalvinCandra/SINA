import axios from "axios";
import baseUrl from "../../utils/config/baseUrl";
import { useEffect, useState } from "react";

export const useJadwalKelas = () => {
  const [dataKelas, setdataKelas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const token = sessionStorage.getItem("session");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${baseUrl.apiUrl}/admin/kelas`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status == 200 || response.status == 201) {
          setdataKelas(response.data);
        }
      } catch (error) {
        console.log(error);
        setToastMessage("Gagal Ambil Data");
        setToastVariant("error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return {
    dataKelas,
    isLoading,
    toastMessage,
    toastVariant,
  };
};
