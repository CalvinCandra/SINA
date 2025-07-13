import axios from "axios";
import { useEffect, useState } from "react";
import baseUrl from "../../utils/config/baseUrl";

export const useHighlight = () => {
  const [dataCountSiswa, setDataCountSiswa] = useState("");
  const [dataCountAdmin, setDataCountAdmin] = useState("");
  const [dataCountPengumuman, setDataCountPengumuman] = useState("");
  const [dataCountGuru, setDataCountGuru] = useState("");
  const [rekapSiswa, setRekapSiswa] = useState({});
  const [rekapGuru, setRekapGuru] = useState({});

  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  const token = sessionStorage.getItem("session");

  const fetchData = async () => {
    try {
      const responseCountSiswa = await axios.get(
        `${baseUrl.apiUrl}/admin/count/siswa`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseCountGuru = await axios.get(
        `${baseUrl.apiUrl}/admin/count/guru`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseCountAdmin = await axios.get(
        `${baseUrl.apiUrl}/admin/count/admin`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseCountInformasi = await axios.get(
        `${baseUrl.apiUrl}/admin/count/pengumuman`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseRekapAbsenSiswa = await axios.get(
        `${baseUrl.apiUrl}/admin/count/absensiswa`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseRekapAbsenGuru = await axios.get(
        `${baseUrl.apiUrl}/admin/count/absenguru`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (
        responseCountAdmin.status == 200 &&
        responseCountGuru.status == 200 &&
        responseCountInformasi.status == 200 &&
        responseCountSiswa.status == 200 &&
        responseRekapAbsenGuru.status == 200 &&
        responseRekapAbsenSiswa.status == 200
      ) {
        setDataCountSiswa(responseCountSiswa.data.total_siswa);
        setDataCountGuru(responseCountGuru.data.total_guru);
        setDataCountPengumuman(responseCountInformasi.data.total_pengumuman);
        setDataCountAdmin(responseCountAdmin.data.total_admin);
        setRekapGuru(responseRekapAbsenGuru.data);
        setRekapSiswa(responseRekapAbsenSiswa.data);
      }
    } catch (error) {
      console.log(error);
      setToastMessage("Error Count Data");
      setToastVariant("error");
    }
  };

  useEffect(() => {
    const statusLogin = localStorage.getItem("login");
    const statusUdpdate = localStorage.getItem("profile");

    if (statusLogin == "success") {
      setToastMessage("Berhasil Login");
      setToastVariant("success");
      localStorage.removeItem("login");
    }

    if (statusUdpdate == "success") {
      setToastMessage("Berhasil Update Profile");
      setToastVariant("success");
      localStorage.removeItem("profile");
    }

    fetchData();
  }, [token]);

  return {
    dataCountAdmin,
    dataCountGuru,
    dataCountPengumuman,
    dataCountSiswa,
    rekapGuru,
    rekapSiswa,
    toastMessage,
    toastVariant,
  };
};
