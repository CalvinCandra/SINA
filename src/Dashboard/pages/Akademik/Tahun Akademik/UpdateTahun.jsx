import { useState, useEffect } from "react";
import FieldInput from "../../../../component/Input/FieldInput";
import Button from "../../../../component/Button/Button";
import ButtonHref from "../../../../component/Button/ButtonHref";
import SelectField from "../../../../component/Input/SelectField";
import DataKurikulum from "../../../../data/Akademik/Kurikulum/DataKurikulum";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../../component/Loading/Loading";
import Toast from "../../../../component/Toast/Toast";

export default function UpdateTahun() {
  const Kurikulum = DataKurikulum.map((item) => ({
    value: item.nama_kurikulum,
    label: item.nama_kurikulum,
  }));

  const navigate = useNavigate();
  const { id } = useParams();
  const [namaKurikulum, setNamaKurikulum] = useState("");
  const [TglMulai, setTglMulai] = useState("");
  const [TglAkhir, setTglAkhir] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tahunList")) || [];
    const foundData = stored.find((item) => item.id === parseInt(id));

    if (!foundData) {
      localStorage.setItem("tahunInvalid", "error");
      navigate("/dasboard/akademik/tahun-akademik");
    }

    //konver tgl dari misalnya 20 September 2025 ke 20-9-2025
    const formatDateToInput = (tanggalString) => {
      const [day, monthName, year] = tanggalString.split(" ");
      const monthMap = {
        Januari: "01",
        Februari: "02",
        Maret: "03",
        April: "04",
        Mei: "05",
        Juni: "06",
        Juli: "07",
        Agustus: "08",
        September: "09",
        Oktober: "10",
        November: "11",
        Desember: "12",
      };
      const month = monthMap[monthName];
      return `${year}-${month}-${day.padStart(2, "0")}`;
    };

    setNamaKurikulum(foundData.kurikulum);
    setTglMulai(formatDateToInput(foundData.tgl_mulai));
    setTglAkhir(formatDateToInput(foundData.tgl_akhir));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // reset pesan toast
    setToastMessage("");
    setToastVariant("");

    if (
      namaKurikulum.trim() === "" ||
      TglMulai.trim() === "" ||
      TglAkhir.trim() === ""
    ) {
      setTimeout(() => {
        setToastMessage(
          "Nama Kurikulum, Tanggal Mulai atau Tanggal Akhir tidak boleh kosong"
        );
        setToastVariant("error");
      }, 10);
      return;
    }

    setIsLoading(true);

    const storedTahun = JSON.parse(localStorage.getItem("tahunList"));

    const updated = storedTahun.map((item) =>
      item.id === parseInt(id)
        ? {
            ...item,
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
          }
        : item
    );

    localStorage.setItem("tahunList", JSON.stringify(updated));
    localStorage.setItem("tahunUpdate", "success");

    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard/akademik/tahun-akademik");
    }, 2000);
  };

  return (
    <div className="lg:py-5">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg">Update Data Tahun Kurikulum</p>
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
            <div className="w-40">
              <Button
                text={isLoading ? <Loading /> : "Update Kurikulum"}
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
