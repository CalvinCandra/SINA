export default function FieldInput(props) {
  const { text, type, variant } = props;
  const variants = {
    biasa: (
      <>
        <legend className="fieldset-legend">{text}</legend>
        <input
          type={type}
          className="border rounded-lg input"
          placeholder="Type here"
        />
      </>
    ),
    opsional: (
      <>
        <legend className="fieldset-legend">{text}</legend>
        <input type={type} className="input" placeholder="Type here" />
        <p className="fieldset-label">Optional</p>
      </>
    ),
  };
  return <fieldset className="fieldset">{variants[variant]}</fieldset>;
}
