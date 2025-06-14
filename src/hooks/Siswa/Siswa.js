import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import baseUrl from "../../utils/config/baseUrl";

export const useSiswa = () => {
  const { kelas_id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [dataSiswa, setdataSiswa] = useState([]);
  const [dataKelas, setdataKelas] = useState([]);
  const [selectedSiswa, setSelectedSiswa] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const dataPerPage = 5;
  const token = sessionStorage.getItem("session");

  // Filter data berdasarkan search query
  const filteredData = dataSiswa.filter((siswa) => {
    const query = searchQuery.toLowerCase();
    return (
      siswa.nama_siswa?.toLowerCase().includes(query) ||
      siswa.nis?.toLowerCase().includes(query) ||
      siswa.nisn?.toLowerCase().includes(query)
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
        const response = await axios.get(
          `${baseUrl.apiUrl}/admin/siswa_kelas/${kelas_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status == 200) {
          setdataSiswa(response.data.siswa);
          setdataKelas(response.data.kelas_info);
        }
      } catch (error) {
        console.log(error);
        setToastMessage("Gagal ambil data");
        setToastVariant("error");
      } finally {
        setIsLoading(false);
      }
    };

    // Tampilkan toast bila tambah atau update berhasil
    const invalidStatus = localStorage.getItem("siswaInvalid");
    const addedStatus = localStorage.getItem("siswaAdded");
    const updateStatus = localStorage.getItem("siswaUpdate");

    if (invalidStatus === "error") {
      setToastMessage("Siswa Tidak ditemukan");
      setToastVariant("error");
      localStorage.removeItem("siswaInvalid");
    }

    if (addedStatus === "success") {
      setToastMessage("Siswa berhasil ditambahkan");
      setToastVariant("success");
      localStorage.removeItem("siswaAdded");
    }

    if (updateStatus === "success") {
      setToastMessage("Siswa berhasil diupdate");
      setToastVariant("success");
      localStorage.removeItem("siswaUpdate");
    }

    fetchData();
  }, [kelas_id]);

  const handleDeleteSiswa = async (e) => {
    e.preventDefault();

    if (!selectedSiswa) return;

    setIsLoading(true);

    try {
      await axios.delete(`${baseUrl.apiUrl}/admin/siswa/${selectedSiswa.nis}`, {
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
        setToastMessage("Siswa berhasil dihapus");
        setToastVariant("success");
        // Hapus data dari state tanpa perlu fetch ulang
        setdataSiswa((prevData) =>
          prevData.filter((item) => item.nis !== selectedSiswa.nis)
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
    dataKelas,
    indexOfFirstData,
    indexOfLastData,
    currentData,
    currentPage,
    searchQuery,
    setSearchQuery,
    selectedSiswa,
    setSelectedSiswa,
    totalPages,
    handleDeleteSiswa,
    dataSiswa,
    setCurrentPage,
  };
};
