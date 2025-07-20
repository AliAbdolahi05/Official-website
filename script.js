let currentLanguage = 'fa';
const typedTextElem = document.getElementById('typed-text');
const cursor = document.querySelector('.cursor');

const typedTexts = {
  fa: "سلام، من علی عبدالهی‌ام",
  en: "Hi, I'm Ali Abdolahi"
};

function typeText(text) {
  typedTextElem.textContent = '';
  let index = 0;
  function type() {
    if (index < text.length) {
      typedTextElem.textContent += text.charAt(index);
      index++;
      setTimeout(type, 120);
    } else {
      cursor.style.animation = 'blink 1s step-start infinite';
    }
  }
  type();
}

function toggleLanguage() {
  currentLanguage = currentLanguage === 'fa' ? 'en' : 'fa';
  applyLanguage();
  typeText(typedTexts[currentLanguage]);
}

function applyLanguage() {
  const isFa = currentLanguage === 'fa';

  document.title = isFa ? "علی عبدالهی | برنامه‌نویس فرانت‌اند" : "Ali Abdolahi | Front-end Developer";
  document.querySelector('.hero-desc').textContent = isFa
    ? "برنامه‌نویس فرانت‌اند | عاشق پایتون و طراحی سایت"
    : "Front-end Developer | Python & Web Enthusiast";
  document.getElementById('language-toggle').textContent = isFa ? "English" : "فارسی";

  // فرم تماس
  const form = document.querySelector('#contact-form');
  if (form) {
    const placeholders = isFa
      ? ["نام شما", "ایمیل شما", "پیام شما", "ارسال پیام"]
      : ["Your Name", "Your Email", "Your Message", "Send Message"];
    form.querySelectorAll('input')[0].placeholder = placeholders[0];
    form.querySelectorAll('input')[1].placeholder = placeholders[1];
    form.querySelector('textarea').placeholder = placeholders[2];
    form.querySelector('button').textContent = placeholders[3];
  }

  // ترجمه عنوان‌ها و متن‌ها
  const aboutTitle = document.querySelector('#about h2');
  const aboutText = document.querySelector('.about-desc');
  if (aboutTitle && aboutText) {
    aboutTitle.textContent = isFa ? 'درباره من' : 'About Me';
    aboutText.textContent = isFa
      ? 'من علی عبدالهی هستم، برنامه‌نویس فرانت‌اند و پایتون. با تجربه طراحی وب‌سایت‌های مدرن و پروژه‌های کاربردی، عاشق یادگیری تکنولوژی‌های جدید و حل چالش‌های برنامه‌نویسی هستم.'
      : 'I am Ali Abdolahi, a front-end and Python developer. With experience in modern websites and practical projects, I love learning new tech and solving coding challenges.';
  }

  const projectsTitle = document.querySelector('#projects h2');
  if (projectsTitle) {
    projectsTitle.textContent = isFa ? 'پروژه‌ها' : 'Projects';
  }

  const contactTitle = document.querySelector('#contact h2');
  if (contactTitle) {
    contactTitle.textContent = isFa ? "تماس با من" : "Contact Me";
  }

  const footer = document.querySelector('footer p');
  if (footer) {
    footer.textContent = isFa
      ? "© 2025 علی عبدالهی | ساخته شده با ❤ و کدنویسی"
      : "© 2025 Ali Abdolahi | Built with ❤ and Code";
  }
}

document.addEventListener('DOMContentLoaded', () => {
  applyLanguage();
  typeText(typedTexts[currentLanguage]);
  fetchStarredRepos();
});

// پروژه‌ها از GitHub
function fetchStarredRepos() {
  const container = document.querySelector('.project-grid');
  if (!container) return;

  fetch('https://api.github.com/users/AliAbdolahi05/repos')
    .then(res => res.json())
    .then(repos => {
      container.innerHTML = '';
      repos
        .filter(repo => repo.stargazers_count > 0)
        .forEach(repo => {
          const card = document.createElement('div');
          card.className = 'project-card';
          card.innerHTML = `
            <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
            <p>${repo.description || (currentLanguage === 'fa' ? "بدون توضیح" : "No description")}</p>
          `;
          container.appendChild(card);
        });
    })
    .catch(err => {
      container.innerHTML = '<p style="color:red;">خطا در بارگذاری پروژه‌ها</p>';
      console.error('GitHub API error:', err);
    });
}

// ذرات متحرک
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particlesArray;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', () => {
  resizeCanvas();
  initParticles();
});

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.fillStyle = '#61dafb';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < 200; i++) {
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// فرم تماس
document.getElementById('contact-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  alert(currentLanguage === 'fa' ? 'پیام شما با موفقیت ارسال شد!' : 'Your message was sent successfully!');
  this.reset();
});