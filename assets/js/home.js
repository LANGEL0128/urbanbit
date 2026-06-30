/* =============================================
   URBANBIT — Home page cinematic scroll
   Requires: GSAP 3 + ScrollTrigger + Lenis
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ─── GSAP plugin registration ─────────────────
  gsap.registerPlugin(ScrollTrigger);

  // ─── Lenis smooth scroll ──────────────────────
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  // Disable CSS scroll-behavior: smooth to avoid conflict
  document.documentElement.classList.add('lenis-active');

  // Drive Lenis from GSAP's RAF
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Keep ScrollTrigger synced with Lenis scroll position
  lenis.on('scroll', ScrollTrigger.update);

  // ─── Anchor smooth scroll via Lenis ───────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -80, duration: 1.4 });
    });
  });

  // Hero scroll indicator
  const heroScrollBtn = document.getElementById('hero-scroll-btn');
  if (heroScrollBtn) {
    heroScrollBtn.addEventListener('click', () => {
      lenis.scrollTo('#servicios', { offset: -80, duration: 1.4 });
    });
  }

  // ─── Mobile detection ─────────────────────────
  const isMobile = window.matchMedia('(max-width: 767px)').matches;

  // ─── HERO: Parallax layers ────────────────────
  // Content drifts up and fades as you scroll away from hero
  gsap.to('.hero-content', {
    y: -120,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: '75% top',
      scrub: 1.2,
    },
  });

  // Background orbs move at different depths
  gsap.to('.hero-orb-1', {
    y: 260,
    x: -40,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 2,
    },
  });

  gsap.to('.hero-orb-2', {
    y: 190,
    x: 60,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.6,
    },
  });

  gsap.to('.hero-orb-3', {
    y: 130,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
  });

  // Grid moves slowest — deepest layer feel
  gsap.to('.hero-grid', {
    y: 90,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 0.7,
    },
  });

  // ─── SERVICIOS: Section reveal ────────────────
  gsap.from('#servicios .section-header', {
    y: 60,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '#servicios',
      start: 'top 88%',
      end: 'top 52%',
      scrub: 0.8,
    },
  });

  if (!isMobile) {
    gsap.from('.service-card', {
      y: 90,
      opacity: 0,
      stagger: 0.14,
      ease: 'none',
      scrollTrigger: {
        trigger: '.services-grid',
        start: 'top 88%',
        end: 'top 18%',
        scrub: 0.9,
      },
    });
  } else {
    gsap.utils.toArray('.service-card').forEach((card) => {
      gsap.from(card, {
        y: 50,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top 92%',
          end: 'top 62%',
          scrub: 0.6,
        },
      });
    });
  }

  // ─── STATS: Slide-up only (opacity kept visible so counter triggers cleanly)
  gsap.from('.stat-item', {
    y: 70,
    stagger: 0.12,
    ease: 'none',
    scrollTrigger: {
      trigger: '.stats-grid',
      start: 'top 88%',
      end: 'top 28%',
      scrub: 0.8,
    },
  });

  // ─── METODOLOGÍA: Progressive step lighting ───
  const methodSteps = gsap.utils.toArray('.method-step');

  if (!isMobile) {
    // Set steps dim initially, light them up sequentially with scroll
    gsap.set(methodSteps, { opacity: 0.12, y: 45 });

    const methodTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#metodologia',
        start: 'top 72%',
        end: 'bottom 28%',
        scrub: 1.1,
      },
    });

    methodSteps.forEach((step, i) => {
      methodTl.to(step, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.8 }, i * 0.5);
    });
  } else {
    gsap.from(methodSteps, {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      ease: 'none',
      scrollTrigger: {
        trigger: '#metodologia',
        start: 'top 88%',
        end: 'bottom 65%',
        scrub: 0.6,
      },
    });
  }

  gsap.from('#metodologia .section-header', {
    y: 50,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '#metodologia',
      start: 'top 88%',
      end: 'top 55%',
      scrub: 0.8,
    },
  });

  // ─── TECNOLOGÍAS: Cascade stagger ─────────────
  gsap.from('#tecnologias .section-header', {
    y: 50,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '#tecnologias',
      start: 'top 88%',
      end: 'top 58%',
      scrub: 0.8,
    },
  });

  gsap.from('.tech-item', {
    y: 35,
    opacity: 0,
    scale: 0.82,
    stagger: { each: 0.055, from: 'start' },
    ease: 'none',
    scrollTrigger: {
      trigger: '.tech-grid',
      start: 'top 88%',
      end: 'top 18%',
      scrub: 0.7,
    },
  });

  // ─── PORTFOLIO: Per-card parallax offset ──────
  gsap.from('#portfolio .section-header', {
    y: 50,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '#portfolio',
      start: 'top 88%',
      end: 'top 58%',
      scrub: 0.8,
    },
  });

  gsap.utils.toArray('.portfolio-card').forEach((card, i) => {
    gsap.from(card, {
      y: 75 + i * 18,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: card,
        start: 'top 92%',
        end: 'top 32%',
        scrub: 0.75,
      },
    });
  });

  gsap.from('#portfolio .btn-outline-primary', {
    y: 30,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '#portfolio .btn-outline-primary',
      start: 'top 92%',
      end: 'top 72%',
      scrub: 0.6,
    },
  });

  // ─── CTA BANNER ───────────────────────────────
  gsap.from('.cta-banner h2', {
    y: 50,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '.cta-banner',
      start: 'top 88%',
      end: 'top 48%',
      scrub: 0.8,
    },
  });

  gsap.from('.cta-banner p, .cta-banner .btn', {
    y: 35,
    opacity: 0,
    stagger: 0.18,
    ease: 'none',
    scrollTrigger: {
      trigger: '.cta-banner',
      start: 'top 82%',
      end: 'top 38%',
      scrub: 0.8,
    },
  });

  // ─── CONTACTO ─────────────────────────────────
  gsap.from('#contacto .section-header', {
    y: 50,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '#contacto',
      start: 'top 88%',
      end: 'top 58%',
      scrub: 0.8,
    },
  });

  gsap.from('.contact-info', {
    x: -70,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '.contact-grid',
      start: 'top 82%',
      end: 'top 28%',
      scrub: 0.9,
    },
  });

  gsap.from('.contact-form', {
    x: 70,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: '.contact-grid',
      start: 'top 82%',
      end: 'top 28%',
      scrub: 0.9,
    },
  });

});
