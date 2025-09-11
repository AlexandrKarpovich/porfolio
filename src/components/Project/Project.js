import './Project.css';

const Project = ({ project }) => {
  return (
    <div className="project-card">
      <div className="project-image">
        <img 
          src={project.image} 
          alt={project.title}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x200/cccccc/666666?text=Изображение+не+найдено";
          }}
        />
      </div>
      
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        
        <div className="project-technologies">
          {project.technologies.map((tech, index) => (
            <span key={index} className="tech-tag">{tech}</span>
          ))}
        </div>

        <div className="project-links">
          {project.projectUrl && (
            <a 
              href={project.projectUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-link"
            >
              <svg className="link-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 10.82a1 1 0 0 0-1 1V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h7.18a1 1 0 0 0 0-2H5a3 3 0 0 0-3 3v11a3 3 0 0 0 3 3h11a3 3 0 0 0 3-3v-7.18a1 1 0 0 0-1-1Z"/>
                <path d="M19.92 2.62a1 1 0 0 0-.54-.54A1 1 0 0 0 19 2h-6a1 1 0 0 0 0 2h3.59l-9.3 9.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L18 5.41V9a1 1 0 0 0 2 0V3a1 1 0 0 0-.08-.38Z"/>
              </svg>
              Демо
            </a>
          )}
          
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="project-link github-link"
            >
              <svg className="link-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0.296997C5.37 0.296997 0 5.67 0 12.297C0 17.6 3.438 22.097 8.205 23.682C8.805 23.795 9.025 23.424 9.025 23.105C9.025 22.82 9.015 22.065 9.01 21.065C5.672 21.789 4.968 19.455 4.968 19.455C4.422 18.07 3.633 17.7 3.633 17.7C2.546 16.956 3.717 16.971 3.717 16.971C4.922 17.055 5.555 18.207 5.555 18.207C6.625 20.042 8.364 19.512 9.05 19.205C9.158 18.429 9.467 17.9 9.81 17.6C7.145 17.3 4.344 16.268 4.344 11.67C4.344 10.36 4.809 9.29 5.579 8.45C5.444 8.147 5.039 6.927 5.684 5.274C5.684 5.274 6.689 4.952 8.984 6.504C9.944 6.237 10.964 6.105 11.984 6.099C13.004 6.105 14.024 6.237 14.984 6.504C17.264 4.952 18.269 5.274 18.269 5.274C18.914 6.927 18.509 8.147 18.389 8.45C19.154 9.29 19.619 10.36 19.619 11.67C19.619 16.28 16.814 17.295 14.144 17.59C14.564 17.95 14.954 18.686 14.954 19.81C14.954 21.416 14.939 22.706 14.939 23.096C14.939 23.411 15.149 23.786 15.764 23.666C20.565 22.092 24 17.592 24 12.297C24 5.67 18.627 0.296997 12 0.296997Z"/>
              </svg>
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;