import axios from "axios";
import { useEffect, useState } from "react";
import baseUrl from "../../utils/config/baseUrl";

export const useKelas = () => {
  const [selectedKelas, setSelectedKelas] = useState(null);
  const [dataKelas, setdatakelas] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;
  // const token
  const token = sessionStorage.getItem("session");

  // Filter data berdasarkan search query
  const filteredData = dataKelas.filter((kelas) => {
    const query = searchQuery.toLowerCase();
    return (
      kelas.nama_kelas?.toLowerCase().includes(query) ||
      kelas.tingkat?.toLowerCase().includes(query) ||
      kelas.nama_guru?.toLowerCase().includes(query)
    );
  });

  // Pagination
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = filteredData
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(indexOfFirstData, indexOfLastData);
  const totalPages = Math.ceil(filteredData.length / dataPerPage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${baseUrl.apiUrl}/admin/kelas`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status == 200 || response.status == 201) {
          setdatakelas(response.data);
        }
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        setToastMessage("Gagal mengambil data");
        setToastVariant("error");
      } finally {
        setIsLoading(false);
      }
    };

    // Tampilkan toast bila tambah atau update berhasil
    const invalidStatus = localStorage.getItem("kelasInvalid");
    const addedStatus = localStorage.getItem("kelasAdded");
    const updateStatus = localStorage.getItem("kelasUpdate");

    if (invalidStatus === "error") {
      setToastMessage("Kelas tidak ditemukan");
      setToastVariant("error");
      localStorage.removeItem("adminInvalid");
    }

    if (addedStatus === "success") {
      setToastMessage("Kelas berhasil ditambahkan");
      setToastVariant("success");
      localStorage.removeItem("kelasAdded");
    }

    if (updateStatus === "success") {
      setToastMessage("Kelas berhasil diupdate");
      setToastVariant("success");
      localStorage.removeItem("kelasUpdate");
    }

    fetchData();
  }, [token]);

  const handleDeleteKelas = async (e) => {
    e.preventDefault();

    if (!selectedKelas) return;

    setIsLoading(true); // Set loading state

    try {
      await axios.delete(
        `${baseUrl.apiUrl}/admin/kelas/${selectedKelas.kelas_id}`,
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
        setToastMessage("Data Kelas berhasil dihapus");
        setToastVariant("success");
        // Hapus data dari state tanpa perlu fetch ulang
        setdatakelas((prevData) =>
          prevData.filter((item) => item.kelas_id !== selectedKelas.kelas_id)
        );
        document.getElementById("my_modal_3").close();
      }, 1000);
    } catch (error) {
      console.error("Gagal menghapus data:", error);
      setIsLoading(false); // Reset loading state
      setToastMessage("Gagal menghapus data");
      setToastVariant("error");
      document.getElementById("my_modal_3").close();
    }
  };

  return {
    isLoading,
    toastMessage,
    toastVariant,
    selectedKelas,
    setSelectedKelas,
    dataKelas,
    searchQuery,
    setSearchQuery,
    currentData,
    currentPage,
    setCurrentPage,
    totalPages,
    handleDeleteKelas,
    indexOfFirstData,
    indexOfLastData,
  };
};
