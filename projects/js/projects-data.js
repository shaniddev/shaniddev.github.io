// @ts-check
/**
 * The project catalog. Every page of the showcase is rendered from this file.
 *
 * To add a project: append an object to PROJECTS (only the fields marked
 * required are needed), drop its images in /img/projects/<id>/, done.
 *
 * Ground rules for content (keep them when editing):
 *  - Only claims backed by the CV PDF or the project itself. Metrics carry a
 *    `source`.
 *  - Mark limits honestly: `planned` features, `notes` callouts, `status`.
 *  - No secrets, customer data, private repo links or employer internals.
 *
 * Sources: files/Shanid-Senior-Software-Engineer-CV.pdf and the portfolio
 * itself. Text in [brackets] is a placeholder — replace it with your details.
 *
 * Image paths are relative to the portfolio root (they resolve through
 * SITE.assetBase in config.js), so the main site and the showcase share one
 * copy of each file.
 */

/**
 * @typedef {'mobile'|'web'|'saas'|'ai'|'agents'|'backend'|'experiments'} CategoryId
 * @typedef {'live'|'shipped'|'in-development'|'prototype'|'learning'} Status
 * @typedef {'public'|'private'|'internal'|'client'} Visibility
 *
 * @typedef {Object} Image
 * @property {string} src            Path from the portfolio root
 * @property {number} w
 * @property {number} h
 * @property {string} alt
 * @property {'phone'|'web'|'logo'|'panel'|'art'} [frame]  How to present it (default: phone if portrait, web if landscape)
 *                                  'art' = a full-bleed 16:10 composition (already includes its own devices)
 * @property {boolean} [illustrative] Concept artwork, not a screenshot — labelled as such wherever it is shown
 * @property {string} [caption]
 *
 * @typedef {Object} Link
 * @property {'live'|'play'|'ios'|'github'|'video'|'code'|'case'|'web'} type
 * @property {string} url
 * @property {string} [label]
 * @property {string} [note]         e.g. "sign-in required"
 *
 * @typedef {Object} Feature
 * @property {string} title
 * @property {string} [detail]
 * @property {boolean} [planned]     Not built yet — rendered with a "Planned" tag
 *
 * @typedef {Object} ArchNode
 * @property {string} title
 * @property {string} [detail]
 * @property {boolean} [hot]         Highlight the node that carries the interesting logic
 *
 * @typedef {Object} Architecture
 * @property {string} [summary]
 * @property {ArchNode[]} flow
 * @property {string[]} [guards]     Safety boundaries / guarantees shown under the flow
 * @property {string} [caption]
 *
 * @typedef {Object} AgentProfile   For AI-agent projects
 * @property {string} objective
 * @property {string} input          How it receives a task
 * @property {string} reasoning      How it chooses an action
 * @property {string[]} tools
 * @property {string} execution      How execution and results are handled
 * @property {string} safety         Human approval and safety boundaries
 * @property {string} models         Local vs cloud model strategy
 *
 * @typedef {Object} Metric
 * @property {string} value
 * @property {string} label
 * @property {string} [source]
 *
 * @typedef {Object} Challenge
 * @property {string} title
 * @property {string} detail
 * @property {string} [resolution]
 *
 * @typedef {Object} Decision        Decision → why → benefit → trade-off
 * @property {string} title          The technology or approach chosen
 * @property {string} detail         What it is, in one line
 * @property {string} [why]          The requirement, problem or constraint that motivated it
 * @property {string} [benefit]      The practical effect (performance, maintainability, security, cost, speed)
 * @property {string} [tradeoff]     What it cost or where its limits are
 *
 * @typedef {Object} Project
 * @property {string} id                       required — also the URL slug
 * @property {string} title                    required
 * @property {string} tagline                  required — one-line value proposition
 * @property {CategoryId[]} categories         required — first one is the primary label
 * @property {Status} status                   required
 * @property {string[]} technologies           required
 * @property {string} [summary]                Short problem/solution line for cards
 * @property {string} [description]            Overview paragraph(s), split on blank lines
 * @property {string} [period]                 e.g. "2024 – 2026"
 * @property {string} [context]                Where it was built (employer, hackathon, personal)
 * @property {string[]} [platforms]
 * @property {Visibility} [visibility]
 * @property {number} [featured]               Order in the Featured section (lower first)
 * @property {string} [accent]                 Hex colour for the project's glow
 * @property {string} [icon]
 * @property {Image} [thumbnail]
 * @property {Image[]} [screenshots]
 * @property {string} [screenshotsNote]
 * @property {string} [problem]
 * @property {string} [solution]
 * @property {Feature[]} [features]
 * @property {string[]} [role]
 * @property {Architecture} [architecture]
 * @property {AgentProfile} [agent]
 * @property {Record<string, string[]>} [stack] Grouped technology stack for the detail page
 * @property {Challenge[]} [challenges]
 * @property {Decision[]} [decisions]
 * @property {Metric[]} [impact]
 * @property {string} [impactNote]
 * @property {Link[]} [links]
 * @property {string[]} [notes]                Honesty callouts shown on the detail page
 * @property {string[]} [related]              Project ids; otherwise computed
 */

