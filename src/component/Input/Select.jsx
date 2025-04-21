export default function Select(props) {
    const {text} = props
  return (
    <select defaultValue="Pick a color" className="select">
      <option disabled={true}>Pick a color</option>
      <option>Crimson</option>
      <option>Amber</option>
      <option>Velvet</option>
    </select>
  );
}
