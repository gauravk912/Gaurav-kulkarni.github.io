// You can add interactivity if needed, e.g., sidebar nav clicks, follow button, etc.
// For now, here’s a simple 'active' switch for the nav links:
document.querySelectorAll('.sidebar nav ul li').forEach(item => {
    item.addEventListener('click', function() {
      document.querySelectorAll('.sidebar nav ul li').forEach(li => li.classList.remove('active'));
      this.classList.add('active');
    });
});

  // Sidebar active state
document.querySelectorAll('.nav-items li').forEach(item => {
      item.addEventListener('click', function() {
        document.querySelectorAll('.nav-items li').forEach(li => li.classList.remove('active'));
        this.classList.add('active');
      });
});

const techIcons = [
  // Web / MERN stack
  "assets/img/azure.png",
  "assets/img/bash.svg",
  "assets/img/cpp.png",
  "assets/img/firebase.svg",
  "assets/img/git.png",
  "assets/img/githubactions.png",
  "assets/img/googlecloud.png",
  "assets/img/heroku.svg",
  "assets/img/javascript.svg",
  "assets/img/mongodb.png",
  "assets/img/mysql.svg",
  "assets/img/next-js.svg",
  "assets/img/nodejs.png",
  "assets/img/numpy.png",
  "assets/img/pandas.jpg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",
  "assets/img/python.png",
  "assets/img/react.svg",
  "assets/img/scitlearn.png",
  "assets/img/typescript.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg"
];

const wrapper = document.getElementById("animated-logo-wrapper");
let usedIcons = new Set();

function getRandomIcons(count) {
  const available = techIcons.filter((icon) => !usedIcons.has(icon));
  if (available.length < count) {
    usedIcons.clear();
    return getRandomIcons(count); // Start fresh
  }

  const selected = [];
  while (selected.length < count) {
    const index = Math.floor(Math.random() * available.length);
    const icon = available.splice(index, 1)[0];
    selected.push(icon);
    usedIcons.add(icon);
  }
  return selected;
}

function getSpacedOffsets(count, radius = 800) {
  const angleStep = 360 / count;
  const offsets = [];

  for (let i = 0; i < count; i++) {
    const angle =
      (angleStep * i + Math.random() * 20 - 10) * (Math.PI / 180);
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    offsets.push({ x: `${x}px`, y: `${y}px` });
  }

  return offsets;
}

function animateTechIcons() {
  const count = 5;
  const icons = getRandomIcons(count);
  const positions = getSpacedOffsets(count);
  const elements = [];

  for (let i = 0; i < count; i++) {
    const icon = document.createElement("img");
    icon.src = icons[i];
    icon.className = "tech-icon";

    icon.style.setProperty("--start-x", positions[i].x);
    icon.style.setProperty("--start-y", positions[i].y);
    icon.style.animationDelay = `${i * 0.6}s`; // smooth stagger

    setTimeout(() => icon.remove(), 7000); // Allow time for full animation + delay

    wrapper.appendChild(icon);
    elements.push(icon);

    // Remove each icon individually after its animation ends
    setTimeout(() => {
      icon.remove();
    }, 6000); // match animation duration (see CSS below)
  }

  // Start next batch while previous icons are still fading out
  setTimeout(animateTechIcons, 3500);
}

animateTechIcons();



// Project Section
// Project Filtering
document.querySelectorAll('.filter-btn').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.getAttribute('data-filter');
    document.querySelectorAll('.project-card').forEach(card => {
      const tags = card.getAttribute('data-tags');
      card.style.display = (filter === 'all' || tags.includes(filter)) ? 'block' : 'none';
    });
  });
});

// Project Search
document.getElementById('searchBox').addEventListener('input', function () {
  const searchValue = this.value.toLowerCase();
  document.querySelectorAll('.project-card').forEach(card => {
    const text = card.innerText.toLowerCase();
    card.style.display = text.includes(searchValue) ? 'block' : 'none';
  });
});

// Scroll Animation for project cards
const cards = document.querySelectorAll('.project-card');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

cards.forEach(card => observer.observe(card));


const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-items li");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((li) => {
      li.classList.remove("active");
      const anchor = li.querySelector("a");
      if (anchor && anchor.getAttribute("href") === `#${current}`) {
        li.classList.add("active");
      }
    });
});