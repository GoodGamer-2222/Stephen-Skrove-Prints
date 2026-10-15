// Simple flat icons for product placeholder pictures. Each is drawn in white on a category-colored square.
// To change which icon a product uses, edit its "icon" in products.js. Real photos replace these automatically.
const W = (x, y) => `<circle cx="${x}" cy="${y}" r="2.4"/>`;
const CAB = '<path d="M20 13h5l4 4v3h-9z"/>';
const SEMI = '<path d="M2 13h6l3 3v4H2z"/>';
const ICONS = {
  garbage: c => `<rect x="3" y="10" width="16" height="10" rx="1.5"/><rect x="5" y="7" width="9" height="3" rx="1"/>${CAB}${W(9, 22)}${W(24, 22)}`,
  rocket: c => `<path d="M5 10l12-6v6z"/><rect x="3" y="10" width="16" height="10" rx="1.5"/>${CAB}${W(9, 22)}${W(24, 22)}`,
  tow: c => `<path d="M2 18l4-3h14v4H2z"/><path d="M21 12h5l4 4v3h-9z"/>${W(9, 22)}${W(25, 22)}`,
  mixer: c => `<ellipse cx="11" cy="13" rx="8" ry="5" transform="rotate(-15 11 13)"/><rect x="3" y="18" width="17" height="3"/>${CAB.replace("13", "14")}${W(8, 23)}${W(24, 23)}`,
  backhoe: c => `<path d="M10 14L3 9l2-2 8 5z"/><rect x="12" y="9" width="8" height="8" rx="1"/><rect x="8" y="16" width="16" height="4" rx="1"/>${W(11, 22)}${W(22, 22)}`,
  tanker: c => `${SEMI}<rect x="12" y="11" width="17" height="8" rx="4"/>${W(6, 22)}${W(18, 22)}${W(25, 22)}`,
  container: c => `${SEMI}<rect x="12" y="9" width="17" height="10"/>${W(6, 22)}${W(18, 22)}${W(25, 22)}`,
  offroad: c => `<path d="M2 12h6l3 3v5H2z"/><rect x="12" y="12" width="17" height="8" rx="1"/>${W(5, 22)}${W(12, 22)}${W(19, 22)}${W(26, 22)}`,
  dump: c => `<path d="M3 18L7 8l11 3v7z"/>${CAB}${W(8, 22)}${W(15, 22)}${W(24, 22)}`,
  bobcat: c => `<rect x="9" y="11" width="13" height="8" rx="2"/><path d="M23 10h6l-1 8h-5z"/>${W(11, 22)}${W(20, 22)}`,
  van: c => `<path d="M3 20V12a2 2 0 012-2h16l6 6v4z"/>${W(9, 22)}${W(23, 22)}`,
  car: c => `<path d="M3 20v-4l4-1 3-5h9l3 5h6v5z"/>${W(9, 22)}${W(23, 22)}`,
  gecko: c => `<ellipse cx="14" cy="16" rx="7" ry="4"/><circle cx="22" cy="14" r="3"/><circle cx="9" cy="19" r="2"/><circle cx="6" cy="21" r="1.6"/><circle cx="4" cy="23" r="1.2"/><circle cx="10" cy="12" r="1.5"/><circle cx="18" cy="12" r="1.5"/><circle cx="10" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/>`,
  chicken: c => `<path d="M7 14l-4-4 1 7z"/><rect x="12" y="21" width="1.6" height="5"/><rect x="17" y="21" width="1.6" height="5"/><ellipse cx="15" cy="17" rx="8" ry="6"/><circle cx="22" cy="10" r="3.5"/><path d="M25 10l3 1-3 1z"/><path d="M20 7l2-3 2 3z"/>`,
  piano: c => `<rect x="5" y="9" width="22" height="14" rx="3"/>${[9, 13, 17, 21].map(x => `<rect x="${x}" y="11" width="2" height="8" fill="${c}" stroke="none"/>`).join("")}`,
  drum: c => `<path d="M7 13v6c0 2 4 4 9 4s9-2 9-4v-6z"/><ellipse cx="16" cy="13" rx="9" ry="4"/><rect x="22" y="4" width="2" height="9" transform="rotate(25 23 8)"/>`,
  wolf: c => `<path d="M6 6l5 4h10l5-4v10l-6 9h-8l-6-9z"/><circle cx="12" cy="15" r="1" fill="${c}" stroke="none"/><circle cx="20" cy="15" r="1" fill="${c}" stroke="none"/><path d="M14 21h4l-2 2z" fill="${c}" stroke="none"/>`,
  cat: c => `<path d="M9 12l1-7 5 4zM23 12l-1-7-5 4z"/><circle cx="16" cy="17" r="8"/><circle cx="13" cy="16" r="1" fill="${c}" stroke="none"/><circle cx="19" cy="16" r="1" fill="${c}" stroke="none"/><path d="M15 19h2l-1 1.5z" fill="${c}" stroke="none"/>`,
  wallet: c => `<rect x="8" y="6" width="9" height="6" rx="1"/><rect x="14" y="5" width="9" height="6" rx="1"/><rect x="4" y="10" width="24" height="14" rx="2.5"/><rect x="22" y="14" width="6" height="5" rx="1.5"/>`,
  stick: c => `<rect x="7" y="19" width="18" height="5" rx="2"/><rect x="14.5" y="10" width="3" height="9"/><circle cx="16" cy="8" r="4"/>`,
  egg: c => `<path d="M16 5c5 0 8 8 8 13a8 8 0 01-16 0c0-5 3-13 8-13z"/>`,
  sign: c => `<rect x="4" y="9" width="24" height="14" rx="2"/><rect x="8" y="13" width="16" height="2" fill="${c}" stroke="none"/><rect x="8" y="17" width="11" height="2" fill="${c}" stroke="none"/>`,
  boat: c => `<rect x="12" y="6" width="4" height="5"/><rect x="10" y="10" width="9" height="7"/><path d="M3 17h26l-4 7H8z"/>`,
  box: c => `<rect x="5" y="9" width="22" height="16" rx="2"/><text x="16" y="21.5" text-anchor="middle" font-size="12" font-weight="800" font-family="system-ui,sans-serif" fill="${c}" stroke="none">?</text>`
};
