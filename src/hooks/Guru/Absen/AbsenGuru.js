import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import baseUrl from "../../../utils/config/baseUrl";
import ImageImport from "../../../data/ImageImport";
import { formatTahun } from "../../../utils/helper/dateFormat";

export const useAbsenGuru = () => {
  const defaultImage = ImageImport.defaultGambar;
  const [dataGuru, setdataGuru] = useState([]);
  const [dataTahun, setdataTahun] = useState([]);
  const [TahunAkademik, setTahunAkademik] = useState("");
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

  // Fetch Data Tahun Akademik
  const fetchDataTahun = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${baseUrl.apiUrl}/admin/tahunakademik/aktif`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setdataTahun(response.data);
        // Set default academic year based on current date and status
        setDefaultTahunAkademik(response.data);
      }
    } catch (error) {
      console.error(error);
      setToastMessage("Gagal Ambil Data Tahun Akademik");
      setToastVariant("error");
    } finally {
      setIsLoading(false);
    }
  };

  // Set default tahun akdemik sesuai bulan sekarang
  const setDefaultTahunAkademik = (tahunData) => {
    const now = new Date();
    let selectedTahun = null;

    // 1. cari tahun berdasarkan bulan sekarang
    selectedTahun = tahunData.find((tahun) => {
      const startDate = new Date(tahun.tahun_mulai);
      const endDate = new Date(tahun.tahun_berakhir);
      return tahun.status === "aktif" && now >= startDate && now <= endDate;
    });

    // 2. If not found, find any active year (latest first)
    if (!selectedTahun) {
      const activeYears = tahunData
        .filter((t) => t.status === "aktif")
        .sort((a, b) => new Date(b.tahun_mulai) - new Date(a.tahun_mulai));
      selectedTahun = activeYears[0];
    }

    // 3. If still not found, find any year that includes current month
    if (!selectedTahun) {
      selectedTahun = tahunData.find((tahun) => {
        const startDate = new Date(tahun.tahun_mulai);
        const endDate = new Date(tahun.tahun_berakhir);
        return now >= startDate && now <= endDate;
      });
    }

    // 4. Fallback to latest year
    if (!selectedTahun) {
      selectedTahun = [...tahunData].sort(
        (a, b) => new Date(b.tahun_mulai) - new Date(a.tahun_mulai)
      )[0];
    }

    if (selectedTahun) {
      setTahunAkademik(selectedTahun.tahun_akademik_id);
    }
  };

  const fetchAbsenGuru = async () => {
    try {
      setIsLoading(true);

      // Ambil data guru terlebih dahulu
      const responseGuru = await axios.get(`${baseUrl.apiUrl}/admin/guru`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      let mergedData = responseGuru.data;

      // Jika ada TahunAkademik, ambil data absensi dan gabungkan
      if (TahunAkademik) {
        const responseAbsen = await axios.get(
          `${baseUrl.apiUrl}/admin/guru/rekap/${TahunAkademik}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const rekapList = responseAbsen.data;

        mergedData = mergedData.map((guru) => {
          const rekap = rekapList.find((r) => r.guru_nip === guru.nip);
          return {
            ...guru,
            hadir: rekap?.hadir?.toString() || "0",
            izin: rekap?.izin?.toString() || "0",
            sakit: rekap?.sakit?.toString() || "0",
            alpa: rekap?.alpa?.toString() || "0",
          };
        });
      } else {
        // Jika tidak ada TahunAkademik, set default nilai absensi
        mergedData = mergedData.map((guru) => ({
          ...guru,
          hadir: "0",
          izin: "0",
          sakit: "0",
          alpa: "0",
        }));
      }

      setdataGuru(mergedData);
    } catch (error) {
      console.error(error);
      setToastMessage("Gagal Ambil Data Guru");
      setToastVariant("error");
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize data
  useEffect(() => {
    fetchDataTahun();
  }, [token]);

  // Fetch attendance when academic year changes
  useEffect(() => {
    fetchAbsenGuru();
  }, [TahunAkademik]);

  // Format academic year options for dropdown
  const TahunOption = useMemo(() => {
    // Group by tahun_akademik_id
    const grouped = dataTahun.reduce((acc, item) => {
      if (!acc[item.tahun_akademik_id]) {
        acc[item.tahun_akademik_id] = {
          tahun_akademik_id: item.tahun_akademik_id,
          tahun_mulai: item.tahun_mulai,
          tahun_berakhir: item.tahun_berakhir,
          kurikulum: [], // Untuk menyimpan semua kurikulum
        };
      }
      acc[item.tahun_akademik_id].kurikulum.push(item.nama_kurikulum);
      return acc;
    }, {});

    // Buat options unik
    return Object.values(grouped).map((item) => ({
      value: item.tahun_akademik_id,
      label: `${formatTahun(item.tahun_mulai)} - ${formatTahun(
        item.tahun_berakhir
      )}`,
    }));
  }, [dataTahun]);

  // Filter and paginate teacher data
  const filteredData = useMemo(() => {
    return dataGuru
      .filter(
        (item) =>
          item.nama_guru?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.nip?.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [dataGuru, searchQuery]);

  const totalPages = Math.ceil(filteredData.length / dataPerPage);

  useEffect(() => {
    setCurrentData(filteredData.slice(indexOfFirstData, indexOfLastData));
  }, [filteredData, currentPage]);

  return {
    defaultImage,
    dataGuru,
    TahunOption,
    TahunAkademik,
    setTahunAkademik,
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
  };
};
