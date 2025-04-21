import FieldInput from "../../../component/Input/FieldInput";
import Button from "../../../component/Button/Button";
import ButtonHref from "../../../component/Button/ButtonHref";

export default function UpdateKelas() {
  return (
    <div className="lg:py-5">
      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg">Tambah Data Kelas</p>
        </div>

        <hr className="border-border-grey border"></hr>

        {/* Form */}
        <form>
          {/* Input Field */}
          <div className="w-full flex justify-between mt-2">
            <div className="w-1/2 me-1">
              <FieldInput
                text=<span>
                  Nama Kelas <span className="text-red-500">*</span>
                </span>
                type="text"
                name="nama_kelas"
                variant="biasa_text_sm"
              ></FieldInput>
            </div>

            <div className="w-1/2 ms-1">
              <FieldInput
                text=<span>
                  Tingkat Kelas <span className="text-red-500">*</span>
                </span>
                type="text"
                name="tingkat_kelas"
                variant="biasa_text_sm"
              ></FieldInput>
            </div>
          </div>

          <div className="w-full flex justify-between mt-2">
            <div className="w-1/2 me-1">
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-sm font-normal">
                  Pilih Wali Kelas<span className="text-red-500">*</span>
                </legend>
                <select
                  defaultValue="Pick a browser"
                  className="select border border-border-grey w-full rounded-lg"
                >
                  <option value="" selected hidden>
                    -- Pilih --
                  </option>
                  <option>test 1</option>
                  <option>test 2</option>
                  <option>test 3</option>
                </select>
              </fieldset>
            </div>

            <div className="w-1/2 ms-1">
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-sm font-normal">
                  Pilih Tahun Akademik<span className="text-red-500">*</span>
                </legend>
                <select
                  defaultValue="Pick a browser"
                  className="select border border-border-grey w-full rounded-lg"
                >
                  <option value="" selected hidden>
                    -- Pilih --
                  </option>
                  <option>test 1</option>
                  <option>test 2</option>
                  <option>test 3</option>
                </select>
              </fieldset>
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-end items-center mt-5">
            <div className="me-2">
              <ButtonHref
                text="Cancel"
                variant="cancel"
                href="/dashboard/kelas"
              ></ButtonHref>
            </div>
            <div className="w-40">
              <Button text="Update Kelas" variant="button_submit_dash"></Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
