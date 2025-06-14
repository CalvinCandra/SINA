import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import baseUrl from "../../utils/config/baseUrl";

export const useUpdate = () => {
  // state
  const navigate = useNavigate();
  const { id } = useParams();
  const [preview, setPreview] = useState("");
  const [Gambar, setGambar] = useState(null);
  const [namaAdmin, setNamaAdmin] = useState("");
  const [emailAdmin, setEmailAdmin] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // get token
  const token = sessionStorage.getItem("session");

  // preview gambar
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${baseUrl.apiUrl}/admin/admin2/${id}`,
          {
            headers: {
              Authorization: `Beazer ${token}`,
            },
          }
        );

        if (response.status == 200 || response.status == 201) {
          setNamaAdmin(response.data.username);
          setEmailAdmin(response.data.email);
          setGambar(response.data.foto_profil);
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Gagal mengambil data:", error);
        setToastMessage("Gagal mengambil data");
        setToastVariant("error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // reset pesan toast
    setToastMessage("");
    setToastVariant("");

    if (namaAdmin.trim() === "" || emailAdmin.trim() === "") {
      setTimeout(() => {
        setToastMessage("Nama dan Email tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("username", namaAdmin);
      formData.append("email", emailAdmin);
      formData.append("foto_profile", Gambar);

      const response = await axios.put(
        `${baseUrl.apiUrl}/admin/admin2/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status == 200 || response.status == 201) {
        localStorage.setItem("adminUpdate", "success");
        setTimeout(() => {
          setIsLoading(false);
          navigate("/dashboard/admin");
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

      setIsLoading(false);
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
    Gambar,
    namaAdmin,
    emailAdmin,
    setEmailAdmin,
    setGambar,
    setNamaAdmin,
    handleImageChange,
    handleSubmit,
  };
};
