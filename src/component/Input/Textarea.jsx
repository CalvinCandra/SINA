export default function Textarea(props) {
  const { text } = props;
  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend text-sm font-normal">{text}</legend>
      <textarea
        className="textarea w-full h-28 border border-border-grey rounded"
        placeholder="Type Here"
      ></textarea>
    </fieldset>
  );
}
