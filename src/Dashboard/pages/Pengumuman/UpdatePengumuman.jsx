import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FieldInput from "../../../component/Input/FieldInput";
import Button from "../../../component/Button/Button";
import ButtonHref from "../../../component/Button/ButtonHref";
import InputFile from "../../../component/Input/InputFile";
import SelectField from "../../../component/Input/SelectField";
import axios from "axios";
import baseUrl from "../../../utils/config/baseUrl";
import Loading from "../../../component/Loading/Loading";
import Toast from "../../../component/Toast/Toast";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function UpdatePengumuman() {
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

  useEffect(() => {
    const fetchData = async (e) => {
      try {
        const response = await axios.get(
          `${baseUrl.apiUrl}/admin/berita/${id}`,
          {
            headers: {
              Authorization: `Beazer ${token}`,
            },
          }
        );

        console.log(response.data);

        if (response.status == 200 || response.status == 201) {
          setDeskripsi(response.data.isi);
          setJudul(response.data.judul);
          setGambar(response.data.foto);
          setKategori(response.data.tipe);
          const namaFile = response.data.foto.split("/").pop(); // Ambil nama file dari path
          setFileName(namaFile);
        }
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        setToastMessage("Gagal mengambil data");
        setToastVariant("error");
      }
    };

    fetchData();
  }, [id]);

  const kategoriOptions = [
    { value: "berita", label: "Berita" },
    { value: "pengumuman", label: "Pengumuman" },
  ];

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
  console.log(Gambar);

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

  return (
    <div className="lg:py-5">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg capitalize">
            Edit Informasi {kategori}
          </p>
        </div>

        <hr className="border-border-grey border"></hr>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Input Field */}
          <div className="w-full mt-5">
            <FieldInput
              text=<span>
                Judul <span className="text-red-500">*</span>
              </span>
              type="text"
              variant="biasa_text_sm"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
            ></FieldInput>
          </div>

          <div className="w-full mt-5">
            <label className="block mb-2 text-sm font-medium text-black">
              Deskripsi
            </label>
            <CKEditor
              editor={ClassicEditor}
              config={{
                toolbar: ["bold", "italic", "undo", "redo"],
              }}
              data={deskirpsi}
              onChange={(event, editor) => setDeskripsi(editor.getData())}
            />
          </div>

          <div className="w-full mt-5 flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <SelectField
                text="Kategori Informasi"
                option={kategoriOptions}
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-end mt-4 md:mt-0">
              <InputFile
                text="Gambar"
                fungsi={handleImageChange}
                variant="w_full"
                filename={fileName}
              />
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-end items-center mt-10">
            <div className="me-2">
              <ButtonHref
                text="Batal"
                variant="cancel"
                href="/dashboard/pengumuman"
              ></ButtonHref>
            </div>
            <div className="w-40">
              <Button
                text={isLoading ? <Loading /> : "Update"}
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
