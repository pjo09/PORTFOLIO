/**
 * ==========================================================================
 * PIYUSH JAISWAL — SPIDER-MAN INSPIRED PORTFOLIO CORE SCRIPTS
 * High-performance Vanilla JavaScript interactions, cinematic intro sequence,
 * custom spider reticle cursor, web ripple physics, and scroll experiences.
 * ==========================================================================
 */

(function () {
  'use strict';

  // Detection for reduced motion & touch devices
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Set dynamic copyright year in footer
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  /* --------------------------------------------------------------------------
     1. CINEMATIC SPIDER-MAN OPENING SEQUENCE (5-7 SECONDS)
     -------------------------------------------------------------------------- */
  const introScreen = document.getElementById('introScreen');
  const introCanvas = document.getElementById('introCanvas');
  const introBarFill = document.getElementById('introBarFill');
  const introBarGlow = document.getElementById('introBarGlow');
  const introCounter = document.getElementById('introCounter');
  const introBadgeText = document.getElementById('introBadgeText');
  const introStepName = document.getElementById('introStepName');
  const introSubText = document.getElementById('introSubText');
  const introClock = document.getElementById('introClock');
  const introSkipBtn = document.getElementById('introSkipBtn');

  let introCompleted = false;

  // Real-time HUD Telemetry Clock
  function updateTelemetryClock() {
    if (!introClock) return;
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    introClock.textContent = `RADAR // [${h}:${m}:${s}]`;
  }
  updateTelemetryClock();
  const clockInterval = setInterval(updateTelemetryClock, 1000);

  function finishIntro() {
    if (introCompleted || !introScreen) return;
    introCompleted = true;
    clearInterval(clockInterval);

    // Trigger expanding web mandala portal transition
    introScreen.classList.add('revealing');

    // Prepare Hero Visual for 3D perspective unfolding
    const heroVisual = document.getElementById('heroVisual');

    if (heroVisual) {
      heroVisual.style.opacity = '0';
      heroVisual.style.transform = 'perspective(1200px) rotateY(-8deg) rotateX(6deg) translateY(45px) scale(0.95)';
    }

    setTimeout(() => {
      introScreen.classList.add('completed');
      document.body.style.overflow = '';
      
      // Animate Hero Visual with smooth 3D entrance
      if (heroVisual) {
        heroVisual.style.transition = 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s ease-out';
        heroVisual.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg) translateY(0) scale(1)';
        heroVisual.style.opacity = '1';
      }

      // Stagger entrance of hero text elements
      const heroReveals = document.querySelectorAll('#home .reveal');
      heroReveals.forEach((el, idx) => {
        setTimeout(() => el.classList.add('revealed'), 100 + idx * 100);
      });
    }, 950);
  }

  if (introScreen) {
    if (prefersReducedMotion) {
      introScreen.style.display = 'none';
      document.body.style.overflow = '';
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('revealed'));
    } else {
      document.body.style.overflow = 'hidden';

      // Canvas for Atmospheric Red Embers & Dust
      if (introCanvas) {
        const ctx = introCanvas.getContext('2d');
        let width = (introCanvas.width = window.innerWidth);
        let height = (introCanvas.height = window.innerHeight);

        window.addEventListener('resize', () => {
          if (!introCompleted) {
            width = introCanvas.width = window.innerWidth;
            height = introCanvas.height = window.innerHeight;
          }
        });

        const particleCount = Math.min(width > 768 ? 60 : 30, 70);
        const particles = [];

        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.6 + 0.6,
            vx: (Math.random() - 0.5) * 0.4,
            vy: -Math.random() * 0.5 - 0.2, // Drift upward like red city embers
            alpha: Math.random() * 0.65 + 0.2
          });
        }

        function drawEmbers() {
          if (introCompleted) return;

          ctx.clearRect(0, 0, width, height);

          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.y < 0) {
              p.y = height;
              p.x = Math.random() * width;
            }
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(230, 36, 41, ${p.alpha})`;
            ctx.shadowBlur = 6;
            ctx.shadowColor = '#E62429';
            ctx.fill();
          }

          requestAnimationFrame(drawEmbers);
        }

        drawEmbers();
      }

      // Smooth Paced Telemetry Counter (~5.8s cinematic duration)
      const introDuration = 5800;
      const startTime = performance.now();

      function updateLoader(currentTime) {
        if (introCompleted) return;

        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / introDuration, 1);
        
        // Eased curve: steady start, smooth middle, majestic finish
        const easeProgress = progress < 0.5 
          ? 2 * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
          
        const percent = Math.floor(easeProgress * 100);

        if (introBarFill) {
          introBarFill.style.width = `${percent}%`;
        }
        if (introBarGlow) {
          introBarGlow.style.left = `${percent}%`;
        }
        if (introCounter) {
          introCounter.textContent = `${percent < 10 ? '0' + percent : percent}%`;
        }

        // Dynamic 4-Phase Telemetry Updates
        if (percent < 28) {
          if (introStepName) introStepName.textContent = 'PHASE 01 / 04';
          if (introBadgeText && introBadgeText.textContent !== 'SPIDER PROTOCOL INITIALIZING') {
            introBadgeText.textContent = 'SPIDER PROTOCOL INITIALIZING';
          }
          if (introSubText) introSubText.textContent = 'CALIBRATING WEB SYSTEMS...';
        } else if (percent >= 28 && percent < 60) {
          if (introStepName) introStepName.textContent = 'PHASE 02 / 04';
          if (introBadgeText && introBadgeText.textContent !== 'ANALYZING FULL-STACK MODULES') {
            introBadgeText.textContent = 'ANALYZING FULL-STACK MODULES';
          }
          if (introSubText) introSubText.textContent = 'CONNECTING NODE.JS & MONGODB CORE...';
        } else if (percent >= 60 && percent < 90) {
          if (introStepName) introStepName.textContent = 'PHASE 03 / 04';
          if (introBadgeText && introBadgeText.textContent !== 'ARMING CAMPORA HOUSING MISSION') {
            introBadgeText.textContent = 'ARMING CAMPORA HOUSING MISSION';
          }
          if (introSubText) introSubText.textContent = 'DEPLOYING VERIFIED PROPERTY SERVICES...';
        } else {
          if (introStepName) {
            introStepName.textContent = 'PHASE 04 / 04';
            introStepName.style.color = '#ff8589';
          }
          if (introBadgeText && introBadgeText.textContent !== 'SPIDER PROTOCOL ONLINE // ACCESS GRANTED') {
            introBadgeText.textContent = 'SPIDER PROTOCOL ONLINE // ACCESS GRANTED';
            introBadgeText.style.color = '#ff8589';
          }
          if (introSubText) {
            introSubText.textContent = 'ENTER MY DIGITAL WORLD...';
            introSubText.style.color = '#ff8589';
          }
        }

        if (progress < 1) {
          requestAnimationFrame(updateLoader);
        } else {
          setTimeout(finishIntro, 350);
        }
      }

      requestAnimationFrame(updateLoader);

      if (introSkipBtn) {
        introSkipBtn.addEventListener('click', finishIntro);
      }
    }
  }

  /* --------------------------------------------------------------------------
     2. CUSTOM CURSOR — RED RETICLE & WEB RIPPLE (DESKTOP ONLY)
     -------------------------------------------------------------------------- */
  const customCursor = document.getElementById('customCursor');
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  if (!isTouchDevice && customCursor && cursorDot && cursorRing) {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isMoving = false;
    let lastParticleTime = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMoving = true;

      cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

      // Spawn trailing red ember micro-particles
      const now = performance.now();
      if (now - lastParticleTime > 65) {
        lastParticleTime = now;
        spawnCursorEmber(mouseX, mouseY);
      }
    });

    function spawnCursorEmber(x, y) {
      const p = document.createElement('div');
      p.className = 'cursor-particle';
      p.style.left = `${x}px`;
      p.style.top = `${y}px`;
      document.body.appendChild(p);

      setTimeout(() => {
        p.remove();
      }, 450);
    }

    // Web Click Ripple on Mousedown
    window.addEventListener('mousedown', (e) => {
      document.body.classList.add('cursor-active');
      createWebRipple(e.clientX, e.clientY);
    });

    window.addEventListener('mouseup', () => {
      document.body.classList.remove('cursor-active');
    });

    function createWebRipple(x, y) {
      const ripple = document.createElement('div');
      ripple.className = 'cursor-web-ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      document.body.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 500);
    }

    // Smooth lerp loop for the outer reticle ring
    function renderCursor() {
      if (isMoving) {
        ringX += (mouseX - ringX) * 0.16;
        ringY += (mouseY - ringY) * 0.16;
        cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Interactive Hover States
    const interactiveElements = document.querySelectorAll(
      'a, button, .btn, .nav-link, .skill-tag-item, .contact-pill-spider'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });

    // Special Target State for Campora Preview
    const previewEl = document.querySelector('.browser-viewport');
    if (previewEl) {
      previewEl.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-view');
      });
      previewEl.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-view');
      });
    }
  }

  /* --------------------------------------------------------------------------
     3. MAGNETIC ATTRACTION ON BUTTONS
     -------------------------------------------------------------------------- */
  if (!isTouchDevice) {
    const magneticElements = document.querySelectorAll('.magnetic');

    magneticElements.forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * 0.28;
        const deltaY = (e.clientY - centerY) * 0.28;

        el.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate3d(0, 0, 0)';
        el.style.transition = 'transform 0.4s var(--ease-out-expo)';
      });

      el.addEventListener('mouseenter', () => {
        el.style.transition = 'none';
      });
    });
  }

  /* --------------------------------------------------------------------------
     4. SPOTLIGHT CARDS (MOUSE RED ILLUMINATION EFFECT)
     -------------------------------------------------------------------------- */
  const spotlightCards = document.querySelectorAll('.spotlight-card');

  spotlightCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  /* --------------------------------------------------------------------------
     5. 3D HERO VISUAL TILT EFFECT
     -------------------------------------------------------------------------- */
  const heroVisual = document.getElementById('heroVisual');
  const photoFrame = document.getElementById('photoFrame');

  if (!isTouchDevice && heroVisual && photoFrame) {
    heroVisual.addEventListener('mousemove', (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotY = (x / (rect.width / 2)) * 8;
      const rotX = -(y / (rect.height / 2)) * 8;

      photoFrame.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    heroVisual.addEventListener('mouseleave', () => {
      photoFrame.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      photoFrame.style.transition = 'transform 0.6s var(--ease-out-expo)';
    });

    heroVisual.addEventListener('mouseenter', () => {
      photoFrame.style.transition = 'none';
    });
  }

  /* --------------------------------------------------------------------------
     6. NAVBAR SCROLL EFFECT & MOBILE DRAWER
     -------------------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  // Navbar glass background & thin red border on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile drawer toggle
  function toggleMobileMenu(open) {
    const isOpen = open !== undefined ? open : !mobileDrawer.classList.contains('open');
    mobileDrawer.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => toggleMobileMenu());

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => toggleMobileMenu(false));
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        toggleMobileMenu(false);
      }
    });
  }

  /* --------------------------------------------------------------------------
     7. SCROLL REVEAL OBSERVER
     -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });

  /* --------------------------------------------------------------------------
     8. SCROLLSPY (ACTIVE NAVIGATION LINK)
     -------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');

  const scrollSpyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === `#${currentId}`);
          });
        }
      });
    },
    {
      rootMargin: '-30% 0px -50% 0px'
    }
  );

  sections.forEach((section) => {
    scrollSpyObserver.observe(section);
  });

  /* --------------------------------------------------------------------------
     9. BACK TO TOP BUTTON
     -------------------------------------------------------------------------- */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

})();