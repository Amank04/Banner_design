import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLocalStorage } from './hooks/useLocalStorage';
// import Banner from './components/Banner';
import Banner from './component/Banner';
import ImageBanner from './component/ImageBanner';
import SettingsPanel from './component/SettingsPanel';

const fonts = ['Arial', 'Courier New', 'Georgia', 'Times New Roman', 'Verdana'].map(
  (f) => ({ value: f, label: f })
);
const animations = ['none', 'fade', 'bounce', 'typewriter'].map(
  (a) => ({ value: a, label: a })
);
const filters = [
  { value: 'none', label: 'None' },
  { value: 'grayscale(100%)', label: 'Grayscale' },
  { value: 'sepia(100%)', label: 'Sepia' },
  { value: 'blur(5px)', label: 'Blur' },
  { value: 'brightness(1.5)', label: 'Brightness' },
];

const InteractiveBanner = () => {
  const [settings, setSettings] = useLocalStorage('bannerSettings', {
    bannerText: 'Exploring new places is my passion!',
    font: fonts[0],
    animation: animations[0],
    bgColor: '#ffffff',
    bgImage: null,
    opacity: 1,
    filter: filters[0],
  });
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
  const [showControls, setShowControls] = useState(false);

  // Use ImageBanner if a background image is provided, otherwise default to Banner.
  const BannerComponent = settings.bgImage ? ImageBanner : Banner;

  return (
    <div
      data-testid="interactive-banner-container"
      className={`${darkMode ? 'dark' : ''} relative flex flex-col md:flex-row min-h-screen transition-all duration-500 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <button
        onClick={() => setShowControls(!showControls)}
        className="absolute top-4 right-4 z-50 p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-500 focus:outline-none"
      >
        {showControls ? <X size={28} /> : <Menu size={28} />}
      </button>
      <BannerComponent settings={settings} darkMode={darkMode} />
      <AnimatePresence>
        {showControls && (
          <SettingsPanel
            settings={settings}
            setSettings={setSettings}
            closePanel={() => setShowControls(false)}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            fonts={fonts}
            animations={animations}
            filters={filters}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveBanner;
