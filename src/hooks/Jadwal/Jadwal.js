import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import baseUrl from "../../utils/config/baseUrl";

export const useJadwal = () => {
  const { kelas_id } = useParams();
  const [dataJadwal, setDataJadwal] = useState([]);
  const [dataLain, setDataLain] = useState({});
  const [jadwalSiapTampil, setJadwalSiapTampil] = useState([]);
  const [selectedJadwal, setSelectedJadwal] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const token = sessionStorage.getItem("session");

  // get data berdasarkan kelas
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${baseUrl.apiUrl}/admin/jadwal/${kelas_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        const rawJadwal = response.data.jadwal;

        // Urutan hari yang diinginkan
        const hariUrutan = ["senin", "selasa", "rabu", "kamis", "jumat"];
        const groupedByHari = {};

        rawJadwal.forEach((item) => {
          if (!item || !item.hari || !item.nama_mapel) return;

          const hari = item.hari.toLowerCase(); // pastikan lowercase
          if (!groupedByHari[hari]) {
            groupedByHari[hari] = [];
          }

          groupedByHari[hari].push({
            jadwal_id: item.jadwal_id,
            sesi: item.jam_ke,
            jam: `${item.start_time} - ${item.finish_time}`,
            ruangan: item.ruangan,
            pengajar: item.guru_pengampu,
            nama_mapel: item.nama_mapel,
            mapel_id: item.mapel_id,
          });
        });

        // Konversi ke array terurut berdasarkan urutan hari
        const jadwalArray = hariUrutan
          .filter((hari) => groupedByHari[hari])
          .map((hari) => ({
            hari: hari,
            sesiList: groupedByHari[hari].sort(
              (a, b) => Number(a.sesi) - Number(b.sesi)
            ),
          }));

        setJadwalSiapTampil(jadwalArray);
        setDataJadwal(rawJadwal);
        setDataLain(response.data);
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
    // Toast sukses/error
    const invalidStatus = localStorage.getItem("jadwalInvalid");
    const addedStatus = localStorage.getItem("jadwalAdded");
    const updateStatus = localStorage.getItem("jadwalUpdate");

    if (invalidStatus === "error") {
      setToastMessage("Jadwal tidak ditemukan");
      setToastVariant("error");
      localStorage.removeItem("jadwalInvalid");
    }

    if (addedStatus === "success") {
      setToastMessage("Jadwal berhasil ditambahkan");
      setToastVariant("success");
      localStorage.removeItem("jadwalAdded");
    }

    if (updateStatus === "success") {
      setToastMessage("Jadwal berhasil diupdate");
      setToastVariant("success");
      localStorage.removeItem("jadwalUpdate");
    }

    fetchData();
  }, [kelas_id]);

  const handleDelete = async (e) => {
    e.preventDefault();

    if (!selectedJadwal?.jadwal_id) return;

    try {
      setIsLoading(true);

      await axios.delete(
        `${baseUrl.apiUrl}/admin/jadwal/${selectedJadwal.jadwal_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Reset toast
      setToastMessage("");
      setToastVariant("");

      setTimeout(() => {
        setIsLoading(false);
        setToastMessage("Jadwal berhasil dihapus");
        setToastVariant("success");
        fetchData(); // Refresh data
        document.getElementById("my_modal_3").close(); // Tutup modal
      }, 1000);
    } catch (error) {
      console.error(error);
      setToastMessage("Gagal menghapus jadwal");
      setToastVariant("error");
      setIsLoading(false);
    }
  };

  return {
    toastMessage,
    toastVariant,
    isLoading,
    kelas_id,
    dataJadwal,
    selectedJadwal,
    setSelectedJadwal,
    dataLain,
    jadwalSiapTampil,
    handleDelete,
  };
};
