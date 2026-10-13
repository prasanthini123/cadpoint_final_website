// CADPOINT - Simple JavaScript
// All page content is written directly in HTML.
// This file only handles animations and interactions.

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

// ===== Page loader: home page, first visit of each browser session =====
(function () {
  const root = document.documentElement;
  const loader = document.getElementById('loader');
  if (!loader) return;
  if (!root.classList.contains('cp-loading')) { loader.remove(); return; }

  const fill = document.getElementById('ldFill');
  const pct = document.getElementById('ldPct');
  const txt = document.getElementById('ldTxt');
  const started = performance.now();
  const MIN_TIME = 1600;   // always show for at least 1.6s so it never just flashes
  const MAX_TIME = 7000;   // never block the site longer than 7s
  let pageLoaded = document.readyState === 'complete';
  let progress = 0;
  let finished = false;

  window.addEventListener('load', function () { pageLoaded = true; });

  function finish() {
    if (finished) return;
    finished = true;
    fill.style.width = '100%';
    pct.textContent = '100%';
    txt.textContent = 'Ready';
    try { sessionStorage.setItem('cpLoaded', '1'); } catch (e) {}
    setTimeout(function () {
      loader.classList.add('ld-done');
      root.classList.remove('cp-loading');
      setTimeout(function () { loader.remove(); }, 1400);
    }, 350);
  }

  (function tick() {
    if (finished) return;
    const elapsed = performance.now() - started;
    const target = pageLoaded && elapsed >= MIN_TIME ? 100 : Math.min(90, 8 + (elapsed / MIN_TIME) * 82);
    progress += (target - progress) * 0.09;
    if (target === 100 && progress > 99) progress = 100;
    fill.style.width = progress.toFixed(1) + '%';
    pct.textContent = Math.floor(progress) + '%';
    if (!finished) txt.textContent = progress < 30 ? 'Preparing classrooms' : progress < 60 ? 'Loading courses' : progress < 90 ? 'Setting up labs' : 'Almost ready';
    if (progress >= 100 || elapsed > MAX_TIME) { finish(); return; }
    requestAnimationFrame(tick);
  })();
})();

// Mobile menu and Courses mega menu
const menu = $('#nv');
const mega = $('#mega');
const menuButton = $('#bg');
const coursesButton = $('#cb');

if (coursesButton) {
  coursesButton.addEventListener('click', function (e) {
    e.preventDefault();
    if (mega) mega.classList.toggle('open');
    if (menu) menu.classList.remove('open');
  });
}

if (menuButton) {
  menuButton.addEventListener('click', function () {
    if (mega) mega.classList.remove('open');
    menu.classList.toggle('open');
    menuButton.innerHTML = menu.classList.contains('open') ? '&#10005;' : '&#9776;';
  });
}

$$('.ddb').forEach(function (button) {
  button.addEventListener('click', function (e) {
    if (window.innerWidth <= 900) {
      e.preventDefault();
      button.parentElement.classList.toggle('open');
    }
  });
});

document.addEventListener('click', function (e) {
  if (!e.target.closest('#hd')) {
    if (mega) mega.classList.remove('open');
  }
});

$$('#mg a, #nv a:not(#cb):not(.ddb)').forEach(function (link) {
  link.addEventListener('click', function () {
    if (mega) mega.classList.remove('open');
    if (menu) menu.classList.remove('open');
    if (menuButton) menuButton.innerHTML = '&#9776;';
  });
});

// Header becomes smaller while scrolling
window.addEventListener('scroll', function () {
  const header = $('#hd');
  if (header) header.classList.toggle('sc', window.scrollY > 20);
});

// Hero slideshow (cinematic): shutter-strip transition, per-slide text with
// word-by-word reveal, vertical navigator, big number, hover-pause, swipe, parallax
const slides = $$('.hs');
const dots = $('#hd2');
let currentSlide = 0;
let sliderTimer;

