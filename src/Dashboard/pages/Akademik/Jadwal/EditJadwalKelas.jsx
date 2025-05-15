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
    { value: "1 (07.15 - 08.45)", label: "1 (07.15 - 08.45)" },
    { value: "2 (08.45 - 09.30)", label: "2 (08.45 - 09.30)" },
    { value: "3 (09.45 - 10.30)", label: "3 (09.45 - 10.30)" },
    { value: "4 (10.30 - 11.15)", label: "4 (10.30 - 11.15)" },
    { value: "5 (11.30 - 12.15)", label: "5 (11.30 - 12.15)" },
    { value: "6 (12.45 - 13.30)", label: "6 (12.45 - 13.30)" },
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

        Object.entries(jadwalData).forEach(([hari, sesiList]) => {
          if (!sesiList || !sesiList.length) return;

          // Sorting sesi berdasarkan nomor sesi
          const sesiSorted = [...sesiList].sort((a, b) => a.sesi - b.sesi);
          console.log(`Hari: ${hari}`);
          console.log("Sesi yang sudah diurutkan:", sesiSorted);

          // Ambil jam awal dan jam akhir dengan memeriksa tanda pemisah
          const jamAwal = sesiSorted[0].jam.split(/\s*-\s*/)[0]?.trim();
          const jamAkhir = sesiSorted[sesiSorted.length - 1].jam
            .split(" - ")[1]
            ?.trim();

          // Cari value yang cocok dengan jamAwal dan jamAkhir
          const jamMulaiValue =
            jamOptions.find((j) => j.value.includes(jamAwal))?.value || "";

          const jamSelesaiValue =
            jamOptions.find((j) => j.value.includes(jamAkhir))?.value || "";

          // Push ke array
          jadwalArray.push({
            hari,
            jamMulai: jamMulaiValue,
            jamSelesai: jamSelesaiValue,
            ruangan: sesiSorted[0].ruangan,
          });
        });

        setJadwalList(jadwalArray);
      }
    }
  }, [data, keyKelas]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // reset pesan toast
    setToastMessage("");
    setToastVariant("");

    // kumpulan field yang harus diisi
    const requiredFields = [namaMapel, pengajar];

    const isAnyEmpty = requiredFields.some((field) => {
      const isEmpty = !String(field).trim();
      if (isEmpty) {
        console.log(`Field kosong atau null: ${field}`);
      }
      return isEmpty;
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

    const generateJadwalObj = () => {
      const jadwal = {};

      jadwalList.forEach((item) => {
        if (!item.hari || !item.jamMulai || !item.jamSelesai || !item.ruangan)
          return;

        const sesiList = [];
        const jamOptionsFiltered = jamOptions.filter((opt) => {
          const currentIndex = jamOptions.findIndex(
            (o) => o.value === opt.value
          );
          const startIndex = jamOptions.findIndex(
            (o) => o.value === item.jamMulai
          );
          const endIndex = jamOptions.findIndex(
            (o) => o.value === item.jamSelesai
          );
          return currentIndex >= startIndex && currentIndex <= endIndex;
        });

        jamOptionsFiltered.forEach((opt, i) => {
          const sesi = parseInt(opt.value.split(" ")[0]); // sesi dari "1 (07.15 - 08.45)"
          sesiList.push({
            sesi,
            jam: opt.value.match(/\(([^)]+)\)/)?.[1], // ambil isi dalam kurung: "07.15 - 08.45"
            ruangan: item.ruangan,
          });
        });

        jadwal[item.hari] = sesiList;
      });

      return jadwal;
    };

    const updateJadwal = existing.map((item) =>
      item.id === parseInt(data.id)
        ? {
            ...item,
            nama_mapel: namaMapel,
            pengajar: pengajar,
            kelas: key,
            jadwal: generateJadwalObj(), // <-- ini penting!
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
          <p className="font-semibold text-lg">Perbaharui Jadwal Pelajaran</p>
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
                href={`/dashboard/akademik/jadwal-kelas/${encodeURIComponent(
                  data.nama_kelas
                )}/${encodeURIComponent(data.tingkat)}`}
              ></ButtonHref>
            </div>
            <div className="w-40">
              <Button
                text={isLoading ? <Loading /> : "Perbaharui"}
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
