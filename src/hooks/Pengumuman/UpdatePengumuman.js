import axios from "axios";
import baseUrl from "../../utils/config/baseUrl";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const useUpdatePengumuman = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Gambar, setGambar] = useState(null);
  const [fileName, setFileName] = useState("");
  const [kategori, setKategori] = useState("");
  const [judul, setJudul] = useState("");
  const [deskirpsi, setDeskripsi] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  // get token
  const token = sessionStorage.getItem("session");

  const kategoriOptions = [
    { value: "berita", label: "Berita" },
    { value: "pengumuman", label: "Pengumuman" },
  ];

  const fetchData = async (e) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${baseUrl.apiUrl}/admin/berita/${id}`, {
        headers: {
          Authorization: `Beazer ${token}`,
        },
      });

      if (response.status == 200 || response.status == 201) {
        setDeskripsi(response.data.isi);
        setJudul(response.data.judul);
        setGambar(response.data.foto);
        setKategori(response.data.tipe);
        const namaFile = response.data.foto.split("/").pop();
        setFileName(namaFile);
      }
    } catch (error) {
      console.error("Gagal mengambil data:", error);
      setToastMessage("Gagal mengambil data");
      setToastVariant("error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      const fileSizeLimit = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        setToastMessage("File harus berformat PNG, JPG, atau JPEG");
        setToastVariant("error");
        return;
      }

      if (file.size > fileSizeLimit) {
        setToastMessage("Ukuran file terlalu besar. Maksimum 5MB.");
        setToastVariant("error");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setGambar(file);
        setFileName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setToastMessage("");
    setToastVariant("");

    if (judul.trim() === "") {
      setTimeout(() => {
        setToastMessage("Judul tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }

    if (deskirpsi.trim() === "") {
      setTimeout(() => {
        setToastMessage("Deskripsi tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }

    if (kategori.trim() === "") {
      setTimeout(() => {
        setToastMessage("Kategori  tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }

    if (!Gambar) {
      setTimeout(() => {
        setToastMessage("Gambar tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("judul", judul);
      formData.append("isi", deskirpsi);
      formData.append("foto", Gambar);
      formData.append("tipe", kategori);

      const response = await axios.put(
        `${baseUrl.apiUrl}/admin/berita/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        localStorage.setItem("informasiUpdate", "success");
        setTimeout(() => {
          setIsLoading(false);
          navigate("/dashboard/pengumuman");
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      // Menangani error yang dikirimkan oleh server
      let errorMessage = "Gagal";

      if (error.response && error.response.data.message) {
        // Jika error dari server ada di response.data
        if (error.response.data.message) {
          errorMessage = error.response.data.message; // Tampilkan pesan dari server jika ada
        }
      } else {
        // Jika error tidak ada response dari server
        errorMessage = error.message;
      }

      setIsLoading(false);
      setToastMessage(errorMessage);
      setToastVariant("error");
    }
  };

  return {
    isLoading,
    toastMessage,
    toastVariant,
    judul,
    setJudul,
    kategori,
    setKategori,
    deskirpsi,
    setDeskripsi,
    fileName,
    kategoriOptions,
    handleImageChange,
    handleSubmit,
  };
};
