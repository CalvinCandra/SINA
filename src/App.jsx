import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AppShell from "./AppShell";
import Layout from "./Dashboard/Layout";
import Dashboard from "./Dashboard/pages/Dashboard";
import Admin from "./Dashboard/pages/Admin/Admin";
import TambahAdmin from "./Dashboard/pages/Admin/TambahAdmin";
import UpdateAdmin from "./Dashboard/pages/Admin/UpdateAdmin";
import Kelas from "./Dashboard/pages/Kelas/Kelas";
import TambahKelas from "./Dashboard/pages/Kelas/TambahKelas";
import UpdateKelas from "./Dashboard/pages/Kelas/UpdateKelas";
import Kurikulum from "./Dashboard/pages/Akademik/Kurikulum/Kurikulum";
import TambahKurikulum from "./Dashboard/pages/Akademik/Kurikulum/TambahKurikulum";
import UpdateKurikulum from "./Dashboard/pages/Akademik/Kurikulum/UpdateKurikulum";
import TahunAkademik from "./Dashboard/pages/Akademik/Tahun Akademik/TahunAkademik";
import TambahTahun from "./Dashboard/pages/Akademik/Tahun Akademik/TambahTahun";
import UpdateTahun from "./Dashboard/pages/Akademik/Tahun Akademik/UpdateTahun";
import MataPelajaran from "./Dashboard/pages/Akademik/Mata Pelajaran/MataPelajaran";
import TambahMataPelajaran from "./Dashboard/pages/Akademik/Mata Pelajaran/TambahMataPelajaran";
import UpdateMataPelajaran from "./Dashboard/pages/Akademik/Mata Pelajaran/UpdateMataPelajaran";
import DataGuru from "./Dashboard/pages/Guru/DataGuru/DataGuru";
import TambahDataGuru from "./Dashboard/pages/Guru/DataGuru/TambahDataGuru";
import UpdateDataGuru from "./Dashboard/pages/Guru/DataGuru/UpdateDataGuru";
import Pengumuman from "./Dashboard/pages/Pengumuman/Pengumuman";
import TambahPengumuman from "./Dashboard/pages/Pengumuman/TambahPengumuman";
import DetailPengumuman from "./Dashboard/pages/Pengumuman/DetailPengumuman";
import UpdatePengumuman from "./Dashboard/pages/Pengumuman/UpdatePengumuman";
import Profile from "./Dashboard/pages/Profile";
import MiddlewareLogin from "./utils/middlewareLogin";
import Siswa from "./Dashboard/pages/Siswa/Siswa";
import DataSiswaPage from "./Dashboard/pages/Siswa/DataSiswaPage";
import DetailSiswa from "./Dashboard/pages/Siswa/DetailSiswa";
import TambahSiswaExcel from "./Dashboard/pages/Siswa/TambahSiswaExcel";
import TambahSiswa from "./Dashboard/pages/Siswa/TambahSiswa";
import UpdateSiswa from "./Dashboard/pages/Siswa/UpdateSiswa";
import Jadwal from "./Dashboard/pages/Akademik/Jadwal/Jadwal";
import JadwalKelas from "./Dashboard/pages/Akademik/Jadwal/JadwalKelas";
import TambahJadwalKelas from "./Dashboard/pages/Akademik/Jadwal/TambahJadwalKelas";
import EditJadwalKelas from "./Dashboard/pages/Akademik/Jadwal/EditJadwalKelas";
import AbsenGuru from "./Dashboard/pages/Guru/AbsenGuru/AbsenGuru";
import AbsenkelasSiswa from "./Dashboard/pages/Siswa/AbsenSiswa/AbsenKelasSiswa";
import AbsenSiswaPage from "./Dashboard/pages/Siswa/AbsenSiswa/AbsenSiswaPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<LoginPage />} />
      </Route>

      {/* Semua halaman dashboard dibungkus Layout */}
      <Route
        path="/dashboard"
        element={
          <MiddlewareLogin>
            <Layout />
          </MiddlewareLogin>
        }
      >
        <Route index element={<Dashboard />} />

        {/* Profile */}
        <Route path="profile" element={<Profile />} />

        {/* Admin*/}
        <Route path="admin" element={<Admin />} />
        <Route path="admin/tambah" element={<TambahAdmin />} />
        <Route path="admin/update/:id" element={<UpdateAdmin />} />

        {/* Kelas */}
        <Route path="kelas" element={<Kelas />} />
        <Route path="kelas/tambah" element={<TambahKelas />} />
        <Route path="kelas/update/:id" element={<UpdateKelas />} />

        {/* Akademik */}
        {/* Kurikulum */}
        <Route path="akademik/kurikulum" element={<Kurikulum />} />
        <Route path="akademik/kurikulum/tambah" element={<TambahKurikulum />} />
        <Route
          path="akademik/kurikulum/update/:id"
          element={<UpdateKurikulum />}
        />

        {/* Tahun Akademik */}
        <Route path="akademik/tahun-akademik" element={<TahunAkademik />} />
        <Route
          path="akademik/tahun-akademik/tambah"
          element={<TambahTahun />}
        />
        <Route
          path="akademik/tahun-akademik/update/:id"
          element={<UpdateTahun />}
        />

        {/* Mata Pelajaran */}
        <Route path="akademik/mata-pelajaran" element={<MataPelajaran />} />
        <Route
          path="akademik/mata-pelajaran/tambah"
          element={<TambahMataPelajaran />}
        />
        <Route
          path="akademik/mata-pelajaran/update/:id"
          element={<UpdateMataPelajaran />}
        />

        {/* Jadwal Pelajaran */}
        <Route path="akademik/jadwal" element={<Jadwal />} />
        <Route
          path="akademik/jadwal-kelas/:nama_kelas/:tingkat"
          element={<JadwalKelas />}
        />
        <Route
          path="akademik/jadwal-kelas/:nama_kelas/:tingkat/tambah"
          element={<TambahJadwalKelas />}
        />
        <Route
          path="akademik/jadwal-kelas/:nama_kelas/:tingkat/update/:id"
          element={<EditJadwalKelas />}
        />

        {/* Guru */}
        {/* Data Guru */}
        <Route path="guru" element={<DataGuru />} />
        <Route path="guru/tambah" element={<TambahDataGuru />} />
        <Route path="guru/update/:id" element={<UpdateDataGuru />} />
        {/* Absen Guru */}
        <Route path="guru/absen" element={<AbsenGuru />} />

        {/* Siswa */}
        <Route path="siswa" element={<Siswa />} />
        <Route path="siswa/:nama_kelas/:tingkat" element={<DataSiswaPage />} />
        <Route
          path="siswa/:nama_kelas/:tingkat/:id"
          element={<DetailSiswa />}
        />
        <Route
          path="siswa/:nama_kelas/:tingkat/tambahExcel"
          element={<TambahSiswaExcel />}
        />
        <Route
          path="siswa/:nama_kelas/:tingkat/tambah"
          element={<TambahSiswa />}
        />
        <Route
          path="siswa/:nama_kelas/:tingkat/update/:id"
          element={<UpdateSiswa />}
        />
        {/* Absen Siswa */}
        <Route path="siswa/absen/" element={<AbsenkelasSiswa />} />
        <Route
          path="siswa/absen/:nama_kelas/:tingkat"
          element={<AbsenSiswaPage />}
        />

        {/* Pengumuman */}
        <Route path="pengumuman" element={<Pengumuman />} />
        <Route path="pengumuman/tambah" element={<TambahPengumuman />} />
        <Route path="pengumuman/detail/:id" element={<DetailPengumuman />} />
        <Route path="pengumuman/update/:id" element={<UpdatePengumuman />} />
      </Route>
    </Routes>
  );
}

export default App;
