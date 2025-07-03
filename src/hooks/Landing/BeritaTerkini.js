import axios from "axios";
import baseUrl from "../../utils/config/baseUrl";
import {
  formatTanggalLengkap,
  formatTanggalSingkat,
} from "../../utils/helper/dateFormat";
import { useEffect, useState } from "react";

export const useBerita = (limit = 5) => {
  const [beritaList, setBeritaList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBeritaTerbaru = async () => {
    // const timestamp = new Date().getTime();
    try {
      setIsLoading(true);
      const response = await axios.get(`${baseUrl.apiUrl}/berita/landing`, {
        params: { limit },
      });

      if (response.status === 200) {
        const formattedBerita = response.data.map((berita) => ({
          id: berita.berita_id,
          judul: berita.judul || "Judul tidak tersedia",
          foto: berita.foto, // Simpan hanya nama filenya saja
          tipe: berita.tipe || "umum",
          isi: berita.isi || "",
          username: berita.username || "Anonim",
          tglLengkap: formatTanggalLengkap(berita.created_at),
          tglSingkat: formatTanggalSingkat(berita.created_at),
          createdAt: new Date(berita.created_at),
        }));

        setBeritaList(formattedBerita);
      }
    } catch (err) {
      console.error("Gagal mengambil data berita:", err);
      setError(err.response?.data?.message || "Gagal memuat data berita");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBeritaTerbaru();
  }, [limit]);

  return {
    beritaList,
    isLoading,
    error,
    refresh: fetchBeritaTerbaru,
  };
};
