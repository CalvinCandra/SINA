import { CalendarDaysIcon } from "@heroicons/react/24/outline";

export default function Calender() {
  const today = new Date();
  const tanggalFormat = today.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  return (
    <div className="shadow py-1 px-2 bg-white rounded-md border border-biru-active text-gray-400 flex items-center">
      <CalendarDaysIcon className="w-5 h-5 me-2"></CalendarDaysIcon>
      <span className="text-sm mt-1">{tanggalFormat}</span>
    </div>
  );
}
