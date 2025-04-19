import Button from "../component/Button";
import FieldInput from "../component/FieldInput";
import ImageImport from "../data/ImageImport";

function LoginPage() {
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
          <FieldInput text="Email" type="email" variant="biasa"></FieldInput>
          <FieldInput
            text="Password"
            type="password"
            variant="biasa"
          ></FieldInput>
          <Button type="submit" text="Login"></Button>
        </form>
      </div>
    </section>
  );
}

export default LoginPage;
