import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import baseUrl from "../../utils/config/baseUrl";

export const useSiswa = () => {
  const { kelas_id } = useParams();
  const [dataSiswa, setdataSiswa] = useState([]);
  const [dataKelas, setdataKelas] = useState([]);
  const [selectedSiswa, setSelectedSiswa] = useState(null);
  const [currentData, setCurrentData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  const dataPerPage = 10;
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const totalPages = Math.ceil(currentData.length / dataPerPage);

  const token = sessionStorage.getItem("session");

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

  useEffect(() => {
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

  // Pagination and Serach
  useEffect(() => {
    const filtered = dataSiswa
      .filter(
        (item) =>
          item.nama_siswa.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.nis.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.nisn.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    setCurrentData(filtered.slice(indexOfFirstData, indexOfLastData));
  }, [dataSiswa, searchQuery, currentPage]);

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

      // Hapus data dari state tanpa perlu fetch ulang
      setdataSiswa((prevData) =>
        prevData.filter((item) => item.nis !== selectedSiswa.nis)
      );

      // Simulasi delay untuk loading
      setTimeout(() => {
        setIsLoading(false); // Reset loading state
        setToastMessage("Siswa berhasil dihapus");
        setToastVariant("success");
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
    dataKelas,
    dataSiswa,
    selectedSiswa,
    setSelectedSiswa,
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
    handleDeleteSiswa,
  };
};
