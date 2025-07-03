import React from "react";
import { useRef, useEffect } from "react";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

function Landing_layout() {
  const mainContentRef = useRef(null);

  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  return (
    <div className="drawer lg:drawer-open">
      <div className="drawer-content flex flex-col">
        <Navbar />
        <main
          className="flex-1 overflow-y-auto bg-base-200"
          ref={mainContentRef}
        >
          <Outlet />
          {/* <div className="h-16" /> */}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Landing_layout;
