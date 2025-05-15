import { useState, useEffect } from "react";
import FieldInput from "../../../../component/Input/FieldInput";
import Button from "../../../../component/Button/Button";
import InputFile from "../../../../component/Input/InputFile";
import ButtonHref from "../../../../component/Button/ButtonHref";
import SelectField from "../../../../component/Input/SelectField";
import Textarea from "../../../../component/Input/Textarea";
import { useNavigate, useParams } from "react-router-dom";
import Toast from "../../../../component/Toast/Toast";
import Loading from "../../../../component/Loading/Loading";

export default function UpdateDataGuru() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(
    "https://manbengkuluselatan.sch.id/assets/img/profile/default.jpg"
  );

  const agamaOption = [
    {
      value: "Hindu",
      label: "Hindu",
    },
    {
      value: "Buddha",
      label: "Buddha",
    },
    {
      value: "Kristen Katolik",
      label: "Kristen Katolik",
    },
    {
      value: "Kristen Protestan",
      label: "Kristen Protestan",
    },
    {
      value: "Islam",
      label: "Islam",
    },
  ];

  const kelaminOption = [
    {
      value: "Laki - Laki",
      label: "Laki - Laki",
    },
    {
      value: "Perempuan",
      label: "Perempuan",
    },
  ];

  const [namaGuru, setNamaGuru] = useState("");
  const [nipGuru, setNipGuru] = useState("");
  const [emailGuru, setEmailGuru] = useState("");
  const [telp, setTelp] = useState("");
  const [agamaGuru, setAgama] = useState("");
  const [tempat_lahir, setTempatLahir] = useState("");
  const [tgl_lahir, setTglLahir] = useState("");
  const [kelaminGuru, setKelamin] = useState("");
  const [alamat, setAlamat] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  //konver tgl dari misalnya 20 September 2025 ke 20-9-2025
  const formatDateToInput = (tanggalString) => {
    if (!tanggalString) return "";
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

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("guruList")) || [];
    const foundData = stored.find((item) => item.id === parseInt(id));
    console.log(foundData);

    setNamaGuru(foundData.nama);
    setNipGuru(foundData.nip);
    setEmailGuru(foundData.email);
    setPreview(foundData.image);
    setTelp(foundData.telp);
    setTempatLahir(foundData.tempat_lahir);
    setTglLahir(formatDateToInput(foundData.tgl_lahir));
    setKelamin(foundData.kelamin);
    setAgama(foundData.agama);
    setAlamat(foundData.alamat);
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      const fileSizeLimit = 5 * 1024 * 1024; // 5MB limit

      if (!allowedTypes.includes(file.type)) {
        setToastMessage("File harus berformat PNG, JPG, atau JPEG");
        setToastVariant("error");
        setPreview(
          "https://manbengkuluselatan.sch.id/assets/img/profile/default.jpg"
        );
        document.getElementById("file-name").textContent = "No file chosen";
        return;
      }

      if (file.size > fileSizeLimit) {
        setToastMessage("Ukuran file terlalu besar. Maksimum 5MB.");
        setToastVariant("error");
        setPreview(
          "https://manbengkuluselatan.sch.id/assets/img/profile/default.jpg"
        );
        document.getElementById("file-name").textContent = "No file chosen";
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        document.getElementById("file-name").textContent = file.name;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // reset pesan toast terlebih dahulu
    setToastMessage("");
    setToastVariant("");

    // Validasi input
    if (
      preview ===
      "https://manbengkuluselatan.sch.id/assets/img/profile/default.jpg"
    ) {
      setTimeout(() => {
        setToastMessage("Gambar wajib diisi");
        setToastVariant("error");
      }, 10);
      return;
    }

    if (
      namaGuru.trim() === "" ||
      emailGuru.trim() === "" ||
      telp.trim() === "" ||
      agamaGuru.trim() === "" ||
      tempat_lahir.trim() === "" ||
      tgl_lahir.trim() === "" ||
      kelaminGuru.trim() === "" ||
      alamat.trim() === ""
    ) {
      setTimeout(() => {
        setToastMessage("Kolom Input tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }

    setIsLoading(true);

    // Ambil data yang sudah ada di localStorage
    const storedGuru = JSON.parse(localStorage.getItem("guruList")) || [];

    const updateGuru = storedGuru.map((item) =>
      item.id === parseInt(id)
        ? {
            ...item,
            image: preview,
            nama: namaGuru,
            nip: nipGuru,
            email: emailGuru,
            telp: telp,
            agama: agamaGuru,
            tempat_lahir: tempat_lahir,
            tgl_lahir: new Date(tgl_lahir).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
            kelamin: kelaminGuru,
            alamat: alamat,
          }
        : item
    );

    // Simpan data ke localStorage
    localStorage.setItem("guruList", JSON.stringify(updateGuru));

    // Simpan status berhasil tambah
    localStorage.setItem("guruUpdate", "success");

    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard/guru");
    }, 2000);
  };
  return (
    <div className="lg:py-5">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg">Perbaharui Data Guru</p>
        </div>

        <hr className="border-border-grey border"></hr>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Gambar */}
          <div className="flex flex-col justify-center items-center">
            <div className="p-1 w-60 h-64 my-3 overflow-hidden">
              <img
                src={preview}
                id="ImagePreview"
                className="w-full h-full object-object rounded"
              ></img>
            </div>

            <InputFile fungsi={handleImageChange}></InputFile>
          </div>

          {/* Input Field */}
          <div className="w-full flex flex-col lg:flex-row justify-between mt-5">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                text=<span>
                  Nama Lengkap <span className="text-red-500">*</span>
                </span>
                type="text"
                value={namaGuru}
                onChange={(e) => setNamaGuru(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                text=<span>
                  NIP Guru <span className="text-red-500">*</span>
                </span>
                type="number"
                value={nipGuru}
                onChange={(e) => setNipGuru(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>
          </div>

          <div className="w-full flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                text=<span>
                  Email Guru <span className="text-red-500">*</span>
                </span>
                type="email"
                value={emailGuru}
                onChange={(e) => setEmailGuru(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>
            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                text=<span>
                  No telepon <span className="text-red-500">*</span>
                </span>
                type="text"
                value={telp}
                onChange={(e) => setTelp(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>
          </div>

          <div className="w-full flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                text=<span>
                  Tempat Lahir <span className="text-red-500">*</span>
                </span>
                type="text"
                value={tempat_lahir}
                onChange={(e) => setTempatLahir(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                text=<span>
                  Tanggal Lahir <span className="text-red-500">*</span>
                </span>
                type="date"
                value={tgl_lahir}
                onChange={(e) => setTglLahir(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>
          </div>

          <div className="w-full flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/2 lg:me-1">
              <SelectField
                text="Agama"
                option={agamaOption}
                value={agamaGuru}
                onChange={(e) => setAgama(e.target.value)}
              ></SelectField>
            </div>
            <div className="w-full lg:w-1/2 lg:ms-1">
              <SelectField
                text="Jenis Kelamin"
                option={kelaminOption}
                value={kelaminGuru}
                onChange={(e) => setKelamin(e.target.value)}
              ></SelectField>
            </div>
          </div>

          <div className="w-full">
            <Textarea
              text=<span>
                Alamat <span className="text-red-500">*</span>
              </span>
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
            ></Textarea>
          </div>

          {/* Button */}
          <div className="flex justify-end items-center mt-5">
            <div className="me-2">
              <ButtonHref
                text="Batal"
                variant="cancel"
                href="/dashboard/guru"
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
