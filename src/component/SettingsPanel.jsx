import React from 'react';
import { motion } from 'framer-motion';
import Select from 'react-select';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Switch } from '@headlessui/react';
import { X } from 'lucide-react';

const panelVariants = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { duration: 0.3 } },
  exit: { x: '100%', transition: { duration: 0.3 } },
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      handleChange('bgImage', imageUrl);
    }
  };

  const removeImage = () => {
    if (settings.bgImage) URL.revokeObjectURL(settings.bgImage);
    handleChange('bgImage', null);
  };

  const handleColorChange = (e) => handleChange('bgColor', e.target.value);

  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`fixed right-0 top-0 h-full w-80 p-6 shadow-2xl backdrop-blur-lg z-50 overflow-y-auto ${
        darkMode
          ? 'bg-gray-900 border border-gray-700 text-gray-100'
          : 'bg-white border border-gray-200 text-gray-900'
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
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
            className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}
          >
            Banner Text
          </label>
          <input
            id="bannerText"
            type="text"
            value={settings.bannerText}
            onChange={(e) => handleChange('bannerText', e.target.value)}
            className={`w-full border rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              darkMode
                ? 'bg-gray-900 border border-gray-700 text-gray-100'
                : 'bg-white border border-gray-300 text-gray-900'
            }`}
          />
        </div>
        {/* Font */}
        <div>
          <label
            htmlFor="fontSelect"
            className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}
          >
            Font
          </label>
          <Select
            id="fontSelect"
            className="react-select-container"
            classNamePrefix="react-select"
            options={fonts}
            value={settings.font}
            onChange={(val) => handleChange('font', val)}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: '#6366F1',
                neutral0: darkMode ? '#374151' : '#fff',
                neutral80: darkMode ? '#F3F4F6' : '#111827',
              },
            })}
          />
        </div>
        {/* Animation */}
        <div>
          <label
            htmlFor="animationSelect"
            className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}
          >
            Animation
          </label>
          <Select
            id="animationSelect"
            className="react-select-container"
            classNamePrefix="react-select"
            options={animations}
            value={settings.animation}
            onChange={(val) => handleChange('animation', val)}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: '#6366F1',
                neutral0: darkMode ? '#374151' : '#fff',
                neutral80: darkMode ? '#F3F4F6' : '#111827',
              },
            })}
          />
        </div>
        {/* Background Color */}
        <div>
          <label
            htmlFor="bgColorInput"
            className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}
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
              !settings.bgImage ? 'cursor-pointer' : 'cursor-default'
            } ${darkMode ? 'bg-gray-700 border border-gray-600' : 'bg-white border border-gray-300'}`}
          />
        </div>
        {/* Opacity */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Opacity
          </label>
          <div data-testid="opacity-slider">
            <Slider
              min={0.1}
              max={1}
              step={0.1}
              value={settings.opacity}
              onChange={(val) => handleChange('opacity', val)}
              trackStyle={{ backgroundColor: '#6366F1', height: 4 }}
              handleStyle={{ borderColor: '#6366F1', height: 16, width: 16 }}
            />
          </div>
        </div>
        {/* Image Filter */}
        <div>
          <label
            htmlFor="imageFilter"
            className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}
          >
            Image Filter
          </label>
          <Select
            id="imageFilter"
            className="react-select-container"
            classNamePrefix="react-select"
            options={filters}
            value={settings.filter}
            onChange={(val) => handleChange('filter', val)}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: '#6366F1',
                neutral0: darkMode ? '#374151' : '#fff',
                neutral80: darkMode ? '#F3F4F6' : '#111827',
              },
            })}
          />
        </div>
        {/* Upload Image */}
        <div>
          <label
            htmlFor="uploadImage"
            className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}
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
          <button
            onClick={removeImage}
            className="w-full py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
          >
            Remove Image
          </button>
        )}
      </div>
      <div className="pt-6 mt-6 border-t border-gray-300 dark:border-gray-600">
        <label
          htmlFor="darkModeSwitch"
          className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}
        >
          Dark Mode
        </label>
        <Switch
          aria-label="Dark mode switch"
          id="darkModeSwitch"
          checked={darkMode}
          onChange={setDarkMode}
          className={`${darkMode ? 'bg-indigo-600' : 'bg-gray-400'} relative inline-flex h-6 w-11 items-center rounded-full transition`}
        >
          <span
            className={`${darkMode ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform bg-white rounded-full transition-transform`}
          />
        </Switch>
      </div>
    </motion.div>
  );
};

export default SettingsPanel;
