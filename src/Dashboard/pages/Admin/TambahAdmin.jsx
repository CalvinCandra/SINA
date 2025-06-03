import FieldInput from "../../../component/Input/FieldInput";
import Button from "../../../component/Button/Button";
import InputFile from "../../../component/Input/InputFile";
import ButtonHref from "../../../component/Button/ButtonHref";
import Loading from "../../../component/Loading/Loading";
import Toast from "../../../component/Toast/Toast";
import { useTambah } from "../../../hooks/Admin/Tambah";

export default function TambahAdmin() {
  const {
    isLoading,
    defaultImage,
    toastMessage,
    toastVariant,
    preview,
    namaAdmin,
    emailAdmin,
    setEmailAdmin,
    setNamaAdmin,
    handleImageChange,
    handleSubmit,
  } = useTambah();
  return (
    <div className="lg:py-5">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="w-full p-5 rounded-md bg-white mt-5">
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg">Tambah Data Admin / Staf</p>
        </div>

        <hr className="border-border-grey border" />

        <form onSubmit={handleSubmit}>
          {/* Gambar */}
          <div className="flex flex-col justify-center items-center">
            <div className="p-1 w-60 h-64 my-3 overflow-hidden">
              <img
                src={preview || defaultImage}
                alt="Preview"
                id="ImagePreview"
                className="w-full h-full object-cover rounded"
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
                text="Batal"
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
