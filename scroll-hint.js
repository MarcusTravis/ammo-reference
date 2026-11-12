/* Horizontal-scroll cues for wide chart tables.
   Adds, for every .table-box that is wider than the screen:
   - a hint bar above the table with ◀ ▶ buttons and a "column x–y of n" readout
   - fade shadows on whichever edge has more columns hidden
   - a scrollbar that sticks to the bottom of the window while the table is on screen
   Everything hides itself automatically when the whole table already fits.
   Also: on pages with an MPBR column, adds a "for comparison only" warning
   near the top of the page and under the MPBR column header. */
(function () {
  var css = `
.sh-hint{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:0 0 8px;padding:8px 10px 8px 12px;
  border:1px solid var(--line);border-radius:8px;background:var(--accent-soft);color:var(--fg);font:600 13px var(--body,system-ui)}
.sh-hint[hidden]{display:none!important}
.sh-msg{display:inline-flex;align-items:center;gap:6px;flex:1 1 auto;min-width:0}
.sh-arrow{display:inline-block;color:var(--accent);animation:sh-nudge 1.4s ease-in-out infinite}
@keyframes sh-nudge{0%,100%{transform:translateX(0)}50%{transform:translateX(5px)}}
@media (prefers-reduced-motion:reduce){.sh-arrow{animation:none}}
.sh-pos{color:var(--muted);font-weight:500;white-space:nowrap}
.sh-btns{display:inline-flex;gap:6px}
.sh-btn{font:700 14px var(--body,system-ui);line-height:1;width:34px;height:30px;border-radius:6px;cursor:pointer;
  border:1px solid var(--line);background:var(--surface);color:var(--fg)}
.sh-btn:hover:not(:disabled){border-color:var(--accent);color:var(--accent)}
.sh-btn:disabled{opacity:.35;cursor:default}
.sh-btn:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.sh-frame{position:relative}
.sh-edge{position:absolute;top:1px;bottom:1px;width:56px;pointer-events:none;opacity:0;transition:opacity .2s;z-index:2}
.sh-edge.l{left:1px;border-radius:10px 0 0 10px;background:linear-gradient(to right,var(--surface),transparent)}
.sh-edge.r{right:1px;border-radius:0 10px 10px 0;background:linear-gradient(to left,var(--surface),transparent)}
.sh-frame.can-l .sh-edge.l,.sh-frame.can-r .sh-edge.r{opacity:1}
.sh-on .table-box{scrollbar-width:none}
.sh-on .table-box::-webkit-scrollbar{display:none}
.sh-rail{position:sticky;bottom:0;z-index:5;overflow-x:auto;overflow-y:hidden;height:18px;margin-top:4px;
  background:var(--bg);border:1px solid var(--line);border-radius:9px;
  scrollbar-width:auto;scrollbar-color:var(--accent) var(--bar-bg,var(--bg))}
.sh-rail[hidden]{display:none!important}
.sh-rail>div{height:1px}
.sh-rail::-webkit-scrollbar{height:16px}
.sh-rail::-webkit-scrollbar-track{background:var(--bar-bg,var(--bg));border-radius:8px}
.sh-rail::-webkit-scrollbar-thumb{background:var(--accent);border-radius:8px;border:3px solid var(--bar-bg,var(--bg))}
.sh-warn{display:flex;gap:12px;align-items:flex-start;margin:14px 0 4px;padding:12px 14px;max-width:80ch;
  border:1px solid var(--accent);border-left-width:5px;border-radius:8px;background:var(--surface);color:var(--fg);font:500 14px/1.45 var(--body,system-ui)}
.sh-warn-icon{flex:none;font-size:20px;line-height:1.1;color:var(--accent)}
.sh-warn strong{color:var(--accent)}
.sh-thwarn{display:block;margin-top:4px;font:700 10.5px var(--body,system-ui);letter-spacing:.04em;text-transform:none;color:var(--accent);cursor:help}
`;
  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  // MPBR warning: only on pages whose table has an MPBR column.
  var mpbrTh = [].slice.call(document.querySelectorAll("thead th")).filter(function (th) {
    return /MPBR/i.test(th.textContent);
  });
  if (mpbrTh.length) {
    var tip = "MPBR figures are for comparing cartridges only. They come from a standard ballistic model, " +
      "not your rifle, ammo, sight height, zero, altitude or weather. Confirm your own drops at the range before you hunt.";
    var warn = document.createElement("div");
    warn.className = "sh-warn";
    warn.setAttribute("role", "note");
    warn.innerHTML =
      '<span class="sh-warn-icon" aria-hidden="true">⚠</span>' +
      "<div><strong>MPBR numbers are for comparison only.</strong> Use them to compare cartridges against each other, " +
      "not as real-world holds. They come from a standard ballistic model, and your rifle, ammo, scope height, zero, " +
      "altitude and weather will almost certainly be different. Confirm your own zero and drops at the range before you hunt.</div>";
    var header = document.querySelector(".wrap header") || document.querySelector("header");
    if (header) header.parentNode.insertBefore(warn, header.nextSibling);
    mpbrTh.forEach(function (th) {
      var tag = document.createElement("span");
      tag.className = "sh-thwarn";
      tag.title = tip;
      tag.textContent = "⚠ Comparison only";
      th.appendChild(tag);
    });
  }

  var touch = window.matchMedia && window.matchMedia("(hover: none)").matches;

  document.querySelectorAll(".table-box").forEach(function (box) {
    var table = box.querySelector("table");
    if (!table) return;

    var shell = document.createElement("div");
    shell.className = "sh-shell";
    box.parentNode.insertBefore(shell, box);

    var hint = document.createElement("div");
    hint.className = "sh-hint";
    hint.setAttribute("role", "note");
    hint.innerHTML =
      '<span class="sh-msg">' +
      (touch ? "Swipe the table sideways to see every column" : "Scroll sideways to see every column") +
      ' <span class="sh-arrow" aria-hidden="true">→</span></span>' +
      '<span class="sh-pos" aria-live="polite"></span>' +
      '<span class="sh-btns">' +
      '<button type="button" class="sh-btn" data-d="-1" aria-label="Scroll table left">◀</button>' +
      '<button type="button" class="sh-btn" data-d="1" aria-label="Scroll table right">▶</button>' +
      "</span>";

    var frame = document.createElement("div");
    frame.className = "sh-frame";
    var edgeL = document.createElement("div");
    edgeL.className = "sh-edge l";
    var edgeR = document.createElement("div");
    edgeR.className = "sh-edge r";

    var rail = document.createElement("div");
    rail.className = "sh-rail";
    rail.setAttribute("aria-hidden", "true");
    var railInner = document.createElement("div");
    rail.appendChild(railInner);

    shell.appendChild(hint);
    shell.appendChild(frame);
    frame.appendChild(box);
    frame.appendChild(edgeL);
    frame.appendChild(edgeR);
    shell.appendChild(rail);

    if (!box.hasAttribute("tabindex")) {
      box.tabIndex = 0; // lets keyboard users scroll with the arrow keys
      box.setAttribute("aria-label", "Chart table, scrolls sideways");
    }

    var pos = hint.querySelector(".sh-pos");
    var btnL = hint.querySelector('[data-d="-1"]');
    var btnR = hint.querySelector('[data-d="1"]');

    function update() {
      var max = box.scrollWidth - box.clientWidth;
      var over = max > 2;
      shell.classList.toggle("sh-on", over);
      hint.hidden = !over;
      rail.hidden = !over;
      if (!over) {
        frame.classList.remove("can-l", "can-r");
        return;
      }
      railInner.style.width = (max + rail.clientWidth) + "px"; // same scroll range as the table
      var x = box.scrollLeft;
      frame.classList.toggle("can-l", x > 2);
      frame.classList.toggle("can-r", x < max - 2);
      btnL.disabled = x <= 2;
      btnR.disabled = x >= max - 2;

      var ths = table.querySelectorAll("thead th");
      if (ths.length) {
        var left = x, right = x + box.clientWidth, first = 0, last = 0;
        ths.forEach(function (th, i) {
          var mid = th.offsetLeft + th.offsetWidth / 2;
          if (mid >= left && mid <= right) {
            if (!first) first = i + 1;
            last = i + 1;
          }
        });
        pos.textContent = !first ? "" : first === last ? "Column " + first + " of " + ths.length : "Columns " + first + "–" + last + " of " + ths.length;
      }
    }

    // Keep the table and the sticky rail in step. Whichever one the user is
    // actually touching leads; the other just follows, so they never fight.
    var driver = "box";
    function setDriver(d) { return function () { driver = d; }; }
    ["pointerdown", "wheel", "touchstart", "keydown"].forEach(function (ev) {
      rail.addEventListener(ev, setDriver("rail"), { passive: true });
      box.addEventListener(ev, setDriver("box"), { passive: true });
    });

    box.addEventListener("scroll", function () {
      if (driver === "box" && rail.scrollLeft !== box.scrollLeft) rail.scrollLeft = box.scrollLeft;
      update();
    }, { passive: true });

    rail.addEventListener("scroll", function () {
      if (driver === "rail" && box.scrollLeft !== rail.scrollLeft) box.scrollLeft = rail.scrollLeft;
    }, { passive: true });

    [btnL, btnR].forEach(function (b) {
      b.addEventListener("click", function () {
        driver = "box";
        box.scrollBy({ left: Number(b.dataset.d) * box.clientWidth * 0.75, behavior: "smooth" });
      });
    });

    if (window.ResizeObserver) {
      var ro = new ResizeObserver(update);
      ro.observe(box);
      ro.observe(table);
    }
    window.addEventListener("resize", update);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(update);
    update();
  });
})();

