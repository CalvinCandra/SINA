import Button from "../../../component/Button/Button";
import Calender from "../../components/Calender/Calender";
import Toast from "../../../component/Toast/Toast";
import FieldInput from "../../../component/Input/FieldInput";
import { useDetailLogs } from "../../../hooks/DetaiLogs/DetailLogs";
import Loading from "../../../component/Loading/Loading";

export default function Log() {
  const {
    dataLogs,
    tanggalAwal,
    setTanggalAwaL,
    tanggalAkhir,
    setTanggalAkhir,
    isLoading,
    toastMessage,
    toastVariant,
    handleLogs,
  } = useDetailLogs();
  return (
    <div className="lg:py-5">
      {toastMessage && <Toast text={toastMessage} variant={toastVariant} />}
      <div className="flex w-full justify-between items-center">
        <h2 className="text-2xl font-semibold">Logs Detail</h2>
        <Calender></Calender>
      </div>

      <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-3">
        {/* Form */}
        <div className="w-full lg:w-[35%]">
          <div className="lg:sticky top-20 z-10">
            <div className="lg:h-[25%] p-5 rounded-md bg-white mt-5">
              <form
                className={`${
                  isLoading ? "pointer-events-none opacity-50" : ""
                }`}
                onSubmit={handleLogs}
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                  <div>
                    <FieldInput
                      type="datetime-local"
                      text="Tanggal waktu Awal"
                      variant="biasa_text_sm"
                      value={tanggalAwal}
                      onChange={(e) => setTanggalAwaL(e.target.value)}
                    />
                  </div>
                  <div>
                    <FieldInput
                      type="datetime-local"
                      text="Tanggal Waktu Akhir"
                      variant="biasa_text_sm"
                      value={tanggalAkhir}
                      onChange={(e) => setTanggalAkhir(e.target.value)}
                    />
                  </div>
                </div>

                <div className="w-40 mt-5">
                  <Button
                    text={isLoading ? <Loading /> : "Cari"}
                    variant="button_submit_dash"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* hasil Logs */}
        <div className="w-full lg:w-[64%] p-5 rounded-md bg-white mt-5 relative right-0">
          <div>
            <h3 className="text-xl font-semibold">LOGS</h3>
          </div>
          <hr className="border-border-grey border my-2" />

          <div>
            {dataLogs.length === 0 ? (
              <p className="mt-2 italic text-base text-gray-400">
                Silahkan Masukan Tanggal untuk melihat Logs
              </p>
            ) : (
              <div className="mt-2 text-base w-full">
                {dataLogs.map((log) => (
                  <div
                    key={log._id}
                    className="mb-4 p-3 border rounded overflow-x-auto"
                  >
                    <p>
                      <strong>id:</strong> {log._id}
                    </p>
                    <p>
                      <strong>Userid:</strong> {log.userId}
                    </p>
                    <p>
                      <strong>Method:</strong> {log.method}
                    </p>
                    <p>
                      <strong>Endpoint:</strong> {log.endpoint}
                    </p>
                    <p>
                      <strong>Status:</strong> {log.statusCode}
                    </p>
                    <p>
                      <strong>Time:</strong>{" "}
                      {new Date(log.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
