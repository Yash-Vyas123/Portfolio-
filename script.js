// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav-menu');
navToggle?.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

// Close menu on link click (mobile UX)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('open'));
});

// Scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
},{threshold:0.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Stats counter
const counters = document.querySelectorAll('.stat-num');
const runCounter = (el) => {
  const target = +el.getAttribute('data-target');
  const step = Math.max(1, Math.floor(target / 80));
  let current = 0;
  const tick = () => {
    current += step;
    if (current >= target){ el.textContent = target; return; }
    el.textContent = current;
    requestAnimationFrame(tick);
  };
  tick();
};
// Trigger counters when About is visible
const about = document.querySelector('#about');
if (about){
  const io = new IntersectionObserver(([e])=>{
    if (e.isIntersecting){
      counters.forEach(runCounter);
      io.disconnect();
    }
  },{threshold:0.2});
  io.observe(about);
}

// Contact form (static demo)
const form = document.getElementById('contact-form');
const status = document.querySelector('.form-status');
form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  status.textContent = 'Sending...';
  // Example: integrate with EmailJS, Formspree, or custom backend
  // For now, simulate success:
  setTimeout(()=>{
    status.textContent = 'Message sent! Thank you.';
    form.reset();
  }, 800);
});

// Dynamic year
document.getElementById('year').textContent = new Date().getFullYear();



// Skill bar animations
 document.addEventListener('DOMContentLoaded', function () {
  // Animate skill bars when they appear on screen
  const skillBars = document.querySelectorAll('.skill-bar .progress');

  skillBars.forEach(bar => {
    // Save the target width and set initial width to zero
    const targetWidth = bar.style.width;
    bar.style.width = '0';
    
    // Observer to fire animation when element enters viewport
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Animate bar to its intended width
            bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
            bar.style.width = targetWidth;
            observer.unobserve(bar); // Animate only once
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(bar);
  });
});






// Welcome overlay logic
(function () {
  const overlay = document.getElementById('welcome-overlay');
  if (!overlay) return;

  const enterBtn = document.getElementById('enter-btn');
  const statusLive = document.getElementById('welcome-status');

  // Helper to hide overlay gracefully
  function hideOverlay() {
    if (!overlay || overlay.classList.contains('hide')) return;
    overlay.classList.add('hide');
    // Mark main as no longer busy for AT
    document.documentElement.setAttribute('aria-busy', 'false');
    // Clean up after transition
    setTimeout(() => {
      overlay.style.display = 'none';
    }, 520);
  }

  // Set the document as busy while loading for assistive tech
  document.documentElement.setAttribute('aria-busy', 'true');

  // Update live region to announce loading
  if (statusLive) {
    statusLive.textContent = 'Loading portfolio…';
  }

  // Manual enter fallback
  if (enterBtn) {
    enterBtn.addEventListener('click', hideOverlay);
  }

  // Hide when everything is fully loaded (images, videos, CSS)
  window.addEventListener('load', () => {
    if (statusLive) statusLive.textContent = 'Loaded. Entering portfolio…';
    hideOverlay();
  });

  // Safety timeout: if load events are delayed, allow entry after N ms
  // Adjust duration if needed (e.g., 3000–2000 ms for fast sites)
  const SAFETY_MS = 3000;
  setTimeout(() => {
    if (statusLive && !overlay.classList.contains('hide')) {
      statusLive.textContent = 'Ready. Entering now…';
    }
    hideOverlay();
  }, SAFETY_MS);

  // As a progressive enhancement, allow keyboard focus on the button first
  requestAnimationFrame(() => {
    if (enterBtn) enterBtn.focus({ preventScroll: true });
  });
})();





// Add to script.js (end of file)
window.addEventListener('DOMContentLoaded', function () {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReduced.matches || !window.particlesJS) return;

  particlesJS('particles-bg', {
    particles: {
      number: { value: 90, density: { enable: true, value_area: 900 } },
      color: { value: ['#6a5acd', '#00d1ff', '#00ffa2', '#ffffff'] },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: false },
      size: { value: 3, random: { enable: true, minimumValue: 1 } },
      line_linked: { enable: true, distance: 140, color: '#7aa0ff', opacity: 0.25, width: 1 },
      move: { enable: true, speed: 1.2, direction: 'none', out_mode: 'out' }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'repulse' },
        onclick: { enable: true, mode: 'push' },
        resize: true
      },
      modes: {
        repulse: { distance: 120, duration: 0.4 },
        push: { particles_nb: 4 }
      }
    },
    retina_detect: true
  });
});




