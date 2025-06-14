import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import baseUrl from "../../utils/config/baseUrl";

export const useRapotSiswa = () => {
  const { kelas_id } = useParams();
  const [dataKelas, setdataKelas] = useState([]);
  const [dataSiswa, setdataSiswa] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 10;
  const token = sessionStorage.getItem("session");

  useEffect(() => {
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

    fecthData();
  }, [kelas_id]);

  // filter
  const filteredData = dataSiswa.filter((siswa) => {
    const query = searchQuery.toLowerCase();
    return (
      siswa.nama_siswa?.toLowerCase().includes(query) ||
      siswa.nim?.toLowerCase().includes(query) ||
      siswa.nisn?.toLowerCase().includes(query)
    );
  });

  // Pagination
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = filteredData
    .sort((a, b) => b.id - a.id)
    .slice(indexOfFirstData, indexOfLastData);
  const totalPages = Math.ceil(filteredData.length / dataPerPage);

  return {
    dataKelas,
    dataSiswa,
    indexOfLastData,
    indexOfFirstData,
    currentData,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    totalPages,
    toastMessage,
    toastVariant,
    isLoading,
  };
};
