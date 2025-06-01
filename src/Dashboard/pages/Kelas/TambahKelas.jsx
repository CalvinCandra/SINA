import { useEffect, useState } from "react";
import FieldInput from "../../../component/Input/FieldInput";
import Button from "../../../component/Button/Button";
import ButtonHref from "../../../component/Button/ButtonHref";
import SelectField from "../../../component/Input/SelectField";
import DinamisSelect from "../../../component/Input/DinamisSelect";
import Toast from "../../../component/Toast/Toast";
import Loading from "../../../component/Loading/Loading";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../../utils/config/baseUrl";

export default function TambahKelas() {
  const navigate = useNavigate();
  // buat option
  const [akademik, setAkademik] = useState([]);
  const [guru, setGuru] = useState([]);

  const [jenjang, setJenjang] = useState("");
  const [tingkat, setTingkat] = useState("");
  const [walikelas, setWaliKelas] = useState("");
  const [namakelas, setNamaKelas] = useState("");
  const [tahun, setTahunAkademik] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  const token = sessionStorage.getItem("session");

  // tranlate ke tahun
  const formatTahun = (tanggalISO) => {
    const tanggal = new Date(tanggalISO);

    const tahun = tanggal.getFullYear();

    return `${tahun}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseGuru = await axios.get(`${baseUrl.apiUrl}/admin/guru`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const responseTahun = await axios.get(
          `${baseUrl.apiUrl}/admin/tahunakademik`,
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
        setToastMessage("Gagal mengambil data");
        setToastVariant("error");
      }
    };

    fetchData();
  }, []);

  const WaliKelas = guru.map((item) => ({
    value: item.guru_nip,
    label: item.nama_guru,
  }));

  const TahunAkademik = akademik.map((item) => ({
    value: `${item.tahun_akademik_id}`,
    label: `${formatTahun(item.tahun_mulai)} - ${formatTahun(
      item.tahun_berakhir
    )}`,
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

  const handleJenjangChange = (e) => {
    setJenjang(e.target.value);
    setTingkat("");
  };

  const handleTingkatChange = (e) => {
    setTingkat(e.target.value);
  };

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

    try {
      const response = await axios.post(
        `${baseUrl.apiUrl}/admin/kelas`,
        {
          tahun_akademik_id: tahun,
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
        localStorage.setItem("kelasAdded", "success");

        setTimeout(() => {
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

  return (
    <div className="lg:py-5">
      {toastMessage && (
        <Toast text={toastMessage} variant={toastVariant}></Toast>
      )}
      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg">Tambah Data Kelas</p>
        </div>

        <hr className="border-border-grey border"></hr>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Input Field */}
          <div className="w-full flex flex-col lg:flex-row justify-between mt-2">
            <div className="w-full lg:w-[34%]">
              <FieldInput
                text=<span>
                  Nama Kelas <span className="text-red-500">*</span>
                </span>
                type="text"
                variant="biasa_text_sm"
                value={namakelas}
                onChange={(e) => setNamaKelas(e.target.value)}
              ></FieldInput>
            </div>

            <div className="w-full lg:w-[66%]">
              <div className="flex flex-col lg:flex-row w-full justify-between">
                <div className="w-full lg:w-1/2 lg:mx-2">
                  <DinamisSelect
                    text="Jenjang Pendidikan"
                    value={jenjang}
                    onChange={handleJenjangChange}
                    option={jenjangOptions}
                  />
                </div>
                <div className="w-full lg:w-1/2">
                  <DinamisSelect
                    text="Tingkat"
                    value={tingkat}
                    onChange={handleTingkatChange}
                    option={tingkatOptionsMap[jenjang] || []}
                    disabled={!jenjang} // disable jika jenjang belum dipilih
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col lg:flex-row justify-between mt-2">
            <div className="w-full lg:w-1/2 lg:me-1">
              <SelectField
                text="Wali Kelas"
                option={WaliKelas}
                value={walikelas}
                onChange={(e) => setWaliKelas(e.target.value)}
              ></SelectField>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <SelectField
                text="Tahun Akademik"
                option={TahunAkademik}
                value={tahun}
                onChange={(e) => setTahunAkademik(e.target.value)}
              ></SelectField>
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-end items-center mt-5">
            <div className="me-2">
              <ButtonHref
                text="Batal"
                variant="cancel"
                href="/dashboard/kelas"
              ></ButtonHref>
            </div>
            <div className="w-40">
              <Button
                text={isLoading ? <Loading /> : `Tambah Kelas`}
                variant="button_submit_dash"
                disabled={isLoading}
              ></Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
