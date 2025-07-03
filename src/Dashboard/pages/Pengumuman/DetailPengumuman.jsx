import ButtonHref from "../../../component/Button/ButtonHref";
import baseUrl from "../../../utils/config/baseUrl";
import { useDetailPengumuman } from "../../../hooks/Pengumuman/DetailPengumuman";
import Toast from "../../../component/Toast/Toast";

export default function DetailPengumuman() {
  const {
    toastMessage,
    toastVariant,
    Gambar,
    Judul,
    deskirpsi,
    kategori,
    username,
    tgl,
    isLoading,
  } = useDetailPengumuman();

  return (
    <div className="lg:py-5">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg capitalize">
            Detail Informasi {kategori}
          </p>
        </div>

        <hr className="border-border-grey border"></hr>

        <div className="w-full mt-8">
          <img
            src={`${baseUrl.apiUrlImage}/Upload/berita/${Gambar}`}
            alt="gambar pengumuman"
            className="h-[384px] w-full rounded-md object-cover"
          />
          <p className="mt-8 font-medium text-base text-gray-400">
            Diupload {tgl} | Dibuat oleh {username}
          </p>
          <h1 className="mt-6 font-bold text-2xl">{Judul}</h1>
          <p
            className="mt-3 text-base text-justify"
            dangerouslySetInnerHTML={{ __html: deskirpsi }}
          ></p>
        </div>
        {/* Button */}
        <div className="flex justify-end items-center mt-10">
          <div className="">
            <ButtonHref
              text="Kembali"
              variant="cancel"
              href="/dashboard/pengumuman"
            ></ButtonHref>
          </div>
        </div>
      </div>
    </div>
  );
}
