import axios from "axios";
import baseUrl from "../../utils/config/baseUrl";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const useDetailSiswa = () => {
  const { kelas_id, nis } = useParams();
  const [siswa, setdataSiswa] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  const token = sessionStorage.getItem("session");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl.apiUrl}/admin/siswa/${nis}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status == 200) {
          setdataSiswa(response.data);
        }
      } catch (error) {
        console.log(error);
        setToastMessage("Gagal ambil data");
        setToastVariant("error");
      }
    };

    fetchData();
  }, [nis]);

  return {
    kelas_id,
    nis,
    siswa,
    toastMessage,
    toastVariant,
  };
};
