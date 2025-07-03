import React from "react";
import ImageImport from "../../data/ImageImport";
import { useNavigate } from "react-router-dom";

function Tentang() {
  const navigate = useNavigate();

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8" id="tentang">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-12">
          <div className="order-1 md:order-2 flex justify-center">
            <img
              src={ImageImport.mockup}
              alt="Mockup Aplikasi SINA"
              className="max-h-[400px] md:max-h-[500px] object-contain"
            />
          </div>

          {/* Teks Penjelasan*/}
          <div className="order-2 md:order-1 text-center md:text-left space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">
              Tentang <span className="text-blue-600">SINA</span>
            </h2>

            <div className="prose mx-auto md:mx-0 text-gray-800">
              <p className="text-justify line-clamp-11">
                Sistem Informasi Akademik (SINA) adalah platform smart school
                berbasis web dan mobile yang terintegrasi untuk mengelola
                seluruh aktivitas akademik secara digital. Sistem ini mencakup
                pengelolaan data siswa, nilai, absensi, jadwal, tugas, hingga
                notifikasi penting. Sistem ini dikembangkan sebagai solusi atas
                permasalahan di lingkungan sekolah seperti manajemen data yang
                manual, serta keterbatasan akses informasi akademik secara
                real-time. SINA dirancang untuk memudahkan komunikasi dan akses
                informasi antara siswa, guru, orang tua, dan pihak sekolah
                secara real-time. Dengan fitur dashboard khusus untuk setiap
                pengguna, sistem ini membantu meningkatkan efisiensi,
                transparansi, serta kualitas manajemen pendidikan di lingkungan
                sekolah.
              </p>
            </div>

            <div className="flex justify-center md:justify-start">
              <button
                onClick={() => navigate("/tentang-sina")}
                className="mt-6 px-6 py-3 bg-biru-primary text-white rounded-lg hover:bg-biru-hover transition-colors font-semibold"
              >
                Baca Selengkapnya
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tentang;
