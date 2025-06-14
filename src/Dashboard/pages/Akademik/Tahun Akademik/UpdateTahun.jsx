import FieldInput from "../../../../component/Input/FieldInput";
import Button from "../../../../component/Button/Button";
import ButtonHref from "../../../../component/Button/ButtonHref";
import SelectField from "../../../../component/Input/SelectField";
import Loading from "../../../../component/Loading/Loading";
import Toast from "../../../../component/Toast/Toast";
import { useUpdateTahunAkademik } from "../../../../hooks/TahunAkademik/UpdateTahunAkademik";

export default function UpdateTahun() {
  const {
    namaKurikulum,
    setNamaKurikulum,
    TglAkhir,
    setTglAkhir,
    TglMulai,
    setTglMulai,
    status,
    setStatus,
    isLoading,
    toastMessage,
    toastVariant,
    KurikulumOption,
    statusOption,
    handleSubmit,
  } = useUpdateTahunAkademik();
  return (
    <div className="lg:py-5">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg">Update Data Tahun Kurikulum</p>
        </div>

        <hr className="border-border-grey border"></hr>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className={`${isLoading ? "pointer-events-none opacity-50" : ""}`}
        >
          {/* Input Field */}
          <div className="w-full me-1 mt-5">
            <SelectField
              text="Nama Kurikulum"
              option={KurikulumOption}
              value={namaKurikulum}
              onChange={(e) => setNamaKurikulum(e.target.value)}
            ></SelectField>
          </div>

          <div className="flex flex-col lg:flex-row w-full justify-between">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                text=<span>
                  Tanggal Mulai <span className="text-red-500">*</span>
                </span>
                type="date"
                variant="biasa_text_sm"
                value={TglMulai}
                onChange={(e) => setTglMulai(e.target.value)}
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                text=<span>
                  Tanggal Akhir <span className="text-red-500">*</span>
                </span>
                type="date"
                variant="biasa_text_sm"
                value={TglAkhir}
                onChange={(e) => setTglAkhir(e.target.value)}
              ></FieldInput>
            </div>
          </div>

          <div className="w-full me-1">
            <SelectField
              text="Status"
              option={statusOption}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            ></SelectField>
          </div>

          {/* Button */}
          <div className="flex justify-end items-center mt-5">
            <div className="me-2">
              <ButtonHref
                text="Cancel"
                variant="cancel"
                href="/dashboard/akademik/tahun-akademik"
              ></ButtonHref>
            </div>
            <div className="w-40">
              <Button
                text={isLoading ? <Loading /> : "Update Kurikulum"}
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
