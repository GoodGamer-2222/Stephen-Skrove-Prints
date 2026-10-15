const $ = s => document.querySelector(s);
const money = n => "$" + n.toFixed(2);
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
let cart = [], last = null;
try { cart = JSON.parse(localStorage.getItem("cart") || "[]"); } catch (e) {}
const save = () => { try { localStorage.setItem("cart", JSON.stringify(cart)); } catch (e) {} };
const total = () => cart.reduce((t, c) => t + c.price * c.q, 0);
const count = () => cart.reduce((t, c) => t + c.q, 0);

const pics = p => p.images || [];
const mark = p => {
  const c = (CATS[p.cat] || {}).color || "#0e6f62", g = ICONS[p.icon];
  const t = p.name.split(/\s+/).filter(w => /^[A-Za-z]/.test(w)).slice(0, 2).map(w => w[0].toUpperCase()).join("");
  const art = g ? `<g fill="#fff" stroke="${c}" stroke-width="1" stroke-linejoin="round">${g(c)}</g>` : `<text x="16" y="20" text-anchor="middle" font-size="11" font-weight="800" font-family="system-ui,sans-serif" fill="#fff">${t}</text>`;
  return `<svg viewBox="0 0 32 32" role="img" aria-label="${esc(p.name)}"><rect x="1" y="1" width="30" height="30" rx="5" fill="${c}"/><g fill="#fff" opacity=".16"><rect x="1" y="7.5" width="30" height="3"/><rect x="1" y="14.5" width="30" height="3"/><rect x="1" y="21.5" width="30" height="3"/></g>${art}</svg>`;
};
const img = p => pics(p).length ? `<div class="pimg"><img src="${pics(p)[0]}" alt="${esc(p.name)}"></div>` : `<div class="ph">${mark(p)}</div>`;
const gallery = p => {
  const a = pics(p);
  if (!a.length) return img(p);
  return `<div><div class="pimg"><img id="mainimg" src="${a[0]}" alt="${esc(p.name)}"></div>` + (a.length > 1 ? `<div class="thumbs">${a.map((s, i) => `<button type="button" class="th ${i ? "" : "on"}" aria-label="Show photo ${i + 1}" onclick="showPic(this)"><img src="${s}" alt=""></button>`).join("")}</div>` : "") + `</div>`;
};
const showPic = b => { $("#mainimg").src = b.firstElementChild.src; document.querySelectorAll(".th").forEach(t => t.classList.toggle("on", t === b)); };
const card = p => `<a class="card" href="#/product/${p.id}">${img(p)}<div class="t"><b>${esc(p.name)}</b><span class="price">${money(p.price)}</span></div></a>`;

const out = (p, c) => (p.soldOut || []).includes(c);
const avail = p => p.colors.filter(c => !out(p, c));
const swatches = p => p.colors.map(c => `<label class="${out(p, c) ? "out" : ""}"><input type="radio" name="color" value="${c}" onchange="cnote()" ${out(p, c) ? "disabled" : c === (avail(p).includes(p.defaultColor) ? p.defaultColor : avail(p)[0]) ? "checked" : ""}><span class="dot" style="background:${COLORS[c] || "#ccc"}"></span>${esc(c)}${out(p, c) ? " (sold out)" : ""}</label>`).join("");

