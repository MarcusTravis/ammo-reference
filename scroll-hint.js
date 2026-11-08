/* Horizontal-scroll cues for wide chart tables.
   Adds, for every .table-box that is wider than the screen:
   - a hint bar above the table with ◀ ▶ buttons and a "column x–y of n" readout
   - fade shadows on whichever edge has more columns hidden
   - a scrollbar that sticks to the bottom of the window while the table is on screen
   Everything hides itself automatically when the whole table already fits. */
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
`;
  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

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
