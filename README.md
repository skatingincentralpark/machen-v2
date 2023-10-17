# MachenV2 📝

This is a WIP remake of [MachenV1](https://machen.vercel.app/calendar). MachenV2 is an accessible daily note-taking web app using lexical as the text editor. You can navigate and use the app using the keyboard. Notes are saved in local storage.

## Features

- The user should be able to navigate between different months and years.
- The user should be able to use the editor to create new notes and saving it should highlight the day on the calendar.
- The user should be able to delete notes.
- All UI should remain aligned within the grid and maintain correct stacking context.
- All UI should be fully accessible: fully navigable via keyboard, focus should be trapped in modals and dialogs, correct semantics and WAI-ARIA recommendations.
- Initial load should be quick. Heavy Editor Component will be lazy loaded when user clicks a day cell.
- Editor should be responsive, working seemlessly on mobile.
- Tested with React Testing Library to ensure correct behaviour according to expectations.

## Motivation

- Improve knowledge on working with dates
- Improve knowledge on accessibility and testing

## Development

Clone repo, install packages and start server:

```bash
git clone https://github.com/skatingincentralpark/machen-v2.git
cd machen-v2
pnpm i
pnpm dev
```

Create and run production build:

```bash
pnpm build
pnpm start
```

## Tests

```bash
# To run RTL tests, do the commands below:
pnpm test
```

![Kermit Typing](https://media0.giphy.com/media/XIqCQx02E1U9W/giphy.gif?cid=6c09b952xqp5p0ph285llvqmy3l1crz9l2ubkizzg0v5q5q5&ep=v1_gifs_search&rid=giphy.gif&ct=g)
