import { useState, useEffect } from "react";
import InputFile from "../../../component/Input/InputFile";
import ButtonHref from "../../../component/Button/ButtonHref";
import Textarea from "../../../component/Input/Textarea";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../component/Button/Button";
import SelectField from "../../../component/Input/SelectField";
import Loading from "../../../component/Loading/Loading";
import Toast from "../../../component/Toast/Toast";
import FieldInput from "../../../component/Input/FieldInput";

export default function TambahSiswa() {
  const data = useParams();
  console.log(localStorage.getItem("siswaList"));
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

  //variabel siswa
  const [namaSiswa, setNamaSiswa] = useState("");
  const [emailSiswa, setEmailSiswa] = useState("");
  const [nisSiswa, setNisSiswa] = useState("");
  const [nisnSiswa, setNisnSiswa] = useState("");
  const [tempatLahirSiswa, settempatLahirSiswa] = useState("");
  const [tglLahirSiswa, settglLahirSiswa] = useState("");
  const [agama, setAgamaSiswa] = useState("");
  const [kelamin, setkelaminSiswa] = useState("");
  const [alamatSiswa, setAlamatSiswa] = useState("");

  // variabel ayah
  const [namaAyah, setNamaAyah] = useState("");
  const [nikAyah, setNikAyah] = useState("");
  const [tempatLahirAyah, settempatLahirAyah] = useState("");
  const [tglLahirAyah, settglLahirAyah] = useState("");
  const [pekerjaanAyah, setPekerjaanAyah] = useState("");
  const [telpAyah, setTelpAyah] = useState("");
  const [alamatAyah, setAlamatAyah] = useState("");

  // variabel ibu
  const [namaIbu, setNamaIbu] = useState("");
  const [nikIbu, setNikIbu] = useState("");
  const [tempatLahirIbu, settempatLahirIbu] = useState("");
  const [tglLahirIbu, settglLahirIbu] = useState("");
  const [pekerjaanIbu, setPekerjaanIbu] = useState("");
  const [telpIbu, setTelpIbu] = useState("");
  const [alamatIbu, setAlamatIbu] = useState("");

  // variabel wali
  const [namaWali, setNamaWali] = useState("");
  const [nikWali, setNikWali] = useState("");
  const [tempatLahirWali, settempatLahirWali] = useState("");
  const [tglLahirWali, settglLahirWali] = useState("");
  const [pekerjaanWali, setPekerjaanWali] = useState("");
  const [telpWali, setTelpWali] = useState("");
  const [alamatWali, setAlamatWali] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

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

      if (file.size >= fileSizeLimit) {
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

    // kumpulan filed tidak bole kosong
    const requiredFields = [
      namaSiswa,
      nisSiswa,
      nisnSiswa,
      tempatLahirSiswa,
      tglLahirSiswa,
      agama,
      kelamin,
      alamatSiswa,
      namaAyah,
      nikAyah,
      tempatLahirAyah,
      tglLahirAyah,
      pekerjaanAyah,
      telpAyah,
      alamatAyah,
      namaIbu,
      nikIbu,
      tempatLahirIbu,
      tglLahirIbu,
      pekerjaanIbu,
      telpIbu,
      alamatIbu,
    ];

    const isAnyEmpty = requiredFields.some((field) => field.trim() === "");

    if (isAnyEmpty) {
      setTimeout(() => {
        setToastMessage("Kolom input tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }

    setIsLoading(true);

    const key = `${decodeURIComponent(data.nama_kelas)} ${decodeURIComponent(
      data.tingkat
    )}`;
    const stored = JSON.parse(localStorage.getItem("siswaList")) || {};
    const existing = stored[key] || [];

    const lastId =
      existing.length > 0 ? Math.max(...existing.map((item) => item.id)) : 0;

    // Membuat data admin baru
    const newSiswa = {
      id: lastId + 1,
      image: preview,
      nama: namaSiswa,
      email: emailSiswa,
      nis: nisSiswa,
      nisn: nisnSiswa,
      tempat_lahir: tempatLahirSiswa,
      tgl_lahir: new Date(tglLahirSiswa).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      agama: agama,
      kelamin: kelamin,
      alamat: alamatSiswa,
      nama_ayah: namaAyah,
      nik_ayah: nikAyah,
      tempat_lahir_ayah: tempatLahirAyah,
      tgl_lahir_ayah: new Date(tglLahirAyah).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      pekerjaan_ayah: pekerjaanAyah,
      no_ayah: telpAyah,
      alamat_ayah: alamatAyah,
      nama_ibu: namaIbu,
      nik_ibu: nikIbu,
      tempat_lahir_ibu: tempatLahirIbu,
      tgl_lahir_ibu: new Date(tglLahirIbu).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      pekerjaan_ibu: pekerjaanIbu,
      no_ibu: telpIbu,
      alamat_ibu: alamatIbu,
      nama_wali: namaWali,
      nik_wali: nikWali,
      tempat_lahir_wali: tempatLahirWali,
      tgl_lahir_wali: new Date(tglLahirWali).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      pekerjaan_wali: pekerjaanWali,
      no_wali: telpWali,
      alamat_wali: alamatWali,
    };

    // Tambahkan admin baru ke data
    const tambah = {
      ...stored,
      [key]: [...existing, newSiswa],
    };

    // Simpan data ke localStorage
    localStorage.setItem("siswaList", JSON.stringify(tambah));

    // Simpan status berhasil tambah
    localStorage.setItem("siswaAdded", "success");

    setTimeout(() => {
      setIsLoading(false);
      navigate(
        `/dashboard/siswa/${encodeURIComponent(
          data.nama_kelas
        )}/${encodeURIComponent(data.tingkat)}`
      );
    }, 2000);
  };

  return (
    <div className="lg:py-5">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg mb-3">Tambah Data Siswa</p>
        </div>

        <hr className="border-border-grey border"></hr>

        <form onSubmit={handleSubmit}>
          {/* Gambar */}
          <div className="flex flex-col justify-center items-center">
            <div className="p-1 w-60 h-64 my-3 overflow-hidden">
              <img
                src={preview}
                alt="Preview"
                id="ImagePreview"
                className="w-full h-full object-object rounded"
              />
            </div>

            <InputFile text="Pilih Foto" fungsi={handleImageChange} />
          </div>

          {/* Input Field Siswa*/}
          {/* Input Field Baris 1*/}
          <div className="w-full flex flex-col lg:flex-row justify-between mt-5">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                type="text"
                text=<span>
                  Nama Lengkap <span className="text-red-500">*</span>
                </span>
                value={namaSiswa}
                onChange={(e) => setNamaSiswa(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                type="email"
                text=<span>Email</span>
                value={emailSiswa}
                onChange={(e) => setEmailSiswa(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>
          </div>

          {/* Input Field Baris 2*/}
          <div className="w-full flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                type="text"
                text=<span>
                  Nis <span className="text-red-500">*</span>
                </span>
                value={nisSiswa}
                variant="biasa_text_sm"
                onChange={(e) => setNisSiswa(e.target.value)}
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                type="text"
                text=<span>
                  NISN <span className="text-red-500">*</span>
                </span>
                value={nisnSiswa}
                variant="biasa_text_sm"
                onChange={(e) => setNisnSiswa(e.target.value)}
              ></FieldInput>
            </div>
          </div>

          {/* Input Field Baris 3*/}
          <div className="w-full flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                type="text"
                text=<span>
                  Tempat Lahir <span className="text-red-500">*</span>
                </span>
                value={tempatLahirSiswa}
                variant="biasa_text_sm"
                onChange={(e) => settempatLahirSiswa(e.target.value)}
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                type="date"
                text=<span>
                  Tanggal Lahir <span className="text-red-500">*</span>
                </span>
                value={tglLahirSiswa}
                variant="biasa_text_sm"
                onChange={(e) => settglLahirSiswa(e.target.value)}
              ></FieldInput>
            </div>
          </div>

          {/* Input Field Baris 4*/}
          <div className="w-full flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/2 lg:me-1">
              <SelectField
                text=<span>
                  Agama <span className="text-red-500">*</span>
                </span>
                option={agamaOption}
                value={agama}
                onChange={(e) => setAgamaSiswa(e.target.value)}
              />
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <SelectField
                text=<span>
                  Kelamin <span className="text-red-500">*</span>
                </span>
                option={kelaminOption}
                value={kelamin}
                onChange={(e) => setkelaminSiswa(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full">
            <Textarea
              text=<span>
                Alamat <span className="text-red-500">*</span>
              </span>
              value={alamatSiswa}
              onChange={(e) => setAlamatSiswa(e.target.value)}
            ></Textarea>
          </div>

          {/* Input Field Ayah*/}
          <div className="bg-biru-active mt-6 py-2 px-2">
            <h1 className="font-semibold text-white text-lg">Ayah</h1>
          </div>
          {/* Input Field Baris 1*/}
          <div className="w-full flex flex-col lg:flex-row justify-between mt-3">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                type="text"
                text=<span>
                  Nama Lengkap <span className="text-red-500">*</span>
                </span>
                onChange={(e) => setNamaAyah(e.target.value)}
                value={namaAyah}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                type="number"
                text=<span>
                  NIK <span className="text-red-500">*</span>
                </span>
                value={nikAyah}
                onChange={(e) => setNikAyah(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>
          </div>

          {/* Input Field Baris 2*/}
          <div className="w-full flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                type="text"
                text=<span>
                  Tempat Lahir <span className="text-red-500">*</span>
                </span>
                value={tempatLahirAyah}
                onChange={(e) => settempatLahirAyah(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                type="date"
                text=<span>
                  Tanggal Lahir <span className="text-red-500">*</span>
                </span>
                value={tglLahirAyah}
                onChange={(e) => settglLahirAyah(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>
          </div>

          {/* Input Field Baris 3*/}
          <div className="w-full flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                type="text"
                text=<span>
                  Pekerjaan <span className="text-red-500">*</span>
                </span>
                value={pekerjaanAyah}
                onChange={(e) => setPekerjaanAyah(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                type="text"
                text=<span>
                  No Handphone <span className="text-red-500">*</span>
                </span>
                value={telpAyah}
                onChange={(e) => setTelpAyah(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>
          </div>

          <div className="w-full">
            <Textarea
              text=<span>
                Alamat <span className="text-red-500">*</span>
              </span>
              value={alamatAyah}
              onChange={(e) => setAlamatAyah(e.target.value)}
            ></Textarea>
          </div>

          {/* Input Field Ibu*/}
          <div className="bg-biru-active mt-6 py-2 px-2">
            <h1 className="font-semibold text-white text-lg">Ibu</h1>
          </div>
          {/* Input Field Baris 1*/}
          <div className="w-full flex flex-col lg:flex-row justify-between mt-3">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                type="text"
                text=<span>
                  Nama Lengkap <span className="text-red-500">*</span>
                </span>
                value={namaIbu}
                onChange={(e) => setNamaIbu(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                type="text"
                text=<span>
                  Nik <span className="text-red-500">*</span>
                </span>
                value={nikIbu}
                onChange={(e) => setNikIbu(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>
          </div>

          {/* Input Field Baris 2*/}
          <div className="w-full flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                type="text"
                text=<span>
                  Tempat Lahir <span className="text-red-500">*</span>
                </span>
                value={tempatLahirIbu}
                onChange={(e) => settempatLahirIbu(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                type="date"
                text=<span>
                  Tanggal Lahir <span className="text-red-500">*</span>
                </span>
                value={tglLahirIbu}
                onChange={(e) => settglLahirIbu(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>
          </div>

          {/* Input Field Baris 3*/}
          <div className="w-full flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                type="text"
                text=<span>
                  Pekerjaan <span className="text-red-500">*</span>
                </span>
                value={pekerjaanIbu}
                onChange={(e) => setPekerjaanIbu(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                type="text"
                text=<span>
                  No Handphone <span className="text-red-500">*</span>
                </span>
                value={telpIbu}
                onChange={(e) => setTelpIbu(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>
          </div>

          <div className="w-full">
            <Textarea
              text=<span>
                Alamat <span className="text-red-500">*</span>
              </span>
              value={alamatIbu}
              onChange={(e) => setAlamatIbu(e.target.value)}
            ></Textarea>
          </div>

          {/* Input Field Wali*/}
          <div className="bg-biru-active mt-6 py-2 px-2">
            <h1 className="font-semibold text-white text-lg">Wali</h1>
          </div>
          {/* Input Field Baris 1*/}
          <div className="w-full flex flex-col lg:flex-row justify-between mt-3">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                type="text"
                text=<span>Nama Lengkap</span>
                value={namaWali}
                onChange={(e) => setNamaWali(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                type="text"
                text=<span> Nik</span>
                value={nikWali}
                onChange={(e) => setNikWali(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>
          </div>

          {/* Input Field Baris 2*/}
          <div className="w-full flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                type="text"
                text=<span>Tempat Lahir</span>
                value={tempatLahirWali}
                onChange={(e) => settempatLahirWali(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                type="date"
                text=<span>Tanggal Lahir</span>
                value={tglLahirWali}
                onChange={(e) => settglLahirWali(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>
          </div>

          {/* Input Field Baris 3*/}
          <div className="w-full flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                type="text"
                text=<span>Pekerjaan</span>
                value={pekerjaanWali}
                onChange={(e) => setPekerjaanWali(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                type="text"
                text=<span>No Handphone</span>
                value={telpWali}
                onChange={(e) => setTelpWali(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>
          </div>

          <div className="w-full">
            <Textarea
              text=<span>Alamat</span>
              value={alamatWali}
              onChange={(e) => setAlamatWali(e.target.value)}
            ></Textarea>
          </div>

          {/* Button */}
          <div className="flex justify-end items-center mt-10">
            <div className="me-2">
              <ButtonHref
                text="Cancel"
                variant="cancel"
                href={`/dashboard/siswa/${encodeURIComponent(
                  data.nama_kelas
                )}/${encodeURIComponent(data.tingkat)}`}
              ></ButtonHref>
            </div>
            <div className="w-40">
              <Button
                text={isLoading ? <Loading /> : "Tambah Siswa"}
                variant="button_submit_dash"
                disabled={isLoading}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
