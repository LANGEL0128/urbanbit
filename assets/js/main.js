/* =============================================
   URBANBIT — Main JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* --- AOS Init --- */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
    });
  }

  /* --- Navbar scroll effect --- */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- Mobile menu --- */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  /* --- Active nav link on scroll --- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .nav-mobile a[href^="#"]');

  const highlightNav = () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) current = section.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

  /* --- Counter animation --- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length > 0) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const duration = 2200;
        const start = performance.now();

        const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

        const tick = (now) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const value = Math.floor(easeOutCubic(progress) * target);
          el.textContent = value.toLocaleString('es-UY');
          if (progress < 1) requestAnimationFrame(tick);
          else el.textContent = target.toLocaleString('es-UY');
        };

        requestAnimationFrame(tick);
        countObserver.unobserve(el);
      });
    }, { threshold: 0.5 });

    counters.forEach(c => countObserver.observe(c));
  }

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth',
      });
    });
  });

  /* --- Contact form --- */
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    const submitBtn = contactForm.querySelector('[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerHTML : '';

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
      }

      await new Promise(r => setTimeout(r, 1200));

      const successMsg = contactForm.querySelector('.form-success') || (() => {
        const el = document.createElement('div');
        el.className = 'form-success';
        el.style.cssText = 'margin-top:1rem;padding:1rem 1.25rem;background:rgba(0,174,239,0.12);border:1px solid rgba(0,174,239,0.3);border-radius:12px;color:#00AEEF;font-size:0.9rem;font-weight:500;display:flex;align-items:center;gap:0.6rem;';
        el.innerHTML = '<i class="fas fa-check-circle"></i> ¡Mensaje enviado! Te responderemos en menos de 24 horas.';
        contactForm.appendChild(el);
        return el;
      })();

      successMsg.style.display = 'flex';
      contactForm.reset();

      if (submitBtn) {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }

      setTimeout(() => { successMsg.style.display = 'none'; }, 6000);
    });
  }

  /* --- Scroll reveal for hero elements on load --- */
  const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-actions');
  heroElements.forEach((el, i) => {
    el.style.animationDelay = `${i * 0.1}s`;
  });

  /* --- Portfolio hover (touch support) --- */
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  portfolioCards.forEach(card => {
    card.addEventListener('touchstart', () => card.classList.add('touch-hover'), { passive: true });
    card.addEventListener('touchend', () => {
      setTimeout(() => card.classList.remove('touch-hover'), 600);
    }, { passive: true });
  });

});
