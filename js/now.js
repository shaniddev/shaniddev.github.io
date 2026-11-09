/*
 * The "Now" section — what I'm building and learning at the moment.
 * Edit this file (not index.html); js/main.js renders it into #now-root and
 * shows `updated` next to the section lead.
 *
 * Bracketed text like [this] is a placeholder — replace it with your own
 * details. Screenshots marked "Placeholder" should be swapped for real ones.
 */
window.NOW = {
  updated: 'Nov 2026',

  building: [
    {
      name: 'Platinum Mzadat',
      status: 'In production · current role',
      spotlight: true,
      what: 'The online auction platform behind the public auctions Platinum Mzadat runs for Qatar’s Supreme Judicial Council and the Ministry of Municipality.',
      progress: '[What is live now — e.g. bidding, registrations, payments, admin.]',
      next: '[The next milestone you are working towards.]',
      stats: [
        { value: '2', label: 'public-sector clients' },
        { value: '[N]', label: 'auctions run' },
        { value: '[N]', label: 'registered bidders' }
      ],
      tags: ['Laravel', 'PHP', 'MySQL', 'Redis', 'WebSockets'],
      frame: 'web',
      address: 'platinum-mzadat · admin',
      shotsNote: 'Placeholder · add a real screenshot',
      shots: [
        { src: 'img/projects/mzadat-platform.svg', w: 1280, h: 800, caption: 'Placeholder — replace with a screenshot of the platform', alt: 'Placeholder dashboard illustration for the Platinum Mzadat platform' }
      ],
      links: [{ label: 'Case study', url: 'projects/project.html?id=platinum-mzadat' }]
    },
    {
      name: 'Soug',
      status: 'Live',
      what: 'A Qatar marketplace for properties, cars, plates, phone numbers, businesses and classifieds — five surfaces on one Laravel core.',
      progress: 'Admin, company and agent portals and the classifieds API for the Flutter app are live.',
      next: '[Next feature on Soug.]',
      tags: ['Laravel', 'PHP', 'MySQL', 'REST APIs', 'Flutter (API side)'],
      frame: 'web',
      address: 'soug · admin panel',
      shotsNote: 'Placeholder · add a real screenshot',
      shots: [
        { src: 'img/projects/soug-admin.svg', w: 1280, h: 800, caption: 'Placeholder — replace with a screenshot of the Soug admin', alt: 'Placeholder dashboard illustration for the Soug admin panel' }
      ],
      links: [{ label: 'Case study', url: 'projects/project.html?id=soug' }]
    }
  ],

  learning: [
    {
      name: 'Python & Django in production',
      when: '2026',
      current: true,
      tech: ['Python', 'Django', 'Celery', 'PostgreSQL'],
      learning: 'Building services in Django alongside Laravel — ORM, background jobs with Celery and PostgreSQL.',
      status: '[Where you are with it.]'
    },
    {
      name: 'Real-time with Laravel Reverb',
      when: '2026',
      tech: ['Laravel Reverb', 'WebSockets', 'Redis'],
      learning: 'Live bidding updates and notifications over WebSockets.',
      status: '[Where you are with it.]'
    },
    {
      name: 'Containers & CI',
      when: '2026',
      tech: ['Docker', 'GitHub Actions', 'Nginx'],
      learning: 'Repeatable builds and deploys for Laravel apps.',
      status: '[Where you are with it.]'
    }
  ],

  focus: {
    statement: 'Building reliable platforms for auctions and marketplaces in Qatar — clean APIs, solid data models and backends that hold up as the product grows.',
    milestone: { project: 'Platinum Mzadat', text: '[Your next milestone.]' }
  }
};
