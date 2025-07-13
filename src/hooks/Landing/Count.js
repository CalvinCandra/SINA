import axios from "axios";
import { useEffect, useState } from "react";
import baseUrl from "../../utils/config/baseUrl";

export const useCount = () => {
  const [dataCountSiswa, setDataCountSiswa] = useState("");
  const [dataCountAdmin, setDataCountAdmin] = useState("");
  const [dataCountAlumni, setDataCountAlumni] = useState("");
  const [dataCountGuru, setDataCountGuru] = useState("");

  const fetchData = async () => {
    try {
      const responseCountSiswa = await axios.get(
        `${baseUrl.apiUrl}/admin/count/siswa`
      );

      const responseCountGuru = await axios.get(
        `${baseUrl.apiUrl}/admin/count/guru`
      );

      const responseCountAdmin = await axios.get(
        `${baseUrl.apiUrl}/admin/count/admin`
      );

      const responseCountAlumni = await axios.get(
        `${baseUrl.apiUrl}/admin/count/alumni`
      );

      if (responseCountGuru.status == 200 && responseCountSiswa.status == 200) {
        setDataCountSiswa(responseCountSiswa.data.total_siswa);
        setDataCountGuru(responseCountGuru.data.total_guru);
        setDataCountAdmin(responseCountAdmin.data.total_admin);
        setDataCountAlumni(responseCountAlumni.data.total_alumni);
      }
    } catch (error) {
      console.log(error);
      setToastMessage("Error Count Data");
      setToastVariant("error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    dataCountGuru,
    dataCountSiswa,
    dataCountAdmin,
    dataCountAlumni,
  };
};
