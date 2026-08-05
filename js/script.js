(function () {
  'use strict';

  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const nav = document.getElementById('nav');
  const themeToggle = document.getElementById('themeToggle');
  const sections = document.querySelectorAll('section[id]');
  const navItems = navLinks.querySelectorAll('a:not(.nav__cta)');
  const THEME_KEY = 'portfolioTheme';

  const setTheme = (theme) => {
    const isLight = theme === 'light';
    document.body.classList.toggle('theme-light', isLight);
    if (themeToggle) {
      themeToggle.textContent = isLight ? '🌙' : '☀️';
      themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    }
    window.localStorage.setItem(THEME_KEY, theme);
  };

  const toggleTheme = () => {
    setTheme(document.body.classList.contains('theme-light') ? 'dark' : 'light');
  };

  const initTheme = () => {
    const savedTheme = window.localStorage.getItem(THEME_KEY);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
      return;
    }

    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
setTheme(prefersDark ? 'dark' : 'light');
  };

  const toggleMobileNav = () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  };

  const closeMobileNav = () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
  };

  const updateNavState = () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 20);

    let current = '';
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 100) {
        current = section.id;
      }
    });

    navItems.forEach((link) => {
      link.style.color = '';
      if (link.getAttribute('href') === `#${current}`) {
        link.style.color = 'var(--color-text)';
      }
    });
  };

  const initRevealAnimations = () => {
    const revealElements = document.querySelectorAll(
      '.section__header, .about__grid, .project, .skill-category, .cert-card, .contact-card, .resume-cta__inner'
    );

    revealElements.forEach((el) => el.classList.add('reveal'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => observer.observe(el));
  };

  const initScreenshotGallery = () => {
    const sliders = document.querySelectorAll('.project-slider');
    sliders.forEach((slider) => {
      const items = Array.from(slider.querySelectorAll('.project-slider__items img'));
      const image = slider.querySelector('.project-slider__image');
      const label = slider.querySelector('.project-slider__label');
      const description = slider.querySelector('.project-slider__description');
      const prevButton = slider.querySelector('.project-slider__prev');
      const nextButton = slider.querySelector('.project-slider__next');

      if (!items.length || !image || !label || !description || !prevButton || !nextButton) return;

      let currentIndex = 0;

      const updateSlider = () => {
        const active = items[currentIndex];
        if (!active) return;
        image.src = active.src;
        image.alt = active.alt;
        label.textContent = active.dataset.label || active.alt || '';
        description.textContent = active.dataset.description || '';
      };

      const goPrevious = () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateSlider();
      };

      const goNext = () => {
        currentIndex = (currentIndex + 1) % items.length;
        updateSlider();
      };

      const openFullscreen = () => {
        const active = items[currentIndex];
        if (!active) return;

        const overlay = document.createElement('div');
        overlay.style.cssText =
          'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.92);display:flex;align-items:center;justify-content:center;cursor:pointer;padding:24px;';
        const clone = active.cloneNode();
        clone.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:14px;box-shadow:0 24px 60px rgba(0,0,0,0.35);';
        overlay.appendChild(clone);
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        overlay.addEventListener('click', () => {
          overlay.remove();
          document.body.style.overflow = '';
        });
      };

      prevButton.addEventListener('click', goPrevious);
      nextButton.addEventListener('click', goNext);
      image.addEventListener('click', openFullscreen);

      updateSlider();
    });
  };

  const init = () => {
    navToggle.addEventListener('click', toggleMobileNav);
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
    }
    navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMobileNav));
    window.addEventListener('scroll', updateNavState);

    document.querySelectorAll('.project').forEach((project, index) => {
      project.style.transitionDelay = `${index * 0.1}s`;
    });

    initTheme();
    updateNavState();
    initRevealAnimations();
    initScreenshotGallery();
  };

  document.addEventListener('DOMContentLoaded', init);
})();
