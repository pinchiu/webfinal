# Graph Report - 0511  (2026-06-02)

## Corpus Check
- 17 files · ~637,954 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 218 nodes · 247 edges · 27 communities (12 shown, 15 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `caadaa99`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]

## God Nodes (most connected - your core abstractions)
1. `CompanyModel` - 13 edges
2. `CompanyView` - 11 edges
3. `UiView` - 11 edges
4. `DesignSystemGenerator` - 11 edges
5. `ThreeView` - 10 edges
6. `ui-ux-pro-max` - 9 edges
7. `HudView` - 8 edges
8. `_search_csv()` - 8 edges
9. `DockingView` - 7 edges
10. `BM25` - 7 edges

## Surprising Connections (you probably didn't know these)
- `generate_design_system()` --calls--> `DesignSystemGenerator`  [EXTRACTED]
  .gemini/skills/ui-ux-pro-max/scripts/design_system.py → .gemini/skills/ui-ux-pro-max/scripts/design_system.py  _Bridges community 2 → community 3_

## Communities (27 total, 15 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.08
Nodes (23): Accessibility, Available Domains, Available Stacks, code:bash (python3 --version || python --version), code:bash (# ASCII box (default) - best for terminal display), code:bash (brew install python3), code:bash (sudo apt update && sudo apt install python3), code:powershell (winget install Python.Python.3.12) (+15 more)

### Community 1 - "Community 1"
Cohesion: 0.15
Nodes (15): BM25, detect_domain(), _load_csv(), Lowercase, split, remove punctuation, filter short words, Build BM25 index from documents, Score all documents against query, Load CSV and return list of dicts, Core search function using BM25 (+7 more)

### Community 2 - "Community 2"
Cohesion: 0.16
Nodes (9): DesignSystemGenerator, Select best matching result based on priority keywords., Extract results list from search result dict., Generate complete design system recommendation., Generates design system recommendations from aggregated searches., Load reasoning rules from CSV., Execute searches across multiple domains., Find matching reasoning rule for a category. (+1 more)

### Community 3 - "Community 3"
Cohesion: 0.17
Nodes (16): _detect_page_type(), format_ascii_box(), format_markdown(), format_master_md(), format_page_override_md(), generate_design_system(), _generate_intelligent_overrides(), persist_design_system() (+8 more)

### Community 6 - "Community 6"
Cohesion: 0.17
Nodes (12): code:bash (python3 skills/ui-ux-pro-max/scripts/search.py "<keyword>" -), code:bash (python3 skills/ui-ux-pro-max/scripts/search.py "<product_typ), code:bash (python3 skills/ui-ux-pro-max/scripts/search.py "beauty spa w), code:bash (python3 skills/ui-ux-pro-max/scripts/search.py "<query>" --d), code:bash (python3 skills/ui-ux-pro-max/scripts/search.py "<query>" --d), code:bash (python3 skills/ui-ux-pro-max/scripts/search.py "<keyword>" -), How to Use This Skill, Step 1: Analyze User Requirements (+4 more)

### Community 10 - "Community 10"
Cohesion: 0.22
Nodes (8): companyView, controller, dnaView, dockingView, hudView, model, threeView, uiView

### Community 11 - "Community 11"
Cohesion: 0.25
Nodes (8): code:bash (python3 skills/ui-ux-pro-max/scripts/search.py "beauty spa w), code:bash (# Get UX guidelines for animation and accessibility), code:bash (python3 skills/ui-ux-pro-max/scripts/search.py "layout respo), Example Workflow, Step 1: Analyze Requirements, Step 2: Generate Design System (REQUIRED), Step 3: Supplement with Detailed Searches (as needed), Step 4: Stack Guidelines

## Knowledge Gaps
- **38 isolated node(s):** `model`, `companyView`, `threeView`, `dockingView`, `dnaView` (+33 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `ui-ux-pro-max` connect `Community 0` to `Community 11`, `Community 6`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Why does `How to Use This Skill` connect `Community 6` to `Community 0`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `DesignSystemGenerator` connect `Community 2` to `Community 3`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **What connects `model`, `companyView`, `threeView` to the rest of the system?**
  _64 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.14736842105263157 - nodes in this community are weakly interconnected._