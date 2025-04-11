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

const Banner = ({ settings, darkMode }) => {
  // Compute the banner height using the selected banner size option.
  const bannerHeight = settings.bannerSize?.height ? `${settings.bannerSize.height}px` : '400px';

  return (
    <div
      className="relative flex items-center justify-center transition-all duration-700"
      style={{
        height: bannerHeight,
        background: settings.bgImage
          ? `url(${settings.bgImage}) center/cover no-repeat`
          : settings.bgColor || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        filter: settings.filter?.value || 'none',
      }}
    >
      {/* Optional gradient overlay */}
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <motion.p
        className={`relative text-3xl md:text-5xl font-extrabold bg-black bg-opacity-50 p-6 rounded-lg shadow-2xl ${
          darkMode ? 'text-gray-900' : 'text-white'
        }`}
        style={{ fontFamily: settings.font?.value || 'Arial', opacity: settings.opacity }}
        variants={animationVariants}
        animate={settings.animation?.value || 'none'}
      >
        {settings.bannerText}
      </motion.p>
    </div>
  );
};

export default Banner;
