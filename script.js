/* =====================
   THEME TOGGLE
   ===================== */
var themeBtn = document.getElementById('themeBtn');
var html = document.documentElement;

function applyTheme(theme) {
  if (theme === 'light') {
    html.setAttribute('data-theme', 'light');
    themeBtn.textContent = '☀️';
  } else {
    html.removeAttribute('data-theme');
    themeBtn.textContent = '🌙';
  }
}

// Load saved preference
var savedTheme = localStorage.getItem('sbTheme') || 'dark';
applyTheme(savedTheme);

themeBtn.addEventListener('click', function () {
  var current = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  localStorage.setItem('sbTheme', current);
  applyTheme(current);
});

/* =====================
   SCROLL FADE-IN
   ===================== */
var fadeEls = document.querySelectorAll('.fade-in');

var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(function (el) {
  observer.observe(el);
});

/* =====================
   FAQ ACCORDION
   ===================== */
var faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(function (item) {
  var btn = item.querySelector('.faq-q');

  btn.addEventListener('click', function () {
    var isOpen = item.classList.contains('open');

    // Close all
    faqItems.forEach(function (i) {
      i.classList.remove('open');
      i.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
    });

    // Open clicked if it was closed
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

/* =====================
   NAV ACTIVE HIGHLIGHT
   ===================== */
var sections = document.querySelectorAll('section[id]');
var navLinks = document.querySelectorAll('nav a[href^="#"]');

window.addEventListener('scroll', function () {
  var scrollY = window.scrollY;

  sections.forEach(function (section) {
    var top    = section.offsetTop - 120;
    var bottom = top + section.offsetHeight;
    var id     = section.getAttribute('id');

    if (scrollY >= top && scrollY < bottom) {
      navLinks.forEach(function (link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { passive: true });

/* =====================
   SMOOTH ANCHOR SCROLL
   ===================== */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      var offset = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});

/* =====================
   STAGGERED CARD ANIMATION
   ===================== */
var cardGrids = document.querySelectorAll('.benefits-grid, .steps-grid, .pricing-grid');

cardGrids.forEach(function (grid) {
  var cards = grid.querySelectorAll('.card, .step, .pricing-card');
  cards.forEach(function (card, i) {
    card.style.transitionDelay = (i * 0.08) + 's';
  });
});