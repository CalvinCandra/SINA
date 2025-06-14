import axios from "axios";
import { useEffect, useState } from "react";
import baseUrl from "../../utils/config/baseUrl";

export const useRapotKelas = () => {
  const [dataKelas, setdataKelas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const token = sessionStorage.getItem("session");

  useEffect(() => {
    const fecthData = async () => {
      try {
        setIsLoading(true);
        const respones = await axios.get(`${baseUrl.apiUrl}/admin/kelas`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (respones.status == 200 || respones.status == 201) {
          setdataKelas(respones.data);
        }
      } catch (error) {
        console.log(error);
        setToastMessage("Gagal Ambil Data");
        setToastVariant("error");
      } finally {
        setIsLoading(false);
      }
    };

    fecthData();
  }, [token]);

  return {
    dataKelas,
    toastMessage,
    toastVariant,
    isLoading,
  };
};
