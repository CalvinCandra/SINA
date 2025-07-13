import { useState, useEffect } from "react";
import FieldInput from "../../component/Input/FieldInput";
import Button from "../../component/Button/Button";
import InputFile from "../../component/Input/InputFile";
import Loading from "../../component/Loading/Loading";
import Toast from "../../component/Toast/Toast";
import defaultLogo from "../../assets/logo/logo icon sina.png";
import { useInformasiSekolah } from "../../hooks/Landing/ProfileWebsite";
import baseUrl from "../../utils/config/baseUrl";
import Calender from "../components/Calender/Calender";

export default function SettingLanding() {
  const {
    informasi,
    setInformasi,
    isLoading,
    toastMessage,
    toastVariant,
    previewLogo,
    logoFile,
    handleLogoChange,
    updateInformasiSekolah,
    resetData,
    deleteLogo,
  } = useInformasiSekolah();

  // useEffect(() => {
  //   console.log("Informasi sekolah:", informasi);
  //   console.log("Nama file logo:", informasi.logo);
  //   console.log(
  //     "URL logo yang dibentuk:",
  //     informasi.logo
  //       ? `${baseUrl.apiUrl}/admin/sekolah/${informasi.logo}`
  //       : "Tidak ada logo"
  //   );
  //   console.log("Base URL:", baseUrl.apiUrl);
  // }, [informasi]);

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isDeleteLogoModalOpen, setIsDeleteLogoModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInformasi((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(informasi).forEach((key) => {
      formData.append(key, informasi[key] ?? "");
    });

    if (logoFile instanceof File) {
      formData.append("logo", logoFile);
    }

    try {
      await updateInformasiSekolah(formData);
    } catch (error) {
      console.error("Error saat update:", error);
    }
  };

  const confirmDeleteLogo = async () => {
    await deleteLogo();
    setIsDeleteLogoModalOpen(false);
  };

  const confirmReset = async () => {
    try {
      const result = await resetData();
      if (!result) console.error("Reset data gagal");
      setIsResetModalOpen(false);
    } catch (error) {
      console.error("Error saat reset:", error);
    }
  };

  const fields = [
    {
      name: "nama_sekolah",
      label: "Nama Sekolah",
      type: "text",
      required: true,
      fullWidth: false,
    },
    {
      name: "singkatan",
      label: "Singkatan Sekolah",
      type: "text",
      fullWidth: false,
    },
    {
      name: "tag",
      label: "Tagline Sekolah",
      type: "text",
      fullWidth: true,
    },
    {
      name: "email",
      label: "Email Sekolah",
      type: "email",
      fullWidth: false,
    },
    {
      name: "no_telepon",
      label: "Nomor Telepon",
      type: "number",
      fullWidth: false,
    },
    {
      name: "instagram",
      label: "Tautan Instagram",
      type: "url",
      placeholder: "https://instagram.com/username",
      fullWidth: false,
    },
    {
      name: "facebook",
      label: "Tautan Facebook",
      type: "url",
      placeholder: "https://facebook.com/username",
      fullWidth: false,
    },
    {
      name: "youtube",
      label: "Tautan YouTube",
      type: "url",
      placeholder: "https://youtube.com/username",
      fullWidth: false,
    },
    {
      name: "linkedin",
      label: "Tautan LinkedIn",
      type: "url",
      placeholder: "https://linkedin.com/username",
      fullWidth: false,
    },
  ];

  return (
    <div className="lg:py-5 relative">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="flex flex-col lg:flex-row w-full justify-between items-center">
        <h2 className="text-2xl font-bold">Profile Website</h2>
        <Calender className="w-40 lg:w-full"></Calender>
      </div>

      {/* Modal Konfirmasi Reset */}
      {isResetModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-5 w-[90%] max-w-sm shadow-lg">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">
              Konfirmasi Reset
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Apakah Anda yakin ingin mereset semua data ke kosong?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsResetModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
              >
                Batal
              </button>
              <button
                onClick={confirmReset}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                disabled={isLoading}
              >
                {isLoading ? "Memproses..." : "Reset"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus Logo */}
      {isDeleteLogoModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-5 w-[90%] max-w-sm shadow-lg">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">
              Konfirmasi Hapus Logo
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Apakah Anda yakin ingin menghapus logo sekolah?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsDeleteLogoModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
              >
                Batal
              </button>
              <button
                onClick={confirmDeleteLogo}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                disabled={isLoading}
              >
                {isLoading ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full p-5 rounded-md bg-white mt-5">
        <form
          onSubmit={handleSubmit}
          className={`${isLoading ? "pointer-events-none opacity-50" : ""}`}
        >
          {/* Logo Upload */}
          <div className="flex flex-col justify-center items-center mb-6 relative">
            <div className="p-1 w-60 h-60 my-3 overflow-hidden border-2 border-dashed border-gray-300 relative">
              {informasi.logo !== undefined && (
                <img
                  src={
                    previewLogo && previewLogo !== ""
                      ? previewLogo
                      : informasi.logo && informasi.logo !== "null"
                      ? `${baseUrl.apiUrl}/admin/sekolah/${informasi.logo}`
                      : defaultLogo
                  }
                  alt="Logo Sekolah"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    console.error("Gagal load logo dari:", e.target.src);
                    e.target.onerror = null;
                    e.target.src = defaultLogo;
                  }}
                />
              )}

              {/* Tombol Hapus Logo */}
              {informasi.logo && informasi.logo !== "null" && (
                <button
                  onClick={() => setIsDeleteLogoModalOpen(true)}
                  type="button"
                  className="absolute top-2 right-2 bg-red-500 p-1.5 rounded-full hover:bg-red-600 transition"
                  title="Hapus Logo"
                  disabled={isLoading}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M9 3V4H4V6H5V20C5 21.1 5.9 22 7 22H17C18.1 22 19 21.1 19 20V6H20V4H15V3H9ZM7 6H17V20H7V6ZM9 8V18H11V8H9ZM13 8V18H15V8H13Z" />
                  </svg>
                </button>
              )}
            </div>

            <InputFile
              text="Pilih Logo"
              fungsi={handleLogoChange}
              accept="image/png, image/jpeg, image/jpg"
              disabled={isLoading}
            />
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div
                key={field.name}
                className={field.fullWidth ? "col-span-2" : ""}
              >
                <FieldInput
                  text={field.label}
                  type={field.type}
                  name={field.name}
                  variant="biasa_text_sm"
                  value={informasi[field.name] || ""}
                  onChange={handleInputChange}
                  required={field.required}
                  placeholder={field.placeholder}
                  disabled={isLoading}
                />
              </div>
            ))}
          </div>

          {/* Tombol Submit */}
          <div className="flex justify-end mt-5">
            <Button
              text={isLoading ? <Loading /> : "Perbarui"}
              variant="button_submit_dash"
              disabled={isLoading}
              type="submit"
            />
          </div>
        </form>

        {/* Tombol Reset di luar form */}
        <div className="mt-3">
          <button
            onClick={() => setIsResetModalOpen(true)}
            type="button"
            className="w-full bg-red-500 text-sm hover:bg-red-600 py-2 font-semibold text-white rounded cursor-pointer"
            disabled={isLoading}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
