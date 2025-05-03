export default function DinamisSelect(props) {
    const { text, option = [], value = "", onChange } = props;
  
    return (
      <fieldset className="fieldset mb-4">
        <legend className="fieldset-legend text-sm font-normal">
          {text}
          <span className="text-red-500">*</span>
        </legend>
        <select
          value={value}
          onChange={onChange}
          className="select border border-border-grey w-full rounded-lg"
        >
          <option value="" disabled hidden>
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
  