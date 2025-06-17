import axios from "axios";
import baseUrl from "../../utils/config/baseUrl";
import { useEffect, useState, useMemo } from "react";

export const useKurikulum = () => {
  // simpan data
  const [selectedKurikulum, setSelectedKurikulum] = useState(null);
  const [dataKurikulum, setdataKurikulum] = useState([]);
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

  // fetch data
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${baseUrl.apiUrl}/admin/kurikulum`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setdataKurikulum(response.data);
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
    const invalidStatus = localStorage.getItem("kurikulumInvalid");
    const addedStatus = localStorage.getItem("kurikulumAdded");
    const updateStatus = localStorage.getItem("kurikulumUpdate");

    if (invalidStatus === "error") {
      setToastMessage("Data Kurikulum Tidak ditemukan");
      setToastVariant("error");
      localStorage.removeItem("kurikulumInvalid");
    }

    if (addedStatus === "success") {
      setToastMessage("Data Kurikulum berhasil ditambahkan");
      setToastVariant("success");
      localStorage.removeItem("kurikulumAdded");
    }

    if (updateStatus === "success") {
      setToastMessage("Data Kurikulum berhasil diupdate");
      setToastVariant("success");
      localStorage.removeItem("kurikulumUpdate");
    }

    fetchData();
  }, [token]);

  // Pagination filter
  const filteredData = useMemo(() => {
    return dataKurikulum
      .filter((item) =>
        item.nama_kurikulum.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [dataKurikulum, searchQuery]);

  // total pages
  const totalPages = Math.ceil(filteredData.length / dataPerPage);

  // Replace pagination effect jadi:
  useEffect(() => {
    setCurrentData(filteredData.slice(indexOfFirstData, indexOfLastData));
  }, [filteredData, currentPage]);

  const handleDeleteKurikulum = async (e) => {
    e.preventDefault();
    if (!selectedKurikulum) return;

    setIsLoading(true);

    try {
      await axios.delete(
        `${baseUrl.apiUrl}/admin/kurikulum/${selectedKurikulum.kurikulum_id}`,
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
        setToastMessage("Kurikulum berhasil dihapus");
        setToastVariant("success");
        // Hapus data dari state tanpa perlu fetch ulang
        setdataKurikulum((prevData) =>
          prevData.filter(
            (item) => item.kurikulum_id !== selectedKurikulum.kurikulum_id
          )
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
    selectedKurikulum,
    setSelectedKurikulum,
    dataKurikulum,
    currentData,
    isLoading,
    toastMessage,
    toastVariant,
    setSearchQuery,
    searchQuery,
    currentPage,
    setCurrentPage,
    indexOfFirstData,
    indexOfLastData,
    totalPages,
    handleDeleteKurikulum,
  };
};
