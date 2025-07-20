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
function changeLanguage(lang) {
  document.getElementById('typed-text').textContent = translations[lang].typed_text;
  document.querySelector('.nav-links li:nth-child(1) a').textContent = translations[lang].home;
  document.querySelector('.nav-links li:nth-child(2) a').textContent = translations[lang].about;
  document.querySelector('.nav-links li:nth-child(3) a').textContent = translations[lang].projects;
  document.querySelector('.nav-links li:nth-child(4) a').textContent = translations[lang].contact;

  document.querySelector('.hero h1').firstChild.textContent = translations[lang].hero_title + " ";
  document.querySelector('.hero p').textContent = translations[lang].hero_desc;
  document.querySelector('.btn').textContent = translations[lang].contact_me;

  document.querySelector('#about h2').textContent = translations[lang].about_title;
  document.querySelector('#about p').textContent = translations[lang].about_desc;

  document.querySelector('#projects h2').textContent = translations[lang].projects_title;
  document.querySelector('#contact h2').textContent = translations[lang].contact_title;

  document.querySelector('.contact-form input[type="text"]').placeholder = translations[lang].form_name;
  document.querySelector('.contact-form input[type="email"]').placeholder = translations[lang].form_email;
  document.querySelector('.contact-form textarea').placeholder = translations[lang].form_message;
  document.querySelector('.contact-form button').textContent = translations[lang].form_submit;

  document.querySelector('footer p').textContent = translations[lang].footer;
}

document.getElementById('language-switcher').addEventListener('change', (e) => {
  changeLanguage(e.target.value);
});
// اصلاح پیام فرم تماس برای پشتیبانی از زبان
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const lang = document.getElementById('language-switcher').value;
  alert(translations[lang].alert);
  this.reset();
});
