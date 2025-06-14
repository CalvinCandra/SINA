import FieldInput from "../../../../component/Input/FieldInput";
import Button from "../../../../component/Button/Button";
import ButtonHref from "../../../../component/Button/ButtonHref";
import Loading from "../../../../component/Loading/Loading";
import Toast from "../../../../component/Toast/Toast";
import { useTambahMataPelajaran } from "../../../../hooks/MataPelajaran/TambahMataPelajaran";

export default function TambahMataPelajaran() {
  const {
    nama_mapel,
    setNamaMapel,
    kkm,
    setKkm,
    isLoading,
    toastMessage,
    toastVariant,
    handleSubmit,
  } = useTambahMataPelajaran();
  return (
    <div className="lg:py-5 min-h-screen lg:min-h-0">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg">Tambah Data Mata Pelajaran</p>
        </div>

        <hr className="border-border-grey border"></hr>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className={`${isLoading ? "pointer-events-none opacity-50" : ""}`}
        >
          {/* Input Field */}
          <div className="w-full mt-5">
            <FieldInput
              text=<span>
                Mata Pelajaran <span className="text-red-500">*</span>
              </span>
              type="text"
              variant="biasa_text_sm"
              value={nama_mapel}
              onChange={(e) => setNamaMapel(e.target.value)}
            ></FieldInput>
          </div>

          <div className="w-full mt-5">
            <FieldInput
              text=<span>
                KKM <span className="text-red-500">*</span>
              </span>
              type="number"
              variant="biasa_text_sm"
              value={kkm}
              onChange={(e) => setKkm(e.target.value)}
            ></FieldInput>
          </div>

          {/* Button */}
          <div className="flex justify-end items-center mt-5">
            <div className="me-2">
              <ButtonHref
                text="Cancel"
                variant="cancel"
                href="/dashboard/akademik/mata-pelajaran"
              ></ButtonHref>
            </div>
            <div className="w-48">
              <Button
                text={isLoading ? <Loading /> : "Tambah Mata Pelajaran"}
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
