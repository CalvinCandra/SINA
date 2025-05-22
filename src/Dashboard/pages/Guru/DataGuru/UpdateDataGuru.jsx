import { useState, useEffect } from "react";
import FieldInput from "../../../../component/Input/FieldInput";
import Button from "../../../../component/Button/Button";
import InputFile from "../../../../component/Input/InputFile";
import ButtonHref from "../../../../component/Button/ButtonHref";
import SelectField from "../../../../component/Input/SelectField";
import Textarea from "../../../../component/Input/Textarea";
import { useNavigate, useParams } from "react-router-dom";
import Toast from "../../../../component/Toast/Toast";
import Loading from "../../../../component/Loading/Loading";
import axios from "axios";
import baseUrl from "../../../../utils/config/baseUrl";

export default function UpdateDataGuru() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [preview, setPreview] = useState("");

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

  function formatToDateInput(isoString) {
    if (!isoString) return ""; // biar tidak jadi uncontrolled input
    const date = new Date(isoString);
    return date.toISOString().split("T")[0]; // ambil bagian 'YYYY-MM-DD'
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl.apiUrl}/admin/guru/${id}`, {
          headers: {
            Authorization: `Beazer ${token}`,
          },
        });

        console.log(response.data);

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
      formData.append("nip", nipGuru);
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

  return (
    <div className="lg:py-5">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg">Perbaharui Data Guru</p>
        </div>

        <hr className="border-border-grey border"></hr>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Gambar */}
          <div className="flex flex-col justify-center items-center">
            <div className="p-1 w-60 h-64 my-3 overflow-hidden">
              <img
                src={
                  preview
                    ? preview
                    : `${baseUrl.apiUrlImage}/Upload/profile_image/${Gambar}`
                }
                id="ImagePreview"
                className="w-full h-full object-cover rounded"
              />
            </div>

            <InputFile fungsi={handleImageChange}></InputFile>
          </div>

          {/* Input Field */}
          <div className="w-full flex flex-col lg:flex-row justify-between mt-5">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                text=<span>
                  Nama Lengkap <span className="text-red-500">*</span>
                </span>
                type="text"
                value={namaGuru}
                onChange={(e) => setNamaGuru(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                text=<span>
                  NIP Guru <span className="text-red-500">*</span>
                </span>
                type="number"
                value={nipGuru}
                onChange={(e) => setNipGuru(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>
          </div>

          <div className="w-full flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                text=<span>
                  Email Guru <span className="text-red-500">*</span>
                </span>
                type="email"
                value={emailGuru}
                onChange={(e) => setEmailGuru(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>
            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                text=<span>
                  No telepon <span className="text-red-500">*</span>
                </span>
                type="text"
                value={telp}
                onChange={(e) => setTelp(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>
          </div>

          <div className="w-full flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                text=<span>
                  Tempat Lahir <span className="text-red-500">*</span>
                </span>
                type="text"
                value={tempat_lahir}
                onChange={(e) => setTempatLahir(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                text=<span>
                  Tanggal Lahir <span className="text-red-500">*</span>
                </span>
                type="date"
                value={tgl_lahir}
                onChange={(e) => setTglLahir(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>
          </div>

          <div className="w-full flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/2 lg:me-1">
              <SelectField
                text="Agama"
                option={agamaOption}
                value={agamaGuru}
                onChange={(e) => setAgama(e.target.value)}
              ></SelectField>
            </div>
            <div className="w-full lg:w-1/2 lg:ms-1">
              <SelectField
                text="Jenis Kelamin"
                option={kelaminOption}
                value={kelaminGuru}
                onChange={(e) => setKelamin(e.target.value)}
              ></SelectField>
            </div>
          </div>

          <div className="w-full">
            <Textarea
              text=<span>
                Alamat <span className="text-red-500">*</span>
              </span>
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
            ></Textarea>
          </div>

          {/* Button */}
          <div className="flex justify-end items-center mt-5">
            <div className="me-2">
              <ButtonHref
                text="Batal"
                variant="cancel"
                href="/dashboard/guru"
              ></ButtonHref>
            </div>
            <div className="w-40">
              <Button
                text={isLoading ? <Loading /> : "Perbaharui"}
                variant="button_submit_dash"
                disabled={isLoading}
              ></Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
