$(document).ready(function () {
  // Load skills from JSON file
  loadSkills();

  // Load projects from JSON file
  loadProjects();

  $("#menu").click(function () {
    $(this).toggleClass("fa-times");
    $(".navbar").toggleClass("nav-toggle");
  });

  $(window).on("scroll load", function () {
    $("#menu").removeClass("fa-times");
    $(".navbar").removeClass("nav-toggle");

    if (window.scrollY > 60) {
      document.querySelector("#scroll-top").classList.add("active");
    } else {
      document.querySelector("#scroll-top").classList.remove("active");
    }

    // scroll spy
    $("section").each(function () {
      let height = $(this).height();
      let offset = $(this).offset().top - 200;
      let top = $(window).scrollTop();
      let id = $(this).attr("id");

      if (top > offset && top < offset + height) {
        $(".navbar ul li a").removeClass("active");
        $(".navbar").find(`[href="#${id}"]`).addClass("active");
      }
    });
  });

  // smooth scrolling
  $('a[href*="#"]').on("click", function (e) {
    e.preventDefault();
    $("html, body").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top,
      },
      500,
      "linear"
    );
  });

  // <!-- emailjs to mail contact form data -->
  $("#contact-form").submit(function (event) {
    emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");

    emailjs
      .sendForm("contact_service", "template_contact", "#contact-form")
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          document.getElementById("contact-form").reset();
          alert("Form Submitted Successfully");
        },
        function (error) {
          console.log("FAILED...", error);
          alert("Form Submission Failed! Try Again");
        }
      );
    event.preventDefault();
  });
  // <!-- emailjs to mail contact form data -->
});

document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "visible") {
    document.title = "Portfolio | Quoc Long";
    $("#favicon").attr("href", "assets/images/favicon.png");
  } else {
    document.title = "Come Back To Portfolio";
    $("#favicon").attr("href", "assets/images/favhand.png");
  }
});

// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
  strings: [
    "frontend development",
    "backend development",
    "android development",
    "web development",
  ],
  loop: true,
  typeSpeed: 50,
  backSpeed: 25,
  backDelay: 500,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
  let response;
  type === "skills"
    ? (response = await fetch("skills.json"))
    : (response = await fetch("./projects/projects.json"));
  const data = await response.json();
  return data;
}

function showSkills(skills) {
  let skillsContainer = document.getElementById("skillsContainer");
  let skillHTML = "";
  skills.forEach((skill) => {
    skillHTML += `
        <div class="bar">
              <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`;
  });
  skillsContainer.innerHTML = skillHTML;
}

