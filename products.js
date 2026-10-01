// ===== EDIT THIS FILE to change shop info and products =====
const SHOP = {
  name: "YourName 3D Prints",          // placeholder: replace with your shop name
  email: "3f9c325b5938415c6dbc39059dd14b69",  // FormSubmit address or alias: order requests go here (not shown to customers)
  contactEmail: "stephenskrove@gmail.com",    // shown to customers in the footer and error messages
  area: "Grants Pass",                  // shown on the home page and footer
  payment: "cash, Venmo, or Zelle"     // shown on the confirmation page
};

// Color swatches. The value is any CSS background, so silk and glitter can hint at the finish.
const GLITTER = (c, base) => `radial-gradient(circle at 25% 30%,${c} 0 1.5px,transparent 2px),radial-gradient(circle at 70% 55%,${c} 0 1.5px,transparent 2px),radial-gradient(circle at 40% 80%,${c} 0 1px,transparent 1.5px),${base}`;
const COLORS = {
  "Silk Gold": "linear-gradient(135deg,#8a6a1c,#f1d27a 40%,#b8902f 60%,#f6e3a1)",
  "Silk Red": "linear-gradient(135deg,#6e0f12,#e0494d 40%,#9a1b20 60%,#f08488)",
  "Black / Blue Glitter": GLITTER("#6ab0ff", "#1a1a1a"),
  "Black / Gold Glitter": GLITTER("#e8c25a", "#1a1a1a"),
  "White": "#f2f2f2", "Gray": "#8a8f94", "Purple": "#7a4bb5", "Blue": "#2f5fb8"
};
const ALL = Object.keys(COLORS);

// To add a product, copy a block. "image" is optional: put a file in images/ and use
// e.g. image: "images/benchy.jpg". "soldOut" lists colors you're out of right now.
// "note" is an optional notice shown on the product page.
const PRODUCTS = [
  { id: "benchy", name: "Benchy Boat", price: 5, icon: "🚢",
    desc: "The classic little 3D-printing tugboat. A fun desk decoration or small gift.",
    details: "Printed in PLA plastic.",
    colors: ALL, soldOut: [], note: "", image: "" },
  { id: "shooter", name: "Disk Shooter", price: 12, icon: "🎯",
    desc: "A flat, hand-held launcher that shoots quarter-size disks fast and far. Push to fire.",
    details: "Printed in PLA plastic. Comes with 5 disks, which are likely the same color as the launcher but may vary.",
    colors: ALL, soldOut: [],
    note: "Small parts warning: the disks are a choking hazard. Not for children under 3. Never aim at faces or eyes.", image: "" },
  { id: "whistle", name: "Whistle", price: 8, icon: "📣",
    desc: "Small, simple, and surprisingly loud.",
    details: "Printed in PLA plastic. No small parts.",
    colors: ALL, soldOut: [], note: "", image: "" }
];
