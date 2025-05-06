import { useState, useEffect } from "react";
import FieldInput from "../../../../component/Input/FieldInput";
import Button from "../../../../component/Button/Button";
import ButtonHref from "../../../../component/Button/ButtonHref";
import Textarea from "../../../../component/Input/Textarea";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../../component/Loading/Loading";
import Toast from "../../../../component/Toast/Toast";

export default function UpdateKurikulum() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [namaKurikulum, setNamaKurikulum] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("kurikulumList")) || [];
    const foundData = stored.find((item) => item.id === parseInt(id));

    if (!foundData) {
      localStorage.setItem("kurikulumInvalid", "error");
      navigate("/dasboard/akademik/kurikulum");
    }

    setNamaKurikulum(foundData.nama_kurikulum);
    setDeskripsi(foundData.deskripsi);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // reset pesan toast
    setToastMessage("");
    setToastVariant("");

    if (namaKurikulum.trim() === "" || deskripsi.trim() === "") {
      setTimeout(() => {
        setToastMessage("Nama Kurikulum atau Deskripsi tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }

    setIsLoading(true);

    const storedKurikulum = JSON.parse(localStorage.getItem("kurikulumList"));

    const updated = storedKurikulum.map((item) =>
      item.id === parseInt(id)
        ? {
            ...item,
            nama_kurikulum: namaKurikulum,
            deskripsi: deskripsi,
          }
        : item
    );

    localStorage.setItem("kurikulumList", JSON.stringify(updated));
    localStorage.setItem("kurikulumUpdate", "success");

    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard/akademik/kurikulum");
    }, 2000);
  };
  return (
    <div className="lg:py-5 min-h-screen lg:min-h-0">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg">Update Data Kurikulum</p>
        </div>

        <hr className="border-border-grey border"></hr>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Input Field */}
          <div className="w-full mt-5">
            <FieldInput
              text=<span>
                Nama Kurikulum <span className="text-red-500">*</span>
              </span>
              type="text"
              variant="biasa_text_sm"
              value={namaKurikulum}
              onChange={(e) => setNamaKurikulum(e.target.value)}
            ></FieldInput>
          </div>

          <div className="w-full mt-5">
            <Textarea
              text=<span>
                Deskripsi Kurikulum <span className="text-red-500">*</span>
              </span>
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
            ></Textarea>
          </div>

          {/* Button */}
          <div className="flex justify-end items-center mt-5">
            <div className="me-2">
              <ButtonHref
                text="Cancel"
                variant="cancel"
                href="/dashboard/akademik/kurikulum"
              ></ButtonHref>
            </div>
            <div className="w-40">
              <Button
                text={isLoading ? <Loading /> : "Update Kurikulum"}
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
