import React from "react";
import ImageImport from "../../data/ImageImport";
import { useInformasiSekolah } from "../../hooks/Landing/ProfileWebsite";
import baseUrl from "../../utils/config/baseUrl";

function Footer() {
  const { informasi } = useInformasiSekolah();

  // Cek apakah ada media sosial yang terisi
  const hasSocialMedia =
    informasi.instagram ||
    informasi.facebook ||
    informasi.youtube ||
    informasi.linkedin;

  return (
    <footer className="bg-biru-active text-white">
      <div className="container mx-auto px-4 py-10">
        {/* Main Footer Content */}
        <div
          className={`grid ${
            hasSocialMedia
              ? "grid-cols-1 md:grid-cols-3"
              : "grid-cols-1 md:grid-cols-2"
          } gap-8 mb-8`}
        >
          {/* Logo Section with Adjacent Text */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-2 mb-2">
              <img
                className="h-12 object-cover"
                src={
                  informasi.logo
                    ? `${baseUrl.apiUrl}/admin/sekolah/${informasi.logo}`
                    : ImageImport.logoIcon
                }
                alt="Logo"
              />
              <span className="font-bold text-3xl">
                {informasi.singkatan || "SINA"}
              </span>
            </div>
            <p className="text-lg font-semibold">
              {informasi.nama_sekolah || "Sistem Informasi Akademik"}
            </p>
            <p className="text-sm text-gray-100 mt-1">
              {informasi.tag ||
                "Transformasi Digital Pendidikan dengan Sistem Akademik Terintegrasi"}
            </p>
          </div>

          {/* Contact Information */}
          <div
            className={`flex flex-col items-center ${
              hasSocialMedia ? "md:items-start md:pl-20" : "md:items-end"
            }`}
          >
            <h3 className="font-bold text-lg mb-4">Hubungi Kami</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>{informasi.email || "infoakademik@sina.com"}</span>
              </div>
              <div className="flex items-center space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>{informasi.no_telepon || "+62 123 4567 890"}</span>
              </div>
            </div>
          </div>

          {/* Social Media - hanya ditampilkan jika ada */}
          {hasSocialMedia && (
            <div className="flex flex-col items-center md:items-end">
              <h3 className="font-bold text-lg mb-4">Media Sosial</h3>
              <div className="flex space-x-4">
                {informasi.instagram && (
                  <a
                    href={informasi.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-300 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10a5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7zm4.75-1.88a.88.88 0 1 1-1.75 0a.88.88 0 0 1 1.75 0z" />
                    </svg>
                  </a>
                )}
                {informasi.facebook && (
                  <a
                    href={informasi.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-300 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2v-3h2v-2c0-2.1 1.3-3.3 3.3-3.3c1 0 2 .1 2 .1v2.2h-1.2c-1.1 0-1.4.7-1.4 1.4v1.6h2.8l-.5 3h-2.3v7A10 10 0 0 0 22 12z" />
                    </svg>
                  </a>
                )}
                {informasi.youtube && (
                  <a
                    href={informasi.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-300 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 576 512"
                    >
                      <path d="M549.7 124.1c-6.3-23.8-24.9-42.4-48.6-48.7C456.5 64 288 64 288 64S119.5 64 74.9 75.4c-23.7 6.3-42.3 24.9-48.6 48.7C16 168.7 16 256 16 256s0 87.3 10.3 131.9c6.3 23.8 24.9 42.4 48.6 48.7 44.6 11.4 213.1 11.4 213.1 11.4s168.5 0 213.1-11.4c23.7-6.3 42.3-24.9 48.6-48.7C560 343.3 560 256 560 256s0-87.3-10.3-131.9zM232 336V176l142.7 80L232 336z" />
                    </svg>
                  </a>
                )}
                {informasi.linkedin && (
                  <a
                    href={informasi.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-300 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5zM3 8.98h4v12H3v-12zM9 8.98h3.6v1.6h.1c.5-.9 1.6-1.8 3.3-1.8c3.5 0 4.2 2.3 4.2 5.3v6.9h-4v-6.1c0-1.5 0-3.5-2.2-3.5s-2.5 1.6-2.5 3.4v6.2H9v-12z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-white border-opacity-20 my-6"></div>

        {/* Copyright */}
        <div className="text-center text-sm text-white text-opacity-70">
          <p>
            Copyright © {new Date().getFullYear()} - All rights reserved by TRPL
            D 2022
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