if (slides.length && dots) {
  const HERO_DELAY = 6500;                       // time per slide (ms)
  const STRIPS = window.innerWidth < 700 ? 4 : 6; // shutter strips per image
  const hero = $('.hero');
  const items = $$('.hx');
  const nav = $('#hnav');
  const num = $('#hnum');
  const cur = $('#hcur');
  const tot = $('#htot');
  const pad = (n) => String(n).padStart(2, '0');
  const loading = document.documentElement.classList.contains('cp-loading');
  let ready = false;

  hero.style.setProperty('--hdur', HERO_DELAY + 'ms');
  hero.classList.add('js');
  items.forEach((item) => item.classList.remove('on'));   // text enters with animation when the slideshow starts

  // 1) cut every slide image into vertical strips
  slides.forEach((slide) => {
    const src = $('img', slide).getAttribute('src');
    const wrap = document.createElement('div');
    wrap.className = 'hstrips';
    wrap.style.setProperty('--n', STRIPS);
    for (let k = 0; k < STRIPS; k++) {
      const st = document.createElement('div');
      st.className = 'st';
      st.style.setProperty('--i', k);
      const im = document.createElement('img');
      im.src = src;
      im.alt = '';
      st.appendChild(im);
      wrap.appendChild(st);
    }
    slide.appendChild(wrap);
  });

  // 2) split headings into words (for the reveal animation)
  function splitWords(el, counter) {
    Array.from(el.childNodes).forEach((node) => {
      if (node.nodeType === 3) {
        const frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
          const w = document.createElement('span');
          const i = document.createElement('i');
          w.className = 'wd';
          i.textContent = part;
          i.style.setProperty('--i', counter.n++);
          w.appendChild(i);
          frag.appendChild(w);
        });
        node.replaceWith(frag);
      } else if (node.nodeType === 1) {
        splitWords(node, counter);
      }
    });
  }
  items.forEach((item) => {
    const h = $('h1', item);
    if (!h) return;
    h.setAttribute('aria-label', h.textContent.replace(/\s+/g, ' ').trim());
    splitWords(h, { n: 0 });
  });

  // 3) build navigator + dots + counter
  if (tot) tot.textContent = '/ ' + pad(slides.length);
  dots.innerHTML = slides.map(() => '<i></i>').join('');
  if (nav) {
    nav.innerHTML = items.map((item, index) =>
      '<button type="button"><b>' + pad(index + 1) + '</b><span>' + (item.dataset.title || '') + '</span></button>'
    ).join('');
  }

  function replay(el, cls) {
    if (!el) return;
    el.classList.remove(cls);
    void el.offsetWidth;            // restart the CSS animation
    el.classList.add(cls);
  }

  function markProgress() {
    $$('i', dots).concat(nav ? $$('button', nav) : []).forEach((el) => el.classList.remove('on'));
    void dots.offsetWidth;
    $$('i', dots).forEach((dot, index) => dot.classList.toggle('on', index === currentSlide));
    if (nav) $$('button', nav).forEach((btn, index) => btn.classList.toggle('on', index === currentSlide));
  }

  function schedule() {
    clearTimeout(sliderTimer);
    sliderTimer = setTimeout(() => showSlide(currentSlide + 1), HERO_DELAY);
  }

  function showSlide(number) {
    const old = currentSlide;
    currentSlide = (number + slides.length) % slides.length;

    slides.forEach((slide, index) => {
      slide.classList.remove('out', 'first');
      if (ready && index === old && index !== currentSlide) {
        slide.classList.add('out');
        setTimeout(() => slide.classList.remove('out'), 1800);
      }
      slide.classList.toggle('on', index === currentSlide);
    });

    items.forEach((item, index) => {
      if (index === currentSlide) {
        item.classList.remove('leave');
        item.classList.add('on');
      } else if (ready && index === old) {
        item.classList.remove('on');
        item.classList.add('leave');
        setTimeout(() => item.classList.remove('leave'), 700);
      } else {
        item.classList.remove('on', 'leave');
      }
    });

    markProgress();
    if (cur) { cur.textContent = pad(currentSlide + 1); replay(cur, 'in'); }
    if (num) { num.textContent = pad(currentSlide + 1); replay(num, 'in'); }

    ready = true;
    schedule();
  }

  $$('i', dots).forEach((dot, index) => dot.addEventListener('click', () => showSlide(index)));
  if (nav) $$('button', nav).forEach((btn, index) => btn.addEventListener('click', () => showSlide(index)));
  if ($('#hp')) $('#hp').addEventListener('click', () => showSlide(currentSlide - 1));
  if ($('#hn')) $('#hn').addEventListener('click', () => showSlide(currentSlide + 1));

  // pause while the mouse is over the hero (or the tab is hidden)
  function pauseHero() { hero.classList.add('paused'); clearTimeout(sliderTimer); }
  function resumeHero() { hero.classList.remove('paused'); if (ready) { markProgress(); schedule(); } }
  hero.addEventListener('mouseenter', pauseHero);
  hero.addEventListener('mouseleave', resumeHero);
  document.addEventListener('visibilitychange', () => document.hidden ? pauseHero() : resumeHero());

  // touch swipe
  let touchX = null;
  hero.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  hero.addEventListener('touchend', (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 50) showSlide(currentSlide + (dx < 0 ? 1 : -1));
  }, { passive: true });

  // soft mouse parallax (desktop only)
  if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    hero.addEventListener('mousemove', (e) => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      hero.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    });
  }

  // start: if the page loader is showing, wait for its curtain to open
  function start() { void hero.offsetWidth; showSlide(0); }
  if (loading) {
    slides[0].classList.add('first');          // first image already visible behind the loader
    const root = document.documentElement;
    const wait = new MutationObserver(() => {
      if (!root.classList.contains('cp-loading')) { wait.disconnect(); start(); }
    });
    wait.observe(root, { attributes: true, attributeFilter: ['class'] });
    setTimeout(() => { wait.disconnect(); if (!ready) start(); }, 9000);
  } else {
    start();
  }
}

