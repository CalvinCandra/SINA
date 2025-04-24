export default function SelectField(props) {
  const { text, option = [], value = "" } = props;
  return (
    <fieldset className="fieldset mb-4">
      <legend className="fieldset-legend text-sm font-normal">
        {text}
        <span className="text-red-500">*</span>
      </legend>
      <select
        value={value}
        className="select border border-border-grey w-full rounded-lg"
      >
        <option value="" selected hidden>
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
