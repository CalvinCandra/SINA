import axios from "axios";
import { formatToDateInput } from "../../utils/helper/dateFormat";
import baseUrl from "../../utils/config/baseUrl";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export const useUpdateGuru = () => {
  // state
  const { id } = useParams();
  const navigate = useNavigate();
  const [preview, setPreview] = useState("");
  const [namaGuru, setNamaGuru] = useState("");
  const [nipGuru, setNipGuru] = useState("");
  const [emailGuru, setEmailGuru] = useState("");
  const [telp, setTelp] = useState("");
  const [agamaGuru, setAgama] = useState("");
  const [tempat_lahir, setTempatLahir] = useState("");
  const [tgl_lahir, setTglLahir] = useState("");
  const [kelaminGuru, setKelamin] = useState("");
  const [Gambar, setGambar] = useState("");
  const [alamat, setAlamat] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  // token
  const token = sessionStorage.getItem("session");

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${baseUrl.apiUrl}/admin/guru/${id}`, {
          headers: {
            Authorization: `Beazer ${token}`,
          },
        });

        if (response.status == 200 || response.status == 201) {
          setNamaGuru(response.data.nama_guru || "");
          setNipGuru(response.data.nip || "");
          setEmailGuru(response.data.email || "");
          setGambar(response.data.foto_profil || null);
          setTelp(response.data.no_telepon || "");
          setTempatLahir(response.data.tempat_lahir_guru || "");
          setTglLahir(
            formatToDateInput(response.data.tanggal_lahir_guru) || ""
          );
          setKelamin(response.data.jenis_kelamin_guru || "");
          setAgama(response.data.agama_guru || "");
          setAlamat(response.data.alamat || "");
        }
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        setToastMessage("Gagal mengambil data");
        setToastVariant("error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      const fileSizeLimit = 5 * 1024 * 1024;

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
        setPreview(reader.result);
        setGambar(file);
        document.getElementById("file-name").textContent = file.name;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // reset pesan toast
    setToastMessage("");
    setToastVariant("");

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
      formData.append("new_nip", nipGuru);
      formData.append("nama_guru", namaGuru);
      formData.append("alamat", alamat);
      formData.append("no_telepon", telp);
      formData.append("agama_guru", agamaGuru);
      formData.append("jenis_kelamin_guru", kelaminGuru);
      formData.append("tanggal_lahir_guru", tgl_lahir);
      formData.append("tempat_lahir_guru", tempat_lahir);
      formData.append("email", emailGuru);
      formData.append("foto_profile", Gambar);

      const response = await axios.put(
        ` ${baseUrl.apiUrl}/admin/guru/${id}`,
        formData,
        {
          headers: {
            Authorization: `Beazer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status == 200 || response.status == 201) {
        localStorage.setItem("guruUpdate", "success");
        setTimeout(() => {
          setIsLoading(false);
          navigate("/dashboard/guru");
        }, 1000);
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

      setIsLoading(false); // jangan lupa set false
      setTimeout(() => {
        setToastMessage(`${errorMessage}`);
        setToastVariant("error");
      }, 10);
      return;
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
      Gambar,
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
    handleImageChange,
    handleSubmit,
  };
};
