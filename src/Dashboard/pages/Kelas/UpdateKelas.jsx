import FieldInput from "../../../component/Input/FieldInput";
import Button from "../../../component/Button/Button";
import ButtonHref from "../../../component/Button/ButtonHref";
import SelectField from "../../../component/Input/SelectField";
import { useState, useEffect } from "react";
import Loading from "../../../component/Loading/Loading";
import Toast from "../../../component/Toast/Toast";
import { useNavigate, useParams } from "react-router-dom";
import DinamisSelect from "../../../component/Input/DinamisSelect";
import axios from "axios";
import baseUrl from "../../../utils/config/baseUrl";

export default function UpdateKelas() {
  const navigate = useNavigate();
  const { id } = useParams();

  // option
  const [guru, setGuru] = useState([]);
  const [akademik, setAkademik] = useState([]);

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
        // get guru
        const responseGuru = await axios.get(`${baseUrl.apiUrl}/admin/guru`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // get tahun
        const responseTahun = await axios.get(
          `${baseUrl.apiUrl}/admin/tahunakademik`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // get kelas
        const responseKelas = await axios.get(
          `${baseUrl.apiUrl}/admin/kelas/${id}`,
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

        if (responseKelas.status == 200) {
          setNamaKelas(responseKelas.data.nama_kelas);
          setWaliKelas(responseKelas.data.guru_nip);
          setTingkat(responseKelas.data.tingkat);
          setJenjang(responseKelas.data.jenjang);
          setTahunAkademik(responseKelas.data.tahun_akademik_id);
        }
      } catch (error) {}
    };

    fetchData();
  }, [id]);

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

  const WaliKelas = guru.map((item) => ({
    value: item.nama_guru,
    label: item.nama_guru,
  }));

  const TahunAkademik = akademik.map((item) => ({
    value: `${item.tahun_akademik_id}`,
    label: `${formatTahun(item.tahun_mulai)} - ${formatTahun(
      item.tahun_berakhir
    )}`,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();

    // validasi
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

    const storedData = JSON.parse(localStorage.getItem("kelasList"));

    const updateKelas = storedData.map((kelas) =>
      kelas.id === parseInt(id)
        ? {
            ...kelas,
            nama_kelas: namakelas,
            tingkat: tingkat,
            jenjang: jenjang,
            wali_kelas: walikelas,
            tahun_akademik: akademik,
          }
        : kelas
    );

    localStorage.setItem("kelasList", JSON.stringify(updateKelas));
    localStorage.setItem("kelasUpdate", "success");

    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard/kelas");
    }, 1000);
  };

  return (
    <div className="lg:py-5">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg">Perbaharui Data Kelas</p>
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
                text={isLoading ? <Loading /> : "Perbaharui"}
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
