import { useEffect, useState, useMemo } from "react";
import baseUrl from "../../utils/config/baseUrl";
import axios from "axios";

export const useGuru = () => {
  // state
  const [dataGuru, setdataGuru] = useState([]);
  const [selectedGuru, setSelectedGuru] = useState(null);
  const [currentData, setCurrentData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  const dataPerPage = 10;
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;

  const token = sessionStorage.getItem("session");

  // get data guru
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${baseUrl.apiUrl}/admin/guru`, {
        headers: {
          Authorization: `Beazer ${token}`,
        },
      });

      if (response.status == 200 || response.status == 201) {
        setdataGuru(response.data);
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
    const invalidStatus = localStorage.getItem("guruInvalid");
    const addedStatus = localStorage.getItem("guruAdded");
    const updateStatus = localStorage.getItem("guruUpdate");

    if (invalidStatus === "error") {
      setToastMessage("Guru Tidak ditemukan");
      setToastVariant("error");
      localStorage.removeItem("guruInvalid");
    }

    if (addedStatus === "success") {
      setToastMessage("Guru berhasil ditambahkan");
      setToastVariant("success");
      localStorage.removeItem("guruAdded");
    }

    if (updateStatus === "success") {
      setToastMessage("Guru berhasil diupdate");
      setToastVariant("success");
      localStorage.removeItem("guruUpdate");
    }

    fetchData();
  }, [token]);

  // Pagination filter
  const filteredData = useMemo(() => {
    return dataGuru
      .filter(
        (item) =>
          item.nama_guru.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.nip.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [dataGuru, searchQuery]);

  // total pages
  const totalPages = Math.ceil(filteredData.length / dataPerPage);

  // Replace pagination effect jadi:
  useEffect(() => {
    setCurrentData(filteredData.slice(indexOfFirstData, indexOfLastData));
  }, [filteredData, currentPage]);

  const handleDeleteGuru = async (e) => {
    e.preventDefault();

    if (!selectedGuru) return;

    setIsLoading(true); // Set loading state

    try {
      await axios.delete(`${baseUrl.apiUrl}/admin/guru/${selectedGuru.nip}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // reset
      setToastMessage("");
      setToastVariant("");

      // Simulasi delay untuk loading
      setTimeout(() => {
        setIsLoading(false); // Reset loading state
        setToastMessage("Data Guru berhasil dihapus");
        setToastVariant("success");
        // Hapus data dari state tanpa perlu fetch ulang
        setdataGuru((prevData) =>
          prevData.filter((item) => item.nip !== selectedGuru.nip)
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
    dataGuru,
    selectedGuru,
    setSelectedGuru,
    currentData,
    isLoading,
    toastMessage,
    toastVariant,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    indexOfFirstData,
    indexOfLastData,
    totalPages,
    handleDeleteGuru,
  };
};
