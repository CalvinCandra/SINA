// src/hooks/useAdmin.js
import { useState, useEffect } from "react";
import axios from "axios";
import baseUrl from "../../utils/config/baseUrl";

export const useAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataAdmin, setDataAdmin] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 10;

  const token = sessionStorage.getItem("session");

  // Fetch data admin
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${baseUrl.apiUrl}/admin/admin2`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setDataAdmin(response.data);
        }
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        setToastMessage("Gagal mengambil data");
        setToastVariant("error");
      } finally {
        setIsLoading(false);
      }
    };

    // Handle toast notifications
    const invalidStatus = localStorage.getItem("adminInvalid");
    const addedStatus = localStorage.getItem("adminAdded");
    const updateStatus = localStorage.getItem("adminUpdate");
    const deleteStatus = localStorage.getItem("adminDelete");

    if (invalidStatus === "error") {
      setToastMessage("Admin Tidak ditemukan");
      setToastVariant("error");
      localStorage.removeItem("adminInvalid");
    }

    if (addedStatus === "success") {
      setToastMessage("Admin berhasil ditambahkan");
      setToastVariant("success");
      localStorage.removeItem("adminAdded");
    }

    if (updateStatus === "success") {
      setToastMessage("Admin berhasil diupdate");
      setToastVariant("success");
      localStorage.removeItem("adminUpdate");
    }

    if (deleteStatus === "success") {
      setToastMessage("Admin berhasil dihapus");
      setToastVariant("success");
      localStorage.removeItem("adminDelete");
    }

    fetchData();
  }, [token]);

  // Filter data berdasarkan search query
  const filteredData = dataAdmin.filter((admin) => {
    const query = searchQuery.toLowerCase();
    return (
      admin.username?.toLowerCase().includes(query) ||
      admin.email?.toLowerCase().includes(query)
    );
  });

  // Pagination logic
  const sortedData = filteredData.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = sortedData.slice(indexOfFirstData, indexOfLastData);
  const totalPages = Math.ceil(filteredData.length / dataPerPage);

  // Handle delete admin
  const handleDeleteAdmin = async (e) => {
    e.preventDefault();
    if (!selectedAdmin) return;

    setIsLoading(true);
    try {
      await axios.delete(
        `${baseUrl.apiUrl}/admin/admin2/${selectedAdmin.admin_id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setToastMessage("Data Admin berhasil dihapus");
      setToastVariant("success");
      setDataAdmin((prev) =>
        prev.filter((item) => item.admin_id !== selectedAdmin.admin_id)
      );
    } catch (error) {
      console.error("Gagal menghapus data:", error);
      setToastMessage("Gagal menghapus data");
      setToastVariant("error");
    } finally {
      setIsLoading(false);
      document.getElementById("my_modal_3").close();
    }
  };

  return {
    isLoading,
    currentData,
    selectedAdmin,
    toastMessage,
    toastVariant,
    searchQuery,
    currentPage,
    totalPages,
    indexOfFirstData,
    indexOfLastData,
    dataAdmin,
    setSearchQuery,
    setCurrentPage,
    setSelectedAdmin,
    handleDeleteAdmin,
  };
};
