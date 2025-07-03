import axios from "axios";
import baseUrl from "../../utils/config/baseUrl";
import {
  formatTanggalLengkap,
  formatTanggalSingkat,
} from "../../utils/helper/dateFormat";
import { useEffect, useState } from "react";

export const useInformasi = () => {
  const [beritaList, setBeritaList] = useState([]);
  const [currentBerita, setCurrentBerita] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBeritaTerbaru = async () => {
    const timestamp = new Date().getTime();
    try {
      setIsLoading(true);
      const response = await axios.get(`${baseUrl.apiUrl}/berita/landing`, {
        params: { timestamp },
      });

      if (response.status === 200) {
        const formattedBerita = response.data.map((berita) => ({
          id: berita.berita_id,
          judul: berita.judul || "Judul tidak tersedia",
          foto: berita.foto,
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

  const getBeritaById = async (id) => {
    if (!id) {
      setError("ID tidak valid");
      return null;
    }

    try {
      setIsLoading(true);
      setError(null);
      setCurrentBerita(null);

      const response = await axios.get(
        `${baseUrl.apiUrl}/berita/landing/${id}`
      );

      // Ambil objek pertama dari array
      const data = Array.isArray(response.data)
        ? response.data[0]
        : response.data;

      if (!data || !data.berita_id) {
        throw new Error("Data berita tidak ditemukan dalam respons");
      }

      const berita = {
        id: data.berita_id,
        judul: data.judul || "Judul tidak tersedia",
        foto: data.foto,
        tipe: data.tipe || "umum",
        isi: data.isi || "",
        username: data.username || "Anonim",
        tglLengkap: formatTanggalLengkap(data.created_at),
        tglSingkat: formatTanggalSingkat(data.created_at),
        createdAt: new Date(data.created_at),
      };

      setCurrentBerita(berita);
      return berita;
    } catch (err) {
      console.error("Error fetching berita:", err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Terjadi kesalahan saat memuat berita";

      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBeritaTerbaru();
  }, []);

  return {
    beritaList,
    currentBerita,
    isLoading,
    error,
    refresh: fetchBeritaTerbaru,
    getBeritaById,
  };
};
