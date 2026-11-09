/*
 * Analytics hook — intentionally a no-op.
 *
 * js/concierge.js reports events through window.PortfolioTrack. No tracker is
 * loaded on this site, so nothing is collected or sent. To add privacy-friendly
 * analytics later (e.g. Umami or Plausible), load its script in index.html and
 * forward events from here.
 */
(function () {
  'use strict';
  window.PortfolioTrack = function () { /* no analytics configured */ };
})();