// Course card horizontal sliders
$$('.car').forEach(function (carousel) {
  const track = $('.trk', carousel);
  const previous = $('.pv', carousel);
  const next = $('.nx', carousel);
  if (!track) return;

  const moveAmount = () => track.clientWidth * 0.8;
  if (previous) previous.addEventListener('click', () => track.scrollBy({ left: -moveAmount(), behavior: 'smooth' }));
  if (next) next.addEventListener('click', () => track.scrollBy({ left: moveAmount(), behavior: 'smooth' }));
});

// Number counters
function startCounter(element) {
  if (element.dataset.started === 'yes') return;
  element.dataset.started = 'yes';

  const target = Number(element.dataset.n);
  let value = 0;
  const timer = setInterval(function () {
    value += Math.max(1, target / 50);
    if (value >= target) {
      value = target;
      clearInterval(timer);
    }
    element.textContent = Math.round(value).toLocaleString();
  }, 28);
}

// Scroll reveal animation
const revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      $$('[data-n]', entry.target).forEach(startCounter);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

$$('.rv, .fb').forEach(function (element) {
  revealObserver.observe(element);
});

// Word-by-word title animation used by the original website
$$('.ttl, .sp').forEach(function (title) {
  const words = title.textContent.trim().split(/\s+/);
  title.textContent = '';

  words.forEach(function (word, index) {
    const span = document.createElement('span');
    const italic = document.createElement('i');
    span.className = 'sw';
    italic.textContent = word;
    italic.style.setProperty('--i', index);
    span.appendChild(italic);
    title.appendChild(span);
    title.appendChild(document.createTextNode(' '));
  });
});

// Stagger reveal animation
$$('.rv').forEach(function (element) {
  const siblings = [...element.parentElement.children].filter(item => item.classList.contains('rv'));
  const index = siblings.indexOf(element);
  element.style.transitionDelay = Math.min(index, 5) * 0.09 + 's';
});

$$('.ttl, .sp, .rvi').forEach(element => revealObserver.observe(element));

// Scroll progress bar
const progressBar = document.createElement('div');
progressBar.id = 'pbar';
document.body.prepend(progressBar);

// Parallax image effect + hide/show header
const parallaxImages = $$('.px');
let lastScroll = 0;
let scrollWorking = false;

function scrollEffects() {
  scrollWorking = false;

  const y = window.scrollY;
  const viewportHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight - viewportHeight;
  const top = $('#top');

  progressBar.style.width = (documentHeight > 0 ? y / documentHeight * 100 : 0) + '%';

  if (top) {
    top.classList.toggle('sc', y > 40);
    const hide = y > lastScroll + 2 && y > 300 && !mega?.classList.contains('open') && !menu?.classList.contains('open');
    if (hide) top.classList.add('hide');
    if (y < lastScroll - 2) top.classList.remove('hide');
  }

  parallaxImages.forEach(function (image) {
    const rect = image.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > viewportHeight) return;

    const factor = Number(image.dataset.f) || 0.09;
    const max = rect.height * 0.075;
    const value = (rect.top + rect.height / 2 - viewportHeight / 2) * -factor;
    image.style.setProperty('--py', Math.max(-max, Math.min(max, value)).toFixed(1) + 'px');
  });

  lastScroll = y;
}

window.addEventListener('scroll', function () {
  if (!scrollWorking) {
    scrollWorking = true;
    requestAnimationFrame(scrollEffects);
  }
}, { passive: true });
window.addEventListener('resize', scrollEffects);
scrollEffects();

