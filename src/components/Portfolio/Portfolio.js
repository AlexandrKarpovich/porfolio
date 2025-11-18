import './Portfolio.scss';
import Project from '../Project/Project';
import ReactSneakersImg from '../../images/react-sneakers.png';
import ClubmttImg from "../../images/сlub-mtt.png";
import IdaprojectTestImg from "../../images/idaproject-test.png";
import AdminPanelImg from "../../images/admin-panel.png";
import GithubFinderImg from "../../images/github-finder.png";
import AngularGithubImg from "../../images/angular-github.png";
import EmploycityTestImg from "../../images/employcity-test.png";
import SkillboxAngularImg from "../../images/skillbox-angular.png";
import StarWarsImg from "../../images/star-wars.png";
import DoctorsImg from "../../images/doctors.png";

const Portfolio = () => {
  const projects = [
    {
      id: 1,
      title: "🛒 Интернет-магазин",
      description: "обучающий проект",
      image: ReactSneakersImg,
      technologies: ["Laravel", "React", "Postgress", "SCSS"],
      projectUrl: "http://77.232.128.98:8081",
      githubUrl: "https://github.com/AlexandrKarpovich/laravel-shop",
      date: "декабрь 2025"
    },
    {
      id: 2,
      title: "React Sneakers",
      description: "обучающий проект",
      image: ReactSneakersImg,
      technologies: ["React", "SCSS"],
      projectUrl: "https://react-sneakers-app-zeta.vercel.app",
      githubUrl: "https://github.com/AlexandrKarpovich/react-sneakers",
      date: "Январь 2023"
    },
    {
      id: 3,
      title: "Club mtt",
      description: "Рабочий проект (не стали запускать)",
      image: ClubmttImg,
      technologies: ["React", "SCSS"],
      projectUrl: "https://club-react.vercel.app/",
      githubUrl: "https://github.com/AlexandrKarpovich/club-react",
      date: "Март 2023"
    },
    {
      id: 4,
      title: "Idaproject test",
      description: "Тестовое задание",
      image: IdaprojectTestImg,
      technologies: ["Vue", "SCSS"],
      projectUrl: "https://idaproject-test-rho.vercel.app/",
      githubUrl: "https://github.com/AlexandrKarpovich/idaproject-test",
      date: "Апрель 2023"
    },
    {
      id: 5,
      title: "Admin panel",
      description: "обучающий проект",
      image: AdminPanelImg,
      technologies: ["Angular", "SCSS"],
      projectUrl: "https://admin-panel-tutorial.vercel.app",
      githubUrl: "https://github.com/AlexandrKarpovich/admin-panel-tutorial",
      date: "Май 2023"
    },
    {
      id: 6,
      title: "Github finder",
      description: "обучающий проект",
      image: GithubFinderImg,
      technologies: ["Vue", "SCSS"],
      projectUrl: "https://github-finder-ecru-three.vercel.app/",
      githubUrl: "https://github.com/AlexandrKarpovich/github-finder",
      date: "Июнь 2023"
    },
    {
      id: 7,
      title: "Angular Github finder",
      description: "обучающий проект",
      image: AngularGithubImg,
      technologies: ["Angular", "SCSS"],
      projectUrl: "https://angular-github-olive.vercel.app/",
      githubUrl: "https://github.com/AlexandrKarpovich/angular-github",
      date: "Июль 2023"
    },
    {
      id: 8,
      title: "Employcity test",
      description: "Тестовое задание",
      image: EmploycityTestImg,
      technologies: ["Vue", "SCSS"],
      projectUrl: "https://employcity-test.vercel.app/order",
      githubUrl: "https://github.com/AlexandrKarpovich/employcity-test",
      date: "Август 2023"
    },
    {
      id: 9,
      title: "Skillbox angular",
      description: "Обучение курс",
      image: SkillboxAngularImg,
      technologies: ["Angular", "SCSS"],
      projectUrl: "https://skillbox-angular.vercel.app/",
      githubUrl: "https://github.com/AlexandrKarpovich/skillbox-angular",
      date: "Сентябрь 2023"
    },
    {
      id: 10,
      title: "Star wars",
      description: "обучающий проект",
      image: StarWarsImg,
      technologies: ["React", "SCSS"],
      projectUrl: "https://star-wars-ebon-mu.vercel.app/",
      githubUrl: "https://github.com/AlexandrKarpovich/star-wars",
      date: "Октябрь 2023"
    },
    {
      id: 11,
      title: "doctors",
      description: "Тестовое задание",
      image: DoctorsImg,
      technologies: ["React", "SCSS"],
      projectUrl: "https://doctors-page.vercel.app/",
      githubUrl: "https://github.com/AlexandrKarpovich/doctors-page",
      date: "Ноябрь 2023"
    },
  ];

  // Сортируем проекты по дате (от новых к старым)
  const sortedProjects = [...projects].sort((a, b) => {
    const months = {
      'Январь': 1, 'Февраль': 2, 'Март': 3, 'Апрель': 4,
      'Май': 5, 'Июнь': 6, 'Июль': 7, 'Август': 8,
      'Сентябрь': 9, 'Октябрь': 10, 'Ноябрь': 11, 'Декабрь': 12
    };
    
    const [monthA, yearA] = a.date.split(' ');
    const [monthB, yearB] = b.date.split(' ');
    
    if (yearA !== yearB) {
      return parseInt(yearB) - parseInt(yearA);
    }
    return months[monthB] - months[monthA];
  });

  return (
    <div className="portfolio">
      <div className="portfolio-grid">
        {sortedProjects.map(project => (
          <Project key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;