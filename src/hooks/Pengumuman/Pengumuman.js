import axios from "axios";
import baseUrl from "../../utils/config/baseUrl";
import { useEffect, useState } from "react";

export const usePengumuman = () => {
  // simpan data pengumuman
  const [selectedBerita, setSelectedBerita] = useState(null);
  const [dataBerita, setdataBerita] = useState([]);
  const [currentData, setCurrentData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  const dataPerPage = 10;
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const totalPages = Math.ceil(currentData.length / dataPerPage);
  // get token
  const token = sessionStorage.getItem("session");

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${baseUrl.apiUrl}/admin/berita`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setdataBerita(response.data);
      }
    } catch (error) {
      console.error("Gagal mengambil data:", error);
      setToastMessage("Gagal mengambil data");
      setToastVariant("error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Tampilkan toast bila tambah atau update berhasil
    const invalidStatus = localStorage.getItem("informasiInvalid");
    const addedStatus = localStorage.getItem("informasiAdded");
    const updateStatus = localStorage.getItem("informasiUpdate");

    if (invalidStatus === "error") {
      setToastMessage("Informasi Tidak ditemukan");
      setToastVariant("error");
      localStorage.removeItem("informasiInvalid");
    }

    if (addedStatus === "success") {
      setToastMessage("Informasi berhasil ditambahkan");
      setToastVariant("success");
      localStorage.removeItem("informasiAdded");
    }

    if (updateStatus === "success") {
      setToastMessage("Informasi berhasil diupdate");
      setToastVariant("success");
      localStorage.removeItem("informasiUpdate");
    }

    fetchData();
  }, [token]);

  // Pagination and Serach
  useEffect(() => {
    const filtered = dataBerita
      .filter((item) =>
        item.judul.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    setCurrentData(filtered.slice(indexOfFirstData, indexOfLastData));
  }, [dataBerita, searchQuery, currentPage]);

  // Hapus
  const handleDeleteBerita = async (e) => {
    e.preventDefault();
    if (!selectedBerita) return;

    setIsLoading(true); // Set loading state

    try {
      await axios.delete(
        `${baseUrl.apiUrl}/admin/berita/${selectedBerita.berita_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // reset
      setToastMessage("");
      setToastVariant("");

      // Simulasi delay untuk loading
      setTimeout(() => {
        setIsLoading(false); // Reset loading state
        setToastMessage("Informasi berhasil dihapus");
        setToastVariant("success");
        // Hapus data dari state tanpa perlu fetch ulang
        setdataBerita((prevData) =>
          prevData.filter((item) => item.berita_id !== selectedBerita.berita_id)
        );
        document.getElementById("my_modal_3").close();
      }, 1000);
    } catch (error) {
      console.error("Gagal menghapus data:", error);
      setToastMessage("Gagal menghapus data");
      setToastVariant("error");
      document.getElementById("my_modal_3").close();
    }
  };

  return {
    selectedBerita,
    setSelectedBerita,
    dataBerita,
    currentData,
    isLoading,
    toastMessage,
    toastVariant,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    totalPages,
    indexOfFirstData,
    indexOfLastData,
    handleDeleteBerita,
  };
};
