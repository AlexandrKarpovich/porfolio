import './About.css';

const About = () => {
  return (
    <div className="panel" data-x-pos="0" data-y-pos="1">
      <span className="panel__nav panel__nav--left js-down js-left">SKILLS</span>
      <span className="panel__nav panel__nav--right js-down js-right">WORKS</span>
      <span className="panel__nav panel__nav--down js-down">Main</span>
      <span className="panel__zoom js-zoom">View All</span>
      <h1>ABOUT</h1>
      {/* Добавьте контент для страницы About */}
    </div>
  );
};

export default About;