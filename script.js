// انیمیشن تایپ ساده
const text = "من علی عبدالهی‌ام";
const typedTextElem = document.getElementById('typed-text');
const cursor = document.querySelector('.cursor');

let index = 0;
function type() {
  if (index < text.length) {
    typedTextElem.textContent += text.charAt(index);
    index++;
    setTimeout(type, 150);
  } else {
    // بعد از تایپ کامل، کرسر چشمک بزنه ادامه داشته باشه
    cursor.style.animation = 'blink 1s step-start infinite';
  }
}
type();

// ذرات متحرک پس‌زمینه
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
  init();
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

    if(this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
    if(this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
  }
  draw() {
    ctx.fillStyle = '#61dafb';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  particlesArray = [];
  const numberOfParticles = 100;
  for(let i=0; i<numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function handleParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for(let i=0; i<particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
  requestAnimationFrame(handleParticles);
}
init();
handleParticles();

// بهبود فرم تماس
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('پیام شما با موفقیت ارسال شد. خیلی ممنون از تماس شما!');
  this.reset();
});

// تغییر زبان
let currentLanguage = 'fa';

function toggleLanguage() {
  currentLanguage = currentLanguage === 'fa' ? 'en' : 'fa';
  updateContent();
}

function updateContent() {
  const elements = {
    title: document.querySelector('title'),
    welcomeText: document.querySelector('.hero-content h1'),
    description: document.querySelector('.hero-content p'),
    aboutTitle: document.querySelector('.about-text h2'),
    aboutText: document.querySelector('.about-text p'),
    projectsTitle: document.querySelector('#projects h2'),
    contactTitle: document.querySelector('#contact h2'),
    contactEmail: document.querySelector('.contact-info p:first-child'),
    contactGitHub: document.querySelector('.contact-info p:nth-child(2) a'),
    contactTelegram: document.querySelector('.contact-info p:nth-child(3) a'),
    resumeBtn: document.querySelector('.resume-btn'),
  };

  if (currentLanguage === 'fa') {
    elements.title.textContent = 'علی عبدالهی | برنامه‌نویس فرانت‌اند';
    elements.welcomeText.innerHTML = 'سلام، <span id="typed-text"></span><span class="cursor">|</span>';
    elements.description.textContent = 'برنامه‌نویس فرانت‌اند | عاشق پایتون و طراحی سایت';
    elements.aboutTitle.textContent = 'درباره من';
    elements.aboutText.textContent = 'من علی عبدالهی هستم، برنامه‌نویس فرانت‌اند و پایتون. با تجربه طراحی وب‌سایت‌های مدرن و پروژه‌های کاربردی، عاشق یادگیری تکنولوژی‌های جدید و حل چالش‌های برنامه‌نویسی هستم.';
    elements.projectsTitle.textContent = 'پروژه‌ها';
    elements.contactTitle.textContent = 'تماس با من';
    elements.contactEmail.innerHTML = '📧 ایمیل: ali1388009009@gmail.com';
    elements.contactGitHub.textContent = '🐙 گیت‌هاب: AliAbdolahi05';
    elements.contactTelegram.textContent = '💬 تلگرام: @Master_n_o_t';
    elements.resumeBtn.textContent = 'دانلود رزومه';
    document.getElementById('language-toggle').textContent = 'English';
  } else {
    elements.title.textContent = 'Ali Abdolahi | Front-end Developer';
    elements.welcomeText.innerHTML = 'Hello, <span id="typed-text"></span><span class="cursor">|</span>';
    elements.description.textContent = 'Front-end Developer | Python Enthusiast and Web Designer';
    elements.aboutTitle.textContent = 'About Me';
    elements.aboutText.textContent = 'I am Ali Abdolahi, a front-end developer and Python enthusiast. With experience in designing modern websites and practical projects, I love learning new technologies and solving programming challenges.';
    elements.projectsTitle.textContent = 'Projects';
    elements.contactTitle.textContent = 'Contact Me';
    elements.contactEmail.innerHTML = '📧 Email: ali1388009009@gmail.com';
    elements.contactGitHub.textContent = '🐙 GitHub: AliAbdolahi05';
    elements.contactTelegram.textContent = '💬 Telegram: @Master_n_o_t';
    elements.resumeBtn.textContent = 'Download Resume';
    document.getElementById('language-toggle').textContent = 'فارسی';
  }
}

// به صورت پیش‌فرض زبانه اول را باز کنید
document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.tablink').click();
});
