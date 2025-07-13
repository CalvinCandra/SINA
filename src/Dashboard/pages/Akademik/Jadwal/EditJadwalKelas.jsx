import FieldInput from "../../../../component/Input/FieldInput";
import SelectField from "../../../../component/Input/SelectField";
import ButtonHref from "../../../../component/Button/ButtonHref";
import Button from "../../../../component/Button/Button";
import Loading from "../../../../component/Loading/Loading";
import Toast from "../../../../component/Toast/Toast";
import { useUpdateJadwal } from "../../../../hooks/Jadwal/UpdateJadwal";
import { useEffect } from "react";

export default function EditJadwalKelas() {
  const {
    kelas_id,
    isLoading,
    toastMessage,
    toastVariant,
    sesiOptions,
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
  } = useUpdateJadwal();

  // useEffect(() => {
  //   console.log("MapelOption updated:", MapelOption);
  //   console.log("Selected Mapel:", selectedMapel);
  //   // Reset the jadwalList when the component mounts
  // }, [MapelOption]);
  return (
    <div className="lg:py-5">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="w-full p-5 rounded-md bg-white mt-5">
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg">Update Jadwal Pelajaran</p>
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
                <SelectField
                  text={<span>Sesi</span>}
                  option={sesiOptions}
                  value={item.jam_ke}
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    const selectedOption = sesiOptions.find(
                      (opt) => opt.value === selectedValue
                    );

                    const newList = [...jadwalList];
                    newList[index].jam_ke = selectedOption.value;
                    newList[index].start = selectedOption.start;
                    newList[index].finish = selectedOption.finish;
                    setJadwalList(newList);
                  }}
                />
              </div>
              <div className="flex flex-col md:flex-row md:gap-10">
                <div className="w-full md:w-1/2">
                  <FieldInput
                    text={
                      <span>
                        Jam Mulai <span className="text-red-500">*</span>
                      </span>
                    }
                    type="time"
                    value={item.start}
                    readonly
                    variant="biasa_text_sm_disabled"
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
                    readonly
                    variant="biasa_text_sm_disabled"
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
                text={isLoading ? <Loading /> : "Update"}
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
