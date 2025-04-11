import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const PreviewModal = ({ onClose, bannerRef }) => {
  const [previewImage, setPreviewImage] = useState(null);

  // Capture the banner right when the modal mounts.
  useEffect(() => {
    if (bannerRef.current) {
      html2canvas(bannerRef.current, {
        useCORS: true,
        backgroundColor: null,
        scale: 1, // use actual dimensions
      }).then((canvas) => {
        setPreviewImage(canvas.toDataURL("image/png"));
      });
    }
  }, [bannerRef]);

  const handleDownload = async (format) => {
    if (!bannerRef.current) return;

    // Capture the banner with the same options to generate an identical canvas.
    const canvas = await html2canvas(bannerRef.current, {
      useCORS: true,
      backgroundColor: null,
      scale: 1,
    });

    if (format === "png" || format === "jpeg") {
      let mimeType = format === "png" ? "image/png" : "image/jpeg";
      let imgData = canvas.toDataURL(mimeType);
      if (format === "jpeg") {
        // Create a temporary canvas with a white background for JPEG.
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const ctx = tempCanvas.getContext("2d");
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        ctx.drawImage(canvas, 0, 0);
        imgData = tempCanvas.toDataURL("image/jpeg");
      }
      const link = document.createElement("a");
      link.download = `banner.${format}`;
      link.href = imgData;
      link.click();
    } else if (format === "pdf") {
      // Generate a PDF with the canvas dimensions.
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? "landscape" : "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("banner.pdf");
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-4 rounded shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Banner Preview</h2>
          <button onClick={onClose} className="text-red-500 focus:outline-none">
            Close
          </button>
        </div>
        {/* Preview image container is limited to a maximum height with scrolling */}
        <div className="border mb-4 p-2 flex items-center justify-center max-h-screen overflow-auto">
          {previewImage ? (
            <img
              src={previewImage}
              alt="Banner Preview"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover", // image fills container
                display: "block",
                margin: 0,
                padding: 0,
              }}
            />
          ) : (
            <p className="text-gray-500">Loading Preview...</p>
          )}
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={() => handleDownload("png")}
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          >
            Save as PNG
          </button>
          <button
            onClick={() => handleDownload("jpeg")}
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          >
            Save as JPEG
          </button>
          <button
            onClick={() => handleDownload("pdf")}
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          >
            Save as PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
