/* =====================================================================
   CADPOINT - STUDENT REVIEWS  (one file controls every course page)

   HOW TO ADD REAL REVIEWS
   1. Find the course page name without ".html", e.g. "autocad-2d-3d".
   2. Add it under REAL_REVIEWS below:

        "autocad-2d-3d": [
          { n: "Student name", m: "Civil Engineering student", r: 5, t: "Their review text." },
          { n: "Another name", m: "Diploma student", r: 4, t: "Another review." }
        ],

      n = name, m = who they are, r = rating 1 to 5, t = review text.
   3. Courses with no real reviews show the SAMPLE_REVIEWS for their subject.
   4. The rating average and bars are calculated from the reviews automatically.
   5. When every course has real reviews, set SHOW_SAMPLE_NOTICE = false (or
      delete the sample sets). The sample reviews below are placeholder
      text for design preview. Replace them with real student reviews
      before the site goes live.
   ===================================================================== */
(function () {
  'use strict';
  var WHATSAPP = '919894865423';
  var SHOW_SAMPLE_NOTICE = true;

  var REAL_REVIEWS = {
    /* "autocad-2d-3d": [ { n: "", m: "", r: 5, t: "" } ], */
  };

  var SAMPLE_REVIEWS = {
  "civil": [
    {
      "n": "Karthik R.",
      "m": "Civil Engineering student",
      "r": 5,
      "t": "The trainer shows every command on screen first and then lets us repeat it on our own system. After a few weeks I could draw a complete plan without looking at my notes."
    },
    {
      "n": "Divya S.",
      "m": "Architecture graduate",
      "r": 5,
      "t": "The {c} classes are very practical. Daily lab time and quick doubt clearing made a big difference for me."
    },
    {
      "n": "Arun P.",
      "m": "Site engineer",
      "r": 4,
      "t": "Clear syllabus and good content. The weekend batch fit my work schedule well. A few more practice drawings would make it even better."
    },
    {
      "n": "Meera K.",
      "m": "Diploma student",
      "r": 5,
      "t": "I attended the free demo first and liked the teaching style, so I joined. The final project and certificate gave me something solid to show."
    }
  ],
  "viz": [
    {
      "n": "Vignesh M.",
      "m": "Interior design student",
      "r": 5,
      "t": "We built a scene from scratch and the trainer showed how lighting and materials change the final image. Very clear and practical."
    },
    {
      "n": "Lavanya T.",
      "m": "Architecture student",
      "r": 5,
      "t": "Every class ended with a small exercise, so I never felt lost. {c} finally makes sense to me."
    },
    {
      "n": "Suresh B.",
      "m": "Freelance designer",
      "r": 4,
      "t": "Good coverage of the tools and workflow. Render time depends on your own computer, so ask the trainer about hardware before you join."
    },
    {
      "n": "Priya N.",
      "m": "Diploma student",
      "r": 5,
      "t": "Friendly trainer who repeats a topic until it is clear. The final project helped me build my portfolio."
    }
  ],
  "mech": [
    {
      "n": "Ramesh V.",
      "m": "Mechanical engineering student",
      "r": 5,
      "t": "The course moves from sketches to full assemblies in a logical order. Practising on the lab systems every day helped me understand how {c} models are built."
    },
    {
      "n": "Harini G.",
      "m": "Diploma student",
      "r": 5,
      "t": "Doubts were cleared in every session and the trainer linked each feature to how the part is actually made."
    },
    {
      "n": "Mohan D.",
      "m": "Design engineer",
      "r": 4,
      "t": "Strong fundamentals and good project work. I wanted a few more advanced exercises, and the trainer shared extra practice files when I asked."
    },
    {
      "n": "Keerthana L.",
      "m": "Final-year student",
      "r": 5,
      "t": "I joined after the free demo. The assessment and final project gave me real confidence in {c}."
    }
  ],
  "elec": [
    {
      "n": "Siva K.",
      "m": "Electrical engineering student",
      "r": 5,
      "t": "Symbols, circuits and layouts are explained step by step. The practice drawings felt like real project work."
    },
    {
      "n": "Anitha R.",
      "m": "Diploma student",
      "r": 5,
      "t": "Clear teaching and patient answers to every doubt. I finished the course with a complete drawing set."
    },
    {
      "n": "Prakash S.",
      "m": "Electrical supervisor",
      "r": 4,
      "t": "Useful for my daily work. The weekday batch timing suited me and the trainer explains standards in simple language."
    },
    {
      "n": "Deepa M.",
      "m": "ITI graduate",
      "r": 5,
      "t": "The trainer is patient and the lab practice is regular. I liked that we worked on the software every single day."
    }
  ],
  "it": [
    {
      "n": "Naveen T.",
      "m": "B.Sc Computer Science student",
      "r": 5,
      "t": "We wrote code in every class instead of only listening. Small projects from the first week kept me motivated."
    },
    {
      "n": "Sowmiya P.",
      "m": "Engineering student",
      "r": 5,
      "t": "The trainer explains why the code works, not only what to type. {c} became much easier after we debugged programs together in class."
    },
    {
      "n": "Bharath S.",
      "m": "Working professional",
      "r": 4,
      "t": "Good syllabus and a helpful trainer. The weekend batch moves quickly, so revise the same day at home."
    },
    {
      "n": "Janani V.",
      "m": "BCA student",
      "r": 5,
      "t": "I took the free demo before joining and the teaching style convinced me. The final project and certificate were worth it."
    }
  ],
  "design": [
    {
      "n": "Gokul R.",
      "m": "Design student",
      "r": 5,
      "t": "We worked on real briefs from the first week, so I learned how to plan, create and improve a design the way a studio does."
    },
    {
      "n": "Nisha A.",
      "m": "Small business owner",
      "r": 5,
      "t": "I joined to create my own creatives and campaigns. The trainer works on practical examples, so I could use what I learned the next day."
    },
    {
      "n": "Yuvaraj M.",
      "m": "College student",
      "r": 4,
      "t": "Very good content and friendly support. More weekend sessions would help students who are busy on weekdays."
    },
    {
      "n": "Revathi S.",
      "m": "Fresher",
      "r": 5,
      "t": "The portfolio work at the end of {c} was the best part. The trainer gave honest feedback on every piece."
    }
  ],
  "biz": [
    {
      "n": "Saranya M.",
      "m": "Commerce student",
      "r": 5,
      "t": "We practised on realistic company data, so entries and returns felt familiar. The trainer repeats a topic until the process is clear."
    },
    {
      "n": "Ganesh K.",
      "m": "Accounts assistant",
      "r": 5,
      "t": "Easy to follow and very practical. The lab practice every day helped me use {c} confidently in my office."
    },
    {
      "n": "Latha R.",
      "m": "Shop owner",
      "r": 4,
      "t": "Helpful for managing my own books. I would like a few more hours on reports, but the trainer answered all my doubts."
    },
    {
      "n": "Kumar S.",
      "m": "B.Com graduate",
      "r": 5,
      "t": "I attended the demo class first and liked the step-by-step approach. The assessment made sure I really learned it."
    }
  ]
};

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function stars(n) { var o = ''; for (var i = 1; i <= 5; i++) o += '<i class="' + (i <= n ? 'on' : '') + '">&#9733;</i>'; return o; }
  function initials(n) { var p = n.replace(/[^A-Za-z ]/g, '').trim().split(/\s+/); return ((p[0] || '?')[0] + (p[1] ? p[1][0] : '')).toUpperCase(); }
  function hue(n) { var h = 0; for (var i = 0; i < n.length; i++) h = (h * 31 + n.charCodeAt(i)) % 360; return h; }

  function render(root) {
    var slug = root.dataset.slug, dom = root.dataset.dom, course = root.dataset.course;
    var real = REAL_REVIEWS[slug], sample = !real;
    var list = (real || SAMPLE_REVIEWS[dom] || []).map(function (x) { return { n: x.n, m: x.m, r: x.r, t: x.t.replace(/\{c\}/g, course) }; });
    if (!list.length) return;

    var total = list.length, sum = 0, dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    list.forEach(function (x) { sum += x.r; dist[x.r]++; });
    var avg = (sum / total).toFixed(1);

    var bars = [5, 4, 3, 2, 1].map(function (k, i) {
      var pct = Math.round(dist[k] / total * 100);
      return '<li><span>' + k + ' star</span><div class="kd-bar"><i style="--w:' + pct + '%;--d:' + (0.2 + i * 0.08).toFixed(2) + 's"></i></div><em>' + dist[k] + '</em></li>';
    }).join('');

    var cards = list.map(function (x, i) {
      return '<article class="kd-rc kd-spot kd-a" data-r="' + x.r + '" style="--d:' + (0.1 + i * 0.1).toFixed(2) + 's">' +
        '<span class="kd-q" aria-hidden="true">&ldquo;</span>' +
        '<header><span class="kd-rav" style="--h:' + hue(x.n) + '">' + esc(initials(x.n)) + '</span>' +
        '<div><b>' + esc(x.n) + '</b><small>' + esc(x.m) + '</small></div>' +
        '<span class="kd-rst" role="img" aria-label="' + x.r + ' out of 5">' + stars(x.r) + '</span></header>' +
        '<p>' + esc(x.t) + '</p><footer>' + esc(course) + '</footer></article>';
    }).join('');

    root.innerHTML =
      '<div class="kd-rv-grid">' +
        '<aside class="kd-rsum kd-a" style="--d:.05s">' +
          '<div class="kd-avg"><b>' + avg + '</b><span>out of 5</span></div>' +
          '<div class="kd-rst big" role="img" aria-label="Average rating ' + avg + ' out of 5">' + stars(Math.round(avg)) + '</div>' +
          '<p class="kd-cnt-r">Based on ' + total + ' student review' + (total > 1 ? 's' : '') + '</p>' +
          '<ul class="kd-bars">' + bars + '</ul>' +
          (sample && SHOW_SAMPLE_NOTICE ? '<p class="kd-note">Sample reviews shown for preview.</p>' : '') +
          '<a class="btn" href="#kd-share">Write a review</a>' +
        '</aside>' +
        '<div class="kd-rlist">' +
          '<div class="kd-rf" role="group" aria-label="Filter reviews"><button class="on" data-f="all">All</button><button data-f="5">5 star</button><button data-f="4">4 star</button></div>' +
          '<div class="kd-rcards">' + cards + '</div>' +
        '</div>' +
      '</div>' +
      '<form class="kd-share" id="kd-share">' +
        '<h4>Studied this course? Share your experience</h4>' +
        '<p>Your review reaches us on WhatsApp. We may publish it on this page.</p>' +
        '<div class="kd-g2"><input name="nm" placeholder="Your name" required autocomplete="name"/>' +
        '<select name="rt" aria-label="Rating"><option value="5">5 stars - Excellent</option><option value="4">4 stars - Very good</option><option value="3">3 stars - Good</option><option value="2">2 stars - Fair</option><option value="1">1 star - Poor</option></select></div>' +
        '<textarea name="tx" rows="3" placeholder="Tell us what you liked and what we can improve" required></textarea>' +
        '<button class="btn" type="submit">Send review on WhatsApp</button>' +
      '</form>';

    var chips = root.querySelectorAll('.kd-rf button'), items = root.querySelectorAll('.kd-rc');
    chips.forEach(function (b) {
      b.addEventListener('click', function () {
        chips.forEach(function (x) { x.classList.toggle('on', x === b); });
        items.forEach(function (c) { c.hidden = b.dataset.f !== 'all' && c.dataset.r !== b.dataset.f; });
      });
    });
    root.querySelector('.kd-share').addEventListener('submit', function (e) {
      e.preventDefault();
      var f = e.target;
      var msg = 'Hi Cadpoint, my review for ' + course + '\nName: ' + f.elements.nm.value + '\nRating: ' + f.elements.rt.value + ' / 5\nReview: ' + f.elements.tx.value;
      window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg), '_blank');
    });
  }

  function start() { document.querySelectorAll('.kd-rv').forEach(render); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
