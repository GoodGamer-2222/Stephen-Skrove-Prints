const $ = s => document.querySelector(s);
const money = n => "$" + n.toFixed(2);
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
let cart = [], last = null;
try { cart = JSON.parse(localStorage.getItem("cart") || "[]"); } catch (e) {}
const save = () => { try { localStorage.setItem("cart", JSON.stringify(cart)); } catch (e) {} };
const total = () => cart.reduce((t, c) => t + c.price * c.q, 0);
const count = () => cart.reduce((t, c) => t + c.q, 0);

const img = p => p.image ? `<div class="pimg"><img src="${p.image}" alt="${esc(p.name)}"></div>` : `<div class="ph" role="img" aria-label="${esc(p.name)}">${p.icon || "🧩"}</div>`;
const card = p => `<a class="card" href="#/product/${p.id}">${img(p)}<div class="t"><b>${esc(p.name)}</b><span class="price">${money(p.price)}</span></div></a>`;

const out = (p, c) => (p.soldOut || []).includes(c);
const avail = p => p.colors.filter(c => !out(p, c));
const swatches = p => p.colors.map(c => `<label class="${out(p, c) ? "out" : ""}"><input type="radio" name="color" value="${c}" ${out(p, c) ? "disabled" : c === avail(p)[0] ? "checked" : ""}><span class="dot" style="background:${COLORS[c] || "#ccc"}"></span>${esc(c)}${out(p, c) ? " (sold out)" : ""}</label>`).join("");

const views = {
  home: () => `
    <section class="hero sm">
      <h1>3D-printed things, made to order in ${esc(SHOP.area)}.</h1>
      <p>Pick what you like, send a request, and we'll set up a meetup.</p>
    </section>
    <div class="grid">${PRODUCTS.slice(0, 6).map(card).join("")}</div>
    ${PRODUCTS.length > 6 ? '<p><a href="#/shop">See all products</a></p>' : ""}
    <div class="layers" aria-hidden="true"></div>
    <section class="steps">
      <div><h3>1. Choose</h3><p>Pick products and colors, then add them to your request list.</p></div>
      <div><h3>2. Send a request</h3><p>No payment online. Just tell us who you are and how to reach you.</p></div>
      <div><h3>3. Meet up</h3><p>We'll reply by email to set a time and place. Pay when you pick up.</p></div>
    </section>`,

  shop: () => `<h2>Shop</h2><div class="grid">${PRODUCTS.map(card).join("")}</div>`,

  product: id => {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) return `<p>We couldn't find that product. <a href="#/shop">Back to the shop</a></p>`;
    return `<p><a href="#/shop">Back to shop</a></p>
    <div class="product">${img(p)}
      <form onsubmit="add(event,'${p.id}')">
        <h1 style="font-size:2.2rem">${esc(p.name)}</h1>
        <p class="price" style="font-size:1.4rem">${money(p.price)}</p>
        <p>${esc(p.desc)}</p><p style="color:var(--mute)">${esc(p.details)}</p>
        ${p.note ? `<p class="note">${esc(p.note)}</p>` : ""}<b>Color</b>
        <div class="sw">${swatches(p)}</div><small style="display:block;margin:-.5rem 0 1.2rem;color:var(--mute)">Colors vary slightly from spool to spool.</small>
        <b><label for="q">Quantity</label></b><br>
        <input id="q" type="number" name="q" min="1" max="20" value="1"><br><br>
        <button class="btn" ${avail(p).length ? "" : "disabled"}>Add to request list</button>
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
    <div class="note">This is a request, not a purchase. You won't be charged now. We'll email you to confirm and set up a meetup. Payment is ${esc(SHOP.payment)} when you pick up.</div>
    <form onsubmit="send(event)">
      <label class="f" for="name">Your name</label><input id="name" name="name" required autocomplete="name">
      <label class="f" for="email">Email</label><input id="email" name="email" type="email" required autocomplete="email">
      <label class="f" for="phone">Phone (optional)</label><input id="phone" name="phone" type="tel" autocomplete="tel">
      <label class="f" for="ful">How would you like to get your order?</label>
      <select id="ful" name="fulfillment"><option>Meet up in person</option><option>Local delivery (ask about fees)</option></select>
      <label class="f" for="notes">Preferred meetup area, times, or other notes</label><textarea id="notes" name="notes" rows="3"></textarea>
      <input class="hp" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true">
      <p><button class="btn">Send order request</button></p><p class="err" id="err" role="alert"></p>
    </form>`;
  },

  thanks: () => `<section class="hero"><h1>Request sent. Thank you!</h1>
    <p>${last ? `We sent a copy of your request details to ${esc(last.email)}. ` : ""}Here's what happens next:</p>
    <ol><li>We'll email you soon to confirm availability and the total.</li>
    <li>We'll agree on a time and place to meet.</li>
    <li>You pay with ${esc(SHOP.payment)} when you pick up.</li></ol>
    <p>Nothing has been charged. Check your spam folder if you don't hear back within a day or two.</p>
    <a class="btn" href="#/shop">Keep browsing</a></section>`
};

function add(e, id) {
  e.preventDefault();
  const p = PRODUCTS.find(x => x.id === id), f = e.target;
  const color = f.color.value, q = Math.max(1, Math.min(20, +f.q.value || 1));
  const ex = cart.find(c => c.id === id && c.color === color);
  ex ? ex.q += q : cart.push({ id, name: p.name, color, price: p.price, q });
  save(); nav(); $("#added").innerHTML = `Added! <a href="#/order">View request list</a>`;
}
const qty = (i, d) => { cart[i].q += d; if (cart[i].q < 1) cart.splice(i, 1); save(); render(); };
const rm = i => { cart.splice(i, 1); save(); render(); };
const nav = () => $("#cartlink").textContent = `Request list (${count()})`;

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
    last = { email: d.email }; cart = []; save(); location.hash = "/thanks";
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
}
$("#brand").textContent = SHOP.name;
$("#foot").innerHTML = `${esc(SHOP.name)} · ${esc(SHOP.area)} · <a href="mailto:${esc(SHOP.contactEmail)}">${esc(SHOP.contactEmail)}</a>`;
addEventListener("hashchange", render);
render();
