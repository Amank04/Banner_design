// SettingsPanel.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import Select from "react-select";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { Switch } from "@headlessui/react";
import { X } from "lucide-react";
import ImageCropper from "./ImageCropper";

// Update banner size options to include extra larger options along with a vertical option.
// Each option now includes a height (in px) and an aspect ratio.
const bannerSizes = [
  { value: "small", label: "Small (300px)", height: 300, aspect: 16 / 9 },
  { value: "medium", label: "Medium (400px)", height: 400, aspect: 16 / 9 },
  { value: "large", label: "Large (500px)", height: 500, aspect: 16 / 9 },
  { value: "vertical", label: "Vertical (600px)", height: 850, aspect: 9 / 16 },
  { value: "xlarge", label: "Extra Large (800px)", height: 800, aspect: 16 / 9 },
  { value: "square", label: "Square (400px)", height: 400, aspect: 1 },
];


const panelVariants = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: { duration: 0.3 } },
  exit: { x: "100%", transition: { duration: 0.3 } },
};

const SettingsPanel = ({
  settings,
  setSettings,
  closePanel,
  darkMode,
  setDarkMode,
  fonts,
  animations,
  filters,
}) => {
  const handleChange = (key, value) =>
    setSettings((prev) => ({ ...prev, [key]: value }));

  // To allow correct re-editing, store the uploaded (or last cropped) original image separately.
  const [originalImage, setOriginalImage] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  // On image upload, store the uploaded file as the original image and immediately open the cropper.
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setOriginalImage(reader.result);
        handleChange("bgImage", reader.result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    handleChange("bgImage", null);
    setOriginalImage(null);
  };

  const handleColorChange = (e) => handleChange("bgColor", e.target.value);

  // Calculate output dimensions based on the selected banner size
  const outputDimensions = {
    width: Math.round((settings.bannerSize?.height || 400) * (settings.bannerSize?.aspect || (16 / 9))),
    height: settings.bannerSize?.height || 400,
  };

  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`fixed right-0 top-0 h-full w-80 p-6 shadow-2xl backdrop-blur-lg z-50 overflow-y-auto ${
        darkMode
          ? "bg-gray-900 border border-gray-700 text-gray-100"
          : "bg-white border border-gray-200 text-gray-900"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2
          className={`text-2xl font-bold ${
            darkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          Settings
        </h2>
        <button
          onClick={closePanel}
          className="p-2 bg-gray-700 text-white rounded-full shadow hover:bg-gray-600 focus:outline-none"
        >
          <X size={28} />
        </button>
      </div>
      <div className="space-y-5">
        {/* Banner Text */}
        <div>
          <label
            htmlFor="bannerText"
            className={`block text-sm font-medium mb-2 ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Banner Text
          </label>
          <input
            id="bannerText"
            type="text"
            value={settings.bannerText}
            onChange={(e) => handleChange("bannerText", e.target.value)}
            className={`w-full border rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              darkMode
                ? "bg-gray-900 border border-gray-700 text-gray-100"
                : "bg-white border border-gray-300 text-gray-900"
            }`}
          />
        </div>
        {/* Font */}
        <div>
          <label
            htmlFor="fontSelect"
            className={`block text-sm font-medium mb-2 ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Font
          </label>
          <Select
            id="fontSelect"
            className="react-select-container"
            classNamePrefix="react-select"
            options={fonts}
            value={settings.font}
            onChange={(val) => handleChange("font", val)}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: "#6366F1",
                neutral0: darkMode ? "#374151" : "#fff",
                neutral80: darkMode ? "#F3F4F6" : "#111827",
              },
            })}
          />
        </div>
        {/* Animation */}
        <div>
          <label
            htmlFor="animationSelect"
            className={`block text-sm font-medium mb-2 ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Animation
          </label>
          <Select
            id="animationSelect"
            className="react-select-container"
            classNamePrefix="react-select"
            options={animations}
            value={settings.animation}
            onChange={(val) => handleChange("animation", val)}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: "#6366F1",
                neutral0: darkMode ? "#374151" : "#fff",
                neutral80: darkMode ? "#F3F4F6" : "#111827",
              },
            })}
          />
        </div>
        {/* Banner Size */}
        <div>
          <label
            htmlFor="bannerSizeSelect"
            className={`block text-sm font-medium mb-2 ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Banner Size
          </label>
          <Select
            id="bannerSizeSelect"
            className="react-select-container"
            classNamePrefix="react-select"
            options={bannerSizes}
            value={settings.bannerSize}
            onChange={(val) => handleChange("bannerSize", val)}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: "#6366F1",
                neutral0: darkMode ? "#374151" : "#fff",
                neutral80: darkMode ? "#F3F4F6" : "#111827",
              },
            })}
          />
        </div>
        {/* Background Color */}
        <div>
          <label
            htmlFor="bgColorInput"
            className={`block text-sm font-medium mb-2 ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Background Color
          </label>
          <input
            id="bgColorInput"
            type="color"
            disabled={settings.bgImage}
            onChange={handleColorChange}
            value={settings.bgColor}
            className={`w-12 h-10 p-1 border rounded-lg ${
              !settings.bgImage ? "cursor-pointer" : "cursor-default"
            } ${
              darkMode
                ? "bg-gray-700 border border-gray-600"
                : "bg-white border border-gray-300"
            }`}
          />
        </div>
        {/* Opacity */}
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Opacity
          </label>
          <div data-testid="opacity-slider">
            <Slider
              min={0.1}
              max={1}
              step={0.1}
              value={settings.opacity}
              onChange={(val) => handleChange("opacity", val)}
              trackStyle={{ backgroundColor: "#6366F1", height: 4 }}
              handleStyle={{
                borderColor: "#6366F1",
                height: 16,
                width: 16,
              }}
            />
          </div>
        </div>
        {/* Image Filter */}
        <div>
          <label
            htmlFor="imageFilter"
            className={`block text-sm font-medium mb-2 ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Image Filter
          </label>
          <Select
            id="imageFilter"
            className="react-select-container"
            classNamePrefix="react-select"
            options={filters}
            value={settings.filter}
            onChange={(val) => handleChange("filter", val)}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: "#6366F1",
                neutral0: darkMode ? "#374151" : "#fff",
                neutral80: darkMode ? "#F3F4F6" : "#111827",
              },
            })}
          />
        </div>
        {/* Upload Image */}
        <div>
          <label
            htmlFor="uploadImage"
            className={`block text-sm font-medium mb-2 ${
              darkMode ? "text-gray-100" : "text-gray-900"
            }`}
          >
            Upload Image
          </label>
          <input
            id="uploadImage"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </div>
        {settings.bgImage && (
          <>
          <button
            onClick={() => setShowCropper(true)}
            className="w-full py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition mt-2"
          >
            Edit Image
          </button>
          <button
            onClick={removeImage}
            className="w-full py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition mt-2"
          >
            Remove Image
          </button>
        </>
        )}

{showCropper && (
        <ImageCropper
          imageSrc={originalImage || settings.bgImage}
          aspect={settings.bannerSize?.aspect || 16 / 9}
          outputDimensions={outputDimensions}
          onCropComplete={(croppedImage) => {
            handleChange("bgImage", croppedImage);
            setOriginalImage(croppedImage);
            setShowCropper(false);
          }}
          onCancel={() => setShowCropper(false)}
        />
      )}
      </div>
      <div className="pt-6 mt-6 border-t border-gray-300 dark:border-gray-600">
        <label
          htmlFor="darkModeSwitch"
          className={`block text-sm font-medium mb-2 ${
            darkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          Dark Mode
        </label>
        <Switch
          aria-label="Dark mode switch"
          id="darkModeSwitch"
          checked={darkMode}
          onChange={setDarkMode}
          className={`${
            darkMode ? "bg-indigo-600" : "bg-gray-400"
          } relative inline-flex h-6 w-11 items-center rounded-full transition`}
        >
          <span
            className={`${
              darkMode ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform bg-white rounded-full transition-transform`}
          />
        </Switch>
      </div>
    </motion.div>
  );
};

export default SettingsPanel;
