import React from "react";
import { useBerita } from "../../hooks/Landing/BeritaTerkini";
import { Link } from "react-router-dom";
import baseUrl from "../../utils/config/baseUrl";

const BeritaTerkini = () => {
  const { beritaList, isLoading, toastMessage, toastVariant } = useBerita();

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p>Memuat berita terbaru...</p>
      </div>
    );
  }

  if (toastMessage) {
    return (
      <div className={`alert alert-${toastVariant} max-w-7xl mx-auto`}>
        {toastMessage}
      </div>
    );
  }

  if (!beritaList || beritaList.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p>Tidak ada berita tersedia</p>
      </div>
    );
  }

  // Urutkan dari yang terbaru berdasarkan tanggal sebelum di-render
  const sortedBerita = [...beritaList].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  const beritaTerbaru = sortedBerita[0];
  const beritaLama = sortedBerita.slice(1, 5);

  // Fungsi untuk mendapatkan URL gambar lengkap
  const getImageUrl = (foto) => {
    if (!foto) return "https://via.placeholder.com/800x500";
    if (foto.startsWith("http")) return foto;
    return `${baseUrl.apiUrlImage}/Upload/berita/${foto}`;
  };

  // Warna berbeda untuk setiap kategori
  const getCategoryColor = (category) => {
    const colors = {
      pengumuman: "bg-blue-100 text-blue-800",
      berita: "bg-orange-100 text-orange-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  // Fungsi untuk format tanggal relatif
  const formatRelativeTime = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "baru saja";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} menit yang lalu`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} jam yang lalu`;
    if (diffInSeconds < 86400 * 2) return "kemarin";
    if (diffInSeconds < 86400 * 7)
      return `${Math.floor(diffInSeconds / 86400)} hari yang lalu`;
    if (diffInSeconds < 86400 * 30)
      return `${Math.floor(diffInSeconds / (86400 * 7))} minggu yang lalu`;
    if (diffInSeconds < 86400 * 365)
      return `${Math.floor(diffInSeconds / (86400 * 30))} bulan yang lalu`;
    return `${Math.floor(diffInSeconds / (86400 * 365))} tahun yang lalu`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pt-12 pb-32" id="berita">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-biru-primary">
          Berita & Pengumuman
        </h1>
        <p className="text-gray-800 mt-1 text-base">
          Informasi terkini terkait Sivitas Akademika
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Berita utama */}
        <div className="lg:col-span-3">
          <div className="card bg-base-100 image-full h-[440px] shadow-xl hover:shadow-2xl transition-shadow rounded-xl overflow-hidden">
            <figure>
              <img
                src={getImageUrl(beritaTerbaru.foto)}
                alt={beritaTerbaru.judul}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/800x500";
                }}
              />
            </figure>
            <div className="card-body p-8">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <span
                    className={`badge bg-biru-primary mb-2.5 px-4 py-2 text-sm ${getCategoryColor(
                      beritaTerbaru.tipe
                    )}`}
                  >
                    {beritaTerbaru.tipe}
                  </span>
                  <h2 className="card-title text-3xl text-white leading-snug line-clamp-2">
                    {beritaTerbaru.judul}
                  </h2>
                  {/* <p className="text-gray-300 mt-4">
                    {beritaTerbaru.tglLengkap}
                  </p> */}
                  <span className="text-gray-300 mt-3">
                    {formatRelativeTime(beritaTerbaru.createdAt)}
                  </span>
                </div>
                <div className="card-actions">
                  <Link
                    to={`/informasi/${beritaTerbaru.id}`}
                    className="btn bg-biru-primary hover:bg-biru-hover text-white border-none rounded-lg px-6 py-3"
                  >
                    Baca Selengkapnya
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Berita lainnya */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-4 h-[440px]">
            {beritaLama.map((berita) => (
              <div
                key={berita.id}
                className="card bg-base-100 image-full shadow-sm hover:shadow-md transition-shadow rounded-lg overflow-hidden"
              >
                <figure className="relative h-full w-full">
                  <img
                    src={getImageUrl(berita.foto)}
                    alt={berita.judul}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x300";
                    }}
                  />
                </figure>
                <div className="card-body p-4 relative z-10 flex flex-col justify-between">
                  <div>
                    <span
                      className={`badge bg-biru-primary badge-sm mb-2 px-2 ${getCategoryColor(
                        beritaTerbaru.tipe
                      )}`}
                    >
                      {berita.tipe}
                    </span>
                    <h3 className="text-white text-sm font-semibold line-clamp-2 leading-tight">
                      {berita.judul}
                    </h3>
                    <p className="text-gray-300 text-xs mt-1">
                      {berita.tglSingkat}
                    </p>
                  </div>
                  <div className="card-actions justify-start">
                    <Link
                      to={`/informasi/${berita.id}`}
                      className="btn bg-biru-primary text-white btn-sm hover:bg-biru-hover rounded-lg border-none px-3"
                    >
                      Baca
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <Link
          to="/informasi"
          className="mt-6 px-6 py-3 bg-biru-primary text-white rounded-lg hover:bg-biru-hover transition-colors font-semibold"
        >
          Lihat Semua Informasi
        </Link>
      </div>
    </div>
  );
};

export default BeritaTerkini;
