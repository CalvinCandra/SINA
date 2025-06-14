import { useEffect, useState } from "react";
import baseUrl from "../../utils/config/baseUrl";
import axios from "axios";

export const useGuru = () => {
  // state
  const [isLoading, setIsLoading] = useState(false);
  const [dataGuru, setdataGuru] = useState([]);
  const [selectedGuru, setSelectedGuru] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 10;
  const token = sessionStorage.getItem("session");

  // Filter data berdasarkan search query
  const filteredData = dataGuru.filter((guru) => {
    const query = searchQuery.toLowerCase();
    return (
      guru.nama_guru?.toLowerCase().includes(query) ||
      guru.email?.toLowerCase().includes(query) ||
      guru.nip?.toLowerCase().includes(query)
    );
  });

  // Pagination logic
  const sortedData = filteredData.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = sortedData.slice(indexOfFirstData, indexOfLastData);
  const totalPages = Math.ceil(filteredData.length / dataPerPage);

  useEffect(() => {
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
    isLoading,
    toastMessage,
    toastVariant,
    indexOfFirstData,
    indexOfLastData,
    currentData,
    currentPage,
    dataGuru,
    searchQuery,
    totalPages,
    handleDeleteGuru,
    setCurrentPage,
    setSelectedGuru,
    selectedGuru,
    setSearchQuery,
  };
};
