import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import baseUrl from "../../utils/config/baseUrl";

export const useMataPelajaran = () => {
  const [selectedPelajaran, setSelectedPelajaran] = useState(null);
  const [dataPelajaran, setdataPelajaran] = useState([]);
  const [currentData, setCurrentData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  const dataPerPage = 10;
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;

  // get token
  const token = sessionStorage.getItem("session");

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${baseUrl.apiUrl}/admin/mapel`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setdataPelajaran(response.data);
        console.log(response);
      }
    } catch (error) {
      console.error("Gagal mengambil data pelajaran:", error);
      setToastMessage("Gagal mengambil data pelajaran");
      setToastVariant("error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Tampilkan toast bila tambah atau update berhasil
    const invalidStatus = localStorage.getItem("pelajaranInvalid");
    const addedStatus = localStorage.getItem("pelajaranAdded");
    const updateStatus = localStorage.getItem("pelajaranUpdate");

    if (invalidStatus === "error") {
      setToastMessage("Data Mata Pelajaran Tidak ditemukan");
      setToastVariant("error");
      localStorage.removeItem("pelajaranInvalid");
    }

    if (addedStatus === "success") {
      setToastMessage("Mata Pelajaran berhasil ditambahkan");
      setToastVariant("success");
      localStorage.removeItem("pelajaranAdded");
    }

    if (updateStatus === "success") {
      setToastMessage("Mata Pelajaran berhasil diupdate");
      setToastVariant("success");
      localStorage.removeItem("pelajaranUpdate");
    }

    fetchData();
  }, [token]);

  // Pagination filter
  const filteredData = useMemo(() => {
    return dataPelajaran
      .filter((item) =>
        item.nama_mapel.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [dataPelajaran, searchQuery]);

  // total pages
  const totalPages = Math.ceil(filteredData.length / dataPerPage);

  // Replace pagination effect jadi:
  useEffect(() => {
    setCurrentData(filteredData.slice(indexOfFirstData, indexOfLastData));
  }, [filteredData, currentPage]);

  // Hapus
  const handleDeletePelajaran = async (e) => {
    e.preventDefault();
    if (!selectedPelajaran) return;

    setIsLoading(true);

    try {
      await axios.delete(
        `${baseUrl.apiUrl}/admin/mapel/${selectedPelajaran.mapel_id}`,
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
        setToastMessage("Mata Pelajaran berhasil dihapus");
        setToastVariant("success");
        // Hapus data dari state tanpa perlu fetch ulang
        setdataPelajaran((prevData) =>
          prevData.filter(
            (item) => item.mapel_id !== selectedPelajaran.mapel_id
          )
        );
        document.getElementById("my_modal_3").close();
      }, 1000);
    } catch (error) {
      console.error("Gagal menghapus data pelajaran:", error);
      setToastMessage("Gagal menghapus data pelajaran");
      setToastVariant("error");
      document.getElementById("my_modal_3").close();
    }
  };

  return {
    selectedPelajaran,
    setSelectedPelajaran,
    dataPelajaran,
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
    handleDeletePelajaran,
  };
};
