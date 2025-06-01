import { useState, useEffect } from "react";
import FieldInput from "../../../component/Input/FieldInput";
import ButtonHref from "../../../component/Button/ButtonHref";
import Textarea from "../../../component/Input/Textarea";
import { useParams } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../../utils/config/baseUrl";
import Toast from "../../../component/Toast/Toast";

export default function DetailSiswa() {
  const { kelas_id, nis } = useParams();
  const [siswa, setdataSiswa] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  const token = sessionStorage.getItem("session");

  //konver tgl dari misalnya 2012-12-11T17:00:00.000Z menjadi 11/12/2019
  const formatDateToInput = (tanggalString) => {
    if (!tanggalString) return "";

    const date = new Date(tanggalString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl.apiUrl}/admin/siswa/${nis}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status == 200) {
          setdataSiswa(response.data);
        }
      } catch (error) {
        console.log(error);
        setToastMessage("Gagal ambil data");
        setToastVariant("error");
      }
    };

    fetchData();
  }, [nis]);

  return (
    <div className="lg:py-5">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg">
            Detail Data Siswa {siswa.nama_siswa}
          </p>
        </div>

        <hr className="border-border-grey border"></hr>

        <div>
          {/* Gambar */}
          <div className="flex flex-col justify-center items-center">
            <div className="p-1 w-60 h-64 my-3 overflow-hidden">
              <img
                src={
                  siswa.foto_profil
                    ? `${baseUrl.apiUrlImage}/Upload/profile_image/${siswa.foto_profil}`
                    : "https://manbengkuluselatan.sch.id/assets/img/profile/default.jpg"
                }
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
                value={siswa.nama_siswa}
                variant="biasa_text_sm_disabled"
                readonly
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                text=<span>Email</span>
                value={siswa.email ? siswa.email : "-"}
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
                value={siswa.nis}
                variant="biasa_text_sm_disabled"
                readonly
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                text=<span>NISN</span>
                value={siswa.nisn}
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
                value={siswa.tempat_lahir}
                variant="biasa_text_sm_disabled"
                readonly
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                type="date"
                text=<span>Tanggal Lahir</span>
                value={formatDateToInput(siswa.tanggal_lahir)}
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
                value={siswa.agama}
                variant="biasa_text_sm_disabled"
                readonly
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                text=<span>Jenis Kelamin</span>
                value={siswa.jenis_kelamin}
                variant="biasa_text_sm_disabled"
                readonly
              ></FieldInput>
            </div>
          </div>

          <div className="w-full">
            <Textarea
              text=<span>Alamat</span>
              value={siswa.alamat}
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
                value={siswa.ayah_nama}
                variant="biasa_text_sm_disabled"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                text=<span>Nik</span>
                readonly
                value={siswa.ayah_nik}
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
                value={siswa.ayah_tempat_lahir}
                variant="biasa_text_sm_disabled"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                type="date"
                text=<span>Tanggal Lahir</span>
                value={formatDateToInput(siswa.ayah_tanggal_lahir)}
                variant="biasa_text_sm_disabled"
                readonly
              ></FieldInput>
            </div>
          </div>

          {/* Input Field Baris 3*/}
          <div className="w-full flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                text=<span>Pekerjaan</span>
                readonly
                value={siswa.ayah_pekerjaan}
                variant="biasa_text_sm_disabled"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                text=<span>No Handphone</span>
                readonly
                value={siswa.ayah_no_telepon}
                variant="biasa_text_sm_disabled"
              ></FieldInput>
            </div>
          </div>

          <div className="w-full">
            <Textarea
              text=<span>Alamat</span>
              value={siswa.ayah_alamat}
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
                value={siswa.ibu_nama}
                variant="biasa_text_sm_disabled"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                text=<span>Nik</span>
                readonly
                value={siswa.ibu_nik}
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
                value={siswa.ibu_tempat_lahir}
                variant="biasa_text_sm_disabled"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                type="date"
                text=<span>Tanggal Lahir</span>
                value={formatDateToInput(siswa.ibu_tanggal_lahir)}
                variant="biasa_text_sm_disabled"
                readonly
              ></FieldInput>
            </div>
          </div>

          {/* Input Field Baris 3*/}
          <div className="w-full flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                text=<span>Pekerjaan</span>
                readonly
                value={siswa.ibu_pekerjaan}
                variant="biasa_text_sm_disabled"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                text=<span>No Handphone</span>
                readonly
                value={siswa.ibu_no_telepon}
                variant="biasa_text_sm_disabled"
              ></FieldInput>
            </div>
          </div>

          <div className="w-full">
            <Textarea
              text=<span>Alamat</span>
              value={siswa.ibu_alamat}
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
                value={siswa.wali_nama ? siswa.wali_nama : "-"}
                variant="biasa_text_sm_disabled"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                text=<span>Nik</span>
                readonly
                value={siswa.wali_nik ? siswa.wali_nik : "-"}
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
                value={siswa.wali_tempat_lahir ? siswa.wali_tempat_lahir : "-"}
                variant="biasa_text_sm_disabled"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                type="date"
                text=<span>Tanggal Lahir</span>
                readonly
                value={
                  siswa.wali_tanggal_lahir
                    ? formatDateToInput(siswa.wali_tanggal_lahir)
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
                value={siswa.wali_pekerjaan ? siswa.wali_pekerjaan : "-"}
                variant="biasa_text_sm_disabled"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                text=<span>No Handphone</span>
                readonly
                value={siswa.wali_no_telepon ? siswa.wali_no_telepon : "-"}
                variant="biasa_text_sm_disabled"
              ></FieldInput>
            </div>
          </div>

          <div className="w-full">
            <Textarea
              text=<span>Alamat</span>
              value={siswa.wali_alamat ? siswa.wali_alamat : "-"}
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
                href={`/dashboard/siswa/${kelas_id}`}
              ></ButtonHref>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
