import InputFile from "../../../component/Input/InputFile";
import ButtonHref from "../../../component/Button/ButtonHref";
import Textarea from "../../../component/Input/Textarea";
import Button from "../../../component/Button/Button";
import SelectField from "../../../component/Input/SelectField";
import Loading from "../../../component/Loading/Loading";
import Toast from "../../../component/Toast/Toast";
import FieldInput from "../../../component/Input/FieldInput";
import { useTambahSiswa } from "../../../hooks/Siswa/TambahSiswa";
import SelectPekerjaan from "../../../component/Input/SelectPekerjaan";

export default function TambahSiswa() {
  const {
    isLoading,
    toastMessage,
    toastVariant,
    agamaOption,
    kelaminOption,
    handleImageChange,
    preview,
    handleSubmit,
    form,
    defaultImage,
    kelas_id,
    nikError,
    nisnError,
    handleNISNChange,
    handleNIKChange,
  } = useTambahSiswa();

  return (
    <div className="lg:py-5">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg mb-3">Tambah Data Siswa</p>
        </div>

        <hr className="border-border-grey border"></hr>

        <form
          onSubmit={handleSubmit}
          className={`${isLoading ? "pointer-events-none opacity-50" : ""}`}
        >
          {/* Gambar */}
          <div className="flex flex-col justify-center items-center">
            <div className="p-1 w-60 h-64 my-3 overflow-hidden">
              <img
                src={preview || defaultImage}
                alt="Preview"
                id="ImagePreview"
                className="w-full h-full object-object rounded"
              />
            </div>

            <InputFile text="Pilih Foto" fungsi={handleImageChange} />
          </div>

          {/* Input Field Siswa*/}
          {/* Input Field Baris 1*/}
          <div className="w-full flex flex-col lg:flex-row justify-between mt-5 lg:mb-4">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                text=<span>
                  Nama Lengkap <span className="text-red-500">*</span>
                </span>
                value={form.siswa.namaSiswa}
                onChange={(e) => form.siswa.setNamaSiswa(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                type="email"
                text=<span>Email</span>
                value={form.siswa.emailSiswa}
                onChange={(e) => form.siswa.setEmailSiswa(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>
          </div>

          {/* Input Field Baris 2*/}
          <div className="w-full flex flex-col lg:flex-row justify-between lg:mb-4">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                text=<span>
                  NIS <span className="text-red-500">*</span>
                </span>
                value={form.siswa.nisSiswa}
                variant="biasa_text_sm"
                onChange={(e) => form.siswa.setNisSiswa(e.target.value)}
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                text={
                  <span>
                    NISN <span className="text-red-500">*</span>
                  </span>
                }
                type="number"
                value={form.siswa.nisnSiswa}
                onChange={(e) => {
                  const value = e.target.value.slice(0, 10);
                  form.siswa.setNisnSiswa(value);
                  handleNISNChange(value);
                }}
                variant="biasa_text_sm"
              />
              {nisnError && (
                <span className="text-sm italic text-red-500">{nisnError}</span>
              )}
            </div>
          </div>

          {/* Input Field Baris 3*/}
          <div className="w-full flex flex-col lg:flex-row justify-between lg:mb-4">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                text=<span>
                  Tempat Lahir <span className="text-red-500">*</span>
                </span>
                value={form.siswa.tempatLahirSiswa}
                variant="biasa_text_sm"
                onChange={(e) => form.siswa.settempatLahirSiswa(e.target.value)}
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                type="date"
                text=<span>
                  Tanggal Lahir <span className="text-red-500">*</span>
                </span>
                value={form.siswa.tglLahirSiswa}
                variant="biasa_text_sm"
                onChange={(e) => form.siswa.settglLahirSiswa(e.target.value)}
              ></FieldInput>
            </div>
          </div>

          {/* Input Field Baris 4*/}
          <div className="w-full flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/2 lg:me-1">
              <SelectField
                text=<span>Agama</span>
                option={agamaOption}
                value={form.siswa.agama}
                onChange={(e) => form.siswa.setAgamaSiswa(e.target.value)}
              />
            </div>

            <div className="w-full lg:w-1/2 lg:mx-1">
              <SelectField
                text=<span>Kelamin</span>
                option={kelaminOption}
                value={form.siswa.kelamin}
                onChange={(e) => form.siswa.setkelaminSiswa(e.target.value)}
              />
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                text=<span>
                  No Telepon <span className="text-red-500">*</span>
                </span>
                value={form.siswa.telpSiswa}
                variant="biasa_text_sm"
                onChange={(e) => form.siswa.setTelpSiswa(e.target.value)}
              ></FieldInput>
            </div>
          </div>

          <div className="w-full">
            <Textarea
              text=<span>
                Alamat <span className="text-red-500">*</span>
              </span>
              value={form.siswa.alamatSiswa}
              onChange={(e) => form.siswa.setAlamatSiswa(e.target.value)}
            ></Textarea>
          </div>

          {/* Input Field Ayah*/}
          <div className="bg-biru-active mt-6 py-2 px-2 lg:mb-4">
            <h1 className="font-semibold text-white text-lg">Ayah</h1>
          </div>
          {/* Input Field Baris 1*/}
          <div className="w-full flex flex-col lg:flex-row justify-between mt-3 lg:mb-4 gap-2">
            <div className="w-full lg:w-1/3">
              <FieldInput
                text=<span>
                  Nama Lengkap <span className="text-red-500">*</span>
                </span>
                onChange={(e) => form.ayah.setNamaAyah(e.target.value)}
                value={form.ayah.namaAyah}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/3">
              <FieldInput
                text={
                  <span>
                    NIK <span className="text-red-500">*</span>
                  </span>
                }
                type="number"
                value={form.ayah.nikAyah}
                onChange={(e) => {
                  const value = e.target.value.slice(0, 16);
                  form.ayah.setNikAyah(value);
                  handleNIKChange(value);
                }}
                variant="biasa_text_sm"
              />
              {nikError && (
                <span className="text-sm italic text-red-500">{nikError}</span>
              )}
            </div>

            <div className="w-full lg:w-1/3">
              <FieldInput
                type="email"
                text=<span>
                  Email <span className="text-red-500">*</span>
                </span>
                value={form.ayah.emailAyah}
                onChange={(e) => form.ayah.setEmailAyah(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>
          </div>

          {/* Input Field Baris 2*/}
          <div className="w-full flex flex-col lg:flex-row justify-between lg:mb-4">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                text=<span>
                  Tempat Lahir <span className="text-red-500">*</span>
                </span>
                value={form.ayah.tempatLahirAyah}
                onChange={(e) => form.ayah.settempatLahirAyah(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                type="date"
                text=<span>
                  Tanggal Lahir <span className="text-red-500">*</span>
                </span>
                value={form.ayah.tglLahirAyah}
                onChange={(e) => form.ayah.settglLahirAyah(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>
          </div>

          {/* Input Field Baris 3*/}
          <div className="w-full flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/2 lg:me-1">
              <SelectPekerjaan
                label=<span>
                  Pekerjaaan <span className="text-red-500">*</span>
                </span>
                value={form.ayah.pekerjaanAyah}
                onChange={(val) => form.ayah.setPekerjaanAyah(val)}
                required
              />
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                text=<span>
                  No Handphone <span className="text-red-500">*</span>
                </span>
                value={form.ayah.telpAyah}
                onChange={(e) => form.ayah.setTelpAyah(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>
          </div>

          <div className="w-full">
            <Textarea
              text=<span>
                Alamat <span className="text-red-500">*</span>
              </span>
              value={form.ayah.alamatAyah}
              onChange={(e) => form.ayah.setAlamatAyah(e.target.value)}
            ></Textarea>
          </div>

          {/* Input Field Ibu*/}
          <div className="bg-biru-active mt-6 py-2 px-2">
            <h1 className="font-semibold text-white text-lg">Ibu</h1>
          </div>
          {/* Input Field Baris 1*/}
          <div className="w-full flex flex-col lg:flex-row justify-between mt-3 lg:mb-4 gap-2">
            <div className="w-full lg:w-1/3">
              <FieldInput
                text=<span>
                  Nama Lengkap <span className="text-red-500">*</span>
                </span>
                value={form.ibu.namaIbu}
                onChange={(e) => form.ibu.setNamaIbu(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/3">
              <FieldInput
                text={
                  <span>
                    NIK <span className="text-red-500">*</span>
                  </span>
                }
                type="number"
                value={form.ibu.nikIbu}
                onChange={(e) => {
                  const value = e.target.value.slice(0, 16);
                  form.ibu.setNikIbu(value);
                  handleNIKChange(value);
                }}
                variant="biasa_text_sm"
              />
              {nikError && (
                <span className="text-sm italic text-red-500">{nikError}</span>
              )}
            </div>

            <div className="w-full lg:w-1/3">
              <FieldInput
                type="email"
                text=<span>
                  Email <span className="text-red-500">*</span>
                </span>
                value={form.ibu.emailIbu}
                onChange={(e) => form.ibu.setEmailIbu(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>
          </div>

          {/* Input Field Baris 2*/}
          <div className="w-full flex flex-col lg:flex-row justify-between lg:mb-4">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                text=<span>
                  Tempat Lahir <span className="text-red-500">*</span>
                </span>
                value={form.ibu.tempatLahirIbu}
                onChange={(e) => form.ibu.settempatLahirIbu(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                type="date"
                text=<span>
                  Tanggal Lahir <span className="text-red-500">*</span>
                </span>
                value={form.ibu.tglLahirIbu}
                onChange={(e) => form.ibu.settglLahirIbu(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>
          </div>

          {/* Input Field Baris 3*/}
          <div className="w-full flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/2 lg:me-1">
              <SelectPekerjaan
                label=<span>
                  Pekerjaaan <span className="text-red-500">*</span>
                </span>
                value={form.ibu.pekerjaanIbu}
                onChange={(val) => form.ibu.setPekerjaanIbu(val)}
                required
              />
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                text=<span>
                  No Handphone <span className="text-red-500">*</span>
                </span>
                value={form.ibu.telpIbu}
                onChange={(e) => form.ibu.setTelpIbu(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>
          </div>

          <div className="w-full">
            <Textarea
              text=<span>
                Alamat <span className="text-red-500">*</span>
              </span>
              value={form.ibu.alamatIbu}
              onChange={(e) => form.ibu.setAlamatIbu(e.target.value)}
            ></Textarea>
          </div>

          {/* Input Field Wali*/}
          <div className="bg-biru-active mt-6 py-2 px-2">
            <h1 className="font-semibold text-white text-lg">Wali</h1>
          </div>
          {/* Input Field Baris 1*/}
          <div className="w-full flex flex-col lg:flex-row justify-between mt-3 lg:mb-4 gap-2">
            <div className="w-full lg:w-1/3">
              <FieldInput
                text=<span>Nama Lengkap</span>
                value={form.wali.namaWali}
                onChange={(e) => form.wali.setNamaWali(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/3">
              <FieldInput
                text={<span>NIK</span>}
                type="number"
                value={form.wali.nikWali}
                onChange={(e) => {
                  const value = e.target.value.slice(0, 16);
                  form.wali.setNikWali(value);
                  handleNIKChange(value);
                }}
                variant="biasa_text_sm"
              />
              {nikError && (
                <span className="text-sm italic text-red-500">{nikError}</span>
              )}
            </div>

            <div className="w-full lg:w-1/3">
              <FieldInput
                type="email"
                text=<span>Email</span>
                value={form.wali.emailWali}
                onChange={(e) => form.wali.setEmailWali(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>
          </div>

          {/* Input Field Baris 2*/}
          <div className="w-full flex flex-col lg:flex-row justify-between lg:mb-4">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                text=<span>Tempat Lahir</span>
                value={form.wali.tempatLahirWali}
                onChange={(e) => form.wali.settempatLahirWali(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                type="date"
                text=<span>Tanggal Lahir</span>
                value={form.wali.tglLahirWali}
                onChange={(e) => form.wali.settglLahirWali(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>
          </div>

          {/* Input Field Baris 3*/}
          <div className="w-full flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/2 lg:me-1">
              <SelectPekerjaan
                label="Pekerjaan"
                value={form.wali.pekerjaanWali}
                onChange={(val) => form.wali.setPekerjaanWali(val)}
                required
              />
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                text=<span>No Handphone</span>
                value={form.wali.telpWali}
                onChange={(e) => form.wali.setTelpWali(e.target.value)}
                variant="biasa_text_sm"
              ></FieldInput>
            </div>
          </div>

          <div className="w-full">
            <Textarea
              text=<span>Alamat</span>
              value={form.wali.alamatWali}
              onChange={(e) => form.wali.setAlamatWali(e.target.value)}
            ></Textarea>
          </div>

          {/* Button */}
          <div className="flex justify-end items-center mt-10">
            <div className="me-2">
              <ButtonHref
                text="Cancel"
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
        </form>
      </div>
    </div>
  );
}
