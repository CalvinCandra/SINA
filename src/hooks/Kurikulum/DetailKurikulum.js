import axios from "axios";
import baseUrl from "../../utils/config/baseUrl";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const useDetailKurikulum = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const [namaKurikulum, setNamaKurikulum] = useState("");
  const [deskirpsi, setDeskripsi] = useState("");
  const [jenjang, setJenjang] = useState("");
  const [tingkat, setTingkat] = useState("");
  const [mapel, setMapel] = useState([]);

  const token = sessionStorage.getItem("session");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${baseUrl.apiUrl}/admin/kurikulum/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response);

        if (response.status == 200) {
          setNamaKurikulum(response.data.nama_kurikulum);
          setDeskripsi(response.data.deskripsi);
          setJenjang(response.data.jenjang);
          setTingkat(response.data.tingkat);
          setMapel(response.data.mapel_list);
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
  }, [id]);

  return {
    isLoading,
    toastMessage,
    toastVariant,
    namaKurikulum,
    deskirpsi,
    jenjang,
    tingkat,
    mapel,
  };
};
