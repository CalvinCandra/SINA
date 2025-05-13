import FieldInput from "../../../../component/Input/FieldInput";
import Button from "../../../../component/Button/Button";
import ButtonHref from "../../../../component/Button/ButtonHref";
import Loading from "../../../../component/Loading/Loading";
import Toast from "../../../../component/Toast/Toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function TambahMataPelajaran() {
  const navigate = useNavigate();
  const [namaPelajaran, setNamaPelajaran] = useState("");
  const [kkm, setKkm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // reset pesan toast terlebih dahulu
    setToastMessage("");
    setToastVariant("");

    // Validasi input
    if (namaPelajaran.trim() === "") {
      setTimeout(() => {
        setToastMessage("Nama mata pelajaran tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }

    if (kkm.trim() === "") {
      setTimeout(() => {
        setToastMessage("KKM tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }

    setIsLoading(true);

    // Ambil data admin yang sudah ada di localStorage
    const storedPelajaran =
      JSON.parse(localStorage.getItem("pelajaranList")) || [];

    const lastId =
      storedPelajaran.length > 0
        ? Math.max(...storedPelajaran.map((item) => item.id))
        : 0;

    // Membuat data baru
    const newPelajaran = {
      id: lastId + 1, // id auto increment
      mata_pelajar: namaPelajaran,
      kkm: kkm,
    };

    // Tambahkan data baru
    const tambah = [...storedPelajaran, newPelajaran];

    // Simpan data ke localStorage
    localStorage.setItem("pelajaranList", JSON.stringify(tambah));

    // Simpan status berhasil tambah
    localStorage.setItem("pelajaranAdded", "success");

    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard/akademik/mata-pelajaran");
    }, 2000);
  };
  return (
    <div className="lg:py-5">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg">Tambah Data Mata Pelajaran</p>
        </div>

        <hr className="border-border-grey border"></hr>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Input Field */}
          <div className="w-full mt-5">
            <FieldInput
              text=<span>
                Mata Pelajaran <span className="text-red-500">*</span>
              </span>
              type="text"
              variant="biasa_text_sm"
              value={namaPelajaran}
              onChange={(e) => setNamaPelajaran(e.target.value)}
            ></FieldInput>
          </div>

          <div className="w-full mt-5">
            <FieldInput
              text=<span>
                KKM <span className="text-red-500">*</span>
              </span>
              type="number"
              variant="biasa_text_sm"
              value={kkm}
              onChange={(e) => setKkm(e.target.value)}
            ></FieldInput>
          </div>

          {/* Button */}
          <div className="flex justify-end items-center mt-5">
            <div className="me-2">
              <ButtonHref
                text="Cancel"
                variant="cancel"
                href="/dashboard/akademik/mata-pelajaran"
              ></ButtonHref>
            </div>
            <div className="w-48">
              <Button
                text={isLoading ? <Loading /> : "Tambah Mata Pelajaran"}
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
