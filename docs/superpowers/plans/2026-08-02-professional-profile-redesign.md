# Professional Profile Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (- [ ]) syntax for tracking.

**Goal:** Rework the existing static site into Frankie's approved public professional profile while preserving its current dark visual direction, interactions, and responsive behaviour.

**Architecture:** Keep the current dependency-free HTML/CSS/JavaScript structure. Replace the page narrative and information hierarchy in index.html, adapt existing components in css/style.css, and update only the interaction data and controls needed in js/app.js. Add the approved avatar as a local asset and a dependency-free Node contract test to protect approved wording, privacy boundaries, and retained interactions.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, Node built-in test runner, local Python HTTP server.

**Approved design source:** docs/superpowers/specs/2026-08-02-professional-profile-redesign-design.md

## Non-negotiable constraints

- Preserve the existing dark glassmorphism direction, cards, restrained animation, tabs, command menu, QR feature, and mobile responsiveness.
- Do not identify HSBC or Frankie's current employer anywhere in visible text, metadata, comments, JavaScript data, or accessibility labels.
- Mars and HP China may be named as historical employers.
- Keep the narrative hierarchy: mindset, strategy, and people first; process and delivery second; tools and technology third.
- Present AI as one tool alongside process engineering, SAP, ITSM, enterprise platforms, and automation.
- Keep hands-on AI agents and vibe coding in the hobbies section, not as a professional software-engineering claim.
- Exclude unsupported claims such as 96% availability, 99% SLA, audit outcomes, invented routes, distances, or elevations.
- Label the September 2026 Hulunbuir and Greater Khingan trip as planned.
- Do not name the friend, business, or farm associated with the AI hobby examples.
- Preserve all pre-existing uncommitted work before editing and review the combined diff carefully.
- Do not commit implementation files until Frankie approves the local preview.
- Do not push to GitHub until Frankie gives a separate, explicit publishing approval.

## Files

- Modify: index.html
- Modify: css/style.css
- Modify: js/app.js
- Create: assets/frankie-avatar.png
- Create: tests/site-contract.test.mjs
- Reference: docs/superpowers/specs/2026-08-02-professional-profile-redesign-design.md

### Task 1: Protect the current working state and add content contract tests

- [ ] Create a temporary backup directory outside the repository and copy index.html, css/style.css, and js/app.js into it.
- [ ] Save the current repository diff alongside the backup so the user's unpublished changes can be reconstructed independently.
- [ ] Reconfirm that only the three site files and Self intro.gdoc are dirty before implementation starts.
- [ ] Create tests/site-contract.test.mjs using node:test, node:assert/strict, and node:fs/promises only.
- [ ] Add positive assertions for:
  - the title Global Transformation & Technology Leader;
  - section IDs principles, capabilities, hobbies, education, and connect;
  - all three approved leadership slogans;
  - the four approved evidence metrics;
  - the three capability tab labels and the delivery sequence;
  - five hobby cards and their approved people, journeys, examples, and Aha messages;
  - the planned label for September 2026;
  - both education entries;
  - the exact LinkedIn and mailto links;
  - the local avatar path.
- [ ] Add negative assertions covering HSBC, presentation timer and agenda language, 96%, 99%, audit claims, Alps, coastal routes, PMP, and ITIL.
- [ ] Add structural assertions that the tabs, football interaction, snooker break-builder, motorbike selector, command menu, QR modal, and responsive CSS still exist.
- [ ] Run:
  /Users/frankiezhu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test tests/site-contract.test.mjs
- [ ] Confirm that the new contract fails for the expected missing content only; do not commit.

### Task 2: Rebuild the hero and leadership-principles section

- [ ] Copy the approved generated portrait from:
  /Users/frankiezhu/.codex/generated_images/019fc15f-e5c3-73f0-b3bf-2b82442f847c/exec-064adc92-bb42-4291-b117-716fe577b017.png
  to assets/frankie-avatar.png without altering the source image.
- [ ] Update page title, description, social metadata, and hero accessibility text so they describe a public professional profile and contain no current-employer reference.
- [ ] Set hero content to:
  - Frankie (Yifan) Zhu
  - Global Transformation & Technology Leader
  - I turn complex business challenges into clear transformation priorities, practical delivery models and measurable outcomes. My experience spans enterprise transformation, process and operating-model improvement, customer experience, technology operations and global programme delivery.
