CADPOINT PLAIN HTML + CSS + JAVASCRIPT

Original site.css is kept unchanged so the original animations/effects remain.
All page content is now written directly in index.html/about.html.
Only js/script.js handles slider, menu, counters, scroll reveal, parallax, progress bar and WhatsApp.
No React, Vite, Bootstrap, Tailwind, config.js or dynamic template generation is used.

Change WhatsApp number inside js/script.js. Change text/images directly in HTML.

--- UPDATE ---
New service pages: online-classes.html, corporate-training.html, skill-certification.html
(linked from the Services dropdown on every page and from the Services cards on the home page).
WhatsApp button: one clean floating button on every page (css/site.css -> "WhatsApp floating button").
Home page loader: shows only on the first visit of each browser session (sessionStorage key 'cpLoaded').
Loader markup is in index.html (#loader), logic is at the top of js/script.js.

--- ANIMATION UPDATE ---
Loader: blueprint-draw background, orbiting logo, letter-by-letter brand reveal, live status text,
shimmer progress bar, split-curtain exit. CSS: "Page loader" at end of css/site.css, logic at top of js/script.js.
Service pages (body class "sv"): floating hero shapes, staggered entrance, button shine, 3D card tilt,
pulsing step numbers, animated CTA glow. All respect prefers-reduced-motion.

--- ISO / CONTENT UPDATE ---
Service pages now include: ISO badge in hero, trust chips, animated stats band, "ISO Certified Training Institute" section,
FAQ accordion. Footer bar on every page now says "ISO Certified Training Institute".
Edit text directly inside online-classes.html / corporate-training.html / skill-certification.html.