/** @type {Project[]} */
export const PROJECTS = [
  {
    id: 'soug',
    title: 'Soug',
    tagline: 'A Qatar marketplace for every kind of seller — five surfaces on one Laravel core.',
    categories: ['web', 'backend', 'mobile'],
    status: 'live',
    visibility: 'client',
    featured: 1,
    accent: '#3fa6e8',
    period: '[YEAR] – now',
    context: 'Client project · Laravel Developer',
    platforms: ['Web', 'Android', 'iOS (Flutter app)'],
    technologies: ['Laravel', 'PHP', 'MySQL', 'REST APIs', 'jQuery', 'Bootstrap'],
    icon: 'img/logos/soug.webp',
    thumbnail: { src: 'img/projects/soug-admin.svg', w: 1280, h: 800, frame: 'web', illustrative: true, alt: 'Placeholder illustration of the Soug admin dashboard' },
    screenshotsNote: 'Placeholder illustration — real screenshots to come.',
    summary: 'Properties, cars, plates, phone numbers, businesses and classifieds — sold by companies, agents and individuals — on one platform with an API for the Flutter app.',
    description:
      'Soug is a multi-vendor marketplace in Qatar with six listing categories: properties, cars, number plates, phone numbers, businesses and classifieds.\n\n' +
      'One Laravel core serves five surfaces — the admin panel, a company portal, an agent portal, a classifieds API and the Flutter app — so a new category or field ships once and appears everywhere.',
    problem: 'Very different things, sold by very different sellers, all needing listings, search and dashboards — on the web and in a mobile app.',
    solution: 'A single Laravel codebase with shared models, rules and permissions, and a separate portal per seller type on top of it.',
    features: [
      { title: 'Company, agent & admin portals', detail: 'Each business type gets its own dashboard.' },
      { title: 'Cars, plates & phone numbers', detail: 'Full listing CRUD with category attributes.' },
      { title: 'Classifieds API', detail: 'REST endpoints for the Flutter app and partners.' },
      { title: '171 Qatar zones', detail: 'Arabic names, slugs and coordinates, enriched to neighbourhood level.' },
      { title: 'Revenue reports & recycle bin', detail: 'Reporting across sellers; soft deletes with restore.' }
    ],
    role: ['Backend architecture and data model', 'Admin, company and agent portals', 'Classifieds API for the mobile app'],
    architecture: {
      summary: 'Five surfaces on one core.',
      flow: [
        { title: 'Admin panel', detail: 'Categories, agents, revenue' },
        { title: 'Company & agent portals', detail: 'Per seller type' },
        { title: 'Laravel core', detail: 'Models, rules, permissions', hot: true },
        { title: 'Classifieds API', detail: 'Versioned REST' },
        { title: 'Flutter app', detail: 'Buyers & sellers' }
      ],
      caption: 'Simplified for illustration.'
    },
    stack: { 'Backend': ['Laravel', 'PHP', 'Eloquent ORM'], 'Data': ['MySQL'], 'Web': ['jQuery', 'Bootstrap'], 'API': ['REST APIs'] },
    impact: [
      { value: '5', label: 'surfaces on one Laravel core', source: 'Platform architecture' },
      { value: '6', label: 'listing categories', source: 'Live categories' },
      { value: '171', label: 'Qatar zones mapped', source: 'Seeded zone dataset' }
    ],
    notes: ['The thumbnail is a placeholder illustration, not a screenshot.'],
    related: ['platinum-mzadat', 'jeeb', 'taskmario']
  },

  {
    id: 'platinum-mzadat',
    title: 'Platinum Mzadat',
    tagline: 'The online auction platform behind public auctions in Qatar.',
    categories: ['web', 'backend'],
    status: 'live',
    visibility: 'internal',
    featured: 2,
    accent: '#b8892b',
    period: '[YYYY] – now',
    context: 'Platinum Mzadat · Doha',
    platforms: ['Web'],
    technologies: ['Laravel', 'PHP', 'MySQL', 'Redis', 'WebSockets'],
    thumbnail: { src: 'img/projects/mzadat-platform.svg', w: 1280, h: 800, frame: 'web', illustrative: true, alt: 'Placeholder illustration of the Platinum Mzadat auction platform' },
    summary: 'Platinum Mzadat runs auctions for Qatar’s Supreme Judicial Council and the Ministry of Municipality; this is the platform behind them.',
    description:
      'Platinum Mzadat is an auction company managing public auctions for Qatar’s Supreme Judicial Council and the Ministry of Municipality.\n\n' +
      '[Describe what you own on the platform — bidding engine, registrations and deposits, payments, admin and reporting.]',
    features: [
      { title: '[Bidding engine]', detail: '[What you built]' },
      { title: '[Bidder registration & deposits]', detail: '[What you built]' },
      { title: '[Admin & reporting]', detail: '[What you built]' }
    ],
    role: ['[Your role and responsibilities]'],
    stack: { 'Backend': ['Laravel', 'PHP'], 'Data': ['MySQL', 'Redis'], 'Real-time': ['WebSockets'] },
    notes: ['Details in [brackets] are placeholders.'],
    related: ['soug', 'pass-delivery']
  },

  {
    id: 'jeeb',
    title: 'Jeeb',
    tagline: 'Backend systems and APIs for grocery delivery in Qatar.',
    categories: ['backend', 'mobile', 'web'],
    status: 'shipped',
    visibility: 'internal',
    featured: 3,
    accent: '#3f86ef',
    period: 'Mar 2023 – [YYYY]',
    context: 'Jeeb Technologies · Senior Software Engineer',
    platforms: ['Web', 'Android', 'iOS'],
    technologies: ['Laravel', 'PHP', 'Python', 'MySQL', 'REST APIs'],
    icon: 'img/logos/jeeb-icon.webp',
    thumbnail: { src: 'img/logos/jeeb-shanid.webp', w: 1920, h: 1080, frame: 'logo', alt: 'Jeeb logo' },
    summary: 'Planned, built and managed web, mobile and enterprise apps — and led backend development.',
    description:
      'At Jeeb Technologies I planned, developed and managed web, mobile and enterprise applications. Based on performance I was given technical-lead responsibility for backend development.\n\n' +
      'I designed scalable backend systems with cross-functional teams, built documented, secure APIs for the front-end and mobile apps, mentored junior backend engineers and worked with QA on reliability.',
    role: ['Backend architecture', 'API design and documentation', 'Technical lead for backend', 'Mentoring junior engineers'],
    stack: { 'Backend': ['Laravel', 'PHP', 'Python'], 'Data': ['MySQL'], 'API': ['REST APIs'] },
    related: ['pass-delivery', 'soug']
  },

  {
    id: 'pass-delivery',
    title: 'Pass Delivery',
    tagline: 'On-demand delivery in Qatar — Technical Lead for software engineering.',
    categories: ['backend', 'mobile'],
    status: 'shipped',
    visibility: 'internal',
    featured: 4,
    accent: '#1cc4cc',
    period: '[YYYY] – [YYYY]',
    context: 'Pass Delivery · Technical Lead',
    platforms: ['Android', 'iOS', 'Web'],
    technologies: ['Laravel', 'PHP', 'MySQL', 'Redis', 'AWS'],
    icon: 'img/logos/pass-icon.webp',
    thumbnail: { src: 'img/logos/pass.webp', w: 191, h: 80, frame: 'logo', alt: 'Pass logo' },
    summary: 'Led software engineering for Pass, a delivery platform in Qatar.',
    description: 'Technical Lead · Software Engineer at Pass Delivery.\n\n[Add what you owned — team size, apps and systems you led, results.]',
    role: ['Technical leadership', '[More responsibilities]'],
    notes: ['Details in [brackets] are placeholders.'],
    related: ['jeeb', 'pick-and-ride']
  },

  {
    id: 'pick-and-ride',
    title: 'Pick & Ride',
    tagline: 'Dockless bicycle sharing — the rider app and the backend that runs the fleet.',
    categories: ['mobile', 'backend'],
    status: 'shipped',
    visibility: 'client',
    accent: '#3aa564',
    period: '2021 – 2023',
    context: 'Boost (Creative Marketing Agency) · Qatar',
    platforms: ['Android', 'iOS'],
    technologies: ['Laravel', 'PHP', 'MySQL', 'REST APIs'],
    icon: 'img/logos/pick-and-ride.webp',
    thumbnail: { src: 'img/logos/pick-and-ride.webp', w: 1080, h: 1080, frame: 'logo', alt: 'Pick & Ride logo' },
    summary: 'Find a bike nearby, unlock it from your phone, ride and pay.',
    features: [
      { title: 'Rider accounts & trips' },
      { title: 'Unlock, time and end a ride' },
      { title: 'Payments per ride' },
      { title: 'Fleet admin for bikes and zones' }
    ],
    role: ['Delivered end to end at Boost'],
    related: ['taskmario', 'pass-delivery']
  },

  {
    id: 'taskmario',
    title: 'Taskmario',
    tagline: 'Book home services — the booking flow and provider management behind it.',
    categories: ['web', 'backend'],
    status: 'shipped',
    visibility: 'client',
    accent: '#0a8be6',
    period: '[YEAR]',
    context: '[Company]',
    technologies: ['Laravel', 'PHP', 'MySQL'],
    thumbnail: { src: 'img/logos/taskmario.webp', w: 378, h: 71, frame: 'logo', alt: 'Taskmario logo' },
    summary: 'Customers book home services; providers manage their jobs.',
    notes: ['Details in [brackets] are placeholders.'],
    related: ['pick-and-ride', 'soug']
  },

  {
    id: 'noogah',
    title: 'Noogah',
    tagline: '[One line: what it does.]',
    categories: ['web'],
    status: 'shipped',
    visibility: 'client',
    accent: '#d11b1b',
    period: '[YEAR]',
    context: '[Company]',
    technologies: ['Laravel', 'PHP'],
    thumbnail: { src: 'img/logos/noogah.webp', w: 480, h: 480, frame: 'logo', alt: 'Noogah logo' },
    summary: '[One line: what you built.]',
    notes: ['Details in [brackets] are placeholders.'],
    related: ['tottlabs']
  },

  {
    id: 'tottlabs',
    title: 'TottLabs',
    tagline: '[One line: what it does.]',
    categories: ['web'],
    status: 'shipped',
    visibility: 'client',
    accent: '#c01818',
    period: '[YEAR]',
    context: '[Company]',
    technologies: ['Laravel', 'PHP'],
    summary: '[One line: what you built.]',
    notes: ['Details in [brackets] are placeholders.'],
    related: ['noogah']
  }
];
