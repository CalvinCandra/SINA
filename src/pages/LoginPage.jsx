import Button from "../component/Button/Button";
import { useState } from "react";
import FieldInput from "../component/Input/FieldInput";
import ImageImport from "../data/ImageImport";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Toast from "../component/Toast/Toast";
import Loading from "../component/Loading/Loading";

export default function LoginPage() {
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

  const handleSubmit = (e) => {
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

    if (
      email.trim() === "superadmin@gmail.com" &&
      password.trim() === "123456"
    ) {
      localStorage.setItem("login", "success");

      setTimeout(() => {
        // buat token
        const token =
          Math.random().toString(15).substring(2) + Date.now().toString(10);

        // lempar session
        sessionStorage.setItem("session", token);

        setIsLoading(false);
        // Redirect ke halaman dashboard
        window.location.href = "/dashboard";
      }, 2000);
    } else {
      setIsLoading(false); // jangan lupa set false
      setTimeout(() => {
        setToastMessage("Email atau Password Salah, Coba Lagi");
        setToastVariant("error");
      }, 10);
      return;
    }
  };

  return (
    <section className="flex justify-center items-center h-screen bg-biru-disabled">
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
