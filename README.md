# TYN Notes

A dependency-free, static study-notes site for **Semester 3** engineering courses. Every unit is a
single self-contained HTML page with its own styling, table of contents, search, and dark mode.

Live site: `https://tyn-notes.vercel.app` (deployed on Vercel)

---

## Overview

This repo is a personal revision library. There is no build step, no framework, and no package
manager — just hand-written HTML, CSS, and vanilla JavaScript. Open `index.html` and you are in.

The landing page lists each subject as a card; each card links to one page per unit. Pages are
designed for long-form reading: sticky sidebar navigation, in-page search, reading progress, and
a light/dark theme that persists across visits.

## Subjects

| Subject | Code | Units | Pages |
| --- | --- | --- | --- |
| Digital Logic & Computer Design (DLCD) | `UE25CS241A` | 1–2 | `dlcd1.html`, `dlcd2.html` |
| Computer Networks (CN) | `UE25CS243A` | 1–2 | `cn1.html`, `cn2.html` |
| Operating Systems (OS) | `UE25CS242A` | 1–2 | `os1.html`, `os2.html` |
| Data Structures & Applications (DSA) | `UE25CS244A` | 1–2 | `dsa1.html`, `dsa2.html` |
| Mathematics for AI & Data Science (MFAD) | `UE25MA241A` | 1–4 | `maths1.html` … `maths4.html` |
| Essentials of Innovation & Entrepreneurship (EIE) | — | Full course | `cie.html` |

### What each subject covers

- **OS** — computer-system organization, interrupts, storage hierarchy, I/O and DMA, OS structure;
  IPC, pipes/FIFOs, message queues, semaphores, sockets, threads, CPU scheduling with Gantt charts.
- **CN** — network edge and core, delay/loss/throughput, protocol layering and encapsulation;
  DNS, transport layer, IP addressing, with solved numerical problems.
- **DSA** — functions, recursion, arrays, structures, dynamic memory, ADTs, linked lists, stacks,
  multilists and skiplists.
- **DLCD** — combinational and sequential logic, Boolean algebra, SOP/POS, Karnaugh maps, FSMs,
  arithmetic circuits, number systems.
- **MFAD** — linear algebra (Gaussian elimination, rank, LU, subspaces, Gram–Schmidt/QR);
  orthogonality, projections, least squares, eigenvalues, SVD, PCA; probability, sampling, CLT,
  MLE/MAP, confidence intervals; hypothesis testing, t-tests, ANOVA, chi-square.
- **EIE** — entrepreneurship basics, mindset, opportunity identification, teams and leadership,
  human-centred innovation, ethics, plus frameworks and sample question papers.

### Extra pages

| File | Purpose |
| --- | --- |
| `index.html` | Home / subject selector |
| `index1.html` | Standalone DLCD lab-quiz revision sheet (separate dark-theme design) |
| `maths1formula.html`, `maths2formula.html` | Rapid revision / formula sheets (currently unlinked from home) |
| `wait.html` | "Coming soon" placeholder |
| `dsa2.html` | "Coming soon" placeholder for DSA Unit 2 |

## Features

- **Dark / light theme** with `localStorage` persistence and a no-flash inline init script.
- **Sidebar table of contents** with collapsible topic groups and active-section highlighting.
- **In-page search** that filters the TOC, highlights matches in the body, reports match counts,
  and jumps to the first hit on `Enter`.
- **Reading progress bar** at the top of each note page.
- **Back-to-top** button after scrolling.
- **Code blocks with copy buttons** on pages that contain code or Verilog.
- **Responsive layout** with an off-canvas sidebar on small screens.
- **Print-friendly styles** for hard copies.

## Tech stack

- Plain HTML5, CSS3 (custom properties for theming), and vanilla JavaScript — no bundler, no npm.
- Google Fonts: IBM Plex Sans, IBM Plex Mono, Newsreader.
- Vercel Analytics script + `vercel.json` for response headers.
- Everything is inlined per page, so any page can be shared or opened offline on its own.

## Project structure

```
tyn-notes/
├── index.html            # Home: subject cards + unit buttons
├── index1.html           # DLCD lab quiz revision (standalone)
├── dlcd1.html            # DLCD Unit 1
├── dlcd2.html            # DLCD Unit 2
├── cn1.html              # CN Unit 1
├── cn2.html              # CN Unit 2
├── os1.html              # OS Unit 1
├── os2.html              # OS Unit 2
├── dsa1.html             # DSA Unit 1
├── dsa2.html             # DSA Unit 2 (placeholder)
├── maths1.html           # MFAD Unit 1
├── maths2.html           # MFAD Unit 2
├── maths3.html           # MFAD Unit 3
├── maths4.html           # MFAD Unit 4
├── maths1formula.html    # MFAD Unit 1 quick revision sheet
├── maths2formula.html    # MFAD Unit 2 quick revision sheet
├── cie.html              # EIE full-course notes
├── wait.html             # Coming-soon page
└── vercel.json           # COOP/COEP headers for Vercel
```

## Running locally

No install required. Either open the file directly:

```bash
open index.html        # macOS
xdg-open index.html    # Linux
```

Or serve the folder (recommended, and required if you want the `vercel.json` headers to apply):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deployment

The site is fully static and deploys to **Vercel** with zero configuration. `vercel.json` adds:

- `Cross-Origin-Opener-Policy: same-origin`
- `Cross-Origin-Embedder-Policy: require-corp`

These enable cross-origin isolation. Note that COEP also blocks cross-origin resources that do not
opt in with a `Cross-Origin-Resource-Policy` header, so keep that in mind if you embed external
images, fonts, or scripts. GitHub Pages will serve the HTML fine but cannot apply these headers.

## Adding a new unit page

1. Copy an existing unit page (e.g. `os1.html`) as a starting point.
2. Update the `<title>`, the sidebar TOC entries, and the `id` attributes on headings — the TOC links
   and active-section highlighting depend on matching IDs.
3. Write the content using the existing patterns: `.topic`, `.callout`, `.formula`, `.code-block`.
4. Add a button in `index.html` inside the matching subject card:

```html
<button class="unit-btn" onclick="location.href='os3.html'">
  Unit 3
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
</button>
```

## Notes

- Content is written for personal revision and is not official university material.
- Course codes correspond to the PES University Semester 3 curriculum.
- There is no test suite or linter; correctness is verified by reading the rendered pages.

## License

No license file is included. Treat the written notes as personal study material; add a license
(e.g. MIT for code, CC BY-NC 4.0 for content) if you intend to distribute it.
