/* =====================================================================
   CADPOINT - RELATED SOFTWARE SLIDESHOW  (one file controls every course page)

   HOW TO EDIT
   1. SOFTWARE below = the card library. Each card has:
        n = name shown on the card      s = 2-3 letter badge
        c = badge colour (hex)          d = one-line description
        p = (optional) course page it links to, e.g. "revit-architecture.html"
   2. COURSES below = which cards each course page shows (course page name
      without ".html"). The FIRST card is the main software of the course
      and gets the "In this course" tag. The rest show "Related".
   3. To add a new software: add one line in SOFTWARE, then add its key
      to the courses you want in COURSES.
   ===================================================================== */
(function () {
  'use strict';

  var SOFTWARE = {
    autocad:  { n: 'AutoCAD',          s: 'A',   c: '#e51937', d: '2D drafting and 3D modelling for civil, mechanical and electrical drawings.', p: 'autocad-2d-3d.html' },
    acelec:   { n: 'AutoCAD Electrical', s: 'AE', c: '#d97706', d: 'Electrical control schematics, panel layouts and automatic wire numbering.', p: 'autocad-electrical.html' },
    revitarc: { n: 'Revit Architecture', s: 'R', c: '#1f6feb', d: 'BIM modelling for buildings: plans, sections, schedules and sheets.', p: 'revit-architecture.html' },
    revitmep: { n: 'Revit MEP',        s: 'RM',  c: '#0891b2', d: 'Mechanical, electrical and plumbing design coordinated in one BIM model.', p: 'revit-mep.html' },
    civil3d:  { n: 'Civil 3D',         s: 'C3',  c: '#16a34a', d: 'Roads, grading, surfaces and pipe networks for infrastructure projects.', p: 'civil-3d.html' },
    staad:    { n: 'STAAD.Pro',        s: 'ST',  c: '#7c3aed', d: 'Structural analysis and design of beams, columns, frames and slabs.', p: 'staad-pro.html' },
    navis:    { n: 'Navisworks',       s: 'N',   c: '#0ea5e9', d: 'Model review, clash detection and 4D construction scheduling.', p: 'navisworks.html' },
    sketchup: { n: 'SketchUp',         s: 'S',   c: '#dc2626', d: 'Fast, intuitive 3D modelling for architecture and interiors.', p: 'sketchup.html' },
    lumion:   { n: 'Lumion',           s: 'L',   c: '#0f766e', d: 'Real-time rendering and walkthrough videos from your 3D models.', p: 'lumion.html' },
    max:      { n: '3ds Max & V-Ray',  s: '3D',  c: '#0d9488', d: 'Photorealistic modelling, lighting, materials and rendering.', p: '3ds-max-vray.html' },
    swx:      { n: 'SolidWorks',       s: 'SW',  c: '#b91c1c', d: 'Parametric 3D part, assembly and drawing design for products.', p: 'solidworks.html' },
    creo:     { n: 'Creo',             s: 'Cr',  c: '#ea580c', d: 'Parametric product design, assemblies and manufacturing drawings.', p: 'creo.html' },
    catia:    { n: 'CATIA',            s: 'CA',  c: '#1d4ed8', d: 'Advanced surface and solid design used in automotive and aerospace.', p: 'catia.html' },
    nx:       { n: 'Siemens NX',       s: 'NX',  c: '#0369a1', d: 'Integrated CAD and CAM for design, machining and toolpaths.', p: 'nx-cad-cam.html' },
    ansys:    { n: 'ANSYS',            s: 'AN',  c: '#f59e0b', d: 'Finite element and fluid simulation for strength, heat and flow.', p: 'ansys.html' },
    eplan:    { n: 'EPLAN',            s: 'EP',  c: '#2563eb', d: 'Electrical engineering design with panel layouts and parts lists.', p: 'eplan.html' },
    fusion:   { n: 'Fusion 360',       s: 'F',   c: '#f97316', d: 'Cloud CAD, CAM and simulation in a single tool.' },
    excel:    { n: 'MS Excel',         s: 'X',   c: '#15803d', d: 'Spreadsheets, formulas and reports used in every office role.' },
    msp:      { n: 'MS Project',       s: 'MP',  c: '#16a34a', d: 'Project schedules, resources and progress tracking.' },
    ps:       { n: 'Photoshop',        s: 'Ps',  c: '#1e3a8a', d: 'Photo editing, post-production and image compositing.' },
    ai:       { n: 'Illustrator',      s: 'Ai',  c: '#c2410c', d: 'Vector graphics for logos, icons and print layouts.' },
    corel:    { n: 'CorelDRAW',        s: 'CD',  c: '#15803d', d: 'Vector design for banners, flyers and print jobs.' },
    figma:    { n: 'Figma',            s: 'Fg',  c: '#a21caf', d: 'Collaborative interface design and clickable prototypes.' },
    xd:       { n: 'Adobe XD',         s: 'Xd',  c: '#be185d', d: 'Wireframes, UI screens and interactive prototypes.' },
    canva:    { n: 'Canva',            s: 'Cv',  c: '#0891b2', d: 'Quick social posts, posters and presentations.' },
    pr:       { n: 'Premiere Pro',     s: 'Pr',  c: '#4c1d95', d: 'Video editing for ads, reels and promotional content.' },
    ga:       { n: 'Google Ads',       s: 'GA',  c: '#2563eb', d: 'Search and display campaigns that bring in enquiries.' },
    meta:     { n: 'Meta Ads',         s: 'M',   c: '#1d4ed8', d: 'Facebook and Instagram advertising and audience targeting.' },
    analytics:{ n: 'Google Analytics', s: 'GA4', c: '#ea580c', d: 'Track visitors, conversions and campaign results.' },
    seo:      { n: 'SEO Tools',        s: 'SE',  c: '#059669', d: 'Keyword research, site audits and ranking reports.' },
    tally:    { n: 'Tally Prime',      s: 'T',   c: '#0369a1', d: 'Accounting, inventory, GST and payroll for businesses.', p: 'tally-accounting.html' },
    gst:      { n: 'GST Portal',       s: 'GS',  c: '#b45309', d: 'GST registration, returns filing and reconciliation.', p: 'gst-taxation.html' },
    sap:      { n: 'SAP',              s: 'SAP', c: '#0284c7', d: 'ERP modules for finance, materials, sales and production.', p: 'sap.html' },
    python:   { n: 'Python',           s: 'Py',  c: '#2563eb', d: 'Beginner-friendly programming for automation, data and AI.', p: 'python-programming.html' },
    jupyter:  { n: 'Jupyter Notebook', s: 'Jn',  c: '#ea580c', d: 'Interactive notebooks to write code, charts and notes together.' },
    pandas:   { n: 'Pandas & NumPy',   s: 'Pd',  c: '#4338ca', d: 'Data cleaning, analysis and number crunching in Python.' },
    ml:       { n: 'Scikit-learn & TensorFlow', s: 'ML', c: '#d97706', d: 'Build and train machine learning and deep learning models.' },
    powerbi:  { n: 'Power BI',         s: 'BI',  c: '#ca8a04', d: 'Interactive dashboards and business reports.' },
    java:     { n: 'Java',             s: 'Jv',  c: '#dc2626', d: 'Object-oriented programming for apps and enterprise software.', p: 'java-development.html' },
    ide:      { n: 'IntelliJ / Eclipse', s: 'IJ', c: '#7c3aed', d: 'Professional IDEs to write, run and debug Java projects.' },
    sql:      { n: 'MySQL',            s: 'My',  c: '#0369a1', d: 'Databases and SQL queries behind every application.' },
    spring:   { n: 'Spring Boot',      s: 'Sp',  c: '#16a34a', d: 'Build REST APIs and web applications faster with Java.' },
    html:     { n: 'HTML & CSS',       s: 'H5',  c: '#ea580c', d: 'The structure and styling of every website.', p: 'web-development.html' },
    js:       { n: 'JavaScript',       s: 'JS',  c: '#ca8a04', d: 'Make pages interactive, from menus to full web apps.' },
    react:    { n: 'React',            s: 'Re',  c: '#0891b2', d: 'Component-based interfaces for modern websites.' },
    vscode:   { n: 'VS Code',          s: 'VS',  c: '#2563eb', d: 'The editor most web developers use every day.' },
    git:      { n: 'Git & GitHub',     s: 'Gt',  c: '#374151', d: 'Version control and code sharing for team projects.' },
    wp:       { n: 'WordPress',        s: 'WP',  c: '#1d4ed8', d: 'Launch business websites and blogs without heavy coding.' }
  };

  var COURSES = {
    'autocad-2d-3d':       ['autocad', 'revitarc', 'civil3d', 'sketchup', 'max', 'lumion', 'staad'],
    'autocad-electrical':  ['acelec', 'eplan', 'autocad', 'revitmep', 'excel'],
    'revit-architecture':  ['revitarc', 'autocad', 'navis', 'lumion', 'sketchup', 'max'],
    'revit-mep':           ['revitmep', 'revitarc', 'autocad', 'navis', 'acelec'],
    'civil-3d':            ['civil3d', 'autocad', 'staad', 'navis', 'msp'],
    'staad-pro':           ['staad', 'autocad', 'revitarc', 'civil3d', 'excel'],
    'navisworks':          ['navis', 'revitarc', 'revitmep', 'autocad', 'msp'],
    'sketchup':            ['sketchup', 'lumion', 'max', 'autocad', 'ps'],
    'lumion':              ['lumion', 'sketchup', 'revitarc', 'max', 'ps', 'pr'],
    '3ds-max-vray':        ['max', 'sketchup', 'autocad', 'lumion', 'ps'],
    'solidworks':          ['swx', 'creo', 'catia', 'nx', 'ansys', 'autocad', 'fusion'],
    'creo':                ['creo', 'swx', 'catia', 'nx', 'ansys', 'autocad'],
    'catia':               ['catia', 'swx', 'creo', 'nx', 'ansys'],
    'nx-cad-cam':          ['nx', 'swx', 'creo', 'catia', 'ansys', 'fusion'],
    'ansys':               ['ansys', 'swx', 'creo', 'catia', 'nx', 'excel'],
    'eplan':               ['eplan', 'acelec', 'autocad', 'revitmep', 'excel'],
    'graphical-designing': ['ps', 'ai', 'corel', 'canva', 'figma', 'pr'],
    'ui-ux-design':        ['figma', 'xd', 'ps', 'ai', 'html', 'canva'],
    'digital-marketing':   ['ga', 'meta', 'analytics', 'seo', 'canva', 'ps', 'wp'],
    'web-development':     ['html', 'js', 'react', 'vscode', 'git', 'wp', 'figma'],
    'python-programming':  ['python', 'vscode', 'jupyter', 'pandas', 'sql', 'git'],
    'data-science-ai':     ['python', 'jupyter', 'pandas', 'ml', 'powerbi', 'sql', 'excel'],
    'java-development':    ['java', 'ide', 'sql', 'spring', 'git', 'html'],
    'tally-accounting':    ['tally', 'gst', 'excel', 'sap'],
    'gst-taxation':        ['gst', 'tally', 'excel', 'sap'],
    'sap':                 ['sap', 'tally', 'excel', 'gst', 'powerbi']
  };

  var ARROW = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var PREV = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>';
  var NEXT = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>';

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  function build(slug, host) {
    var keys = (COURSES[slug] || []).filter(function (k) { return SOFTWARE[k]; });
    if (!keys.length) return;
    var cards = keys.map(function (k, i) {
      var s = SOFTWARE[k], main = i === 0, self = s.p && s.p.replace('.html', '') === slug;
      var tag = main ? '<span class="kd-swt on">In this course</span>' : '<span class="kd-swt">Related</span>';
      var link = (s.p && !self) ? '<a class="kd-swl" href="' + esc(s.p) + '">View course ' + ARROW + '</a>' : '<span class="kd-swl off">&nbsp;</span>';
      return '<article class="kd-swc kd-spot' + (main ? ' main' : '') + '" style="--sc:' + esc(s.c) + '">' +
        '<div class="kd-swb">' + esc(s.s) + '</div>' + tag +
        '<h4>' + esc(s.n) + '</h4><p>' + esc(s.d) + '</p>' + link + '</article>';
    }).join('');

    var box = document.createElement('section');
    box.className = 'kd-sw';
    box.setAttribute('aria-label', 'Related software');
    box.innerHTML =
      '<div class="kd-swh"><div><h3>Software You Will Work With</h3>' +
      '<p class="kd-sm">The main tool of this course and the related software that goes with it.</p></div>' +
      '<div class="kd-swn"><button type="button" class="kd-swp" aria-label="Previous software">' + PREV + '</button>' +
      '<button type="button" class="kd-swx" aria-label="Next software">' + NEXT + '</button></div></div>' +
      '<div class="kd-swv"><div class="kd-swk" tabindex="0">' + cards + '</div></div>' +
      '<div class="kd-swd" role="tablist" aria-label="Software slides"></div>';
    host.appendChild(box);

    var track = box.querySelector('.kd-swk'), dots = box.querySelector('.kd-swd');
    var prev = box.querySelector('.kd-swp'), next = box.querySelector('.kd-swx');
    var items = [].slice.call(track.children), timer = null, paused = false;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function step() { return items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : track.clientWidth; }
    function perView() { return Math.max(1, Math.round(track.clientWidth / step())); }
    function pages() { return Math.max(1, Math.ceil(items.length - perView() + 1)); }
    function index() { return Math.min(pages() - 1, Math.round(track.scrollLeft / step())); }
    function go(i) { track.scrollTo({ left: i * step(), behavior: reduce ? 'auto' : 'smooth' }); }
    function atEnd() { return track.scrollLeft + track.clientWidth >= track.scrollWidth - 4; }

    function drawDots() {
      var n = pages(), html = '';
      for (var i = 0; i < n; i++) html += '<button type="button" role="tab" aria-label="Slide ' + (i + 1) + '" data-i="' + i + '"></button>';
      dots.innerHTML = html; mark();
    }
    function mark() {
      var cur = atEnd() ? pages() - 1 : index();
      [].forEach.call(dots.children, function (d, i) { d.classList.toggle('on', i === cur); });
      prev.disabled = track.scrollLeft <= 4; next.disabled = atEnd();
      box.classList.toggle('kd-sw1', pages() <= 1);
    }

    prev.addEventListener('click', function () { go(Math.max(0, index() - 1)); restart(); });
    next.addEventListener('click', function () { go(atEnd() ? 0 : index() + 1); restart(); });
    dots.addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) { go(+b.dataset.i); restart(); } });
    track.addEventListener('scroll', function () { window.requestAnimationFrame(mark); }, { passive: true });
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(Math.min(pages() - 1, index() + 1)); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(Math.max(0, index() - 1)); }
    });
    window.addEventListener('resize', drawDots);

    // auto-play: only while the slideshow is visible, paused on hover / focus / touch
    function tick() {
      if (paused || pages() <= 1) return;
      go(atEnd() ? 0 : index() + 1);
    }
    function restart() { clearInterval(timer); if (!reduce) timer = setInterval(tick, 3600); }
    ['mouseenter', 'focusin', 'touchstart'].forEach(function (ev) { box.addEventListener(ev, function () { paused = true; }, { passive: true }); });
    ['mouseleave', 'focusout', 'touchend'].forEach(function (ev) { box.addEventListener(ev, function () { paused = false; }, { passive: true }); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) {
        if (en[0].isIntersecting) restart(); else clearInterval(timer);
      }, { threshold: .3 }).observe(box);
    } else restart();

    drawDots();
    // the Overview tab can be hidden at first (display:none), so redraw when it is shown
    document.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('.kd-tb button')) setTimeout(drawDots, 60);
    });
  }

  function init() {
    var rv = document.querySelector('.kd-rv[data-slug]');
    var host = document.getElementById('p1');
    if (!rv || !host) return;
    build(rv.getAttribute('data-slug'), host);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
