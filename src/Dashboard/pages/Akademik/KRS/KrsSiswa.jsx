import { useEffect, useState } from "react";
import Calender from "../../../components/Calender/Calender";
import ButtonHref from "../../../../component/Button/ButtonHref";
import Search from "../../../../component/Input/Search";
import DataSiswa from "../../../../data/Siswa/DataSiswa";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import { useParams } from "react-router-dom";

export default function DataSiswaPage() {
  const kelas = useParams(); // Ambil kelas dan tingkat dari URL
  const [dataKrs, setdataKrs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;

  useEffect(() => {
    const fetchData = () => {
      const storedData = localStorage.getItem("krsList");
      const key = `${decodeURIComponent(kelas.nama_kelas)} ${decodeURIComponent(
        kelas.tingkat
      )}`;

      let finalData = [];

      if (!storedData || storedData === "undefined") {
        const newData = DataSiswa[key] || [];
        localStorage.setItem("krsList", JSON.stringify({ [key]: newData }));
        finalData = newData;
      } else {
        try {
          const parsed = JSON.parse(storedData);
          finalData = parsed[key] || [];
        } catch (e) {
          console.error("Data rusak:", e);
        }
      }

      setdataKrs(finalData);
    };

    // Memanggil fetchData untuk mendapatkan data siswa
    fetchData();
  }, [kelas]);

  // Pagination
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = dataKrs
    .sort((a, b) => b.id - a.id)
    .slice(indexOfFirstData, indexOfLastData);
  const totalPages = Math.ceil(dataKrs.length / dataPerPage);

  return (
    <>
      <div className="lg:py-5">
        <div className="flex flex-col lg:flex-row w-full lg:justify-between items-center">
          <div className="flex items-center">
            <div className="me-3">
              <ButtonHref
                text=<ArrowLeftCircleIcon className="w-6 h-6 "></ArrowLeftCircleIcon>
                href="/dashboard/akademik/krs"
              />
            </div>
            <h2 className="text-2xl font-semibold mb-3 lg:mb-0">
              Data Siswa {decodeURIComponent(kelas.nama_kelas)}{" "}
              {decodeURIComponent(kelas.tingkat)}
            </h2>
          </div>
          <Calender className="w-40 lg:w-full"></Calender>
        </div>

        <div className="w-full p-5 rounded-md bg-white mt-5">
          <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
            <Search className="bg-white" />
          </div>

          <hr className="border-border-grey border" />

          <div className="overflow-x-auto w-full">
            {currentData && currentData.length > 0 ? (
              <table className="table w-full">
                <thead>
                  <tr className="border-b border-t border-border-grey">
                    <th>No</th>
                    <th>Nama</th>
                    <th>NISN</th>
                    <th>NIS</th>
                    <th>Jenis Kelamin</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((data, index) => (
                    <tr
                      className="border-b border-t border-border-grey"
                      key={data.id}
                    >
                      <td>{indexOfFirstData + index + 1}</td>
                      <td className="whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-circle w-12 h-12">
                              <img
                                src={
                                  data.image ||
                                  "https://manbengkuluselatan.sch.id/assets/img/profile/default.jpg"
                                }
                                alt="Avatar"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{data.nama}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap">{data.nisn}</td>
                      <td className="whitespace-nowrap">{data.nis}</td>
                      <td className="whitespace-nowrap">{data.kelamin}</td>
                      <td>
                        <div className="flex items-center justify-between w-14">
                          <a
                            href="/pdf/krs.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center hover:underline text-sky-500 cursor-pointer"
                          >
                            <DocumentMagnifyingGlassIcon className="w-5 h-5 me-2" />
                            Preview
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="italic text-gray-400 mt-5 text-center">
                Data Siswa Belum Ada
              </div>
            )}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex flex-col lg:flex-row justify-between items-center w-full my-4">
          <p className="text-sm mb-3 lg:mb-0">
            Menampilkan Data {indexOfFirstData + 1} -{" "}
            {indexOfLastData > dataKrs.length
              ? dataKrs.length
              : indexOfLastData}{" "}
            dari {dataKrs.length} Data Siswa{" "}
            {decodeURIComponent(kelas.nama_kelas)}{" "}
            {decodeURIComponent(kelas.tingkat)}
          </p>
          <div className="join">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`join-item btn border-0 ${
                  currentPage === index + 1
                    ? "bg-biru-primary text-white"
                    : "bg-gray-200 text-black"
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