// GitHub API Configuration
const GITHUB_USERNAME = 'quoclong20222428';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`;

// Technology name formatting mapping
const techNameMap = {
    'react': 'React',
    'vue': 'Vue',
    'angular': 'Angular',
    'nodejs': 'Node.js',
    'node.js': 'Node.js',
    'expressjs': 'Express.js',
    'express': 'Express',
    'fastapi': 'FastAPI',
    'python': 'Python',
    'javascript': 'JavaScript',
    'typescript': 'TypeScript',
    'java': 'Java',
    'spring-boot': 'Spring Boot',
    'spring': 'Spring',
    'postgresql': 'PostgreSQL',
    'mongodb': 'MongoDB',
    'mysql': 'MySQL',
    'docker': 'Docker',
    'kubernetes': 'Kubernetes',
    'tailwindcss': 'Tailwind CSS',
    'bootstrap': 'Bootstrap',
    'sass': 'Sass',
    'webpack': 'Webpack',
    'vite': 'Vite',
    'git': 'Git',
    'aws': 'AWS',
    'gcp': 'GCP',
    'azure': 'Azure',
    'graphql': 'GraphQL',
    'rest-api': 'REST API',
    'html': 'HTML',
    'css': 'CSS'
};

function formatTechName(topic) {
    if (!topic) return '';
    const lowerTopic = topic.toLowerCase();
    if (techNameMap[lowerTopic]) {
        return techNameMap[lowerTopic];
    }
    return topic
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function getDefaultProjects() {
    return [
        {
            name: 'Weather Forecast',
            description: 'A full-stack web real-time weather with location search and weather forecast data.',
            html_url: 'https://github.com/quoclong20222428/weather-forecast-fe',
            topics: ['react', 'typescript', 'nodejs', 'mongodb']
        },
        {
            name: 'Sudoku Solver',
            description: 'Full-stack Sudoku game with user authentication, game saving, intelligent hints.',
            html_url: 'https://github.com/quoclong20222428/sudoku-game',
            topics: ['react', 'expressjs', 'mongodb', 'javascript']
        },
        {
            name: 'FlowLite',
            description: 'Full-featured task management platform for group members or individuals.',
            html_url: 'https://github.com/tquocan04/mini-management-project',
            topics: ['react', 'nodejs', 'tailwindcss']
        },
        {
            name: 'To-Do List',
            description: 'A web app task management, time-based filters, and real-time statistics dashboard.',
            html_url: 'https://github.com/quoclong20222428/todo-list-frontend',
            topics: ['react', 'javascript', 'css']
        },
        {
            name: 'Weather App',
            description: 'Weather application with real-time data and forecasts.',
            html_url: 'https://github.com/quoclong20222428/weather-forecast-fe',
            topics: ['javascript', 'html', 'css']
        },
        {
            name: 'Sudoku Game',
            description: 'Interactive Sudoku puzzle game with solver.',
            html_url: 'https://github.com/quoclong20222428/sudoku-game',
            topics: ['game', 'javascript', 'puzzle']
        }
    ];
}

async function fetchGitHubProjects() {
    try {
        const response = await fetch(GITHUB_API_URL);
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        const repos = await response.json();
        // Filter: only public repos, non-forks, and exclude readme repo
        const filteredRepos = repos.filter(repo => 
            repo.private === false && 
            repo.fork === false &&
            repo.name !== 'quoclong20222428'
        );
        console.log('GitHub repos loaded:', filteredRepos.length);
        return filteredRepos.length > 0 ? filteredRepos : getDefaultProjects();
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        console.log('Using default projects as fallback');
        return getDefaultProjects();
    }
}

function showProjects(projects) {
  let projectsContainer = document.querySelector("#work .box-container");
  
  if (!projectsContainer) {
    console.warn('Projects container not found, retrying...');
    setTimeout(() => showProjects(projects), 500);
    return;
  }
  
  console.log('Displaying projects:', projects.length);
  let projectHTML = "";
  
  // Limit to first 6 for homepage
  projects.slice(0, 6).forEach((project) => {
      const techBadges = project.topics && project.topics.length > 0
          ? `<div class="tech-badges">${project.topics.map(t => `<span class="tech-badge">${formatTechName(t)}</span>`).join('')}</div>`
          : '';
      
      projectHTML += `
        <div class="box">
          <div class="content">
            <div class="tag">
              <i class="fas fa-code proj-icon"></i>
              <h3>${project.name}</h3>
            </div>
            <div class="desc">
              <p>${project.description || 'No description available.'}</p>
              ${techBadges}
              <a href="${project.html_url}" class="proj-link" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i> View on GitHub</a>
            </div>
          </div>
        </div>`;
  });
  projectsContainer.innerHTML = projectHTML;
}

async function loadProjects() {
    try {
        const repos = await fetchGitHubProjects();
        if (repos && repos.length > 0) {
            showProjects(repos);
        } else {
            console.log('No repos returned, using fallback');
            showProjects(getDefaultProjects());
        }
    } catch (error) {
        console.error('Error in loadProjects:', error);
        showProjects(getDefaultProjects());
    }
}

function showPublications(publications) {
  let publicationsContainer = document.getElementById("publicationsContainer");
  let publicationHTML = "";
  publications.forEach((publication) => {
    publicationHTML += `
        <div class="box">
          <div class="content">
            <div class="tag">
              <h3>${publication.title}</h3>
            </div>
            <div class="desc">
              <p><strong>Role:</strong> ${publication.role}</p>
              <p><strong>Authors:</strong> ${publication.authors.join(", ")}</p>
              <p><strong>Conference:</strong> ${publication.conference}</p>
              <p><strong>Year:</strong> ${publication.year}</p>
            </div>
          </div>
        </div>
    `;
  });
  publicationsContainer.innerHTML = publicationHTML;
}

function showCertifications(certifications) {
  let certificationsContainer = document.getElementById("certificationsContainer");
  let certificationsHTML = "";
  certifications.forEach((certification) => {
    certificationsHTML += `
        <div class="box">
          <div class="content">
            <h3>${certification.title}</h3>
            <p>${certification.date}</p>
          </div>
        </div>
    `;
  });
  certificationsContainer.innerHTML = certificationsHTML;
}

function showAchievements(achievements) {
  let achievementsContainer = document.getElementById("achievementsContainer");
  let achievementsHTML = "";
  achievements.forEach((achievement) => {
    achievementsHTML += `
        <div class="box">
          <div class="content">
            <h3>${achievement.title}</h3>
            <p>${achievement.date}</p>
          </div>
        </div>
    `;
  });
  achievementsContainer.innerHTML = achievementsHTML;
}

function showExperience(experiences) {
  let experienceContainer = document.getElementById("experienceContainer");
  let experienceHTML = "";
  experiences.forEach((exp, index) => {
    const position = index % 2 === 0 ? "right" : "left";
    const skillBadges = exp.skills
      ? `<div class="exp-badges">${exp.skills.map(skill => `<span class="exp-badge">${skill}</span>`).join('')}</div>`
      : '';
    
    experienceHTML += `
        <div class="container ${position}">
          <div class="content">
            <div class="tag">
              <i class="fas fa-building exp-header-icon"></i>
              <h2>${exp.position}</h2>
            </div>
            <div class="desc">
              <h3>${exp.title}</h3>
              <p class="exp-duration"><i class="far fa-calendar-alt"></i>${exp.duration}</p>
              ${exp.description ? `<p>${exp.description}</p>` : ''}
              ${skillBadges}
            </div>
          </div>
        </div>
    `;
  });
  experienceContainer.innerHTML = experienceHTML;
}

fetchData().then((data) => {
  showSkills(data);
});

// Load GitHub projects
loadProjects();

// Load experience
fetch("./experience.json")
  .then((response) => response.json())
  .then((data) => showExperience(data))
  .catch((error) => console.error("Error loading experience:", error));

// Load publications
fetch("./publications.json")
  .then((response) => response.json())
  .then((data) => showPublications(data))
  .catch((error) => console.error("Error loading publications:", error));

// Load certifications
fetch("./certifications.json")
  .then((response) => response.json())
  .then((data) => showCertifications(data))
  .catch((error) => console.error("Error loading certifications:", error));

// Load achievements
fetch("./achievements.json")
  .then((response) => response.json())
  .then((data) => showAchievements(data))
  .catch((error) => console.error("Error loading achievements:", error));

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
  max: 15,
});
// <!-- tilt js effect ends -->

// pre loader start
// function loader() {
//     document.querySelector('.loader-container').classList.add('fade-out');
// }
// function fadeOut() {
//     setInterval(loader, 500);
// }
// window.onload = fadeOut;
// pre loader end

// disable developer mode
document.onkeydown = function (e) {
  if (e.keyCode == 123) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
    return false;
  }
};

/* ===== SCROLL REVEAL ANIMATION ===== */
// Function to get appropriate scroll reveal config based on screen size
function getScrollRevealConfig() {
  const isMobile = window.innerWidth < 768; // Mobile: < 768px, Desktop: >= 768px

  return {
    origin: "top",
    distance: "80px",
    duration: 1000,
    reset: false,
    viewFactor: isMobile ? 0.3 : 0.2, // Mobile: 30%, Desktop: 20%
    viewOffset: { top: 50, bottom: 50 },
  };
}

const srtop = ScrollReveal(getScrollRevealConfig());

// Re-initialize scroll reveal on window resize
window.addEventListener("resize", () => {
  // Reinitialize with new config when screen size changes
  ScrollReveal().clean();
  const newConfig = getScrollRevealConfig();
  Object.assign(srtop, ScrollReveal(newConfig));
});

/* SCROLL HOME */
srtop.reveal(".home .content h3", { delay: 200 });
srtop.reveal(".home .content p", { delay: 200 });
srtop.reveal(".home .content .btn", { delay: 200 });

srtop.reveal(".home .image", { delay: 400 });
srtop.reveal(".home .linkedin", { interval: 600 });
srtop.reveal(".home .github", { interval: 800 });
srtop.reveal(".home .twitter", { interval: 1000 });
srtop.reveal(".home .telegram", { interval: 600 });
srtop.reveal(".home .instagram", { interval: 600 });
srtop.reveal(".home .dev", { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal(".about .content h3", { delay: 200 });
srtop.reveal(".about .content .tag", { delay: 200 });
srtop.reveal(".about .content p", { delay: 200 });
srtop.reveal(".about .content .box-container", { delay: 200 });
srtop.reveal(".about .content .resumebtn", { delay: 200 });

/* SCROLL EDUCATION */
srtop.reveal(".education .box", { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal(".experience .timeline", { delay: 400 });
srtop.reveal(".experience .timeline .container", { interval: 400 });

// Function to load skills from JSON and display them by category
function loadSkills() {
  fetch("./skills.json")
    .then((response) => response.json())
    .then((data) => {
      const skillsContainer = document.getElementById("skillsContainer");
      skillsContainer.innerHTML = "";

      const categoryLabels = {
        languages: "Programming Languages",
        frontend: "Frontend",
        backend: "Backend & APIs",
        databases: "Databases",
        cloud: "Cloud & DevOps",
        tools: "Tools & Platforms",
      };

      for (const [category, skills] of Object.entries(data)) {
        // Add category heading
        const heading = document.createElement("h3");
        heading.textContent = categoryLabels[category] || category;
        skillsContainer.appendChild(heading);

        // Create grid container for this category
        const grid = document.createElement("div");
        grid.className = "skills-grid";

        // Add skills for this category
        skills.forEach((skill) => {
          const skillBar = document.createElement("div");
          skillBar.className = "bar";

          const infoDiv = document.createElement("div");
          infoDiv.className = "info";

          const img = document.createElement("img");
          img.src = skill.icon;
          img.alt = skill.name;

          const span = document.createElement("span");
          span.textContent = skill.name;

          infoDiv.appendChild(img);
          infoDiv.appendChild(span);
          skillBar.appendChild(infoDiv);
          grid.appendChild(skillBar);
        });

        skillsContainer.appendChild(grid);
      }

      // Apply scroll reveal animation after content is loaded
      srtop.reveal(".skills .container .row > h3", { interval: 100 });
      srtop.reveal(".skills .container .bar", { interval: 50 });
    })
    .catch((error) => console.error("Error loading skills:", error));
}



// Function to load projects from JSON and display them (OLD - REMOVED)
// Using GitHub API instead


/* SCROLL CONTACT */
srtop.reveal(".contact .container", { delay: 400 });
srtop.reveal(".contact .container .form-group", { delay: 400 });
