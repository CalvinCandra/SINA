import FieldInput from "../../../component/Input/FieldInput";
import Button from "../../../component/Button/Button";
import ButtonHref from "../../../component/Button/ButtonHref";
import SelectField from "../../../component/Input/SelectField";
import { useState, useEffect } from "react";
import Loading from "../../../component/Loading/Loading";
import Toast from "../../../component/Toast/Toast";
import { useNavigate, useParams } from "react-router-dom";
import DinamisSelect from "../../../component/Input/DinamisSelect";

export default function UpdateKelas() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [jenjang, setJenjang] = useState("");
  const [tingkat, setTingkat] = useState("");
  const [walikelas, setWaliKelas] = useState("");
  const [namakelas, setNamaKelas] = useState("");
  const [akademik, setAkademik] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  useEffect(() => {
    const storedDataKelas = JSON.parse(localStorage.getItem("kelasList"));
    const foundData = storedDataKelas.find((item) => item.id === parseInt(id));

    if (!foundData) {
      localStorage.setItem("kelasInvalid", "error");
      setTimeout(() => {
        window.location.href = "/dashboard/kelas";
      }, 10);
    }

    setJenjang(foundData.jenjang);
    setNamaKelas(foundData.nama_kelas);
    setTingkat(foundData.tingkat);
    setWaliKelas(foundData.wali_kelas);
    setAkademik(foundData.tahun_akademik);
  }, [id]);

  const jenjangOptions = [
    { value: "1", label: "SD" },
    { value: "2", label: "SMP" },
    { value: "3", label: "SMA" },
  ];

  const tingkatOptionsMap = {
    1: [
      { value: "I", label: "I" },
      { value: "II", label: "II" },
      { value: "III", label: "III" },
      { value: "IV", label: "IV" },
      { value: "V", label: "V" },
      { value: "VI", label: "VI" },
    ],
    2: [
      { value: "VII", label: "VII" },
      { value: "VIII", label: "VIII" },
      { value: "IX", label: "IX" },
    ],
    3: [
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

  const WaliKelas = [
    {
      value: "Guru Draviin",
      label: "Guru Draviin",
    },
    {
      value: "Guru Oka",
      label: "Guru Oka",
    },
    {
      value: "Guru Willy",
      label: "Guru Willy",
    },
    {
      value: "Guru IGLOW",
      label: "Guru IGLOW",
    },
  ];

  const TahunAkademik = [
    {
      value: "15 Januari 2022 - 20 Januari 2023",
      label: "15 Januari 2022 - 20 Januari 2023",
    },
    {
      value: "15 Januari 2023 - 20 Januari 2024",
      label: "15 Januari 2023 - 20 Januari 2024",
    },
    {
      value: "15 Januari 2024 - 20 Januari 2025",
      label: "15 Januari 2024 - 20 Januari 2025",
    },
    {
      value: "15 Januari 2025 - 20 Januari 2026",
      label: "15 Januari 2025 - 20 Januari 2026",
    },
  ];

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
    if (akademik.trim() === "") {
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
                value={akademik}
                onChange={(e) => setAkademik(e.target.value)}
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
