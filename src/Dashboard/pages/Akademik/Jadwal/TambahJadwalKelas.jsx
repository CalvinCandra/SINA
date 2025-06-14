import FieldInput from "../../../../component/Input/FieldInput";
import SelectField from "../../../../component/Input/SelectField";
import ButtonHref from "../../../../component/Button/ButtonHref";
import Button from "../../../../component/Button/Button";
import Loading from "../../../../component/Loading/Loading";
import Toast from "../../../../component/Toast/Toast";
import { useTambahJadwal } from "../../../../hooks/Jadwal/TambahJadwal";

export default function TambahJadwalKelas() {
  const {
    kelas_id,
    isLoading,
    toastMessage,
    toastVariant,
    tambahFormHari,
    GuruOption,
    MapelOption,
    hariOptions,
    handleSubmit,
    jadwalList,
    setJadwalList,
    setSelectedGuru,
    selectedGuru,
    setSelectedMapel,
    selectedMapel,
  } = useTambahJadwal();
  return (
    <div className="lg:py-5">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="w-full p-5 rounded-md bg-white mt-5">
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg">Tambah Jadwal Pelajaran</p>
        </div>
        <hr className="border-border-grey border"></hr>

        <form
          onSubmit={handleSubmit}
          className={`${isLoading ? "pointer-events-none opacity-50" : ""}`}
        >
          <div className="w-full mt-5">
            <SelectField
              text="Mata Pelajaran"
              option={MapelOption}
              value={selectedMapel}
              onChange={(e) => setSelectedMapel(e.target.value)}
            />
          </div>
          <div className="w-full mt-3">
            <SelectField
              text="Guru Pengampu"
              option={GuruOption}
              value={selectedGuru}
              onChange={(e) => setSelectedGuru(e.target.value)}
            />
          </div>
          <hr className="border-border-black border my-8" />
          {jadwalList.map((item, index) => (
            <div key={index} className="w-full space-y-4 mb-6">
              <SelectField
                text="Hari"
                option={hariOptions}
                value={item.hari}
                onChange={(e) => {
                  const newList = [...jadwalList];
                  newList[index].hari = e.target.value;
                  setJadwalList(newList);
                }}
              />
              <div className="w-full">
                <FieldInput
                  text={
                    <span>
                      Sesi <span className="text-red-500">*</span>
                    </span>
                  }
                  type="text"
                  value={item.jam_ke}
                  onChange={(e) => {
                    const newList = [...jadwalList];
                    newList[index].jam_ke = e.target.value;
                    setJadwalList(newList);
                  }}
                  variant="biasa_text_sm"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-10">
                <div className="w-full md:w-1/2">
                  <FieldInput
                    text={
                      <span>
                        Jam Mulai <span className="text-red-500">*</span>
                      </span>
                    }
                    type="time"
                    value={item.start}
                    onChange={(e) => {
                      const newList = [...jadwalList];
                      newList[index].start = e.target.value;
                      setJadwalList(newList);
                    }}
                    variant="biasa_text_sm"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <FieldInput
                    text={
                      <span>
                        Jam Berakhir <span className="text-red-500">*</span>
                      </span>
                    }
                    type="time"
                    value={item.finish}
                    onChange={(e) => {
                      const newList = [...jadwalList];
                      newList[index].finish = e.target.value;
                      setJadwalList(newList);
                    }}
                    variant="biasa_text_sm"
                  />
                </div>
              </div>
              <div className="w-full">
                <FieldInput
                  text={
                    <span>
                      Ruangan <span className="text-red-500">*</span>
                    </span>
                  }
                  type="text"
                  value={item.ruangan}
                  onChange={(e) => {
                    const newList = [...jadwalList];
                    newList[index].ruangan = e.target.value;
                    setJadwalList(newList);
                  }}
                  variant="biasa_text_sm"
                />
              </div>
              <hr className="border-border-black border my-8" />
            </div>
          ))}
          <div className="mt-4">
            <button
              type="button"
              onClick={tambahFormHari}
              className="border border-blue-500 hover:bg-blue-200 text-black text-sm font-semibold px-4 py-2 rounded-md"
            >
              + Tambah Hari
            </button>
          </div>
          <div className="flex justify-end items-center mt-10">
            <div className="me-2">
              <ButtonHref
                text="Batal"
                variant="cancel"
                href={`/dashboard/akademik/jadwal-kelas/${kelas_id}`}
              />
            </div>
            <div className="w-40">
              <Button
                text={isLoading ? <Loading /> : "Tambah"}
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
