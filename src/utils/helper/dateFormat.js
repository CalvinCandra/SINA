// Format dari input ke tlg lengkap
export const formatTanggalLengkap = (tanggalISO) => {
  const tanggal = new Date(tanggalISO);
  const bulanMap = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  return `${tanggal.getDate()} ${
    bulanMap[tanggal.getMonth()]
  } ${tanggal.getFullYear()}`;
};

// format date to input
export const formatToDateInput = (isoString) => {
  if (!isoString) return ""; // biar tidak jadi uncontrolled input
  const date = new Date(isoString);
  return date.toISOString().split("T")[0]; // ambil bagian 'YYYY-MM-DD'
};

// format tahun
export const formatTahun = (tanggalISO) => {
  const tanggal = new Date(tanggalISO);

  const tahun = tanggal.getFullYear();

  return `${tahun}`;
};
