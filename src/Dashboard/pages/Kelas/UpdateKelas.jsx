import FieldInput from "../../../component/Input/FieldInput";
import Button from "../../../component/Button/Button";
import ButtonHref from "../../../component/Button/ButtonHref";
import SelectField from "../../../component/Input/SelectField";
import Loading from "../../../component/Loading/Loading";
import Toast from "../../../component/Toast/Toast";
import DinamisSelect from "../../../component/Input/DinamisSelect";
import { useUpdateKelas } from "../../../hooks/Kelas/UpdateKelas";

export default function UpdateKelas() {
  const {
    jenjang,
    setJenjang,
    tingkat,
    setTingkat,
    walikelas,
    setWaliKelas,
    tahun,
    setTahunAkademik,
    isLoading,
    toastMessage,
    toastVariant,
    TahunAkademik,
    WaliKelasOption,
    jenjangOptions,
    tingkatOptionsMap,
    handleSubmit,
    namakelas,
    setNamaKelas,
  } = useUpdateKelas();
  return (
    <div className="lg:py-5">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg">Perbaharui Data Kelas</p>
        </div>

        <hr className="border-border-grey border"></hr>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className={`${isLoading ? "pointer-events-none opacity-50" : ""}`}
        >
          {/* Input Field */}
          <div className="w-full flex flex-col lg:flex-row justify-between mt-2">
            <div className="w-full lg:w-[34%]">
              <FieldInput
                text=<span>
                  Nama Kelas <span className="text-red-500">*</span>
                </span>
                type="text"
                variant="biasa_text_sm"
                value={namakelas}
                onChange={(e) => setNamaKelas(e.target.value)}
              ></FieldInput>
            </div>

            <div className="w-full lg:w-[66%]">
              <div className="flex flex-col lg:flex-row w-full justify-between">
                <div className="w-full lg:w-1/2 lg:mx-2">
                  <DinamisSelect
                    text="Jenjang Pendidikan"
                    value={jenjang}
                    onChange={(e) => {
                      setJenjang(e.target.value);
                      setTingkat("");
                    }}
                    option={jenjangOptions}
                  />
                </div>
                <div className="w-full lg:w-1/2">
                  <DinamisSelect
                    text="Tingkat"
                    value={tingkat}
                    onChange={(e) => setTingkat(e.target.value)}
                    option={tingkatOptionsMap[jenjang?.toLowerCase()] || []}
                    disabled={!jenjang} // disable jika jenjang belum dipilih
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col lg:flex-row justify-between mt-2">
            <div className="w-full lg:w-1/2 lg:me-1">
              <SelectField
                text="Wali Kelas"
                option={WaliKelasOption}
                value={walikelas}
                onChange={(e) => setWaliKelas(e.target.value)}
              ></SelectField>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <SelectField
                text="Tahun Akademik"
                option={TahunAkademik}
                value={tahun}
                onChange={(e) => setTahunAkademik(e.target.value)}
              ></SelectField>
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-end items-center mt-5">
            <div className="me-2">
              <ButtonHref
                text="Batal"
                variant="cancel"
                href="/dashboard/kelas"
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
