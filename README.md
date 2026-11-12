# Ammo Reference Library

Firearm cartridge, caliber, rifle and optics reference charts. Open `index.html` or visit the GitHub Pages site.

Many figures (velocities, BCs, prices, specs) are typical values and estimates; check manufacturer data before relying on them.

Live site: https://ammochart.pages.dev

Tips page priorities: tips labeled "Must know" in red prevent accidents or wasted hunts, tips labeled "Should know" in orange are worth learning early, and the rest are general tips.

Visitor stats: Cloudflare Web Analytics (Pages project > Metrics > View Web Analytics).

Data check: the same cartridge facts appear on the charts, the profile pages, the compare pages and the deer guide. After editing any of them, run `node tools/check-consistency.mjs` (Node 18+, no install). The charts are the source of truth; it exits non-zero and lists anything that disagrees.
