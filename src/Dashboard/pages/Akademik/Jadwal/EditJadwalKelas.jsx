import React from "react";
import { useState } from "react";
import FieldInput from "../../../../component/Input/FieldInput";
import SelectField from "../../../../component/Input/SelectField";
import DataPelajaran from "../../../../data/Akademik/Mata Pelajaran/DataPelajaran";
import DataGuruu from "../../../../data/Guru/DataGuruu";
import ButtonHref from "../../../../component/Button/ButtonHref";
import Button from "../../../../component/Button/Button";

export default function EditJadwalKelas() {
  const [jadwalList, setJadwalList] = useState([
    { hari: "", jamMulai: "", jamSelesai: "", ruangan: "" },
  ]);

  const tambahFormHari = () => {
    setJadwalList([
      ...jadwalList,
      { hari: "", jamMulai: "", jamSelesai: "", ruangan: "" },
    ]);
  };

  const mapel = DataPelajaran.map((item) => ({
    value: item.mata_pelajar,
    label: item.mata_pelajar,
  }));
  const guru = DataGuruu.map((item) => ({
    value: item.nama,
    label: item.nama,
  }));

  const hariOptions = [
    { value: "Senin", label: "Senin" },
    { value: "Selasa", label: "Selasa" },
    { value: "Rabu", label: "Rabu" },
    { value: "Kamis", label: "Kamis" },
    { value: "Jumat", label: "Jumat" },
    { value: "Sabtu", label: "Sabtu" },
  ];

  const jamOptions = [
    { value: "1", label: "1 (07:50 - 08:45)" },
    { value: "2", label: "2 (08:45 - 09:30)" },
    { value: "3", label: "3 (09:45 - 10:30)" },
    { value: "4", label: "4 (10:30 - 11:15)" },
    { value: "5", label: "5 (11:30 - 12:15)" },
    { value: "6", label: "6 (12:45 - 13:30)" },
  ];

  const [namaMapel, setNamaMapel] = useState("");
  const [namaGuru, setNamaGuru] = useState("");
  return (
    <div className="lg:py-5">
      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg">Edit Jadwal Pelajaran</p>
        </div>

        <hr className="border-border-grey border"></hr>

        {/* Form */}
        <form>
          {/* Input Field */}
          <div className="w-full mt-5">
            <SelectField
              text="Nama Kurikulum"
              option={mapel}
              value={namaMapel}
              onChange={(e) => setNamaMapel(e.target.value)}
            ></SelectField>
          </div>
          <div className="w-full mt-3">
            <SelectField
              text="Guru Pengampu"
              option={guru}
              value={namaGuru}
              onChange={(e) => setNamaGuru(e.target.value)}
            ></SelectField>
          </div>
          <hr className="border-border-black border my-8"></hr>
          {jadwalList.map((item, index) => (
            <div key={index} className="w-full space-y-4 mb-6">
              <SelectField
                text={`Hari ke-${index + 1}`}
                option={hariOptions}
                value={item.hari}
                onChange={(e) => {
                  const newList = [...jadwalList];
                  newList[index].hari = e.target.value;
                  setJadwalList(newList);
                }}
              />

              <div className="flex flex-col md:flex-row gap-10 mb-0 ">
                <div className="w-full md:w-1/2">
                  <SelectField
                    text="Jam Mulai"
                    option={jamOptions}
                    value={item.jamMulai}
                    onChange={(e) => {
                      const newList = [...jadwalList];
                      newList[index].jamMulai = e.target.value;
                      setJadwalList(newList);
                    }}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <SelectField
                    text="Jam Selesai"
                    option={jamOptions}
                    value={item.jamSelesai}
                    onChange={(e) => {
                      const newList = [...jadwalList];
                      newList[index].jamSelesai = e.target.value;
                      setJadwalList(newList);
                    }}
                  />
                </div>
              </div>

              <div className="w-full ">
                <FieldInput
                  text=<span>
                    Ruangan <span className="text-red-500">*</span>
                  </span>
                  type="text"
                  name={`ruangan-${index}`}
                  value={item.ruangan}
                  onChange={(e) => {
                    const newList = [...jadwalList];
                    newList[index].ruangan = e.target.value;
                    setJadwalList(newList);
                  }}
                  variant="biasa_text_sm"
                />
              </div>
              <hr className="border-border-black border my-8"></hr>
            </div>
          ))}

          <div className="mt-4">
            <button
              type="button"
              onClick={tambahFormHari}
              className="border border-blue-500 hover:bg-blue-200 text-black text-sm font-semibold px-4 py-2 rounded-md"
            >
              + Tambah Hari
            </button>
          </div>
          {/* Button */}
          <div className="flex justify-end items-center mt-10">
            <div className="me-2">
              <ButtonHref
                text="Batal"
                variant="cancel"
                href="/dashboard/pengumuman"
              ></ButtonHref>
            </div>
            <div className="w-40">
              <Button text="Tambah" variant="button_submit_dash"></Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
