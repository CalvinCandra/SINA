import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";

export default function Toast(props) {
  const { text, variant } = props;

  const variants = {
    error: (
      <>
        <div className="w-[500px] bg-red-500 flex justify-between p-3 rounded-md">
          <div className="flex w-full">
            <ExclamationTriangleIcon className="w-6 h-6 me-2"></ExclamationTriangleIcon>
            <span className="w-[90%]">
              <b>Error !</b> {text}.
            </span>
          </div>
          <button>
            <XMarkIcon className="w-6 h-6 font-bold mx-2 cursor-pointer"></XMarkIcon>
          </button>
        </div>
      </>
    ),

    success: (
      <>
        <div className="w-[500px] bg-hijau-success flex justify-between p-3 rounded-md">
          <div className="flex w-full">
            <CheckCircleIcon className="w-6 h-6 me-2"></CheckCircleIcon>
            <span className="w-[90%]">
              <b>Success !</b> {text}.
            </span>
          </div>
          <button>
            <XMarkIcon className="w-6 h-6 font-bold mx-2 cursor-pointer"></XMarkIcon>
          </button>
        </div>
      </>
    ),
  };
  return (
    <div className="toast toast-top toast-end z-[999]">{variants[variant]}</div>
  );
}
