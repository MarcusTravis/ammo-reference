# Changelog

Every data and site change on [ammochart.net](https://ammochart.net/), newest first, with before → after values and sources.
The plain-English summary for readers is the [Updates page](https://ammochart.net/updates).

Status key used in the audit tables: ✓ = matches source · ✎ = changed · ~ = generic row, inside the published range · ? = could not confirm (reason given).

## 2026-11-12

### Added: Updates page, changelog, "Data last checked" dates

- New `updates.html` (in `sitemap.xml`), linked from the home page footer ("Last updated").
- Every chart now shows "Data last checked: <date> · What changed" under its title (one `<p class="checked">` per chart; style in `theme.css`).
- This `CHANGELOG.md`.

### Full data audit of all 17 charts (298 rows)

Commits: `af9955c` hunting · `7adf9d6` precision · `6c1ef5d` wildcats · `9d7704b` military surplus · `c139dd6` AR calibers · `6cb0d71` rimfire · `8f1f5be` big bore · `7fa9986` handguns · `f6f8e4a` + `5d28fcf` shotshells · `2039d0b` rifle models · `15e9427` scopes · `2c9b317` thermal scopes · `3e8e5a2` thermal monoculars · `1a8729a` rangefinders · `338c570` binoculars · `deaf3d3` muzzleloaders · `ca2ceea` airguns.

Method: each row was matched to a named factory load or product and checked against the maker's published page or catalog (SAAMI or a spec sheet where no maker load applies). Generic "≈" rows were kept when inside the published range of common factory loads. Values were never copied from one chart to another as a fix. Derived numbers were recomputed for every changed row: energy = gr × fps² / 450,240; MPBR with a G1 point-mass solver at sea-level standard air (1.5" scope, or 0.6" iron sights on muzzleloaders, handguns and slugs as each chart states); precision drop and drift with a 100 yd zero and 10 mph full-value wind; supersonic range to 1,125 ft/s. Profiles, compare pages and the deer guide were re-synced, and `node tools/check-consistency.mjs` passed after every commit.

Only changed rows are listed below. Rows that matched their source are not repeated here.

Bulk sources used repeatedly:
- Hornady 2025 Product Catalog: https://static.hornady.media/presscenter/docs/1411003962-1737389455-Hornady-2025-Product-Catalog.pdf
- Hornady 2026 Product Catalog: https://static.hornady.media/presscenter/docs/1411008168-1768498925-Hornady-2026-Product-Catalog.pdf
- Federal (federalpremium.com), Remington (remington.com) and CCI (cci-ammunition.com) product pages.
- Aggregator cross-check only, never the sole source for a change: ballistic-buddy.com.

#### Hunting (hunting.html) — 33 rows

| Row | Load identified | Status | Before → After | Source |
|---|---|---|---|---|
| .22 Long Rifle | CCI Mini-Mag 40 gr RN 1,235 fps | ~ BC .12 in CCI range (.118–.138); MPBR recalc 80→79 yd, s100 -4.00→-4.10 | MPBR rounding only | https://www.cci-ammunition.com/rimfire/cci/target-mini-mag/6-30.html (CCI 0030: 40 gr CPRN, 1,235 fps, 135 ft-lbs) |
| .22 LR Subsonic | CCI Subsonic HP 40 gr 1,050 | ~ (BC fixed in the consistency pass, `7ab882b`); s100 -6.39→-6.46 recalc | recalc | CCI 0056 Sub-Sonic HP, BC .120 (see consistency fixes below) |
| .223 Remington | Federal Power-Shok 223A 55 SP 3,240 | ✎ BC ≈0.24 → ≈0.22 (Federal .222; Rem/Win 55 PSP .198); MPBR 252→248 | ✎ | https://www.federalpremium.com/rifle/power-shok/11-223A.html |
| 22 ARC | Hornady 88 ELD Match #81543 | ✎ 2,750 → 2,820 fps, 1,478 → 1,554 ft-lbs; MPBR 237→243 (4"), 277→283 (6") | ✎ | Hornady 2025 catalog p. ballistics (81543 2820/1554, BC .545) |
| 6mm ARC | Hornady 103 ELD-X #81602 | ✎ 2,750 → 2,800 fps, 1,729 → 1,793 ft-lbs; MPBR 275→280 (6"), 236→240 (4") | ✎ | Hornady 2025 catalog (81602 2800/1793) |
| 6mm Remington | Remington Core-Lokt R6MM4 100 PSP 3,100 / .356 | ✎ BC ≈0.38 → ≈0.36; MPBR 295→296 | ✎ | https://www.remington.com/rifle/shop-by-caliber/shop-all-calibers/29-29051.html |
| .25-06 Remington | "117 gr SST" at 2,990 does not exist (SST Superformance is 3,110). 2,990 = Hornady American Whitetail 117 InterLock BTSP | ✎ load "117 gr SST" → "117 gr InterLock BTSP", BC .390 → .391; MPBR 293→289 | ✎ | https://www.hornady.com/ammunition/rifle/25-06-rem-117-gr-interlock-btsp-american-whitetail |
| .25 Creedmoor | Hornady Precision Hunter 128 ELD-X #81422 | ✎ 3,075 → 2,850 fps, 2,687 → 2,308 ft-lbs; introduced 2023 → 2025 (SAAMI acceptance/launch 2025); MPBR 264→248 | ✎ | https://www.hornady.com/ammunition/rifle/25-creedmoor-128-gr-eld-x ; https://static.hornady.media/site/hornady/files/load-data/25-creedmoor.pdf |
| .25 PRC | No factory 25 PRC ammo exists (not in Hornady 2025/2026 catalogs, no Hornady product page; it is a wildcat of 6.5 PRC brass) | ✎ yr "2022" → "Wildcat · handload only"; "Hornady's…" text → wildcat text; load 134 ELD-X (no such bullet) → 134 ELD Match (Hornady BC .645); fps 3,200 kept (inside reported 3,000–3,300 handload range); MPBR 274→277, 320→324 | ✎ / ? velocity is a handload figure | Hornady 25 CM load data (134 ELD-M .645), forum handload reports (accurateshooter, longrangehunting) |
| .257 Blackbird | Wildcat, 131 Blackjack ACE ~3,400 handload | ~ (BC ≈0.66 consistent with Blackjack G7 .330–.340) | lede: "factory load" → "handload" | https://www.longrangehunting.com/threads/257-blackbird-250-7-blaser-for-131-ace-0-340-g7-3400-3500-fps.244761/ |
| 6.5 Creedmoor +Peak | Federal Gold Medal GM65CRDPKTMK1 153 Sierra **Tipped** MatchKing | ✎ 2,900 → 2,850 fps, ≈0.70 → .642, "153 gr Sierra MatchKing" → "153 gr Sierra Tipped MatchKing", introduced 2025 → 2026 (announced Jun 5 2026), "about 200 fps faster" → "up to 300 fps faster" (Federal's claim); MPBR 296→290 | ✎ | https://www.federalpremium.com/rifle/gold-medal-sierra-tipped-matchking/11-GM65CRDPKTMK1.html ; https://www.federalpremium.com/nr26_FP_Introducing_65CreedmoorPeak_FNL.html |
| .270 Winchester | Federal 270A 130 SP 3,060 / .372 (Core-Lokt .336) | ✎ BC ≈0.40 → ≈0.37; MPBR 296→293 | ✎ | https://www.federalpremium.com/rifle/power-shok/11-270A.html |
| 7mm Remington Mag | Federal 7RA 150 SP 3,110 / .408 | ~ BC ≈0.40 ok; MPBR was stale: 295 → 301 | ✎ recalc | https://www.federalpremium.com/rifle/power-shok/11-7RA.html |
| .30-06 Springfield | 165 SP 2,800: Core-Lokt R3006B .339, Win X30065 .399 | ~ ≈0.40 at top of range; MPBR was stale: 267 → 273 | ✎ recalc | https://www.remington.com/rifle/shop-by-caliber/shop-all-calibers/29-R21415.html |
| .338 Winchester Mag | 225 SP 2,780: Core-Lokt .435, Federal Speer Hot-Cor 338ES .420 | ✎ BC ≈0.40 → ≈0.43 (MPBR unchanged 273) | ✎ | https://www.remington.com/rifle/shop-by-caliber/shop-all-calibers/29-22189.html |
| .375 H&H Magnum | 300 SP 2,530: Federal 375B .323, Hornady DGX/DGS .275 | ~ ≈0.30 ok; MPBR was stale: 243 → 239 | ✎ recalc | ballistic-buddy (maker figures) + Hornady 2025 catalog |

Downstream: 17 profiles, 15 compare pages (tables + short-answer sentences), 6 deer-guide rows re-synced.

#### Precision / long range (precision.html) — 13 rows

| Row | Load identified | Status | Before → After | Source |
|---|---|---|---|---|
| .300 Norma Magnum | Berger factory 230 Hybrid OTM Tactical | ✎ 2,800 → 2,934 fps, 4,004 → 4,397 ft-lbs, BC .743 → .717; 1,000 yd drop 277.0 → 253.1", wind 54.4 → 53.0", supersonic 1,786 → 1,824 yd | ✎ | https://bergerbullets.com/product/300-norma-magnum-230gr-hybrid-otm-tactical/ |
| .375 CheyTac | CheyTac 350 gr Balanced Flight solid, 2,950 (29.5", 1:9.5) | ✎ BC .900 → .988, twist 1:10 → 1:9.5; 1,000 yd 228.2 → 221.5", wind 39.7 → 35.5", supersonic 2,306 → 2,533 yd (energy 6,763 → 6,765 rounding) | ✎ | https://cheytac.com/wp-content/uploads/2026/03/MIL-Catalog-2026.pdf ; https://cheytac.com/product/cheytac-375-350-gr-ammunition/ |
| .416 Barrett | Barrett 395 gr turned-brass solid VLD 3,250 | ✎ BC .950 → .730; 1,000 yd 180.3 → 198.8", wind 32.4 → 44.6", supersonic "2,600+" → 2,085 yd (article: "supersonic past 2,150 yd") | ✎ | https://www.shootingtimes.com/editorial/ammunition_st_goingthedistance_20001/100044 (Barrett-supplied BC .730) — ? no live Barrett spec page found |
| .50 BMG | Hornady 750 A-MAX #8270 (36" bbl) | ✎ 2,820 → 2,815 fps, 13,242 → 13,200 ft-lbs; drops/wind recomputed (±0.9") | ✎ | Hornady 2025 & 2026 catalogs (8270: 2815 / 13,196 / BC 1.050) |

#### Wildcats (wildcats.html) — 14 rows

Wildcats have no factory ammo; each row is a typical handload. Checked: bullet exists and its BC matches the bullet maker; velocity is inside commonly reported handload range; MPBR matches the solver.

| Row | Bullet / load | Status | Before → After | Source |
|---|---|---|---|---|
| .22 BR | Nosler 55 Ballistic Tip Varmint .267 @ 3,700 | ✓ BC; ✎ MPBR stale 284 → 287 (far 246 → 248) | ✎ recalc | Nosler bullet spec |
| 6.5 SAUM | Hornady 140 ELD-M .646 @ 2,950 | ✓ BC; ✎ MPBR stale 297 → 300 | ✎ recalc | https://www.hornady.com/ammunition/rifle/6-5-creedmoor-140-gr-eld-match (bullet BC) |
| .30 BR | 118 gr flat-base benchrest @ 2,950 | ? BC ≈0.25 not published for a specific 118 FB bullet; velocity ✓ (2,950–3,050); ✎ MPBR stale 282 → 268 (was computed with a higher BC) | ✎ recalc | https://www.6mmbr.com/30br.html |
| .30-30 Ackley Improved | 150 gr flat nose @ 2,500 | ✎ BC ≈0.27 → ≈0.19 (Sierra 150 FN Pro-Hunter .185, Hornady 150 RN .186, Speer 150 FN .255); MPBR 222 → 220 | ✎ | https://grafs.com/products/sierra-30-308-150gr-fn-bullet-prohunter-100bx ; https://www.speer.com/bullets/rifle-bullets/hot-cor-rifle-bullet/ |
| .30-06 Ackley Improved | 180 SP ≈0.45 @ 2,850 | ~ ; ✎ MPBR stale 283 → 281 | ✎ recalc | generic (Hornady 180 InterLock SP .452) |

#### Military surplus (military-surplus.html) — 18 rows

Source for service loads: the issuing military's spec as summarised (with citations) on each cartridge's Wikipedia page
(https://en.wikipedia.org/wiki/<cartridge>), cross-checked against TM 43-0001-27 figures (US loads at 78 ft). MPBR uses the page's own
iron-sight assumption (0.9" sight height, 6" zone).

| Row | Service load | Status | Before → After |
|---|---|---|---|
| .45-70 Government | .45-70-405, 405 gr lead RN 1,350 (Springfield Armory 1874) | ✓ load; BC ≈0.28 ~ (Rem 405 SP .281); ✎ MPBR stale 127 → 131 yd | ✎ recalc |
| 7.62x54R | 1908 L light ball 148 gr ~2,800 (9.6–9.7 g, 865 m/s) | ✎ BC ≈0.38 → ≈0.34 (L-bullet G1 ≈0.338); MPBR 263 → 260 | ✎ |
| 6.5 Carcano | 10.5 g (162 gr) RN 700 m/s | ✓; ✎ MPBR stale 209 → 212 | ✎ recalc |
| 6.5x50 Arisaka | Type 38 139 gr 770 m/s | ✓; ✎ MPBR stale 239 → 241, energy 1,929 → 1,930 (rounding) | ✎ recalc |
| 7.5x55 Swiss | GP 11, 174 gr, 780 m/s | ✎ 2,640 → 2,560 fps, 2,693 → 2,533 ft-lbs, BC ≈0.50 → ≈0.51 (G1 .505–.514); MPBR 257 → 249 | ✎ |
| 5.45x39 | 7N6 53 gr 880 m/s | ✓; BC ≈0.33 ✓ (BRL G7 .168); ✎ MPBR stale 265 → 268 | ✎ recalc |

Pages: https://en.wikipedia.org/wiki/7.5×55mm_Swiss (GP 11 780 m/s, BC .505–.514), https://en.wikipedia.org/wiki/7.62×54mmR (L-bullet G1 ≈0.338), https://en.wikipedia.org/wiki/8×50mmR_Lebel, https://en.wikipedia.org/wiki/.45-70 and the others above.

#### AR calibers (ar-calibers.html) — 20 rows

Hornady rows checked against the 2026 Hornady catalog ballistics table (https://www.hornady.com/catalogs); aggregator = ballistic-buddy.com factory-load lists.
Energy uses the chart's formula; where a cartridge also appears on Hunting the Hunting figure (450,400 constant) is used so the two agree.

| Row | Load | Status / source | Before → After |
|---|---|---|---|
| 5.56 NATO / .223 | 55 gr FMJ/SP 3,240 | ✓ Federal AE223 3,240 / .269; Hornady 80275 .243; Federal 223A SP .222 → ≈0.25 inside range | — |
| 22 ARC | Hornady 81543 88 ELD-M | ✎ catalog 2,820 (24") | 2,750 → 2,820 fps; 1,478 → 1,554 ft-lbs |
| .224 Valkyrie | Federal GM224VLK1 90 SMK | ✓ 2,700; BC .504 (aggregator) → ≈0.50 | — |
| 6mm ARC | Hornady 81602 103 ELD-X | ✎ catalog 2,800 (the 2,750 figure belongs to the 105 BTHP / 108 ELD-M loads) | 2,750 → 2,800; 1,729 → 1,793 |
| 6.8 SPC | Hornady 83464 110 V-Max (16" Bbl) | ✎ catalog 2,575 (2,550 was the discontinued 8346 listing); BC .370 ✓ | 2,550 → 2,575; 1,588 → 1,620 |
| .50 Beowulf | Alexander Arms 350 gr XTP | ✎ maker: "BC 0.145, nominal muzzle velocity 1,750 FPS" (https://www.shopalexanderarms.com/Ammunition-_50_Beowulf_350g_XTP_Loaded_Ammunition_box_OS.html); Steinel 350 JHP ~1,775 | 1,850 → 1,750; 2,660 → 2,381; BC ≈0.16 → ≈0.15 |
| .338 Federal | Federal 200 gr soft point | ✎ Federal Fusion F338FFS2 2,700 / .416 (https://www.federalpremium.com/rifle/fusion/11-F338FFS2.html); Power-Shok 338FJ 2,700 / .410 | 2,630 → 2,700; 3,071 → 3,238; BC ≈0.40 → ≈0.41 |

#### Rimfire (rimfire.html) — 7 rows

MPBR here uses the page's 50 yd sight-in display; recomputed with the same G1 model (1.5" sight height).

| Row | Load | Status / source | Before → After |
|---|---|---|---|
| .22 LR | CCI Mini-Mag 40 gr HV | ✓ 1,235 (aggregator: CCI 0030 1,235, BC .134 / segmented HP .118 → ≈0.12) | ✎ MPBR 80 → 79 yd, sight-in @50 0.94 → 0.93" (same model as the Hunting row, which was already 79) |
| .22 WMR | 40 gr JHP | ✓ 1,910 (Winchester X22MH / Remington R22M1 1,910, BC .112–.117; CCI Maxi-Mag 1,875) | ✎ MPBR stale: 2" 112 → 110 (far 98 → 97, @50 0.88 → 0.90"); 4" 139 → 136 (far 120 → 118, @50 1.62 → 1.65") |

Compare pages re-synced: 22-long-rifle-vs-22-wmr, 17-hmr-vs-22-wmr.

#### Big bore (big-bore.html) — 13 rows

Loads: Hornady 2026 catalog (Dangerous Game DGS/DGX rows), Federal / Norma via aggregator, Kynoch for the classic nitro loads
(Kynoch figures via https://ballisticengine.com/database/bullet-energy and Wikipedia infoboxes). All velocities checked; **no load values changed**.
MPBR recomputed for every row with the site model (6" zone, 1.5" sight height); the old values were from an earlier solver and drifted 1–7 yd.

| Row | Load | Status / source | MPBR before → after |
|---|---|---|---|
| .375 H&H | 300 gr SP/DGS 2,530 | ✓ Hornady 82322 / 82334 2,530 / 4,263; BC ≈0.30 ~ (DGS/DGX .275, Federal SP higher) | 243 → 239 (now matches Hunting) |
| .375 Ruger | Hornady 82336 300 DGX Bonded | ✓ 2,660 / 4,713, BC .275 | 255 → 248 |
| .404 Jeffery | 400 gr solid | ✓ in range: Norma solid 2,325 (https://www.norma-ammunition.com/products/hunting/norma-african-ph-solids/norma-solid-404-jeffery-riml-n-e-400gr---20110352), Buffalo Bore 2,375, Hornady DGS 2,300 | 224 → 226 |
| .458 Win Mag | Federal P458C 500 gr solid | ✓ 2,090 (Hornady DGS 2,140) | 200 → 201 |
| .458 Lott | Hornady 8262 500 DGS | ✓ 2,300 / 5,873 | 218 → 219 |
| .450/400 3" | Hornady 8242 400 DGS | ✓ 2,050 / 3,732 | 196 → 199 |
| .500 NE 3" | Kynoch 570 gr solid | ✓ 2,150 (Kynoch; Wikipedia .500 Nitro Express infobox). Hornady's 570 DGS is 2,120 | 209 → 208 |
| .505 Gibbs | Kynoch 525 gr solid | ✓ 2,300 / 6,165 (Kynoch); Norma 540 solid 2,300 | 219 → 221 |
| .600 NE | Kynoch 900 gr solid | ✓ 1,950 / 7,599 | 188 ✓ (far zero 160 → 161) |

BC "≈" values on the nitro rows (0.30–0.33) are typical round-nose solid figures; ? no maker publishes G1 for these Kynoch loads.
Compare pages re-synced: 375-h-and-h-magnum-vs-375-ruger, 416-rigby-vs-458-lott.

#### Handguns (handguns.html) — 17 rows

MPBR uses the page's iron-sight model (0.6" sight height, 25 yd sight-in). Sources: Hornady 2026 catalog handgun table (test barrel stated per load),
Remington 2025 catalog handgun table, maker pages, and Ballistics By The Inch (BBTI) for real-barrel rimfire numbers.

| Row | Load | Status / source | Before → After |
|---|---|---|---|
| 5.7x28mm | FN SS197SR 40 gr V-Max | ✎ FN: "Five Seven Pistol Muzzle Velocity: 1738 fps, 268 ft-lbs" (https://fnamerica.com/products/5-7x28mm/fn-ss197sr-5-7x28mm/). BC 0.20 is Hornady's 40 gr V-Max bullet G1, not FN | 1,650 → 1,738 fps; 242 → 268 ft-lbs; MPBR 145 → 155 |
| .380 ACP | 90 gr JHP | ~ in range: Hornady 90 XTP/FTX 1,000 (4"), Remington 88 HTP 990, PMC 90 JHP 917 | MPBR @25 2.42 → 2.43" |
| .38 Special | 158 gr LRN | ✎ every published 158 LRN load is 755 (Remington RPW38S5 / L38S5 755 fps, BC .148, 4" V, Remington 2025 catalog; SAAMI 755) | 800 → 755 fps; 225 → 200 ft-lbs; MPBR 81 → 76 |
| .357 Magnum | 158 gr JHP | ✓ 1,235 (Remington RTP357M2A 158 SJHP, BC .145) | MPBR 116 → 115 |
| .357 SIG | 125 gr JHP | ✓ 1,350 (Remington GSB357SBB 125, BC .118) | @25 1.86 → 1.88" |
| .40 S&W | 180 gr JHP | ✓ in range (Hornady 180 XTP 950, Federal HST 1,010) | @25 2.32 → 2.33" |
| 10mm Auto | 180 gr JHP, 5" | ✓ Sig Elite V-Crown 180 and Fiocchi 10APHP 180 JHP 1,250 / 624 ft-lbs; Hornady 180 XTP 1,275 | MPBR 117 → 116 |
| .45 ACP | 230 gr JHP | ✓ in range (Remington 230 835, Federal HST 890) | MPBR 85 → 86 |
| .44 Magnum | 240 gr JHP | ✓ Hornady 9085 240 XTP 1,350 (7½" V test barrel; chart says 6") | @25 1.84 → 1.85" |
| .45 Colt | 255 gr lead FN | ✓ Winchester X45CP2 255 LRN 860 | far 73 → 72, @25 2.56 → 2.57" |
| .454 Casull | 300 gr | ✎ label: 1,650 fps / 1,813 ft-lbs is Hornady 9150 300 gr XTP Mag (BC .180, https://www.hornady.com/ammunition/handgun/454-casull-300-gr-xtp-mag), not a hard-cast load | "300 gr hard cast" → "300 gr XTP Mag"; BC ≈0.18 → 0.180 (maker) |
| .460 S&W | — | ✎ no "300 gr FTX" factory load exists (Federal's 300 gr is a Swift A-Frame at 1,750). The 8.375" barrel is Hornady's test barrel, so the row now shows Hornady 9152 200 gr FTX: 2,200 fps, BC .151 (https://www.hornady.com/ammunition/handgun/460-s-w-magnum-200-gr-ftx) | 300 gr FTX 2,000 / 2,664 / ≈0.20 → 200 gr FTX 2,200 / 2,149 / 0.151; MPBR 174 → 181 |
| .500 S&W | Hornady 9250 350 gr XTP Mag | ~ 1,900 / 2,805 matches Hornady's published figure, but that load is **discontinued** (current Hornady: 300 FTX 1,950, 500 FP-XTP 1,300) | MPBR 161 → 159 |

Compare pages re-synced: 10mm-auto-vs-44-magnum, 10mm-auto-vs-45-acp, 357-magnum-vs-44-magnum, 38-special-vs-357-magnum, 454-casull-vs-460-s-and-w-magnum, 9mm-luger-vs-45-acp.

#### Shotshells (shotshells.html) — 17 rows

Sources: Remington 2025 catalog shotshell tables (order no. · gauge · length · fps · oz · shot), Federal / Winchester product listings, Hornady product pages.
Slug MPBR uses the page model (6" zone, 0.6" sights, 50 yd sight-in).

| Row | Load | Status / source | Before → After |
|---|---|---|---|
| .410 Bore | 11/16 oz #6 lead, 1,135 | ✎ that payload/speed is the **3"** shell: Federal H413 6 "3in, 11/16 oz, 1135 FPS" (https://www.federalpremium.com/shotshell/game-load-upland/game-load-upland-hi-brass/11-H413+6.html); Remington 20775 3" 1,135 11/16 #6. 2½" loads are ½ oz at 1,200–1,250 | shell "2.5\"" → "3\"" |
| 20 ga sabot | Hornady 86232 250 gr SST | ✓ 1,800 / 1,798 ft-lbs; ✎ BC ≈0.19 → 0.200 (maker, https://www.hornady.com/ammunition/shotgun/20-ga-sst-slug-250-gr-sst) | MPBR 156 → 159 (far 133 → 136, @50 2.62 → 2.60") |
| 12 ga Brenneke | 1 oz, 1,475 | ✓ Brenneke Orange Lightning SL-122OL 1 oz 1,476 (https://www.brennekeusa.com/products) | MPBR 120 → 118 (far 102 → 100, @50 2.94 → 2.96") |
| 12 ga sabot | Hornady 8623 SST Slug 300 gr FTX | ✓ 2,000 / 2,664; BC 0.200 now marked maker-published (https://www.hornady.com/ammunition/shotgun/12-ga-sst-300-gr-ftx-slug) | MPBR 174 → 175 (far 148 → 149) |
| .22 LR shotshell | CCI 0039 31 gr #12 | ✎ CCI 2026 catalog: "22 LR SHOTSHELL 39 · #12 · 31 gr · 1000" (https://www.cci-ammunition.com/ → 2026 catalog PDF CC313) | 950 → 1,000 fps; pellet count 165 ~ (CCI publishes none; ≈169 from #12 pellets/oz) |
| .38/.357 shotshell | CCI 3738 #9 | ✎ CCI 2026 catalog: "38 SPL/357 MAG 3738 · #9 · 100 gr · 1050 fps (7.7\" barrel)". The old 109 gr / 1,000 fps figure is no longer listed | 109 gr → 100 gr; 1,000 → 1,050 fps; pellets 150 → 134 (computed: #9 lead ≈585/oz; CCI publishes no count) |

Pellet counts on lead/steel rows match standard pellets-per-ounce tables (#6 lead ≈225/oz, #8 ≈410/oz, #7½ ≈350/oz, #2 steel ≈125/oz, BB steel ≈72/oz).

#### Rifle models (rifle-models.html) — 22 rows

This chart has no ballistics. I checked the maker specs it quotes (trigger, guarantee, weight, barrel, magazine, chamberings) against maker pages or manuals. Street prices are estimates; I sanity-checked them against MSRP but did not re-price every row (~).
I could not verify the popularity notes ("Top-3 new rifle on GunBroker 2026" and similar) line by line, because GunBroker's Top Selling tool is behind a Cloudflare challenge. The Feb 2026 report (https://www.gunsandammo.com/editorial/top-selling-february-2026/547047) has Tikka T3x Lite at #1 and Ruger American Gen II Predator at #2 for new bolt-action rifles. GunBroker ranks within categories, so I narrowed the one absolute claim that was category-specific.

| Row | Status / source | Before → After |
|---|---|---|
| Browning X-Bolt 2 | ✎ the X-Bolt 2 uses the **DLX** trigger: "factory set to 3-1/2 lb but is adjustable down to 3 lb" (https://www.browning.com/news/tech-terms/dlx-trigger-xbolt-2-rifle.html). Feather trigger 3–5 lb was the original X-Bolt | "Feather trigger, adj. 3–5 lb" → "DLX trigger, adj. 3–3.5 lb" |
| Christensen Mesa / Ridgeline | ✎ the Mesa has a steel barrel; only the Ridgeline is carbon-wrapped. TriggerTech ✓, sub-MOA ✓; starting weights 5.5 (Mesa) / 6.4 lb (Ridgeline), so 6.1 lb ~ (https://christensenarms.com/product/mesa/, /ridgeline/) | purpose: "Lightweight carbon-fiber barreled hunting rifles…" → "Lightweight mountain and long-range hunting rifles; the Ridgeline adds a carbon-fiber-wrapped barrel (Mesa is all steel)." |
| CZ 457 | ✎ CZ spec: trigger adjustable 1.8–3.4 lb (8–15 N) (https://www.czfirearms.com/en-us/products/rimfire-rifles/cz-457-series/cz-457) | "Adj. 2–3 lb" → "Adj. 1.8–3.4 lb" |
| CVA Scout | ✎ claim narrowed: GunBroker ranks it #1 among new **single-shot** rifles; weight 5.6 lb ~ (retail listings 5.8 lb for 22"/25") | "#1 new rifle on GunBroker …" → "#1 new single-shot rifle on GunBroker in 2026" (purpose and popularity note) |

#### Scopes (scopes.html) — 25 rows

I checked the hard specs (weight, tube, focal plane, reticle, turret, illumination) against maker pages or maker-sourced spec sheets. Glass and tracking stars are editorial ratings and were not changed.
Popularity notes ("#1 on Amazon 2026", "Top-5 bought scope 2026", "18%/13% of top pros") are marked ? because I could not re-open their sources.

| Row | Status / source | Before → After |
|---|---|---|
| Vortex Triumph HD 3-9x40 | ✎ Vortex: "Weight 16.5 oz", 1", SFP, Dead-Hold BDC, capped (https://vortexoptics.com/triumph-hd-3-9x40-riflescope.html) | 14 → 16.5 oz |
| Bushnell R7 4-20x50 | ✎ Outdoor Life's 2026 Editor's Choice is the **R7 4-20x50 FFP MOA Hybrid Dot Tree Illuminated** (https://www.outdoorlife.com/gear/best-rifle-scopes-for-hunting/). Bushnell spec (https://www.bushnell.com/products/r7-4-20x50-riflescopes): FFP, illuminated etched reticle, exposed locking elevation with zero stop, 30mm, 25.2 oz, $949.95 FFP / $899.95 SFP. The old row described a $260, 19 oz, 1", non-illuminated SFP scope, which does not match any R7 | price $230–290 → $900–950; SFP · Hunting BDC → FFP · Hybrid Dot Tree (MOA); Capped → Exposed, locking, zero stop; 19 oz · 1" · no illum → 25 oz · 30mm · Illuminated; tags sfp/budget → ffp/mid; purpose and pro text updated |
| Vortex Diamondback 4-12x40 | ✎ 14.2 oz (https://vortexoptics.com/diamondback-4-12x40-dead-hold-bdc-moa.html) | 15 → 14 oz |
| Burris Fullfield IV 3-9x40 | ✎ not in Burris's 2025 catalog. The matching current scope is the **Fullfield E1 3-9x40**: Ballistic Plex, 1", 13.0 oz, MSRP $192 (https://www.burrisoptics.com/sites/default/files/2025-01/2025_FULLProductCatalog.1.19.25-compressed.pdf); street $136–170 | name → "Fullfield E1 3-9x40"; $250–350 → $140–190 |
| Vortex Viper HD 3-15x44 | ✎ 21.5 oz (retail spec listings citing Vortex) | 19 → 21.5 oz |
| Leupold VX-5HD 3-15x44 | ✎ CDS-ZL2 19.7 oz, 30mm (https://www.leupold.com/vx-5hd-3-15x44-cds-zl2-side-focus-duplex-riflescope) | 17 → 20 oz |
| Zeiss Conquest V4 4-16x44 | ✎ 22.6 oz (Zeiss spec sheet) | 20 → 23 oz |
| Nightforce SHV | ✎ the SFP SHV with Forceplex/MOAR is now the **4-14x56**: 26.9 oz, or 28.5 oz illuminated, 30mm (https://www.nightforceoptics.com/riflescopes/shv/shv-4-14x56). The 4-14x50 is now F1 (FFP) only, at 30.0 oz. Retail is about $1,128 | name "SHV 4-14x50" → "SHV 4-14x56"; 22 → 28.5 oz; $1,000–1,300 → $1,100–1,400 |
| Trijicon AccuPoint 5-20x50 | ✎ "Weight 26.9 oz", MSRP $1,551 (https://www.trijicon.com/products/details/tr23-1g) | 24 → 27 oz |
| Arken EP5 5-25x56 | ✎ 39.2 oz (https://www.arkenopticsusa.com/products/ep-5-5-25x56-ffp-illuminated-vpr-zero-stop-34mm-tube) | 38 → 39 oz |
| Athlon Ares BTR Gen2 4.5-27x50 | ✎ Athlon spec sheet: 30mm, 27.3 oz (https://athlonoptics.com/storage/2022/02/ARES-BTR-GEN2-4.5-27x50-HD-APRS5-FFP-IR-MIL-212010-RIFLESCOPE-SPEC-SHEET.pdf) | 30 → 27 oz |
| Nightforce ATACR 7-35x56 F1 | ✎ "Weight 39.3 oz · Body Tube Diameter 34 mm" (https://www.nightforceoptics.com/riflescopes/atacr/atacr-7-35x56-f1) | 36mm → 34mm tube; 40 → 39 oz |
| Tangent Theta TT525P 5-25x56 | ✎ 1,150 g ≈ 40.6 oz, 34mm (https://coretacsolutions.com/content/pdf/TT525P_datasheet.pdf) | 35 → 41 oz |
| Primary Arms SLx 1-6x24 | ✎ 17.9 oz (Primary Arms) | 17 → 18 oz |

#### Thermal scopes (thermal-scopes.html) — 20 rows

Every row was checked against the maker's spec page. Detection ranges given in meters were converted to yards. Hog ID distances are the site's own estimates; I rescaled them only where the sensor or lens changed. Star ratings are editorial and were not changed.
The original notes said the specs were "typical figures from my own knowledge, not checked model by model". Most rows had at least one wrong spec, and five had the wrong sensor.

| Row | Source | Before → After |
|---|---|---|
| Pulsar Thermion 2 LRF XL60 | https://pulsarnv.com/products/thermion-2-lrf-xl60-thermal-riflescope ($4,999.97 sale, $6,999.97 regular; 2,800 m; 7 hr; 1.16 kg; sNETD <20 mK) | $7,000–7,600 → $5,000–7,000; 3,300 → 3,062 yd; ~8 → ~7 hr; 35 → 41 oz; NETD <25 → system <20 mK |
| Pulsar Thermion 2 LRF XG50 | https://pulsarvision.com/manuals/pulsar-thermion-2-lrf/lrf-xg50 (3–24x, 2,300 m / 2,515 yd, 9 hr, 0.97 kg / 34.22 oz; marked discontinued); retail $5,099–5,999 | 3.5–14x → 3–24x; 2,500 → 2,515 yd; 8 → 9 hr; 32 → 34 oz; price sub notes discontinued |
| Pulsar Thermion Duo DXP50 | Pulsar manual (1,800 m, 2–16x, 0.96 kg, ~6 hr); retail $4,075–4,800 | 7 → 6 hr; 32 → 34 oz; $4,000–4,600 → $4,100–4,800 |
| Nocpix ACE S60R | https://www.nocpix.uk/ace-s60r-thermal-scope (1280×1024, ≤15 mK, 60 mm, 2–24x, 3,100 m, 7 hr, 1,300 g); https://nocpixusa.com/products/ace-s60r-thermal-weapon-sight-with-ocular-magnifier-2x-1280x1024-60mm-lrf ($5,599 sale / $6,599; 3,400 yd) | **640×512 → 1280×1024** (tag 640 → HD 1024+); 3–24x → 2–24x; 3,280 → 3,400 yd; 9 → 7 hr; 30 → 46 oz; $4,000–4,600 → $5,300–5,600 (tier mid → premium) |
| AGM Adder V2 LRF 60-1280 | https://www.agmglobalvision.com/products/adder-v2-lrf-60-1280 (2.5–28x, 3,100 m/yd, 9 hr, 2.2 lb, $6,594.50 sale / $7,495) | 2.5–20x → 2.5–28x; 3,000 → 3,390 yd; 8 → 9 hr; 38 → 35 oz; $5,500–6,500 → $6,000–6,600 |
| AGM Rattler V2 35-384 | https://www.agmglobalvision.com/products/agm-rattlerv2-35-384 (3–24x, 1,800 yd, 11 hr, 1.13 lb, $1,745 / $1,995) | 2–8x → 3–24x; 1,500 → 1,800 yd; 8 → 11 hr; 20 → 18 oz; $1,300–1,700 → $1,600–1,750 |
| RIX Storm S3 / S3R | https://www.rixoptics.com/product/storm-s3-thermal-imaging/ ; https://www.rixoptics.com/product/storm-s3r-thermal-imaging-riflescopes/ ; https://www.rixoptics.com/best-thermal-scope-for-hog-hunting-at-night-2026-picks/ (384×288, 35 mm, 3.5x base, 1,969 yd, ~4–4.5 hr, 0.97–1 lb; S3 $1,299 sale, S3R V2 $1,999). RIX's 640 model is the S6R, not the S3 | **640×512 → 384×288**; 50 mm 2.5–20x → 35 mm 3.5x base + 1–4x digital; 2,500 → 1,969 yd; 8 → ~4–4.5 hr; 30 → 16 oz; $2,000–2,700 → $1,300–2,000; purpose "affordable 640" → 384 / LRF on S3R |
| RIX Storm S2 / S2R | https://www.rixoptics.com/product/storm-s2r-thermal-imaging-riflescopes/ (256×192, 25 mm, 3.5x, 1,422 yd, 4.5 hr, 0.9 lb, $999; S2 $799) | **384×288 → 256×192**; 35 mm 2–8x → 25 mm 3.5x; 1,300 → 1,422 yd; 8 → 4.5 hr; 24 → 14 oz; $900–1,300 → $800–1,000 |
| WAVE Tempest 650 LRF | https://waveinfrared.com/product/tempest-650-lrf-thermal-scope/ (3x optical + digital to 12x, 2,900 yd, 13+ hr, 29.8 oz w/o batteries, list $4,499); Thermal Bros $2,550 | 3–24x → 3–12x; 2,700 → 2,900 yd; 8 → 13 hr; price → $2,550–2,600 closeout; purpose $2,599 → $2,550 |
| ATN ThOR 5 XD LRF 640 | ATN's "XD" line is 1280×1024 only (https://www.opticsplanet.com/i/pdf/opplanet-atn-thor-gen-5-xd-series-features-and-specifications-pdf.pdf). The 640 model is the **ThOR 5 LRF 640 2-16x**: https://www.atncorp.com/thermal-scope-thor-5-lrf-640-2-16x ($2,995 / $3,295, detection 2,700 yd); ATN catalog https://www.atncorp.com/fs/atn-us-catalog.pdf (10 hr, 2.1 lb) | name → "ThOR 5 LRF 640 2-16x"; 2,000 → 2,700 yd; ~16 → ~10 hr (16+ needs the external pack); 40 → 34 oz; $2,500–3,500 → $3,000–3,300 |
| ATN ThOR LT 320 | ATN manual (25 mm, 3–6x, 910–995 m human detection, 1.4 lb, 10+ hr); retail $1,449–1,599 | $1,000–1,300 → $1,450–1,600; detection 1,000 → 995 yd; tag "384 sensor" → "320 sensor" (it was in the 384 filter) |
| InfiRay Tube TH35 V2 | https://www.infirayoutdoor.com/tube-series-th35v2th50v2 (640×512, ≤25 mK, 2.5–10x optical + 1–4x digital, 1,800 m, 8.5 hr, <915 g); US listing $2,937 | **384×288 → 640×512** (tag 384 → 640, budget → mid); 2–8x → 2.5–10x; 1,800 → 1,969 yd; 9 → 8.5 hr; 22 → 32 oz; $1,500–1,900 → $2,900–3,200 ~ |
| Hikmicro Stellar 2.0 SH50L | Stellar 2.0 has no SH50L (https://www.hikmicrotech.com/th/outdoor-products/stellar-2-0-thermal-scope/ lists the SQ50 2.0). The SH50L is a **Stellar 3.0** model: https://hikmicro.co.uk/products/stellar-3-sh35l-1 (384×288, <15 mK, 50 mm, 6–24x, 2,600 m, 1,000 m LRF, 9 hr, 830–870 g); US $3,000 (https://airgunshops.com/product/hikmicro-stellar-3-0-sh50l-thermal-rifle-scope-with-lrf/) | name → "Stellar 3.0 SH50L"; **640×512 → 384×288**; 3–24x → 6–24x; 2,600 → 2,843 yd; 8 → 9 hr; 32 → 30 oz; $4,500–5,000 → $3,000 (premium → mid) |
| Hikmicro Thunder 2.0 TQ35 | Hikmicro datasheet (https://elcalden.es/wp-content/uploads/2023/08/Ficha-tecnica-visor-Hikmicro-Thunder-TQ35-2.0.pdf): 640×512, ≤20 mK, 35 mm, 1.82x base, 1–8x digital, 1,800 m, 6.5 hr, 515 g w/o battery. The clip-on is the separate TQ35C | **384×288 → 640×512**; 2–8x → 1.8x base + 1–8x digital; 1,900 → 1,969 yd; 8 → 6.5 hr; 17 → 18 oz; $1,700–2,100 → $2,600–3,300 ~ (AU A$4,999; one US listing $2,627); purpose says the clip-on is the TQ35C |
| Trijicon REAP-IR Mini 640 | https://www.trijicon.com/products/details/reap-35-4 (640×480, 1.75–14x, 28.18 oz, ~4 hr, retail $8,239; no detection range published); street $6,180–6,850 | name → "REAP-IR 35mm"; 640×512 → 640×480; 2.5–20x → 1.75–14x; detection 1,600 yd → not published; 4.5 → 4 hr; 18 → 28 oz; $4,500–5,200 → $6,200–6,850 |
| Trijicon IR Hunter MK3 35mm | MK3 is discontinued; current is the IR-HUNTER 35 mm Type 3: https://www.trijicon.com/products/details/hunter-35-3 (640×480, 1.75–14x, 30.69 oz, ~4 hr, retail $8,239); street $6,095–6,576 | name → "IR-Hunter 35mm (Type 3)"; 2.5–20x → 1.75–14x; detection 2,000 yd → not published; 5 → 4 hr; 32 → 31 oz; $6,000–7,000 → $6,100–6,600 |
| DNT ThermNight 4K 219R | https://us.dntoptics.com/products/tnc4k219r-thermnight-thermal-night-vision-multispectral-scope-with-laser-rangefinder-and-ballistic-calculator ($1,332.99, ≤18 mK, 2x thermal, 3–24x day/night, LRF 2,100 yd); manual: 737 g, 5 h 45 m | 3–24x → 2x thermal / 3–24x day-night; 6 → 5.75 hr; 28 → 26 oz; NETD added |
| DNT HYDRA HS325 | https://nightshadeoptics.com/product/dnt-hs325-thermal-scope/ (DNT spec: ≤18 mK, 2–8x, 13.4 oz, 4.5 hr per battery, $999.99) | 1,300 → 1,200 yd; 7 → 4.5 hr; 20 → 13 oz |
| DNT HYDRA HS635R | https://us.dntoptics.com/products/hs635r-hydra-lrf-multi-function-thermal-scope-with-laser-rangefinder-and-ballistic-calculator-standalone-scope-clip-on-handheld-monocular ($2,221.99 / $2,666.99; 1.5–6x; 15.0 oz; 4 hr per battery; LRF 1,300 yd) | 2–16x → 1.5–6x; 7 → 4 hr/battery; 22 → 15 oz; $1,900–2,000 → $2,220–2,670 (budget → mid) |
| DNT HYDRA HS650R | https://us.dntoptics.com/products/hs650r-hydra-lrf-multi-function-thermal-scope-with-laser-rangefinder-and-ballistic-calculator-standalone-scope-clip-on-handheld-monocular ($2,444.43 / $2,933.99; 2.5–10x; 18.2 oz; 4 hr per battery) | 3–24x → 2.5–10x; 7 → 4 hr/battery; 26 → 18 oz; $2,200–2,600 → $2,440–2,930 |

**Not confirmed (?/~):**
- Popularity sub-labels ("Best-selling premium thermal line", "Very common hog scope", "50+ bought/month on Amazon").
- GunsAmerica / Scopes Field / Gun Made pick claims: the review pages were not re-opened. GunsAmerica's pick may have been the 640 ACE S60.
- DNT detection ranges (DNT publishes none; marked "my estimate").
- TQ35 and TH35 V2 US street prices (thin US availability).
- Notes block updated: the "not checked model by model" disclaimer was replaced; the detection-range definition was corrected; the DNT source line was rewritten.

#### Thermal monoculars (thermal-monoculars.html) — 20 rows

The sensor and lens cells were mostly right. Prices, weights and battery life were mostly blank or out of date; I filled them in from maker pages.

| Row | Source | Before → After |
|---|---|---|
| ATN BlazeSeeker 6 210 | https://www.atncorp.com/thermal-monocular-gen-6-blazeseeker-210 ($489, list $626; 270 g; 8 hr; 460 m; ATN lists both <20 and <35 mK) | $450–570 → $489–626; weight — → 9.5 oz |
| ATN BlazeTrek 6 325 | https://www.atncorp.com/thermal-monocular-gen-6-blazetrek-325 ($949, list $1,315; 2.8–22x; 1,300 m; 320 g; 8 hr) | $1,195–1,315 → $949–1,315 (tier mid → under $1,000); 9 → 11.3 oz |
| ATN BlazeTrek 6 640 | same page: the 640 BlazeTrek models are the 619 (19 mm, 1.5–12x, 1,000 m, $1,299) and the 625 (25 mm, 1.75–14x, 1,300 m, $1,499). The row's 25 mm lens matches the **625** | name → "BlazeTrek 6 625"; 1.5–12x → 1.75–14x; detection — → 1,422 yd; $1,430–1,700 → $1,499; weight → 11.3 oz |
| ATN BlazeHunter XD LRF | https://www.atncorp.com/atn-blazehunter-xd-1280-lrf ($3,995, list $5,495; "3400 y/m"; 10+ hr; 495 g w/o batteries per dealer listing) | $4,550–5,000 → $3,995; 3,700 → 3,400 (ATN's own unit is ambiguous); weight → 17.5 oz w/o batteries |
| Pulsar Axion Compact XQ19 | https://pulsarvision.com/manuals/pulsar-axion-compact/xq19 (17 µm, system <18 mK, 750 m, 8 hr, 0.3 kg / 10.6 oz); pulsarnv $1,049.97 | battery — → 8 hr; weight — → 10.6 oz; $1,000 → $1,050 |
| Pulsar Axion 2 LRF XQ35 Pro | https://pulsarnv.com/products/axion-2-lrf-xq35-pro ($1,999.97) and its manual (2–8x, 1,300 m, 0.47 kg, 11 hr) | 2.5–10x (approx.) → 2–8x; detection — → 1,422 yd; weight → 16.6 oz; $1,800 → $2,000; "under a pound" → "about a pound" |
| Pulsar Axion XG35 Compact Pro | https://pulsarvision.com/manuals/pulsar-axion-compact/xg35 (1,750 m / 1,914 yd, 7 hr, 0.35 kg / 12.35 oz, system <20 mK); $1,699.97 | detection source now its own spec (was "Axion 2 XG35 figure"); 1,900 → 1,914 yd; battery → 7 hr; weight → 12.4 oz |
| Pulsar Oryx LRF XG35 | https://pulsarvision.com/manuals/pulsar-oryx-lrf/xg35 (2.5–20x, 1,800 m / 1,969 yd, 12 hr, 0.5 kg / 17.6 oz); https://pulsarnv.com/products/oryx-thermal-monocular $2,999.97 | zoom "digital zoom" → 2.5–20x; 1,950 → 1,969 yd; battery 12 hr; weight 17.6 oz; $2,600–2,800 → $3,000 |
| Pulsar Telos LRF XP50 | https://pulsarnv.com/products/telos-lrf-xp50-thermal-monocular ($3,699.97; 1,800 m; 8.5 hr; 0.72 kg) | $3,360–4,000 → $3,700; 8 → 8.5 hr; weight → 25.4 oz; **added the missing Rangefinder tag** |
| Pulsar Telos LRF XL50 | https://pulsarnv.com/products/telos-lrf-xl50-thermal-monocular ($4,699.97; 2.5–20x; 2,300 m; 7 hr; 0.72 kg) | $5,000–5,500 → $4,700; detection — → 2,515 yd; battery 7 hr; weight 25.4 oz |
| Vortex Veil 400 | https://vortexoptics.com/veil-400-thermal-monocular.html (400×300, 25 mm, 2.3x, 1,100 yd, 13.3 oz, 4.5 hr/battery, MSRP $2,299.99) | battery — → 4.5 hr per battery; rest ✓ |
| Nocpix Lumi P13 / L19 / L35R / H35 | https://nocpixusa.com/collections/lumi (P13 $679, L19 $1,100, L35R $2,200, H35 $2,299; ≤18 mK); detection and weights from the Lumi manual (https://www.nocpix.uk/user/downloads/English-LUMI-Series-User-Manual-V2.0.pdf, via search summary) | P13 $619 → $679, detection — → 733 yd, 10.9 oz; L19 detection → 1,072 yd, 11.8 oz; L35R $1,800–2,000 → $2,200, 13.2 oz; H35 $2,199 → $2,299, ~12 oz |
| Nocpix Vista H50R | https://nocpixusa.com/products/vista-h50r-rangefinding-thermal-monocular-640x512-50mm ($3,550; ≤15 mK; 4x optical + 8x digital; 2,400 yd; LRF 1,200 yd); UK manual: 650 g, 5.5 hr per pack | 4–40x → 4x optical · 8x digital; detection — → 2,400 yd; $3,500 → $3,550; weight/battery filled |
| AGM Taipan V2 19-320 | https://www.agmglobalvision.com/products/agm-taipan-v2-19-320 (320×256, <35 mK, 3–22.5x, 950 m/yd, 6 hr, 0.66 lb, $745) | 320×240 → 320×256; zoom → 3–22.5x; detection — → 1,038 yd; battery 6 hr; weight 10.6 oz; $695–755 → $695–745 |
| RIX Pocket K3 | https://www.rixoptics.com/product/pocket-k3-thermal-imaging-monoculars/ (2x base, 1–4x digital, 780 m / 853 yd, 213 g, 6 hr, $799 / $899) | battery — → 6 hr; zoom detail added |
| Topdon TS004 | https://www.topdon.us/products/ts004 ($419.99; 410 m / 450 yd detection, 91 m ID; <40 mK; 1–8x; 11 hr; 330 g; app Wi-Fi link; 1-yr warranty) | detection 100 → 450 yd (Outdoor Life's 50–100 yd note kept in the sub); $350–400 → $389–420; weight 11.6 oz; con "no Wi-Fi" removed (it connects to the TopInfrared app) |
| Guide TE211M | https://guideir-thermal.com/products/te-211m ($429, list $529; 30 mK; 1.2–4.8x; 500 m / 550 yd; 6 hr; 205 g / 7.23 oz; 10-year warranty) | detection 250 → 550 yd (OL's 250-yd ID note kept); $500 → $429; weight 7.2 oz |

**Not confirmed (~):**
- Lumi L35R "LRF to 875 yd".
- Lumi battery runtimes (Nocpix lists none on the store page).
- Outdoor Life test notes (kept as attributed; not re-opened).
- The notes block now says specs were checked against maker pages; the rifleconfigurator.com ATN line was replaced.

#### Rangefinders (rangefinders.html) — 17 rows

| Row | Source | Before → After |
|---|---|---|
| Vortex Razor HD 4000 GB | https://vortexoptics.com/razor-hd-4000-gb-ballistics-laser-rangefinder.html (7x, 4,000 / tree 2,500 / deer 2,200, 10.1 oz; MSRP $1,199.99, retail $799.99) | $680 → $800 (MSRP noted) |
| Vortex Viper HD 3000 | https://vortexoptics.com/viper-hd-3000-rangefinder.html (7x25; 3,000 / tree 2,300 / deer 2,000; 9.1 oz; MSRP $599.99); retail $399.99 | deer "not confirmed" → 2,000 yd; weight — → 9.1 oz; $340–400 → $400 |
| Maven RF.1 | https://mavenbuilt.com/pages/rf-1-specifications (7x25, 4,500 / deer 2,700, 10 oz, $550) | weight — → 10 oz |
| SIG KILO3K | https://www.sigsauer.com/kilo3k-lrf-6x22mm-red-oled-display-ble-bdx-u-x-od-green-class-1m.html (6x22, deer 1,500, 5.6 oz, $349.99; black $274.99) | 5.3 → 5.6 oz; $315–350 → $275–350 (tier $300–800 → under $300) |
| Bushnell R5 Broadhead 2 | https://www.bushnell.com/products/r5-broadhead-2-rangefinder (6x25, 2,000 / deer 500, 6 oz, $299.95) | $225–300 → $300 |
| Leupold RX-FullDraw 5 | https://www.leupold.com/rx-fulldraw-5-rangefinder (6x, reflective 1,200 / deer 900, 7.5 oz, $499.99) | reflective — → 1,200 yd |
| Vortex Crossfire HD 1400 | https://vortexoptics.com/crossfire-hd-1400-laser-rangefinder.html (5x, 4.8 oz, deer 750, MSRP $289.99) | deer "not confirmed" → 750 yd; $200–270 → $200–290 |
| Vortex Triumph HD 850 | https://vortexoptics.com/triumph-hd-850-laser-rangefinder.html (5x21; 850 / tree 500 / deer 350; 4.6 oz; MSRP $149.99) | 5x → 5x21; $80–100 → $100–150 ~ (OL's sub-$100 street not re-confirmed); purpose "sub-$100" → "budget" |
| Athlon Midas 1 Mile | https://athlonoptics.com/product/midas-1-mile/ (6x, 1,700 / deer 800, 4.75 oz, $362.49; street from $269.99; current model is the G2 6x21) | 6x → 6x21; weight — → 4.75 oz; $300 → $270–362 (tier → under $300) |
| Vortex Fury HD 5000 AB | https://vortexoptics.com/fury-hd-5000-ab-10x42.html (32.4 oz; 5,000 / deer 1,600; MSRP $2,299.99; retail $1,499.99) | reflective — → 5,000 yd; weight — → 32.4 oz; $2,300 → $1,500–2,300 |
| Leica Geovid Pro 10x42 AB+ | https://www.leicacamerausa.com/leica-geovid-pro-10x42-ab.html (~3,200 yd / 2,950 m; 34.2 oz without battery; $3,599) | $4,000 → $3,599; weight — → 34.2 oz |

- **Notes:** "deer range is usually a third or less of reflective" → "often half or less" (Viper HD 3000 is 2,000 / 3,000).
- **Not confirmed:** Outdoor Life "tested" figures (kept as attributed), Leica CRF Max deer range (Leica does not publish one).

#### Binoculars (binoculars.html) — 21 rows

| Row | Source | Before → After |
|---|---|---|
| Vortex Triumph HD 10x42 | https://vortexoptics.com/vortex-triumph-hd-10x42-binoculars.html (334 ft, CF 15.3 ft, 22.9 oz, MSRP $149.99) | FOV — → 334 ft; weight — → 22.9 oz |
| Vortex Crossfire HD 10x42 | https://vortexoptics.com/vortex-crossfire-hd-10x42-binoculars.html (325 ft, CF 6 ft, 23.0 oz, MSRP $229.99) | weight — → 23 oz; $127–150 → $127–230 (MSRP noted) |
| Bushnell R5 10x42 | https://www.bushnell.com/products/r5-binoculars-10x42 ($199.95; its spec block shows 390 ft / 24.7 oz, which match the 8x42) + https://www.sportsmans.com/…/bushnell-r5-full-size-binocular-10x42/p/1880447 (330 ft, 23.8 oz, $249.99) + allbinos (CF 2.43 m) | FOV — → 330 ft; weight — → 23.8 oz; warranty "not confirmed" → Bushnell lifetime; $200–220 → $200–250 |
| Nocs Field Issue 8x42 | https://www.nocsprovisions.com/pages/field-issue-42mm-binoculars (394 ft, CF 6.6 ft, 571 g, $199.95) | 21 → 20.1 oz |
| Hawke Vantage HD 8x34 | https://www.hawkeoptics.com/vantage-hd-8x34-binocular.html (372 ft, CF 9.8 ft, 15.2 oz, no-fault lifetime) + https://us.hawkeoptics.com/vantage-hd-8x34-binocular.html ($189) | $170 → $170–189; warranty → Hawke no-fault lifetime |
| SIG ZULU4 HD 10x42 | https://www.sigsauer.com/zulu4tm-hd-binocular-10x42mm.html (6.0° ≈ 315 ft, 1.8 m CF, 26.7 oz, $449.99) | $350–400 → $450; blurb "under $400" → "about $450" |
| Vortex Viper HD 10x42 | https://vortexoptics.com/vortex-viper-hd-10x42-binocular.html (341 ft, CF 6 ft, 24.9 oz, MSRP $729.99); B&H $499.99 | FOV — → 341 ft; weight — → 24.9 oz; $350–730 → $500–730 |
| Tract Toric UHD 8x32 | https://tractoptics.com/toric-uhd-schott-ht-8x32-compact-binocular/ (424 ft, CF 6.5 ft, 23 oz, $724) | $644 → $724 |
| Maven B.7 8x25 | https://mavenbuilt.com/products/b-7-8x25-10x25 (356 ft, CF 9.8 ft, 12.4 oz, $600, unconditional lifetime) | FOV — → 356 ft; weight — → 12.4 oz; warranty → Maven lifetime |
| Leupold BX-4 Pro Guide HD Gen 2 12x50 | https://www.leupold.com/bx-4-pro-guide-hd-gen-2-12x50mm-binocular (257 ft, CF 10 ft, 29.3 oz, $769.99); sportoptics $569.99 | $500–550 → $570–770 |
| Vortex Razor HD 10x42 | https://vortexoptics.com/vortex-razor-hd-10x42-binocular.html (362 ft, CF 6 ft, 24.8 oz, $1,449.99) + https://vortexoptics.com/inactive-products.html?p=2 (listed inactive) | FOV — → 362 ft; marked discontinued |
| Vortex Razor UHD 8x32 | Vortex spec (via https://www.wildlifecam.co.uk/products/vortex-razor-uhd-binoculars-with-glasspak-harness: 472 ft, CF 5.9 ft, 21.9 oz) + https://vortexoptics.com/optics/binoculars/wildlife-observation.html (MSRP $2,149.99) | FOV — → 472 ft; weight — → 21.9 oz; $1,500 → $1,500–2,150 |
| Burris Signature HD 15x56 | https://www.burrisoptics.com/binoculars/signature-hd-15x56-mm-binocular (215 ft, CF 23 ft, 43 oz, $1,008); sportoptics $839.99 | $900–1,000 → $840–1,008 |
| Swarovski EL 10x42 | https://www.swarovskioptik.com/us/en/hunting/products/binoculars/el/el-42/el-10x42 (336 ft, CF 10.8 ft, 29.6 oz, $1,999) | FOV — → 336 ft; $2,000–2,200 → $1,999 |
| Swarovski NL Pure 10x52 | https://www.swarovskioptik.com/us/en/hunting/products/binoculars/nl-pure/nl-pure-binoculars/nl-pure-10x52 (390 ft, CF 10.8 ft, 36 oz, $3,799) | FOV — → 390 ft; weight — → 36 oz; $3,500–3,800 → $3,799 |
| Kite APC Stabilized 16x42 ED | https://usa.kiteoptics.com/product/apc-stabilized-16x42-ed-aaa/ (239.5 ft, CF 9.5 ft, 30 oz, up to 120 hr, limited lifetime, $1,799) | $1,350 → $1,799; warranty → limited lifetime |

Not confirmed: Nocs warranty terms; Nikon US warranty wording (left "not confirmed"). Stars are editorial, not audited.

#### Muzzleloaders (muzzleloaders.html) — 12 rows

Sources: GOEX round-ball chart https://web.archive.org/web/2015/http://www.goexpowder.com/images/LoadCharts/RB-Rifle-Musket.pdf ; GOEX conical chart https://web.archive.org/web/2016/http://www.goexpowder.com/images/LoadCharts/Conical.pdf ; Hodgdon muzzleloading data https://hodgdonpowderco.com/wp-content/uploads/2023/04/muzzleloading_manual_2008-1.pdf ; Hornady round-ball weights (2026 intl. catalog p.69 / Hornady list .310=45, .350=65, .395=92, .440=128, .490=177, .530=224 gr). Round-ball BCs checked against w/(10640·d²). MPBR, near/far zero, sight-in @50 and bar recomputed for **all** rows with the G1 calculator (0.6" iron / 1.5" scope, chart zones); unchanged inputs moved ≤2 yd (.32 78→76, .50 131→132, .58 95→96).

| Row | Source | Before → After |
|---|---|---|
| .32 | No maker data; owner chronograph reports 30 gr FFFg ≈1,800–1,900 fps (https://www.muzzleloadingforum.com/threads/pedersoli-kentucky-rifle-32.100003/) | ✓ load (not maker-confirmed); MPBR 78 → 76 |
| .50 RB | GOEX 90 gr FF 1,870; Lyman 90 gr FFg 1,768 (via forum) ; Hodgdon Pyrodex 90 gr 1,787 | ✓; MPBR 131 → 132 |
| .50 conical | Hodgdon 2×50 pellets, 295 PowerBelt AeroTip Copper 1,600; BC .186 (https://www.sportsmanfulfillment.com/powerbelt-copper-aerotip-50-cal-295-grain-muzzleloader-bullets-15-pack/) | BC 0.17 → 0.186 (MPBR 143 unchanged; far zero 121) |
| .50 inline sabot | Hodgdon 2×50 pellets, 250 gr Hornady SST 50/45 = 1,785; Hornady BC .210 https://www.hornady.com/muzzleloading/browse/50-cal-lock-n-load-low-drag-with-45-cal-250-gr-sst-bullet | 1,700 → 1,785 fps; 1,604 → 1,769 ft-lbs; BC 0.20 → 0.21; MPBR 159 → 166 (near 16, far 142, +2.29" @50) |
| .54 RB | Hornady .530 = 224 gr; GOEX 100 gr FF 1,800 (236 gr); Hodgdon Pyrodex 100 gr 1,729 | 230 → 224 gr; 1,564 → 1,524 ft-lbs |
| .54 conical | Hodgdon Pyrodex RS 100 gr 2F, 425 Hornady HB-HP = 1,364 (T7 1,496; GOEX 400 gr @100 FF 1,290); BC 0.205 (Hornady figure as quoted at https://www.modernmuzzleloader.com/threads/where-to-find-ballistic-coefficients-for-conicals.15420/) | 1,400 → 1,360 fps; 1,849 → 1,746 ft-lbs; BC 0.18 → 0.20; label "Maxi-Ball" → "Great Plains / Maxi-Ball" |
| .58 Minié | 1855 service load 500 gr / 60 gr musket powder ≈950 fps (https://capandball.com/cartridge-bundles-of-the-american-civil-war/); GOEX modern FFg lists 505 gr @60 gr = 690 fps | kept 950 (historic load), conflict noted on page; MPBR 95 → 96 |
| .62 (20 bore) | Owner chronograph, .595–.600 ball: 100 gr Goex FFg 1,357 / 1,420 fps (https://www.muzzleloadingforum.com/threads/chronographing-the-20-bore.59845/) | 120 gr FFg 1,500 → 100 gr FFg 1,400 fps; 1,599 → 1,393 ft-lbs; MPBR 120 → 115 |
| .72 (12 bore) | 545-gr ball, 145 gr FFg = 1,238 fps in Pedersoli Kodiak (Gert van Rensburg test, https://www.muzzleloadingforum.com/threads/pedersoli-kodiak-72-question.29042/page-3); Pedersoli .72 twist 1:75 https://www.davidepedersoli.com/en/product/safari-express | 150 gr Fg 1,400 → 145 gr FFg 1,240 fps; 2,372 → 1,861 ft-lbs; twist 1:104 → 1:75; MPBR 118 → 110 |

Not confirmed: .32 velocity (only owner reports); .58 Minié BC 0.25 and modern-powder velocity (GOEX disagrees with the historic figure); twist and effective-range columns are generic; .62/.72 velocities are single-owner chronograph data, not maker data.

#### Airguns (airguns.html) — 9 rows

MPBR, near/far zero, min PBR, sight-in @25 and bar recomputed for **all** rows with the G1 calculator (1.5" scope, sea-level air, chart zones). Unchanged inputs moved 0–1 yd; the BB row changed more (far zero 25 → 23, sight-in 0.07" low → 0.44" low) because the old far zero of 25 yd put the mid-range rise above 1" (cross-checked with py_ballisticcalc 3.1.1: zero 25 yd → +1.26" peak; zero 23 yd → +0.94").

| Row | Source | Before → After |
|---|---|---|
| .177 BB | Daisy Premium Grade 5.1 gr https://www.pyramydair.com/product/daisy-premium-grade-177-cal-5-1-grains-zinc-plated-bbs-2400ct?p=391 | weight ✓; MPBR 28 → 27 (far zero 25 → 23) |
| .20 pellet | No 11.9 gr .20 domed pellet exists; nearest is H&N Field Target Trophy 11.42 gr https://www.pyramydair.com/product/h-n-field-target-trophy-20-cal-11-42-grains-domed-250ct?p=90 | 11.9 → 11.42 gr; 19.1 → 18.3 ft-lbs; MPBR 54 → 53 |
| .22 pellet | Crosman Premier 14.3 gr https://www.pyramydair.com/product/crosman-premier-22-cal-14-3-grains-domed-500ct?p=769 | ✓; MPBR 57 → 56 |
| .25 pellet | JSB Exact King 25.39 gr https://hardairmagazine.com/reviews/jsb-exact-king-25-39-grain-25-caliber-pellet-test-review/ | ✓; MPBR 59 → 58 |
| .30 pellet/slug | JSB Exact 44.75 gr https://www.pyramydair.com/product/jsb-diabolo-exact-pellets-30-cal-44-75-grains-domed-150ct?p=1144 (BC 0.038 GA) | ✓; MPBR 76 → 75 |
| .357 slug | 81 gr = JSB Exact .357 81.02 gr *domed pellet* https://www.pyramydair.com/product/jsb-match-diabolo-exact-35-cal-81-02-grains-domed-100ct?p=1087 (BC 0.040 GA) | projectile "Lead slug" → "Domed pellet"; MPBR 75 → 74 |
| .45 slug | AirForce Texan .457: "more than 500 ft-lbs" (https://www.pyramydair.com/blog/2015/01/airforce-texan-big-bore-rifle-part-2/; AirForce 2023 catalog https://airforceairguns.com/wp-content/uploads/2023/12/AirForceAirgunsCatalog2023.pdf) | ✓ load; energy 561 → 562 (rounding: 350×850²/450,240 = 561.6); MPBR 90 → 89 |
| .50 slug | AirForce Texan .510 up to 700 ft-lbs (3,000 psi) / 800+ (CF); dealer shot data 350 gr 917 fps, 445 gr 848 fps (https://www.topgun-airguns.com/product/airforce-texan-lss-cf-series/) | ✓ (642 ft-lbs is a typical, not max, load); MPBR 90 → 89 |

Not confirmed: all G1 BCs (pellet makers publish GA-model BCs, which are not interchangeable with G1; page now says so); velocities are generic and depend on gun/fill.

### Data consistency fixes (`a158c76` checker, `afb052b`, `7ab882b`)

Added `tools/check-consistency.mjs`, which compares every chart against the profiles, compares and deer guide. The mismatches it found were each set to the maker's figure:
- `.308 Win` 150 gr SP (Hunting + AR): row = Remington Core-Lokt 150 PSP (2,820 fps / 2,648 ft-lbs), G1 **.314** → shown ≈0.31 (was ≈0.33 Hunting, ≈0.40 AR). https://www.remington.com/rifle/shop-by-caliber/shop-all-calibers/29-27842.html
- `.243 Win` 100 gr SP (Hunting + AR): Remington Core-Lokt 100 PSP (2,960 / 1,945), G1 **.356** → ≈0.36 (was ≈0.38 / ≈0.40). https://www.remington.com/rifle/shop-by-caliber/shop-all-calibers/29-R27802.html
- `7mm-08` 140 gr SP: kept ≈0.39 at 2,800 fps (inside published 140 gr SP range: Win Power-Point .331 @2,800 … Core-Lokt .390 @2,860); AR now ≈0.39 and twist 1:9.5 (SAAMI/Barnes 1:9.5).
- `6mm GT` 109 ELD Match (Hunting + Precision): Hornady #81597 = **2,870 fps, 1,993 ft-lbs, G1 0.557** (was 2,925 / 2,071 / 0.609). Hunting MPBR recomputed 289 yd (near 26, far 246, +2.65" @100); Precision 500/800/1,000 yd and supersonic (1,379 yd) recomputed. Note: Hornady's bullet-only G1 for the 109 ELD-M is 0.585; the ammo spec is 0.557.
- `.22 LR Subsonic` (Hunting + Rimfire): CCI Sub-Sonic HP 40 gr, BC **.120** → ≈0.12 on both (first pass wrongly set 0.11).
- `6mm Dasher` 105 Berger Hybrid Target: G1 **0.536** (Berger) on Wildcats + Precision.
- `.284 Shehane` 180 Berger Hybrid Target: Berger now lists G1 **0.680** (was 0.674) on Wildcats + Precision; Precision drop/wind/speed recomputed.
Recomputed numbers came from a G1 point-mass solver (not in the repo; sea-level std air, 1.5" sight height, 100 yd zero, 10 mph wind) that reproduces the existing chart figures within ~0.1–0.2" / ±1 yd.

### Site fixes (`dbc1e9c`, `05d8cba`, `03faa00`, `24df0af`)

- `404.html`: unknown URLs return HTTP 404 with a styled page instead of the home page.
- Every page got a description, canonical URL, Open Graph/Twitter card tags (`og-image.png`, 1200×630), `favicon.ico`, `favicon.svg` and `apple-touch-icon.png`.
- Home: new Articles section linking the five article pages.
- README: how to run the data consistency check.
