$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }
    });
});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Projects | Portfolio Quoc Long Tran";
            $("#favicon").attr("href", "/assets/images/favicon.png");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "/assets/images/favhand.png");
        }
    });


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

async function fetchGitHubRepos() {
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
        return filteredRepos;
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        throw error;
    }
}

function showLoadingState() {
    const projectsContainer = document.querySelector(".work .box-container");
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading-projects';
    loadingDiv.style.cssText = 'width: 100%; text-align: center; padding: 2rem; color: #fff; font-size: 1.5rem;';
    loadingDiv.textContent = 'Loading projects...';
    projectsContainer.innerHTML = '';
    projectsContainer.appendChild(loadingDiv);
}

function showErrorState(error) {
    const projectsContainer = document.querySelector(".work .box-container");
    const errorDiv = document.createElement('div');
    errorDiv.id = 'error-projects';
    errorDiv.style.cssText = 'width: 100%; text-align: center; padding: 2rem; color: #fff; font-size: 1.5rem;';
    
    const errorMessage = document.createElement('p');
    errorMessage.textContent = 'Unable to load projects from GitHub.';
    
    const fallbackLink = document.createElement('p');
    fallbackLink.style.marginTop = '1rem';
    const link = document.createElement('a');
    link.href = `https://github.com/${GITHUB_USERNAME}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = `Visit my GitHub profile to see all projects`;
    link.style.cssText = 'color: #ffd900; text-decoration: underline; cursor: pointer;';
    fallbackLink.appendChild(link);
    
    errorDiv.appendChild(errorMessage);
    errorDiv.appendChild(fallbackLink);
    projectsContainer.innerHTML = '';
    projectsContainer.appendChild(errorDiv);
}

function showEmptyState() {
    const projectsContainer = document.querySelector(".work .box-container");
    const emptyDiv = document.createElement('div');
    emptyDiv.id = 'empty-projects';
    emptyDiv.style.cssText = 'width: 100%; text-align: center; padding: 2rem; color: #fff; font-size: 1.5rem;';
    emptyDiv.textContent = 'No public personal projects available.';
    projectsContainer.innerHTML = '';
    projectsContainer.appendChild(emptyDiv);
}

function showProjects(repos) {
    const projectsContainer = document.querySelector(".work .box-container");
    
    if (repos.length === 0) {
        showEmptyState();
        return;
    }
    
    projectsContainer.innerHTML = '';
    let projectHTML = "";
    
    repos.forEach(repo => {
        const techBadges = repo.topics && repo.topics.length > 0
            ? `<div class="tech-badges">${repo.topics.map(t => `<span class="tech-badge">${formatTechName(t)}</span>`).join('')}</div>`
            : '';
        
        projectHTML += `
            <div class="box">
              <div class="content">
                <div class="tag">
                  <i class="fas fa-code proj-icon"></i>
                  <h3>${repo.name}</h3>
                </div>
                <div class="desc">
                  <p>${repo.description || 'No description available.'}</p>
                  ${techBadges}
                  <a href="${repo.html_url}" class="proj-link" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i> View on GitHub</a>
                </div>
              </div>
            </div>`;
    });
    
    projectsContainer.innerHTML = projectHTML;
}

async function loadGitHubProjects() {
    showLoadingState();
    
    try {
        const repos = await fetchGitHubRepos();
        showProjects(repos);
    } catch (error) {
        console.error('Failed to load projects:', error);
        showErrorState(error);
    }
}

loadGitHubProjects();
// fetch projects end

// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}