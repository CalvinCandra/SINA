export default function Button(props) {
  const { text, variant, disabled } = props;
  const variants = {
    button_submit_dash:
      "w-full bg-biru-primary text-sm hover:bg-biru-hover py-2 font-semibold text-white rounded cursor-pointer",
    button_submit_login:
      "w-full bg-biru-primary text-base hover:bg-biru-hover py-2 font-semibold text-white rounded-xl cursor-pointer mt-2",
    button_submit_cancel:
      "w-full bg-red-500 text-sm hover:bg-red-600 py-2 font-semibold text-white rounded cursor-pointer",
  };
  return (
    <button type="submit" className={variants[variant]} disabled={disabled}>
      {text}
    </button>
  );
}
