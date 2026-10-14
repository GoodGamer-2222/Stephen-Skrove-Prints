// ===== EDIT THIS FILE to change shop info and products =====
const SHOP = {
  name: "Stephen Skrove 3D Prints",     // shop name (includes the owner's real name)
  email: "3f9c325b5938415c6dbc39059dd14b69",  // FormSubmit address or alias: order requests go here (not shown to customers)
  contactEmail: "stephenskrove@gmail.com",    // shown to customers in the footer and error messages
  meetupSpots: ["Dutch Bros Coffee, 332 NW 6th St"],                      // public meetup places customers can pick, e.g. ["Library parking lot", "Cafe name, front door"]
  replyTime: "within a day",             // shown on the confirmation page: how soon you'll reply
  ownerName: "Stephen",                  // your first name, shown on the About page (leave "" to hide)
  ownerPhoto: "",                       // e.g. "images/me.jpg" (leave "" for no photo)
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

// To add a product, copy a block.
// "images": photos for the product, e.g. ["images/benchy-1.jpg", "images/benchy-2.jpg"].
//   The first photo is the main one (shown on the home page and shop grid). Empty = placeholder icon.
// "defaultColor": the color preselected on the page. Set it to the color in the main photo (exact name from COLORS).
// "soldOut": colors you're out of right now. "note": an optional notice shown on the product page.
const PRODUCTS = [
  { id: "benchy", name: "Benchy Boat", price: 5, icon: "🚢",
    desc: "The classic little 3D-printed tugboat. A fun desk decoration or small gift.",
    details: "Printed in PLA plastic.",
    colors: ALL, soldOut: [], note: "", images: [], defaultColor: "" },
  { id: "shooter", name: "Disk Shooter", price: 12, icon: "🎯",
    desc: "A flat, hand-held launcher that shoots quarter-size disks fast and far. Push to fire.",
    details: "Printed in PLA plastic. Comes with 5 disks, which are likely the same color as the launcher but may vary.",
    colors: ALL, soldOut: [],
    note: "Small parts warning: the disks are a choking hazard. Not for children under 3. Never aim at faces or eyes.", images: [], defaultColor: "" },
  { id: "whistle", name: "Whistle", price: 8, icon: "📣",
    desc: "Small, simple, and surprisingly loud.",
    details: "Printed in PLA plastic. No small parts.",
    colors: ALL, soldOut: [], note: "", images: [], defaultColor: "" }
];

// Questions shown on the About page. Edit freely: each item is ["question", "answer"].
const FAQ = [
  ["How does ordering work?", `Pick what you like and add it to your request list, then send the request. We'll email you from ${SHOP.contactEmail} to confirm availability and the total, and to set up a meetup.`],
  ["Do I pay online?", `No. Nothing is charged when you send a request. You pay with ${SHOP.payment} when you pick up.`],
  ["Where do we meet?", `At a public spot in ${SHOP.area}, which you pick on the order form. Local delivery may be possible too, so ask about fees.`],
  ["Are the colors exact?", "Colors vary slightly from spool to spool, and silk and glitter filaments look different in person than on a screen. Tell us if a particular color matters."],
  ["What are the products made of?", "PLA plastic, printed on a 3D printer."],
  ["Is the Disk Shooter safe for kids?", "The disks are small and a choking hazard, so it's not for children under 3. Never aim it at faces or eyes."],
  ["What if there's a problem with my order?", `Send a photo of the problem to ${SHOP.contactEmail} and we'll happily refund or replace it.`],
  ["Can you make something custom?", `Maybe! Email us at ${SHOP.contactEmail} with what you have in mind. We'll tell you if we can do it and what it would cost.`]
];
