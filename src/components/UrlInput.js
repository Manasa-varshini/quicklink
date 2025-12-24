
import React, { useState } from "react";
import axios from "axios";

const UrlInput = ({ onNewUrl }) => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!originalUrl) return alert("Please enter a URL!");

    try {
      setLoading(true);
      const res = await axios.post("https://quicklink-0v8a.onrender.com/api/shorten", {
        originalUrl,
      });
      
      console.log("Backend response:", res.data); // Debug log
      
      // Handle the response properly - use the data directly from backend
      onNewUrl(res.data);
      setOriginalUrl("");
      
    } catch (error) {
      console.error("Error details:", error.response?.data);
      alert(error.response?.data?.message || "Error shortening URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8"
    >
      <input
        type="url"
        placeholder="Enter URL to shorten"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        className="border border-gray-300 rounded-lg p-3 w-80 focus:outline-blue-500"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400"
      >
        {loading ? "Shortening..." : "Shorten URL"}
      </button>
    </form>
  );
};

export default UrlInput;