import React from "react";
import ImageImport from "../../data/ImageImport";

function Footer() {
  return (
    <footer className="footer footer-horizontal footer-center bg-biru-active text-white p-10">
      <aside>
        <img
          className="h-12 object-cover"
          src={ImageImport.logoWhite}
          alt="Logo"
        />
        <p className="font-bold">Sistem Informasi Akademik</p>
        <p>
          Copyright © {new Date().getFullYear()} - All rights reserved by TRPL D
          2022
        </p>
      </aside>
      <nav>
        <div className="grid grid-flow-col gap-4 text-white">
          {/* Instagram */}
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
            aria-label="Instagram"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-6 h-6"
              viewBox="0 0 24 24"
            >
              <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10a5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7zm4.75-1.88a.88.88 0 1 1-1.75 0a.88.88 0 0 1 1.75 0z" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
            aria-label="Facebook"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-6 h-6"
              viewBox="0 0 24 24"
            >
              <path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2v-3h2v-2c0-2.1 1.3-3.3 3.3-3.3c1 0 2 .1 2 .1v2.2h-1.2c-1.1 0-1.4.7-1.4 1.4v1.6h2.8l-.5 3h-2.3v7A10 10 0 0 0 22 12z" />
            </svg>
          </a>

          {/* YouTube */}
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors text-white"
            aria-label="YouTube"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 576 512"
              className="w-6 h-6"
            >
              <path d="M549.7 124.1c-6.3-23.8-24.9-42.4-48.6-48.7C456.5 64 288 64 288 64S119.5 64 74.9 75.4c-23.7 6.3-42.3 24.9-48.6 48.7C16 168.7 16 256 16 256s0 87.3 10.3 131.9c6.3 23.8 24.9 42.4 48.6 48.7 44.6 11.4 213.1 11.4 213.1 11.4s168.5 0 213.1-11.4c23.7-6.3 42.3-24.9 48.6-48.7C560 343.3 560 256 560 256s0-87.3-10.3-131.9zM232 336V176l142.7 80L232 336z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
            aria-label="LinkedIn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-6 h-6"
              viewBox="0 0 24 24"
            >
              <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5zM3 8.98h4v12H3v-12zM9 8.98h3.6v1.6h.1c.5-.9 1.6-1.8 3.3-1.8c3.5 0 4.2 2.3 4.2 5.3v6.9h-4v-6.1c0-1.5 0-3.5-2.2-3.5s-2.5 1.6-2.5 3.4v6.2H9v-12z" />
            </svg>
          </a>
        </div>
      </nav>
    </footer>
  );
}

export default Footer;
