import { useState } from "react";
import FieldInput from "../../../../component/Input/FieldInput";
import Button from "../../../../component/Button/Button";
import ButtonHref from "../../../../component/Button/ButtonHref";
import SelectField from "../../../../component/Input/SelectField";
import DataKurikulum from "../../../../data/Akademik/Kurikulum/DataKurikulum";
import { useNavigate } from "react-router-dom";
import Loading from "../../../../component/Loading/Loading";
import Toast from "../../../../component/Toast/Toast";

export default function TambahTahun() {
  const Kurikulum = DataKurikulum.map((item) => ({
    value: item.nama_kurikulum,
    label: item.nama_kurikulum,
  }));

  const navigate = useNavigate();
  const [namaKurikulum, setNamaKurikulum] = useState("");
  const [TglMulai, setTglMulai] = useState("");
  const [TglAkhir, setTglAkhir] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  const handleSubmit = (e) => {
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

    setIsLoading(true);

    // Ambil data yang sudah ada di localStorage
    const storedTahun = JSON.parse(localStorage.getItem("tahunList")) || [];

    const lastId =
      storedTahun.length > 0
        ? Math.max(...storedTahun.map((item) => item.id))
        : 0;

    // Membuat data baru
    const newTahun = {
      id: lastId + 1, // id auto increment
      kurikulum: namaKurikulum,
      tgl_mulai: new Date(TglMulai).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      tgl_akhir: new Date(TglAkhir).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };

    // Tambahkan data baru
    const tambah = [...storedTahun, newTahun];

    // Simpan data ke localStorage
    localStorage.setItem("tahunList", JSON.stringify(tambah));

    // Simpan status berhasil tambah
    localStorage.setItem("tahunAdded", "success");

    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard/akademik/tahun-akademik");
    }, 2000);
  };
  return (
    <div className="lg:py-5 min-h-screen lg:min-h-0">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg">Tambah Data Tahun Kurikulum</p>
        </div>

        <hr className="border-border-grey border"></hr>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Input Field */}

          <div className="w-full me-1 mt-5">
            <SelectField
              text="Nama Kurikulum"
              option={Kurikulum}
              value={namaKurikulum}
              onChange={(e) => setNamaKurikulum(e.target.value)}
            ></SelectField>
          </div>

          <div className="flex flex-col lg:flex-row w-full justify-between">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                text=<span>
                  Tanggal Mulai <span className="text-red-500">*</span>
                </span>
                type="date"
                variant="biasa_text_sm"
                value={TglMulai}
                onChange={(e) => setTglMulai(e.target.value)}
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                text=<span>
                  Tanggal Akhir <span className="text-red-500">*</span>
                </span>
                type="date"
                variant="biasa_text_sm"
                value={TglAkhir}
                onChange={(e) => setTglAkhir(e.target.value)}
              ></FieldInput>
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-end items-center mt-5">
            <div className="me-2">
              <ButtonHref
                text="Cancel"
                variant="cancel"
                href="/dashboard/akademik/tahun-akademik"
              ></ButtonHref>
            </div>
            <div className="w-52">
              <Button
                text={isLoading ? <Loading /> : "Tambah Tahun Akademik"}
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
