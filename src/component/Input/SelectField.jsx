export default function SelectField(props) {
  const { text, option = [], name, value, onChange, defaultValue } = props;
  return (
    <fieldset className="fieldset mb-4">
      <legend className="fieldset-legend text-sm font-semibold">
        {text}
        <span className="text-red-500">*</span>
      </legend>
      <select
        {...(value !== undefined ? { value, onChange } : { defaultValue })}
        className="select border border-border-grey w-full rounded-lg"
        name={name}
      >
        <option value="" hidden>
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
