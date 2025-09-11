import './Portfolio.css';
import Project from '../Project/Project';
import ReactSneakersImg from '../../images/react-sneakers.png';
import ClubmttImg from "../../images/сlub-mtt.png";
import IdaprojectTestImg from "../../images/idaproject-test.png";

const Portfolio = () => {
  const projects = [
    {
      id: 1,
      title: "React Sneakers",
      description: "обучающий проект",
      image: ReactSneakersImg,
      technologies: ["React", "SCSS"],
      projectUrl: "https://react-sneakers-app-zeta.vercel.app",
      githubUrl: "https://github.com/AlexandrKarpovich/react-sneakers"
    },
    {
      id: 2,
      title: "Club mtt",
      description: "Рабочий проэкт (не стали запускать)",
      image: ClubmttImg,
      technologies: ["React", "SCSS"],
      projectUrl: "https://club-react.vercel.app/",
      githubUrl: "https://github.com/AlexandrKarpovich/club-react"
    },
    {
      id: 3,
      title: "Idaproject test",
      description: "Тестовое задание",
      image: IdaprojectTestImg,
      technologies: ["Vue", "SCSS"],
      projectUrl: "https://idaproject-test-rho.vercel.app/",
      githubUrl: "https://github.com/AlexandrKarpovich/idaproject-test"
    },
    {
      id: 4,
      title: "React Sneakers",
      description: "обучающий проект",
      image: ReactSneakersImg,
      technologies: ["React", "SCSS"],
      projectUrl: "https://react-sneakers-app-zeta.vercel.app",
      githubUrl: "https://github.com/AlexandrKarpovich/react-sneakers"
    },
    {
      id: 5,
      title: "Club mtt",
      description: "Рабочий проэкт (не стали запускать)",
      image: ClubmttImg,
      technologies: ["React", "SCSS"],
      projectUrl: "https://club-react.vercel.app/",
      githubUrl: "https://github.com/AlexandrKarpovich/club-react"
    },
    {
      id: 6,
      title: "Idaproject test",
      description: "Тестовое задание",
      image: IdaprojectTestImg,
      technologies: ["Vue", "SCSS"],
      projectUrl: "https://idaproject-test-rho.vercel.app/",
      githubUrl: "https://github.com/AlexandrKarpovich/idaproject-test"
    },
    {
      id: 7,
      title: "React Sneakers",
      description: "обучающий проект",
      image: ReactSneakersImg,
      technologies: ["React", "SCSS"],
      projectUrl: "https://react-sneakers-app-zeta.vercel.app",
      githubUrl: "https://github.com/AlexandrKarpovich/react-sneakers"
    },
    {
      id: 8,
      title: "Club mtt",
      description: "Рабочий проэкт (не стали запускать)",
      image: ClubmttImg,
      technologies: ["React", "SCSS"],
      projectUrl: "https://club-react.vercel.app/",
      githubUrl: "https://github.com/AlexandrKarpovich/club-react"
    },
    {
      id: 9,
      title: "Idaproject test",
      description: "Тестовое задание",
      image: IdaprojectTestImg,
      technologies: ["Vue", "SCSS"],
      projectUrl: "https://idaproject-test-rho.vercel.app/",
      githubUrl: "https://github.com/AlexandrKarpovich/idaproject-test"
    }
  ];

  return (
    <div className="portfolio">
      <div className="portfolio-grid">
        {projects.map(project => (
          <Project key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;