- [ ] Show four evidence cards: 20+ years; 0% to 80% digital-channel adoption; 4.9/5 global user CSAT; 2x Great Line Manager Award winner.
- [ ] Use assets/frankie-avatar.png in the existing hero portrait treatment.
- [ ] Rename the current vision section to How I Think and Lead with ID principles.
- [ ] Replace its cards with:
  - Choose the right direction — Do the right thing before doing the thing right.
  - Make execution easier — Easier is better.
  - Grow people and teams — Grow people. Strengthen teams. Succeed together.
- [ ] Adjust existing hero/card CSS only where required for the image, eyebrow, evidence cards, and slogan hierarchy.
- [ ] Rerun the contract test and inspect desktop and mobile wrapping; do not commit.

### Task 3: Rebuild the transformation track and capability hierarchy

- [ ] Replace the timeline with five stages in reverse chronological order:
  - Global Transformation & Delivery Leadership — Current. Use employer-neutral wording focused on setting direction, aligning stakeholders, mobilising delivery, strengthening governance, validating benefits, and leading teams through complex change.
  - GenAI Platform Transformation — 2025–2026. Built a global AI operating and governance model, with reported 20% productivity improvement and 4.8/5 user satisfaction.
  - Customer Experience Transformation — 2018–2025. Increased digital-channel adoption from 0% to 80%, achieved 4.9/5 global user CSAT, and reached the top 30th percentile for IT happiness.
  - IT Operations Transformation — 2016–2018. Scaled support from 13,000 to 23,000 users and tripled Tier 1 resolution.
  - SAP Implementation & Application Services — 2004–2015. Delivered SAP implementations across Asia and managed global services for business-critical supply chain applications.
- [ ] Name Mars and HP China only where they help orient the historical timeline.
- [ ] Rename the technology section to From Strategy to Results with ID capabilities.
- [ ] Replace the current tabs with:
  - Strategy & Outcomes
  - People, Process & Delivery
  - Tools & Technology
- [ ] Put strategy, outcomes, stakeholder alignment, team leadership, process engineering, governance, delivery control, SAP, ITSM, enterprise platforms, automation, and AI under the correct hierarchy.
- [ ] Show the shared sequence: Frame the problem → align the people → mobilise delivery → measure and adapt.
- [ ] Remove the fake code-window, certification cards, squad diagram, and any professional coding implication.
- [ ] Update tab markup, styles, and JavaScript selectors without changing keyboard/click behaviour.
- [ ] Rerun the contract test and exercise every tab; do not commit.

### Task 4: Rebuild the five hobby stories and retain useful interactions

- [ ] Use a desktop 2 + 2 + 1 layout:
  - Row 1: Honor of Kings; AI exploration
  - Row 2: Manchester United; Snooker
  - Row 3: ADV motorbike journeys, full width
- [ ] Honor of Kings story:
  - all-round player who prefers support roles;
  - currently plays Jin Chan for control and teamwide buffs;
  - Aha: Impact can be quiet. Good timing, control and support create the conditions for the whole team to perform better.
- [ ] AI exploration story:
  - learning and using AI in daily life;
  - a China–Australia e-trade workflow built with AI agents and now in use;
  - a vibe-coded mini-program now used to manage farm operations;
  - Aha: New technology becomes meaningful when it helps someone solve a real problem.
- [ ] Manchester United story:
  - passionate supporter and Class of '92 favourite;
  - name David Beckham, Nicky Butt, Ryan Giggs, Gary Neville, Phil Neville, and Paul Scholes;
  - reference three consecutive league titles;
  - note that Frankie used to play football twice a week and hopes to return when work settles;
  - Aha: Lasting success grows from shared standards, trust and people who keep improving together.
