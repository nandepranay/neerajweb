// app.js - Next-Gen Industrial Stamping & Progressive Tooling Engine

document.addEventListener('DOMContentLoaded', () => {

  // --- INITIALIZE GSAP ---
  gsap.registerPlugin(ScrollTrigger);

  // --- SCI-FI INDUSTRIAL LOADER ANIMATION ---
  const loader = document.getElementById('loader');
  const loaderPct = document.getElementById('loader-pct');
  const loaderStatusText = document.getElementById('loader-status-text');

  const statusMessages = [
    'CALIBRATING CNC MICROMETERS...',
    'INITIALIZING HYDRAULIC PRESSURE CHANNELS...',
    'STABILIZING PNEUMATIC MANIFOLD MATRIX...',
    'CONNECTING ISO 9001 QUALITY AUDITORS...',
    'PARSING METALLURGY TEMPERATURE INDEX...',
    'PROGRESSIVE PROGRESSION COMPLETED SUCCESSFULLY.'
  ];

  let currentPercent = 0;
  function updateLoader() {
    currentPercent += Math.floor(Math.random() * 4) + 1;
    if (currentPercent > 100) currentPercent = 100;

    if (loaderPct) loaderPct.textContent = `${currentPercent}%`;

    // Rotate status messages high-tech style
    const msgIndex = Math.floor((currentPercent / 100) * statusMessages.length);
    if (loaderStatusText && statusMessages[msgIndex]) {
      loaderStatusText.textContent = statusMessages[msgIndex];
    }

    if (currentPercent < 100) {
      setTimeout(updateLoader, 40);
    } else {
      // Clean high-performance fadeout
      gsap.to(loader, {
        opacity: 0,
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: () => {
          if (loader) loader.style.visibility = 'hidden';
          // Trigger animations on Hero once unlocked
          animateHero();
        }
      });
    }
  }

  // Start loading sequence
  updateLoader();

  // --- HERO ENTRANCE TIMELINE ---
  function animateHero() {
    gsap.timeline()
      .from('.hero-title', { y: 60, opacity: 0, duration: 1.2, ease: 'power4.out' })
      .from('.hero-subtitle', { y: 30, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.8')
      .from('.section-badge', { scale: 0.8, opacity: 0, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.8')
      .from('.scroll-indicator-container', { y: 20, opacity: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5');
  }

  // --- INTERACTIVE MAGNETIC CURSOR ---
  const cursor = document.getElementById('cursor');
  const cursorFollower = document.getElementById('cursor-follower');
  let mouse = { x: 0, y: 0 };
  let cursorLoc = { x: 0, y: 0 };
  let followerLoc = { x: 0, y: 0 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function updateCursor() {
    cursorLoc.x += (mouse.x - cursorLoc.x) * 0.25;
    cursorLoc.y += (mouse.y - cursorLoc.y) * 0.25;

    followerLoc.x += (mouse.x - followerLoc.x) * 0.12;
    followerLoc.y += (mouse.y - followerLoc.y) * 0.12;

    if (cursor) {
      cursor.style.left = `${cursorLoc.x}px`;
      cursor.style.top = `${cursorLoc.y}px`;
    }
    if (cursorFollower) {
      cursorFollower.style.left = `${followerLoc.x}px`;
      cursorFollower.style.top = `${followerLoc.y}px`;
    }
    requestAnimationFrame(updateCursor);
  }
  updateCursor();

  // Morph cursor on interactive tags hover
  function setupCursorHover(elements) {
    elements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('hovering-interactive');
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('hovering-interactive');
      });
    });
  }
  setupCursorHover(document.querySelectorAll('.interactive-el, a, button'));

  // --- ELECTRIC CYAN & VIOLET CANVAS SPARKS PHYSICS ---
  const canvas = document.getElementById('sparks-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const maxParticles = 50;
    let scrollSpeedMultiplier = 1;
    let lastScrollTop = window.scrollY;

    class SparkParticle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 100;
        this.size = Math.random() * 2 + 1;
        this.speedY = -(Math.random() * 2 + 0.8);
        this.speedX = (Math.random() - 0.5) * 1.2;
        this.life = 1;
        this.decay = Math.random() * 0.007 + 0.002;
        // Alternating neon cyan & vibrant purple sparks
        this.color = Math.random() > 0.5 ? '#00D6FF' : '#B026FF';
        this.glow = Math.random() > 0.4;
      }

      update() {
        this.y += this.speedY * scrollSpeedMultiplier;
        this.x += this.speedX;
        this.life -= this.decay;

        // Repel from magnetic cursor coordinates
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          const force = (130 - dist) / 130;
          this.x += (dx / dist) * force * 4;
          this.y += (dy / dist) * force * 4;
        }

        if (this.life <= 0 || this.y < 0) {
          this.reset();
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * this.life, 0, Math.PI * 2);
        ctx.fill();

        if (this.glow) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = this.color;
        } else {
          ctx.shadowBlur = 0;
        }
      }
    }

    for (let i = 0; i < maxParticles; i++) {
      particles.push(new SparkParticle());
    }

    window.addEventListener('scroll', () => {
      const st = window.scrollY;
      const diff = Math.abs(st - lastScrollTop);
      scrollSpeedMultiplier = Math.min(1 + diff * 0.12, 5);
      lastScrollTop = st;
    });

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);
      scrollSpeedMultiplier += (1 - scrollSpeedMultiplier) * 0.05;

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      ctx.shadowBlur = 0;
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // --- DYNAMIC HUD CONTROLLER ---
  const hudTempVal = document.getElementById('hud-temp-val');
  const hudForceVal = document.getElementById('hud-force-val');
  const hudStressVal = document.getElementById('hud-stress-val');
  const osciPath = document.getElementById('hud-oscilloscope-path');

  let currentMetrics = { temp: 1280, force: 800, stress: 99.98 };

  // Generate math oscilloscope waveforms dynamically
  let osciTime = 0;
  function updateOscilloscope() {
    osciTime += 0.18;
    let d = `M 0,10 `;
    for (let i = 0; i <= 130; i += 10) {
      const scrollFactor = window.scrollY * 0.003;
      const waveAmplitude = 5 + Math.sin(osciTime + i * 0.12) * (2.5 + scrollFactor);
      d += `Q ${i + 5},${10 + waveAmplitude} ${i + 10},10 `;
    }
    if (osciPath) osciPath.setAttribute('d', d);

    // Stabilize numeric jitter values in panels
    if (hudStressVal) {
      const stressJitter = currentMetrics.stress + (Math.random() - 0.5) * 0.05;
      hudStressVal.innerHTML = `${stressJitter.toFixed(2)}<span>%</span>`;
    }

    requestAnimationFrame(updateOscilloscope);
  }
  updateOscilloscope();

  // Scroll Trigger dashboard value modulators
  ScrollTrigger.create({
    trigger: '#products',
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: (self) => {
      const progress = self.progress;
      let targetTemp = 1280 - progress * 1100; // cooling down
      let targetForce = progress > 0.5 ? 200 : 800; // changing pressure

      gsap.to(currentMetrics, {
        temp: targetTemp,
        force: targetForce,
        duration: 0.5,
        onUpdate: () => {
          if (hudTempVal) hudTempVal.innerHTML = `${Math.round(currentMetrics.temp)}<span>°C</span>`;
          if (hudForceVal) hudForceVal.innerHTML = `${Math.round(currentMetrics.force)}<span>TON</span>`;
        }
      });
    }
  });

  // --- STATS NUMERIC TICKER COUNTERS ---
  const statsTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: '#profile',
      start: 'top 70%',
      toggleActions: 'play none none reverse'
    }
  });

  const countTargets = [
    { id: 'stat-emp', val: 50, suff: '+' },
    { id: 'stat-mach', val: 40, suff: '+' },
    { id: 'stat-press', val: 800, suff: 'T' },
    { id: 'stat-ops', val: 24, suff: 'x7' }
  ];

  countTargets.forEach(target => {
    const el = document.getElementById(target.id);
    if (el) {
      const progressObj = { value: 0 };
      statsTimeline.to(progressObj, {
        value: target.val,
        duration: 1.5,
        ease: 'power3.out',
        onUpdate: () => {
          el.textContent = `${Math.floor(progressObj.value)}${target.suff}`;
        }
      }, 0);
    }
  });

  // --- STAGGER SECTIONS ENTRANCE ---
  gsap.from('.capability-card', {
    scrollTrigger: {
      trigger: '#capabilities',
      start: 'top 75%'
    },
    y: 50,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8,
    ease: 'power3.out'
  });

  gsap.from('.product-card', {
    scrollTrigger: {
      trigger: '#products',
      start: 'top 75%'
    },
    y: 60,
    opacity: 0,
    stagger: 0.15,
    duration: 1,
    ease: 'power4.out'
  });

  gsap.from('.industry-card', {
    scrollTrigger: {
      trigger: '#industries',
      start: 'top 75%'
    },
    y: 40,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8,
    ease: 'power3.out'
  });

  gsap.from('.why-card', {
    scrollTrigger: {
      trigger: '#why-us',
      start: 'top 75%'
    },
    x: -30,
    opacity: 0,
    stagger: 0.1,
    duration: 0.8,
    ease: 'power2.out'
  });

  // --- INTERACTIVE WORKFLOW PROGRESSION REVEAL ---
  gsap.from('.workflow-step-card', {
    scrollTrigger: {
      trigger: '#workflow',
      start: 'top 80%'
    },
    scale: 0.9,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: 'back.out(1.5)'
  });

  // --- GLASS CARD 3D MOUSE-TILT EFFECT ---
  function apply3DTilt(cardsList) {
    cardsList.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xc = rect.width / 2;
        const yc = rect.height / 2;

        const angleX = (yc - y) / 14;
        const angleY = (x - xc) / 14;

        card.style.transform = `perspective(800px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
      });

      card.style.transition = 'transform 0.1s ease';

      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.5s ease';
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
      });
    });
  }
  apply3DTilt(document.querySelectorAll('.stat-card, .capability-card, .product-card, .industry-card, .why-card'));

  // --- CINEMATIC PRODUCT DETAILS MODAL ---
  const modal = document.getElementById('product-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalImage = document.getElementById('modal-hero-image');
  const modalTitle = document.getElementById('modal-title');
  const modalCat = document.getElementById('modal-category');
  const modalDesc = document.getElementById('modal-description');
  const modalFeaturesList = document.getElementById('modal-features-list');
  const modalRateProto = document.getElementById('modal-rate-proto');
  const modalRateMass = document.getElementById('modal-rate-mass');
  const modalApps = document.getElementById('modal-apps');

  const openDetailsButtons = document.querySelectorAll('.product-details-btn');
  openDetailsButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Retrieve dataset attributes
      const title = btn.getAttribute('data-modal-title');

      // Intercept click on 4mm Thickness Component PGT to trigger Cinematic PGT Scrollytelling
      if (title === '4mm Thickness Component PGT') {
        if (window.openPgtScrollytelling) {
          window.openPgtScrollytelling();
        }
        return;
      }

      // Intercept click on Progressive Tool Strip Layouts to trigger Cinematic Scrollytelling
      if (title === 'Progressive Tool Strip Layouts') {
        if (window.openCinematicScrollytelling) {
          window.openCinematicScrollytelling();
        }
        return;
      }

      // Intercept click on PGT III to trigger Cinematic PGT III Scrollytelling
      if (title === 'PGT III') {
        if (window.openPgt3Scrollytelling) {
          window.openPgt3Scrollytelling();
        }
        return;
      }

      const cat = btn.getAttribute('data-modal-cat');
      const desc = btn.getAttribute('data-modal-desc');
      const featuresStr = btn.getAttribute('data-modal-features');
      const rateProto = btn.getAttribute('data-modal-rate-proto');
      const rateMass = btn.getAttribute('data-modal-rate-mass');
      const apps = btn.getAttribute('data-modal-apps');
      const img = btn.getAttribute('data-modal-img');

      // Map values to DOM Elements
      if (modalTitle) modalTitle.textContent = title;
      if (modalCat) modalCat.textContent = cat;
      if (modalDesc) modalDesc.textContent = desc;
      if (modalRateProto) modalRateProto.textContent = rateProto;
      if (modalRateMass) modalRateMass.textContent = rateMass;
      if (modalApps) modalApps.textContent = apps;

      // Clean and inject image URL
      if (modalImage) {
        modalImage.src = img;
        modalImage.alt = title;
      }

      // Conditional setup for 3D Spin sequence for PGT Product A
      const heroCanvas = document.getElementById('modal-hero-canvas');
      if (title === '4mm Thickness Component PGT') {
        if (heroCanvas) heroCanvas.style.display = 'block';
        if (modalImage) modalImage.style.display = 'none';
        // Initialize active frame and trigger slow rotation autoplay
        if (window.startPgtAutoplay) {
          window.startPgtAutoplay();
        }
      } else {
        if (heroCanvas) heroCanvas.style.display = 'none';
        if (modalImage) modalImage.style.display = 'block';
        if (window.stopPgtAutoplay) {
          window.stopPgtAutoplay();
        }
      }

      // Populate split feature strings cleanly
      if (modalFeaturesList && featuresStr) {
        modalFeaturesList.innerHTML = '';
        const features = featuresStr.split(';');
        features.forEach(feat => {
          const li = document.createElement('li');
          li.className = 'modal-spec-item';
          li.textContent = feat.trim();
          modalFeaturesList.appendChild(li);
        });
      }

      // Open Modal Overlay Cinematically
      if (modal) {
        modal.classList.add('active');
        // Morph cursor hover settings inside modal
        setupCursorHover(modal.querySelectorAll('.interactive-el, button'));

        // Modal sub-elements slide entrance
        gsap.timeline()
          .fromTo('.modal-content-scroller', { y: 50, scale: 0.95 }, { y: 0, scale: 1, duration: 0.5, ease: 'power3.out' })
          .fromTo('.modal-details-grid', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2');
      }
    });
  });

  // Close modal logic
  function closeModalWindow() {
    if (window.stopPgtAutoplay) {
      window.stopPgtAutoplay();
    }
    if (modal) {
      gsap.to('.modal-content-scroller', {
        y: 30,
        scale: 0.98,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          modal.classList.remove('active');
          // Reset inline styling values for next opens
          gsap.set('.modal-content-scroller', { clearProps: 'all' });
          gsap.set('.modal-details-grid', { clearProps: 'all' });
        }
      });
    }
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModalWindow);
  }

  // Close on backdrop overlay click
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModalWindow();
      }
    });
  }

  // Close on ESC keypress
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModalWindow();
    }
    if (e.key === 'Escape' && window.isPgtActive) {
      window.closePgtScrollytelling();
    }
  });

  // ==========================================
  // --- CINEMATIC SCROLLYTELLING VIEWPORT ---
  // ==========================================
  const scrollyModal = document.getElementById('cinematic-scrolly-modal');
  const scrollyCloseBtn = document.getElementById('cinematic-close-btn');
  let scrollytellingTL = null;
  let isScrollytellingActive = false;
  let scrollySparksLoopId = null;

  // Sparks Canvas inside Scrollytelling Modal
  const scrollyCanvas = document.getElementById('scrolly-sparks-canvas');
  let scrollyCtx = null;
  let scrollySparks = [];
  let scrollyWidth = 0;
  let scrollyHeight = 0;
  let currentScrollProgress = 0; // tracked to change spark colors

  if (scrollyCanvas) {
    scrollyCtx = scrollyCanvas.getContext('2d');

    // Resize handler
    const resizeScrollyCanvas = () => {
      if (scrollyCanvas) {
        scrollyWidth = scrollyCanvas.width = scrollyCanvas.parentElement.clientWidth;
        scrollyHeight = scrollyCanvas.height = scrollyCanvas.parentElement.clientHeight;
      }
    };

    window.addEventListener('resize', () => {
      if (isScrollytellingActive) resizeScrollyCanvas();
    });

    class ScrollySpark {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * scrollyWidth;
        this.y = scrollyHeight + Math.random() * 50;
        this.size = Math.random() * 2 + 1;
        this.speedY = -(Math.random() * 1.5 + 0.5);
        this.speedX = (Math.random() - 0.5) * 1.0;
        this.life = 1;
        this.decay = Math.random() * 0.008 + 0.002;
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.life -= this.decay;
        if (this.life <= 0 || this.y < 0) {
          this.reset();
        }
      }
      draw() {
        if (!scrollyCtx) return;
        // Determine spark color based on scroll progress
        let color = '#FF6A00'; // Molten Orange default
        if (currentScrollProgress >= 0.4 && currentScrollProgress < 0.8) {
          color = '#00D6FF'; // Electric Cyan for machinery & materials
        } else if (currentScrollProgress >= 0.8) {
          color = Math.random() > 0.5 ? '#00D6FF' : '#B026FF'; // Blue & Purple for global and final
        }

        scrollyCtx.fillStyle = color;
        scrollyCtx.shadowBlur = Math.random() > 0.5 ? 6 : 0;
        scrollyCtx.shadowColor = color;
        scrollyCtx.beginPath();
        scrollyCtx.arc(this.x, this.y, this.size * this.life, 0, Math.PI * 2);
        scrollyCtx.fill();
      }
    }

    const initScrollySparks = () => {
      resizeScrollyCanvas();
      scrollySparks = [];
      const sparkCount = 45;
      for (let i = 0; i < sparkCount; i++) {
        scrollySparks.push(new ScrollySpark());
      }
    };

    const animateScrollySparks = () => {
      if (!isScrollytellingActive || !scrollyCtx) return;
      scrollyCtx.clearRect(0, 0, scrollyWidth, scrollyHeight);

      scrollySparks.forEach(p => {
        p.update();
        p.draw();
      });
      scrollyCtx.shadowBlur = 0;
      scrollySparksLoopId = requestAnimationFrame(animateScrollySparks);
    };

    // Orbiting spheres calculation
    const spheres = document.querySelectorAll('.material-sphere');
    const arrangeSpheres = (progress = 0) => {
      const R = window.innerWidth > 1024 ? 120 : 70; // responsive orbit radius
      const center = { x: 0, y: 0 };
      const speedFactor = progress * Math.PI * 2; // scroll rotates the orbit

      spheres.forEach((sphere, i) => {
        const angle = (i / spheres.length) * 2 * Math.PI + speedFactor;
        const x = center.x + R * Math.cos(angle);
        const y = center.y + R * Math.sin(angle);
        // Add pseudo 3D scaling and depth index
        const scale = 0.8 + 0.3 * Math.sin(angle);
        const zIndex = Math.round(10 + 5 * Math.sin(angle));

        gsap.set(sphere, {
          x: x,
          y: y,
          scale: scale,
          zIndex: zIndex,
          opacity: 0.4 + 0.6 * (scale - 0.5) // fade items in back
        });
      });
    };

    // Open Cinematic Scrollytelling Modal
    window.openCinematicScrollytelling = () => {
      isScrollytellingActive = true;
      document.body.style.overflow = 'hidden'; // lock body

      if (scrollyModal) {
        scrollyModal.classList.add('active');
        scrollyModal.scrollTop = 0;
        gsap.set(scrollyModal, { opacity: 0 });
        gsap.to(scrollyModal, { opacity: 1, duration: 0.6, ease: 'power2.out' });
      }

      // Initialize sparks
      initScrollySparks();
      animateScrollySparks();

      // Configure cursor hovering for scrolly modal interactive elements
      setupCursorHover(scrollyModal.querySelectorAll('.interactive-el, button, a'));

      // Clean up previous GSAP scrolltrigger if exists
      if (scrollytellingTL) {
        scrollytellingTL.scrollTrigger.kill();
        scrollytellingTL.kill();
      }

      // Arrange spheres initially
      arrangeSpheres(0);

      // Reset SVG layers
      gsap.set('#strip-base, #strip-lava-layer', { opacity: 1, clearProps: 'all' });
      gsap.set('#strip-lava-layer', { attr: { fill: 'url(#lava-glow)' } });
      gsap.set('.stage-plate', { stroke: '#FF6A00', clearProps: 'all' });
      gsap.set('.strip-stage', { x: 0, opacity: 1, clearProps: 'all' });
      gsap.set('#svg-strip-layout', { opacity: 1, scale: 0.85, transformOrigin: 'center center' });

      const machineryStageEl = document.getElementById('machinery-stage');
      const materialsStageEl = document.getElementById('materials-stage');
      const globalStageEl = document.getElementById('global-stage');

      if (machineryStageEl) {
        machineryStageEl.classList.remove('active');
        gsap.set(machineryStageEl, { opacity: 0, scale: 0.95, y: 30 });
      }
      if (materialsStageEl) {
        materialsStageEl.classList.remove('active');
        gsap.set(materialsStageEl, { opacity: 0, scale: 0.95 });
      }
      if (globalStageEl) {
        globalStageEl.classList.remove('active');
        gsap.set(globalStageEl, { opacity: 0, y: 20 });
      }

      // Initialize SVG paths for map arcs
      const arcDubai = document.getElementById('arc-dubai');
      const arcEurope = document.getElementById('arc-europe');
      if (arcDubai && arcEurope) {
        gsap.set([arcDubai, arcEurope], { strokeDasharray: 400, strokeDashoffset: 400 });
      }

      // Reset story slides active classes
      document.querySelectorAll('.story-slide').forEach((slide, index) => {
        if (index === 0) slide.classList.add('active');
        else slide.classList.remove('active');
      });

      // Construct GSAP ScrollTrigger timeline inside the modal scroller!
      scrollytellingTL = gsap.timeline({
        scrollTrigger: {
          trigger: '.cinematic-scroll-track',
          scroller: '#cinematic-scrolly-modal',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
          onUpdate: (self) => {
            currentScrollProgress = self.progress;

            // Update HUD percent indicator
            const pct = Math.round(self.progress * 100);
            const pctVal = document.getElementById('scrolly-pct-val');
            if (pctVal) pctVal.textContent = `${pct.toString().padStart(2, '0')}%`;

            // Update HUD telemetry text logs
            const hudLogs = document.getElementById('scrolly-hud-logs');
            if (hudLogs) {
              if (pct < 15) {
                hudLogs.textContent = 'SYSTEM ACTIVE // STAGING BASE PLATE';
              } else if (pct < 40) {
                hudLogs.textContent = 'DECONSTRUCTING STRIP LAYOUT // STAGES 01-06';
              } else if (pct < 60) {
                hudLogs.textContent = 'MONITORING MACHINERY INFRASTRUCTURE // PRESSURE ACTIVE';
              } else if (pct < 80) {
                hudLogs.textContent = 'VALIDATING METALLURGICAL TOLERANCES // ISO 9001 ACTIVE';
              } else if (pct < 90) {
                hudLogs.textContent = 'CONNECTING GLOBAL OEM NETWORKS // DISPATCH TERMINAL';
              } else {
                hudLogs.textContent = 'REASSEMBLY SUCCESSFUL // TOOL BLOCK OPERATIONAL';
              }
            }

            // Dynamically rotate spheres during scroll on Slide 4
            if (pct >= 55 && pct <= 85) {
              const sphereProgress = (pct - 55) / 30; // 0 to 1
              arrangeSpheres(sphereProgress);
            }
          }
        }
      });

      // ----------------------------------------------------
      // PHASE 1: COMMENCEMENT (0% - 15%)
      // ----------------------------------------------------
      scrollytellingTL.to('#svg-strip-layout', {
        scale: 1.0,
        duration: 2,
        ease: 'none'
      }, 0);

      // ----------------------------------------------------
      // PHASE 2: STRIP DECONSTRUCTION (15% - 40%)
      // ----------------------------------------------------
      scrollytellingTL.to('#slide-1', { opacity: 0, y: -40, duration: 1 }, 1.5)
        .call(() => {
          const s1 = document.getElementById('slide-1');
          const s2 = document.getElementById('slide-2');
          if (s1 && s2) {
            s1.classList.remove('active');
            s2.classList.add('active');
          }
        }, null, 2.5)
        .fromTo('#slide-2', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, 2.5);

      // Separate metal base plates out of sight
      scrollytellingTL.to('#strip-base, #strip-lava-layer', {
        opacity: 0,
        duration: 1.5,
        ease: 'power1.inOut'
      }, 2.0);

      // Explode the 6 stages outwards along X-axis
      scrollytellingTL.to('#svg-stage-1', { x: -80, duration: 2, ease: 'power2.out' }, 2.0)
        .to('#svg-stage-2', { x: -45, duration: 2, ease: 'power2.out' }, 2.0)
        .to('#svg-stage-3', { x: -15, duration: 2, ease: 'power2.out' }, 2.0)
        .to('#svg-stage-4', { x: 15, duration: 2, ease: 'power2.out' }, 2.0)
        .to('#svg-stage-5', { x: 45, duration: 2, ease: 'power2.out' }, 2.0)
        .to('#svg-stage-6', { x: 80, duration: 2, ease: 'power2.out' }, 2.0);

      // Stagger lighting up sequential molten orange borders on stage plates
      scrollytellingTL.to('#svg-stage-1 .stage-plate', { stroke: '#FF6A00', strokeWidth: 2, fill: 'rgba(255,106,0,0.08)', duration: 0.5 }, 2.2)
        .to('#svg-stage-2 .stage-plate', { stroke: '#FF6A00', strokeWidth: 2, fill: 'rgba(255,106,0,0.08)', duration: 0.5 }, 2.4)
        .to('#svg-stage-3 .stage-plate', { stroke: '#FF6A00', strokeWidth: 2, fill: 'rgba(255,106,0,0.08)', duration: 0.5 }, 2.6)
        .to('#svg-stage-4 .stage-plate', { stroke: '#FF6A00', strokeWidth: 2, fill: 'rgba(255,106,0,0.08)', duration: 0.5 }, 2.8)
        .to('#svg-stage-5 .stage-plate', { stroke: '#FF6A00', strokeWidth: 2, fill: 'rgba(255,106,0,0.08)', duration: 0.5 }, 3.0)
        .to('#svg-stage-6 .stage-plate', { stroke: '#FF6A00', strokeWidth: 2, fill: 'rgba(255,106,0,0.08)', duration: 0.5 }, 3.2);

      // ----------------------------------------------------
      // PHASE 3: MACHINERY SHOWCASE (40% - 60%)
      // ----------------------------------------------------
      scrollytellingTL.to('#slide-2', { opacity: 0, y: -40, duration: 1 }, 4.5)
        .call(() => {
          const s2 = document.getElementById('slide-2');
          const s3 = document.getElementById('slide-3');
          if (s2 && s3) {
            s2.classList.remove('active');
            s3.classList.add('active');
          }
        }, null, 5.5)
        .fromTo('#slide-3', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, 5.5);

      // Fade out deconstructed SVG Strip Layout
      scrollytellingTL.to('#svg-strip-layout', {
        opacity: 0,
        scale: 0.9,
        duration: 1.5,
        ease: 'power2.in'
      }, 4.5);

      // Fade in Machinery showcase stage & trigger active panel bars
      scrollytellingTL.to('.machinery-stage', {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: 'power2.out',
        onStart: () => {
          const ms = document.getElementById('machinery-stage');
          if (ms) ms.classList.add('active');
        }
      }, 5.0);

      // Animate machinery performance indicators (HUD bars)
      scrollytellingTL.fromTo('#machine-press .machine-hud-bar span', { width: '0%' }, { width: '85%', duration: 2, ease: 'power1.inOut' }, 5.2)
        .fromTo('#machine-vmc .machine-hud-bar span', { width: '0%' }, { width: '92%', duration: 2, ease: 'power1.inOut' }, 5.4)
        .fromTo('#machine-edm .machine-hud-bar span', { width: '0%' }, { width: '76%', duration: 2, ease: 'power1.inOut' }, 5.6);

      // Modulate background lighting blobs (transition to cyan/blue highlights)
      scrollytellingTL.to('#cinematic-glow-blob-orange', { opacity: 0.04, duration: 2 }, 4.5)
        .to('#cinematic-glow-blob-blue', { opacity: 0.22, duration: 2 }, 4.5);

      // ----------------------------------------------------
      // PHASE 4: QUALITY & MATERIALS (60% - 80%)
      // ----------------------------------------------------
      scrollytellingTL.to('#slide-3', { opacity: 0, y: -40, duration: 1 }, 7.0)
        .call(() => {
          const s3 = document.getElementById('slide-3');
          const s4 = document.getElementById('slide-4');
          if (s3 && s4) {
            s3.classList.remove('active');
            s4.classList.add('active');
          }
        }, null, 8.0)
        .fromTo('#slide-4', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, 8.0);

      // Fade out Machinery stage
      scrollytellingTL.to('.machinery-stage', {
        opacity: 0,
        scale: 1.05,
        duration: 1.2,
        ease: 'power2.in',
        onComplete: () => {
          const ms = document.getElementById('machinery-stage');
          if (ms) ms.classList.remove('active');
        }
      }, 7.0);

      // Fade in Materials Orbit stage
      scrollytellingTL.to('.materials-stage', {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'power2.out',
        onStart: () => {
          const mats = document.getElementById('materials-stage');
          if (mats) mats.classList.add('active');
        }
      }, 7.5);

      // Stagger entrance of material orbital spheres
      scrollytellingTL.from('.material-sphere', {
        scale: 0,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: 'back.out(1.7)'
      }, 7.7);

      // Caliper high-tech validation gauge slider line
      scrollytellingTL.fromTo('.caliper-bar', { scaleX: 0 }, { scaleX: 1, duration: 2, ease: 'power2.inOut' }, 8.0);

      // ----------------------------------------------------
      // PHASE 5: GLOBAL CONNECTIONS (80% - 90%)
      // ----------------------------------------------------
      scrollytellingTL.to('#slide-4', { opacity: 0, y: -40, duration: 1 }, 9.5)
        .call(() => {
          const s4 = document.getElementById('slide-4');
          const s5 = document.getElementById('slide-5');
          if (s4 && s5) {
            s4.classList.remove('active');
            s5.classList.add('active');
          }
        }, null, 10.5)
        .fromTo('#slide-5', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, 10.5);

      // Fade out Materials stage
      scrollytellingTL.to('.materials-stage', {
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        ease: 'power2.in',
        onComplete: () => {
          const mats = document.getElementById('materials-stage');
          if (mats) mats.classList.remove('active');
        }
      }, 9.5);

      // Fade in Global Map stage
      scrollytellingTL.to('.global-stage', {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power2.out',
        onStart: () => {
          const gs = document.getElementById('global-stage');
          if (gs) gs.classList.add('active');
        }
      }, 10.0);

      // Draw SVG world transport lines (from MIDC Nashik to Dubai and Europe)
      scrollytellingTL.to([arcDubai, arcEurope], {
        strokeDashoffset: 0,
        duration: 2.2,
        ease: 'power1.inOut'
      }, 10.4);

      // Stagger entrance fade of logo wall badges
      scrollytellingTL.from('.logo-badge', {
        opacity: 0,
        y: 10,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out'
      }, 10.8);

      // ----------------------------------------------------
      // PHASE 6: FINAL REASSEMBLY & CTA (90% - 100%)
      // ----------------------------------------------------
      scrollytellingTL.to('#slide-5', { opacity: 0, y: -40, duration: 1 }, 12.0)
        .call(() => {
          const s5 = document.getElementById('slide-5');
          const s6 = document.getElementById('slide-6');
          if (s5 && s6) {
            s5.classList.remove('active');
            s6.classList.add('active');
          }
        }, null, 13.0)
        .fromTo('#slide-6', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, 13.0);

      // Fade out Global Map stage
      scrollytellingTL.to('.global-stage', {
        opacity: 0,
        y: -20,
        duration: 1.2,
        ease: 'power2.in',
        onComplete: () => {
          const gs = document.getElementById('global-stage');
          if (gs) gs.classList.remove('active');
        }
      }, 12.0);

      // Re-introduce Stamping Strip Layout, but scaled down and centered
      scrollytellingTL.to('#svg-strip-layout', {
        opacity: 1,
        scale: 0.85,
        duration: 1.5,
        ease: 'power2.out'
      }, 12.5);

      // Snap the group components back together (reset translation offsets to 0)
      scrollytellingTL.to('.strip-stage', {
        x: 0,
        duration: 1.8,
        ease: 'back.out(1.2)'
      }, 12.8);

      // Fade base plates back in
      scrollytellingTL.to('#strip-base, #strip-lava-layer', {
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out'
      }, 13.0);

      // Transition lava orange layer to electric cyan/blue blueprint glow!
      scrollytellingTL.to('#strip-lava-layer', {
        attr: { fill: 'url(#blue-glow)' },
        duration: 1.5,
        ease: 'power1.inOut'
      }, 13.0);

      // Transition stages border colors from Molten Orange to Electric Cyan
      scrollytellingTL.to('.stage-plate', {
        stroke: '#00D6FF',
        fill: 'rgba(0,214,255,0.06)',
        duration: 1.5,
        ease: 'power1.inOut'
      }, 13.0);

      // Transition active ambient glow to blue
      scrollytellingTL.to('#cinematic-glow-blob-blue', {
        opacity: 0.28,
        scale: 1.2,
        duration: 2.5
      }, 12.5);
    };

    // Close Cinematic Scrollytelling Modal Cleanly
    window.closeCinematicScrollytelling = () => {
      isScrollytellingActive = false;
      document.body.style.overflow = ''; // unlock scroll

      // Stop canvas loops
      if (scrollySparksLoopId) {
        cancelAnimationFrame(scrollySparksLoopId);
        scrollySparksLoopId = null;
      }

      if (scrollyModal) {
        gsap.to(scrollyModal, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.in',
          onComplete: () => {
            scrollyModal.classList.remove('active');

            // Kill and clear GSAP timeline
            if (scrollytellingTL) {
              scrollytellingTL.scrollTrigger.kill();
              scrollytellingTL.kill();
              scrollytellingTL = null;
            }

            // Reset SVG layers
            gsap.set('#strip-base, #strip-lava-layer', { opacity: 1, clearProps: 'all' });
            gsap.set('#strip-lava-layer', { attr: { fill: 'url(#lava-glow)' } });
            gsap.set('.stage-plate', { stroke: '#FF6A00', clearProps: 'all' });
            gsap.set('.strip-stage', { x: 0, opacity: 1, clearProps: 'all' });
            gsap.set('#svg-strip-layout', { opacity: 1, scale: 0.85, transformOrigin: 'center center' });

            // Clean active classes
            const ms = document.getElementById('machinery-stage');
            const mats = document.getElementById('materials-stage');
            const gs = document.getElementById('global-stage');
            if (ms) ms.classList.remove('active');
            if (mats) mats.classList.remove('active');
            if (gs) gs.classList.remove('active');
          }
        });
      }
    };

    // Bind Close Button trigger
    if (scrollyCloseBtn) {
      scrollyCloseBtn.addEventListener('click', window.closeCinematicScrollytelling);
    }

    // Bind sub-close triggers inside slides (Slide 1 & Slide 6 CTAs)
    document.querySelectorAll('.scrolly-close-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.closeCinematicScrollytelling();
      });
    });

    // Close on ESC key inside scrollytelling modal
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isScrollytellingActive) {
        window.closeCinematicScrollytelling();
      }
    });
  }

  // --- SCROLLY NAVBAR GLASS CHANGE ---
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      if (navbar) navbar.classList.add('scrolled');
    } else {
      if (navbar) navbar.classList.remove('scrolled');
    }
  });

  // --- HIDE HUD PANELS NEAR THE FOOTER TO AVOID TEXT OVERLAPS ---
  ScrollTrigger.create({
    trigger: '#footer',
    start: 'top bottom',
    toggleActions: 'play none none reverse',
    onEnter: () => {
      document.querySelectorAll('.hud-fixed').forEach(el => el.classList.add('hud-hidden'));
    },
    onLeaveBack: () => {
      document.querySelectorAll('.hud-fixed').forEach(el => el.classList.remove('hud-hidden'));
    }
  });

  // ===================================================
  // --- CINEMATIC PGT III SCROLLYTELLING VIEWPORT ---
  // ===================================================
  const pgt3Images = [];
  const totalFrames = 290;
  let loadedFramesCount = 0;

  function initPgt3Preload() {
    // Start background loading of all 290 frames
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const filename = `ezgif-frame-${i.toString().padStart(3, '0')}.jpg`;
      img.src = `/ezgif-69152765cf2dcd17-jpg/${filename}`;
      img.onload = () => {
        loadedFramesCount++;
        // If first frame loaded, draw it immediately on load
        if (i === 1) drawPgt3Frame(1);
      };
      pgt3Images.push(img);
    }
  }

  // Preload frames after primary page load completes
  setTimeout(initPgt3Preload, 1500);

  const pgt3ImageCanvas = document.getElementById('pgt3-image-canvas');
  const pgt3Ctx = pgt3ImageCanvas ? pgt3ImageCanvas.getContext('2d') : null;
  const pgt3SparksCanvas = document.getElementById('pgt3-sparks-canvas');
  const pgt3SparksCtx = pgt3SparksCanvas ? pgt3SparksCanvas.getContext('2d') : null;

  let isPgt3Active = false;
  let pgt3Sparks = [];
  let pgt3TL = null;
  let pgt3SparksLoop = null;
  let pgt3Progress = 0;

  function drawPgt3Frame(index) {
    if (!pgt3ImageCanvas || !pgt3Ctx) return;
    const imgIndex = Math.min(totalFrames, Math.max(1, index)) - 1;
    const img = pgt3Images[imgIndex];
    if (img && img.complete && img.naturalWidth !== 0) {
      pgt3Ctx.clearRect(0, 0, pgt3ImageCanvas.width, pgt3ImageCanvas.height);
      pgt3Ctx.drawImage(img, 0, 0, pgt3ImageCanvas.width, pgt3ImageCanvas.height);
    } else {
      // Find the closest loaded frame to prevent flickering
      let fallbackFound = false;
      for (let offset = 1; offset <= 30; offset++) {
        // search backward
        if (imgIndex - offset >= 0) {
          const fallback = pgt3Images[imgIndex - offset];
          if (fallback && fallback.complete && fallback.naturalWidth !== 0) {
            pgt3Ctx.clearRect(0, 0, pgt3ImageCanvas.width, pgt3ImageCanvas.height);
            pgt3Ctx.drawImage(fallback, 0, 0, pgt3ImageCanvas.width, pgt3ImageCanvas.height);
            fallbackFound = true;
            break;
          }
        }
        // search forward
        if (imgIndex + offset < totalFrames) {
          const fallback = pgt3Images[imgIndex + offset];
          if (fallback && fallback.complete && fallback.naturalWidth !== 0) {
            pgt3Ctx.clearRect(0, 0, pgt3ImageCanvas.width, pgt3ImageCanvas.height);
            pgt3Ctx.drawImage(fallback, 0, 0, pgt3ImageCanvas.width, pgt3ImageCanvas.height);
            fallbackFound = true;
            break;
          }
        }
      }

      // Fallback: if absolutely nothing is cached yet, draw first frame if available
      if (!fallbackFound && pgt3Images[0] && pgt3Images[0].complete) {
        pgt3Ctx.clearRect(0, 0, pgt3ImageCanvas.width, pgt3ImageCanvas.height);
        pgt3Ctx.drawImage(pgt3Images[0], 0, 0, pgt3ImageCanvas.width, pgt3ImageCanvas.height);
      }
    }
  }

  // --- PGT III SPARKS ENGINE ---
  let pgt3SparksWidth = 0;
  let pgt3SparksHeight = 0;

  const resizePgt3SparksCanvas = () => {
    if (pgt3SparksCanvas) {
      pgt3SparksWidth = pgt3SparksCanvas.width = pgt3SparksCanvas.parentElement.clientWidth;
      pgt3SparksHeight = pgt3SparksCanvas.height = pgt3SparksCanvas.parentElement.clientHeight;
    }
  };

  class Pgt3Spark {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * pgt3SparksWidth;
      this.y = pgt3SparksHeight + Math.random() * 50;
      this.size = Math.random() * 2 + 1;
      this.speedY = -(Math.random() * 1.5 + 0.6);
      this.speedX = (Math.random() - 0.5) * 1.0;
      this.life = 1;
      this.decay = Math.random() * 0.007 + 0.002;
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      this.life -= this.decay;

      // Mouse repulsion
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 130) {
        const force = (130 - dist) / 130;
        this.x += (dx / dist) * force * 3;
        this.y += (dy / dist) * force * 3;
      }

      if (this.life <= 0 || this.y < 0) {
        this.reset();
      }
    }
    draw() {
      if (!pgt3SparksCtx) return;
      // Orange for early stages, Blue for automation and reassembly
      let color = '#FF6A00'; // Molten Lava Orange
      if (pgt3Progress >= 0.4 && pgt3Progress < 0.8) {
        color = '#0050FF'; // Electric Blue
      } else if (pgt3Progress >= 0.8) {
        color = Math.random() > 0.5 ? '#FF6A00' : '#0050FF'; // Dual energy
      }

      pgt3SparksCtx.fillStyle = color;
      pgt3SparksCtx.shadowBlur = Math.random() > 0.5 ? 6 : 0;
      pgt3SparksCtx.shadowColor = color;
      pgt3SparksCtx.beginPath();
      pgt3SparksCtx.arc(this.x, this.y, this.size * this.life, 0, Math.PI * 2);
      pgt3SparksCtx.fill();
    }
  }

  function initPgt3Sparks() {
    resizePgt3SparksCanvas();
    pgt3Sparks = [];
    const count = 40;
    for (let i = 0; i < count; i++) {
      pgt3Sparks.push(new Pgt3Spark());
    }
  }

  function animatePgt3Sparks() {
    if (!isPgt3Active || !pgt3SparksCtx) return;
    pgt3SparksCtx.clearRect(0, 0, pgt3SparksWidth, pgt3SparksHeight);
    pgt3Sparks.forEach(s => {
      s.update();
      s.draw();
    });
    pgt3SparksCtx.shadowBlur = 0;
    pgt3SparksLoop = requestAnimationFrame(animatePgt3Sparks);
  }

  // --- PGT III SCROLLYTELLING MAIN METHOD ---
  const pgt3Modal = document.getElementById('pgt3-scrolly-modal');

  window.openPgt3Scrollytelling = () => {
    isPgt3Active = true;
    document.body.style.overflow = 'hidden'; // lock body scroll

    if (pgt3Modal) {
      pgt3Modal.classList.add('active');
      pgt3Modal.scrollTop = 0;
      gsap.set(pgt3Modal, { opacity: 0 });
      gsap.to(pgt3Modal, { opacity: 1, duration: 0.6, ease: 'power2.out' });
    }

    // Init sparks & draw first frame
    initPgt3Sparks();
    animatePgt3Sparks();
    drawPgt3Frame(1);

    // Setup hover tracking for cursor followers
    setupCursorHover(pgt3Modal.querySelectorAll('.interactive-el, button, a'));

    // Clear previous timeline if exists
    if (pgt3TL) {
      pgt3TL.scrollTrigger.kill();
      pgt3TL.kill();
    }

    // Set initial slide opacities
    gsap.set('#pgt3-slide-1', { opacity: 1, y: 0 });
    gsap.set(['#pgt3-slide-2', '#pgt3-slide-3', '#pgt3-slide-4', '#pgt3-slide-5'], { opacity: 0, y: 40 });
    gsap.set('#pgt3-navbar', { y: '-100%', className: 'pgt3-navbar' });

    // Construct ScrollTrigger timeline
    pgt3TL = gsap.timeline({
      scrollTrigger: {
        trigger: '.cinematic-scroll-track',
        scroller: '#pgt3-scrolly-modal',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          pgt3Progress = self.progress;
          const pct = Math.round(self.progress * 100);

          // Update HUD percentage
          const pctVal = document.getElementById('pgt3-pct-val');
          if (pctVal) pctVal.textContent = `${pct.toString().padStart(2, '0')}%`;

          // Draw correct image frame
          const activeFrame = Math.min(totalFrames, Math.max(1, Math.round(self.progress * (totalFrames - 1)) + 1));
          drawPgt3Frame(activeFrame);

          // Update Apple Navbar Translucent slide-in
          const pgt3Navbar = document.getElementById('pgt3-navbar');
          if (pgt3Navbar) {
            if (pct > 2) {
              pgt3Navbar.classList.add('visible');
            } else {
              pgt3Navbar.classList.remove('visible');
            }
          }

          // Scanner lines active on Slide 2 and 4
          const scanner = document.getElementById('pgt3-scanner');
          if (scanner) {
            if ((pct >= 15 && pct <= 40) || (pct >= 60 && pct <= 80)) {
              scanner.classList.add('active');
            } else {
              scanner.classList.remove('active');
            }
          }

          // Active Navbar Highlight Link
          const links = document.querySelectorAll('.pgt3-nav-link');
          links.forEach(l => l.classList.remove('active'));
          if (links.length >= 6) {
            if (pct < 15) links[0].classList.add('active'); // Overview
            else if (pct < 40) links[1].classList.add('active'); // Engineering
            else if (pct < 60) links[2].classList.add('active'); // Automation
            else if (pct < 80) links[3].classList.add('active'); // Precision
            else if (pct < 95) links[4].classList.add('active'); // Performance
            else links[5].classList.add('active'); // Contact
          }

          // Update HUD telemetry logs
          const hudLogs = document.getElementById('pgt3-hud-logs');
          if (hudLogs) {
            if (pct < 15) {
              hudLogs.textContent = 'SYSTEM ACTIVE // STAGING BASE METAL ASSEMBLY';
            } else if (pct < 40) {
              hudLogs.textContent = 'DECONSTRUCTING PRECISION COMPONENTS // FEA ACTIVE';
            } else if (pct < 60) {
              hudLogs.textContent = 'MONITORING ROBOTIC AUTOMATION SYSTEMS // 24x7 OPERATIONAL';
            } else if (pct < 80) {
              hudLogs.textContent = 'AUDITING SYSTEM TOLERANCES // CALIPER CALIBRATE ±0.002mm';
            } else {
              hudLogs.textContent = 'REASSEMBLING CYCLIC TOOL BLOCK // PGT III READY';
            }
          }
        }
      }
    });

    // --- TIMELINE SEQUENCING & SLIDE TRANSITIONS ---
    // Slide 1 -> 2
    pgt3TL.to('#pgt3-slide-1', { opacity: 0, y: -45, duration: 1.5 }, 0.5)
      .call(() => {
        document.getElementById('pgt3-slide-1').classList.remove('active');
        document.getElementById('pgt3-slide-2').classList.add('active');
      }, null, 1.8)
      .fromTo('#pgt3-slide-2', { opacity: 0, y: 45 }, { opacity: 1, y: 0, duration: 1.5 }, 1.8);

    // Slide 2 -> 3
    pgt3TL.to('#pgt3-slide-2', { opacity: 0, y: -45, duration: 1.5 }, 3.5)
      .call(() => {
        document.getElementById('pgt3-slide-2').classList.remove('active');
        document.getElementById('pgt3-slide-3').classList.add('active');
      }, null, 4.8)
      .fromTo('#pgt3-slide-3', { opacity: 0, y: 45 }, { opacity: 1, y: 0, duration: 1.5 }, 4.8);

    // Slide 3 -> 4
    pgt3TL.to('#pgt3-slide-3', { opacity: 0, y: -45, duration: 1.5 }, 6.5)
      .call(() => {
        document.getElementById('pgt3-slide-3').classList.remove('active');
        document.getElementById('pgt3-slide-4').classList.add('active');
      }, null, 7.8)
      .fromTo('#pgt3-slide-4', { opacity: 0, y: 45 }, { opacity: 1, y: 0, duration: 1.5 }, 7.8);

    // Slide 4 -> 5
    pgt3TL.to('#pgt3-slide-4', { opacity: 0, y: -45, duration: 1.5 }, 9.5)
      .call(() => {
        document.getElementById('pgt3-slide-4').classList.remove('active');
        document.getElementById('pgt3-slide-5').classList.add('active');
      }, null, 10.8)
      .fromTo('#pgt3-slide-5', { opacity: 0, y: 45 }, { opacity: 1, y: 0, duration: 1.5 }, 10.8);

    // Dynamic background lighting shifts
    pgt3TL.to('#pgt3-glow-blob-orange', { scale: 1.3, opacity: 0.28, duration: 3 }, 0)
      .to('#pgt3-glow-blob-blue', { scale: 1.4, opacity: 0.25, duration: 3 }, 4.0);
  };

  // --- CLOSE PGT III METHOD ---
  window.closePgt3Scrollytelling = () => {
    isPgt3Active = false;
    document.body.style.overflow = 'auto'; // unlock scroll

    if (pgt3Modal) {
      gsap.to(pgt3Modal, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          pgt3Modal.classList.remove('active');
          if (pgt3SparksLoop) cancelAnimationFrame(pgt3SparksLoop);
          if (pgt3TL) {
            pgt3TL.scrollTrigger.kill();
            pgt3TL.kill();
          }
        }
      });
    }
  };

  // Bind close buttons
  document.querySelectorAll('.pgt3-close-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.closePgt3Scrollytelling();
    });
  });

  // Close on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isPgt3Active) {
      window.closePgt3Scrollytelling();
    }
  });

  // --- APPLE NAVBAR NAVIGATION LINKS CLICK CONTROL ---
  document.querySelectorAll('.pgt3-nav-link, .pgt3-nav-scroll-btn').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetPct = parseInt(link.getAttribute('data-target-pct'));
      if (isNaN(targetPct)) return;

      const track = pgt3Modal.querySelector('.cinematic-scroll-track');
      if (track) {
        const scrollableHeight = track.clientHeight - pgt3Modal.clientHeight;
        const targetScroll = (scrollableHeight * targetPct) / 100;

        gsap.to(pgt3Modal, {
          scrollTop: targetScroll,
          duration: 1.5,
          ease: 'power3.inOut'
        });
      }
    });
    // ===================================================
    // --- DYNAMIC PGT 3D SPIN ANIMATION ENGINE (Product A) ---
    // ===================================================
    const pgtImages = [];
    const totalPgtFrames = 40;
    let loadedPgtFramesCount = 0;

    function initPgtPreload() {
      for (let i = 1; i <= totalPgtFrames; i++) {
        const img = new Image();
        const filename = `ezgif-frame-${i.toString().padStart(3, '0')}.jpg`;
        img.src = `/pgt/${filename}`;
        img.onload = () => {
          loadedPgtFramesCount++;
          if (i === 1) drawPgtFrame(1);
        };
        pgtImages.push(img);
      }
    }

    // Preload frames in the background
    setTimeout(initPgtPreload, 2000);

    const pgtHeroCanvas = document.getElementById('modal-hero-canvas');
    const pgtHeroCtx = pgtHeroCanvas ? pgtHeroCanvas.getContext('2d') : null;
    let activePgtFrame = 1;
    let pgtAutoplayInterval = null;
    let isHoveringPgtCanvas = false;

    function drawPgtFrame(index) {
      if (!pgtHeroCanvas || !pgtHeroCtx) return;
      const imgIndex = Math.min(totalPgtFrames, Math.max(1, index)) - 1;
      const img = pgtImages[imgIndex];
      if (img && img.complete && img.naturalWidth !== 0) {
        pgtHeroCtx.clearRect(0, 0, pgtHeroCanvas.width, pgtHeroCanvas.height);
        pgtHeroCtx.drawImage(img, 0, 0, pgtHeroCanvas.width, pgtHeroCanvas.height);
      } else {
        // Find closest loaded frame if not loaded yet
        let fallbackFound = false;
        for (let offset = 1; offset <= 10; offset++) {
          if (imgIndex - offset >= 0) {
            const fb = pgtImages[imgIndex - offset];
            if (fb && fb.complete && fb.naturalWidth !== 0) {
              pgtHeroCtx.clearRect(0, 0, pgtHeroCanvas.width, pgtHeroCanvas.height);
              pgtHeroCtx.drawImage(fb, 0, 0, pgtHeroCanvas.width, pgtHeroCanvas.height);
              fallbackFound = true;
              break;
            }
          }
          if (imgIndex + offset < totalPgtFrames) {
            const fb = pgtImages[imgIndex + offset];
            if (fb && fb.complete && fb.naturalWidth !== 0) {
              pgtHeroCtx.clearRect(0, 0, pgtHeroCanvas.width, pgtHeroCanvas.height);
              pgtHeroCtx.drawImage(fb, 0, 0, pgtHeroCanvas.width, pgtHeroCanvas.height);
              fallbackFound = true;
              break;
            }
          }
        }
        if (!fallbackFound && pgtImages[0] && pgtImages[0].complete) {
          pgtHeroCtx.clearRect(0, 0, pgtHeroCanvas.width, pgtHeroCanvas.height);
          pgtHeroCtx.drawImage(pgtImages[0], 0, 0, pgtHeroCanvas.width, pgtHeroCanvas.height);
        }
      }
    }

    window.startPgtAutoplay = () => {
      window.stopPgtAutoplay();
      drawPgtFrame(activePgtFrame);
      pgtAutoplayInterval = setInterval(() => {
        if (!isHoveringPgtCanvas) {
          activePgtFrame = (activePgtFrame % totalPgtFrames) + 1;
          drawPgtFrame(activePgtFrame);
        }
      }, 60); // slow cinematic rotation (approx 16fps)
    };

    window.stopPgtAutoplay = () => {
      if (pgtAutoplayInterval) {
        clearInterval(pgtAutoplayInterval);
        pgtAutoplayInterval = null;
      }
    };

    // Wire canvas touch/hover-scrub mouse listeners
    if (pgtHeroCanvas) {
      pgtHeroCanvas.addEventListener('mouseenter', () => {
        isHoveringPgtCanvas = true;
      });

      pgtHeroCanvas.addEventListener('mouseleave', () => {
        isHoveringPgtCanvas = false;
        window.startPgtAutoplay();
      });

      pgtHeroCanvas.addEventListener('mousemove', (e) => {
        const rect = pgtHeroCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const progress = Math.max(0, Math.min(1, x / rect.width));
        activePgtFrame = Math.min(totalPgtFrames, Math.max(1, Math.round(progress * (totalPgtFrames - 1)) + 1));
        drawPgtFrame(activePgtFrame);
      });

      // Touch support for premium mobile interactivity
      pgtHeroCanvas.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches[0]) {
          isHoveringPgtCanvas = true;
          const rect = pgtHeroCanvas.getBoundingClientRect();
          const x = e.touches[0].clientX - rect.left;
          const progress = Math.max(0, Math.min(1, x / rect.width));
          activePgtFrame = Math.min(totalPgtFrames, Math.max(1, Math.round(progress * (totalPgtFrames - 1)) + 1));
          drawPgtFrame(activePgtFrame);
        }
      });

      pgtHeroCanvas.addEventListener('touchend', () => {
        isHoveringPgtCanvas = false;
        window.startPgtAutoplay();
      });
    }

  // =========================================================
  // --- PGT 4MM COMPONENT CINEMATIC SCROLLYTELLING ENGINE ---
  // =========================================================
  const pgtScrollyModal = document.getElementById('pgt-scrolly-modal');
  let isPgtActive = false;
  window.isPgtActive = false;
  let pgtScrollyTL = null;
  let pgtSparksLoop = null;
  const pgtFrames = [];
  const totalPgtScrollFrames = 40;
  let pgtFramesLoaded = 0;
  let pgtScrollyCtx = null;
  let pgtScrollySparks = [];
  let pgtScrollyWidth = 0, pgtScrollyHeight = 0;
  let pgtScrollProgress = 0;

  // --- Preload all 40 frames ---
  function preloadPgtScrollFrames(callback) {
    if (pgtFrames.length > 0) { if (callback) callback(); return; }
    for (let i = 1; i <= totalPgtScrollFrames; i++) {
      const img = new Image();
      img.src = `/pgt/ezgif-frame-${i.toString().padStart(3, '0')}.jpg`;
      img.onload = () => {
        pgtFramesLoaded++;
        if (pgtFramesLoaded === totalPgtScrollFrames && callback) callback();
      };
      img.onerror = () => { pgtFramesLoaded++; };
      pgtFrames.push(img);
    }
  }

  // --- Draw frame on canvas ---
  function drawPgtScrollFrame(index) {
    const canvas = document.getElementById('pgt-image-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const frameIdx = Math.min(totalPgtScrollFrames, Math.max(1, Math.round(index))) - 1;
    const img = pgtFrames[frameIdx];
    if (img && img.complete && img.naturalWidth !== 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    } else {
      // Find nearest loaded frame
      for (let offset = 1; offset <= 10; offset++) {
        const lower = pgtFrames[frameIdx - offset];
        if (lower && lower.complete && lower.naturalWidth !== 0) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(lower, 0, 0, canvas.width, canvas.height);
          return;
        }
        const upper = pgtFrames[frameIdx + offset];
        if (upper && upper.complete && upper.naturalWidth !== 0) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(upper, 0, 0, canvas.width, canvas.height);
          return;
        }
      }
    }
  }

  // --- Spark Particle Engine for PGT Modal ---
  function initPgtSparks() {
    const sparksCanvas = document.getElementById('pgt-sparks-canvas');
    if (!sparksCanvas) return;
    pgtScrollyCtx = sparksCanvas.getContext('2d');
    const resizePgtSparks = () => {
      pgtScrollyWidth = sparksCanvas.width = sparksCanvas.parentElement.clientWidth;
      pgtScrollyHeight = sparksCanvas.height = sparksCanvas.parentElement.clientHeight;
    };
    resizePgtSparks();
    pgtScrollySparks = [];
    for (let i = 0; i < 45; i++) {
      pgtScrollySparks.push({
        x: Math.random() * pgtScrollyWidth,
        y: pgtScrollyHeight + Math.random() * 50,
        size: Math.random() * 2 + 1,
        speedY: -(Math.random() * 1.5 + 0.5),
        speedX: (Math.random() - 0.5),
        life: 1,
        decay: Math.random() * 0.008 + 0.002
      });
    }
    function animatePgtSparks() {
      if (!isPgtActive || !pgtScrollyCtx) return;
      pgtScrollyCtx.clearRect(0, 0, pgtScrollyWidth, pgtScrollyHeight);
      pgtScrollySparks.forEach(s => {
        s.y += s.speedY; s.x += s.speedX; s.life -= s.decay;
        if (s.life <= 0 || s.y < 0) {
          s.x = Math.random() * pgtScrollyWidth;
          s.y = pgtScrollyHeight + Math.random() * 50;
          s.life = 1;
        }
        let color = '#FF6A00';
        if (pgtScrollProgress >= 0.4 && pgtScrollProgress < 0.8) color = '#00D6FF';
        else if (pgtScrollProgress >= 0.8) color = Math.random() > 0.5 ? '#00D6FF' : '#B026FF';
        pgtScrollyCtx.fillStyle = color;
        pgtScrollyCtx.shadowBlur = 6; pgtScrollyCtx.shadowColor = color;
        pgtScrollyCtx.beginPath();
        pgtScrollyCtx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
        pgtScrollyCtx.fill();
      });
      pgtScrollyCtx.shadowBlur = 0;
      pgtSparksLoop = requestAnimationFrame(animatePgtSparks);
    }
    animatePgtSparks();
  }

  // --- Build GSAP ScrollTrigger Timeline ---
  function buildPgtScrollytelling() {
    if (pgtScrollyTL) {
      try { pgtScrollyTL.scrollTrigger.kill(); pgtScrollyTL.kill(); } catch(e) {}
    }

    // Reset slides
    ['pgt-slide-1','pgt-slide-2','pgt-slide-3','pgt-slide-4','pgt-slide-5'].forEach((id, i) => {
      const el = document.getElementById(id);
      if (el) { el.classList.toggle('active', i === 0); }
    });

    // Draw frame 1 immediately
    drawPgtScrollFrame(1);

    pgtScrollyTL = gsap.timeline({
      scrollTrigger: {
        trigger: '#pgt-scroll-track',
        start: 'top top',
        end: 'bottom bottom',
        scroller: pgtScrollyModal,
        scrub: 1,
        onUpdate: (self) => {
          pgtScrollProgress = self.progress;
          const pct = Math.round(self.progress * 100);

          // Update % HUD
          const pctEl = document.getElementById('pgt-pct-val');
          if (pctEl) pctEl.textContent = `${pct.toString().padStart(2, '0')}%`;

          // Map progress → frame (1–40)
          const frameIdx = Math.min(totalPgtScrollFrames, Math.max(1, Math.round(self.progress * (totalPgtScrollFrames - 1)) + 1));
          drawPgtScrollFrame(frameIdx);

          // Navbar visibility
          const navbar = document.getElementById('pgt-navbar');
          if (navbar) { pct > 2 ? navbar.classList.add('visible') : navbar.classList.remove('visible'); }

          // Scanner line at engineering/performance stages
          const scanner = document.getElementById('pgt-scanner');
          if (scanner) {
            ((pct >= 15 && pct <= 40) || (pct >= 60 && pct <= 80)) ? scanner.classList.add('active') : scanner.classList.remove('active');
          }

          // Active navbar link
          const links = document.querySelectorAll('.pgt-nav-link');
          links.forEach(l => l.classList.remove('active'));
          if (links.length >= 5) {
            if (pct < 15) links[0].classList.add('active');
            else if (pct < 40) links[1].classList.add('active');
            else if (pct < 60) links[2].classList.add('active');
            else if (pct < 80) links[3].classList.add('active');
            else links[4].classList.add('active');
          }

          // HUD Logs
          const hudLogs = document.getElementById('pgt-hud-logs');
          if (hudLogs) {
            if (pct < 15) hudLogs.textContent = 'STAGING BASE METAL ASSEMBLY // MOUNT BRACKET INIT';
            else if (pct < 40) hudLogs.textContent = 'PROGRESSIVE DIE FORMING // ±0.05MM TOLERANCE ACTIVE';
            else if (pct < 60) hudLogs.textContent = 'MATERIAL VALIDATION // CRCA STEEL GRADE CONFIRMED';
            else if (pct < 80) hudLogs.textContent = 'PERFORMANCE AUDIT // 800 TON PRESS LOAD APPLIED';
            else hudLogs.textContent = 'FINAL INSPECTION COMPLETE // ISO 9001:2015 CERTIFIED';
          }

          // Glow blob transitions
          const blobOrange = document.getElementById('pgt-glow-blob-orange');
          const blobBlue = document.getElementById('pgt-glow-blob-blue');
          if (blobOrange) blobOrange.style.opacity = self.progress < 0.5 ? '0.18' : '0.06';
          if (blobBlue) blobBlue.style.opacity = self.progress >= 0.5 ? '0.2' : '0.08';
        }
      }
    });

    // Slide transitions
    pgtScrollyTL
      .to('#pgt-slide-1', { opacity: 0, y: -40, duration: 1.5 }, 0.5)
      .call(() => {
        document.getElementById('pgt-slide-1').classList.remove('active');
        document.getElementById('pgt-slide-2').classList.add('active');
      }, null, 1.8)
      .fromTo('#pgt-slide-2', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.5 }, 1.8)
      .to('#pgt-slide-2', { opacity: 0, y: -40, duration: 1.5 }, 3.5)
      .call(() => {
        document.getElementById('pgt-slide-2').classList.remove('active');
        document.getElementById('pgt-slide-3').classList.add('active');
      }, null, 4.8)
      .fromTo('#pgt-slide-3', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.5 }, 4.8)
      .to('#pgt-slide-3', { opacity: 0, y: -40, duration: 1.5 }, 6.5)
      .call(() => {
        document.getElementById('pgt-slide-3').classList.remove('active');
        document.getElementById('pgt-slide-4').classList.add('active');
      }, null, 7.8)
      .fromTo('#pgt-slide-4', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.5 }, 7.8)
      .to('#pgt-slide-4', { opacity: 0, y: -40, duration: 1.5 }, 9.5)
      .call(() => {
        document.getElementById('pgt-slide-4').classList.remove('active');
        document.getElementById('pgt-slide-5').classList.add('active');
      }, null, 10.8)
      .fromTo('#pgt-slide-5', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.5 }, 10.8);

    // Background blob animations
    pgtScrollyTL
      .to('#pgt-glow-blob-orange', { scale: 1.3, opacity: 0.28, duration: 3 }, 0)
      .to('#pgt-glow-blob-blue', { scale: 1.4, opacity: 0.22, duration: 3 }, 4.0);
  }

  // --- OPEN PGT SCROLLYTELLING ---
  window.openPgtScrollytelling = () => {
    if (!pgtScrollyModal) return;
    isPgtActive = true;
    window.isPgtActive = true;
    document.body.style.overflow = 'hidden';
    pgtScrollyModal.scrollTop = 0;
    pgtScrollyModal.classList.add('active');

    gsap.fromTo(pgtScrollyModal, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' });

    // Preload then build scrollytelling
    preloadPgtScrollFrames(() => {
      buildPgtScrollytelling();
    });
    // Start sparks immediately
    initPgtSparks();

    setupCursorHover(pgtScrollyModal.querySelectorAll('.interactive-el, button, a'));
  };

  // --- CLOSE PGT SCROLLYTELLING ---
  window.closePgtScrollytelling = () => {
    isPgtActive = false;
    window.isPgtActive = false;
    document.body.style.overflow = 'auto';
    if (pgtSparksLoop) { cancelAnimationFrame(pgtSparksLoop); pgtSparksLoop = null; }
    if (pgtScrollyModal) {
      gsap.to(pgtScrollyModal, {
        opacity: 0, duration: 0.5, ease: 'power2.in',
        onComplete: () => {
          pgtScrollyModal.classList.remove('active');
          if (pgtScrollyTL) {
            try { pgtScrollyTL.scrollTrigger.kill(); pgtScrollyTL.kill(); } catch(e) {}
            pgtScrollyTL = null;
          }
          // Reset navbar
          const navbar = document.getElementById('pgt-navbar');
          if (navbar) navbar.classList.remove('visible');
        }
      });
    }
  };

  // Bind close triggers
  document.querySelectorAll('.pgt-close-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => { e.preventDefault(); window.closePgtScrollytelling(); });
  });

  // Bind navbar scroll buttons
  document.querySelectorAll('.pgt-nav-link, .pgt-nav-scroll-btn').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetPct = parseInt(link.getAttribute('data-pgt-pct'));
      if (isNaN(targetPct) || !pgtScrollyModal) return;
      const track = document.getElementById('pgt-scroll-track');
      if (track) {
        const scrollableHeight = track.clientHeight - pgtScrollyModal.clientHeight;
        const targetScroll = (scrollableHeight * targetPct) / 100;
        gsap.to(pgtScrollyModal, { scrollTop: targetScroll, duration: 1.5, ease: 'power3.inOut' });
      }
    });
  });

});
});
