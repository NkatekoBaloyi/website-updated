# Adventure Escape South Africa

A multi-page website for an escape room business in South Africa. Visitors can browse the rooms, read about each adventure, pick a date and time, and "book" a session. The site is built with plain **HTML, CSS and vanilla JavaScript**, with no frameworks and no build step.

> **Status:** Front-end prototype. Forms are handled in the browser only and nothing is sent to a server.

---

## Features

- **Responsive layout** with a header, dropdown rooms menu, mobile menu toggle and a structured footer.
- **Active page highlighting** in the navigation.
- **Room cards** with star difficulty ratings and a price row.
- **Room category filter** on the Rooms page (All, Horror, Mystery, Adventure, Sci-Fi).
- **FAQ accordion** on the Home page (keyboard accessible).
- **Booking page**
  - Clickable calendar that syncs with the date input
  - Time slot selection
  - Player stepper (+ / -) with per-room minimum and maximum
  - Live booking summary and total price
  - Promo codes
  - Validation with clear error messages and a confirmation message
- **Contact form** with validation (name, email, message) and a success message.
- **Broken image fallback**: missing images get a placeholder style instead of a broken icon.

---

## Pages

| File | Page | Description |
|---|---|---|
| `index.html` | Home | Hero banner, featured rooms, how it works, testimonials, FAQ |
| `rooms.html` | All Escape Rooms | Filterable cards for all six rooms |
| `room-detail.html` | Room Detail | Story, what to expect, rules and booking box for The Lost Temple |
| `booking.html` | Booking | Room, date, time slot, player count, summary and promo code |
| `about.html` | About | Company story, statistics and team |
| `contact.html` | Contact | Message form, contact details, operating hours and map |

---

## Rooms and Pricing

| Room | Category | Difficulty | Duration | Players | Price per person |
|---|---|---|---|---|---|
| The Lost Temple | Adventure | 3 / 5 | 60 min | 2-6 | R350 |
| Haunted Mansion | Horror | 5 / 5 | 60 min | 4-8 | R380 |
| Prison Break | Mystery | 4 / 5 | 60 min | 2-5 | R320 |
| Space Station | Sci-Fi | 4 / 5 | 75 min | 3-6 | R390 |
| Pirate Cove | Adventure | 3 / 5 | 60 min | 4-8 | R340 |
| Zombie Lab | Horror | 5 / 5 | 60 min | 2-6 | R329 |

### Promo codes

| Code | Discount |
|---|---|
| `ESCAPE10` | 10% off |
| `TEAM15` | 15% off |

---

## Project Structure

```text
escape-site/
├── index.html
├── rooms.html
├── room-detail.html
├── booking.html
├── about.html
├── contact.html
├── styles.css
├── script.js
├── README.md
└── images/
    ├── logo.png
    ├── hero.jpg
    ├── lost-temple-hero.jpg
    ├── lost-temple.jpg
    ├── haunted-mansion.jpg
    ├── prison-break.jpg
    ├── space-station.jpg
    ├── pirate-cove.jpg
    ├── zombie-lab.jpg
    ├── team-puzzle.jpg
    ├── workshop.jpg
    └── map-cape-town.png
```

---

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/escape-site.git
   cd escape-site
   ```

2. Make sure `styles.css` and `script.js` sit in the same folder as the HTML files.
3. Create an `images/` folder and add your pictures using the file names above.
4. Open `index.html` in your browser. No build step or server is needed.

---

## Images

Image sizes are about 2x the displayed width so they stay sharp on high-resolution screens.

| File | Used on | Size (px) | Ratio |
|---|---|---|---|
| `logo.png` | Header and footer | 160 x 160 | 1:1 |
| `hero.jpg` | Home banner | 1920 x 640 | 3:1 |
| `lost-temple-hero.jpg` | Room detail banner | 1920 x 600 | 3.2:1 |
| `lost-temple.jpg`, `haunted-mansion.jpg`, `prison-break.jpg`, `space-station.jpg`, `pirate-cove.jpg`, `zombie-lab.jpg` | Room cards | 800 x 450 | 16:9 |
| `team-puzzle.jpg` | About banner | 1600 x 600 | 8:3 |
| `workshop.jpg` | About story | 1200 x 800 | 3:2 |
| `map-cape-town.png` | Contact map | 800 x 400 | 2:1 |

**Tips**

- Crop each image to its ratio before saving.
- Save photos as JPG at about 80% quality, under 300 KB each. Use PNG for the logo and map.
- Keep the important part of banner images in the centre, since narrow screens crop the edges.

---

## Known Issues and To-Do

These are the things to fix before the site goes live.

- [ ] **Image paths:** `index.html` and `about.html` point to files on a local Windows drive (`C:\Users\...`). Copy those images into `images/` and use relative paths such as `images/hero.jpg`.
- [ ] **Image names and formats:** the current image files are `.webp` with different names (for example `The_Lost_Temple.webp`), but the HTML expects `.jpg` files inside `images/`. Either rename and convert the images, or update the `src` attributes.
- [ ] **Duplicate tags:** `rooms.html` links `styles.css` and `script.js` twice in the `<head>`. Remove the duplicates.
- [ ] **Booking calendar:** the calendar and date input are fixed to **March 2026**. Update them, or build a dynamic calendar.
- [ ] **Room names:** "Underground Lab" and "Haunted Manor" appear in some footers and in "Other Adventures" but do not match the six rooms on the Rooms page (Zombie Lab, Haunted Mansion). Make the names consistent.
- [ ] **Room detail page:** only The Lost Temple has a detail page. All other "View Room" links go to `rooms.html`.
- [ ] **Forms:** the booking and contact forms do not submit anywhere. Connect them to a backend or a form service.
- [ ] **Content:** replace the placeholder team members, testimonials, prices and the sample phone number and address with real details.
- [ ] **Navigation:** `index.html`, `rooms.html`, `room-detail.html`, `booking.html` and `about.html` do not include a Home link in the menu, while `contact.html` does. Make the menus consistent.

---

## Tech Stack

- HTML5
- CSS3 (`styles.css`)
- Vanilla JavaScript (`script.js`)

---

## Contributing

This is a group project. To contribute:

1. Create a branch: `git checkout -b feature/your-change`
2. Commit your changes: `git commit -m "Describe your change"`
3. Push the branch: `git push origin feature/your-change`
4. Open a pull request.

---

## License

Add your preferred license here, for example [MIT](https://choosealicense.com/licenses/mit/).
