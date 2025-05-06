import { useState, useEffect } from "react";
import FieldInput from "../../../component/Input/FieldInput";
import Button from "../../../component/Button/Button";
import InputFile from "../../../component/Input/InputFile";
import ButtonHref from "../../../component/Button/ButtonHref";
import { useNavigate, useParams } from "react-router-dom";
import Toast from "../../../component/Toast/Toast";
import Loading from "../../../component/Loading/Loading";

export default function UpdateAdmin() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [preview, setPreview] = useState("");
  const [namaAdmin, setNamaAdmin] = useState("");
  const [emailAdmin, setEmailAdmin] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedAdmins = JSON.parse(localStorage.getItem("adminList")) || [];
    const foundData = storedAdmins.find((item) => item.id === parseInt(id));

    if (!foundData) {
      localStorage.setItem("adminInvalid", "error");
      setTimeout(() => {
        window.location.href = "/dashboard/admin";
      }, 10);
    }

    setNamaAdmin(foundData.nama);
    setEmailAdmin(foundData.email);
    setPreview(
      foundData.image ||
        "https://manbengkuluselatan.sch.id/assets/img/profile/default.jpg"
    );
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
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
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

    const storedAdmins = JSON.parse(localStorage.getItem("adminList"));

    const updatedAdmins = storedAdmins.map((admin) =>
      admin.id === parseInt(id)
        ? {
            ...admin,
            nama: namaAdmin,
            email: emailAdmin,
            image: preview,
          }
        : admin
    );

    localStorage.setItem("adminList", JSON.stringify(updatedAdmins));
    localStorage.setItem("adminUpdate", "success");

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
          <p className="font-semibold text-lg">Update Data Admin</p>
        </div>

        <hr className="border-border-grey border" />

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center items-center">
            <div className="p-1 w-full lg:w-60 h-64 my-3 overflow-hidden">
              <img
                src={preview}
                id="ImagePreview"
                className="w-full h-full object-cover rounded"
              />
            </div>
            <InputFile text="Pilih Foto Baru" fungsi={handleImageChange} />
          </div>

          <div className="w-full flex flex-col lg:flex-row justify-between mt-5">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                text={
                  <span>
                    Nama Lengkap <span className="text-red-500">*</span>
                  </span>
                }
                type="text"
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
                name="email_admin"
                variant="biasa_text_sm"
                value={emailAdmin}
                onChange={(e) => setEmailAdmin(e.target.value)}
              />
            </div>
          </div>

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
                text={isLoading ? <Loading /> : "Update Admin"}
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
