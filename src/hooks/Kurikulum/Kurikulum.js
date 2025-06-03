import axios from "axios";
import baseUrl from "../../utils/config/baseUrl";
import { useEffect, useState } from "react";

export const useKurikulum = () => {
  // simpan data
  const [selectedKurikulum, setSelectedKurikulum] = useState(null);
  const [dataKurikulum, setdataKurikulum] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;
  // get token
  const token = sessionStorage.getItem("session");

  // Filter data berdasarkan search query
  const filteredData = dataKurikulum.filter((kurikulum) => {
    const query = searchQuery.toLowerCase();
    return kurikulum.nama_kurikulum?.toLowerCase().includes(query);
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
        const response = await axios.get(`${baseUrl.apiUrl}/admin/kurikulum`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setdataKurikulum(response.data);
          // console.log(response);
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
    const invalidStatus = localStorage.getItem("kurikulumInvalid");
    const addedStatus = localStorage.getItem("kurikulumAdded");
    const updateStatus = localStorage.getItem("kurikulumUpdate");
    const deleteStatus = localStorage.getItem("kurikulumDelete");

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

    if (deleteStatus === "success") {
      setToastMessage("Data Kurikulum berhasil dihapus");
      setToastVariant("success");
      localStorage.removeItem("kurikulumDelete");
    }

    fetchData();
  }, []);

  const handleDeleteKurikulum = async (e) => {
    e.preventDefault();
    if (!selectedKurikulum) return;

    setIsLoading(true); // Set loading state

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
    isLoading,
    toastMessage,
    toastVariant,
    indexOfFirstData,
    indexOfLastData,
    dataKurikulum,
    selectedKurikulum,
    setSelectedKurikulum,
    totalPages,
    currentData,
    currentPage,
    handleDeleteKurikulum,
    setCurrentPage,
    setSearchQuery,
    searchQuery,
  };
};
