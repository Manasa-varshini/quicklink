
import React, { useState, useEffect } from "react";
import UrlList from "./components/UrlList";
import axios from "axios";

function App() {
  const [urls, setUrls] = useState([]);
  const [originalUrl, setOriginalUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // 🧩 Load saved URLs on page load
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedUrls"));
    if (saved) setUrls(saved);
  }, []);

  // 🧩 Function to shorten URL
  const handleShorten = async () => {
    if (!originalUrl.trim()) {
      alert("Please enter a valid URL!");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("https://quicklink-0v8a.onrender.com/api/shorten", { originalUrl });
      const newUrl = res.data;
      const updated = [newUrl, ...urls];
      setUrls(updated);
      localStorage.setItem("savedUrls", JSON.stringify(updated));
      setOriginalUrl("");
    } catch (err) {
      console.error("Error shortening URL:", err);
      alert("Failed to shorten URL. Please check your backend connection.");
    } finally {
      setLoading(false);
    }
  };

  // 🧩 QR click (you can open modal or copy QR logic here)
  const handleQrClick = (shortUrl) => {
    console.log("QR Clicked for:", shortUrl);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-5">
      <h1 className="text-3xl font-bold text-blue-600 mt-6 mb-4">QuickLink</h1>

      {/* 🔹 URL Input Section */}
      <div className="flex w-full max-w-2xl bg-white shadow-md rounded-lg p-4 mb-6">
        <input
          type="text"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Enter URL to shorten..."
          className="flex-grow border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleShorten}
          disabled={loading}
          className={`ml-3 px-5 py-2 rounded-lg text-white ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>
      </div>

      {/* 🔹 Display Shortened URLs */}
      <UrlList urls={urls} setUrls={setUrls} onQrClick={handleQrClick} />
    </div>
  );
}

export default App;