const custom = () => `<p class="note">Want something different, like another color, size, or design? <a href="mailto:${esc(SHOP.contactEmail)}?subject=${encodeURIComponent("Custom print request")}">Email us</a> and tell us what you have in mind. We'll let you know if we can do it and what it would cost.</p>`;
let sq = "", scat = "";
const chips = () => ["", ...Object.keys(CATS)].map(k => `<button type="button" class="chip" aria-pressed="${scat === k}" onclick="setCat('${k}')">${k ? CATS[k].label : "All"}</button>`).join("");
const list = () => {
  const w = sq.toLowerCase().split(/\s+/).filter(Boolean).map(x => x.length > 3 ? x.replace(/s$/, "") : x);
  const r = PRODUCTS.filter(p => { const tk = `${p.name} ${p.tags || ""} ${CATS[p.cat].label} ${CATS[p.cat].words}`.toLowerCase().split(/\W+/); return (!scat || p.cat === scat) && w.every(x => tk.some(t => t.startsWith(x))); });
  return r.length ? r.map(card).join("") : `<p>No matches. Try another word, or <a href="mailto:${esc(SHOP.contactEmail)}?subject=${encodeURIComponent("Custom print request")}">ask about a custom print</a>.</p>`;
};
const setQ = v => { sq = v; $("#list").innerHTML = list(); };
const setCat = k => { scat = k; $(".chips").innerHTML = chips(); $("#list").innerHTML = list(); };
const views = {
  home: () => `
    <section class="hero sm">
      <h1>3D-printed things, made to order in ${esc(SHOP.area)}.</h1>
      <p>Pick what you like, send a request, and we'll set up a meetup or shipping.</p>
    </section>
    <div class="grid">${PRODUCTS.filter(p => p.featured).map(card).join("")}</div>
    <p><a class="btn" href="#/shop">See all products</a></p>
    <div class="layers" aria-hidden="true"></div>
    <section class="steps">
      <div><h3>1. Choose</h3><p>Pick products and colors, then add them to your request list.</p></div>
      <div><h3>2. Send a request</h3><p>No payment online. Just tell us who you are and how to reach you.</p></div>
      <div><h3>3. Meet up or ship</h3><p>We'll reply by email to set up a meetup or quote shipping. Nothing is charged until you agree.</p></div>
    </section>`,

  shop: () => `<h2>Shop</h2>
    <input id="sq" type="search" placeholder="Search, like truck, cat, or wallet" aria-label="Search products" value="${esc(sq)}" oninput="setQ(this.value)">
    <div class="chips" role="group" aria-label="Categories">${chips()}</div>
    <div class="grid" id="list">${list()}</div>${custom()}`,

  product: id => {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) return `<p>We couldn't find that product. <a href="#/shop">Back to the shop</a></p>`;
    return `<p><a href="#/shop">Back to shop</a></p>
    <div class="product">${gallery(p)}
      <form onsubmit="add(event,'${p.id}')">
        <h1 style="font-size:2.2rem">${esc(p.name)}</h1>
        <p class="price" style="font-size:1.4rem">${money(p.price)}</p>
        <p>${esc(p.desc)}</p>${p.details ? `<p style="color:var(--mute)">${esc(p.details)}</p>` : ""}
        ${p.note ? `<p class="note">${esc(p.note)}</p>` : ""}${p.mystery ? `<p class="note">Mystery box: the items and colors are a surprise, so you can't choose them.</p>` : `<b>Color</b>
        <div class="sw">${swatches(p)}</div><small style="display:block;margin:-.5rem 0 1.2rem;color:var(--mute)">Colors vary slightly from spool to spool.</small><p id="cnote" class="note" hidden>Colored means this one is hand-colored to look realistic.</p>`}
        <b><label for="q">Quantity</label></b><br>
        <input id="q" type="number" name="q" min="1" max="20" value="1"><br><br>
        <button class="btn" ${p.mystery || avail(p).length ? "" : "disabled"}>Add to request list</button>
        <p id="added" role="status"></p>
      </form></div>`;
  },

  order: () => {
    if (!cart.length) return `<h2>Your request list</h2><p>It's empty. <a href="#/shop">Browse the shop</a></p>`;
    return `<h2>Your request list</h2>
    ${cart.map((c, i) => `<div class="row"><div class="n"><b>${esc(c.name)}</b><small>${esc(c.color)} · ${money(c.price)} each</small></div>
      <div class="q"><button aria-label="Fewer" onclick="qty(${i},-1)">−</button> ${c.q} <button aria-label="More" onclick="qty(${i},1)">+</button></div>
      <b>${money(c.price * c.q)}</b><button class="link" onclick="rm(${i})">Remove</button></div>`).join("")}
    <div class="total">Total: ${money(total())}</div>
    <div class="note">This is a request, not a purchase. You won't be charged now. We'll email you to confirm availability and the total. For meetups, you pay with ${esc(SHOP.payment)} when you pick up. For shipping, we'll email you the shipping cost and payment info.</div>
    <form onsubmit="send(event)">
      <label class="f" for="name">Your name</label><input id="name" name="name" required autocomplete="name">
      <label class="f" for="email">Email</label><input id="email" name="email" type="email" required autocomplete="email">
      <label class="f" for="phone">Phone (optional)</label><input id="phone" name="phone" type="tel" autocomplete="tel">
      <label class="f" for="ful">How would you like to get your order?</label>
      <select id="ful" name="fulfillment" onchange="ful()"><option>Meet up in person</option><option>Local delivery (there will be a small additional fee)</option><option>Ship it to me</option></select>
      <div id="spotbox"><label class="f" for="spot">Meetup spot</label>
      <select id="spot" name="meetup_spot">${(SHOP.meetupSpots || []).map(x => `<option>${esc(x)}</option>`).join("")}<option>We'll work out a public spot by email</option></select></div>
      <div id="addrbox" hidden><label class="f" for="addr">Delivery address</label><input id="addr" name="delivery_address" autocomplete="street-address" disabled></div>
      <div id="shipbox" hidden><label class="f" for="zip">ZIP code (so we can calculate shipping)</label><input id="zip" name="zip_code" inputmode="numeric" pattern="[0-9]{5}(-[0-9]{4})?" autocomplete="postal-code" disabled>
      <p class="note">Shipping adds a small fee, calculated after you send your request. We'll email you the total with shipping and ask for your full address if you want to go ahead. You can cancel your order if the shipping is too much.</p></div>
      <div id="whenbox"><label class="f" for="when">Days and times that work for you</label><input id="when" name="preferred_times" required placeholder="e.g. weekday evenings after 5, Saturday morning"></div>
      <label class="f" for="notes">Anything else we should know? (optional)</label><textarea id="notes" name="notes" rows="3"></textarea>
      <input class="hp" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true">
      <p><button class="btn">Send order request</button></p><p class="err" id="err" role="alert"></p>
    </form>`;
  },

  about: () => `<h1 style="font-size:2.2rem">About</h1>
    <section class="about">${SHOP.ownerPhoto ? `<img class="me" src="${esc(SHOP.ownerPhoto)}" alt="${esc(SHOP.ownerName || "The maker")}">` : ""}
    <p>${SHOP.ownerName ? `Hi, I'm ${esc(SHOP.ownerName)}. ` : ""}I got a 3D printer and started making things, and I've enjoyed it ever since. It's mostly fun. Sometimes a print fails, which is annoying, but that's part of the hobby. Now I'm selling a few of my favorites to people in ${esc(SHOP.area)} and beyond.</p></section>
    <div class="layers" aria-hidden="true"></div>
    <h2>Questions</h2>
    ${FAQ.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}
    <p style="margin-top:1.5rem"><a class="btn" href="#/shop">Browse the shop</a></p>`,

  thanks: () => `<section class="hero"><h1>Request sent. Thank you!</h1>
    <p>Here's what happens next:</p>
    ${last && last.ship ? `<ol><li>We'll email you ${esc(SHOP.replyTime || "soon")} from ${esc(SHOP.contactEmail)} with the shipping cost and the total, and ask for your full shipping address.</li>
    <li>If you're happy with it, we'll send payment info (${esc(SHOP.shipPayment)}).</li>
    <li>We ship your order once you've paid.</li></ol>
    <p>If the shipping is too much, you can cancel your order.</p>` : `<ol><li>We'll email you ${esc(SHOP.replyTime || "soon")} from ${esc(SHOP.contactEmail)} to confirm availability and the total.</li>
    <li>We'll agree on a time and place to meet.</li>
    <li>You pay with ${esc(SHOP.payment)} when you pick up.</li></ol>`}
    <p>Nothing has been charged. If you don't hear back by then, check your spam folder or email us at ${esc(SHOP.contactEmail)}.</p>
    <p>If a print has a problem, send us a photo and we'll happily refund or replace it.</p>
    <a class="btn" href="#/shop">Keep browsing</a></section>`
};

function add(e, id) {
  e.preventDefault();
  const p = PRODUCTS.find(x => x.id === id), f = e.target;
  const color = f.color ? f.color.value : "Surprise", q = Math.max(1, Math.min(20, +f.q.value || 1));
  const ex = cart.find(c => c.id === id && c.color === color);
  ex ? ex.q += q : cart.push({ id, name: p.name, color, price: p.price, q });
  save(); nav(); $("#added").innerHTML = `Added! <a href="#/order">View request list</a>`;
}
const ful = () => {
  const v = $("#ful").value, del = v.startsWith("Local"), shp = v.startsWith("Ship");
  $("#spotbox").hidden = del || shp; $("#spot").disabled = del || shp;
  $("#addrbox").hidden = !del; $("#addr").disabled = !del; $("#addr").required = del;
  $("#shipbox").hidden = !shp; $("#zip").disabled = !shp; $("#zip").required = shp;
  $("#whenbox").hidden = shp; $("#when").disabled = shp; $("#when").required = !shp;
};
const cnote = () => { const r = document.querySelector('input[name="color"]:checked'); $("#cnote").hidden = !(r && r.value === "Colored"); };
const qty = (i, d) => { cart[i].q += d; if (cart[i].q < 1) cart.splice(i, 1); save(); render(); };
const rm = i => { cart.splice(i, 1); save(); render(); };
const nav = () => $("#cartlink").innerHTML = `Request list <span class="badge${count() ? "" : " zero"}">${count()}</span>`;

async function send(e) {
  e.preventDefault();
  const f = e.target, b = f.querySelector(".btn"), d = Object.fromEntries(new FormData(f));
  d.items = cart.map(c => `${c.q} x ${c.name} (${c.color}) - ${money(c.price * c.q)}`).join("\n");
  d.total = money(total());
  d._subject = "New order request from " + d.name;
  d._template = "table"; d._captcha = "false";
  b.disabled = true; b.textContent = "Sending...";
  try {
    const r = await fetch("https://formsubmit.co/ajax/" + SHOP.email, {
      method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(d) });
    if (!r.ok) throw 0;
    last = { ship: d.fulfillment.startsWith("Ship") }; cart = []; save(); location.hash = "/thanks";
  } catch (x) {
    b.disabled = false; b.textContent = "Send order request";
    $("#err").textContent = "That didn't send. Please try again, or email us directly at " + SHOP.contactEmail + ".";
  }
}

function render() {
  const [, page, arg] = (location.hash.slice(1) || "/").split("/");
  const v = views[page || "home"] || views.home;
  $("#app").innerHTML = v(arg);
  document.title = SHOP.name;
  nav(); window.scrollTo(0, 0);
  if ($("#cnote")) cnote();
}
$("#brand").textContent = SHOP.name;
$("#foot").innerHTML = `${esc(SHOP.name)} · ${esc(SHOP.area)} · <a href="mailto:${esc(SHOP.contactEmail)}">${esc(SHOP.contactEmail)}</a> · <a href="mailto:${esc(SHOP.contactEmail)}?subject=Custom%20print%20request">Custom prints</a>`;
addEventListener("hashchange", render);
render();
