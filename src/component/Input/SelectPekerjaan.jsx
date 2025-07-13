import { useEffect, useState } from "react";

export default function SelectPekerjaan(props) {
  const {
    label = "",
    value = "",
    onChange = () => {},
    required = false,
    name = "pekerjaan",
  } = props;

  const [selectedJob, setSelectedJob] = useState("");
  const [otherJob, setOtherJob] = useState("");

  const jobOptions = [
    "Karyawan",
    "Dosen",
    "Wirausaha",
    "Guru",
    "Polisi",
    "Tentara",
    "Guide Tour",
    "Driver",
    "Dokter",
    "Ojol",
    "Programming",
    "Desainer",
  ];

  useEffect(() => {
    if (jobOptions.includes(value)) {
      setSelectedJob(value);
      setOtherJob("");
    } else if (value) {
      setSelectedJob("other");
      setOtherJob(value);
    } else {
      setSelectedJob("");
      setOtherJob("");
    }
  }, [value]);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedJob(selectedValue);

    if (selectedValue !== "other") {
      setOtherJob("");
      onChange(selectedValue);
    }
  };

  const handleOtherChange = (e) => {
    const inputValue = e.target.value;
    setOtherJob(inputValue);
    onChange(inputValue);
  };
  return (
    <fieldset className="fieldset mb-4">
      <legend className="fieldset-legend text-sm font-semibold">{label}</legend>

      <select
        value={selectedJob}
        onChange={handleSelectChange}
        name={name}
        className="select border border-border-grey w-full rounded-lg"
      >
        <option value="" hidden>
          -- Pilih --
        </option>
        {jobOptions.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
        <option value="other">Lainnya</option>
      </select>

      {selectedJob === "other" && (
        <input
          type="text"
          name={`${name}_lainnya`}
          placeholder="Masukkan pekerjaan lain"
          value={otherJob}
          onChange={handleOtherChange}
          className="input border mt-2 border-border-grey w-full rounded-lg"
        />
      )}
    </fieldset>
  );
}
