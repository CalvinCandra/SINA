export default function Button(props) {
  const { text, type } = props;
  return (
    <button
      type={type}
      className="w-full bg-biru-primary text-xl hover:bg-biru-hover py-2 font-semibold text-white rounded-xl cursor-pointer mt-2"
    >
      {text}
    </button>
  );
}
