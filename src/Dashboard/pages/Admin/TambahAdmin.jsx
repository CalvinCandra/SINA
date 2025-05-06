import { useState } from "react";
import FieldInput from "../../../component/Input/FieldInput";
import Button from "../../../component/Button/Button";
import InputFile from "../../../component/Input/InputFile";
import ButtonHref from "../../../component/Button/ButtonHref";
import Loading from "../../../component/Loading/Loading";
import Toast from "../../../component/Toast/Toast";
import { useNavigate } from "react-router-dom";

export default function TambahAdmin() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(
    "https://manbengkuluselatan.sch.id/assets/img/profile/default.jpg"
  );

  const [namaAdmin, setNamaAdmin] = useState("");
  const [emailAdmin, setEmailAdmin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      const fileSizeLimit = 5 * 1024 * 1024; // 5MB limit

      if (!allowedTypes.includes(file.type)) {
        setToastMessage("File harus berformat PNG, JPG, atau JPEG");
        setToastVariant("error");
        setPreview(
          "https://manbengkuluselatan.sch.id/assets/img/profile/default.jpg"
        );
        document.getElementById("file-name").textContent = "No file chosen";
        return;
      }

      if (file.size > fileSizeLimit) {
        setToastMessage("Ukuran file terlalu besar. Maksimum 5MB.");
        setToastVariant("error");
        setPreview(
          "https://manbengkuluselatan.sch.id/assets/img/profile/default.jpg"
        );
        document.getElementById("file-name").textContent = "No file chosen";
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        document.getElementById("file-name").textContent = file.name;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // reset pesan toast terlebih dahulu
    setToastMessage("");
    setToastVariant("");

    // Validasi input
    if (
      preview ===
      "https://manbengkuluselatan.sch.id/assets/img/profile/default.jpg"
    ) {
      setTimeout(() => {
        setToastMessage("Gambar wajib diisi");
        setToastVariant("error");
      }, 10);
      return;
    }

    if (namaAdmin.trim() === "") {
      setTimeout(() => {
        setToastMessage("Nama Admin tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }

    if (emailAdmin.trim() === "") {
      setTimeout(() => {
        setToastMessage("Email Admin tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }

    setIsLoading(true);

    // Ambil data admin yang sudah ada di localStorage
    const storedAdmins = JSON.parse(localStorage.getItem("adminList")) || [];

    const lastId =
      storedAdmins.length > 0
        ? Math.max(...storedAdmins.map((item) => item.id))
        : 0;

    // Membuat data admin baru
    const newAdmin = {
      id: lastId + 1, // id auto increment
      image: preview,
      nama: namaAdmin,
      email: emailAdmin,
      tgl: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };

    // Tambahkan admin baru ke data
    const tambahAdmins = [...storedAdmins, newAdmin];

    // Simpan data ke localStorage
    localStorage.setItem("adminList", JSON.stringify(tambahAdmins));

    // Simpan status berhasil tambah
    localStorage.setItem("adminAdded", "success");

    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard/admin");
    }, 2000);
  };

  return (
    <div className="lg:py-5">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="w-full p-5 rounded-md bg-white mt-5">
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg">Tambah Data Admin / Staf</p>
        </div>

        <hr className="border-border-grey border"></hr>

        <form onSubmit={handleSubmit}>
          {/* Gambar */}
          <div className="flex flex-col justify-center items-center">
            <div className="p-1 w-60 h-64 my-3 overflow-hidden">
              <img
                src={preview}
                alt="Preview"
                id="ImagePreview"
                className="w-full h-full object-object rounded"
              />
            </div>

            <InputFile text="Pilih Foto" fungsi={handleImageChange} />
          </div>

          {/* Input Field */}
          <div className="w-full flex flex-col lg:flex-row justify-between mt-5">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                text={
                  <span>
                    Nama Lengkap <span className="text-red-500">*</span>
                  </span>
                }
                type="text"
                name="nama_admin"
                variant="biasa_text_sm"
                value={namaAdmin}
                onChange={(e) => setNamaAdmin(e.target.value)}
              />
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                text={
                  <span>
                    Email Admin <span className="text-red-500">*</span>
                  </span>
                }
                type="email"
                name="email"
                variant="biasa_text_sm"
                value={emailAdmin}
                onChange={(e) => setEmailAdmin(e.target.value)}
              />
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-end items-center mt-5">
            <div className="me-2">
              <ButtonHref
                text="Cancel"
                variant="cancel"
                href="/dashboard/admin"
              />
            </div>
            <div className="w-40">
              <Button
                text={isLoading ? <Loading /> : "Tambah Admin"}
                variant="button_submit_dash"
                disabled={isLoading}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
