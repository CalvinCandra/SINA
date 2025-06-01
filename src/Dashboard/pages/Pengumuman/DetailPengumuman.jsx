import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ButtonHref from "../../../component/Button/ButtonHref";
import axios from "axios";
import baseUrl from "../../../utils/config/baseUrl";

export default function DetailPengumuman() {
  const { id } = useParams();
  const [Gambar, setGambar] = useState("");
  const [Judul, setJudul] = useState("");
  const [deskirpsi, setDeskripsi] = useState("");
  const [kategori, setKategori] = useState("");
  const [username, setUsername] = useState("");
  const [tgl, setTgl] = useState("");

  // fomat datetime
  const formatTanggalLengkap = (tanggalISO) => {
    const tanggal = new Date(tanggalISO);

    const bulanMap = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const hari = tanggal.getDate();
    const bulan = bulanMap[tanggal.getMonth()];
    const tahun = tanggal.getFullYear();

    return `${hari} ${bulan} ${tahun}`;
  };

  // token
  const token = sessionStorage.getItem("session");

  useEffect(() => {
    const fetchData = async (e) => {
      try {
        const response = await axios.get(
          `${baseUrl.apiUrl}/admin/berita/${id}`,
          {
            headers: {
              Authorization: `Beazer ${token}`,
            },
          }
        );

        console.log(response.data);

        if (response.status == 200 || response.status == 201) {
          setDeskripsi(response.data.isi);
          setJudul(response.data.judul);
          setGambar(response.data.foto);
          setUsername(response.data.username);
          setKategori(response.data.tipe);
          setTgl(formatTanggalLengkap(response.data.created_at));
        }
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        setToastMessage("Gagal mengambil data");
        setToastVariant("error");
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="lg:py-5">
      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg capitalize">
            Detail Informasi {kategori}
          </p>
        </div>

        <hr className="border-border-grey border"></hr>

        <div className="w-full mt-8">
          <img
            src={`${baseUrl.apiUrlImage}/Upload/berita/${Gambar}`}
            alt="gambar pengumuman"
            className="h-[384px] w-full rounded-md object-cover"
          />
          <p className="mt-8 font-medium text-base text-gray-400">
            Diupload {tgl} | Dibuat oleh {username}
          </p>
          <h1 className="mt-6 font-bold text-2xl">{Judul}</h1>
          <p
            className="mt-3 text-base text-justify"
            dangerouslySetInnerHTML={{ __html: deskirpsi }}
          ></p>
        </div>
        {/* Button */}
        <div className="flex justify-end items-center mt-10">
          <div className="">
            <ButtonHref
              text="Keluar"
              variant="cancel"
              href="/dashboard/pengumuman"
            ></ButtonHref>
          </div>
        </div>
      </div>
    </div>
  );
}
