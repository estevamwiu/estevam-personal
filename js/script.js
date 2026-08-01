// Fade-up scroll reveal
const fadeElements = document.querySelectorAll('.fade-up');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.15 });

fadeElements.forEach(element => fadeObserver.observe(element));

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

function closeMenu() {
  menuToggle.classList.remove('active');
  navLinks.classList.remove('active');
  navOverlay.classList.remove('active');
  menuToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

function openMenu() {
  menuToggle.classList.add('active');
  navLinks.classList.add('active');
  navOverlay.classList.add('active');
  menuToggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('active');
    isOpen ? closeMenu() : openMenu();
  });

  navOverlay.addEventListener('click', closeMenu);

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

const scrollProgress = document.getElementById('scrollProgress');

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (scrollProgress) scrollProgress.style.width = progress + '%';
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

const countElements = document.querySelectorAll('.count-up');

function animateCount(el) {
  const target = parseInt(el.getAttribute('data-target'), 10) || 0;
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 1400;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(eased * target);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const countObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

countElements.forEach(el => countObserver.observe(el));

const spotlightCards = document.querySelectorAll('.spotlight-card');
const supportsHover = window.matchMedia('(hover: hover)').matches;

if (supportsHover) {
  spotlightCards.forEach(card => {
    let raf = null;
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.style.setProperty('--mx', x + 'px');
        card.style.setProperty('--my', y + 'px');
      });
    });
  });
}
