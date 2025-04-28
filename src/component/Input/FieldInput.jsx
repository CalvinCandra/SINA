export default function FieldInput(props) {
  const { text, type, name, variant, value = "" } = props;
  const variants = {
    biasa_text_sm: (
      <>
        <legend className="fieldset-legend text-sm font-semibold">
          {text}
        </legend>
        <input
          type={type}
          name={name}
          value={value}
          className="border border-border-grey rounded-lg input w-full"
          placeholder="Type here"
          required
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
          value={value}
          className="border border-border-grey rounded-lg input w-full"
          placeholder="Type here"
          required
        />
      </>
    ),
  };
  return <fieldset className="fieldset mb-4">{variants[variant]}</fieldset>;
}
