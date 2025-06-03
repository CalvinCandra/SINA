import FieldInput from "../../../../component/Input/FieldInput";
import Button from "../../../../component/Button/Button";
import ButtonHref from "../../../../component/Button/ButtonHref";
import Textarea from "../../../../component/Input/Textarea";
import Loading from "../../../../component/Loading/Loading";
import Toast from "../../../../component/Toast/Toast";
import { useTambahKurikulum } from "../../../../hooks/Kurikulum/TambahKurikulum";

export default function TambahKurikulum() {
  const {
    namaKurikulum,
    setNamaKurikulum,
    deskripsi,
    setDeskripsi,
    isLoading,
    toastMessage,
    toastVariant,
    handleSubmit,
  } = useTambahKurikulum();
  return (
    <div className="lg:py-5 min-h-screen lg:min-h-0">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg">Tambah Data Kurikulum</p>
        </div>

        <hr className="border-border-grey border"></hr>

        <form onSubmit={handleSubmit}>
          {/* Input Field */}
          <div className="w-full mt-5">
            <FieldInput
              text=<span>
                Nama Kurikulum <span className="text-red-500">*</span>
              </span>
              type="text"
              variant="biasa_text_sm"
              value={namaKurikulum}
              onChange={(e) => setNamaKurikulum(e.target.value)}
            ></FieldInput>
          </div>

          <div className="w-full mt-5">
            <Textarea
              text=<span>
                Deskripsi Kurikulum <span className="text-red-500">*</span>
              </span>
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
            ></Textarea>
          </div>

          {/* Button */}
          <div className="flex justify-end items-center mt-5">
            <div className="me-2">
              <ButtonHref
                text="Batal"
                variant="cancel"
                href="/dashboard/akademik/kurikulum"
              ></ButtonHref>
            </div>
            <div className="w-40">
              <Button
                text={isLoading ? <Loading /> : "Tambah Kurikulum"}
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
