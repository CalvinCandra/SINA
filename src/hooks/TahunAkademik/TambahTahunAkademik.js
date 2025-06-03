import axios from "axios";
import baseUrl from "../../utils/config/baseUrl";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useTambahTahunAkademik = () => {
  const navigate = useNavigate();
  const [namaKurikulum, setNamaKurikulum] = useState("");
  const [TglMulai, setTglMulai] = useState("");
  const [TglAkhir, setTglAkhir] = useState("");
  const [status, setStatus] = useState("");
  const [dataKurikulum, setdataKurikulum] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  // token
  const token = sessionStorage.getItem("session");

  // option
  const KurikulumOption = dataKurikulum.map((item) => ({
    value: item.kurikulum_id,
    label: item.nama_kurikulum,
  }));

  const statusOption = [
    {
      value: "aktif",
      label: "Aktif",
    },
    {
      value: "tidak aktif",
      label: "Tidak Aktif",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl.apiUrl}/admin/kurikulum`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status == 200 || response.data == 201) {
          setdataKurikulum(response.data);
        }
      } catch (error) {}
    };

    fetchData();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // reset pesan toast terlebih dahulu
    setToastMessage("");
    setToastVariant("");

    // Validasi input
    if (namaKurikulum.trim() === "") {
      setTimeout(() => {
        setToastMessage("Nama Kurikulum tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }

    if (TglMulai.trim() === "") {
      setTimeout(() => {
        setToastMessage("Tanggal Mulai tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }

    if (TglAkhir.trim() === "") {
      setTimeout(() => {
        setToastMessage("Tanggal Akhir tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }

    if (status.trim() === "") {
      setTimeout(() => {
        setToastMessage("Status tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${baseUrl.apiUrl}/admin/tahunakademik`,
        {
          kurikulum_id: namaKurikulum,
          tahun_mulai: TglMulai,
          tahun_berakhir: TglAkhir,
          status: status,
        },
        {
          headers: {
            Authorization: `Beazer ${token}`,
          },
        }
      );

      if (response.status == 200 || response.status == 201) {
        localStorage.setItem("tahunAdded", "success");
        setTimeout(() => {
          setIsLoading(false);
          navigate("/dashboard/akademik/tahun-akademik");
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
    namaKurikulum,
    setNamaKurikulum,
    TglMulai,
    setTglMulai,
    TglAkhir,
    setTglAkhir,
    status,
    setStatus,
    isLoading,
    toastMessage,
    toastVariant,
    statusOption,
    KurikulumOption,
    handleSubmit,
  };
};
