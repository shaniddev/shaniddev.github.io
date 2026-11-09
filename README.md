# techbyshanid.github.io

Personal portfolio of **Shanid**, Senior Software Engineer (Laravel · PHP ·
Python) — live at <https://techbyshanid.github.io/>.

Plain static HTML, CSS and JavaScript served by GitHub Pages. No framework,
no build step and no runtime dependencies.

The design, layout and interactions are adapted from
[Afaque Jaya's open-source portfolio](https://github.com/Afaquejaya/afaquejaya.github.io),
used under the MIT License (see `LICENSE`). All content, photos and data are Shanid's own.

## Structure

| Path | What it is |
| --- | --- |
| `index.html` | The page: hero + logo strip, products & platforms, architecture builds, now, impact, case studies, career journey, skills, about, feedback, contact |
| `css/main.css` | Design system and all styles (tokens at the top; additions at the bottom) |
| `js/data.js` | The **logo strip**, the "More shipped" list and the app chips on the timeline |
| `js/now.js` | The **“Now” section** — what is being built and learned, and the next milestone |
| `js/testimonials.js` | **Feedback cards** — ships with clearly marked *placeholders*; replace them with real, approved quotes |
| `js/main.js` | Renders the data files, adds tech logos to skill chips (`TECH` map), section tabs, pinned horizontal-scroll sections, reveals, counters, the ID badge and the Ask-an-AI card |
| `js/mascot.js` | The bottom-right photo avatar; clicking it opens the AI Portfolio Guide |
| `js/concierge.js` + `css/concierge.css` | **AI Portfolio Guide** — the chat panel behind the avatar |
| `js/concierge-data.js` | The guide's **knowledge base**: answers, question library, navigation allowlist |
| `js/analytics.js` | A no-op hook — no tracking is loaded |
| `img/profile/` | Profile photo sizes and the avatar |
| `img/logos/` | Company and product logos (trademarks of their owners) |
| `img/projects/` | Placeholder illustrations — replace with real screenshots |
| `img/tech/` | Tech logos shown next to skills (Devicon / Simple Icons) |
| `files/` | The CV PDF used by the View / Download CV buttons |
| `projects/` | **Project showcase** — the full catalog at `/projects/` (`projects/js/projects-data.js`) |

## Placeholders to fill in

Search the project for `[` — bracketed text such as `[YYYY]`, `[Your role]` or
`[N]` marks details still to add (Platinum Mzadat and Pass Delivery dates and
roles, Noogah / TottLabs descriptions, metrics, certifications, LinkedIn).

## Preview locally

```bash
python3 -m http.server 5173
```

Then open <http://localhost:5173/>.

## Deploy

Push the folder contents to the root of the `techbyshanid.github.io`
repository and enable GitHub Pages (Settings → Pages → Deploy from branch →
`main` / root).
