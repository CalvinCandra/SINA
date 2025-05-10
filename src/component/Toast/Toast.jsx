import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";

export default function Toast(props) {
  const { text, variant, onClose } = props;
  const [visible, setVisible] = useState(true);
  const [animating, setAnimating] = useState(false);

  const variants = {
    error: (
      <div className="lg:w-[500px] w-[350px] bg-red-500 flex justify-between p-3 rounded-md">
        <div className="flex w-full">
          <ExclamationTriangleIcon className="w-6 h-6 me-2" />
          <span className="w-[90%] text-sm md:text-lg">
            <b>Error !</b> {text}.
          </span>
        </div>
      </div>
    ),
    success: (
      <div className="lg:w-[500px] w-[350px] bg-hijau-success flex justify-between p-3 rounded-md">
        <div className="flex w-full">
          <CheckCircleIcon className="w-6 h-6 me-2" />
          <span className="w-[90%] text-sm md:text-lg">
            <b>Success !</b> {text}.
          </span>
        </div>
      </div>
    ),
  };

  useEffect(() => {
    // Auto-close after 3 seconds
    const timer = setTimeout(() => {
      setAnimating(true); // Trigger animation before disappearing
      setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, 300); // Animasi selesai setelah 300ms
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`toast toast-top toast-right z-[999] transition-all duration-300 transform ${
        animating ? "scale-50 opacity-0" : "scale-100 opacity-100"
      }`}
    >
      {variants[variant]}
    </div>
  );
}
