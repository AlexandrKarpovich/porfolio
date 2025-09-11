import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './App.css';
import './styles/slide-pages.css';
import './styles/switch-theme.css';
import './styles/homeSocial.css';
import './pages/Works/Works.css'
import CrowdSimulator from './components/CrowdSimulator/CrowdSimulator';
import Portfolio from './components/Portfolio/Portfolio';

// Utility functions
const hasClass = (el, cls) => el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
const addClass = (el, cls) => { if (!hasClass(el, cls)) el.className += " " + cls; };
const removeClass = (el, cls) => { if (hasClass(el, cls)) el.className = el.className.replace(new RegExp('(\\s|^)' + cls + '(\\s|$)'), ' '); };

function App() {
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    // Initialize theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark-theme') {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
      setIsDarkTheme(true);
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
      setIsDarkTheme(false);
    }

    // Initialize crowd simulator
    initCrowdSimulator();
  }, []);

  const setPos = () => {
    const wrap = document.querySelector('.panel-wrap');
    if (wrap) {
      wrap.style.transform = `translateX(${posX}00%) translateY(${posY}00%)`;
      setTimeout(() => removeClass(wrap, 'animate'), 600);
    }
  };

  const moveUp = () => {
    const wrap = document.querySelector('.panel-wrap');
    addClass(wrap, 'animate');
    setPosY(prev => prev + 1);
  };

  const moveLeft = () => {
    const wrap = document.querySelector('.panel-wrap');
    addClass(wrap, 'animate');
    setPosX(prev => prev + 1);
  };

  const moveRight = () => {
    const wrap = document.querySelector('.panel-wrap');
    addClass(wrap, 'animate');
    setPosX(prev => prev - 1);
  };

  const moveDown = () => {
    const wrap = document.querySelector('.panel-wrap');
    addClass(wrap, 'animate');
    setPosY(prev => prev - 1);
  };

  const toggleTheme = () => {
    if (isDarkTheme) {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      localStorage.setItem('theme', 'light-theme');
      setIsDarkTheme(false);
    } else {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark-theme');
      setIsDarkTheme(true);
    }
  };

  useEffect(() => {
    setPos();
  }, [posX, posY]);

  const initCrowdSimulator = () => {
    // Crowd simulator will be implemented separately
    console.log('Crowd simulator initialized');
  };

  return (
    <div className="site-wrap">
      <div className="panel-wrap animate--tilt">
        
        {/* Main Panel */}
        <div className="panel" data-x-pos="0" data-y-pos="0">
          <nav className="menu">
            <span className="panel__nav panel__nav--up" onClick={moveUp}>ABOUT</span>
            <span className="panel__nav panel__nav--left" onClick={moveLeft}>SKILLS</span>
            <span className="panel__nav panel__nav--right" onClick={moveRight}>WORKS</span>
            <span className="panel__nav panel__nav--down" onClick={moveDown}>CONTACTS</span>
            <span className="panel__zoom">View All</span>
          </nav>
          
          <div className="page-descrp">
            <h1>Alex Karpovich</h1>
          </div>

          <button className="theme-btn" onClick={toggleTheme}>
            Switch to <span className="theme-type">{isDarkTheme ? 'Light' : 'Dark'}</span> Theme
          </button>

          <CrowdSimulator />

          <div className="homeSocial">
            <a href="#" target="_blank" title="My Instagram" rel="noopener noreferrer">
              <i className="fa fa-instagram fa-2x fa-fw"></i>
            </a>
            <a href="https://github.com/AlexandrKarpovich" target="_blank" title="My GitHub" rel="noopener noreferrer">
              <i className="fa fa-github fa-2x fa-fw"></i>
            </a>
          </div>
        </div>

        {/* About Panel */}
        <div className="panel" data-x-pos="0" data-y-pos="1">
          <span className="panel__nav panel__nav--left" onClick={() => { moveDown(); moveLeft(); }}>SKILLS</span>
          <span className="panel__nav panel__nav--right" onClick={() => { moveDown(); moveRight(); }}>WORKS</span>
          <span className="panel__nav panel__nav--down" onClick={moveDown}>Main</span>
          <span className="panel__zoom">View All</span>
          <h1>ABOUT</h1>
          <ul>
            <li>2022 AO MTT (дочерняя компания MTC) Fullstack developer (удалено)</li>
            <li>2020 B2broker web-developer write code Moscow, B2broker.com</li>
            <li>2019 IP5 agency Верстальщик, Интегратор Создание и поддержка интернет магазинов на платформе CS-Cart Симферополь, ip-5.ru</li>
            <li>2018 SiteUP Web-Разработчик/верстальщик Верстка и нарезка PSD макетов под CMS WordPress Симферополь, siteup.ru</li>
          </ul>
        </div>

        {/* Skills Panel */}
        <div className="panel" data-x-pos="-1" data-y-pos="0">
          <span className="panel__nav panel__nav--up" onClick={() => { moveRight(); moveUp(); }}>ABOUT</span>
          <span className="panel__nav panel__nav--right" onClick={moveRight}>WORKS</span>
          <span className="panel__nav panel__nav--down" onClick={() => { moveRight(); moveDown(); }}>CONTACTS</span>
          <span className="panel__zoom">View All</span>
          <h1>SKILLS</h1>
          <ul>
            <li>HTML5(Pug/jade) Flex/Grid, Кроссбраузерная верстка/Адаптивная верстка</li>
            <li>CSS3(Less, Sass/Scss, Stylus)</li>
            <li>JavaScript (es6/jquery)</li>
            <li>React, vue, Angular</li>
            <li>CMS(Wordpress, Joomla, CS-Cart)</li>
            <li>Перенос доменов. Перенос сайтов на хостинг</li>
            <li>системами контроля версий Git, работать с GitHub, GitLab</li>
            <li>Сборщик Gulp/Webpack, vite</li>
            <li>Figma, Adobe Photoshop</li>
            <li>Php</li>
            <li>MySQL</li>
            <li>Опыт работы в команде, работа с чужим кодом</li>
            <li>И самое главное желание профессионально развиваться</li>
          </ul>
        </div>

        {/* Works Panel */}
        <div className="panel" data-x-pos="1" data-y-pos="0">
          <span className="panel__nav panel__nav--up" onClick={() => { moveLeft(); moveUp(); }}>ABOUT</span>
          <span className="panel__nav panel__nav--left" onClick={moveLeft}>SKILLS</span>
          <span className="panel__nav panel__nav--down" onClick={() => { moveLeft(); moveDown(); }}>CONTACTS</span>
          <span className="panel__zoom">View All</span>
          {/* <h1>WORKS</h1> */}
          <div className="works">
            <header className="works-header">
              {/* <h1>Мое Портфолио</h1> */}
              {/* <p>Здесь собраны мои проэкты c github</p> */}
            </header>
            <Portfolio />
          </div>
        </div>

        {/* Contacts Panel */}
        <div className="panel" data-x-pos="0" data-y-pos="-1">
          <span className="panel__nav panel__nav--up" onClick={moveUp}>Main</span>
          <span className="panel__nav panel__nav--left" onClick={() => { moveUp(); moveLeft(); }}>SKILLS</span>
          <span className="panel__nav panel__nav--right" onClick={() => { moveUp(); moveRight(); }}>WORKS</span>
          <span className="panel__zoom">View All</span>
          <h1>CONTACTS</h1>
        </div>

      </div>
    </div>
  );
}

export default App;
