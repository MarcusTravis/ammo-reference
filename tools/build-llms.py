# Builds llms.txt and llms-full.txt from the live pages (titles, descriptions, profile facts).
# Run from anywhere: python3 tools/build-llms.py  (re-run after data or page edits)
import re,os,html,glob
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..'))
def g(s,p):
  m=re.search(p,s,re.S); return html.unescape(re.sub(r'<[^>]+>','',m.group(1))).strip() if m else ''
def info(f):
  s=open(f).read()
  return dict(u=g(s,r'<link rel="canonical" href="([^"]+)"'),h1=g(s,r'<h1[^>]*>(.*?)</h1>'),d=g(s,r'<meta name="description" content="([^"]*)"'),s=s)
idx=open('index.html').read()
charts=[f for f in re.findall(r'<a class="card[^"]*" href="([^"]+\.html)"',idx) if '<tbody id="rows">' in open(f).read()]
arts=['bullets.html','bullet-sizes.html','headspace.html','modern-answers.html','revolvers.html']
L=["# Ammo Reference Library (ammochart.net)","",
"> Free, ad-free field reference for hunters and shooters: 17 cartridge, caliber, rifle and optics charts (298 rows), 108 cartridge profiles, 45 head-to-head cartridge comparisons, a beginner's deer cartridge guide, tips and articles. Figures are typical values for a named factory load or product, checked against the maker's published data (or SAAMI and spec sheets) and dated on each chart. Real numbers vary by brand, lot and barrel length; always check the maker's data for your exact load.","",
"Made by Marcus Travis. Every data change is logged at https://ammochart.net/updates and in the public changelog: https://github.com/MarcusTravis/ammo-reference/blob/main/CHANGELOG.md","",
"## Start here",
"- [Home: all charts](https://ammochart.net/): every chart, article and the common-questions section",
"- [Best deer cartridges for beginners](https://ammochart.net/best-deer-cartridges): "+info('best-deer-cartridges.html')['d'],
"- [All 108 cartridges A–Z](https://ammochart.net/cartridges/): one profile page per cartridge with typical load, speed, energy, BC, twist, range and point-blank range",
"- [Cartridge comparisons](https://ammochart.net/compare/): 45 popular matchups side by side, for example [.308 Winchester vs 6.5 Creedmoor](https://ammochart.net/compare/308-winchester-vs-6-5-creedmoor)","",
"## Charts"]
for f in charts:
  i=info(f); dm=g(i['s'],r'Data last checked: <time datetime="([^"]+)"')
  L.append(f"- [{i['h1']}]({i['u']}): {i['d']} (data last checked {dm})")
L+=["","## Articles and guides"]
for f in arts+['tips.html']:
  i=info(f); L.append(f"- [{i['h1']}]({i['u']}): {i['d']}")
L+=["","## Optional","- [Full text summary of every cartridge profile](https://ammochart.net/llms-full.txt)","- [Site updates](https://ammochart.net/updates)","- [Sitemap](https://ammochart.net/sitemap.xml)",""]
open('llms.txt','w').write('\n'.join(L))
# full
F=["# Ammo Reference Library: cartridge profiles (ammochart.net)","",
"Typical factory-load figures from https://ammochart.net/. Values vary by brand, lot and barrel length; check the maker's data for your exact load.",""]
for f in sorted(glob.glob('cartridges/*.html')):
  if f.endswith('index.html'): continue
  i=info(f); s=i['s']
  hd=s[s.find('<header'):s.find('</header>')]
  says=[re.sub(r'\s+',' ',html.unescape(re.sub(r'<[^>]+>','',x))).strip() for x in re.findall(r'<p class="(?:lede|say)">(.*?)</p>',hd,re.S)]
  kv=re.findall(r'<div class="fact"><div class="l">([^<]*)</div>(.*?)</div>',s[s.find('<section class="facts">'):s.find('</section>',s.find('<section class="facts">'))],re.S)
  facts='; '.join(html.unescape(k)+': '+re.sub(r'\s+',' ',html.unescape(re.sub(r'<[^>]+>',' ',v))).strip() for k,v in kv)
  F+=[f"## {i['h1']}",f"URL: {i['u']}"]+says+([facts] if facts else [])+[""]
F+=["## Comparisons",""]
for f in sorted(glob.glob('compare/*.html')):
  if f.endswith('index.html'): continue
  i=info(f); s=i['s']
  short=' '.join(re.sub(r'\s+',' ',html.unescape(re.sub(r'<[^>]+>',' ',x))).strip() for x in re.findall(r'<p class="say">(.*?)</p>',s[s.find('The short answer'):s.find('<h2',s.find('The short answer'))],re.S))
  F+=[f"- [{i['h1']}]({i['u']}): {short}"]
F+=[""]
open('llms-full.txt','w').write('\n'.join(F))
