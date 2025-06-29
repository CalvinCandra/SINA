export default function FieldInput(props) {
  const {
    text,
    type = "text",
    name,
    variant,
    value,
    onChange,
    defaultValue,
    readonly,
  } = props;
  const variants = {
    biasa_text_sm: (
      <>
        <legend className="fieldset-legend text-sm font-semibold">
          {text}
        </legend>
        <input
          type={type}
          name={name}
          {...(value !== undefined ? { value, onChange } : { defaultValue })}
          className={`border border-border-grey rounded-lg input w-full ${
            readonly ? "cursor-not-allowed bg-gray-100" : ""
          }`}
          placeholder="Type here..."
          readOnly={readonly}
        />
      </>
    ),
    biasa_text_sm_disabled: (
      <>
        <legend className="fieldset-legend text-sm font-semibold">
          {text}
        </legend>
        <input
          type={type}
          name={name}
          {...(value !== undefined ? { value, onChange } : { defaultValue })}
          className={`border border-border-grey rounded-lg input w-full text-gray-600 ${
            readonly ? "cursor-not-allowed bg-gray-200" : ""
          }`}
          placeholder="Type here..."
          readOnly={readonly}
        />
      </>
    ),
    biasa_text_base: (
      <>
        <legend className="fieldset-legend text-base font-normal">
          {text}
        </legend>
        <input
          type={type}
          name={name}
          {...(value !== undefined ? { value, onChange } : { defaultValue })}
          className="border border-border-grey rounded-lg input w-full"
          placeholder="Type here..."
        />
      </>
    ),
  };
  return <fieldset className="fieldset">{variants[variant]}</fieldset>;
}
