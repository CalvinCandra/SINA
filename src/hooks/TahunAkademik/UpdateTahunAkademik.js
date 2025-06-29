import axios from "axios";
import { formatToDateInput } from "../../utils/helper/dateFormat";
import baseUrl from "../../utils/config/baseUrl";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const useUpdateTahunAkademik = () => {
  const navigate = useNavigate();
  const { tahun_akademik_id, kurikulum_id } = useParams();
  const [namaKurikulum, setNamaKurikulum] = useState("");
  const [TglMulai, setTglMulai] = useState("");
  const [TglAkhir, setTglAkhir] = useState("");
  const [status, setStatus] = useState("");
  const [DataKurikulum, setdataKurikulum] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const token = sessionStorage.getItem("session");

  const KurikulumOption = DataKurikulum.map((item) => ({
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
        setIsLoading(true);
        const responseTahun = await axios.get(
          `${baseUrl.apiUrl}/admin/tahunakademik/${tahun_akademik_id}/${kurikulum_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const responseKurikulum = await axios.get(
          `${baseUrl.apiUrl}/admin/kurikulum`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (responseTahun.status == 200 || responseTahun.status == 201) {
          setNamaKurikulum(responseTahun.data.kurikulum_id);
          setTglMulai(formatToDateInput(responseTahun.data.tahun_mulai));
          setTglAkhir(formatToDateInput(responseTahun.data.tahun_berakhir));
          setStatus(responseTahun.data.status);
        }

        if (
          responseKurikulum.status == 200 ||
          responseKurikulum.status == 201
        ) {
          setdataKurikulum(responseKurikulum.data);
        }
      } catch (error) {
        console.log(error);
        setToastMessage("Gagal Ambil Data");
        setToastVariant("error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [tahun_akademik_id, kurikulum_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // reset pesan toast terlebih dahulu
    setToastMessage("");
    setToastVariant("");

    // Validasi input
    if (String(namaKurikulum).trim() === "") {
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
      const response = await axios.put(
        `${baseUrl.apiUrl}/admin/tahunakademik/${tahun_akademik_id}/${kurikulum_id}`,
        {
          kurikulum_id: namaKurikulum,
          tahun_mulai: TglMulai,
          tahun_berakhir: TglAkhir,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status == 200 || response.status == 201) {
        localStorage.setItem("tahunUpdate", "success");
        setTimeout(() => {
          setIsLoading(false);
          navigate("/dashboard/akademik/tahun-akademik");
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      // Menangani error yang dikirimkan oleh server
      let errorMessage = "Gagal";

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
    TglAkhir,
    setTglAkhir,
    TglMulai,
    setTglMulai,
    status,
    setStatus,
    isLoading,
    toastMessage,
    toastVariant,
    KurikulumOption,
    statusOption,
    handleSubmit,
  };
};
