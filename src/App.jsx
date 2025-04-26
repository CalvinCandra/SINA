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
import Pengumuman from "./Dashboard/pages/Pengumuman/Pengumuman";
import TambahPengumuman from "./Dashboard/pages/Pengumuman/TambahPengumuman";
import DetailPengumuman from "./Dashboard/pages/Pengumuman/DetailPengumuman";
import UpdatePengumuman from "./Dashboard/pages/Pengumuman/UpdatePengumuman";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<LoginPage />} />
      </Route>

      {/* Semua halaman dashboard dibungkus Layout */}
      <Route path="/dashboard" element={<Layout />}>
        <Route index element={<Dashboard />} />

        {/* Admin*/}
        <Route path="admin" element={<Admin />} />
        <Route path="admin/tambah" element={<TambahAdmin />} />
        <Route path="admin/update" element={<UpdateAdmin />} />

        {/* Kelas */}
        <Route path="kelas" element={<Kelas />} />
        <Route path="kelas/tambah" element={<TambahKelas />} />
        <Route path="kelas/update" element={<UpdateKelas />} />

        {/* Akademik */}
        {/* Kurikulum */}
        <Route path="akademik/kurikulum" element={<Kurikulum />} />
        <Route path="akademik/kurikulum/tambah" element={<TambahKurikulum />} />
        <Route path="akademik/kurikulum/update" element={<UpdateKurikulum />} />

        {/* Tahun Akademik */}
        <Route path="akademik/tahun-akademik" element={<TahunAkademik />} />
        <Route
          path="akademik/tahun-akademik/tambah"
          element={<TambahTahun />}
        />
        <Route
          path="akademik/tahun-akademik/update"
          element={<UpdateTahun />}
        />

        {/* Mata Pelajaran */}

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
