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
    document.title = "Portfolio | Jigar Sable";
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

function showProjects(projects) {
  let projectsContainer = document.querySelector("#work .box-container");
  let projectHTML = "";
  projects
    .slice(0, 10)
    .filter((project) => project.category != "unk")
    .forEach((project) => {
      let btn = project.links.view != "#" ? `<a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>` : '';
      projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="./assets/images/projects/${project.image}.png" alt="project" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">
            ${btn}
            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
          </div>
        </div>
      </div>
    </div>`;
    });
  projectsContainer.innerHTML = projectHTML;

  // <!-- tilt js effect starts -->
  VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
  });
  // <!-- tilt js effect ends -->
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

fetchData().then((data) => {
  showSkills(data);
});

fetchData("projects").then((data) => {
  showProjects(data);
});

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

// Function to load projects from JSON and display them
function loadProjects() {
  fetch("./projects/projects.json")
    .then((response) => response.json())
    .then((data) => {
      const projectsContainer = document.getElementById("projectsContainer");
      projectsContainer.innerHTML = "";

      data.forEach((project) => {
        const projectBox = document.createElement("div");
        projectBox.className = "box tilt";

        const contentDiv = document.createElement("div");
        contentDiv.className = "content";

        const tagDiv = document.createElement("div");
        tagDiv.className = "tag";

        const projectTitle = document.createElement("h3");
        projectTitle.textContent = project.name;
        tagDiv.appendChild(projectTitle);

        const descDiv = document.createElement("div");
        descDiv.className = "desc";

        const projectDesc = document.createElement("p");
        projectDesc.textContent = project.desc;
        descDiv.appendChild(projectDesc);

        const btnsDiv = document.createElement("div");
        btnsDiv.className = "btns";

        const viewLink = document.createElement("a");
        viewLink.href = project.links.view;
        viewLink.className = "btn";
        viewLink.target = "_blank";
        viewLink.innerHTML = '<i class="fas fa-eye"></i> View';

        const codeLink = document.createElement("a");
        codeLink.href = project.links.code;
        codeLink.className = "btn";
        codeLink.target = "_blank";
        codeLink.innerHTML = 'Code <i class="fas fa-code"></i>';

        btnsDiv.appendChild(viewLink);
        btnsDiv.appendChild(codeLink);

        descDiv.appendChild(btnsDiv);
        contentDiv.appendChild(tagDiv);
        contentDiv.appendChild(descDiv);
        projectBox.appendChild(contentDiv);
        projectsContainer.appendChild(projectBox);
      });

      // Show or hide "View All" button based on project count
      const viewAllBtn = document.querySelector(".work .viewall");
      if (data.length > 6) {
        viewAllBtn.style.display = "flex";
      } else {
        viewAllBtn.style.display = "none";
      }

      // Apply tilt effect after content is loaded
      VanillaTilt.init(document.querySelectorAll(".work .box.tilt"), {
        max: 15,
      });

      // Apply scroll reveal animation after content is loaded
      srtop.reveal(".work .box", { interval: 100 });
    })
    .catch((error) => console.error("Error loading projects:", error));
}
/* SCROLL CONTACT */
srtop.reveal(".contact .container", { delay: 400 });
srtop.reveal(".contact .container .form-group", { delay: 400 });
