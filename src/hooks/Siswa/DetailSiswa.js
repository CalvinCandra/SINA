import axios from "axios";
import baseUrl from "../../utils/config/baseUrl";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ImageImport from "../../data/ImageImport";

export const useDetailSiswa = () => {
  const { kelas_id, nis } = useParams();
  const defaultGambar = ImageImport.defaultGambar;
  const [siswa, setdataSiswa] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  const token = sessionStorage.getItem("session");

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${baseUrl.apiUrl}/admin/siswa/${nis}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status == 200) {
        setdataSiswa(response.data);
      }
    } catch (error) {
      console.log(error);
      setToastMessage("Gagal ambil data");
      setToastVariant("error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [nis]);

  return {
    kelas_id,
    defaultGambar,
    nis,
    siswa,
    toastMessage,
    toastVariant,
    isLoading,
  };
};
