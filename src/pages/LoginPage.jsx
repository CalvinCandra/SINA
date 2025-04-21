import Button from "../component/Button/Button";
import { useState } from "react";
import FieldInput from "../component/Input/FieldInput";
import ImageImport from "../data/ImageImport";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function LoginPage() {
  const [Password, setPassword] = useState(true);
  // Fungsi untuk toggle tipe input
  const togglePasswordVisibility = () => {
    setPassword((prevPassword) => !prevPassword);
  };

  // set variabel
  const [email, setEmailInput] = useState("");
  const [password, setPasswordInput] = useState("");

  return (
    <section className="flex justify-center items-center h-screen bg-biru-disabled">
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
        <form className=" p-1 mt-10 mx-auto w-[90%]">
          <FieldInput
            text="Email"
            type="email"
            name="email"
            variant="biasa_text_base"
            value={email}
            onChange={(e) => setEmailInput(e.target.value)}
          ></FieldInput>
          <div className="w-full relative">
            <FieldInput
              text="Password"
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
          <Button text="Login" variant="button_submit_login"></Button>
        </form>
      </div>
    </section>
  );
}
