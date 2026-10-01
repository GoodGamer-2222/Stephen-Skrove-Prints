// ===== EDIT THIS FILE to change shop info and products =====
const SHOP = {
  name: "YourName 3D Prints",                    // placeholder: replace with your shop name
  email: "3f9c325b5938415c6dbc39059dd14b69",    // order requests are emailed here
  area: "Grants Pass",                         // e.g. "Grants Pass"
  payment: "cash, Venmo, or Zelle"            // shown on the confirmation page
};

// Swatch colors for the color buttons. Add any new color name here.
const COLORS = {
  Black: "#222", White: "#f2f2f2", Red: "#c8362e", Blue: "#2f5fb8",
  Green: "#2f8f4e", Orange: "#e8812a", Purple: "#7a4bb5", Gray: "#8a8f94",
  Rainbow: "linear-gradient(90deg,#c8362e,#e8812a,#e8d02a,#2f8f4e,#2f5fb8,#7a4bb5)"
};

// To add a product, copy one block. "image" is optional: put a file in images/ and
// use e.g. image: "images/dragon.jpg". Without one, a placeholder is shown.
const PRODUCTS = [
  { id: "dragon", name: "Articulated Dragon", price: 14, icon: "🐲",
    desc: "A flexible dragon printed in one piece. Poseable, and fun to fidget with.",
    details: "PLA plastic, about 25 cm long. Moves right off the print bed.",
    colors: ["Red", "Green", "Purple", "Rainbow"], image: "" },
  { id: "organizer", name: "Desk Cable Organizer", price: 6, icon: "🔌",
    desc: "Holds charging cables in place so they stop sliding behind the desk.",
    details: "PLA plastic, holds up to 5 cables. Sticks down with included tape.",
    colors: ["Black", "White", "Gray"], image: "" },
  { id: "planter", name: "Mini Succulent Planter", price: 9, icon: "🪴",
    desc: "A small geometric pot with a drainage hole and matching saucer.",
    details: "PLA plastic, about 8 cm wide. Plant not included.",
    colors: ["White", "Orange", "Blue", "Green"], image: "" },
  { id: "stand", name: "Phone Stand", price: 8, icon: "📱",
    desc: "A sturdy fold-flat stand that fits most phones and small tablets.",
    details: "PLA plastic. Works in portrait or landscape.",
    colors: ["Black", "White", "Blue", "Red"], image: "" }
];
