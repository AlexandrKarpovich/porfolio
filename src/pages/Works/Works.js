import './Works.css';
import Portfolio from "../../components/Portfolio/Portfolio";


const Works = () => {
  return (
    <div className="panel" data-x-pos="1" data-y-pos="0">
      <span className="panel__nav panel__nav--up js-left js-up">ABOUT</span>
      <span className="panel__nav panel__nav--left js-left">SKILLS</span>
      <span className="panel__nav panel__nav--down js-left js-down">CONTACTS</span>
      <span className="panel__zoom js-zoom">View All</span>
      <h1>WORKS</h1>
      {/* Добавьте контент для страницы Works */}
      <div className="works">
        <header className="works-header">
          <h1>Мое Портфолио</h1>
          <p>Здесь собраны мои проэкты c github</p>
        </header> */
        <Portfolio />
      </div>
    </div>
  );
};

export default Works;