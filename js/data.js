/*
 * Portfolio content that changes most often.
 * js/main.js renders the app index, the "More shipped" list, the app chips on
 * the experience timeline and the logo strip from this file.
 *
 * `featured` is empty on purpose: the product cards in #work are written by
 * hand in index.html (concept previews with logos). To add a card with real
 * store screenshots, add an entry here — see the theme's original README for
 * the schema (id, name, kind, accent, icon, summary, problem, role, tags,
 * metric, links, screens).
 */
window.PORTFOLIO = {
  // Where the "Explore All Projects" button opens (in a new tab).
  showcaseUrl: 'projects/',

  featured: [],

  more: [
    { id: 'soug', featuredElsewhere: true, name: 'Soug', line: 'Qatar marketplace on one Laravel core.', icon: 'img/logos/soug.webp', where: 'Client project · Doha' },
    { id: 'mzadat', featuredElsewhere: true, name: 'Platinum Mzadat', line: 'Online auction platform.', monogram: 'PM', where: 'Platinum Mzadat · Doha' },
    { id: 'jeeb', featuredElsewhere: true, name: 'Jeeb', line: 'Grocery delivery in Qatar.', icon: 'img/logos/jeeb-icon.webp', where: 'Jeeb Technologies · Qatar' },
    { id: 'pass', featuredElsewhere: true, name: 'Pass Delivery', line: 'Delivery platform in Qatar.', icon: 'img/logos/pass-icon.webp', where: 'Pass Delivery · Qatar' },
    { id: 'pickride', featuredElsewhere: true, name: 'Pick & Ride', line: 'Dockless bicycle sharing.', icon: 'img/logos/pick-and-ride.webp', where: 'Boost · Qatar' },
    { id: 'taskmario', featuredElsewhere: true, name: 'Taskmario', line: 'Book home services.', monogram: 'T', where: 'Product' },
    {
      id: 'noogah',
      name: 'Noogah',
      line: '[One line: what it does and what you built.]',
      icon: 'img/logos/noogah.webp',
      where: '[Company · City]'
    },
    {
      id: 'tottlabs',
      name: 'TottLabs',
      line: '[One line: what it does and what you built.]',
      monogram: 'TL',
      where: '[Company · City]'
    }
  ],

  // Logo strip under the hero. `img` = the company's / product's own logo;
  // `tile` puts a light-on-dark logo on a solid chip; without `img`, a text
  // tile is shown.
  logos: [
    { name: 'Platinum Mzadat', caption: 'Employer · Doha · auctions', mono: 'PM', color: '#b8892b', url: '#app-mzadat' },
    { name: 'Pass Delivery', caption: 'Employer · Qatar', img: 'img/logos/pass.webp', wide: true, url: '#app-pass' },
    { name: 'Jeeb', caption: 'Employer · Qatar', img: 'img/logos/jeeb.webp', wide: true, url: '#app-jeeb' },
    { name: 'Soug', caption: 'Product · Qatar marketplace', img: 'img/logos/soug.webp', square: true, url: '#app-soug' },
    { name: 'Pick & Ride', caption: 'Product · bike sharing', img: 'img/logos/pick-and-ride.webp', square: true, url: '#app-pickride' },
    { name: 'Taskmario', caption: 'Product · home services', img: 'img/logos/taskmario.webp', wide: true, url: '#app-taskmario' },
    { name: 'Noogah', caption: 'Product', img: 'img/logos/noogah.webp', square: true },
    { name: 'TottLabs', caption: 'Product', img: 'img/logos/tottlabs.webp', tile: '#121110' },
    { name: 'Boost', caption: 'Employer · Qatar', mono: 'Boost', color: '#3f86ef', url: '#role-boost' },
    { name: 'WebCastle Technologies', caption: 'Employer · Dubai', mono: 'WC', color: '#121110', url: '#role-webcastle' },
    { name: 'Datacube Software', caption: 'Employer · India', mono: 'DC', color: '#2f6fb0', url: '#role-datacube' }
  ]
};
