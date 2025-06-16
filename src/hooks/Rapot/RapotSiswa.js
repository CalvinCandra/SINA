import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import baseUrl from "../../utils/config/baseUrl";

export const useRapotSiswa = () => {
  const { kelas_id } = useParams();
  const [dataKelas, setdataKelas] = useState([]);
  const [dataSiswa, setdataSiswa] = useState([]);
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

  const fecthData = async () => {
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

      if (response.status == 200 || response.status == 201) {
        setdataKelas(response.data.kelas_info);
        setdataSiswa(response.data.siswa);
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
    fecthData();
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

  return {
    dataKelas,
    dataSiswa,
    currentData,
    isLoading,
    toastMessage,
    toastVariant,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    totalPages,
    indexOfLastData,
    indexOfFirstData,
  };
};
