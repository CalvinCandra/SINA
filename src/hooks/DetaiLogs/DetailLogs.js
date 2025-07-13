import axios from "axios";
import baseUrl from "../../utils/config/baseUrl";
import { useState } from "react";

export const useDetailLogs = () => {
  // state
  const [dataLogs, setDataLogs] = useState([]);
  const [tanggalAwal, setTanggalAwaL] = useState("");
  const [tanggalAkhir, setTanggalAkhir] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  const token = sessionStorage.getItem("session");

  const handleLogs = async (e) => {
    e.preventDefault();

    const [tglAwal, waktuAwal] = tanggalAwal.split("T");
    const [tglAkhir, waktuAkhir] = tanggalAkhir.split("T");

    try {
      setIsLoading(true);

      // reset pesan toast terlebih dahulu
      setToastMessage("");
      setToastVariant("");

      // validasi
      if (tanggalAwal.trim() == "") {
        setTimeout(() => {
          setToastMessage("Tanggal Awal Mohon Diisi");
          setToastVariant("error");
        }, 10);
        return;
      }

      // validasi
      if (tanggalAkhir.trim() == "") {
        setTimeout(() => {
          setToastMessage("Tanggal Akhhir Mohon Diisi");
          setToastVariant("error");
        }, 10);
        return;
      }

      const response = await axios.post(
        `${baseUrl.apiUrl}/logs/filter`,
        {
          startDate: tglAwal,
          startTime: waktuAwal,
          endDate: tglAkhir,
          endTime: waktuAkhir,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status == 200) {
        setDataLogs(response.data.logs);
      }
    } catch (error) {
      console.log(error);
      setToastMessage("Gagal Ambil Info Logs");
      setToastVariant("error");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    dataLogs,
    tanggalAwal,
    setTanggalAwaL,
    tanggalAkhir,
    setTanggalAkhir,
    isLoading,
    toastMessage,
    toastVariant,
    handleLogs,
  };
};
