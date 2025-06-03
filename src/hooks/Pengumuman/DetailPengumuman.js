import axios from "axios";
import baseUrl from "../../utils/config/baseUrl";
import { formatTanggalLengkap } from "../../utils/helper/dateFormat";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const useDetailPengumuman = () => {
  const { id } = useParams();
  const [Gambar, setGambar] = useState("");
  const [Judul, setJudul] = useState("");
  const [deskirpsi, setDeskripsi] = useState("");
  const [kategori, setKategori] = useState("");
  const [username, setUsername] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const [tgl, setTgl] = useState("");
  // token
  const token = sessionStorage.getItem("session");

  useEffect(() => {
    const fetchData = async (e) => {
      try {
        const response = await axios.get(
          `${baseUrl.apiUrl}/admin/berita/${id}`,
          {
            headers: {
              Authorization: `Beazer ${token}`,
            },
          }
        );

        console.log(response.data);

        if (response.status == 200 || response.status == 201) {
          setDeskripsi(response.data.isi);
          setJudul(response.data.judul);
          setGambar(response.data.foto);
          setUsername(response.data.username);
          setKategori(response.data.tipe);
          setTgl(formatTanggalLengkap(response.data.created_at));
        }
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        setToastMessage("Gagal mengambil data");
        setToastVariant("error");
      }
    };

    fetchData();
  }, [id]);

  return {
    toastMessage,
    toastVariant,
    Gambar,
    Judul,
    deskirpsi,
    kategori,
    username,
    tgl,
  };
};
