import ButtonHref from "../../../component/Button/ButtonHref";
import Button from "../../../component/Button/Button";
import SelectField from "../../../component/Input/SelectField";
import Loading from "../../../component/Loading/Loading";
import Toast from "../../../component/Toast/Toast";
import { useNaikKelas } from "../../../hooks/Siswa/NaikKelas";

export default function NaikKelas() {
  const {
    dataSiswa,
    selectedSiswa,
    setSelectedSiswa,
    selectedKelas,
    setSelectedKelas,
    selectedKelasNon,
    setSelectedKelasNon,
    KelasNonAktifOptions,
    KelasOptions,
    isLoading,
    toastMessage,
    toastVariant,
    handleSubmit,
    toggleSelectAll,
    isAllSelected,
  } = useNaikKelas();

  return (
    <div className="lg:py-5">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="w-full p-5 rounded-md bg-white mt-5">
        <div className="w-full flex flex-col lg:flex-row justify-between items-center">
          <p className="font-semibold text-lg mb-3">Naik Kelas</p>
        </div>

        <hr className="border-border-grey border"></hr>

        <form
          onSubmit={handleSubmit}
          className={`${isLoading ? "pointer-events-none opacity-50" : ""}`}
        >
          {/* Select Kelas Awal (Nonaktif) */}
          <div className="w-full mt-5">
            <SelectField
              text="Pilih Kelas Awal (Nonaktif)"
              option={KelasNonAktifOptions}
              value={selectedKelasNon}
              onChange={(e) => setSelectedKelasNon(e.target.value)}
              required
            />
          </div>

          {/* Tampilkan hanya jika kelas awal dipilih */}
          {selectedKelasNon && (
            <>
              <div className="w-full mt-5">
                <div className="flex items-center gap-4 mb-3">
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={isAllSelected}
                    onChange={toggleSelectAll}
                  />
                  <span className="text-sm font-semibold">
                    Pilih Semua Siswa
                  </span>
                </div>

                {dataSiswa.map((item) => (
                  <div className="flex items-center gap-4 py-2" key={item.nis}>
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      value={item.nis}
                      checked={selectedSiswa.includes(item.nis)}
                      onChange={(e) => {
                        const id = item.nis;
                        setSelectedSiswa((prev) =>
                          e.target.checked
                            ? [...prev, id]
                            : prev.filter((itemId) => itemId !== id)
                        );
                      }}
                    />
                    <label className="text-sm">{item.nama_siswa}</label>
                  </div>
                ))}
              </div>

              {/* Kelas Tujuan */}
              <div className="w-full mt-5">
                <SelectField
                  text="Kelas Tujuan"
                  option={KelasOptions}
                  value={selectedKelas}
                  onChange={(e) => setSelectedKelas(e.target.value)}
                  required
                />
              </div>

              {/* Button */}
              <div className="flex justify-end items-center mt-10">
                <div className="me-2">
                  <ButtonHref
                    text="Cancel"
                    variant="cancel"
                    href={`/dashboard/siswa`}
                  />
                </div>
                <div className="w-40">
                  <Button
                    text={isLoading ? <Loading /> : "Naik Kelas"}
                    variant="button_submit_dash"
                    disabled={isLoading}
                  />
                </div>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