// WhatsApp demo form
function sendWA(event) {
  event.preventDefault();
  const form = event.target;
  const whatsappNumber = '919894865423'; // Change this number
  const message = `Hi Cadpoint, I am ${form.nm.value} (${form.ph.value}). Interested in: ${form.cs.value || 'your courses'}. Preferred time: ${form.tm.value}. ${form.ms.value}`;
  window.open('https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(message), '_blank');
}

// Back to top button
const topButton = document.createElement('button');
topButton.id = 'up';
topButton.setAttribute('aria-label', 'Back to top');
topButton.innerHTML = '&#8593;';
document.body.appendChild(topButton);
topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
window.addEventListener('scroll', function () {
  topButton.classList.toggle('show', window.scrollY > 600);
}, { passive: true });

// Safety: reveal images that are already visible after page load
setTimeout(function () {
  $$('.rvi:not(.in)').forEach(function (element) {
    if (element.getBoundingClientRect().top < window.innerHeight) element.classList.add('in');
  });
}, 3500);

// ===== Course details tabs =====
(function () {
  if (!document.body.classList.contains('ac5')) return;
  const btns = $$('.kd-tb button'), panels = $$('.kd-tp');
  btns.forEach(b => b.addEventListener('click', () => {
    btns.forEach(x => x.classList.toggle('on', x === b));
    panels.forEach(p => p.classList.toggle('on', p.id === b.dataset.t));
  }));
})();

// ===== Inner pages: tabs, gallery filter, lightbox =====
(function () {
  if (!document.body.classList.contains('ip')) return;
  $$('.ip-tab').forEach(b => b.addEventListener('click', () => {
    $$('.ip-tab').forEach(x => x.classList.toggle('on', x === b));
    $$('.ip-pane').forEach(p => p.classList.toggle('on', p.id === b.dataset.t));
  }));
  $$('.ip-chip').forEach(b => b.addEventListener('click', () => {
    $$('.ip-chip').forEach(x => x.classList.toggle('on', x === b));
    $$('.ip-gi').forEach(g => g.classList.toggle('hide', b.dataset.f !== 'all' && g.dataset.cat !== b.dataset.f));
  }));
  const lb = $('#ipLb'); if (!lb) return;
  let list = [], idx = 0;
  function show() { const a = list[idx]; $('#lbI').src = a.getAttribute('href'); $('#lbC').textContent = a.dataset.cap || ''; }
  function open(a) {
    list = $$('.ip-lbi').filter(x => x.dataset.g === a.dataset.g && !x.classList.contains('hide'));
    idx = Math.max(0, list.indexOf(a)); show(); lb.classList.add('on'); lb.setAttribute('aria-hidden', 'false');
  }
  function close() { lb.classList.remove('on'); lb.setAttribute('aria-hidden', 'true'); }
  function step(d) { idx = (idx + d + list.length) % list.length; show(); }
  $$('.ip-lbi').forEach(a => a.addEventListener('click', e => { e.preventDefault(); open(a); }));
  $('#lbX').addEventListener('click', close); $('#lbP').addEventListener('click', () => step(-1)); $('#lbN').addEventListener('click', () => step(1));
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => { if (!lb.classList.contains('on')) return; if (e.key === 'Escape') close(); if (e.key === 'ArrowLeft') step(-1); if (e.key === 'ArrowRight') step(1); });
})();

// ===== Service pages: soft 3D tilt on cards =====
(function () {
  if (!document.body.classList.contains('sv')) return;
  if (window.matchMedia('(hover: none), (prefers-reduced-motion: reduce)').matches) return;
  $$('.ip-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transition = 'transform .08s';
      card.style.transform = 'perspective(800px) rotateX(' + (-y * 7).toFixed(2) + 'deg) rotateY(' + (x * 9).toFixed(2) + 'deg) translateY(-6px)';
    });
    card.addEventListener('mouseleave', function () {
      card.style.transition = 'transform .5s';
      card.style.transform = '';
    });
  });
})();

// ===== Course details v2: animated counters in the Instructor tab =====
(function () {
  if (!document.body.classList.contains('ac5')) return;
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function countUp(panel) {
    $$('.kd-cnt', panel).forEach(function (el) {
      const to = +el.dataset.to;
      if (reduce || !to) { el.textContent = to; return; }
      const start = performance.now(), dur = 1100;
      (function tick(now) {
        const p = Math.min(1, (now - start) / dur), e = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(to * e);
        if (p < 1) requestAnimationFrame(tick);
      })(start);
    });
  }
  $$('.kd-tb button').forEach(function (b) {
    b.addEventListener('click', function () {
      if (b.dataset.t === 'p3') countUp($('#p3'));
    });
  });
  // keep the tab list reachable from the keyboard with the arrow keys
  const list = $('.kd-tb');
  if (list) list.addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const tabs = $$('button', list), i = tabs.indexOf(document.activeElement);
    if (i < 0) return;
    const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
    next.focus(); next.click();
  });
})();

// ===== Course details: cursor spotlight on cards =====
(function () {
  if (!document.body.classList.contains('ac5')) return;
  if (window.matchMedia && window.matchMedia('(hover: none), (prefers-reduced-motion: reduce)').matches) return;
  document.addEventListener('mousemove', function (e) {
    const card = e.target.closest && e.target.closest('.kd-spot');
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    card.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }, { passive: true });
})();
