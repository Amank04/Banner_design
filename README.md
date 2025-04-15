# 🎨 Banner Design App

A minimal front-end React application built with **Vite** and **Tailwind CSS**, designed for creating or showcasing clean, responsive banner components.

---

## 🚀 Live Demo

Check out the live version here:  
👉 [banner-design-iota.vercel.app](https://banner-design-iota.vercel.app)

---

## 🧰 Tech Stack

- ⚛️ [React](https://reactjs.org/)
- ⚡ [Vite](https://vitejs.dev/)
- 🎨 [Tailwind CSS](https://tailwindcss.com/)
- 🧹 [ESLint](https://eslint.org/) for code linting

---

## 📁 Project Structure

```text
Banner_design/
│
├── public/                            # Static files
│   ├── vite.svg
│   └── wiki_logo.png
│
├── src/                               # Main application source
│   ├── __tests__/                     # Test files
│   │   └── InteractiveBanner.test.jsx
│   │
│   ├── assets/                        # Static assets (SVGs, images, etc.)
│   │   └── react.svg
│   │
│   ├── component/                     # Reusable React components
│   │   ├── Banner.jsx
│   │   ├── ImageBanner.jsx
│   │   ├── ImageCropper.jsx
│   │   ├── PreviewModal.jsx
│   │   ├── SettingsPanel.jsx
│   │   └── cropImage.js              # Utility for image cropping
│   │
│   ├── hooks/                         # Custom React hooks
│   │   └── useLocalStorage.js
│   │
│   ├── App.css
│   ├── App.jsx                        # Main app layout
│   ├── InteractiveBanner.jsx         # Interactive banner feature
│   ├── index.css                     # Global styles including Tailwind
│   ├── main.jsx                      # Entry point
│   └── setupTests.js                 # Test setup file
│
├── .babelrc                          # Babel configuration
├── .gitignore
├── README.md
├── eslint.config.js                 # ESLint configuration
├── index.html                       # Base HTML template
├── package.json
├── package-lock.json
├── postcss.config.js               # PostCSS + Tailwind setup
├── tailwind.config.js              # Tailwind CSS config
└── vite.config.js                  # Vite build tool config
```

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Amank04/Banner_design.git
cd Banner_design
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Start the Development server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```
### 5. Lint the code
```bash
npm run lint
```

✨ Feel free to fork this repository, contribute with improvements, or use it as a starter template for your own creative banner design projects!
