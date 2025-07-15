import axios from "axios";
import baseUrl from "../../utils/config/baseUrl";
import { useEffect, useState } from "react";

export const useTahunAkademik = () => {
  // simpan data
  const [selectedTahun, setSelectedTahun] = useState(null);
  const [dataTahun, setdataTahun] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 10;
  const token = sessionStorage.getItem("session");

  // Filter data berdasarkan search query
  const filteredData = dataTahun.filter((tahun) => {
    const query = searchQuery.toLowerCase();
    return (
      tahun.nama_kurikulum?.toLowerCase().includes(query) ||
      tahun.tahun_mulai?.toLowerCase().includes(query) ||
      tahun.tahun_berakhir?.toLowerCase().includes(query) ||
      tahun.status?.toLowerCase().includes(query)
    );
  });

  // Pagination
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = filteredData
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(indexOfFirstData, indexOfLastData);
  const totalPages = Math.ceil(filteredData.length / dataPerPage);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${baseUrl.apiUrl}/admin/tahunakademik`,
        {
          headers: {
            Authorization: `Beazer ${token}`,
          },
        }
      );

      if (response.status == 200 || response.status == 201) {
        setdataTahun(response.data);
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
    const invalidStatus = localStorage.getItem("tahunInvalid");
    const addedStatus = localStorage.getItem("tahunAdded");
    const updateStatus = localStorage.getItem("tahunUpdate");

    if (invalidStatus === "error") {
      setToastMessage("Tahun Akdemik Tidak ditemukan");
      setToastVariant("error");
      localStorage.removeItem("tahunInvalid");
    }

    if (addedStatus === "success") {
      setToastMessage("Tahun Akademik berhasil ditambahkan");
      setToastVariant("success");
      localStorage.removeItem("tahunAdded");
    }

    if (updateStatus === "success") {
      setToastMessage("Tahun Akdemik berhasil diupdate");
      setToastVariant("success");
      localStorage.removeItem("tahunUpdate");
    }

    fetchData();
  }, [token]);

  // Hapus
  const handleDeleteTahun = async (e) => {
    e.preventDefault();

    if (!selectedTahun) return;

    setIsLoading(true); // Set loading state

    try {
      await axios.delete(
        `${baseUrl.apiUrl}/admin/tahunakademik/${selectedTahun.tahun_akademik_id}/${selectedTahun.kurikulum_id}`,
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
        setToastMessage("Data Tahun Akademik berhasil dihapus");
        setToastVariant("success");
        // Hapus data dari state tanpa perlu fetch ulang
        setdataTahun((prevData) =>
          prevData.filter(
            (item) =>
              !(
                item.tahun_akademik_id === selectedTahun.tahun_akademik_id &&
                item.kurikulum_id === selectedTahun.kurikulum_id
              )
          )
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
    selectedTahun,
    setSelectedTahun,
    dataTahun,
    isLoading,
    toastMessage,
    toastVariant,
    searchQuery,
    setSearchQuery,
    setCurrentPage,
    indexOfLastData,
    indexOfFirstData,
    currentData,
    currentPage,
    totalPages,
    handleDeleteTahun,
  };
};
