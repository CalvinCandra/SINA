import FieldInput from "../../../../component/Input/FieldInput";
import Button from "../../../../component/Button/Button";
import ButtonHref from "../../../../component/Button/ButtonHref";

export default function TambahMataPelajaran() {
  return (
    <div className="lg:py-5">
      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg">Tambah Data Mata Pelajaran</p>
        </div>

        <hr className="border-border-grey border"></hr>

        {/* Form */}
        <form>
          {/* Input Field */}
          <div className="w-full mt-5">
            <FieldInput
              text=<span>
                Mata Pelajaran <span className="text-red-500">*</span>
              </span>
              type="text"
              name="mata_pelajaran"
              variant="biasa_text_sm"
            ></FieldInput>
          </div>

          <div className="w-full mt-5">
            <FieldInput
              text=<span>
                KKM <span className="text-red-500">*</span>
              </span>
              type="number"
              name="kkm"
              variant="biasa_text_sm"
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
                text="Tambah Mata Pelajaran"
                variant="button_submit_dash"
              ></Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
