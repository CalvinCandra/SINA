import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useInformasi } from "../../hooks/Landing/Informasi";
import baseUrl from "../../utils/config/baseUrl";
import sanitize from "sanitize-html";

const DetailInformasi = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { currentBerita, isLoading, error, getBeritaById, beritaList } =
    useInformasi();

  useEffect(() => {
    if (id) {
      getBeritaById(id);
    }
  }, [id]);

  // Warna berbeda untuk setiap kategori
  const getCategoryColor = (category) => {
    const colors = {
      pengumuman: "bg-blue-100 text-blue-800",
      berita: "bg-orange-100 text-orange-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  // Fungsi untuk membersihkan HTML tapi pertahankan formatting dasar
  const sanitizeContent = (html) => {
    if (!html) return "Tidak ada deskripsi";

    return sanitize(html, {
      allowedTags: ["b", "strong", "i", "em", "u", "br", "p", "ul", "ol", "li"],
      allowedAttributes: {},
    });
  };

  const getImageUrl = (foto) => {
    if (!foto) return null; // Return null jika tidak ada foto
    if (foto.startsWith("http")) return foto;
    return `${baseUrl.apiUrlImage}/Upload/berita/${foto}`;
  };

  const imageUrl = getImageUrl(currentBerita?.foto);

  const beritaLainnya = beritaList
    .filter((berita) => berita.id !== currentBerita?.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="alert alert-error shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="btn btn-secondary w-full mt-4"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  if (!currentBerita) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="alert alert-warning shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>Data berita tidak ditemukan.</span>
            </div>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="btn btn-secondary w-full mt-4"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-8 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Konten Utama */}
        <div className="lg:w-2/3">
          <div className="overflow-hidden">
            {/* Gambar Header - hanya ditampilkan jika ada imageUrl */}
            {imageUrl && (
              // <figure className="w-full">
              <figure className="w-full h-64 sm:h-80 md:h-96 relative">
                <img
                  src={imageUrl}
                  alt={currentBerita.judul}
                  // className="w-full h-auto max-h-[80vh] object-contain mx-auto"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none"; // Sembunyikan jika error
                  }}
                />
              </figure>
            )}

            {/* Konten Artikel */}
            <div className="py-3 sm:py-4">
              {/* Judul */}
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {currentBerita.judul}
              </h1>

              {/* Penulis, Tanggal dan Kategori */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-500 mb-8">
                <span className="italic">
                  Dibuat Oleh : {currentBerita.username}
                </span>
                <span>|</span>
                <span>{currentBerita.tglLengkap}</span>
                <span className="hidden sm:block">•</span>
                <span
                  className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getCategoryColor(
                    currentBerita.tipe
                  )}`}
                >
                  {currentBerita.tipe}
                </span>
              </div>

              {/* Isi Artikel */}
              <div
                className="prose max-w-none text-gray-800 mb-8 text-justify text-base"
                dangerouslySetInnerHTML={{
                  __html: sanitizeContent(currentBerita.isi),
                }}
              ></div>

              {/* Tombol Kembali */}
              <div className="mt-8">
                <button
                  onClick={() => navigate("/informasi")}
                  className="btn btn-outline bg-biru-primary text-white rounded-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Kembali
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Berita Lainnya */}
        <div className="lg:w-1/3">
          <div className="bg-white shadow-md rounded-lg p-6 sticky top-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
              Berita Lainnya
            </h2>
            <div className="space-y-4">
              {beritaLainnya.map((berita) => {
                const thumbUrl = getImageUrl(berita.foto);
                return (
                  <div
                    key={berita.id}
                    className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition"
                    onClick={() => navigate(`/informasi/${berita.id}`)}
                  >
                    {thumbUrl && (
                      <div className="w-16 h-16 flex-shrink-0">
                        <img
                          src={thumbUrl}
                          alt={berita.judul}
                          className="w-full h-full object-cover rounded"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium text-sm line-clamp-2">
                        {berita.judul}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <span>{berita.tglSingkat}</span>
                        <span
                          // className="badge badge-xs badge-info"
                          className={`text-xs px-2.5 py-0.5 rounded-full ${getCategoryColor(
                            berita.tipe
                          )}`}
                        >
                          {berita.tipe}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailInformasi;