- [ ] Retain the football formation interaction, but replace corporate-role labels with factual tactical descriptions in roleInsights.
- [ ] Lead the Snooker card with Frankie's interest in Ronnie O'Sullivan and Ding Junhui, including the approved contrast in tempo, accuracy, style, stability, and defence.
- [ ] Put the existing break-builder after the personal story and rename generic insight labels to table-specific language.
- [ ] Snooker Aha: Mastery comes from choosing the right tempo: attacking decisively when the opportunity is there, and controlling the table patiently when it is not.
- [ ] Rebuild routeData around exactly:
  - tibet-2023: completed trip to Lhasa after COVID, including solo snow riding, repeated falls, lifting the bike, and continuing;
  - sichuan-2025: completed Western Sichuan trip featuring diverse landscapes, not just plateau scenery;
  - hulunbuir-2026: planned September 2026 trip to the Hulunbuir Grasslands and Greater Khingan Range.
- [ ] Fold scenery, hardship, local food, travel, and ice cream into the motorbike narrative; do not create separate hobby cards.
- [ ] Motorbike Aha: Resilience became something physical and immediate: lift the bike, reset and keep moving.
- [ ] Add reusable aha-moment, hobby-evidence, completed-status, and planned-status styles that fit the current visual system.
- [ ] Rerun the contract test and manually exercise football, snooker, and all route buttons; do not commit.

### Task 5: Add light-touch education and contact; remove the meeting-specific layer

- [ ] Replace the 10-minute agenda section with a compact education strip:
  - Master of e-Business Management, University of Technology Sydney
  - Bachelor of Economics, South China Normal University
- [ ] Do not include a credentials section, PMP, or ITIL.
- [ ] Add a compact connect section with:
  - LinkedIn: https://www.linkedin.com/in/frankie-zhu-9987a51
  - Email: mailto:zhu.frankie@gmail.com
- [ ] Update navigation and footer links to the new section IDs.
- [ ] Remove presentation mode, timer markup, timer controls, timer styles, timer JavaScript, and TIMER_MODE command behaviour.
- [ ] Update command-menu items to navigate to the approved sections and retain the QR command.
- [ ] Update QR copy so it describes sharing the public profile, not a team presentation.
- [ ] Add restrained education/connect styles consistent with the existing design.
- [ ] Run the full contract test and confirm it passes; do not commit.

### Task 6: Responsive, accessibility, and local visual QA

- [ ] Review breakpoints around 1024px and mobile widths; make the hero, evidence cards, tab controls, hobby grid, education strip, and connect links collapse cleanly.
- [ ] Check semantic headings, link labels, button types, visible focus states, keyboard tab order, decorative aria-hidden use, and meaningful avatar alt text.
- [ ] Run:
  /Users/frankiezhu/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test tests/site-contract.test.mjs
- [ ] Run git diff --check.
- [ ] Search the full implementation paths for prohibited employer, timer, unsupported-metric, invented-route, and credential terms.
- [ ] Start a local server on 127.0.0.1:4173 using the bundled Python runtime.
- [ ] Inspect at approximately 1440 × 1000 and 390 × 844.
- [ ] Exercise all three tabs, football formations, snooker break-builder, three route selectors, command menu, QR modal, LinkedIn link, and email link.
- [ ] Compare the combined diff against the saved baseline so valuable user changes are not accidentally lost.
- [ ] Show Frankie the local preview and stop for content and look-and-feel approval. Do not commit implementation files and do not push.

### Task 7: Apply the two explicit release gates

- [ ] After Frankie explicitly approves the local preview, rerun the contract test and git diff --check.
- [ ] Stage only index.html, css/style.css, js/app.js, assets/frankie-avatar.png, and tests/site-contract.test.mjs.
- [ ] Review the staged diff for employer privacy, factual accuracy, planned-trip labelling, and absence of unsupported claims.
- [ ] Create one local implementation commit. Do not push.
- [ ] Tell Frankie that the approved version is committed locally and request separate publishing approval.
- [ ] Only after explicit publishing approval, push the approved commit to origin/main.
- [ ] Verify the deployed GitHub Pages URL and key interactions after deployment.

## Plan self-review

- [ ] Search this plan for unresolved placeholder language.
- [ ] Cross-check every approved specification section against at least one task above.
- [ ] Confirm every referenced file path, selector name, interaction, and verification command is internally consistent.
- [ ] Confirm the implementation and publishing approvals remain separate gates.
- [ ] Run git diff --check before committing this plan document.