/* Cartridge names in the charts link to their profile pages (cartridges/*.html). */
(function(){var M={"5.7x28mm":"5-7x28mm","5.45x39":"5-45x39","5.56x45 NATO":"5-56x45-nato","6.5 Carcano":"6-5-carcano","6.5 Creedmoor":"6-5-creedmoor","6.5 Creedmoor +Peak":"6-5-creedmoor-plus-peak","6.5 Grendel":"6-5-grendel","6.5 PRC":"6-5-prc","6.5 SAUM":"6-5-saum","6.5x47 Lapua":"6-5x47-lapua","6.5x50 Arisaka":"6-5x50-arisaka","6.5x55 Swedish":"6-5x55-swedish","6.8 SPC":"6-8-spc","6mm ARC":"6mm-arc","6mm Creedmoor":"6mm-creedmoor","6mm Dasher":"6mm-dasher","6mm GT":"6mm-gt","6mm Remington":"6mm-remington","6mm-284":"6mm-284","7.5x55 Swiss":"7-5x55-swiss","7.7x58 Arisaka":"7-7x58-arisaka","7.62x39":"7-62x39","7.62x51 NATO":"7-62x51-nato","7.62x54R":"7-62x54r","7.65x53 Argentine":"7-65x53-argentine","7mm PRC":"7mm-prc","7mm Remington Mag":"7mm-remington-mag","7mm-08 Remington":"7mm-08-remington","7x57 Mauser":"7x57-mauser","8mm Lebel":"8mm-lebel","8mm Mauser (8x57 IS)":"8mm-mauser-8x57-is","9mm Luger":"9mm-luger","9mm PCC":"9mm-pcc","10mm Auto":"10mm-auto",".17 Ackley Hornet":"17-ackley-hornet",".17 HM2":"17-hm2",".17 HMR":"17-hmr",".17 WSM":"17-wsm",".20 Practical":"20-practical","22 ARC":"22-arc",".22 BR":"22-br",".22 Long Rifle":"22-long-rifle",".22 LR":"22-long-rifle",".22 LR Subsonic":"22-lr-subsonic",".22 Short":"22-short",".22 WMR":"22-wmr",".22-250 Ackley Improved":"22-250-ackley-improved",".22-250 Remington":"22-250-remington",".25 Creedmoor":"25-creedmoor",".25 PRC":"25-prc",".25-06 Remington":"25-06-remington",".30 BR":"30-br",".30-06 Ackley Improved":"30-06-ackley-improved",".30-06 Springfield":"30-06-springfield",".30-30 Ackley Improved":"30-30-ackley-improved",".30-30 Winchester":"30-30-winchester",".30-40 Krag":"30-40-krag",".38 Special":"38-special",".40 S&W":"40-s-and-w",".44 Magnum":"44-magnum",".44 Special":"44-special",".45 ACP":"45-acp",".45 Colt":"45-colt",".45-70 Government":"45-70-government",".50 Beowulf":"50-beowulf",".50 BMG":"50-bmg",".223 Remington":"223-remington","5.56 NATO / .223 Rem":"223-remington",".224 Valkyrie":"224-valkyrie",".243 Winchester":"243-winchester",".257 Blackbird":"257-blackbird",".257 Roberts Ackley Improved":"257-roberts-ackley-improved",".260 Ackley Improved":"260-ackley-improved",".260 Remington":"260-remington",".270 Winchester":"270-winchester",".284 Shehane":"284-shehane",".300 Blackout":"300-blackout",".300 Blackout Subsonic":"300-blackout-subsonic",".300 Norma Magnum":"300-norma-magnum",".300 PRC":"300-prc",".300 Winchester Mag":"300-winchester-mag",".303 British":"303-british",".308 Winchester":"308-winchester",".308 Win / 7.62 NATO":"308-winchester",".338 Federal":"338-federal",".338 Lapua Magnum":"338-lapua-magnum",".338 Winchester Mag":"338-winchester-mag",".350 Legend":"350-legend",".357 Magnum":"357-magnum",".357 SIG":"357-sig",".375 CheyTac":"375-cheytac",".375 H&H Magnum":"375-h-and-h-magnum",".375 Ruger":"375-ruger",".380 ACP":"380-acp",".404 Jeffery":"404-jeffery",".416 Barrett":"416-barrett",".416 Remington Magnum":"416-remington-magnum",".416 Rigby":"416-rigby",".450 Bushmaster":"450-bushmaster",".450/400 3\" Nitro Express":"450-400-3-nitro-express",".454 Casull":"454-casull",".458 Lott":"458-lott",".458 SOCOM":"458-socom",".458 Winchester Magnum":"458-winchester-magnum",".460 S&W Magnum":"460-s-and-w-magnum",".470 Nitro Express":"470-nitro-express",".500 Nitro Express 3\"":"500-nitro-express-3",".500 S&W Magnum":"500-s-and-w-magnum",".505 Gibbs":"505-gibbs",".577 Nitro Express 3\"":"577-nitro-express-3",".600 Nitro Express":"600-nitro-express"};
function link(){document.querySelectorAll("tbody .cart").forEach(function(el){if(el.querySelector("a"))return;var s=M[el.textContent.trim()];if(!s)return;
var a=document.createElement("a");a.href="cartridges/"+s+".html";a.className="cart-link";a.title="Open the "+el.textContent.trim()+" profile";
a.addEventListener("click",function(e){e.stopPropagation()});while(el.firstChild)a.appendChild(el.firstChild);el.appendChild(a);});}
var st=document.createElement("style");st.textContent=".cart-link{color:inherit;text-decoration:none}.cart-link:hover{color:var(--accent);text-decoration:underline}";document.head.appendChild(st);
link();var tb=document.querySelector("tbody");if(tb)new MutationObserver(link).observe(tb,{childList:true,subtree:true});})();
