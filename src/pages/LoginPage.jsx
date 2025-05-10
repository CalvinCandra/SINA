import Button from "../component/Button/Button";
import { useState } from "react";
import FieldInput from "../component/Input/FieldInput";
import ImageImport from "../data/ImageImport";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Toast from "../component/Toast/Toast";
import Loading from "../component/Loading/Loading";
import axios from "axios";
import baseUrl from "../utils/config/baseUrl";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [Password, setPassword] = useState(true);
  // Fungsi untuk toggle tipe input
  const togglePasswordVisibility = () => {
    setPassword((prevPassword) => !prevPassword);
  };

  // set variabel
  const [email, setEmailInput] = useState("");
  const [password, setPasswordInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset
    setToastMessage("");
    setToastVariant("");

    if (email.trim() === "") {
      setTimeout(() => {
        setToastMessage("Email tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }

    if (password.trim() === "") {
      setTimeout(() => {
        setToastMessage("Password tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }

    setIsLoading(true);

    // api logic login
    try {
      const response = await axios.post(`${baseUrl.apiUrl}/admin/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        sessionStorage.setItem("session", response.data.token);
      }

      setTimeout(() => {
        setIsLoading(false);
        localStorage.setItem("login", "success");
        // Redirect ke halaman dashboard
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      // Menangani error yang dikirimkan oleh server
      let errorMessage = "Login Gagal";

      if (error.response && error.response.data.message) {
        // Jika error dari server ada di response.data
        if (error.response.data.message) {
          errorMessage = error.response.data.message; // Tampilkan pesan dari server jika ada
        }
      } else {
        // Jika error tidak ada response dari server
        errorMessage = error.message;
      }

      setIsLoading(false); // jangan lupa set false
      setTimeout(() => {
        setToastMessage(`${errorMessage}`);
        setToastVariant("error");
      }, 10);
      return;
    }
  };

  return (
    <section className="flex justify-center items-center h-screen bg-biru-disabled relative">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      {/*Card*/}
      <div className="mx-2 lg:mx-auto w-full lg:w-[30%] bg-white rounded-2xl py-12 ">
        {/* Image */}
        <div className="w-[35%] mx-auto">
          <img
            src={ImageImport.logoLogin}
            className="w-full object-cover"
          ></img>
        </div>
        {/* form */}
        <form className=" p-1 mt-10 mx-auto w-[90%]" onSubmit={handleSubmit}>
          <FieldInput
            text=<span>
              Email <span className="text-red-500">*</span>
            </span>
            type="email"
            name="email"
            variant="biasa_text_base"
            value={email}
            onChange={(e) => setEmailInput(e.target.value)}
          ></FieldInput>
          <div className="w-full relative">
            <FieldInput
              text=<span>
                Password <span className="text-red-500">*</span>
              </span>
              type={`${Password ? "password" : "text"}`}
              variant="biasa_text_base"
              name="password"
              value={password}
              onChange={(e) => setPasswordInput(e.target.value)}
            ></FieldInput>

            <span onClick={togglePasswordVisibility}>
              {Password ? (
                <EyeIcon className="absolute w-5 h-5 bottom-3.5 right-2 cursor-pointer"></EyeIcon>
              ) : (
                <EyeSlashIcon className="absolute w-5 h-5 bottom-3.5 right-2 cursor-pointer"></EyeSlashIcon>
              )}
            </span>
          </div>
          <Button
            text={isLoading ? <Loading /> : "Login"}
            variant="button_submit_login"
            disabled={isLoading}
          />
        </form>
      </div>
    </section>
  );
}
