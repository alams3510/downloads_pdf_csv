import "./App.css";
import axios from "axios";

function App() {
  const blobConversion = (response, value) => {
    const blob = new Blob([response.data]);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    if (value === "pdf") {
      link.setAttribute("download", "example.pdf");
    } else {
      link.setAttribute("download", "example.csv");
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleDownloads = async (val) => {
    let response;
    try {
      if (val === "pdf-lib") {
        response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/pdf/pdf-lib`,
          {
            responseType: "blob",
          }
        );
      } else {
        response = await axios.get(
          `${import.meta.env.VITE_APP_BASE_URL}/pdf/html-pdf`,
          {
            responseType: "blob",
          }
        );
      }
      blobConversion(response, "pdf");
    } catch (error) {
      console.error("error in downloading pdf", error);
    }
  };

  const csvDownloads = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}/csv/csv-writter`,
      {
        responseType: "blob",
      }
    );
    blobConversion(response, "csv");
  };

  return (
    <div>
      <button onClick={() => handleDownloads("pdf-lib")}>
        Download pdf pdf-lib
      </button>
      <button onClick={() => handleDownloads("html-pdf")}>
        Download pdf html-pdf
      </button>
      <button onClick={csvDownloads}>Download csv csv-stringify</button>
    </div>
  );
}

export default App;
