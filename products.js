// ===== EDIT THIS FILE to change shop info and products =====
const SHOP = {
  name: "Stephen Skrove 3D Prints",     // shop name (includes the owner's real name)
  email: "3f9c325b5938415c6dbc39059dd14b69",  // FormSubmit address or alias: order requests go here (not shown to customers)
  contactEmail: "stephenskrove@gmail.com",    // shown to customers in the footer and error messages
  meetupSpots: ["Dutch Bros Coffee, 332 NW 6th St"],  // public meetup places customers can pick
  replyTime: "within a day",             // shown on the confirmation page: how soon you'll reply
  ownerName: "Stephen",                  // your first name, shown on the About page (leave "" to hide)
  ownerPhoto: "",                       // e.g. "images/me.jpg" (leave "" for no photo)
  area: "Grants Pass",                  // shown on the home page and footer
  payment: "cash, Venmo, or Zelle",    // how meetup customers pay
  shipPayment: "Apple Pay or Zelle"    // payment options you send to shipping customers (edit to match what you offer)
};

// Categories: "words" are extra search keywords. "color" tints the placeholder picture.
const CATS = {
  animals:    { label: "Animals", color: "#2f5fb8", words: "animal animals pet critter toy toys" },
  vehicles:   { label: "Vehicles", color: "#0e6f62", words: "vehicle vehicles toy toys" },
  desk:       { label: "Desk Toys", color: "#7a4bb5", words: "desk toy toys fidget" },
  functional: { label: "Functional", color: "#b0405a", words: "functional useful practical" },
  mystery:    { label: "Mystery Boxes", color: "#b8741a", words: "mystery box boxes surprise gift random" }
};

// Color swatches (any CSS background). "Colored" shows as white with colored splashes.
const COLORS = {
  Green: "#2f8f4e", Gray: "#8a8f94", White: "#f2f2f2", Yellow: "#e8c52a", Red: "#c8362e",
  Blue: "#2f5fb8", Purple: "#7a4bb5",
  Colored: "radial-gradient(circle at 25% 30%,#c8362e 0 3px,transparent 3.5px),radial-gradient(circle at 72% 25%,#2f5fb8 0 3px,transparent 3.5px),radial-gradient(circle at 62% 74%,#2f8f4e 0 3px,transparent 3.5px),radial-gradient(circle at 28% 72%,#e8c52a 0 2.5px,transparent 3px),#f2f2f2",
  "Gray/Black and White": "linear-gradient(90deg,#444 50%,#f2f2f2 50%)"
};
const GWC = ["Gray", "White", "Colored"];
const GYWC = ["Gray", "Yellow", "White", "Colored"];
const GGWC = ["Green", "Gray", "White", "Colored"];
const SEVEN = ["Gray", "Yellow", "Red", "White", "Blue", "Purple", "Colored"];
const SIX = ["Gray", "Yellow", "Red", "White", "Blue", "Colored"];

