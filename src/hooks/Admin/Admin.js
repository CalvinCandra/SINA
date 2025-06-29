import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import baseUrl from "../../utils/config/baseUrl";
import { useNavigate } from "react-router-dom";

export const useAdmin = () => {
  const navigate = useNavigate();

  const [dataAdmin, setDataAdmin] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [currentData, setCurrentData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  const dataPerPage = 10;
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;

  const token = sessionStorage.getItem("session");

  // Fetch data admin
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

  // hook data
  useEffect(() => {
    // Handle toast notifications
    const invalidStatus = localStorage.getItem("adminInvalid");
    const addedStatus = localStorage.getItem("adminAdded");
    const updateStatus = localStorage.getItem("adminUpdate");

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

    fetchData();
  }, [token]);

  // Pagination filter
  const filteredData = useMemo(() => {
    return dataAdmin
      .filter(
        (item) =>
          item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }, [dataAdmin, searchQuery]);

  // total pages
  const totalPages = Math.ceil(filteredData.length / dataPerPage);

  // Replace pagination effect jadi:
  useEffect(() => {
    setCurrentData(filteredData.slice(indexOfFirstData, indexOfLastData));
  }, [filteredData, currentPage]);

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

      setToastMessage("");
      setToastVariant("");

      setTimeout(() => {
        setToastMessage("Data Admin berhasil dihapus");
        setToastVariant("success");

        setDataAdmin((prev) =>
          prev.filter((item) => item.admin_id !== selectedAdmin.admin_id)
        );

        setIsLoading(false);
        document.getElementById("my_modal_3").close();
      }, 1000);
    } catch (error) {
      console.error("Gagal menghapus data:", error);
      setToastMessage("Gagal menghapus data");
      setToastVariant("error");
      document.getElementById("my_modal_3").close();
    }
  };

  // send Mail Per ID
  const handleSendMailAdmin = async (e, idAdmin) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${baseUrl.apiUrl}/admin/sendemail/${idAdmin}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setTimeout(() => {
          setToastMessage("Berhasil Kirim Email");
          setToastVariant("success");

          setIsLoading(false);
          document.getElementById("my_modal_4").close();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      setToastMessage("Gagal kirim email");
      setToastVariant("error");
      document.getElementById("my_modal_4").close();
    } finally {
      setIsLoading(false);
    }
  };

  // send Mail Semua
  const handleSendMail = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${baseUrl.apiUrl}/admin/sendemail`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setTimeout(() => {
          setToastMessage("Berhasil Kirim Email");
          setToastVariant("success");

          setIsLoading(false);
          document.getElementById("my_modal_5").close();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      setToastMessage("Gagal kirim email");
      setToastVariant("error");
      document.getElementById("my_modal_5").close();
    } finally {
      setIsLoading(false);
    }
  };

  return {
    dataAdmin,
    selectedAdmin,
    setSelectedAdmin,
    currentData,
    isLoading,
    toastMessage,
    toastVariant,
    indexOfFirstData,
    indexOfLastData,
    totalPages,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    handleDeleteAdmin,
    handleSendMailAdmin,
    handleSendMail,
  };
};
