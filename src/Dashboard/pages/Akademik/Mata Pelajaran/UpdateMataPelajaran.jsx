import FieldInput from "../../../../component/Input/FieldInput";
import Button from "../../../../component/Button/Button";
import ButtonHref from "../../../../component/Button/ButtonHref";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../../component/Loading/Loading";
import Toast from "../../../../component/Toast/Toast";
import { useState, useEffect } from "react";
import axios from "axios";
import baseUrl from "../../../../utils/config/baseUrl";

export default function UpdateMataPelajaran() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nama_mapel, setNamaMapel] = useState("");
  const [kkm, setKkm] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // get token
  const token = sessionStorage.getItem("session");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${baseUrl.apiUrl}/admin/mapel/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setNamaMapel(response.data.nama_mapel);
        setKkm(response.data.kkm);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        setToastMessage("Data tidak ditemukan");
        setToastVariant("error");

        // Redirect jika tidak ditemukan
        // setTimeout(() => {
        //   navigate("/dashboard/akademik/mata-pelajaran");
        // }, 2000);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // reset pesan toast
    setToastMessage("");
    setToastVariant("");

    if (nama_mapel.trim() === "" || String(kkm).trim() === "") {
      setTimeout(() => {
        setToastMessage("Nama Mata Pelajaran atau KKM tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.put(
        `${baseUrl.apiUrl}/admin/mapel/${id}`,
        {
          nama_mapel: nama_mapel,
          kkm: kkm,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("pelajaranUpdate", "success");

        setTimeout(() => {
          setIsLoading(false);
          navigate("/dashboard/akademik/mata-pelajaran");
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      // Menangani error yang dikirimkan oleh server
      let errorMessage = "Gagal Tambah";

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
              value={nama_mapel}
              onChange={(e) => setNamaMapel(e.target.value)}
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
