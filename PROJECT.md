# Project notes: local 3D-print shop website
Paste or upload this file at the start of a new chat so Claude can pick up where we left off.

## How we work (important)
- Claude is developer and design collaborator. **Claude proposes, the owner decides, then Claude implements.**
- For every decision or change except tiny ones: give options with pros and cons, recommend one, wait for the owner's choice, implement, then present the next decision.
- Prioritize: functional, simple for customers, easy to maintain, good-looking and trustworthy, expandable. Don't over-engineer.
- **File delivery rule:** if one file changed, give just that file. If two or more changed, give a zip of only the changed files.
- Always keep the real emails and alias below in `products.js` so the owner doesn't have to re-enter them.
- Keep this file updated after each decision.

## Setup
- Static site (HTML/CSS/JS, no framework) hosted on GitHub Pages. Orders go through FormSubmit.
- Files: `index.html`, `style.css`, `app.js` (logic, hash routing), `icons.js` (placeholder icons), `products.js` (shop info, categories, colors, products), plus `favicon.svg`, `favicon.png`, `apple-touch-icon.png`.
- In `products.js`: `email` = FormSubmit alias `3f9c325b5938415c6dbc39059dd14b69` (order requests go here); `contactEmail` = `stephenskrove@gmail.com` (shown to customers); `area` = Grants Pass.
- Shop name: "Stephen Skrove 3D Prints" (decided, option A). Chosen because Oregon generally doesn't require an assumed business name registration ($50, renewed every 2 years) when the name includes the owner's real name. Sources were inconsistent on how strict this is, so the owner should confirm with the Oregon Secretary of State and check local business license and income reporting rules. Not legal advice. Fallback if strict: name "Stephen Skrove" with "3D Prints" as a tagline. Owner's first name on the About page: Stephen.

## Business decisions
- Orders are requests only, no online payment. Pay at meetup by cash, Venmo, or Zelle. No tax or shipping handling.
- Fulfillment: local meetup, maybe local delivery (dropdown option, "ask about fees"). Shipping may come later.
- Customers build a "request list" (cart), fill a form (name, email, optional phone, meetup/delivery, notes), and get a confirmation page with next steps.

