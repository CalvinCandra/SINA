import axios from "axios";
import { useEffect, useState } from "react";
import baseUrl from "../../utils/config/baseUrl";

export const useInformasiSekolah = () => {
  const [informasi, setInformasi] = useState({
    nama_sekolah: null,
    singkatan: null,
    tag: null,
    instagram: null,
    facebook: null,
    linkedin: null,
    youtube: null,
    no_telepon: null,
    email: null,
    logo: null,
  });

  const [previewLogo, setPreviewLogo] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastVariant, setToastVariant] = useState("success");
  const [initialLoad, setInitialLoad] = useState(true);

  const token = sessionStorage.getItem("session");

  const handleLogoChange = (e) => {
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
        setPreviewLogo(reader.result);
        setLogoFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchInformasiSekolah = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${baseUrl.apiUrl}/admin/sekolah`);

      if (response.status === 200) {
        const data = response.data;
        setInformasi({
          nama_sekolah: data.nama_sekolah,
          singkatan: data.singkatan,
          tag: data.tag,
          instagram: data.instagram,
          facebook: data.facebook,
          linkedin: data.linkedin,
          youtube: data.youtube,
          no_telepon: data.no_telepon,
          email: data.email,
          logo: data.logo,
        });

        setPreviewLogo(
          data.logo ? `${baseUrl.apiUrl}/admin/sekolah/${data.logo}` : null
        );
      }
    } catch (err) {
      console.error("Gagal mengambil data informasi sekolah:", err);
      setToastMessage(
        err.response?.data?.message || "Gagal memuat data informasi sekolah"
      );
      setToastVariant("error");
    } finally {
      setIsLoading(false);
      setInitialLoad(false);
    }
  };

  const updateInformasiSekolah = async (formData) => {
    try {
      setIsLoading(true);
      setToastMessage(null);
      setToastVariant("success");

      // Jika tidak ada file logo yang dipilih, hapus field logo dari formData
      // sehingga tidak mengubah logo yang ada di server
      if (!logoFile) {
        formData.delete("logo");
      }

      const response = await axios.put(
        `${baseUrl.apiUrl}/admin/sekolah/SCH001`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setInformasi((prev) => ({
          ...prev,
          ...response.data,
        }));

        // Update preview logo
        if (logoFile) {
          // Jika ada file logo baru, gunakan yang baru
          const reader = new FileReader();
          reader.onload = () => {
            setPreviewLogo(reader.result);
          };
          reader.readAsDataURL(logoFile);
        } else if (response.data.logo) {
          // Jika tidak ada file baru tetapi ada logo di response, gunakan yang dari server
          setPreviewLogo(`${baseUrl.apiUrl}/${response.data.logo}`);
        } else {
          // Jika tidak ada logo sama sekali
          setPreviewLogo(null);
        }

        setLogoFile(null);
        setToastMessage("Data berhasil diperbarui");
        return true;
      }
    } catch (err) {
      console.error("Gagal memperbarui informasi sekolah:", err);
      setToastMessage(err.response?.data?.message || "Gagal memperbarui data");
      setToastVariant("error");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetData = async () => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("nama_sekolah", "");
      formData.append("singkatan", "");
      formData.append("tag", "");
      formData.append("instagram", "");
      formData.append("facebook", "");
      formData.append("linkedin", "");
      formData.append("youtube", "");
      formData.append("no_telepon", "");
      formData.append("email", "");
      formData.append("logo", "null"); // Konsisten dengan string "null"

      const response = await axios.put(
        `${baseUrl.apiUrl}/admin/sekolah/SCH001`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setInformasi({
          nama_sekolah: "",
          singkatan: "",
          tag: "",
          instagram: "",
          facebook: "",
          linkedin: "",
          youtube: "",
          no_telepon: "",
          email: "",
          logo: "null", // Konsisten dengan string "null"
        });
        setPreviewLogo(null);
        setLogoFile(null);
        setToastMessage("Data berhasil direset ke kosong");
        setToastVariant("success");
        return true;
      }
    } catch (err) {
      console.error("Gagal mereset data:", err);
      setToastMessage(err.response?.data?.message || "Gagal mereset data");
      setToastVariant("error");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteLogo = async () => {
    try {
      setIsLoading(true);
      const token = sessionStorage.getItem("session");

      // 1. Prepare form data
      const formData = new FormData();
      Object.keys(informasi).forEach((key) => {
        if (key !== "logo") {
          formData.append(key, informasi[key] || "");
        }
      });
      formData.append("logo", "null"); // Khusus untuk backend

      // 2. Send to backend
      const response = await axios.put(
        `${baseUrl.apiUrl}/admin/sekolah/SCH001`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // 3. Update frontend state
      if (response.status === 200) {
        setInformasi((prev) => ({ ...prev, logo: "null" }));
        setPreviewLogo(null);
        setLogoFile(null);
        setToastMessage("Logo berhasil dihapus");
        setToastVariant("success");
        return true;
      }
    } catch (error) {
      console.error("Gagal menghapus logo:", error);
      setToastMessage(error.response?.data?.message || "Gagal menghapus logo");
      setToastVariant("error");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInformasiSekolah();
  }, []);

  return {
    informasi,
    setInformasi,
    isLoading: isLoading || initialLoad,
    toastMessage,
    toastVariant,
    previewLogo,
    logoFile,
    handleLogoChange,
    updateInformasiSekolah,
    resetData,
    deleteLogo,
  };
};
