import React from "react";
import { useState, useEffect } from "react";
import FieldInput from "../../../../component/Input/FieldInput";
import SelectField from "../../../../component/Input/SelectField";
import DataPelajaran from "../../../../data/Akademik/Mata Pelajaran/DataPelajaran";
import DataGuruu from "../../../../data/Guru/DataGuruu";
import ButtonHref from "../../../../component/Button/ButtonHref";
import Button from "../../../../component/Button/Button";
import Toast from "../../../../component/Toast/Toast";
import Loading from "../../../../component/Loading/Loading";
import { useParams, useNavigate } from "react-router-dom";

export default function EditJadwalKelas() {
  const data = useParams();
  console.log(localStorage.getItem("jadwalList"));
  const navigate = useNavigate();

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
    {
      sesi: 1,
      jamMulai: "07.15",
      jamSelesai: "08.00",
      label: "1 (07.15 – 08.00)",
    },
    {
      sesi: 2,
      jamMulai: "08.00",
      jamSelesai: "08.45",
      label: "2 (08.00 – 08.45)",
    },
    {
      sesi: 3,
      jamMulai: "08.45",
      jamSelesai: "09.30",
      label: "3 (08.45 – 09.30)",
    },
    {
      sesi: 4,
      jamMulai: "09.30",
      jamSelesai: "10.15",
      label: "4 (09.30 – 10.15)",
    },
    {
      sesi: 5,
      jamMulai: "10.15",
      jamSelesai: "11.00",
      label: "5 (10.15 – 11.00)",
    },
    {
      sesi: 6,
      jamMulai: "11.00",
      jamSelesai: "11.45",
      label: "6 (11.00 – 11.45)",
    },
    {
      sesi: 7,
      jamMulai: "11.45",
      jamSelesai: "12.30",
      label: "7 (11.45 – 12.30)",
    },
    {
      sesi: 8,
      jamMulai: "12.30",
      jamSelesai: "13.15",
      label: "8 (12.30 – 13.15)",
    },
    {
      sesi: 9,
      jamMulai: "13.15",
      jamSelesai: "14.00",
      label: "9 (13.15 – 14.00)",
    },
    {
      sesi: 10,
      jamMulai: "14.00",
      jamSelesai: "14.45",
      label: "10 (14.00 – 14.45)",
    },
  ];

  // Variabel untuk menyimpan data jadwal
  const [namaMapel, setNamaMapel] = useState("");
  const [pengajar, setNamaGuru] = useState("");
  const [ruangan, setRuangan] = useState("");
  const [jamMulai, setJamMulai] = useState("");
  const [jamSelesai, setJamSelesai] = useState("");
  const [hari, setHari] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  const keyKelas = `${decodeURIComponent(data.nama_kelas)} ${decodeURIComponent(
    data.tingkat
  )}`;

  useEffect(() => {
    const storedJadwalList = localStorage.getItem("jadwalList");
    if (storedJadwalList) {
      const parsed = JSON.parse(storedJadwalList);
      const list = parsed[keyKelas] || [];
      const detail = list.find(
        (j) => String(j.id) === decodeURIComponent(data.id)
      );

      if (detail) {
        setNamaMapel(detail.nama_mapel);
        setNamaGuru(detail.pengajar);

        const jadwalData = detail.jadwal || {};
        const jadwalArray = [];

        // Ubah object jadwal per hari menjadi array form-friendly
        Object.entries(jadwalData).forEach(([hari, sesiList]) => {
          if (!sesiList || !sesiList.length) return;

          // Sort sesi dari terkecil ke terbesar
          const sesiSorted = [...sesiList].sort((a, b) => a.sesi - b.sesi);

          // Ambil jam dari sesi pertama dan terakhir
          const jamAwal = sesiSorted[0].jam.split("–")[0].trim();
          const jamAkhir = sesiSorted[sesiSorted.length - 1].jam
            .split("–")[1]
            .trim();

          jadwalArray.push({
            hari,
            jamMulai: jamAwal,
            jamSelesai: jamAkhir,
            ruangan: sesiSorted[0].ruangan,
          });
        });

        setJadwalList(jadwalArray);
        console.log("Jadwal detail ditemukan:", detail);
        console.log("JadwalList hasil parsing:", jadwalArray);
      }
    }
  }, [data, keyKelas]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // reset pesan toast
    setToastMessage("");
    setToastVariant("");

    // kumpulan field yang harus diisi
    const requiredFields = [
      namaMapel,
      pengajar,
      ruangan,
      jamMulai,
      jamSelesai,
      hari,
    ];

    const isAnyEmpty = requiredFields.some((field) => {
      return !String(field).trim();
    });

    if (isAnyEmpty) {
      setTimeout(() => {
        setToastMessage("Silahkan isi semua field yang dibutuhkan");
        setToastVariant("error");
      }, 10);
      return;
    }

    setIsLoading(true);

    const key = `${decodeURIComponent(data.nama_kelas)} ${decodeURIComponent(
      data.tingkat
    )}`;
    const stored = JSON.parse(localStorage.getItem("jadwalList") || "{}");
    const existing = stored[key] || [];

    const updateJadwal = existing.map((item) =>
      item.id === parseInt(data.id)
        ? {
            ...item,
            nama_mapel: namaMapel,
            pengajar: pengajar,
            ruangan: ruangan,
            jam_mulai: jamMulai,
            jam_selesai: jamSelesai,
            hari: hari,
          }
        : item
    );

    // tambahkan jadwal baru
    const update = {
      ...stored,
      [key]: updateJadwal,
    };

    localStorage.setItem("jadwalList", JSON.stringify(update));

    localStorage.setItem("jadwalUpdate", "success");
    setTimeout(() => {
      setIsLoading(false);
      navigate(
        `/dashboard/akademik/jadwal-kelas/${encodeURIComponent(
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
          <p className="font-semibold text-lg">Edit Jadwal Pelajaran</p>
        </div>

        <hr className="border-border-grey border"></hr>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Input Field */}
          <div className="w-full mt-5">
            <SelectField
              text="Nama Mata Pelajaran"
              option={mapel}
              value={namaMapel}
              onChange={(e) => setNamaMapel(e.target.value)}
            ></SelectField>
          </div>
          <div className="w-full mt-3">
            <SelectField
              text="Guru Pengampu"
              option={guru}
              value={pengajar}
              onChange={(e) => setNamaGuru(e.target.value)}
            ></SelectField>
          </div>
          <hr className="border-border-black border my-8"></hr>
          {jadwalList.map((item, index) => (
            <div key={index} className="w-full space-y-4 mb-6">
              <div>Jam Mulai: {item.jamMulai}</div>
              <div>Jam Selesai: {item.jamSelesai}</div>
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
              {console.log(item)}
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
                href={`/dashboard/akademik/jadwal-kelas/${encodeURIComponent(
                  data.nama_kelas
                )}/${encodeURIComponent(data.tingkat)}`}
              ></ButtonHref>
            </div>
            <div className="w-40">
              <Button
                text={isLoading ? <Loading /> : "Perbaharui Jadwal"}
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
