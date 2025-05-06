export default function Textarea(props) {
  const { text, value, onChange, defaultValue } = props;
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend text-sm font-semibold">{text}</legend>
      <textarea
        className="textarea w-full h-28 border border-border-grey rounded"
        placeholder="Type Here"
        {...(value !== undefined ? { value, onChange } : { defaultValue })}
      ></textarea>
    </fieldset>
  );
}
