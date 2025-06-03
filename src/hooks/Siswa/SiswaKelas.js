import axios from "axios";
import baseUrl from "../../utils/config/baseUrl";
import { useEffect, useState } from "react";

export const useSiswaKelas = () => {
  const [kelas, setDataKelas] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const token = sessionStorage.getItem("session");

  useEffect(() => {
    const fecthData = async () => {
      try {
        const respones = await axios.get(`${baseUrl.apiUrl}/admin/kelas`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (respones.status == 200) {
          setDataKelas(respones.data);
        }
      } catch (error) {
        console.log(error);
        setToastMessage(`Gagal Mengambil Data`);
        setToastVariant("error");
      }
    };

    fecthData();
  });

  return {
    kelas,
    toastMessage,
    toastVariant,
  };
};
