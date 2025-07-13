import { useNavigate } from "react-router-dom";
import baseUrl from "../../utils/config/baseUrl";
import { useEffect, useState } from "react";
import axios from "axios";

export const useTambahKurikulum = () => {
  const navigate = useNavigate();
  const [namaKurikulum, setNamaKurikulum] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const [dataMapel, setDataMapel] = useState([]);
  const [selectedMapel, setSelectedMapel] = useState([]);
  const [jenjang, setJenjang] = useState("");
  const [tingkat, setTingkat] = useState("");
  const token = sessionStorage.getItem("session");

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${baseUrl.apiUrl}/admin/mapel`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status == 200 || response.status == 201) {
          setDataMapel(response.data);
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
  }, [token]);

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

    if (deskripsi.trim() === "") {
      setTimeout(() => {
        setToastMessage("Deskripsi tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }

    setIsLoading(true);
    
    const mapelsPayload = selectedMapel.map((id) => ({ mapel_id: id }));

    try {
      const response = await axios.post(
        `${baseUrl.apiUrl}/admin/kurikulum`,
        {
          nama_kurikulum: namaKurikulum,
          deskripsi: deskripsi,
          tingkat: tingkat,
          jenjang: jenjang,
          mapel_list: mapelsPayload,
        },
        {
          headers: {
            Authorization: `Beazer ${token}`,
          },
        }
      );

      if (response.status == 200 || response.status == 201) {
        localStorage.setItem("kurikulumAdded", "success");
        setTimeout(() => {
          setIsLoading(false);
          navigate("/dashboard/akademik/kurikulum");
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
    deskripsi,
    setDeskripsi,
    isLoading,
    toastMessage,
    toastVariant,
    handleSubmit,
    dataMapel,
    selectedMapel,
    setSelectedMapel,
    jenjang,
    setJenjang,
    tingkat,
    setTingkat,
    jenjangOptions,
    tingkatOptionsMap,
  };
};
