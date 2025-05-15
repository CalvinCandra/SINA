import React, { useState } from "react";
import Calender from "../../../components/Calender/Calender";
import SelectField from "../../../../component/Input/SelectField";
import Search from "../../../../component/Input/Search";
import ButtonHref from "../../../../component/Button/ButtonHref";
import { PencilSquareIcon } from "@heroicons/react/16/solid";

export default function AbsenGuru() {
  const tahunoptions = [
    { value: "2023/2024 Genap", label: "2023/2024 Genap" },
    { value: "2023/2024 Ganjil", label: "2023/2024 Ganjil" },
    { value: "2024/2025 Genap", label: "2024/2025 Ganjil" },
  ];

  const [tahunAkademik, setTahunAkademik] = useState("");

  return (
    <div className="lg:py-5">
      <div className="flex flex-col lg:flex-row w-full justify-between items-center">
        <h2 className="text-2xl font-semibold">Data Absensi Guru</h2>
        <Calender className="w-40 lg:w-full"></Calender>
      </div>

      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* header tabel */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center -mb-0.5">
          <SelectField
            text="Tahun Akademik"
            option={tahunoptions}
            value="2023/2024 Genap"
            onChange={(e) => setTahunAkademik(e.target.value)}
          />
          <Search className="bg-white"></Search>
        </div>

        <hr className="border-border-grey border"></hr>

        {/* tabel */}
        <div className="overflow-x-auto wf-full">
          <table className="table w-full">
            <thead>
              <tr className="border-b border-t border-border-grey">
                <td>No</td>
                <td>Nama</td>
                <td>NIP</td>
                <td>H</td>
                <td>I</td>
                <td>S</td>
                <td>A</td>
                <td>Aksi</td>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border-grey">
                <td>1</td>
                <td>John Doe</td>
                <td>123456789</td>
                <td>1</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>
                  <div className="flex">
                    <ButtonHref
                      href={`/dashboard/guru/absen/update`}
                      variant="update"
                      text={
                        <PencilSquareIcon className="w-5 h-5 text-amber-300"></PencilSquareIcon>
                      }
                    ></ButtonHref>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
