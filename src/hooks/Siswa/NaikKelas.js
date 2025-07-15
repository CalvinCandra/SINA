// Hooks (useNaikKelas.js)
import axios from "axios";
import { useEffect, useState } from "react";
import baseUrl from "../../utils/config/baseUrl";
import { useNavigate } from "react-router-dom";
import { formatTahun } from "../../utils/helper/dateFormat";

export const useNaikKelas = () => {
  const navigate = useNavigate();
  const [dataSiswa, setDataSiswa] = useState([]);
  const [selectedSiswa, setSelectedSiswa] = useState([]);
  const [dataKelasAktif, setDataKelasAktif] = useState([]);
  const [dataKelasNon, setDataKelasNon] = useState([]);
  const [selectedKelasNon, setSelectedKelasNon] = useState("");
  const [selectedKelas, setSelectedKelas] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  const token = sessionStorage.getItem("session");

  const fetchKelasNonAktif = async () => {
    try {
      const response = await axios.get(`${baseUrl.apiUrl}/admin/kelas-mati`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        const sorted = response.data.data_kelas.sort((a, b) => {
          if (a.tingkat !== b.tingkat) {
            return a.tingkat.localeCompare(b.tingkat);
          }
          return a.nama_kelas.localeCompare(b.nama_kelas);
        });
        setDataKelasNon(sorted);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchKelasAktif = async () => {
    try {
      const response = await axios.get(`${baseUrl.apiUrl}/admin/kelas/aktif`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        const sortedData = response.data.sort((a, b) => {
          if (a.tingkat !== b.tingkat) {
            return a.tingkat.localeCompare(b.tingkat);
          }
          return a.nama_kelas.localeCompare(b.nama_kelas);
        });
        setDataKelasAktif(sortedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSiswaKelas = async (kelasId) => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${baseUrl.apiUrl}/admin/siswa_kelas/${kelasId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 200) {
        setDataSiswa(res.data.siswa);
        setSelectedSiswa(res.data.siswa.map((s) => s.nis));
      }
    } catch (err) {
      console.error(err);
      setToastMessage("Gagal mengambil data siswa");
      setToastVariant("error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchKelasNonAktif();
      fetchKelasAktif();
    }
  }, [token]);

  useEffect(() => {
    if (selectedKelasNon) {
      fetchSiswaKelas(selectedKelasNon);
    }
  }, [selectedKelasNon]);

  const KelasOptions = dataKelasAktif.map((item) => ({
    value: item.kelas_id,
    label: `${item.nama_kelas} Tingkat ${
      item.tingkat
    } Tahun Akademik ${formatTahun(item.tahun_mulai)} - ${formatTahun(
      item.tahun_berakhir
    )}`,
  }));

  const KelasNonAktifOptions = dataKelasNon.map((item) => ({
    value: item.kelas_id,
    label: `${item.nama_kelas} Tingkat ${
      item.tingkat
    } Tahun Akademik ${formatTahun(item.tahun_mulai)} - ${formatTahun(
      item.tahun_berakhir
    )}`,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedKelas) {
      setToastMessage("Pilih kelas tujuan terlebih dahulu");
      setToastVariant("error");
      return;
    }

    if (selectedSiswa.length === 0) {
      setToastMessage("Pilih minimal satu siswa");
      setToastVariant("error");
      return;
    }

    setToastMessage("");
    setToastVariant("");

    const siswaList = selectedSiswa.map((nis) => ({ nis }));

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${baseUrl.apiUrl}/admin/naik-kelas/${selectedKelasNon}`,
        {
          kelas_id_baru: selectedKelas,
          siswa_list: siswaList,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status == 200) {
        setTimeout(() => {
          localStorage.setItem("siswaNaik", "success");
          setIsLoading(false);
          navigate(`/dashboard/siswa`);
        }, 1500);
      }
    } catch (error) {
      console.error("Error:", error);
      let errorMessage = "Gagal menaikkan kelas";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else {
        errorMessage = error.message;
      }

      setIsLoading(false);
      setToastMessage(errorMessage);
      setToastVariant("error");
    }
  };

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedSiswa(dataSiswa.map((siswa) => siswa.nis));
    } else {
      setSelectedSiswa([]);
    }
  };

  return {
    dataSiswa,
    selectedSiswa,
    setSelectedSiswa,
    selectedKelas,
    setSelectedKelas,
    selectedKelasNon,
    setSelectedKelasNon,
    KelasNonAktifOptions,
    KelasOptions,
    isLoading,
    toastMessage,
    toastVariant,
    handleSubmit,
    toggleSelectAll,
    isAllSelected:
      selectedSiswa.length === dataSiswa.length && dataSiswa.length > 0,
  };
};
