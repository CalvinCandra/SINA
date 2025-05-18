// src/utils/getUserRole.js
import { jwtDecode } from "jwt-decode";

export default function getRole() {
  const token = sessionStorage.getItem("session"); // atau sessionStorage jika kamu pakai itu
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.role; // pastikan `role` benar-benar ada di payload JWT kamu
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}
