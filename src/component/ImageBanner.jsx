import React from 'react';
import { motion } from 'framer-motion';

const animationVariants = {
  none: {},
  fade: { opacity: [0, 1] },
  bounce: { y: [0, -10, 0], transition: { repeat: Infinity, duration: 0.6 } },
  typewriter: {
    width: ['0%', '100%'],
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    transition: { duration: 2 },
  },
};

const ImageBanner = ({ settings, darkMode }) => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {settings.bgImage && (
        <img
          src={settings.bgImage}
          alt="Banner"
          className="w-full h-full object-cover"
          style={{ filter: settings.filter?.value || 'none' }}
        />
      )}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.p
          className={`text-3xl md:text-5xl font-extrabold bg-black bg-opacity-50 p-6 rounded-lg shadow-2xl ${
            darkMode ? 'text-gray-900' : 'text-white'
          }`}
          style={{ fontFamily: settings.font?.value || 'Arial', opacity: settings.opacity }}
          variants={animationVariants}
          animate={settings.animation?.value || 'none'}
        >
          {settings.bannerText}
        </motion.p>
      </div>
    </div>
  );
};

export default ImageBanner;
