import axios from "axios";
import baseUrl from "../../utils/config/baseUrl";
import { useState } from "react";

export const useTambahExcelSiswa = () => {
  const [file, setFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
};
