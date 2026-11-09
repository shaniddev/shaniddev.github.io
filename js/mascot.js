/*
 * Mascot — Shanid's photo avatar in the bottom-right corner. It leans gently
 * toward your cursor, floats while idle, greets once per session and opens
 * the AI Portfolio Guide (js/concierge.js) when clicked. On phones it sits
 * inline in the About section; at the top of the page it lives in the nav's
 * brand mark and flies to the corner as you scroll.
 *
 * Theme adapted from Afaque Jaya's MIT-licensed portfolio. Corner placement
 * and greeting behaviour originally adapted from page-mascot
 * (https://github.com/nilbuild/page-mascot, MIT):
 *   Copyright (c) 2026 Kamran Ahmed <https://kamran.fyi>
 *   Permission is hereby granted, free of charge, to any person obtaining a
 *   copy of this software and associated documentation files (the
 *   "Software"), to deal in the Software without restriction, including
 *   without limitation the rights to use, copy, modify, merge, publish,
 *   distribute, sublicense, and/or sell copies of the Software, and to permit
 *   persons to whom the Software is furnished to do so, subject to the
 *   following conditions: The above copyright notice and this permission
 *   notice shall be included in all copies or substantial portions of the
 *   Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
 */
(function () {
  'use strict';

  var AVATAR = 'img/profile/shanid-avatar.webp';
  var LEAN = 7;          // max degrees the photo leans toward the cursor
  var SHIFT = 4;         // max px it drifts toward the cursor
  var REACH = 520;       // cursor distance (CSS px) for a full lean
  var IDLE_MS = 3000;

  var reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
  var fineMQ = window.matchMedia('(hover: hover) and (pointer: fine)');
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }

  var pre = new Image();
  pre.onload = function () { mount(); };
  pre.src = AVATAR;

  function mount() {
    var root = document.createElement('div');
    root.className = 'mascot is-photo';
    root.innerHTML =
      '<button type="button" class="mascot-btn" aria-label="Chat with Shanid’s AI Portfolio Guide" aria-haspopup="dialog" aria-controls="concierge" aria-expanded="false">' +
        '<span class="mascot-disc" aria-hidden="true"></span>' +
        '<span class="mascot-body" aria-hidden="true"><span class="mascot-photo"><img src="' + AVATAR + '" alt="" width="256" height="256" draggable="false"></span></span>' +
        '<span class="mascot-live" aria-hidden="true"></span>' +
      '</button>' +
      '<span class="mascot-bubble" role="status" aria-live="polite"></span>';

    var btn = root.querySelector('.mascot-btn');
    var body = root.querySelector('.mascot-body');
    var photo = root.querySelector('.mascot-photo');
    var S = { calm: false };
    var timers = [];
    var offs = [];
    function listen(target, type, fn, opts) {
      target.addEventListener(type, fn, opts);
      offs.push(function () { target.removeEventListener(type, fn, opts); });
    }
    requestAnimationFrame(function () { root.classList.add('is-ready'); });

    /* ---- lean toward the cursor (mouse / pen only) ---- */
    var cur = { r: 0, x: 0, y: 0 }, tgt = { r: 0, x: 0, y: 0 }, loop = 0, idleTimer;
    function step() {
      var k = 0.12, moving = false;
      ['r', 'x', 'y'].forEach(function (p) {
        cur[p] += (tgt[p] - cur[p]) * k;
        if (Math.abs(tgt[p] - cur[p]) > 0.01) moving = true;
      });
      photo.style.transform = 'translate(' + cur.x.toFixed(2) + 'px,' + cur.y.toFixed(2) + 'px) rotate(' + cur.r.toFixed(2) + 'deg)';
      loop = moving ? requestAnimationFrame(step) : 0;
    }
    function kick() { if (!loop) loop = requestAnimationFrame(step); }
    function neutral() { tgt.r = tgt.x = tgt.y = 0; kick(); }
    function aim(x, y) {
      if (reduceMQ.matches) return;
      var b = btn.getBoundingClientRect();
      var dx = clamp((x - (b.left + b.width / 2)) / REACH, -1, 1);
      var dy = clamp((y - (b.top + b.height / 2)) / REACH, -1, 1);
      var calm = S.calm ? 0.35 : 1;
      tgt.r = dx * LEAN * calm; tgt.x = dx * SHIFT * calm; tgt.y = dy * SHIFT * calm;
      kick();
    }
    function onPointer(e) {
      if (e.pointerType === 'touch') return;
      aim(e.clientX, e.clientY);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(neutral, IDLE_MS);
    }
    listen(window, 'pointermove', onPointer, { passive: true });
    listen(document, 'mouseleave', neutral);
    listen(window, 'blur', neutral);
    listen(btn, 'pointerenter', function () { root.classList.add('is-near'); });
    listen(btn, 'pointerleave', function () { root.classList.remove('is-near'); });
    /* ---- click: open the AI Portfolio Guide (js/concierge.js) ---- */
    function clearTimers() { timers.forEach(clearTimeout); timers = []; }
    function later(fn, ms) { timers.push(setTimeout(fn, ms)); }

    listen(btn, 'click', function () {
      clearTimers();
      hush();
      // A quick nod acknowledges the click.
      if (!reduceMQ.matches && body.animate) {
        body.animate([{ transform: 'translateY(0) scale(1)' }, { transform: 'translateY(5%) scale(.96)' }, { transform: 'translateY(0) scale(1)' }], { duration: 380, easing: 'ease-out' });
      }
      if (window.Concierge) window.Concierge.toggle(btn);
    });

    // While the guide is open the avatar stays calm: eyes still follow, the head barely moves.
    listen(window, 'concierge:state', function (e) {
      var open = !!(e.detail && e.detail.open);
      S.calm = open;
      if (open) hush();
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) neutral();
    });

    /* ---- stay out of the way ---- */
    var hideReasons = {};
    function setHidden(reason, on) {
      if (on) hideReasons[reason] = true; else delete hideReasons[reason];
      applyHidden();
    }
    function applyHidden() {
      var hidden = !root.classList.contains('is-docked') && Object.keys(hideReasons).length > 0;
      root.classList.toggle('is-away', hidden);
      if (hidden) hush(false); else maybeGreet();
      btn.tabIndex = hidden ? -1 : 0;
    }

    /* ---- hello bubble ----
       The first time the avatar is settled and in view, a speech bubble says
       what it is and invites a question. It stays ~7s, goes away as soon as
       the visitor opens the guide, and shows once per browser session. */
    var bubble = root.querySelector('.mascot-bubble');
    var GREET_KEY = 'sh-guide-hello';
    var greeted = false, greetTimer = null, greetHide = null, inView = true;
    try { greeted = sessionStorage.getItem(GREET_KEY) === '1'; } catch (e) {}

    // Stop any pending or showing hello. done=true: never show it again this session.
    function hush(done) {
      clearTimeout(greetTimer); clearTimeout(greetHide); greetTimer = greetHide = null;
      root.classList.remove('is-talking');
      if (done !== false) {
        greeted = true;
        try { sessionStorage.setItem(GREET_KEY, '1'); } catch (e) {}
      }
    }
    function canGreet() { return !greeted && !S.calm && inView && !root.classList.contains('is-away'); }
    function greet() {
      if (!canGreet()) return;
      greeted = true;
      try { sessionStorage.setItem(GREET_KEY, '1'); } catch (e) {}
      bubble.innerHTML =
        '<b>Hi, I’m Shanid’s AI guide 👋</b>' +
        '<span>Ask me anything — his platforms, stack, experience or availability.</span>' +
        '<small>Tap to chat</small>';
      void bubble.offsetWidth; // it was display:none while empty — let the fade-in run
      root.classList.add('is-talking');
      greetHide = setTimeout(function () { root.classList.remove('is-talking'); }, 7000);
    }
    function maybeGreet() {
      if (greetTimer || !canGreet()) return;
      greetTimer = setTimeout(function () { greetTimer = null; greet(); }, 1400);
    }
    // The bubble opens the guide too.
    listen(bubble, 'click', function () { btn.click(); });
    // Docked in the About section on phones: wait until it has scrolled into view.
    if ('IntersectionObserver' in window) {
      inView = false;
      var seeMe = new IntersectionObserver(function (entries) {
        inView = entries.some(function (en) { return en.isIntersecting; });
        if (inView) maybeGreet(); else if (!greeted) hush(false);
      }, { threshold: 0.6 });
      seeMe.observe(root);
      offs.push(function () { seeMe.disconnect(); });
    }

    // Below 760px the mascot sits inline in the About section instead of floating
    // over text; above that it floats bottom-right.
    var dock = document.querySelector('.mascot-dock');
    var smallMQ = window.matchMedia('(max-width: 760px)');
    function place() {
      var docked = !!(dock && smallMQ.matches);
      root.classList.toggle('is-docked', docked);
      (docked ? dock : document.body).appendChild(root);
      applyHidden();
    }
    place();
    smallMQ.addEventListener && smallMQ.addEventListener('change', place);

    /* ---- lives in the nav at the top, flies to the corner on scroll ---- */
    // The avatar sits in the nav's brand mark while the page is at the top.
    // Scrolling down launches it along an arc (with a motion trail) to the
    // bottom-right corner; scrolling back to the top flies it home.
    var brandMark = document.querySelector('.brand-mark');
    var brandAv = null;
    // Same head-and-chest image as the corner mascot.
    function headBg(el, size) {
      el.style.backgroundImage = 'url("' + AVATAR + '")';
      el.style.backgroundSize = 'cover';
      el.style.backgroundPosition = '50% 20%';
    }
    if (brandMark) {
      brandAv = document.createElement('span');
      brandAv.className = 'brand-avatar';
      brandAv.setAttribute('aria-hidden', 'true');
      brandMark.appendChild(brandAv);
      brandMark.classList.add('has-avatar');
      headBg(brandAv, brandMark.offsetWidth || 36);
    }
    var TOP_LIMIT = 160;
    var atTop = window.scrollY < TOP_LIMIT;
    var flight = null;

    function floating() { return !root.classList.contains('is-docked'); }
    function setBrand(home) { if (brandMark) brandMark.classList.toggle('avatar-away', !home); }
    function instant(fn) {
      root.classList.add('no-trans');
      fn();
      void root.offsetWidth;
      root.classList.remove('no-trans');
    }
    // The corner position, from layout (ignores the hidden state's transform).
    function cornerRect() {
      var b = btn.getBoundingClientRect();
      var t = getComputedStyle(root).transform;
      var dy = 0;
      if (t && t !== 'none') { var m = t.match(/matrix\(([^)]+)\)/); if (m) dy = parseFloat(m[1].split(',')[5]) || 0; }
      return { left: b.left, top: b.top - dy, width: b.width, height: b.height };
    }
    function fly(down) {
      if (flight) flight.finish();
      var from = down ? brandMark.getBoundingClientRect() : cornerRect();
      var to = down ? cornerRect() : brandMark.getBoundingClientRect();
      var size = from.width;
      var endScale = to.width / size;
      // Quadratic Bézier: drop down the left side first, then sweep right.
      var p0 = { x: from.left, y: from.top };
      var p2 = { x: to.left + (to.width - size) / 2, y: to.top + (to.height - size) / 2 };
      var c = down ? { x: p0.x + (p2.x - p0.x) * 0.08, y: p2.y + 40 } : { x: p2.x + (p0.x - p2.x) * 0.08, y: p0.y + 40 };
      var frames = [];
      for (var i = 0; i <= 12; i++) {
        var t = i / 12, u = 1 - t;
        var x = u * u * p0.x + 2 * u * t * c.x + t * t * p2.x;
        var y = u * u * p0.y + 2 * u * t * c.y + t * t * p2.y;
        var sc = (down ? (1 + (endScale - 1) * t) : ((to.width / size) * t + (1 - t))) * (1 + Math.sin(Math.PI * t) * 0.45);
        var rot = (down ? 1 : -1) * 360 * (t * t * (3 - 2 * t));
        frames.push({ transform: 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px) scale(' + sc.toFixed(3) + ') rotate(' + rot.toFixed(1) + 'deg)', offset: t });
      }
      var made = [];
      var anims = [0, 1, 2].map(function (k) {
        var f = document.createElement('div');
        f.className = 'mascot-flyer' + (k ? ' ghost' : '');
        f.style.width = f.style.height = size + 'px';
        headBg(f, size);
        if (k) f.style.opacity = String(0.38 - k * 0.14);
        document.body.appendChild(f);
        made.push(f);
        return f.animate(frames, { duration: 1050, delay: k * 55, easing: 'cubic-bezier(.6,0,.3,1)', fill: 'both' });
      });
      if (down) setBrand(false); else instant(function () { setHidden('top', true); });
      var done = false;
      function land() {
        if (done) return;
        done = true;
        made.forEach(function (f) { f.remove(); });
        flight = null;
        if (down) {
          instant(function () { setHidden('top', false); });
          if (!root.classList.contains('is-away') && btn.animate) {
            btn.animate([{ transform: 'scale(.7)' }, { transform: 'scale(1.14)' }, { transform: 'scale(1)' }], { duration: 420, easing: 'ease-out' });
          }
        } else {
          setBrand(true);
          if (brandAv && brandAv.animate) brandAv.animate([{ transform: 'scale(.6)' }, { transform: 'scale(1.15)' }, { transform: 'scale(1)' }], { duration: 380, easing: 'ease-out' });
        }
      }
      anims[0].onfinish = land;
      flight = { finish: function () { anims.forEach(function (a) { try { a.finish(); } catch (e) {} }); land(); } };
    }
    function syncTop(animate) {
      if (!floating()) { setBrand(true); setHidden('top', false); return; }
      if (animate && !reduceMQ.matches && brandMark && document.body.animate) { fly(!atTop); return; }
      setBrand(atTop);
      instant(function () { setHidden('top', atTop); });
    }
    syncTop(false);
    window.addEventListener('scroll', function () {
      var now = window.scrollY < TOP_LIMIT;
      if (now === atTop) return;
      atTop = now;
      syncTop(true);
    }, { passive: true });
    smallMQ.addEventListener && smallMQ.addEventListener('change', function () { syncTop(false); });

    // Hide near the contact links (bottom-right content) and while the mobile menu is open.
    // ...and over the "work with me" cards, so it never covers the payment or contact buttons.
    var avoidEls = [].slice.call(document.querySelectorAll('.contact-links, .engage'));
    if (avoidEls.length && 'IntersectionObserver' in window) {
      var seen = {};
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { seen[avoidEls.indexOf(en.target)] = en.isIntersecting; });
        setHidden('contact', Object.keys(seen).some(function (k) { return seen[k]; }));
      }, { rootMargin: '0px 0px 40px 0px' });
      avoidEls.forEach(function (el) { io.observe(el); });
    }
    new MutationObserver(function () {
      setHidden('menu', document.documentElement.classList.contains('menu-open'));
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // On larger touch screens (tablets), tuck away while scrolling so it never sits on top of what you're reading.
    var scrollTimer;
    window.addEventListener('scroll', function () {
      if (fineMQ.matches) return;
      setHidden('scrolling', true);
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(function () { setHidden('scrolling', false); }, 700);
    }, { passive: true });
  }
})();
