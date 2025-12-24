
import React, { useEffect } from "react";
import { Copy, QrCode } from "lucide-react";

const UrlList = ({ urls, setUrls, onQrClick }) => {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const getShortUrl = (url) => {
    return url.shortUrl || `https://quicklink-0v8a.onrender.com/${url.shortId}`;
  };

  // 🧠 Store URLs in localStorage whenever list changes
  useEffect(() => {
    if (urls.length > 0) {
      localStorage.setItem("savedUrls", JSON.stringify(urls));
    }
  }, [urls]);

  return (
    <div className="mt-10 w-full max-w-2xl mx-auto">
      {urls.length === 0 ? (
        <p className="text-gray-500 text-center">No shortened URLs yet.</p>
      ) : (
        urls.map((url, index) => {
          const shortUrl = getShortUrl(url);
          return (
            <div
              key={index}
              className="flex justify-between items-center bg-white shadow-md rounded-lg p-3 mb-3"
            >
              <div>
                {/* Clickable short link */}
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-600 hover:underline cursor-pointer"
                >
                  {shortUrl}
                </a>

                <p className="text-sm text-gray-500">{url.originalUrl}</p>
                {/* <p className="text-xs text-gray-400">Clicks: {url.clicks}</p> */}
              </div>

              <div className="flex gap-3">
                <Copy
                  className="cursor-pointer hover:text-blue-600"
                  onClick={() => handleCopy(shortUrl)}
                />
                <QrCode
                  className="cursor-pointer hover:text-green-600"
                  onClick={() => onQrClick(shortUrl)}
                />
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default UrlList;

