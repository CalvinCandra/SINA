export default function DinamisSelect({
  text,
  option = [],
  name,
  value = "",
  onChange,
  disabled = false,
}) {
  return (
    <fieldset className="fieldset mb-2 w-full">
      <legend className="fieldset-legend text-sm font-semibold">
        {text}
        <span className="text-red-500">*</span>
      </legend>
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`h-10 px-2 text-sm w-full rounded-lg ${
          disabled
            ? "border border-gray-300 bg-gray-200 text-gray-500 cursor-not-allowed"
            : "border border-border-grey"
        }`}
      >
        <option value="" hidden disabled>
          -- Pilih --
        </option>
        {option.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </fieldset>
  );
}
