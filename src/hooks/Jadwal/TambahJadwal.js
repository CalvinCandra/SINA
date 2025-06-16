import axios from "axios";
import baseUrl from "../../utils/config/baseUrl";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const useTambahJadwal = () => {
  const { kelas_id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const [Mapel, setMapel] = useState([]);
  const [Guru, setGuru] = useState([]);
  const [selectedGuru, setSelectedGuru] = useState("");
  const [selectedMapel, setSelectedMapel] = useState("");
  const [jadwalList, setJadwalList] = useState([
    {
      hari: "",
      jam_ke: "",
      start: "",
      finish: "",
      ruangan: "",
    },
  ]);

  const token = sessionStorage.getItem("session");

  // Get Mapel dan Guru
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Guru
        const responseGuru = await axios.get(`${baseUrl.apiUrl}/admin/guru`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Mapel
        const responseMapel = await axios.get(
          `${baseUrl.apiUrl}/admin/mapel-kelas/${kelas_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (responseGuru.status == 200 && responseMapel.status == 200) {
          setMapel(responseMapel.data.data.mapel);
          setGuru(responseGuru.data);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        setToastMessage("Gagal Ambil Data Guru atau Mapel");
        setToastVariant("error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const tambahFormHari = () => {
    setJadwalList([
      ...jadwalList,
      {
        hari: "",
        jam_ke: "",
        start: "",
        finish: "",
        ruangan: "",
      },
    ]);
  };

  const GuruOption = Guru.map((item) => ({
    value: item.nip,
    label: item.nama_guru,
  }));

  const MapelOption = Mapel.map((item) => ({
    value: item.mapel_id,
    label: item.nama_mapel,
  }));

  const hariOptions = [
    { value: "senin", label: "Senin" },
    { value: "selasa", label: "Selasa" },
    { value: "rabu", label: "Rabu" },
    { value: "kamis", label: "Kamis" },
    { value: "jumat", label: "Jumat" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      selectedGuru,
      selectedMapel,
      ...jadwalList.map((item) => item.hari),
      ...jadwalList.map((item) => item.jam_ke),
      ...jadwalList.map((item) => item.start),
      ...jadwalList.map((item) => item.finish),
      ...jadwalList.map((item) => item.ruangan),
    ];

    const isAnyEmpty = requiredFields.some((field) => field.trim() === "");

    setToastMessage("");
    setToastVariant("");

    if (isAnyEmpty) {
      setTimeout(() => {
        setToastMessage("Kolom input tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }

    setIsLoading(true);

    // Format data untuk dikirim ke API
    const payload = {
      kelas_id: kelas_id,
      mapel_id: selectedMapel,
      nip_guru: selectedGuru,
      jadwal_hari: jadwalList.map((item) => ({
        hari: item.hari,
        jam_ke: item.jam_ke,
        start: item.start,
        finish: item.finish,
        ruangan: item.ruangan,
      })),
    };

    try {
      const response = await axios.post(
        `${baseUrl.apiUrl}/admin/jadwal`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        localStorage.setItem("jadwalAdded", "success");
        setTimeout(() => {
          setIsLoading(false);
          navigate(`/dashboard/akademik/jadwal-kelas/${kelas_id}`);
        }, 1000);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      setToastMessage("Gagal menyimpan jadwal");
      setToastVariant("error");
    }
  };

  return {
    kelas_id,
    isLoading,
    toastMessage,
    toastVariant,
    tambahFormHari,
    GuruOption,
    MapelOption,
    hariOptions,
    handleSubmit,
    jadwalList,
    setJadwalList,
    setSelectedGuru,
    selectedGuru,
    setSelectedMapel,
    selectedMapel,
  };
};
