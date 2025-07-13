import axios from "axios";
import baseUrl from "../../utils/config/baseUrl";
import { useEffect, useMemo, useState } from "react";

export const useUnlockAkun = () => {
  const [dataAkun, setDataAkun] = useState([]);
  const [selectedAkun, setSelectedAkun] = useState(null);
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

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${baseUrl.apiUrl}/admin/akun-terkunci`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setDataAkun(response.data.data);
      }
    } catch (error) {
      console.log(error);
      setToastMessage("Gagal Ambil Data");
      setToastVariant("error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Tampilkan toast bila tambah atau update berhasil
    const invalidStatus = localStorage.getItem("AkunInvalid");

    if (invalidStatus === "error") {
      setToastMessage("Informasi Akun user tidak ditemukan");
      setToastVariant("error");
      localStorage.removeItem("AkunInvalid");
    }

    fetchData();
  }, [token]);

  // Pagination filter
  const filteredData = useMemo(() => {
    return dataAkun
      .filter(
        (item) =>
          item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => new Date(b.last_failed_at) - new Date(a.last_failed_at));
  }, [dataAkun, searchQuery]);

  // total pages
  const totalPages = Math.ceil(filteredData.length / dataPerPage);

  // Replace pagination effect jadi:
  useEffect(() => {
    setCurrentData(filteredData.slice(indexOfFirstData, indexOfLastData));
  }, [filteredData, currentPage]);

  const handleOpenAkun = async (e) => {
    e.preventDefault();
    if (!selectedAkun) return;

    setIsLoading(true); // Set loading state

    try {
      await axios.put(
        `${baseUrl.apiUrl}/admin/buka-akun`,
        {
          user_id: selectedAkun.user_id,
        },
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
        setToastMessage("Akun berhasil Dibuka");
        setToastVariant("success");
        // Hapus data dari state tanpa perlu fetch ulang
        setDataAkun((prevData) =>
          prevData.filter((item) => item.user_id !== selectedAkun.user_id)
        );
        document.getElementById("my_modal_3").close();
      }, 1000);
    } catch (error) {
      console.error(error);
      setToastMessage("Gagal membuka Akun");
      setToastVariant("error");
      document.getElementById("my_modal_3").close();
    }
  };

  return {
    dataAkun,
    selectedAkun,
    setSelectedAkun,
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
    handleOpenAkun,
  };
};
