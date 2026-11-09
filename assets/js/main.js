// Shanid portfolio — small interactions, no dependencies.
(function () {
  // Flip the developer ID card
  var card = document.querySelector('button[aria-label="Flip the ID card"]');
  if (card) {
    var inner = card.firstElementChild, flipped = false;
    card.addEventListener('click', function () {
      flipped = !flipped;
      inner.style.transform = flipped ? 'rotateY(180deg)' : 'rotateY(0deg)';
    });
  }

  // Case-study tabs
  var casePanels = document.querySelectorAll('[data-case-panel]');
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-case-tab]');
    if (!t) return;
    var i = t.getAttribute('data-case-tab');
    casePanels.forEach(function (p) { p.hidden = p.getAttribute('data-case-panel') !== i; });
    var shown = document.querySelector('[data-case-panel="' + i + '"] [data-case-tab="' + i + '"]');
    if (shown) shown.focus({ preventScroll: true });
  });

  // Recruiter "ask an AI" question chips
  var aiPanels = document.querySelectorAll('[data-ai-panel]');
  document.addEventListener('click', function (e) {
    var q = e.target.closest('[data-ai-q]');
    if (!q) return;
    var i = q.getAttribute('data-ai-q');
    aiPanels.forEach(function (p) { p.hidden = p.getAttribute('data-ai-panel') !== i; });
  });

  // Copy email
  document.querySelectorAll('[data-copy-email]').forEach(function (b) {
    b.addEventListener('click', function () {
      var email = b.getAttribute('data-copy-email');
      var done = function () { var t = b.textContent; b.textContent = 'Copied ✓'; setTimeout(function () { b.textContent = t; }, 1600); };
      if (navigator.clipboard) navigator.clipboard.writeText(email).then(done, function () { window.location.href = 'mailto:' + email; });
      else window.location.href = 'mailto:' + email;
    });
  });

  // Highlight the nav pill for the section in view
  var links = Array.prototype.slice.call(document.querySelectorAll('.navlinks a'));
  var map = {};
  links.forEach(function (a) { var id = a.getAttribute('href').slice(1); var s = document.getElementById(id); if (s) map[id] = a; });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (a) { a.classList.remove('active'); });
          var a = map[en.target.id]; if (a) a.classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) { io.observe(document.getElementById(id)); });
  }
})();
