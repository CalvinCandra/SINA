import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import baseUrl from "../../utils/config/baseUrl";

export const useKelas = () => {
  const [dataKelas, setDataKelas] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [selectedKelas, setSelectedKelas] = useState(null);

  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dataPerPage = 10;
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;

  const token = sessionStorage.getItem("session");

  // Ambil Data Kelas
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${baseUrl.apiUrl}/admin/kelas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setDataKelas(response.data);
      }
    } catch (error) {
      console.error(error);
      setToastMessage("Gagal mengambil data kelas");
      setToastVariant("error");
    } finally {
      setIsLoading(false);
    }
  };

  // refresh Data
  useEffect(() => {
    fetchData();
  }, [token]);

  // Pagination filter
  const filteredData = useMemo(() => {
    return dataKelas
      .filter((item) =>
        item.nama_kelas.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [dataKelas, searchQuery]);

  // total pages
  const totalPages = Math.ceil(filteredData.length / dataPerPage);

  // Replace pagination effect jadi:
  useEffect(() => {
    setCurrentData(filteredData.slice(indexOfFirstData, indexOfLastData));
  }, [filteredData, currentPage]);

  // Handle Delete
  const handleDeleteKelas = async (e) => {
    e.preventDefault();
    if (!selectedKelas) return;

    // reset
    setToastMessage("");
    setToastVariant("");

    setIsLoading(true);
    try {
      await axios.delete(
        `${baseUrl.apiUrl}/admin/kelas/${selectedKelas.kelas_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTimeout(() => {
        setIsLoading(false);
        setToastMessage("Data Kelas berhasil dihapus");
        setToastVariant("success");
        setDataKelas((prevData) =>
          prevData.filter((item) => item.kelas_id !== selectedKelas.kelas_id)
        );
        document.getElementById("my_modal_3").close();
      }, 1000);
    } catch (error) {
      console.error("Gagal menghapus data:", error);
      setToastMessage(error?.response?.data?.message || "Gagal hapus data");
      setToastVariant("error");
      setIsLoading(false);
      document.getElementById("my_modal_3").close();
    }
  };

  return {
    dataKelas,
    currentData,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    totalPages,
    indexOfFirstData,
    indexOfLastData,
    selectedKelas,
    setSelectedKelas,
    isLoading,
    toastMessage,
    toastVariant,
    handleDeleteKelas,
  };
};
