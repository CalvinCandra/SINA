import { useNavigate } from "react-router-dom";
import ImageImport from "../../data/ImageImport";
import baseUrl from "../../utils/config/baseUrl";
import axios from "axios";
import { getDefaultImageAsFile } from "../../utils/helper/defaultImage";
import { useState } from "react";

export const useTambahGuru = () => {
  // state
  const navigate = useNavigate();
  const defaultImage = ImageImport.defaultGambar;
  const [preview, setPreview] = useState("");
  const [namaGuru, setNamaGuru] = useState("");
  const [nipGuru, setNipGuru] = useState("");
  const [emailGuru, setEmailGuru] = useState("");
  const [telp, setTelp] = useState("");
  const [agamaGuru, setAgama] = useState("");
  const [tempat_lahir, setTempatLahir] = useState("");
  const [tgl_lahir, setTglLahir] = useState("");
  const [kelaminGuru, setKelamin] = useState("");
  const [Gambar, setGambar] = useState(null);
  const [alamat, setAlamat] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  // token
  const token = sessionStorage.getItem("session");

  // option agama
  const agamaOption = [
    {
      value: "hindu",
      label: "Hindu",
    },
    {
      value: "buddha",
      label: "Buddha",
    },
    {
      value: "katolik",
      label: "Katolik",
    },
    {
      value: "protestan",
      label: "Protestan",
    },
    {
      value: "islam",
      label: "Islam",
    },
    {
      value: "konghuchu",
      label: "Konghuchu",
    },
  ];

  // option jenis kelamin
  const kelaminOption = [
    {
      value: "laki-laki",
      label: "Laki - Laki",
    },
    {
      value: "perempuan",
      label: "Perempuan",
    },
  ];

  //   preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      const fileSizeLimit = 5 * 1024 * 1024; // 5MB limit

      if (!allowedTypes.includes(file.type)) {
        setToastMessage("File harus berformat PNG, JPG, atau JPEG");
        setToastVariant("error");
        document.getElementById("file-name").textContent = "No file chosen";
        return;
      }

      if (file.size > fileSizeLimit) {
        setToastMessage("Ukuran file terlalu besar. Maksimum 5MB.");
        setToastVariant("error");
        document.getElementById("file-name").textContent = "No file chosen";
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setGambar(file);
        document.getElementById("file-name").textContent = file.name;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // reset pesan toast terlebih dahulu
    setToastMessage("");
    setToastVariant("");

    // validasi
    if (
      namaGuru.trim() === "" ||
      emailGuru.trim() === "" ||
      telp.trim() === "" ||
      agamaGuru.trim() === "" ||
      tempat_lahir.trim() === "" ||
      tgl_lahir.trim() === "" ||
      kelaminGuru.trim() === "" ||
      alamat.trim() === ""
    ) {
      setTimeout(() => {
        setToastMessage("Kolom Input tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("nip", nipGuru);
      formData.append("nama_guru", namaGuru);
      formData.append("alamat", alamat);
      formData.append("no_telepon", telp);
      formData.append("agama_guru", agamaGuru);
      formData.append("jenis_kelamin_guru", kelaminGuru);
      formData.append("tanggal_lahir_guru", tgl_lahir);
      formData.append("tempat_lahir_guru", tempat_lahir);
      formData.append("email", emailGuru);

      let finalGambar = Gambar;
      if (!finalGambar) {
        finalGambar = await getDefaultImageAsFile(defaultImage);
      }
      formData.append("foto_profile", finalGambar);

      const response = await axios.post(
        `${baseUrl.apiUrl}/admin/guru`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        localStorage.setItem("guruAdded", "success");
        setTimeout(() => {
          setIsLoading(false);
          navigate("/dashboard/guru");
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
    preview,
    form: {
      emailGuru,
      namaGuru,
      nipGuru,
      telp,
      agamaGuru,
      tempat_lahir,
      tgl_lahir,
      kelaminGuru,
      alamat,
    },
    setform: {
      setNamaGuru,
      setEmailGuru,
      setNipGuru,
      setAgama,
      setAlamat,
      setTempatLahir,
      setTglLahir,
      setKelamin,
      setTelp,
    },
    agamaOption,
    kelaminOption,
    defaultImage,
    handleImageChange,
    handleSubmit,
  };
};
