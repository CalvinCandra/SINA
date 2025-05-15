import { useState } from "react";
import FieldInput from "../../../../component/Input/FieldInput";
import Button from "../../../../component/Button/Button";
import ButtonHref from "../../../../component/Button/ButtonHref";
import Textarea from "../../../../component/Input/Textarea";
import { useNavigate } from "react-router-dom";
import Loading from "../../../../component/Loading/Loading";
import Toast from "../../../../component/Toast/Toast";

export default function TambahKurikulum() {
  const navigate = useNavigate();
  const [namaKurikulum, setNamaKurikulum] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
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

    if (deskripsi.trim() === "") {
      setTimeout(() => {
        setToastMessage("Deskripsi tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }

    setIsLoading(true);

    // Ambil data admin yang sudah ada di localStorage
    const storedKurikulum =
      JSON.parse(localStorage.getItem("kurikulumList")) || [];

    const lastId =
      storedKurikulum.length > 0
        ? Math.max(...storedKurikulum.map((item) => item.id))
        : 0;

    // Membuat data baru
    const newKurikulum = {
      id: lastId + 1, // id auto increment
      nama_kurikulum: namaKurikulum,
      deskripsi: deskripsi,
      tgl: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };

    // Tambahkan data baru
    const tambah = [...storedKurikulum, newKurikulum];

    // Simpan data ke localStorage
    localStorage.setItem("kurikulumList", JSON.stringify(tambah));

    // Simpan status berhasil tambah
    localStorage.setItem("kurikulumAdded", "success");

    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard/akademik/kurikulum");
    }, 2000);
  };
  return (
    <div className="lg:py-5 min-h-screen lg:min-h-0">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg">Tambah Data Kurikulum</p>
        </div>

        <hr className="border-border-grey border"></hr>

        <form onSubmit={handleSubmit}>
          {/* Input Field */}
          <div className="w-full mt-5">
            <FieldInput
              text=<span>
                Nama Kurikulum <span className="text-red-500">*</span>
              </span>
              type="text"
              variant="biasa_text_sm"
              value={namaKurikulum}
              onChange={(e) => setNamaKurikulum(e.target.value)}
            ></FieldInput>
          </div>

          <div className="w-full mt-5">
            <Textarea
              text=<span>
                Deskripsi Kurikulum <span className="text-red-500">*</span>
              </span>
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
            ></Textarea>
          </div>

          {/* Button */}
          <div className="flex justify-end items-center mt-5">
            <div className="me-2">
              <ButtonHref
                text="Batal"
                variant="cancel"
                href="/dashboard/akademik/kurikulum"
              ></ButtonHref>
            </div>
            <div className="w-40">
              <Button
                text={isLoading ? <Loading /> : "Tambah Kurikulum"}
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
