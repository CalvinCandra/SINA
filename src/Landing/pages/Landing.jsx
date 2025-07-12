import React, { useState, useEffect } from "react";
import BeritaTerkini from "../components/BeritaTerkini";
import Tentang from "../components/Tentang";
import ImageImport from "../../data/ImageImport";
import { useCount } from "../../hooks/Landing/Count";
import { useInformasiSekolah } from "../../hooks/Landing/ProfileWebsite";

// Komponen Counter dengan animasi
const CounterItem = ({ target, label, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <div className="text-center">
      <div className="text-5xl font-medium text-primary">
        {count.toLocaleString()}
      </div>
      <div className="text-lg text-white">{label}</div>
    </div>
  );
};

// Komponen Fakta Sina
const FaktaSina = () => {
  const { informasi } = useInformasiSekolah();

  const { dataCountGuru, dataCountSiswa, dataCountAdmin } = useCount();

  return (
    <div className="py-10 bg-biru-primary text-white" id="">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-semibold text-center mb-6">
          Fakta {informasi.singkatan || "SINA"}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="card bg-base-200 p-6">
            <CounterItem target={dataCountGuru || 0} label="Guru" />
          </div>

          <div className="card bg-base-200 p-6">
            <CounterItem target={dataCountSiswa} label="Siswa" />
          </div>

          <div className="card bg-base-200 p-6">
            <CounterItem target={9077} label="Alumni" />
          </div>

          <div className="card bg-base-200 p-6">
            <CounterItem target={dataCountAdmin || 0} label="Petugas" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Komponen Landing Page utama
export default function Landing() {
  const { informasi } = useInformasiSekolah();

  return (
    <>
      <div
        className="hero min-h-screen bg-cover bg-center relative"
        style={{ backgroundImage: `url(${ImageImport.siswaGambar})` }}
      >
        {/* Overlay biru gelap dengan opacity */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(28, 74, 217, 0.6)" }} //blue active 60%
          // style={{ backgroundColor: "rgba(46, 119, 247, 0.6)" }} //blue primary
        ></div>

        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-screen px-4">
            <h1 className="mb-2 text-5xl font-bold text-white uppercase">
              {informasi.nama_sekolah || "SISTEM INFORMASI AKADEMIK"}
            </h1>
            <p className="mb-5 text-white">
              {informasi.tag ||
                "Transformasi Digital Pendidikan dengan Sistem Akademik Terintegrasi"}
            </p>
            <button
              className="rounded-full p-2 border-2 border-white hover:bg-white/10 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById("tentang");
                if (element) {
                  window.scrollTo({
                    top: element.offsetTop - 100,
                    behavior: "smooth",
                  });
                }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <Tentang />

      <FaktaSina />

      <BeritaTerkini />
    </>
  );
}
