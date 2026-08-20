---
target: example/App.tsx
total_score: 15
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 3
timestamp: 2026-08-20T09-40-35Z
slug: example-app-tsx
---
Method: dual-agent (A: b65bbaec-2d3c-415f-817f-da6bc1de95de · B: f1f59eb8-e6b7-446c-b885-4c9d2f9a647c)

# Critique: example/App.tsx (LiteGraph React Examples)

**Mode:** Operate (library demo / tool UI)
**Design Health:** 15/40 — Poor

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Tab active + node count; Basic/run/save status mostly console/alert |
| 2 | Match System / Real World | 2 | API labels fit evaluators; empty Basic canvas speaks to no one |
| 3 | User Control and Freedom | 2 | Start/Stop/Clear exist; Clear/Load lack undo/confirm; alerts trap flow |
| 4 | Consistency and Standards | 2 | Programmatic bar vs Hooks floating panel; not a real tab control |
| 5 | Error Prevention | 1 | Clear unrestricted; Load overwrites; silent createNode miss |
| 6 | Recognition Rather Than Recall | 1 | Basic forces recall of LiteGraph gestures; no on-canvas legend |
| 7 | Flexibility and Efficiency | 2 | Three demos help power users; no chrome shortcuts |
| 8 | Aesthetic and Minimalist Design | 2 | Sparse shell OK; Hooks dense; generic boilerplate look |
| 9 | Error Recovery | 1 | alert + console; Clear irreversible in UI |
| 10 | Help and Documentation | 0 | Zero in-UI help, empty state, or gesture legend |
| **Total** | | **15/40** | **Poor** |

## Design Specificity Verdict

**LLM assessment:** Category-interchangeable. Stock dark IDE demo (#1e1e1e / #333 / #007acc, system fonts). Swap the H1 and it could be any canvas sandbox. No node-graph craft language in the chrome; package identity is a string only. Character lives in inherited LiteGraph canvas menus, not the example shell.

**Deterministic scan:** CLI `detect.mjs` on `example` exited 0 with `[]` but ran **DEGRADED** (missing HTML parsers → regex undercount — not a clean bill of health). Browser live detector reported **1** finding: `flat-type-hierarchy` (13.3px / 16px / 18px, ratio 1.4:1) — agrees with the weak type scale in the header. Detector did not catch the empty Basic state or Hooks overload (those are structural UX, not anti-pattern rules).

**Visual overlays:** Injection succeeded during Assessment B via Playwright fallback (`detect.js` from live-server :8400). Console: `[impeccable] 1 anti-pattern found` (`flat-type-hierarchy`). Live-server was stopped after evidence collection, so overlays are not still live in a browser tab unless re-injected.

## Overall Impression

The three-tab IA is the right story for a React library demo — then the default tab strands you on an empty grid with feedback in the console. Biggest opportunity: make Basic prove the graph is alive in under 10 seconds (seeded graph or empty-state coach), then tame Hooks into ≤4 primaries.

## What's Working

1. **Three integration modes** (Basic mount, programmatic createNode, useGraph toolbar) match how evaluators judge a React library.
2. **Canvas-first full-viewport layout** correctly treats the graph as the work surface.
3. **Hooks selection chip + disabled Remove + edit/run/I/O dividers** show real API affordances without leaving the page.

## Priority Issues

### [P0] Basic example is a dead empty canvas
- **Why it matters:** Default tab; first path to "try an example." No nodes, no copy, no gesture hint → bounce or "is it broken?"
- **Fix:** Seed Const→Watch *or* empty-state overlay: "Right-click → Add node" + point to Programmatic/Hooks.
- **Suggested command:** `/impeccable onboard`

### [P1] Zero instructional / help layer
- **Why it matters:** Operate demos must teach the domain gesture once; Heuristic 10 = 0.
- **Fix:** Persistent one-line status/coach across tabs; docs link secondary.
- **Suggested command:** `/impeccable clarify`

### [P1] Hooks toolbox overloads and interrupts
- **Why it matters:** 8 peer buttons + `alert()` break concentration on wiring/running.
- **Fix:** ≤4 primaries (Add, Run, Save, More…); toast/inline status; confirm Clear/Load.
- **Suggested command:** `/impeccable distill`

### [P1] Accessibility gaps on example chrome
- **Why it matters:** Tab buttons aren't a tablist; emoji-led labels; alert success path; canvas outline none — chrome adds barriers on top of a hard canvas.
- **Fix:** Real tab semantics, visible focus, text labels, non-blocking status.
- **Suggested command:** `/impeccable audit`

### [P2] Inconsistent chrome between Programmatic and Hooks
- **Why it matters:** Same jobs look like two products; raises "which API is recommended?"
- **Fix:** One docked toolbar pattern; Hooks-only extras secondary.
- **Suggested command:** `/impeccable layout`

## Persona Red Flags

**Alex (Power User):** Basic wastes a click on emptiness; Save/Load via alert feels amateur; no chrome shortcuts → skips to reading source.

**Jordan (First-Timer):** Blank Basic grid; won't know RMB/search; "Programmatic"/"Hooks API" opaque; 8 emoji buttons without Const/Watch explanation → abandon.

**Sam (Accessibility-Dependent):** No ARIA tabs; emoji meaning unreliable in SR; blocking alerts; no documented non-pointer path in the example UI.

## Cognitive Load

**7/8 checklist failures** (high). Hooks decision point: **8** visible actions (>4).

## Minor Observations

- Resize uses `window.innerWidth` at render (stale on resize)
- localStorage key `lightgraph-save` vs product LiteGraph
- Only `basic/const` and `basic/watch` demoed
- Console emoji logs as status; minimap on empty Basic is decorative noise
- Flat type hierarchy (detector): 13.3 / 16 / 18px

## Questions to Consider

1. If the default tab can't produce a visible graph in 10 seconds without prior LiteGraph knowledge, is this an example app or a blank host?
2. Should the demo optimize for "prove the React API" or "prove the graph is alive"?
3. What if chrome stayed hidden until a seeded graph taught the first gesture?
