import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AppShell from "./AppShell";
import Layout from "./Dashboard/Layout";
import Dashboard from "./Dashboard/pages/Dashboard";
import Admin from "./Dashboard/pages/Admin/Admin";
import TambahAdmin from "./Dashboard/pages/Admin/TambahAdmin";
import UpdateAdmin from "./Dashboard/pages/Admin/UpdateAdmin";

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
      </Route>
    </Routes>
  );
}

export default App;
