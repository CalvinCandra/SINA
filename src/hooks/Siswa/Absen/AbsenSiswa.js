import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import baseUrl from "../../../utils/config/baseUrl";
import ImageImport from "../../../data/ImageImport";

export const useAbsenSiswa = () => {
  const { kelas_id } = useParams();
  const defaultImage = ImageImport.defaultGambar;
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

  const token = sessionStorage.getItem("session");

  const fetchData = async () => {
    try {
      setIsLoading(true);

      const [response, responseAbsen] = await Promise.all([
        axios.get(`${baseUrl.apiUrl}/admin/siswa_kelas/${kelas_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${baseUrl.apiUrl}/admin/siswa/rekap/${kelas_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (response.status === 200 && responseAbsen.status === 200) {
        const siswaList = response.data.siswa;
        const rekapList = responseAbsen.data;

        // Gabungkan data absensi ke dalam siswaList
        const mergedData = siswaList.map((siswa) => {
          const rekap = rekapList.find((r) => r.nis === siswa.nis);
          return {
            ...siswa,
            hadir: rekap?.hadir || "0",
            izin: rekap?.izin || "0",
            sakit: rekap?.sakit || "0",
            alpa: rekap?.alpa || "0",
          };
        });

        setdataSiswa(mergedData);
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
    fetchData();
  }, [kelas_id, token]);

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

  return {
    defaultImage,
    dataKelas,
    dataSiswa,
    currentData,
    isLoading,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    totalPages,
    indexOfFirstData,
    indexOfLastData,
  };
};
