import React, { useState, useEffect } from 'react';
// import './ThemeSwitcher.css';

const ThemeSwitcher = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark-theme') {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      localStorage.setItem('theme', 'light-theme');
      setIsDark(false);
    } else {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark-theme');
      setIsDark(true);
    }
  };

  return (
    <button className="theme-btn" onClick={toggleTheme}>
      Switch to <span className="theme-type">{isDark ? 'Light' : 'Dark'}</span> Theme
    </button>
  );
};

export default ThemeSwitcher;