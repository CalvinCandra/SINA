export default function Textarea(props) {
  const {
    text,
    value,
    onChange,
    defaultValue,
    readonly,
    variant = "default",
  } = props;

  const variants = {
    default: (
      <>
        <legend className="fieldset-legend text-sm font-semibold">
          {text}
        </legend>
        <textarea
          className={`textarea w-full h-28 border border-border-grey rounded ${
            readonly ? "cursor-not-allowed bg-gray-100" : ""
          } `}
          placeholder="Type Here"
          {...(value !== undefined ? { value, onChange } : { defaultValue })}
          readOnly={readonly}
        ></textarea>
      </>
    ),
    disabled: (
      <>
        <legend className="fieldset-legend text-sm font-semibold">
          {text}
        </legend>
        <textarea
          className={`textarea w-full h-28 border border-border-grey rounded text-gray-600 ${
            readonly ? "cursor-not-allowed bg-gray-100" : ""
          } `}
          placeholder="Type Here"
          {...(value !== undefined ? { value, onChange } : { defaultValue })}
          readOnly={readonly}
        ></textarea>
      </>
    ),
  };
  return <fieldset className="fieldset">{variants[variant]}</fieldset>;
}