// To add a product, copy a line. Fields: id, name, price, cat (a key from CATS), colors, desc.
// tags: extra search words. icon: a key from ICONS in icons.js (the placeholder picture). Optional: featured: true (shows on the home page), mystery: true (no color choice),
// images: ["images/x-1.jpg", ...] (first = main photo), defaultColor, soldOut: ["Red"], note: "text".
const D = { soldOut: [], tags: "", note: "", images: [], defaultColor: "" };
const PRODUCTS = [
  { ...D, id: "garbage-truck", icon: "garbage", name: "Working Garbage Truck", price: 15, cat: "vehicles", featured: true, colors: GGWC,
    desc: "Features moving mechanics, including a functional rear hopper and a bed tilt mechanism for hauling mini payloads. A working trash can arm picks up the trash cans. The wheels turn, and it comes with 2 trash cans that have working lids and wheels." },
  { ...D, id: "rocket-truck", icon: "rocket", name: "Rocket Launcher Truck", price: 13, cat: "vehicles", colors: GGWC,
    desc: "A rugged tactical cargo carrier fitted with a moving, rotating rocket pod assembly. The wheels move too." },
  { ...D, id: "tow-truck", icon: "tow", name: "Flatbed Tow Truck", price: 14.5, cat: "vehicles", colors: GWC,
    desc: "Equipped with a functional ramp on the back for driving other model cars (not included) onto the flatbed." },
  { ...D, id: "cement-mixer", tags: "truck", icon: "mixer", name: "Cement Mixer", price: 14, cat: "vehicles", colors: GWC,
    desc: "A construction site workhorse with a manually rotatable barrel mounted on a chassis with working wheels." },
  { ...D, id: "backhoe", tags: "construction", icon: "backhoe", name: "Backhoe", price: 12, cat: "vehicles", colors: GYWC,
    desc: "Complete with a fully positionable rear digging arm and working wheels." },
  { ...D, id: "tanker-semi", tags: "truck semi", icon: "tanker", name: "Tanker Semi", price: 13, cat: "vehicles", colors: GWC,
    desc: "A long-haul liquid transporter: a cab pulling a cylindrical tank on a flatbed trailer. The trailer is detachable and comes with 4 spare wheels. The model's wheels work." },
  { ...D, id: "container-semi", tags: "truck semi", icon: "container", name: "Container Semi", price: 13, cat: "vehicles", colors: GWC,
    desc: "A heavy freight cab connected to a detachable, rectangular shipping container unit. The trailer detaches, and the container (a hollow rectangular crate) comes on and off the trailer easily." },
  { ...D, id: "offroad-semi", tags: "truck semi", icon: "offroad", name: "Off-road Semi", price: 12, cat: "vehicles", colors: GWC,
    desc: "Designed to look like an eight-wheeled Tatra 813. The wheels work." },
  { ...D, id: "dump-truck", icon: "dump", name: "Long Dump Truck", price: 12.5, cat: "vehicles", colors: GYWC,
    desc: "A 6-wheeled dump truck with a dumpable dump bucket and working wheels." },
  { ...D, id: "bobcat", tags: "construction loader", icon: "bobcat", name: "Bobcat Tractor", price: 8, cat: "vehicles", colors: ["Gray", "Yellow", "Colored"],
    desc: "A compact 4-wheeled skid-steer utility front loader with a manual front loader arm setup and freely rotating wheels." },
  { ...D, id: "van", icon: "van", name: "Simple Van", price: 7, cat: "vehicles", colors: SEVEN,
    desc: "A hard, angular van with stylized, minimalist features and working wheels." },
  { ...D, id: "car", icon: "car", name: "Simple Car", price: 6.5, cat: "vehicles", colors: SEVEN,
    desc: "A hard, angular SUV/car with stylized, minimalist features and working wheels." },
  { ...D, id: "gecko", tags: "lizard reptile", icon: "gecko", name: "Articulated Gecko", price: 10, cat: "animals", featured: true, colors: ["Green", "Blue", "White", "Colored"],
    desc: "A cute little gecko with multiple interlocking tail segments that wiggle organically. The main body is not articulated." },
  { ...D, id: "chicken", icon: "chicken", name: "Flexi Chicken", price: 8, cat: "animals", featured: true, colors: SIX,
    desc: "A 2D chicken with a swinging, multi-jointed body." },
  { ...D, id: "snake", icon: "snake", tags: "reptile", name: "Articulated Snake", price: 15, cat: "animals", colors: SEVEN,
    desc: "A jointed, articulated snake." },
  { ...D, id: "rex", icon: "rex", tags: "dinosaur dino", name: "Flexi Rex", price: 8, cat: "animals", colors: SEVEN,
    desc: "A flat, 2D dinosaur with a partly articulated body." },
  { ...D, id: "slug", icon: "slug", name: "Articulated Slug", price: 5, cat: "animals", colors: SEVEN,
    desc: "A jointed, articulated slug." },
  { ...D, id: "lizard", icon: "gecko", tags: "reptile", name: "Articulated Lizard", price: 7, cat: "animals", colors: SEVEN,
    desc: "A jointed, articulated lizard." },
  { ...D, id: "orca", icon: "orca", tags: "whale", name: "Articulated Orca", price: 8, cat: "animals", colors: SEVEN,
    desc: "A jointed, articulated orca." },
  { ...D, id: "spider", icon: "spider", name: "Articulated Spider", price: 5, cat: "animals", colors: SEVEN,
    desc: "A jointed, articulated spider." },
  { ...D, id: "flower-dragon", icon: "dragon", name: "Flower Dragon", price: 8, cat: "animals", colors: SEVEN,
    desc: "A flower dragon." },
  { ...D, id: "capybara", icon: "capybara", name: "Articulated Capybara", price: 5, cat: "animals", colors: SEVEN,
    desc: "A jointed, articulated capybara." },
  { ...D, id: "thumb-piano", icon: "piano", name: "Thumb Piano", price: 14, cat: "desk", colors: SEVEN,
    desc: "A fully playable (though not very musical) acoustic instrument shell fitted with plastic plucking tines." },
  { ...D, id: "thumb-drum", icon: "drum", name: "Thumb Drum", price: 12, cat: "desk", colors: SEVEN,
    desc: "A pocket-sized hand percussion tool that makes distinct hollow tones when used. Includes two attached spring-style thumb drumsticks." },
  { ...D, id: "wolf", icon: "wolf", name: "Low Poly Wolf", price: 6, cat: "animals", colors: ["Gray", "White"],
    desc: "A modern, geometric tabletop statue with sharp, artistic polygon facial features. The wolf is howling (at the moon?)." },
  { ...D, id: "cat", icon: "cat", name: "Cat Statue", price: 5, cat: "animals", colors: GWC,
    desc: "A cartoonish cat with a big head, sitting down." },
  { ...D, id: "wallet", icon: "wallet", name: "Flat Wallet", price: 8, cat: "functional", colors: ["Gray", "Red", "White", "Blue", "Purple", "Colored"],
    desc: "A slim card carrier that fans out up to 5 cards so you can see them all and easily grab the right one." },
  { ...D, id: "fidget", icon: "stick", name: "Fidget Stick", price: 2, cat: "desk", colors: SIX,
    desc: "A small joystick-style fidget. It can't actually be used for a video game." },
  { ...D, id: "egg", tags: "hen chicken", icon: "egg", name: "Fake Egg", price: 5, cat: "functional", colors: ["Gray", "White"],
    desc: "A smooth, seamless oval print, ideal for custom painting projects or showing poultry where to lay eggs." },
  { ...D, id: "tank-sign", tags: "aquarium", icon: "sign", name: "Fish Tank Sign", price: 5.5, cat: "functional", colors: ["Gray/Black and White"],
    desc: "A sign for the outside of a fish tank that says \"Do not tap or knock on glass. It can stress or harm the animals.\"" },
  { ...D, id: "benchy", icon: "boat", name: "Benchy Boat", price: 5, cat: "desk", colors: SEVEN,
    desc: "The iconic 3D printing benchmark tugboat, included as a fun collector's novelty item." },

  // Mystery boxes: buyers can't choose items or colors.
  { ...D, id: "mystery-cars-4", icon: "box", name: "Mystery Car Box (4 Items)", price: 25, cat: "mystery", mystery: true, colors: [],
    desc: "4 surprise vehicles. You can't choose which ones or what colors." },
  { ...D, id: "mystery-cars-8", icon: "box", name: "Mystery Car Box (8 Items)", price: 40, cat: "mystery", mystery: true, colors: [],
    desc: "8 surprise vehicles. You can't choose which ones or what colors." },
  { ...D, id: "mystery-articulated-4", icon: "box", name: "Mystery Articulated Toy Box (4 Items)", price: 25, cat: "mystery", mystery: true, colors: [],
    desc: "4 surprise articulated toys. You can't choose which ones or what colors." },
  { ...D, id: "mystery-articulated-8", icon: "box", name: "Mystery Articulated Toy Box (8 Items)", price: 40, cat: "mystery", mystery: true, colors: [],
    desc: "8 surprise articulated toys. You can't choose which ones or what colors." },
  { ...D, id: "mystery-desk-4", icon: "box", name: "Mystery Desk Toy Box (4 Items)", price: 25, cat: "mystery", mystery: true, colors: [],
    desc: "4 surprise desk toys and functional items. You can't choose which ones or what colors." },
  { ...D, id: "mystery-desk-8", icon: "box", name: "Mystery Desk Toy Box (8 Items)", price: 40, cat: "mystery", mystery: true, colors: [],
    desc: "8 surprise desk toys and functional items. You can't choose which ones or what colors." }
];

