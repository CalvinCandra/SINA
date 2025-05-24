export default function ErrorPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <section className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-blue">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">
            Halaman tidak ditemukan.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500">
            Maaf kami tidak bisa menemukan halaman yang anda cari.
          </p>
          <a
            href="/dashboard"
            className="px-4 py-2 bg-biru-active text-white rounded hover:bg-biru-hover transition"
          >
            Kembali ke Beranda
          </a>
        </div>
      </section>
    </div>
  );
}
