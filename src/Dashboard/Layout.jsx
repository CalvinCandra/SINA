import Header from "./components/Header/Header";
import { Suspense, useRef, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "../component/Loading/Loading";
import Sidebar from "./components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const mainContentRef = useRef(null);

  // Scroll to top on page change (based on title change)
  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  return (
    <div className="drawer lg:drawer-open">
      {/* Sidebar toggle for mobile */}
      <input
        id="left-sidebar-drawer"
        type="checkbox"
        className="drawer-toggle"
      />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="drawer-content flex flex-col bg-biru-disabled">
        <Header />
        <main
          className="flex-1 overflow-y-auto px-4 pt-4 lg:px-6  bg-base-200"
          ref={mainContentRef}
        >
          <Outlet />
          <div className="h-16" />
        </main>
      </div>
    </div>
  );
}
