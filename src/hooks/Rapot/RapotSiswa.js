import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import baseUrl from "../../utils/config/baseUrl";
import ImageImport from "../../data/ImageImport";

export const useRapotSiswa = () => {
  const defaultImage = ImageImport.defaultGambar;
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
  }, [token, kelas_id]);

  // Pagination filter
  const filteredData = useMemo(() => {
    return dataSiswa
      .filter(
        (item) =>
          item.nama_siswa.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.nis.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.nisn.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [dataSiswa, searchQuery]);

  // total pages
  const totalPages = Math.ceil(filteredData.length / dataPerPage);

  // Replace pagination effect jadi:
  useEffect(() => {
    setCurrentData(filteredData.slice(indexOfFirstData, indexOfLastData));
  }, [filteredData, currentPage]);

  // Handler function
  const handleRapot = async (e, nis) => {
    e.preventDefault();
    if (!nis) return;

    try {
      setIsLoading(true);

      const response = await axios.get(
        `${baseUrl.apiUrl}/admin/siswa/rapor/${nis}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200 || response.status === 201) {
        // Buka di tab baru
        window.open(response.data.rapor_url, "_blank");
      }
    } catch (error) {
      if (error.response?.status === 404) {
        document.getElementById("my_modal_3").showModal();
      } else {
        setToastMessage("Gagal Mengambil Rapot");
        setToastVariant("error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    defaultImage,
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
    handleRapot,
  };
};
