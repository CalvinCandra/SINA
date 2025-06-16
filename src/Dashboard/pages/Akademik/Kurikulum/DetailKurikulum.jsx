import ButtonHref from "../../../../component/Button/ButtonHref";
import baseUrl from "../../../../utils/config/baseUrl";
import Toast from "../../../../component/Toast/Toast";
import { useDetailKurikulum } from "../../../../hooks/Kurikulum/DetailKurikulum";

export default function DetailKurikulum() {
  const {
    isLoading,
    toastMessage,
    toastVariant,
    namaKurikulum,
    deskirpsi,
    jenjang,
    tingkat,
    mapel,
  } = useDetailKurikulum();

  return (
    <div className="lg:py-5">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg capitalize">
            Detail Informasi Kurikulum
          </p>
        </div>

        <hr className="border-border-grey border"></hr>

        <div className="w-full mt-8">
          {isLoading ? (
            <div className="font-semibold text-center text-base italic">
              {" "}
              Loading ...{" "}
            </div>
          ) : (
            <div className="w-full mt-8">
              <div className="w-full my-5 text-base border-b pb-2 border-gray-300">
                <label className="mb-2 font-bold">Nama Kurikulum</label>
                <h2 className="">{namaKurikulum}</h2>
              </div>

              <div className="w-full my-5 text-base border-b pb-2 border-gray-300">
                <label className="mb-2 font-bold">Deskripsi Kurikulum</label>
                <p className="">{deskirpsi}</p>
              </div>

              <div className="w-full my-5 text-base border-b pb-2 border-gray-300">
                <label className="mb-2 font-bold">Detail Pendidikan</label>
                <p className="">
                  Jenjang <span className="uppercase"> {jenjang}</span> Tingkat{" "}
                  {tingkat}
                </p>
              </div>

              <div className="w-full my-5 text-base border-b pb-2 border-gray-300">
                <label className="mb-2 font-bold">Mata Pelajaran</label>
                {mapel.map((item, index) => (
                  <p className="my-1">
                    {index + 1}). {item.nama_mapel}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Button */}
        <div className="flex justify-end items-center mt-10">
          <div className="">
            <ButtonHref
              text="Kembali"
              variant="cancel"
              href="/dashboard/akademik/kurikulum"
            ></ButtonHref>
          </div>
        </div>
      </div>
    </div>
  );
}
