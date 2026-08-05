(function () {
  'use strict';

  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const nav = document.getElementById('nav');
  const sections = document.querySelectorAll('section[id]');
  const navItems = navLinks.querySelectorAll('a:not(.nav__cta)');

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
    document.querySelectorAll('.screenshot img').forEach((img) => {
      const showImage = () => img.classList.add('loaded');

      img.addEventListener('load', showImage);
      img.addEventListener('error', () => img.remove());

      if (img.complete && img.naturalHeight > 0) {
        showImage();
      }
    });

    document.querySelectorAll('.screenshot').forEach((shot) => {
      shot.addEventListener('click', () => {
        const img = shot.querySelector('img');
        if (!img) return;

        const overlay = document.createElement('div');
        overlay.style.cssText =
          'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.9);display:flex;align-items:center;justify-content:center;cursor:pointer;padding:24px;';
        const clone = img.cloneNode();
        clone.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:8px;';
        overlay.appendChild(clone);
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        overlay.addEventListener('click', () => {
          overlay.remove();
          document.body.style.overflow = '';
        });
      });
    });
  };

  const init = () => {
    navToggle.addEventListener('click', toggleMobileNav);
    navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMobileNav));
    window.addEventListener('scroll', updateNavState);

    document.querySelectorAll('.project').forEach((project, index) => {
      project.style.transitionDelay = `${index * 0.1}s`;
    });

    updateNavState();
    initRevealAnimations();
    initScreenshotGallery();
  };

  document.addEventListener('DOMContentLoaded', init);
})();
