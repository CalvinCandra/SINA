import React from "react";
import ImageImport from "../../data/ImageImport";

export default function TentangSina() {
  return (
    <div className="pt-16 pb-32 px-6 sm:px-8 lg:px-10 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="lg:text-4xl text-3xl font-bold text-gray-900 mb-3">
            Tentang <span className="text-blue-600">SINA</span>
          </h1>
          <p className="lg:text-lg text-sm text-gray-600 max-w-3xl mx-auto font-medium">
            Sistem Informasi Akademik Terintegrasi untuk Transformasi Digital
            Sekolah
          </p>
        </div>

        {/* Gambar dan Deskripsi */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="flex justify-center">
            <img
              src={ImageImport.mockup}
              alt="Dashboard SINA"
              className="max-h-[500px] object-contain"
            />
          </div>
          <div className="prose text-gray-800 text-justify text-sm lg:text-base">
            <p>
              <span className="font-semibold">
                Sistem Informasi Akademik (SINA)
              </span>{" "}
              adalah platform{" "}
              <span className="font-semibold">smart school</span> berbasis web
              dan mobile yang{" "}
              <span className="font-semibold">terintegrasi</span> untuk
              mengelola seluruh aktivitas akademik secara digital. Sistem ini
              mencakup pengelolaan data siswa, nilai, absensi, jadwal, tugas,
              hingga informasi penting. Sistem ini dikembangkan sebagai solusi{" "}
              <span className="font-semibold">transformasi digital</span> untuk
              mengatasi permasalahan manajemen sekolah konvensional seperti
              proses administrasi manual, keterlambatan informasi, dan kurangnya
              transparansi.
            </p>
            <p className="mt-4">
              SINA dirancang untuk{" "}
              <span className="font-semibold">
                memudahkan komunikasi dan akses informasi
              </span>{" "}
              antara siswa, guru, orang tua, dan pihak sekolah secara real-time.
              Dengan fitur dashboard khusus untuk setiap pengguna, sistem ini
              membantu meningkatkan efisiensi, transparansi, serta kualitas
              manajemen pendidikan di lingkungan sekolah
            </p>
          </div>
        </div>

        {/* Tujuan Pengembangan */}
        <div className="bg-white rounded-xl shadow-md p-8 md:p-12">
          <h2 className="lg:text-3xl text-2xl font-bold text-gray-900 mb-8 text-center">
            Tujuan Pengembangan SINA
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Daftar Tujuan */}
            {[
              "Membangun sistem informasi akademik berbasis web dan/atau mobile yang terintegrasi dan mudah diakses oleh seluruh warga sekolah.",
              "Menyediakan dashboard khusus untuk masing-masing pengguna (siswa, orang tua, guru, kepala sekolah) dengan fitur yang sesuai kebutuhan masing-masing.",
              "Mempermudah siswa dalam melihat jadwal pelajaran, mengumpulkan tugas, melihat nilai, serta mengakses materi pembelajaran secara online.",
              "Memberikan fasilitas kepada orang tua untuk memantau nilai, absensi, tugas, dan perkembangan akademik anak secara real-time.",
              "Memfasilitasi guru dalam mengelola jadwal, memberikan tugas, mencatat absensi, serta menginput dan menganalisis nilai siswa.",
              "Menyediakan fitur pengajuan izin, notifikasi akademik, dan pelaporan keadaan darurat secara digital yang dapat langsung diterima oleh orang tua dan kepala sekolah.",
              "Menghadirkan sistem statistik akademik untuk mendukung proses evaluasi pembelajaran oleh guru dan kepala sekolah.",
              "Memberikan layanan informasi terbuka kepada masyarakat umum mengenai profil sekolah, fasilitas, kegiatan, dan pendaftaran siswa baru.",
              "Meningkatkan transparansi, akuntabilitas, dan efisiensi dalam manajemen akademik di lingkungan sekolah melalui pemanfaatan teknologi informasi.",
            ].map((tujuan, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <p className="text-gray-700 text-sm lg:text-base">{tujuan}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Fitur Unggulan */}
        <div className="mt-20">
          <h2 className="lg:text-3xl text-2xl font-bold text-gray-900 mb-12 text-center">
            Fitur Unggulan SINA
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "📊",
                title: "Dashboard Interaktif",
                desc: "Tampilan khusus untuk setiap peran dengan informasi relevan",
              },
              {
                icon: "⏰",
                title: "Presensi Digital",
                desc: "Absensi siswa dilakukan guru lewat perangkat digital, dan rekap otomatis tersedia secara real-time.",
              },
              {
                icon: "📱",
                title: "Aplikasi Mobile",
                desc: "Akses mudah melalui smartphone untuk siswa, orang tua, dan guru",
              },
              {
                icon: "📝",
                title: "E-Learning Terpadu",
                desc: "Pembelajaran online dengan materi interaktif dan penugasan digital",
              },
              {
                icon: "📮",
                title: "Pengajuan Surat Izin",
                desc: "Memudahkan dalam mengajukan izin secara online tanpa harus membawa surat fisik ke sekolah.",
              },

              {
                icon: "📈",
                title: "Analisis Data",
                desc: "Statistik dan laporan perkembangan akademik siswa otomatis",
              },
            ].map((fitur, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="lg:text-4xl text-2xl mb-4">{fitur.icon}</div>
                <h3 className="lg:text-xl text-lg font-semibold mb-2">
                  {fitur.title}
                </h3>
                <p className="text-gray-600 text-sm lg:text-base">
                  {fitur.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
