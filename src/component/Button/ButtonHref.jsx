export default function ButtonHref(props) {
  const { text, href, variant } = props;
  const variants = {
    tambah:
      "w-full bg-biru-primary text-sm hover:bg-biru-hover py-2 font-semibold text-white rounded cursor-pointer",
    update: "",
    cancel:
      "w-full bg-red-500 text-sm hover:bg-red-600 py-2 font-semibold text-white rounded cursor-pointer",
  };
  return (
    <a href={href} className={variants[variant]}>
      <span className="mx-4">{text}</span>
    </a>
  );
}
