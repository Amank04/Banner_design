import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import 'react-easy-crop/react-easy-crop.css'; // ensure cropper CSS is imported
import getCroppedImg from './cropImage';

const ImageCropper = ({ imageSrc, aspect, outputDimensions, onCropComplete, onCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // Update cropped area info when cropping stops/changes
  const onCropCompleteCallback = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, outputDimensions);
      onCropComplete(croppedImage);
    } catch (e) {
      console.error("Crop failed:", e);
    }
  };

  // Define a container style for the Cropper so it doesn't cover the buttons.
  const containerStyle = {
    position: 'relative',
    width: outputDimensions?.width || '100%',
    height: outputDimensions?.height || 300,
    background: '#333' // a fallback background (optional)
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md bg-white p-4 rounded shadow-lg">
        {/* Wrap cropper in a container that constrains its size */}
        <div style={containerStyle}>
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropCompleteCallback}
          />
        </div>
        <div className="mt-4 flex justify-between relative z-50">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleCrop}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
          >
            Save Crop
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
