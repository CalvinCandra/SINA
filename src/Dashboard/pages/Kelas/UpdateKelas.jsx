import FieldInput from "../../../component/Input/FieldInput";
import Button from "../../../component/Button/Button";
import ButtonHref from "../../../component/Button/ButtonHref";
import SelectField from "../../../component/Input/SelectField";

export default function UpdateKelas() {
  const WaliKelas = [
    {
      value: "dravin1",
      label: "Draviin",
    },
    {
      value: "dravin1",
      label: "Draviinn",
    },
    {
      value: "dravin1",
      label: "Draviiinnn",
    },
  ];

  const TahunAkademik = [
    {
      value: "2023/2024",
      label: "2023 / 2024",
    },
    {
      value: "2023/2024",
      label: "2023 / 2024",
    },
    {
      value: "2023/2024",
      label: "2023 / 2024",
    },
  ];
  return (
    <div className="lg:py-5">
      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg">Update Data Kelas</p>
        </div>

        <hr className="border-border-grey border"></hr>

        {/* Form */}
        <form>
          {/* Input Field */}
          <div className="w-full flex flex-col lg:flex-row justify-between mt-2">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                text=<span>
                  Nama Kelas <span className="text-red-500">*</span>
                </span>
                type="text"
                name="nama_kelas"
                variant="biasa_text_sm"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
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

          <div className="w-full flex flex-col lg:flex-row justify-between mt-2">
            <div className="w-full lg:w-1/2 lg:me-1">
              <SelectField text="Wali Kelas" option={WaliKelas}></SelectField>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <SelectField
                text="Tahun Akademik"
                option={TahunAkademik}
              ></SelectField>
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
