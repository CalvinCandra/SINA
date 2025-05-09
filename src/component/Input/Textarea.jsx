export default function Textarea(props) {
  const { text, value, onChange, defaultValue, readonly } = props;
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend text-sm font-semibold">{text}</legend>
      <textarea
        className={`textarea w-full h-28 border border-border-grey rounded ${
          readonly ? "cursor-not-allowed bg-gray-100" : ""
        } `}
        placeholder="Type Here"
        {...(value !== undefined ? { value, onChange } : { defaultValue })}
        readOnly={readonly}
      ></textarea>
    </fieldset>
  );
}
