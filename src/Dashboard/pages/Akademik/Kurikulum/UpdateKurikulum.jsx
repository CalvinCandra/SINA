import FieldInput from "../../../../component/Input/FieldInput";
import Button from "../../../../component/Button/Button";
import ButtonHref from "../../../../component/Button/ButtonHref";
import Textarea from "../../../../component/Input/Textarea";
import Loading from "../../../../component/Loading/Loading";
import Toast from "../../../../component/Toast/Toast";
import { useUpdateKurikulum } from "../../../../hooks/Kurikulum/UpdateKurikulum";
import DinamisSelect from "../../../../component/Input/DinamisSelect";

export default function UpdateKurikulum() {
  const {
    namaKurikulum,
    setNamaKurikulum,
    deskripsi,
    setDeskripsi,
    isLoading,
    toastMessage,
    toastVariant,
    handleSubmit,
    dataMapel,
    selectedMapel,
    setSelectedMapel,
    jenjang,
    setJenjang,
    tingkat,
    setTingkat,
    jenjangOptions,
    tingkatOptionsMap,
  } = useUpdateKurikulum();
  return (
    <div className="lg:py-5 min-h-screen lg:min-h-0">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg">Update Data Kurikulum</p>
        </div>

        <hr className="border-border-grey border"></hr>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className={`${isLoading ? "pointer-events-none opacity-50" : ""}`}
        >
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

          <div className="w-full mt-5">
            <div className="flex flex-col lg:flex-row w-full justify-between gap-5">
              <div className="w-full lg:w-1/2">
                <DinamisSelect
                  text="Jenjang Pendidikan"
                  value={jenjang}
                  onChange={(e) => setJenjang(e.target.value)}
                  option={jenjangOptions}
                />
              </div>
              <div className="w-full lg:w-1/2">
                <DinamisSelect
                  text="Tingkat"
                  value={tingkat}
                  onChange={(e) => setTingkat(e.target.value)}
                  option={tingkatOptionsMap[jenjang] || []}
                  disabled={!jenjang} // disable jika jenjang belum dipilih
                />
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="w-full mt-5 italic text-gray-400 font-semibold">
              Loading ...
            </div>
          ) : dataMapel == 0 && dataMapel.length == 0 ? (
            <div className="w-full mt-5 italic text-gray-400 font-semibold">
              Data Mapel Belum Ada
            </div>
          ) : (
            <div className="w-full mt-5">
              <span className="text-sm font-semibold">
                Mata Pelajaran <span className="text-red-500">*</span>
              </span>
              {dataMapel.map((item, index) => (
                <div
                  className="flex items-center gap-4 gap-y-10"
                  key={index + 1}
                >
                  <input
                    type="checkbox"
                    className="cursor-pointer my-3"
                    value={item.mapel_id}
                    checked={selectedMapel.includes(item.mapel_id)}
                    onChange={(e) => {
                      const id = item.mapel_id;
                      if (e.target.checked) {
                        setSelectedMapel([...selectedMapel, id]);
                      } else {
                        setSelectedMapel(
                          selectedMapel.filter((itemId) => itemId !== id)
                        );
                      }
                    }}
                  />
                  <label className="text-sm">{item.nama_mapel}</label>
                </div>
              ))}
            </div>
          )}

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
                text={isLoading ? <Loading /> : "Update"}
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
