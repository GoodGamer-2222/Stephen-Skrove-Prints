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
- Files: `index.html`, `style.css`, `app.js` (logic, hash routing), `products.js` (shop info, colors, products).
- In `products.js`: `email` = FormSubmit alias `3f9c325b5938415c6dbc39059dd14b69` (order requests go here); `contactEmail` = `stephenskrove@gmail.com` (shown to customers); `area` = Grants Pass.
- Shop name is still the placeholder "YourName 3D Prints". Owner hasn't chosen one yet. Ideas offered: plain local ("Grants Pass 3D Prints"), regional ("Rogue Layers", recommended), or own name. Also check the matching social handle is free.

## Business decisions
- Orders are requests only, no online payment. Pay at meetup by cash, Venmo, or Zelle. No tax or shipping handling.
- Fulfillment: local meetup, maybe local delivery (dropdown option, "ask about fees"). Shipping may come later.
- Customers build a "request list" (cart), fill a form (name, email, optional phone, meetup/delivery, notes), and get a confirmation page with next steps.

## Products (all PLA, all in the same 8 colors)
- Benchy Boat, $5.
- Disk Shooter, $12 (owner considered $10 to $15, hasn't objected to $12). Includes 5 disks, likely the same color as the launcher but may vary. Has a small-parts/choking warning, not for under 3, don't aim at faces.
- Whistle, $8. Loud. No small parts.
- Colors: Silk Gold, Silk Red, Black / Blue Glitter, Black / Gold Glitter, White, Gray, Purple, Blue.
- Descriptions are Claude's guesses. Owner should check them and add sizes.
- Photos: none yet, products show placeholder icons until photos are added (see Photos).
- Check that each design's license allows selling prints (Benchy is generally fine with credit; the other two unverified).

## Design decisions made
- Color options: swatches that hint at the finish (silk sheen, glitter speckles), plus a per-product `soldOut` list. A note says colors vary slightly by spool. Later, real per-color photos for best sellers.
- Home page: option A. A one-line intro with the products right underneath, then the layer-line stripe and the how-it-works steps. Option C (a short "made by a local person" intro with a photo) is planned for later once the owner has a photo.
- Overall look: option A, keep the current look (calm frame so the colorful products stand out). Warmer accent than teal is an option if it ever feels too plain. Current look: cool off-white background, deep teal accent, print-layer-line stripe motif, Bricolage Grotesque font.

## Photos (decided)
- Mix of approaches: print the first item of each kind, photograph it on the print bed with the owner's light, plus an in-hand shot for scale and an in-use shot.
- Color rule (option C): main photo and in-hand photo use the same mid-tone color (blue or red work well; avoid black and white). The in-use photo can be any color.
- Gallery is built: `images: [...]` in `products.js`, first photo is the main one (also used on cards), thumbnails switch the main photo. `defaultColor` preselects the color matching the main photo.
- How to add photos: make an `images/` folder in the repo, use short lowercase names with no spaces (e.g. `benchy-1.jpg`), resize to about 1200 px wide (under ~500 KB each), roughly square with the subject centered (the site crops to a square), list them in `images` (print-bed shot first), set `defaultColor`, push to GitHub.

## Order form (decided: option B)
- Customer picks meetup or local delivery. Meetup shows a dropdown of public spots from `SHOP.meetupSpots` in `products.js` (plus "work out a spot by email"). Delivery shows an address box instead. Both ask for days/times that work, plus optional notes.
- `meetupSpots` is empty until the owner picks real public spots.
- The confirmation page previously claimed a copy was emailed to the customer. That was wrong (FormSubmit doesn't do that by default), so the sentence was removed.

## Customer auto-reply (decided: option B)
- Short acknowledgment email sent by FormSubmit (`_autoresponse` field, built in `send()` in `app.js`). It uses the customer's name, shop name, area, payment methods, `contactEmail`, and `replyTime` from `products.js`. No order copy in it.
- Needs a test order to confirm it arrives (check spam).

## Next decision
- Custom orders: not offered, a "ask about a custom print" email link (recommended), or a dedicated custom-request form.

## To do
- [ ] Test the customer auto-reply with an order from a different email address
- [ ] Push latest files to GitHub, test on a phone
- [ ] Choose shop name
- [ ] Pick public meetup spots and fill in `meetupSpots` in `products.js`
- [ ] Take and add real product photos
- [ ] Owner to check descriptions, add sizes, confirm prices
- [ ] Add "made by a local person" intro (option C) when a photo exists
- [ ] Later ideas: payment links, shipping options, size options, per-color photos
