import { useEffect, useState } from "react";
import { formatTahun } from "../../utils/helper/dateFormat";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../utils/config/baseUrl";

export const useTambahKelas = () => {
  const navigate = useNavigate();
  // option
  const [akademik, setAkademik] = useState([]);
  const [guru, setGuru] = useState([]);
  // for data
  const [jenjang, setJenjang] = useState("");
  const [tingkat, setTingkat] = useState("");
  const [walikelas, setWaliKelas] = useState("");
  const [namakelas, setNamaKelas] = useState("");
  const [tahun, setTahunAkademik] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const token = sessionStorage.getItem("session");

  const WaliKelasOption = guru.map((item) => ({
    value: item.nip,
    label: item.nama_guru,
  }));

  const TahunAkademik = akademik.map((item) => ({
    value: `${item.tahun_akademik_id} - ${item.kurikulum_id}`,
    label: `${item.nama_kurikulum} (${formatTahun(
      item.tahun_mulai
    )} - ${formatTahun(item.tahun_berakhir)})`,
  }));

  const jenjangOptions = [
    { value: "sd", label: "SD" },
    { value: "smp", label: "SMP" },
    { value: "sma", label: "SMA" },
  ];

  const tingkatOptionsMap = {
    sd: [
      { value: "I", label: "I" },
      { value: "II", label: "II" },
      { value: "III", label: "III" },
      { value: "IV", label: "IV" },
      { value: "V", label: "V" },
      { value: "VI", label: "VI" },
    ],
    smp: [
      { value: "VII", label: "VII" },
      { value: "VIII", label: "VIII" },
      { value: "IX", label: "IX" },
    ],
    sma: [
      { value: "X", label: "X" },
      { value: "XI", label: "XI" },
      { value: "XII", label: "XII" },
    ],
  };

  const fetchData = async () => {
    try {
      const responseGuru = await axios.get(`${baseUrl.apiUrl}/admin/guru`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseTahun = await axios.get(
        `${baseUrl.apiUrl}/admin/tahunakademik/aktif`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (responseGuru.status == 200) {
        setGuru(responseGuru.data);
      }

      if (responseTahun.status == 200) {
        setAkademik(responseTahun.data);
      }
    } catch (error) {
      console.error("Gagal mengambil data:", error);
      setToastMessage("Gagal Tambah Kelas");
      setToastVariant("error");
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // reset Toast
    setToastMessage("");
    setToastVariant("");

    // validasi
    if (namakelas.trim() === "") {
      setTimeout(() => {
        setToastMessage("Nama Kelas tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }
    if (jenjang.trim() === "") {
      setTimeout(() => {
        setToastMessage("Jenjang Pendidikan tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }
    if (tingkat.trim() === "") {
      setTimeout(() => {
        setToastMessage("Tingkat Kelas tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }
    if (walikelas.trim() === "") {
      setTimeout(() => {
        setToastMessage("Wali Kelas tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }
    if (tahun.trim() === "") {
      setTimeout(() => {
        setToastMessage("Tahun Akademik tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }

    setIsLoading(true);

    const [idTahun, idKurikulum] = tahun.split(" - ");

    try {
      const response = await axios.post(
        `${baseUrl.apiUrl}/admin/kelas`,
        {
          tahun_akademik_id: idTahun,
          kurikulum_id: idKurikulum,
          guru_nip: walikelas,
          nama_kelas: namakelas,
          jenjang: jenjang,
          tingkat: tingkat,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status == 200 || response.status == 201) {
        setTimeout(() => {
          localStorage.setItem("kelasAdded", "success");
          setIsLoading(false);
          navigate("/dashboard/kelas");
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      // Menangani error yang dikirimkan oleh server
      let errorMessage = "Gagal Tambah";

      if (error.response && error.response.data.message) {
        // Jika error dari server ada di response.data
        if (error.response.data.message) {
          errorMessage = error.response.data.message; // Tampilkan pesan dari server jika ada
        }
      } else {
        // Jika error tidak ada response dari server
        errorMessage = error.message;
      }

      setIsLoading(false); // jangan lupa set false
      setTimeout(() => {
        setToastMessage(`${errorMessage}`);
        setToastVariant("error");
      }, 10);
      return;
    }
  };

  return {
    jenjang,
    setJenjang,
    tingkat,
    setTingkat,
    walikelas,
    setWaliKelas,
    tahun,
    setTahunAkademik,
    isLoading,
    toastMessage,
    toastVariant,
    TahunAkademik,
    WaliKelasOption,
    jenjangOptions,
    tingkatOptionsMap,
    handleSubmit,
    namakelas,
    setNamaKelas,
  };
};
