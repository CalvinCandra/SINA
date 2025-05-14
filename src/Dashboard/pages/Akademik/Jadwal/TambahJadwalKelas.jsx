import React, { useState } from "react";
import FieldInput from "../../../../component/Input/FieldInput";
import SelectField from "../../../../component/Input/SelectField";
import DataPelajaran from "../../../../data/Akademik/Mata Pelajaran/DataPelajaran";
import DataGuruu from "../../../../data/Guru/DataGuruu";
import ButtonHref from "../../../../component/Button/ButtonHref";
import Button from "../../../../component/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../../component/Loading/Loading";
import Toast from "../../../../component/Toast/Toast";

export default function TambahJadwalKelas() {
  const dataKelas = useParams();
  const navigate = useNavigate();
  const key = `${decodeURIComponent(dataKelas.nama_kelas)} ${decodeURIComponent(
    dataKelas.tingkat
  )}`;
  const kelas = `${decodeURIComponent(
    dataKelas.nama_kelas
  )} ${decodeURIComponent(dataKelas.tingkat)}`;

  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

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
    { value: "1 (07.15 - 08.45)", label: "1 (07.15 - 08.45)" },
    { value: "2 (08.45 - 09.30)", label: "2 (08.45 - 09.30)" },
    { value: "3 (09.45 - 10.30)", label: "3 (09.45 - 10.30)" },
    { value: "4 (10.30 - 11.15)", label: "4 (10.30 - 11.15)" },
    { value: "5 (11.30 - 12.15)", label: "5 (11.30 - 12.15)" },
    { value: "6 (12.45 - 13.30)", label: "6 (12.45 - 13.30)" },
  ];

  const [namaMapel, setNamaMapel] = useState("");
  const [namaGuru, setNamaGuru] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = [
      namaMapel,
      namaGuru,
      ...jadwalList.map((item) => item.hari),
      ...jadwalList.map((item) => item.jamMulai),
      ...jadwalList.map((item) => item.jamSelesai),
      ...jadwalList.map((item) => item.ruangan),
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
    const jadwalObj = {};

    jadwalList.forEach((item) => {
      const hari = item.hari;

      const sesiMulai = parseInt(item.jamMulai.split(" ")[0]);
      const sesiSelesai = parseInt(item.jamSelesai.split(" ")[0]);

      for (let sesi = sesiMulai; sesi <= sesiSelesai; sesi++) {
        const jamLabel = jamOptions.find((j) =>
          j.value.startsWith(sesi.toString())
        )?.value;

        const jamRange = jamLabel?.match(/\((.*?)\)/)?.[1]; // Contoh: "07:15 - 08:00"
        const [jamAwal, jamAkhir] = jamRange?.split(" - ") || [];

        if (!jadwalObj[hari]) jadwalObj[hari] = [];

        jadwalObj[hari].push({
          jam: `${jamAwal} - ${jamAkhir}`,
          ruangan: item.ruangan,
          sesi: sesi,
        });
      }
    });

    // Buat jam gabungan awal-akhir
    const first = jadwalList[0];
    const sesiMulai = parseInt(first.jamMulai.split(" ")[0]);
    const sesiSelesai = parseInt(first.jamSelesai.split(" ")[0]);

    const jamAwal = jamOptions
      .find((j) => j.value.startsWith(sesiMulai.toString()))
      ?.value.match(/\((.*?)\)/)?.[1]
      .split(" - ")[0];

    const jamAkhir = jamOptions
      .find((j) => j.value.startsWith(sesiSelesai.toString()))
      ?.value.match(/\((.*?)\)/)?.[1]
      .split(" - ")[1];

    const jamGabung = `(${jamAwal} - ${jamAkhir})`;

    const stored = JSON.parse(localStorage.getItem("jadwalList")) || {};
    const existing = stored[key] || [];

    const lastId =
      existing.length > 0 ? Math.max(...existing.map((item) => item.id)) : 0;

    const newData = {
      id: lastId + 1,
      nama_mapel: namaMapel,
      jam: jamGabung,
      hari: jadwalList.map((j) => j.hari).join(", "),
      pengajar: namaGuru,
      kelas: kelas,
      jadwal: jadwalObj,
    };

    const tambah = {
      ...stored,
      [key]: [...existing, newData],
    };

    localStorage.setItem("jadwalList", JSON.stringify(tambah));
    localStorage.setItem("jadwalAdded", "success");

    setTimeout(() => {
      setIsLoading(false);
      navigate(
        `/dashboard/akademik/jadwal-kelas/${encodeURIComponent(
          dataKelas.nama_kelas
        )}/${encodeURIComponent(dataKelas.tingkat)}`
      );
    }, 2000);
  };

  return (
    <div className="lg:py-5">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="w-full p-5 rounded-md bg-white mt-5">
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg">Tambah Jadwal Pelajaran {key}</p>
        </div>
        <hr className="border-border-grey border"></hr>

        <form onSubmit={handleSubmit}>
          <div className="w-full mt-5">
            <SelectField
              text="Mata Pelajaran"
              option={mapel}
              value={namaMapel}
              onChange={(e) => setNamaMapel(e.target.value)}
            />
          </div>
          <div className="w-full mt-3">
            <SelectField
              text="Guru Pengampu"
              option={guru}
              value={namaGuru}
              onChange={(e) => setNamaGuru(e.target.value)}
            />
          </div>
          <hr className="border-border-black border my-8" />
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
              <div className="flex flex-col md:flex-row gap-10">
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
              <div className="w-full">
                <FieldInput
                  text={
                    <span>
                      Ruangan <span className="text-red-500">*</span>
                    </span>
                  }
                  type="text"
                  value={item.ruangan}
                  onChange={(e) => {
                    const newList = [...jadwalList];
                    newList[index].ruangan = e.target.value;
                    setJadwalList(newList);
                  }}
                  variant="biasa_text_sm"
                />
              </div>
              <hr className="border-border-black border my-8" />
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
          <div className="flex justify-end items-center mt-10">
            <div className="me-2">
              <ButtonHref
                text="Batal"
                variant="cancel"
                href="/dashboard/akademik/jadwal"
              />
            </div>
            <div className="w-40">
              <Button
                text={isLoading ? <Loading /> : "Tambah"}
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
