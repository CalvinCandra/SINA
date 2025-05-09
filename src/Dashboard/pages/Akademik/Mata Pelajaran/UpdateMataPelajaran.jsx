import FieldInput from "../../../../component/Input/FieldInput";
import Button from "../../../../component/Button/Button";
import ButtonHref from "../../../../component/Button/ButtonHref";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../../component/Loading/Loading";
import Toast from "../../../../component/Toast/Toast";
import { useState, useEffect } from "react";

export default function UpdateMataPelajaran() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [namaPelajaran, setNamaPelajaran] = useState("");
  const [kkm, setKkm] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("pelajaranList")) || [];
    const foundData = stored.find((item) => item.id === parseInt(id));

    if (!foundData) {
      localStorage.setItem("pelajaranInvalid", "error");
      navigate("/dasboard/akademik/mata-pelajaran");
    }

    setNamaPelajaran(foundData.mata_pelajar);
    setKkm(foundData.kkm);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // reset pesan toast
    setToastMessage("");
    setToastVariant("");

    if (namaPelajaran.trim() === "" || kkm.trim() === "") {
      setTimeout(() => {
        setToastMessage("Nama Mata Pelajaran atau KKM tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }

    setIsLoading(true);

    const storedPelajaran = JSON.parse(localStorage.getItem("pelajaranList"));

    const updated = storedPelajaran.map((item) =>
      item.id === parseInt(id)
        ? {
            ...item,
            mata_pelajar: namaPelajaran,
            kkm: kkm,
          }
        : item
    );

    localStorage.setItem("pelajaranList", JSON.stringify(updated));
    localStorage.setItem("pelajaranUpdate", "success");

    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard/akademik/mata-pelajaran");
    }, 2000);
  };
  return (
    <div className="lg:py-5 min-h-screen lg:min-h-0">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg">Update Data Mata Pelajaran</p>
        </div>

        <hr className="border-border-grey border"></hr>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Input Field */}
          <div className="w-full mt-5">
            <FieldInput
              text=<span>
                Mata Pelajaran <span className="text-red-500">*</span>
              </span>
              type="text"
              variant="biasa_text_sm"
              value={namaPelajaran}
              onChange={(e) => setNamaPelajaran(e.target.value)}
            ></FieldInput>
          </div>

          <div className="w-full mt-5">
            <FieldInput
              text=<span>
                KKM <span className="text-red-500">*</span>
              </span>
              type="number"
              value={kkm}
              onChange={(e) => setKkm(e.target.value)}
              variant="biasa_text_sm"
            ></FieldInput>
          </div>

          {/* Button */}
          <div className="flex justify-end items-center mt-5">
            <div className="me-2">
              <ButtonHref
                text="Cancel"
                variant="cancel"
                href="/dashboard/akademik/mata-pelajaran"
              ></ButtonHref>
            </div>
            <div className="w-48">
              <Button
                text={isLoading ? <Loading /> : "Update Mata Pelajaran"}
                variant="button_submit_dash"
                disabled={isLoading}
              ></Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
