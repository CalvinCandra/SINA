import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import baseUrl from "../../utils/config/baseUrl";
import { formatToDateInput } from "../../utils/helper/dateFormat";
import ImageImport from "../../data/ImageImport";

export const useUpdateSiswa = () => {
  const { kelas_id, nis } = useParams();
  const navigate = useNavigate();
  const [preview, setPreview] = useState();
  const defaultGambar = ImageImport.defaultGambar;
  //variabel siswa
  const [namaSiswa, setNamaSiswa] = useState("");
  const [emailSiswa, setEmailSiswa] = useState("");
  const [nisSiswa, setNisSiswa] = useState("");
  const [nisnSiswa, setNisnSiswa] = useState("");
  const [tempatLahirSiswa, settempatLahirSiswa] = useState("");
  const [tglLahirSiswa, settglLahirSiswa] = useState("");
  const [agama, setAgamaSiswa] = useState("");
  const [kelamin, setkelaminSiswa] = useState("");
  const [telpSiswa, setTelpSiswa] = useState("");
  const [Gambar, setGambar] = useState("");
  const [alamatSiswa, setAlamatSiswa] = useState("");
  // variabel ayah
  const [namaAyah, setNamaAyah] = useState("");
  const [nikAyah, setNikAyah] = useState("");
  const [tempatLahirAyah, settempatLahirAyah] = useState("");
  const [tglLahirAyah, settglLahirAyah] = useState("");
  const [pekerjaanAyah, setPekerjaanAyah] = useState("");
  const [telpAyah, setTelpAyah] = useState("");
  const [alamatAyah, setAlamatAyah] = useState("");
  // variabel ibu
  const [namaIbu, setNamaIbu] = useState("");
  const [nikIbu, setNikIbu] = useState("");
  const [tempatLahirIbu, settempatLahirIbu] = useState("");
  const [tglLahirIbu, settglLahirIbu] = useState("");
  const [pekerjaanIbu, setPekerjaanIbu] = useState("");
  const [telpIbu, setTelpIbu] = useState("");
  const [alamatIbu, setAlamatIbu] = useState("");
  // variabel wali
  const [namaWali, setNamaWali] = useState("");
  const [nikWali, setNikWali] = useState("");
  const [tempatLahirWali, settempatLahirWali] = useState("");
  const [tglLahirWali, settglLahirWali] = useState("");
  const [pekerjaanWali, setPekerjaanWali] = useState("");
  const [telpWali, setTelpWali] = useState("");
  const [alamatWali, setAlamatWali] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  // untuk pesan error
  const [nisnError, setNisnError] = useState("");
  const [nikError, setNikError] = useState("");

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

  const fecthData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${baseUrl.apiUrl}/admin/siswa/${nis}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status == 200) {
        if (response.data.foto_profil) {
          setGambar(response.data.foto_profil);
        } else {
          setPreview(defaultGambar);
        }
        setNamaSiswa(response.data.nama_siswa);
        setEmailSiswa(response.data.email);
        setNisSiswa(response.data.nis);
        setNisnSiswa(response.data.nisn);
        settempatLahirSiswa(response.data.tempat_lahir);
        settglLahirSiswa(formatToDateInput(response.data.tanggal_lahir));
        setAgamaSiswa(response.data.agama);
        setkelaminSiswa(response.data.jenis_kelamin);
        setAlamatSiswa(response.data.alamat);
        setTelpSiswa(response.data.no_telepon);
        setNamaAyah(response.data.ayah_nama);
        setNikAyah(response.data.ayah_nik);
        settempatLahirAyah(response.data.ayah_tempat_lahir);
        settglLahirAyah(formatToDateInput(response.data.ayah_tanggal_lahir));
        setPekerjaanAyah(response.data.ayah_pekerjaan);
        setTelpAyah(response.data.ayah_no_telepon);
        setAlamatAyah(response.data.ayah_alamat);
        setNamaIbu(response.data.ibu_nama);
        setNikIbu(response.data.ibu_nik);
        settempatLahirIbu(response.data.ibu_tempat_lahir);
        settglLahirIbu(formatToDateInput(response.data.ibu_tanggal_lahir));
        setPekerjaanIbu(response.data.ibu_pekerjaan);
        setTelpIbu(response.data.ibu_no_telepon);
        setAlamatIbu(response.data.ibu_alamat);
        setNamaWali(response.data.wali_nama);
        setNikWali(response.data.wali_nik);
        settempatLahirWali(response.data.wali_tempat_lahir);
        if (response.data.wali_tanggal_lahir) {
          settglLahirWali(formatToDateInput(response.data.wali_tanggal_lahir));
        }
        setPekerjaanWali(response.data.wali_pekerjaan);
        setTelpWali(response.data.wali_no_telepon);
        setAlamatWali(response.data.wali_alamat);
      }
    } catch (error) {
      console.log(error);
      setToastMessage("gagal ambil data");
      setToastVariant("error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fecthData();
  }, [nis]);

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

      if (file.size >= fileSizeLimit) {
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

  const handleNISNChange = (value) => {
    if (value.trim() === "") {
      setNisnError("NISN tidak Boleh Kosong");
    } else if (value.length < 10) {
      setNisnError(`NISN kurang ${10 - value.length} angka`);
    } else {
      setNisnError("");
    }
  };

  const handleNIKChange = (value) => {
    if (value.trim() === "") {
      setNikError("Nik tidak Boleh Kosong");
    } else if (value.length < 16) {
      setNikError(`Nik kurang ${16 - value.length} angka`);
    } else {
      setNikError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // reset pesan toast terlebih dahulu
    setToastMessage("");
    setToastVariant("");

    // kumpulan filed tidak bole kosong
    const requiredFields = [
      namaSiswa,
      nisSiswa,
      nisnSiswa,
      tempatLahirSiswa,
      tglLahirSiswa,
      agama,
      kelamin,
      alamatSiswa,
      namaAyah,
      nikAyah,
      tempatLahirAyah,
      tglLahirAyah,
      pekerjaanAyah,
      telpAyah,
      alamatAyah,
      namaIbu,
      nikIbu,
      tempatLahirIbu,
      tglLahirIbu,
      pekerjaanIbu,
      telpIbu,
      alamatIbu,
    ];

    const isAnyEmpty = requiredFields.some((field) => field.trim() === "");

    if (isAnyEmpty) {
      setTimeout(() => {
        setToastMessage("Kolom input tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }

    // Validasi panjang NISN
    if (nisnSiswa.length !== 10) {
      setTimeout(() => {
        setToastMessage("NISN harus 10 digit");
        setToastVariant("error");
      }, 10);
      return;
    }

    if (nikAyah.length !== 16 || nikIbu.length !== 16) {
      setTimeout(() => {
        setToastMessage("NIK harus 16 digit");
        setToastVariant("error");
      }, 10);
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("nama_siswa", namaSiswa);
      formData.append("email", emailSiswa);
      formData.append("nis", nisSiswa);
      formData.append("nisn", nisnSiswa);
      formData.append("tanggal_lahir", tglLahirSiswa);
      formData.append("tempat_lahir", tempatLahirSiswa);
      formData.append("alamat", alamatSiswa);
      formData.append("jenis_kelamin", kelamin);
      formData.append("agama", agama);
      formData.append("no_telepon", telpSiswa);
      formData.append("kelas_id", kelas_id);
      formData.append("ayah_nama", namaAyah);
      formData.append("ayah_nik", nikAyah);
      formData.append("ayah_tempat_lahir", tempatLahirAyah);
      formData.append("ayah_tanggal_lahir", tglLahirAyah);
      formData.append("ayah_alamat", alamatAyah);
      formData.append("ayah_pekerjaan", pekerjaanAyah);
      formData.append("ayah_no_telepon", telpAyah);
      formData.append("ibu_nama", namaIbu);
      formData.append("ibu_nik", nikIbu);
      formData.append("ibu_tempat_lahir", tempatLahirIbu);
      formData.append("ibu_tanggal_lahir", tglLahirIbu);
      formData.append("ibu_alamat", alamatIbu);
      formData.append("ibu_pekerjaan", pekerjaanIbu);
      formData.append("ibu_no_telepon", telpIbu);
      formData.append("wali_nama", namaWali);
      formData.append("wali_nik", nikWali);
      formData.append("wali_tempat_lahir", tempatLahirWali);
      formData.append("wali_tanggal_lahir", tglLahirWali);
      formData.append("wali_alamat", alamatWali);
      formData.append("wali_pekerjaan", pekerjaanWali);
      formData.append("wali_no_telepon", telpWali);

      // Gambar default
      let finalGambar = Gambar;
      if (!finalGambar) {
        finalGambar = await getDefaultImageAsFile(defaultGambar);
      }
      formData.append("foto_profil", finalGambar);

      const response = await axios.put(
        `${baseUrl.apiUrl}/admin/siswa/${nis}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);

      if (response.status == 200) {
        // Simpan status berhasil tambah
        localStorage.setItem("siswaAdded", "success");

        setTimeout(() => {
          setIsLoading(false);
          navigate(`/dashboard/siswa/${kelas_id}`);
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
    kelas_id,
    agamaOption,
    kelaminOption,
    handleImageChange,
    handleSubmit,
    preview,
    Gambar,
    form: {
      siswa: {
        namaSiswa,
        setNamaSiswa,
        emailSiswa,
        setEmailSiswa,
        nisSiswa,
        setNisSiswa,
        nisnSiswa,
        setNisnSiswa,
        tempatLahirSiswa,
        settempatLahirSiswa,
        tglLahirSiswa,
        settglLahirSiswa,
        agama,
        setAgamaSiswa,
        kelamin,
        setkelaminSiswa,
        alamatSiswa,
        setAlamatSiswa,
        telpSiswa,
        setTelpSiswa,
      },
      ayah: {
        namaAyah,
        setNamaAyah,
        nikAyah,
        setNikAyah,
        tempatLahirAyah,
        settempatLahirAyah,
        tglLahirAyah,
        settglLahirAyah,
        pekerjaanAyah,
        setPekerjaanAyah,
        telpAyah,
        setTelpAyah,
        alamatAyah,
        setAlamatAyah,
      },
      ibu: {
        namaIbu,
        setNamaIbu,
        nikIbu,
        setNikIbu,
        tempatLahirIbu,
        settempatLahirIbu,
        tglLahirIbu,
        settglLahirIbu,
        pekerjaanIbu,
        setPekerjaanIbu,
        telpIbu,
        setTelpIbu,
        alamatIbu,
        setAlamatIbu,
      },
      wali: {
        namaWali,
        setNamaWali,
        nikWali,
        setNikWali,
        tempatLahirWali,
        settempatLahirWali,
        tglLahirWali,
        settglLahirWali,
        pekerjaanWali,
        setPekerjaanWali,
        telpWali,
        setTelpWali,
        alamatWali,
        setAlamatWali,
      },
    },
    nikError,
    nisnError,
    handleNISNChange,
    handleNIKChange,
  };
};
