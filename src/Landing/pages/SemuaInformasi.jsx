import React, { useState, useEffect } from "react";
import { useInformasi } from "../../hooks/Landing/Informasi";
import baseUrl from "../../utils/config/baseUrl";
import { useNavigate } from "react-router-dom";

export default function SemuaInformasi() {
  const navigate = useNavigate();
  const { beritaList, isLoading, error, refresh } = useInformasi();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const cardsPerPage = 12; // 3 kolom x 4 baris

  // Fungsi untuk memfilter berita berdasarkan search term
  const filteredBerita = [...beritaList]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .filter((berita) => {
      return (
        berita.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
        berita.isi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        berita.tipe.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

  // Reset ke halaman 1 ketika melakukan pencarian
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

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

  // Hitung total halaman
  const totalPages = Math.ceil(filteredBerita.length / cardsPerPage);

  // Dapatkan card untuk halaman saat ini
  const currentCards = filteredBerita.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  if (isLoading) return <div className="text-center py-8">Memuat data...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-12 pt-8 pb-32 lg:px-2 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="text-2xl text-biru-primary font-bold lg:text-3xl">
          Semua Informasi
          <span className="block h-1 lg:w-1/2 w-full bg-biru-primary mt-1 rounded-2xl"></span>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-64 border border-gray-300 rounded-lg">
          <input
            type="text"
            placeholder="Cari informasi..."
            className="input input-bordered w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute left-3 top-3 h-4 w-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {currentCards.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCards.map((berita) => (
            <div
              key={berita.id}
              className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow flex flex-col h-full rounded-lg"
            >
              <figure className="relative pt-[56.25%] overflow-hidden">
                <img
                  src={getImageUrl(berita.foto)}
                  alt={berita.judul}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/800x450?text=Gambar+Tidak+Tersedia";
                  }}
                />
              </figure>

              <div className="card-body p-4 flex flex-col flex-grow">
                <h2 className="line-clamp-2 card-title text-lg">
                  {berita.judul}
                </h2>

                {/* Container untuk badge dan tanggal */}
                <div className="flex justify-between items-center mb-2">
                  <span
                    className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getCategoryColor(
                      berita.tipe
                    )}`}
                  >
                    {berita.tipe}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatRelativeTime(berita.createdAt)}
                  </span>
                </div>

                <div className="line-clamp-3 text-sm text-gray-600 mt-1 overflow-hidden">
                  {berita.isi.replace(/<[^>]*>/g, "")}
                </div>

                <div className="mt-auto">
                  <div className="card-actions justify-end mt-3">
                    <button
                      className="btn btn-primary btn-sm border-none bg-biru-primary hover:bg-biru-hover rounded-lg text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/informasi/${berita.id}`);
                      }}
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
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">Tidak ada informasi yang ditemukan</p>
          <button
            className="bg-biru-primary hover:bg-biru-hover text-white mt-4 py-2 rounded-lg px-4"
            onClick={() => setSearchTerm("")}
          >
            Reset pencarian
          </button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="join">
            {/* Previous Button */}
            <button
              className="join-item btn btn-sm border border-gray-300 bg-white text-gray-700 hover:bg-biru-hover hover:text-white transition-colors duration-200"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`join-item btn btn-sm border border-gray-300 ${
                  currentPage === page
                    ? "bg-biru-active text-white"
                    : "bg-white text-gray-700 hover:bg-biru-hover hover:text-white"
                } transition-colors duration-200`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

            {/* Next Button */}
            <button
              className="join-item btn btn-sm border border-gray-300 bg-white text-gray-700 hover:bg-biru-hover hover:text-white transition-colors duration-200"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
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
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
