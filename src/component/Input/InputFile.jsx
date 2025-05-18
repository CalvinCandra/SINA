export default function InputFile(props) {
  const {
    text,
    fungsi,
    variant = "standar",
    optional = "img",
    filename = "No file chosen",
  } = props;
  const variants = {
    w_full:
      "border border-gray-300 rounded text-sm text-gray-600 px-4 flex items-center h-[40px] w-full",
    standar:
      "border border-gray-300 rounded text-sm text-gray-600 px-4 flex items-center h-[40px] min-w-[200px]",
  };
  const optionals = {
    img: "PNG, JPG, JPEG | Max size 5MB",
    excel: "XLXS, XLS",
  };
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-gray-700">{text}</legend>
      <div className="flex items-center w-full">
        <label className="relative inline-block shrink-0">
          <input
            type="file"
            accept="image/jpg, image/png, image/jpeg"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={fungsi}
          />
          <span className="bg-black text-white py-2 px-3 lg:py-2 lg:px-4 cursor-pointer inline-block rounded-ss rounded-es">
            Pilih File
          </span>
        </label>
        <div id="file-name" className={`${variants[variant]} truncate`}>
          {filename}
        </div>
      </div>
      <label className="text-xs text-gray-500 mt-2 block">
        {optionals[optional]}
      </label>
    </fieldset>
  );
}