## Products (replaced with the owner's full starting list: 23 items + 6 mystery boxes)
- 5 categories: Animals (gecko, chicken, wolf, cat), Vehicles (12), Desk Toys (thumb piano, thumb drum, fidget stick, Benchy), Functional (flat wallet, fish tank sign, fake egg), Mystery Boxes (6).
- Shop page has live search (product name, `tags`, category keywords; descriptions are not searched, so "car" doesn't return trucks; plural "cars" works) and category buttons. Home page shows only products with `featured: true` (Working Garbage Truck, Articulated Gecko, Flexi Chicken) plus a "See all products" button.
- Color option "Painted" was renamed "Colored" (rainbow swatch). Fish Tank Sign has one option, "Gray/Black and White". Colors per product follow the owner's list.
- Descriptions were lightly tidied. Facts were kept as the owner wrote them.
- Mystery boxes: a 4-item and an 8-item box for cars, articulated toys, and desk toys/functional items. No color choice (`mystery: true`); the request list shows "Surprise". Prices set by the owner: $25 for a 4-item box, $40 for an 8-item box.
- Placeholder pictures (owner chose option A): simple flat white icons (truck, semi, gecko, cat, etc.) drawn in code in `icons.js` on a favicon-style square tinted per category. Each product has an `icon` key in `products.js`. Real AI-generated images aren't possible for Claude here. Icons were not visually previewed by Claude (no renderer available), so the owner should check how they look and report any that look off. Replaced automatically when a product gets `images`.
- Removed with this change: Disk Shooter, Whistle, silk/glitter colors, and the Disk Shooter FAQ and small-parts notice (they weren't on the new list). Restore from the old `products.js` if wanted.
- Photos: see Photos section. Check that each design's license allows selling prints (still open).

## Design decisions made
- Color options: swatches that hint at the finish (silk sheen, glitter speckles), plus a per-product `soldOut` list. A note says colors vary slightly by spool. Later, real per-color photos for best sellers.
- Home page: option A. A one-line intro with the products right underneath, then the layer-line stripe and the how-it-works steps. Option C (a short "made by a local person" intro with a photo) is planned for later once the owner has a photo.
- Overall look: option A, keep the current look (calm frame so the colorful products stand out). Warmer accent than teal is an option if it ever feels too plain. Current look: cool off-white background, deep teal accent, print-layer-line stripe motif, Bricolage Grotesque font.

## Favicon
- The browser tab icon is the same layered-stripes mark as the header: `favicon.svg`, `favicon.png`, and `apple-touch-icon.png` (for iPhone home screen), linked in `index.html`.

## Photos (decided)
- Mix of approaches: print the first item of each kind, photograph it on the print bed with the owner's light, plus an in-hand shot for scale and an in-use shot.
- Color rule (option C): main photo and in-hand photo use the same mid-tone color (blue or red work well; avoid black and white). The in-use photo can be any color.
- Gallery is built: `images: [...]` in `products.js`, first photo is the main one (also used on cards), thumbnails switch the main photo. `defaultColor` preselects the color matching the main photo.
- How to add photos: make an `images/` folder in the repo, use short lowercase names with no spaces (e.g. `benchy-1.jpg`), resize to about 1200 px wide (under ~500 KB each), roughly square with the subject centered (the site crops to a square), list them in `images` (print-bed shot first), set `defaultColor`, push to GitHub.

## Order form (decided: option B)
- Customer picks meetup or local delivery. Meetup shows a dropdown of public spots from `SHOP.meetupSpots` in `products.js` (plus "work out a spot by email"). Delivery shows an address box instead. Both ask for days/times that work, plus optional notes.
- `meetupSpots` currently has one spot: "Dutch Bros Coffee, 332 NW 6th St". More can be added.
- The confirmation page previously claimed a copy was emailed to the customer. That was wrong (FormSubmit doesn't do that by default), so the sentence was removed.

## Customer replies (decided: option A)
- The FormSubmit auto-reply never worked and was removed. The owner replies personally to each request (FormSubmit sets the customer as reply-to, so just hit Reply).
- The confirmation page says who the reply comes from (`contactEmail`) and how soon (`replyTime` in `products.js`), and to check spam.
- Reply template: "Hi [name], thanks for your order! [qty x item (color): available / ready by date / sold out, alternatives]. Total: $__, paid by cash, Venmo, or Zelle at pickup. Meetup: [spot] on [day] at [time]. Does that work? Let me know and I'll get printing."

## Custom orders (decided: option B)
- No form. A note on the shop page and a "Custom prints" footer link open an email to `contactEmail` with the subject "Custom print request". Owner decides each request case by case.

## Availability and lead time (decided: option A, for now)
- The site says nothing about lead time. The owner answers it in the personal reply. When bigger, longer-printing items are added, revisit with option C (a lead time per product, e.g. a `leadTime` field shown on the product page).

## Website address (decided: option A)
- Use the free GitHub Pages address. The site is partly just for fun. A custom domain can be added later.

## About and FAQ page (decided and built)
- New `#/about` page, linked in the header: short story, FAQ list (editable `FAQ` array in `products.js`), and a "Browse the shop" button. Owner name shown (`ownerName` in `products.js`, currently blank until the owner supplies it); photo later via `ownerPhoto`.
- Story text (Claude's edit of the owner's rough wording): got a printer, enjoys it, sometimes a print fails and that's annoying, now selling favorites locally.
- Visual polish pass (hover effects, tidier header/intro, nicer illustrations) is planned for after real photos exist.

## Problem prints (decided: option B)
- If a customer sends a photo of a problem, the owner will happily refund or replace. Stated in the About page FAQ and on the confirmation page.

## Visual polish (decided: option A, done)
- Header has a layer-stripe mark next to the shop name and a bottom border. Nav links underline on hover. The request list count is a badge. Product cards lift on hover. Buttons have press feedback. Respects reduced-motion. Colors and layout unchanged.
- Bigger visual gain still waits on real product photos.

## Link previews (decided: text now, image later)
- Title, description, and Open Graph tags are in `index.html` (name and description hardcoded there, so update them if the shop name or area changes).
- Later: add `og:image` (needs the final site address and a good image or product photo).

## Launch (decided: soft launch first, option A)
- Share the link with a few friends or family first. Ask them to place a real order request from their phone, then reply to each personally and set up a meetup.
- Ask them: Was it clear what to do? Did anything confuse you? Did the form and confirmation work? Anything look off on your phone?
- Check that requests arrive (and not in spam), and that colors, prices, and meetup spots look right.
- After feedback, decide on a public launch (local groups) and whether to wait for photos first.

## Next decision
- Open items: what "Colored" means for customers, whether to offer an 8-item articulated box with only 2 designs, and feedback on how the icons look.

## To do
- [ ] Push latest files to GitHub, test on a phone
- [ ] Confirm the name/registration question with the Oregon Secretary of State
- [ ] Consider adding more public meetup spots to `meetupSpots` in `products.js`
- [ ] Take and add real product photos
- [ ] Owner to check descriptions, add sizes, confirm prices
- [ ] Add own photo (`ownerPhoto`) for the About page
- [ ] Add `og:image` link preview picture once photos and site address are final
- [ ] Later ideas: payment links, shipping options, size options, per-color photos
