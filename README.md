# ADVENTURE-ESCAPE-SOUTH-AFRICA-GROUP-WORK-website# Adventure Escape South Africa

A plain HTML website for an escape room business in South Africa. The project uses **no CSS and no JavaScript**, so it works as a clean, unstyled starting point that you can style and extend yourself.

## Pages

| File | Page | Description |
|---|---|---|
| `index.html` | Home | Hero banner, featured rooms, how it works, testimonials and FAQ |
| `rooms.html` | All Escape Rooms | Category links and cards for all six rooms |
| `room-detail.html` | Room Detail | Story, what to expect, rules and booking box for The Lost Temple |
| `booking.html` | Booking | Room select, calendar table, time slots, player count and summary |
| `about.html` | About | Company story, statistics and team |
| `contact.html` | Contact | Message form, contact details, operating hours and map |

## Project Structure

```text
escape-site/
├── index.html
├── rooms.html
├── room-detail.html
├── booking.html
├── about.html
├── contact.html
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

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/escape-site.git
   cd escape-site
   ```

2. Create an `images/` folder and add your pictures using the file names above.
3. Open `index.html` in your browser. No build step or server is needed.

## Image Sizes

Sizes are about 2x the displayed width so images stay sharp on high-resolution screens.

| File | Used on | Size (px) | Ratio |
|---|---|---|---|
| `logo.png` | Header and footer | 160 × 160 | 1:1 |
| `hero.jpg` | Home banner | 1920 × 640 | 3:1 |
| `lost-temple-hero.jpg` | Room detail banner | 1920 × 600 | 3.2:1 |
| `lost-temple.jpg`, `haunted-mansion.jpg`, `prison-break.jpg`, `space-station.jpg`, `pirate-cove.jpg`, `zombie-lab.jpg` | Room cards | 800 × 450 | 16:9 |
| `team-puzzle.jpg` | About banner | 1600 × 600 | 8:3 |
| `workshop.jpg` | About story | 1200 × 800 | 3:2 |
| `map-cape-town.png` | Contact map | 800 × 400 | 2:1 |

**Tips**

- Crop each image to its ratio before saving.
- Save photos as JPG at about 80% quality, under 300 KB each. Use PNG for the logo and map.
- Keep the important part of banner images in the centre, since narrow screens crop the edges.

## Current Limitations

Because the site is plain HTML only:

- The booking form and contact form do not submit anywhere (`action="#"`).
- The booking total is static text and does not update with the player count.
- The calendar is a plain table. Use the date input to choose a date.
- The category links on the Rooms page do not filter the rooms.
- Prices for some rooms (Space Station, Pirate Cove, Underground Lab) are placeholders.

## Next Steps

- Add a stylesheet (`style.css`) and link it in each page's `<head>`.
- Add JavaScript for the booking total, calendar and room filters.
- Connect the forms to a backend or a form service.
- Replace placeholder text, prices and team details with real content.

## License

Add your preferred license here, for example [MIT](https://choosealicense.com/licenses/mit/).
