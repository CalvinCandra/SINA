import InputFile from "../../../component/Input/InputFile";
import ButtonHref from "../../../component/Button/ButtonHref";
import Button from "../../../component/Button/Button";
import Loading from "../../../component/Loading/Loading";
import Toast from "../../../component/Toast/Toast";
import { useTambahExcelSiswa } from "../../../hooks/Siswa/TambahExcelSiswa";

export default function TambahSiswaExcel() {
  const {
    kelas_id,
    isLoading,
    toastMessage,
    toastVariant,
    handleFile,
    handleSubmit,
  } = useTambahExcelSiswa();

  return (
    <div className="lg:py-5 min-h-screen lg:min-h-0">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg mb-3">
            Tambah Data Siswa (Excel)
          </p>
          <div className="w-[177px]">
            <a
              href="/template/template-siswa.xlsx"
              className="w-full bg-biru-primary text-sm hover:bg-biru-hover py-2 font-semibold text-white rounded cursor-pointer"
              download
            >
              <span className="mx-4">Download Template</span>
            </a>
          </div>
        </div>

        <hr className="border-border-grey border"></hr>

        <form
          onSubmit={handleSubmit}
          className={`${isLoading ? "pointer-events-none opacity-50" : ""}`}
        >
          <div>
            <div className="w-full my-5">
              <InputFile
                variant="w_full"
                text="Pilih File Excel"
                optional="excel"
                accept="excel"
                fungsi={handleFile}
              />
            </div>

            {/* Button */}
            <div className="flex justify-end items-center mt-10">
              <div className="me-2">
                <ButtonHref
                  text="Kembali"
                  variant="cancel"
                  href={`/dashboard/siswa/${kelas_id}`}
                ></ButtonHref>
              </div>
              <div className="w-40">
                <Button
                  text={isLoading ? <Loading /> : "Tambah Siswa"}
                  variant="button_submit_dash"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
