# ElectionFlow 🗳️

**Understand the election. Follow the journey.**

ElectionFlow is a civic education platform that turns the complex Indian election process into a simple, interactive step-by-step journey. Built for hackathon — focused on code quality, security, accessibility, and real utility for citizens.

---


## 🚀 Live Demo

```bash
npm install
npm run dev
```
Open → **http://localhost:5173/**

---

## ✨ Features

### 1. 🗺️ Election Journey (Primary Feature)
An interactive timeline of all 8 stages of the Indian election process:

| Stage | Title |
|-------|-------|
| 01 | Election Announced |
| 02 | Nomination |
| 03 | Scrutiny |
| 04 | Candidate Finalization |
| 05 | Campaign Period |
| 06 | Polling Day |
| 07 | Counting |
| 08 | Results |

Each stage opens a detail panel showing:
- **What happens?**
- **Why it matters**
- **What citizens should know**
- **Key terminology**
- **Official ECI source link**

### 2. 🌱 Election Journey Explorer
Choose your experience level — the journey adapts:
- **"I'm new to elections"** → simplified overview of all stages
- **"I already know the basics"** → full detail with terminology
- **"I need help voting"** → highlights only the stages relevant to voting day

### 3. ✅ How to Vote — Action Center
Four action cards covering everything a voter needs:
1. **Check Voter Registration** → links to official ECI electoral roll search
2. **Find Your Polling Station** → Google Maps deep-link search by area
3. **What Happens at the Booth** → step-by-step guide
4. **EVM & VVPAT Explained** → how the voting machines work

### 4. 🧠 Quick Quiz
5 factual multiple-choice questions about the election process:
- Progress bar, keyboard-navigable options
- Score circle with percentage after submission
- Full answer review with explanations

### 5. 📚 Official Resources
6 curated links to authoritative ECI sources:
- Election Commission of India
- National Voters' Service Portal
- Electoral Roll Search
- Election Results
- Candidate Information
- ECI FAQs

### 6. 🌙 Dark / Light Mode
- Toggle button in the header (🌙 / ☀️)
- Preference saved in `localStorage`
- Respects OS `prefers-color-scheme` on first visit

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI framework |
| **Vite 8** | Build tool & dev server |
| **Vanilla CSS** | Design system (CSS custom properties) |
| **Vitest** | Unit testing |
| **@testing-library/react** | Component testing utilities |
| **Google Maps** | Polling station search (safe deep-link) |

**No** TypeScript, Tailwind, Redux, React Router, or unnecessary dependencies.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── App.jsx                 # Root layout, theme state, navigation
│   ├── Header.jsx              # Sticky header, mobile menu, theme toggle
│   ├── ElectionJourney.jsx     # Primary timeline + mode selector + detail panel
│   ├── HowToVote.jsx           # Voter action center + Google Maps
│   ├── Quiz.jsx                # 5-question interactive quiz
│   ├── OfficialResources.jsx   # Curated official links
│   └── SharedComponents.jsx    # Badge, Button, Card, Section, ResourceLink, EmptyState
├── data/
│   ├── electionData.js         # 8 election stages + user mode config
│   ├── quizData.js             # Quiz questions + calculateQuizScore()
│   └── resourcesData.js        # Official links + vote action steps
├── services/
│   └── googleMaps.js           # Safe Google Maps deep-link (no API key)
├── utils/
│   └── helpers.js              # isTrustedUrl(), getExternalLinkProps(), getScoreMessage()
├── tests/
│   ├── setup.js                # Vitest + jest-dom setup
│   └── app.test.js             # 15 unit tests
├── index.css                   # Complete design system (1300+ lines)
└── main.jsx                    # React entry point
```

---

## 🧪 Tests

```bash
npm test
```

```
✓ src/tests/app.test.js (15 tests) ✓

Test Files  1 passed (1)
     Tests  15 passed (15)
```

### Test Coverage

| Group | What's tested |
|-------|--------------|
| **Data Integrity** | All 8 stages present, all 3 user modes valid |
| **Quiz Scoring** | Perfect score, zero score, explanations, null answers |
| **URL Security** | Trusted domain allowlist, XSS strings rejected |
| **Resource Links** | All ECI URLs verified against allowlist |
| **Google Maps** | URL format, query encoding, XSS in query safely encoded |
| **Score Messages** | All 6 score percentage bands |

---

## 🔒 Security

- ✅ No secrets or API keys
- ✅ No `dangerouslySetInnerHTML`
- ✅ URL validation against trusted domain allowlist (`eci.gov.in`, `google.com`)
- ✅ All external links use `target="_blank" rel="noopener noreferrer"`
- ✅ No personal data collected or stored
- ✅ No location permissions requested
- ✅ Google Maps via safe deep-link only — no SDK, no credentials

---

## ♿ Accessibility

- ✅ Semantic HTML (`header`, `main`, `footer`, `nav`, `section`)
- ✅ Skip link for keyboard users
- ✅ Proper heading hierarchy (h1 → h2 → h3 → h4)
- ✅ All interactive elements keyboard-navigable
- ✅ Visible focus states (`:focus-visible`)
- ✅ ARIA roles, labels, `aria-pressed`, `aria-selected`, `aria-current`
- ✅ `role="progressbar"` on quiz progress
- ✅ `prefers-reduced-motion` support
- ✅ Sufficient colour contrast in both light and dark modes
- ✅ No information conveyed by colour alone

---

## 📱 Responsive Design

| Breakpoint | Layout |
|-----------|--------|
| Desktop (≥768px) | Horizontal scrollable timeline, multi-column grids |
| Mobile (<768px) | Vertical timeline with connecting line, stacked cards |
| Min supported | 360px wide |

---

## 🗺️ Google Maps Integration

The **"Find Your Polling Station"** feature opens a Google Maps search in a new tab:

```
https://www.google.com/maps/search/polling+station+near+[your-area]
```

- **No API key required**
- **No location permissions**
- **No data stored**
- Clear disclaimer to verify via official ECI sources

---

## 📦 Build

```bash
npm run build
```

```
dist/index.html          0.94 kB │ gzip:  0.50 kB
dist/assets/*.css       23.39 kB │ gzip:  4.29 kB
dist/assets/*.js       252.02 kB │ gzip: 78.34 kB

✓ built in 260ms
```

---

## 📝 Important Disclaimer

This is an **independent educational platform** for civic awareness.

- Not affiliated with the Election Commission of India or any political party
- Describes the **general election process** — not election-specific dates
- For official and up-to-date information, visit **[eci.gov.in](https://eci.gov.in/)**
- Contains no partisan content, candidate recommendations, or political opinions

---



---

## 🖥️ Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at localhost:5173 |
| `npm run build` | Build production bundle to `/dist` |
| `npm run preview` | Preview production build locally |
| `npm test` | Run unit tests once |
| `npm run test:watch` | Run tests in watch mode |

---

*Built with ❤️ for election awareness and civic education.*
```
