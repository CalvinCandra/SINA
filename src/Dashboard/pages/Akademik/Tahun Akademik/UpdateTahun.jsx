import { useState, useEffect } from "react";
import FieldInput from "../../../../component/Input/FieldInput";
import Button from "../../../../component/Button/Button";
import ButtonHref from "../../../../component/Button/ButtonHref";
import SelectField from "../../../../component/Input/SelectField";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../../component/Loading/Loading";
import Toast from "../../../../component/Toast/Toast";
import baseUrl from "../../../../utils/config/baseUrl";
import axios from "axios";

export default function UpdateTahun() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [namaKurikulum, setNamaKurikulum] = useState("");
  const [TglMulai, setTglMulai] = useState("");
  const [TglAkhir, setTglAkhir] = useState("");
  const [status, setStatus] = useState("");
  const [DataKurikulum, setdataKurikulum] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const token = sessionStorage.getItem("session");

  const formatDateToInput = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseTahun = await axios.get(
          `${baseUrl.apiUrl}/admin/tahunakademik/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const responseKurikulum = await axios.get(
          `${baseUrl.apiUrl}/admin/kurikulum`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (responseTahun.status == 200 || responseTahun.status == 201) {
          setNamaKurikulum(responseTahun.data.kurikulum_id);
          setTglMulai(formatDateToInput(responseTahun.data.tahun_mulai));
          setTglAkhir(formatDateToInput(responseTahun.data.tahun_berakhir));
          setStatus(responseTahun.data.status);
        }

        if (
          responseKurikulum.status == 200 ||
          responseKurikulum.status == 201
        ) {
          setdataKurikulum(responseKurikulum.data);
        }
      } catch (error) {}
    };

    fetchData();
  }, [id]);

  const KurikulumOption = DataKurikulum.map((item) => ({
    value: item.kurikulum_id,
    label: item.nama_kurikulum,
  }));

  const statusOption = [
    {
      value: "aktif",
      label: "Aktif",
    },
    {
      value: "tidak aktif",
      label: "Tidak Aktif",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // reset pesan toast terlebih dahulu
    setToastMessage("");
    setToastVariant("");

    // Validasi input
    if (String(namaKurikulum).trim() === "") {
      setTimeout(() => {
        setToastMessage("Nama Kurikulum tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }

    if (TglMulai.trim() === "") {
      setTimeout(() => {
        setToastMessage("Tanggal Mulai tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }

    if (TglAkhir.trim() === "") {
      setTimeout(() => {
        setToastMessage("Tanggal Akhir tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }

    if (status.trim() === "") {
      setTimeout(() => {
        setToastMessage("Status tidak boleh kosong");
        setToastVariant("error");
      }, 10);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.put(
        `${baseUrl.apiUrl}/admin/tahunakademik/${id}`,
        {
          kurikulum_id: namaKurikulum,
          tahun_mulai: TglMulai,
          tahun_berakhir: TglAkhir,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status == 200 || response.status == 201) {
        localStorage.setItem("tahunUpdate", "success");
        setTimeout(() => {
          setIsLoading(false);
          navigate("/dashboard/akademik/tahun-akademik");
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      // Menangani error yang dikirimkan oleh server
      let errorMessage = "Gagal";

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
    <div className="lg:py-5">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="w-full p-5 rounded-md bg-white mt-5">
        {/* Header Table */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-5">
          <p className="font-semibold text-lg">Update Data Tahun Kurikulum</p>
        </div>

        <hr className="border-border-grey border"></hr>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Input Field */}
          <div className="w-full me-1 mt-5">
            <SelectField
              text="Nama Kurikulum"
              option={KurikulumOption}
              value={namaKurikulum}
              onChange={(e) => setNamaKurikulum(e.target.value)}
            ></SelectField>
          </div>

          <div className="flex flex-col lg:flex-row w-full justify-between">
            <div className="w-full lg:w-1/2 lg:me-1">
              <FieldInput
                text=<span>
                  Tanggal Mulai <span className="text-red-500">*</span>
                </span>
                type="date"
                variant="biasa_text_sm"
                value={TglMulai}
                onChange={(e) => setTglMulai(e.target.value)}
              ></FieldInput>
            </div>

            <div className="w-full lg:w-1/2 lg:ms-1">
              <FieldInput
                text=<span>
                  Tanggal Akhir <span className="text-red-500">*</span>
                </span>
                type="date"
                variant="biasa_text_sm"
                value={TglAkhir}
                onChange={(e) => setTglAkhir(e.target.value)}
              ></FieldInput>
            </div>
          </div>

          <div className="w-full me-1">
            <SelectField
              text="Status"
              option={statusOption}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            ></SelectField>
          </div>

          {/* Button */}
          <div className="flex justify-end items-center mt-5">
            <div className="me-2">
              <ButtonHref
                text="Cancel"
                variant="cancel"
                href="/dashboard/akademik/tahun-akademik"
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
