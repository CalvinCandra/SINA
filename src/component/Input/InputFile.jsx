export default function InputFile(props) {
  const { text, fungsi } = props;
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-gray-700">{text}</legend>
      <div className="flex items-center">
        <label className="relative inline-block">
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
        <div
          id="file-name"
          className="border border-gray-300 rounded text-sm text-gray-600 px-4 flex items-center h-[40px] min-w-[200px]"
        >
          No file chosen
        </div>
      </div>
      <label className="text-xs text-gray-500 mt-2 block">
        PNG, JPG, JPEG | Max size 5MB
      </label>
    </fieldset>
  );
}
