import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AppShell from "./AppShell";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;
