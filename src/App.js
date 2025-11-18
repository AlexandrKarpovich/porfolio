import React, {useEffect, useState, useRef, useCallback} from 'react';
import './styles/style.scss'
import './App.css';
import './styles/slide-pages.scss';
import './styles/switch-theme.scss';
import './styles/homeSocial.scss';
import CrowdSimulator from './components/CrowdSimulator/CrowdSimulator';
import Portfolio from './components/Portfolio/Portfolio';
import { useLanguage } from './hooks/useLanguage';

// Utility functions
const hasClass = (el, cls) => el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
const addClass = (el, cls) => { if (!hasClass(el, cls)) el.className += " " + cls; };
const removeClass = (el, cls) => { if (hasClass(el, cls)) el.className = el.className.replace(new RegExp('(\\s|^)' + cls + '(\\s|$)'), ' '); };

function App() {
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  // Добавляем хук языка
  const { language, toggleLanguage, t } = useLanguage();

  const siteRef = useRef(null);
  const wrapRef = useRef(null);
  const panelRefs = useRef([]);

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

  const moveUp = () => {
    if (isZoomed) return;
    const wrap = wrapRef.current;
    addClass(wrap, 'animate');
    setPosY(prev => prev + 1);
  };

  const moveLeft = () => {
    if (isZoomed) return;
    const wrap = wrapRef.current;
    addClass(wrap, 'animate');
    setPosX(prev => prev + 1);
  };

  const moveRight = () => {
    if (isZoomed) return;
    const wrap = wrapRef.current;
    addClass(wrap, 'animate');
    setPosX(prev => prev - 1);
  };

  const moveDown = () => {
    if (isZoomed) return;
    const wrap = wrapRef.current;
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

  // Zoom Logic
  const zoomOut = (e) => {
    if (e) e.stopPropagation();

    const site = siteRef.current;
    const wrap = wrapRef.current;

    if (site && wrap) {
      addClass(site, 'show-all');
      setIsZoomed(true);

      panelRefs.current.forEach(panel => {
        if (panel) {
          panel.addEventListener('click', setPanelAndZoom);
        }
      });
    }
  };

  const zoomIn = () => {
    const site = siteRef.current;
    const wrap = wrapRef.current;

    if (site && wrap) {
      removeClass(site, 'show-all');
      removeClass(wrap, 'zoom-mode');
      setIsZoomed(false);

      panelRefs.current.forEach(panel => {
        if (panel) {
          panel.removeEventListener('click', setPanelAndZoom);
        }
      });
    }
  };

  const setPanelAndZoom = (e) => {
    let target = e.target;
    while (target && !target.hasAttribute('data-x-pos')) {
      target = target.parentElement;
    }

    if (target) {
      const xPos = parseInt(target.getAttribute('data-x-pos'));
      const yPos = parseInt(target.getAttribute('data-y-pos'));

      setPosX(-xPos);
      setPosY(yPos);

      setTimeout(() => {
        zoomIn();
      }, 300);
    }
  };

  const addPanelRef = (ref, index) => {
    panelRefs.current[index] = ref;
  };

  // Используем useCallback для setPos
  const setPos = useCallback(() => {
    const wrap = wrapRef.current;
    if (wrap) {
      if (isZoomed) {
        wrap.style.transform = 'scale(0.6)';
      } else {
        wrap.style.transform = `translateX(${posX}00%) translateY(${posY}00%)`;
        setTimeout(() => removeClass(wrap, 'animate'), 600);
      }
    }
  }, [posX, posY, isZoomed]);

  useEffect(() => {
    setPos();
  }, [setPos]);

  const initCrowdSimulator = () => {
    console.log('Crowd simulator initialized');
  };

  return (
      <div className="site-wrap" ref={siteRef}>
        <div className="panel-wrap animate--tilt" ref={wrapRef}>

          {/* Main Panel */}
          <div
              className="panel"
              data-x-pos="0"
              data-y-pos="0"
              ref={ref => addPanelRef(ref, 0)}
          >
            <nav className="menu">
              <span className="panel__nav panel__nav--up" onClick={moveUp}>
                {t('main.about')}
              </span>
              <span className="panel__nav panel__nav--left" onClick={moveLeft}>
                {t('main.skills')}
              </span>
              <span className="panel__nav panel__nav--right" onClick={moveRight}>
                {t('main.works')}
              </span>
              <span className="panel__nav panel__nav--down" onClick={moveDown}>
                {t('main.contacts')}
              </span>
              <span className="panel__zoom" onClick={zoomOut}>
                {t('main.viewAll')}
              </span>
            </nav>

            {/* Переключатель темы (солнышко/луна) */}
            <div className="theme-toggle" onClick={toggleTheme}>
              <div className={`theme-icon ${isDarkTheme ? 'moon' : 'sun'}`}>
                {isDarkTheme ? (
                    // Иконка луны
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor"/>
                    </svg>
                ) : (
                    // Иконка солнца
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="5" fill="currentColor"/>
                      <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                )}
              </div>
            </div>

            {/* Переключатель языка */}
            <div className="language-toggle" onClick={toggleLanguage}>
              <div className="language-text">
                {language === 'ru' ? 'EN' : 'RU'}
              </div>
            </div>

            <CrowdSimulator />

            <div className="homeSocial">
              <a href="https://github.com/AlexandrKarpovich" target="_blank" title="My GitHub" rel="noopener noreferrer">
                <i className="fa fa-github fa-2x fa-fw"></i>
              </a>
            </div>
          </div>

          {/* About Panel */}
          <div
              className="panel"
              data-x-pos="0"
              data-y-pos="1"
              ref={ref => addPanelRef(ref, 1)}
          >
            <span className="panel__nav panel__nav--left" onClick={() => { moveDown(); moveLeft(); }}>
              {t('main.skills')}
            </span>
            <span className="panel__nav panel__nav--right" onClick={() => { moveDown(); moveRight(); }}>
              {t('main.works')}
            </span>
            <span className="panel__nav panel__nav--down" onClick={moveDown}>
              {t('main.title')}
            </span>
            <span className="panel__zoom" onClick={zoomOut}>
              {t('main.viewAll')}
            </span>

            {/* Переключатель темы (солнышко/луна) */}
            <div className="theme-toggle" onClick={toggleTheme}>
              <div className={`theme-icon ${isDarkTheme ? 'moon' : 'sun'}`}>
                {isDarkTheme ? (
                    // Иконка луны
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor"/>
                    </svg>
                ) : (
                    // Иконка солнца
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="5" fill="currentColor"/>
                      <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                )}
              </div>
            </div>

            {/* Переключатель языка */}
            <div className="language-toggle" onClick={toggleLanguage}>
              <div className="language-text">
                {language === 'ru' ? 'EN' : 'RU'}
              </div>
            </div>

            <div className="container">
              <h2 className="title">{t('about.title')}</h2>
              <ul className="description">
                {t('about.experience').map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Skills Panel */}
          <div
              className="panel"
              data-x-pos="-1"
              data-y-pos="0"
              ref={ref => addPanelRef(ref, 2)}
          >
            <span className="panel__nav panel__nav--up" onClick={() => { moveRight(); moveUp(); }}>
              {t('main.about')}
            </span>
            <span className="panel__nav panel__nav--right" onClick={moveRight}>
              {t('main.title')}
            </span>
            <span className="panel__nav panel__nav--down" onClick={() => { moveRight(); moveDown(); }}>
              {t('main.contacts')}
            </span>
            <span className="panel__zoom" onClick={zoomOut}>
              {t('main.viewAll')}
            </span>

            {/* Переключатель темы (солнышко/луна) */}
            <div className="theme-toggle" onClick={toggleTheme}>
              <div className={`theme-icon ${isDarkTheme ? 'moon' : 'sun'}`}>
                {isDarkTheme ? (
                    // Иконка луны
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor"/>
                    </svg>
                ) : (
                    // Иконка солнца
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="5" fill="currentColor"/>
                      <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                )}
              </div>
            </div>

            {/* Переключатель языка */}
            <div className="language-toggle" onClick={toggleLanguage}>
              <div className="language-text">
                {language === 'ru' ? 'EN' : 'RU'}
              </div>
            </div>

            <div className="container">
              <h2 className="title">{t('skills.title')}</h2>
              <ul className="description">
                {t('skills.list').map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Works Panel */}
          <div
              className="panel"
              data-x-pos="1"
              data-y-pos="0"
              ref={ref => addPanelRef(ref, 3)}
          >
            <span className="panel__nav panel__nav--up" onClick={() => { moveLeft(); moveUp(); }}>
              {t('main.about')}
            </span>
            <span className="panel__nav panel__nav--left" onClick={moveLeft}>
              {t('main.skills')}
            </span>
            <span className="panel__nav panel__nav--down" onClick={() => { moveLeft(); moveDown(); }}>
              {t('main.contacts')}
            </span>
            <span className="panel__zoom" onClick={zoomOut}>
              {t('main.viewAll')}
            </span>

            {/* Переключатель темы (солнышко/луна) */}
            <div className="theme-toggle" onClick={toggleTheme}>
              <div className={`theme-icon ${isDarkTheme ? 'moon' : 'sun'}`}>
                {isDarkTheme ? (
                    // Иконка луны
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor"/>
                    </svg>
                ) : (
                    // Иконка солнца
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="5" fill="currentColor"/>
                      <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                )}
              </div>
            </div>

            {/* Переключатель языка */}
            <div className="language-toggle" onClick={toggleLanguage}>
              <div className="language-text">
                {language === 'ru' ? 'EN' : 'RU'}
              </div>
            </div>

            <div className="container">
              <Portfolio />
            </div>
          </div>

          {/* Contacts Panel */}
          <div
              className="panel"
              data-x-pos="0"
              data-y-pos="-1"
              ref={ref => addPanelRef(ref, 4)}
          >
            <span className="panel__nav panel__nav--up" onClick={moveUp}>
              {t('main.title')}
            </span>
            <span className="panel__nav panel__nav--left" onClick={() => { moveUp(); moveLeft(); }}>
              {t('main.skills')}
            </span>
            <span className="panel__nav panel__nav--right" onClick={() => { moveUp(); moveRight(); }}>
              {t('main.works')}
            </span>
            <span className="panel__zoom" onClick={zoomOut}>
              {t('main.viewAll')}
            </span>

            {/* Переключатель темы (солнышко/луна) */}
            <div className="theme-toggle" onClick={toggleTheme}>
              <div className={`theme-icon ${isDarkTheme ? 'moon' : 'sun'}`}>
                {isDarkTheme ? (
                    // Иконка луны
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor"/>
                    </svg>
                ) : (
                    // Иконка солнца
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="5" fill="currentColor"/>
                      <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                )}
              </div>
            </div>

            {/* Переключатель языка */}
            <div className="language-toggle" onClick={toggleLanguage}>
              <div className="language-text">
                {language === 'ru' ? 'EN' : 'RU'}
              </div>
            </div>

            <div className="container">
              <h2 className="title">{t('contacts.title')}</h2>
              <div className="description">
                {t('contacts.content')}
              </div>
            </div>
          </div>

        </div>
      </div>
  );
}

export default App;