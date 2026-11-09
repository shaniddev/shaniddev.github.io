/*
 * AI Portfolio Guide — knowledge base for Shanid's portfolio.
 *
 * Every fact here comes from this site (index.html, js/data.js) or the CV
 * (files/Shanid-Senior-Software-Engineer-CV.pdf). Answers are deterministic:
 * js/concierge.js matches a visitor's question to an intent below and shows
 * its answer. Nothing is generated, so nothing can be invented.
 *
 * Rules for editing:
 *  - Only state what the CV or portfolio shows. If something isn't
 *    documented yet, say so (or mark the intent kind: 'approach').
 *  - Navigation is limited to the `sections` and `links` tables.
 *
 * Intent fields:
 *   q        question text shown on chips
 *   keys     matching terms; '^term' = strong signal, 'two words' = phrase
 *   answer   paragraphs (2–5 sentences in total)
 *   points   optional short bullets; [text, sectionKey] makes a clickable reference
 *   actions  buttons: { nav: sectionKey } scrolls the page, { link: linkKey } opens an allowlisted URL
 *   detail   optional "Explain in more detail" paragraphs/bullets
 *   next     related intent ids offered afterwards (2–3 are shown)
 *   kind     'verified' (default) or 'approach'
 */
window.CONCIERGE_DATA = {
  config: {
    // Optional server-side AI endpoint. GitHub Pages is static, so this stays
    // empty unless a serverless function is deployed.
    // Contract: POST { question: string } → 200 { answer: string }.
    aiEndpoint: '',
    aiTimeoutMs: 9000,
    maxInput: 300
  },

  welcome:
    'Hi! I’m Shanid’s AI Portfolio Guide. 👋\nExplore his backend engineering experience, the platforms he has shipped in Qatar and the UAE, or ask why he could be a great fit for your team.',
  starters: ['hire', 'built', 'stack', 'fit'],

  // ---------------------------------------------------------------- navigation allowlist
  sections: {
    home:       { id: 'top',             label: 'Back to the top',            note: 'The introduction: role, years of experience and headline numbers.' },
    askai:      { id: 'ask-ai',          label: 'Ask ChatGPT, Gemini or Claude', note: 'This card sends a question plus his résumé summary to the AI of your choice.' },
    apps:       { id: 'work',            label: 'Explore Products & Platforms', note: 'The marketplaces, auction, delivery and mobility platforms he has built, with his part in each.' },
    soug:       { id: 'app-soug',        label: 'Open Soug',                  note: 'Soug — a Qatar marketplace on one Laravel core: admin, company and agent portals plus the classifieds API.', thumb: 'img/logos/soug.webp' },
    mzadat:     { id: 'app-mzadat',      label: 'Open Platinum Mzadat',       note: 'Platinum Mzadat — the online auction platform behind public auctions in Qatar.' },
    jeeb:       { id: 'app-jeeb',        label: 'Open Jeeb',                  note: 'Jeeb — grocery delivery in Qatar; he designed its backend systems and APIs.', thumb: 'img/logos/jeeb-icon.webp' },
    pass:       { id: 'app-pass',        label: 'Open Pass Delivery',         note: 'Pass Delivery — the Qatar delivery platform where he was Technical Lead.', thumb: 'img/logos/pass-icon.webp' },
    pickride:   { id: 'app-pickride',    label: 'Open Pick & Ride',           note: 'Pick & Ride — a dockless bicycle-sharing app and backend, shipped at Boost.', thumb: 'img/logos/pick-and-ride.webp' },
    taskmario:  { id: 'app-taskmario',   label: 'Open Taskmario',             note: 'Taskmario — book home services: customer booking flow and provider management.' },
    moreapps:   { id: 'more-shipped',    label: 'More shipped products',      note: 'More products from the same teams.' },
    builds:     { id: 'builds',          label: 'Explore the builds',         note: 'How the platforms are put together: admin panels, portals, APIs, queues and real-time pieces.' },
    sougAdmin:  { id: 'build-soug',      label: 'View the Soug admin',        note: 'The Soug admin panel: listings, categories, agents, revenue reports and a recycle bin.', next: 'architecture' },
    arch:       { id: 'build-arch',      label: 'View the Soug architecture', note: 'Five surfaces on one Laravel core: admin, company portal, agent portal, classifieds API and the Flutter app.' },
    auctions:   { id: 'build-mzadat',    label: 'View the auction platform',  note: 'The Platinum Mzadat auction platform build.' },
    now:        { id: 'now',             label: 'See what he’s building now', note: 'A snapshot of what’s in progress, what he’s learning and the next milestone.' },
    impact:     { id: 'impact',          label: 'See impact',                 note: 'Numbers tied to the product where they happened, with a line on where each comes from.' },
    cases:      { id: 'cases',           label: 'Read the case studies',      note: 'Three engagements as case files: challenge, what he built, result.' },
    caseSoug:   { id: 'case-soug',       label: 'Soug case study',            note: 'Soug: a marketplace built for every kind of seller.', thumb: 'img/logos/soug.webp' },
    caseJeeb:   { id: 'case-jeeb',       label: 'Jeeb case study',            note: 'Jeeb: backend systems for grocery delivery in Qatar.', thumb: 'img/logos/jeeb-icon.webp' },
    caseBoost:  { id: 'case-boost',      label: 'Pick & Ride case study',     note: 'Pick & Ride at Boost: dockless bicycle sharing, app and backend.', thumb: 'img/logos/pick-and-ride.webp' },
    experience: { id: 'experience',      label: 'Review Experience',          note: 'His path from 2017 to today across India, the UAE and Qatar, newest role first.' },
    roleMzadat: { id: 'role-mzadat',     label: 'Platinum Mzadat role',       note: 'His current role at Platinum Mzadat, Doha.' },
    rolePass:   { id: 'role-pass',       label: 'Pass Delivery role',         note: 'Technical Lead · Software Engineer at Pass Delivery, Qatar.' },
    roleJeeb:   { id: 'role-jeeb',       label: 'Jeeb role',                  note: 'Senior Software Engineer at Jeeb Technologies, Qatar (from Mar 2023).' },
    roleBoost:  { id: 'role-boost',      label: 'Boost role',                 note: 'Senior Software Engineer at Boost, Qatar (Oct 2021 – Mar 2023).' },
    roleWebcastle: { id: 'role-webcastle', label: 'WebCastle role',           note: 'Software Engineer at WebCastle Technologies, Dubai (Aug 2019 – Sep 2021).' },
    skills:     { id: 'skills',          label: 'View Technical Skills',      note: 'Skills grouped by job; highlighted = daily driver, dashed = still exploring.' },
    feedback:   { id: 'feedback',        label: 'What it’s like working with him', note: 'Working-style notes. Cards marked “Placeholder” will be replaced by real testimonials.' },
    about:      { id: 'about',           label: 'Read About Shanid',          note: 'His background, engineering strengths and links to the evidence behind them.' },
    contact:    { id: 'work-with-me',    label: 'Contact Shanid',             note: 'Ways to work together: email or WhatsApp, or grab the CV.' }
  },

  // ---------------------------------------------------------------- external links allowlist
  links: {
    cv:         { label: 'View CV',           href: 'files/Shanid-Senior-Software-Engineer-CV.pdf', newTab: true },
    pdf:        { label: 'Download CV',       href: 'files/Shanid-Senior-Software-Engineer-CV.pdf', download: 'Shanid-Senior-Software-Engineer-CV.pdf' },
    email:      { label: 'Email Shanid',      href: 'mailto:shanuex@gmail.com' },
    inquiry:    { label: 'Discuss your project', href: 'mailto:shanuex@gmail.com?subject=Project%20inquiry%20%E2%80%94%20via%20techbyshanid.github.io&body=Hi%20Shanid%2C%0D%0A%0D%0AWhat%20I%27d%20like%20to%20build%20%28or%20the%20role%29%3A%0D%0A%0D%0ATimeline%3A%0D%0A%0D%0ABest%20way%20to%20reach%20me%3A%0D%0A' },
    whatsapp:   { label: 'Chat on WhatsApp',  href: 'https://wa.me/97470825711?text=Hi%20Shanid%2C%20I%20found%20your%20portfolio%20and%20I%E2%80%99d%20like%20to%20talk.', newTab: true },
    github:     { label: 'GitHub',            href: 'https://github.com/techbyshanid', newTab: true }
  },

  // ---------------------------------------------------------------- browsing
  categories: [
    { id: 'hiring',     label: 'Hiring decision', items: ['hire', 'fit', 'strengths', 'role'] },
    { id: 'seniority',  label: 'Seniority',       items: ['senior', 'lead', 'architecture', 'ownership'] },
    { id: 'projects',   label: 'Projects',        items: ['built', 'soug', 'mzadat', 'jeeb', 'pickride', 'impact'] },
    { id: 'technical',  label: 'Technical',       items: ['stack', 'apis', 'scalable', 'python', 'quality'] },
    { id: 'career',     label: 'Career',          items: ['experience', 'countries', 'education', 'now'] },
    { id: 'next',       label: 'CV & contact',    items: ['cv', 'download', 'contact', 'available', 'profiles'] }
  ],

  // ---------------------------------------------------------------- answers
  intents: [
    /* ---------- Hiring decision ---------- */
    {
      id: 'hire', q: 'Why should we hire Shanid?',
      keys: ['^hire', 'hiring', 'why him', 'why should', 'recommend', 'worth', 'convince'],
      answer: [
        'Shanid is a backend-focused Senior Software Engineer with 8+ years across India, the UAE and Qatar. He designs the systems behind web and mobile products — Laravel and PHP at the core, with Python, Django, MySQL, PostgreSQL and Redis around it.',
        'He has shipped marketplaces (Soug), grocery and delivery platforms (Jeeb, Pass Delivery), a bicycle-sharing platform (Pick & Ride) and now public-sector auctions at Platinum Mzadat — and he has been trusted with technical-lead responsibility more than once.'
      ],
      actions: [{ nav: 'apps', label: 'Explore Products' }, { link: 'cv' }, { nav: 'contact', label: 'Contact Shanid' }],
      next: ['built', 'lead', 'cv']
    },
    {
      id: 'fit', q: 'Is he a good fit for our team?',
      keys: ['^fit', 'good fit', 'right fit', 'our team', 'suit', 'match'],
      answer: [
        'He is strongest where a team needs a solid backend: multi-portal platforms, REST APIs for mobile apps, admin panels, queues and the data model underneath.',
        'His record covers agency delivery for clients (WebCastle, Boost), start-up product work (Jeeb, Pass Delivery) and platforms for public bodies (Platinum Mzadat). Tell me your stack or role and I’ll point to the closest evidence.'
      ],
      actions: [{ nav: 'experience' }, { nav: 'skills' }],
      next: ['role', 'senior', 'stack']
    },
    {
      id: 'strengths', q: 'What are his main strengths?',
      keys: ['^strength', 'strengths', 'good at', 'best at', 'speciality', 'specialty', 'expert'],
      answer: [
        'Three things stand out: designing scalable backend architecture, building clean and well-documented APIs for web and mobile clients, and leading backend teams — including mentoring junior engineers.'
      ],
      points: [['Soug — five surfaces on one Laravel core', 'arch'], ['Jeeb — backend lead responsibility', 'roleJeeb'], ['Pass Delivery — Technical Lead', 'rolePass']],
      actions: [{ nav: 'about' }, { nav: 'skills' }],
      next: ['architecture', 'lead']
    },
    {
      id: 'role', q: 'What roles suit him best?',
      keys: ['what role', 'which role', 'roles suit', 'position', 'job title', 'best role'],
      answer: [
        'Senior backend engineer, Laravel / PHP lead, or technical lead for a product team that ships web and mobile apps. He is also comfortable in full-stack work with jQuery, Bootstrap and Tailwind on the front end.'
      ],
      actions: [{ nav: 'skills' }, { nav: 'contact' }],
      next: ['senior', 'available']
    },

    /* ---------- Seniority ---------- */
    {
      id: 'senior', q: 'Is he senior-level?',
      keys: ['^senior', 'seniority', 'level', 'experienced', 'how experienced', 'years'],
      answer: [
        'Yes — 8+ years of professional engineering since 2017, with Senior Software Engineer titles at Boost and Jeeb, a Technical Lead role at Pass Delivery and his current role at Platinum Mzadat.',
        'At Jeeb he was given technical-lead responsibility for backend development on top of his role, based on performance.'
      ],
      actions: [{ nav: 'experience' }],
      next: ['lead', 'architecture']
    },
    {
      id: 'lead', q: 'Has he led teams?',
      keys: ['^lead', 'leader', 'leadership', 'led', 'manage', 'mentor', 'team lead', 'technical lead'],
      answer: [
        'Yes. He was Technical Lead at Pass Delivery, and at Jeeb he led backend development — designing the architecture with cross-functional teams, mentoring junior backend engineers and working with QA on reliability.'
      ],
      actions: [{ nav: 'rolePass' }, { nav: 'roleJeeb' }],
      next: ['ownership', 'senior']
    },
    {
      id: 'architecture', q: 'How does he approach architecture?',
      keys: ['^architecture', 'architect', 'system design', 'design systems', 'modular', 'structure'],
      answer: [
        'He builds one solid core and puts several surfaces on it. Soug is the clearest example: an admin panel, a company portal, an agent portal and a classifieds API for the Flutter app all share one Laravel codebase and one set of business rules.'
      ],
      actions: [{ nav: 'arch' }, { nav: 'caseSoug' }],
      next: ['apis', 'scalable']
    },
    {
      id: 'ownership', q: 'Can he own a product end to end?',
      keys: ['end to end', 'end-to-end', 'ownership', 'own a product', 'independent', 'alone', 'by himself', 'full product'],
      answer: [
        'Yes — he has taken platforms from data model to production: backend, admin, APIs for the mobile apps and the hosting on AWS. At Boost he delivered Pick & Ride, a dockless bicycle-sharing app and its backend.'
      ],
      actions: [{ nav: 'caseBoost' }, { nav: 'apps' }],
      next: ['pickride', 'built']
    },

    /* ---------- Projects ---------- */
    {
      id: 'built', q: 'What has he built?',
      keys: ['^built', 'projects', 'portfolio', 'products', 'platforms', 'what has he', 'shipped', 'work'],
      answer: [
        'Highlights: Soug (a Qatar marketplace for properties, cars, plates, numbers, businesses and classifieds), the Platinum Mzadat auction platform, Jeeb grocery delivery, Pass Delivery, Pick & Ride bicycle sharing and Taskmario home services — plus Noogah and TottLabs.'
      ],
      actions: [{ nav: 'apps' }, { nav: 'builds' }],
      next: ['soug', 'mzadat', 'jeeb']
    },
    {
      id: 'soug', q: 'Tell me about Soug.',
      keys: ['^soug', 'marketplace', 'classifieds', 'cars', 'plates'],
      answer: [
        'Soug is a Qatar marketplace with six listing categories — properties, cars, plates, phone numbers, businesses and classifieds. He built it on one Laravel core with five surfaces: the admin panel, a company portal, an agent portal, a classifieds API and the Flutter app it serves.',
        'The admin covers listings, category attributes, agent management, revenue reports and a recycle bin; the platform also maps 171 Qatar zones with Arabic names.'
      ],
      actions: [{ nav: 'soug' }, { nav: 'caseSoug' }],
      next: ['architecture', 'apis']
    },
    {
      id: 'mzadat', q: 'What does he do at Platinum Mzadat?',
      keys: ['^mzadat', 'platinum', 'auction', 'auctions', 'judicial', 'municipality', 'current job', 'current role'],
      answer: [
        'Platinum Mzadat is an auction company that runs auctions for Qatar’s Supreme Judicial Council and the Ministry of Municipality. Shanid works on the online platform behind those auctions — it is his current role.'
      ],
      actions: [{ nav: 'mzadat' }, { nav: 'roleMzadat' }],
      next: ['now', 'lead']
    },
    {
      id: 'jeeb', q: 'What did he do at Jeeb?',
      keys: ['^jeeb', 'grocery'],
      answer: [
        'At Jeeb Technologies in Qatar (Senior Software Engineer from March 2023) he planned, built and managed web, mobile and enterprise applications, designed backend systems and APIs with cross-functional teams, and took on technical-lead responsibility for backend development.'
      ],
      actions: [{ nav: 'caseJeeb' }, { nav: 'roleJeeb' }],
      next: ['apis', 'lead']
    },
    {
      id: 'pickride', q: 'What is Pick & Ride?',
      keys: ['pick & ride', 'pick and ride', 'pickride', 'bicycle', 'bike', 'dockless', '^boost'],
      answer: [
        'Pick & Ride is a dockless bicycle-sharing platform he shipped at Boost (a creative marketing agency in Qatar) — the rider app and the backend that runs the fleet.'
      ],
      actions: [{ nav: 'pickride' }, { nav: 'caseBoost' }],
      next: ['ownership', 'built']
    },
    {
      id: 'impact', q: 'What impact has he had?',
      keys: ['^impact', 'results', 'outcomes', 'metrics', 'numbers', 'achievement'],
      answer: [
        'The impact section ties each number to the product where it happened — for example five surfaces on one Laravel core and 171 mapped zones at Soug, and 10+ products shipped across seven companies.'
      ],
      actions: [{ nav: 'impact' }],
      next: ['soug', 'built']
    },

    /* ---------- Technical ---------- */
    {
      id: 'stack', q: 'What is his tech stack?',
      keys: ['^stack', 'tech stack', 'technologies', 'languages', 'frameworks', 'tools', 'skills'],
      answer: [
        'Core: Laravel, PHP, Python, Django, jQuery, MySQL, REST APIs and Bootstrap. Around it: PostgreSQL, Redis, Livewire, Filament, Tailwind CSS, Node.js, Laravel Queues and Horizon, WebSockets, AWS (EC2, S3), Docker, Nginx and GitHub Actions.'
      ],
      actions: [{ nav: 'skills' }],
      next: ['python', 'apis']
    },
    {
      id: 'apis', q: 'How does he build APIs?',
      keys: ['^api', 'apis', 'rest', 'endpoint', 'endpoints', 'integration', 'mobile backend'],
      answer: [
        'He designs REST APIs that front-end and mobile teams can rely on: documented, secured (JWT, OAuth 2.0, Laravel Passport) and tuned for performance. Soug’s classifieds API serving the Flutter app is a recent example.'
      ],
      actions: [{ nav: 'arch' }],
      next: ['scalable', 'architecture']
    },
    {
      id: 'scalable', q: 'Can he build scalable systems?',
      keys: ['scal', 'performance', 'high traffic', 'load', 'queues', 'redis', 'cache'],
      answer: [
        'His CV centres on designing scalable, reliable backend systems. In practice that means queues and Horizon for background work, Redis caching, WebSockets for real-time features and AWS hosting — the toolkit listed in his skills.'
      ],
      actions: [{ nav: 'skills' }, { nav: 'builds' }],
      next: ['apis', 'quality']
    },
    {
      id: 'python', q: 'Does he work with Python and Django?',
      keys: ['^python', 'django', 'celery', 'fastapi'],
      answer: [
        'Yes — Python and Django are in his core stack alongside Laravel, with Celery for background jobs.'
      ],
      actions: [{ nav: 'skills' }],
      next: ['stack', 'now']
    },
    {
      id: 'quality', q: 'How does he keep quality high?',
      keys: ['quality', 'testing', 'tests', 'qa', 'reliab', 'clean code', 'maintain'],
      answer: [
        'He writes clean, maintainable code, keeps API endpoints documented and secure, and works closely with QA teams to check the reliability and correctness of backend features — all listed responsibilities from his Jeeb role.'
      ],
      actions: [{ nav: 'roleJeeb' }],
      next: ['lead', 'apis']
    },

    /* ---------- Career ---------- */
    {
      id: 'experience', q: 'Walk me through his experience.',
      keys: ['^experience', 'career', 'background', 'timeline', 'previous', 'companies', 'worked'],
      answer: [
        'Spectrum Softtech, Kochi (web developer intern, 2017) → Datacube Software Solutions, India (2018) → WebCastle Technologies, Dubai (2019–21) → Boost, Qatar (2021–23) → Jeeb Technologies, Qatar (from 2023) → Pass Delivery (Technical Lead) → Platinum Mzadat, Doha (now).'
      ],
      actions: [{ nav: 'experience' }],
      next: ['countries', 'senior']
    },
    {
      id: 'countries', q: 'Where has he worked?',
      keys: ['countries', 'where', 'location', 'based', 'qatar', 'dubai', 'uae', 'india', 'doha', 'relocat'],
      answer: [
        'He is based in Doha, Qatar, and has worked in India, the UAE (Dubai) and Qatar.'
      ],
      actions: [{ nav: 'experience' }],
      next: ['available', 'contact']
    },
    {
      id: 'education', q: 'What is his education?',
      keys: ['^education', '^degree', '^university', 'college', 'studied', 'study', 'bca'],
      answer: [
        'Bachelor of Computer Applications (BCA), University of Engineering & Technology, Bangalore (2011–2015). He speaks English, Hindi, Malayalam and Tamil.'
      ],
      actions: [{ nav: 'experience', label: 'See education' }],
      next: ['experience']
    },
    {
      id: 'now', q: 'What is he working on right now?',
      keys: ['right now', 'currently', 'working on', 'building now', 'these days', 'learning', '^now'],
      answer: [
        'Right now he is building the Platinum Mzadat auction platform and continuing work on Soug. The “Now” section has the current snapshot.'
      ],
      actions: [{ nav: 'now' }],
      next: ['mzadat', 'soug']
    },

    /* ---------- CV & contact ---------- */
    {
      id: 'cv', q: 'Can I see his CV?',
      keys: ['^cv', '^resume', 'résumé', 'curriculum'],
      answer: ['Here’s his CV as a PDF — open it in a new tab or download it.'],
      actions: [{ link: 'cv' }, { link: 'pdf' }],
      next: ['contact', 'experience']
    },
    {
      id: 'download', q: 'Download his CV',
      keys: ['download', 'pdf'],
      answer: ['Sure — here’s the PDF.'],
      actions: [{ link: 'pdf' }],
      next: ['contact']
    },
    {
      id: 'contact', q: 'How do I contact him?',
      keys: ['^contact', 'email', 'reach', 'whatsapp', 'call', 'phone', 'message', 'talk'],
      answer: ['The quickest way is email (shanuex@gmail.com) or WhatsApp. Tell him what you’re building or the role, and your timeline.'],
      actions: [{ link: 'inquiry' }, { link: 'whatsapp' }, { nav: 'contact' }],
      next: ['available', 'cv']
    },
    {
      id: 'available', q: 'Is he available?',
      keys: ['available', 'availability', 'open to', 'notice', 'freelance', 'start', 'hire now'],
      answer: ['He’s open to conversations about senior backend and technical-lead roles, and to interesting product builds. Reach out by email or WhatsApp to talk about timing.'],
      actions: [{ nav: 'contact' }],
      next: ['contact', 'role']
    },
    {
      id: 'profiles', q: 'Where can I find his profiles?',
      keys: ['github', 'linkedin', 'profiles', 'social', 'online'],
      answer: ['His GitHub is @techbyshanid. The contact section lists every way to reach him.'],
      actions: [{ link: 'github' }, { nav: 'contact' }],
      next: ['cv', 'contact']
    },

    /* ---------- conversation ---------- */
    {
      id: 'greet', q: 'Hi', small: true,
      keys: ['^hi', '^hello', '^hey', 'good morning', 'good evening', 'salam', 'namaste'],
      answer: ['Hello! I can walk you through Shanid’s experience, the platforms he has built and his stack. What would you like to know?'],
      next: ['hire', 'built', 'stack']
    },
    {
      id: 'thanks', q: 'Thanks', small: true,
      keys: ['^thanks', '^thank', 'cheers', 'thank you'],
      answer: ['Glad that helped. Want his CV, or a way to reach him?'],
      next: ['cv', 'contact']
    },
    {
      id: 'who', q: 'Who are you?', small: true,
      keys: ['who are you', 'what are you', 'are you ai', 'are you a bot', 'how do you work', 'what can you do', 'help me'],
      answer: ['I’m a guide built into Shanid’s portfolio. My answers come from his CV and this site — I don’t invent facts, and I can take you straight to the relevant section.'],
      next: ['hire', 'built', 'cv']
    }
  ]
};
