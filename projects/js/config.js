// @ts-check
/**
 * Site-wide settings for the project showcase.
 *
 * assetBase — where image paths in projects-data.js resolve from.
 *   '../'                         served from techbyshanid.github.io/projects/ (default)
 * portfolioUrl — links back to the main portfolio (CV, contact) use this.
 */
export const SITE = {
  name: 'Shanid',
  role: 'Senior Software Engineer',
  positioning: 'Senior Software Engineer · Laravel, PHP & Python · Backend & Platforms',
  url: 'https://techbyshanid.github.io/projects/',
  assetBase: '../',
  portfolioUrl: '../',
  featuredLimit: 4,

  email: 'shanuex@gmail.com',
  links: {
    portfolio: '../',
    cv: '../files/Shanid-Senior-Software-Engineer-CV.pdf',
    cvPdf: '../files/Shanid-Senior-Software-Engineer-CV.pdf',
    linkedin: '',
    github: 'https://github.com/techbyshanid',
    license: '../LICENSE',
    whatsapp: 'https://wa.me/97470825711?text=Hi%20Shanid%2C%20I%20saw%20your%20project%20showcase%20and%20I%E2%80%99d%20like%20to%20talk.'
  },

  // Hero highlights — each one is stated in the CV or on the portfolio.
  facts: [
    { value: '8', suffix: '+', label: 'years building backend platforms, web and APIs' },
    { value: '10', suffix: '+', label: 'products shipped across seven companies' },
    { value: '3', suffix: '', label: 'countries — India, the UAE and Qatar' }
  ]
};

/** @typedef {{ id: import('./projects-data.js').CategoryId, label: string, short: string, description: string }} Category */

/** @type {Category[]} Order = order of the filter chips. */
export const CATEGORIES = [
  { id: 'mobile', label: 'Mobile Applications', short: 'Mobile', description: 'Mobile products backed by the APIs I built — delivery, grocery, mobility and marketplaces.' },
  { id: 'web', label: 'Websites & Web Apps', short: 'Web', description: 'Web platforms, portals and admin panels.' },
  { id: 'saas', label: 'SaaS Products', short: 'SaaS', description: 'Multi-tenant products with roles, billing and owner-scoped data.' },
  { id: 'ai', label: 'AI Applications', short: 'AI', description: 'Products where a model does real work, with the guard-rails around it.' },
  { id: 'agents', label: 'AI Agents & Automation', short: 'Agents', description: 'Tool-using agents, MCP integrations and automation, each with explicit limits on what it may do.' },
  { id: 'backend', label: 'Backend, APIs & Integrations', short: 'Backend', description: 'APIs, data layers, payments and protocol integrations behind the apps.' },
  { id: 'experiments', label: 'Experiments & Learning', short: 'Labs', description: 'Learning projects and prototypes — labelled as such.' }
];

/** @type {Record<string, string[]>} Nav shortcuts that filter by several categories at once. */
export const NAV_GROUPS = {
  mobile: ['mobile'],
  'saas-web': ['saas', 'web'],
  'ai-agents': ['ai', 'agents']
};

/** @type {Record<string, { label: string, short?: string, rank: number }>} */
export const STATUS = {
  live: { label: 'Live', rank: 0 },
  'in-development': { label: 'In development', rank: 1 },
  shipped: { label: 'Shipped', rank: 2 },
  prototype: { label: 'Prototype', rank: 3 },
  learning: { label: 'Learning project', rank: 4 }
};

/** @type {Record<string, string>} */
export const VISIBILITY = {
  public: 'Public',
  private: 'Private source',
  internal: 'Employer product',
  client: 'Client project'
};
