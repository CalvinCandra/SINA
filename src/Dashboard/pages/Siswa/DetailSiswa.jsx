import { useState, useEffect } from "react";
import FieldInput from "../../../component/Input/FieldInput";
import ButtonHref from "../../../component/Button/ButtonHref";
import Textarea from "../../../component/Input/Textarea";
import { useParams } from "react-router-dom";

export default function DetailSiswa() {
  const data = useParams();
  const keyKelas = `${decodeURIComponent(data.nama_kelas)} ${decodeURIComponent(
    data.tingkat
  )}`;
  const [setSiswa, setdataSiswa] = useState(null);

  useEffect(() => {
    const siswaRaw = localStorage.getItem("siswaList");
    if (siswaRaw) {
      const parsed = JSON.parse(siswaRaw);
      const list = parsed[keyKelas] || [];
      const detail = list.find(
        (s) => String(s.id) === decodeURIComponent(data.id)
      );
      setdataSiswa(detail);
    }
  }, [data, keyKelas]);

  if (!setSiswa) return <p>Siswa tidak ditemukan</p>;

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

  return (
    <div className="lg:py-5">
      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg">
            Detail Data Siswa {setSiswa.nama}
          </p>
        </div>

        <hr className="border-border-grey border"></hr>

        <div>
          {/* Gambar */}
          <div className="flex flex-col justify-center items-center">
            <div className="p-1 w-60 h-64 my-3 overflow-hidden">
              <img
                src={setSiswa.image}
                id="ImagePreview"
                className="w-full h-full object-object rounded"
              ></img>
            </div>
          </div>

          {/* Input Field Siswa*/}
          {/* Input Field Baris 1*/}
          <div className="w-full flex flex-col lg:flex-row justify-between mt-5">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                text=<span>Nama Lengkap</span>
                value={setSiswa.nama}
                variant="biasa_text_sm_disabled"
                readonly
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                text=<span>Email</span>
                value={setSiswa.email ? setSiswa.email : "-"}
                variant="biasa_text_sm_disabled"
                readonly
              ></FieldInput>
            </div>
          </div>

          {/* Input Field Baris 2*/}
          <div className="w-full flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                text=<span>Nis</span>
                value={setSiswa.nis}
                variant="biasa_text_sm_disabled"
                readonly
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                text=<span>NISN</span>
                value={setSiswa.nisn}
                variant="biasa_text_sm_disabled"
                readonly
              ></FieldInput>
            </div>
          </div>

          {/* Input Field Baris 3*/}
          <div className="w-full flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                text=<span>Tempat Lahir</span>
                value={setSiswa.tempat_lahir}
                variant="biasa_text_sm_disabled"
                readonly
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                text=<span>Tanggal Lahir</span>
                value={setSiswa.tgl_lahir}
                variant="biasa_text_sm_disabled"
                readonly
              ></FieldInput>
            </div>
          </div>

          {/* Input Field Baris 4*/}
          <div className="w-full flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                text=<span>Agama</span>
                value={setSiswa.agama}
                variant="biasa_text_sm_disabled"
                readonly
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                text=<span>Jenis Kelamin</span>
                value={setSiswa.kelamin}
                variant="biasa_text_sm_disabled"
                readonly
              ></FieldInput>
            </div>
          </div>

          <div className="w-full">
            <Textarea
              text=<span>Alamat</span>
              value={setSiswa.alamat}
              variant="disabled"
              readonly
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
                text=<span>Nama Lengkap</span>
                readonly
                value={setSiswa.nama_ayah}
                variant="biasa_text_sm_disabled"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                text=<span>Nik</span>
                readonly
                value={setSiswa.nik_ayah}
                variant="biasa_text_sm_disabled"
              ></FieldInput>
            </div>
          </div>

          {/* Input Field Baris 2*/}
          <div className="w-full flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                text=<span>Tempat Lahir</span>
                readonly
                value={setSiswa.tempat_lahir_ayah}
                variant="biasa_text_sm_disabled"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                type="date"
                text=<span>Tanggal Lahir</span>
                readonly
                value={formatDateToInput(setSiswa.tgl_lahir_ayah)}
                variant="biasa_text_sm_disabled"
              ></FieldInput>
            </div>
          </div>

          {/* Input Field Baris 3*/}
          <div className="w-full flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                text=<span>Pekerjaan</span>
                readonly
                value={setSiswa.pekerjaan_ayah}
                variant="biasa_text_sm_disabled"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                text=<span>No Handphone</span>
                readonly
                value={setSiswa.no_ayah}
                variant="biasa_text_sm_disabled"
              ></FieldInput>
            </div>
          </div>

          <div className="w-full">
            <Textarea
              text=<span>Alamat</span>
              value={setSiswa.alamat_ayah}
              variant="disabled"
              readonly
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
                text=<span>Nama Lengkap</span>
                readonly
                value={setSiswa.nama_ibu}
                variant="biasa_text_sm_disabled"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                text=<span>Nik</span>
                readonly
                value={setSiswa.nik_ibu}
                variant="biasa_text_sm_disabled"
              ></FieldInput>
            </div>
          </div>

          {/* Input Field Baris 2*/}
          <div className="w-full flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                text=<span>Tempat Lahir</span>
                readonly
                value={setSiswa.tempat_lahir_ibu}
                variant="biasa_text_sm_disabled"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                type="date"
                text=<span>Tanggal Lahir</span>
                readonly
                value={formatDateToInput(setSiswa.tgl_lahir_ibu)}
                variant="biasa_text_sm_disabled"
              ></FieldInput>
            </div>
          </div>

          {/* Input Field Baris 3*/}
          <div className="w-full flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                text=<span>Pekerjaan</span>
                readonly
                value={setSiswa.pekerjaan_ibu}
                variant="biasa_text_sm_disabled"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                text=<span>No Handphone</span>
                readonly
                value={setSiswa.no_ibu}
                variant="biasa_text_sm_disabled"
              ></FieldInput>
            </div>
          </div>

          <div className="w-full">
            <Textarea
              text=<span>Alamat</span>
              value={setSiswa.alamat_ibu}
              variant="disabled"
              readonly
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
                text=<span>Nama Lengkap</span>
                readonly
                value={setSiswa.nama_wali ? setSiswa.nama_wali : "-"}
                variant="biasa_text_sm_disabled"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                text=<span>Nik</span>
                readonly
                value={setSiswa.nik_wali ? setSiswa.nik_wali : "-"}
                variant="biasa_text_sm_disabled"
              ></FieldInput>
            </div>
          </div>

          {/* Input Field Baris 2*/}
          <div className="w-full flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                type="text"
                text=<span>Tempat Lahir</span>
                readonly
                value={
                  setSiswa.tempat_lahir_wali ? setSiswa.tempat_lahir_wali : "-"
                }
                variant="biasa_text_sm_disabled"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                type="date"
                text=<span>Tanggal Lahir</span>
                readonly
                value={
                  setSiswa.tgl_lahir_wali
                    ? formatDateToInput(setSiswa.tgl_lahir_wali)
                    : ""
                }
                variant="biasa_text_sm_disabled"
              ></FieldInput>
            </div>
          </div>

          {/* Input Field Baris 3*/}
          <div className="w-full flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                text=<span>Pekerjaan</span>
                readonly
                value={setSiswa.pekerjaan_wali ? setSiswa.pekerjaan_wali : "-"}
                variant="biasa_text_sm_disabled"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                text=<span>No Handphone</span>
                readonly
                value={setSiswa.no_wali ? setSiswa.no_wali : "-"}
                variant="biasa_text_sm_disabled"
              ></FieldInput>
            </div>
          </div>

          <div className="w-full">
            <Textarea
              text=<span>Alamat</span>
              value={setSiswa.alamat_wali ? setSiswa.alamat_wali : "-"}
              variant="disabled"
              readonly
            ></Textarea>
          </div>

          {/* Button */}
          <div className="flex justify-end items-center mt-10">
            <div className="me-2">
              <ButtonHref
                text="Kembali"
                variant="tambah"
                href={`/dashboard/siswa/${encodeURIComponent(
                  data.nama_kelas
                )}/${encodeURIComponent(data.tingkat)}`}
              ></ButtonHref>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
