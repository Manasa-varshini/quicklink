import React from "react";
import { QRCodeCanvas } from "qrcode.react";




const QrModal = ({ url, onClose }) => {
  if (!url) return null;

  const downloadQR = () => {
    const canvas = document.getElementById("qr-gen");
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center">
        <h2 className="text-xl font-semibold mb-3">QR Code</h2>
        <QRCodeCanvas id="qr-gen" value={url} size={180} />
      


        <div className="mt-4 flex justify-center gap-3">
          <button
            onClick={downloadQR}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Download
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default QrModal;