// Questions shown on the About page. Edit freely: each item is ["question", "answer"].
const FAQ = [
  ["How does ordering work?", `Pick what you like and add it to your request list, then send the request. We'll email you from ${SHOP.contactEmail} to confirm availability and the total, and to set up a meetup.`],
  ["Do I pay online?", `No. Nothing is charged when you send a request. For meetups, you pay with ${SHOP.payment} when you pick up. For shipped orders, we'll email you the total with shipping and the payment info (${SHOP.shipPayment}).`],
  ["Where do we meet?", `At a public spot in ${SHOP.area}, which you pick on the order form. Local delivery adds a small additional fee.`],
  ["Do you ship?", `Yes. Choose "Ship it to me" on the order form. Shipping adds a small fee, which we calculate and email you before anything is charged. If the shipping is too much, you can cancel your order.`],
  ["Are the colors exact?", "Colors vary slightly from spool to spool. Tell us if a particular color matters."],
  ["What does \"Colored\" mean?", "Colored items are printed in white and then colored by hand to look realistic, so the exact coloring may vary slightly."],
  ["How do mystery boxes work?", "Each box holds 4 or 8 items from one category: cars, articulated toys, or desk toys and functional items. The items and colors are a surprise, so you can't choose them."],
  ["What are the products made of?", "PLA plastic, printed on a 3D printer."],
  ["What if there's a problem with my order?", `Send a photo of the problem to ${SHOP.contactEmail} and we'll happily refund or replace it.`],
  ["Can you make something custom?", `Maybe! Email us at ${SHOP.contactEmail} with what you have in mind. We'll tell you if we can do it and what it would cost.`]
];
