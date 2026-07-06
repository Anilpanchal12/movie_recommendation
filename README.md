<div align="center">

# 🎬 CineScope
### A cinematic, 3D-powered movie discovery app built with Express, EJS & the TMDB API

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-black?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![EJS](https://img.shields.io/badge/EJS-6.x-B4CA65?style=for-the-badge&logo=javascript&logoColor=white)](https://ejs.co/)
[![TMDB](https://img.shields.io/badge/Powered%20by-TMDB-01D277?style=for-the-badge&logo=themoviedatabase&logoColor=white)](https://www.themoviedb.org/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=for-the-badge)](#-license)

</div>

---

## ✨ What is CineScope?

**CineScope** is a full-stack movie discovery web app that lets you browse trending, popular, top-rated, and upcoming movies, search by title or cast member, explore genres, and dive into rich movie detail pages complete with trailers, cast lists, and recommendations — all wrapped in a slick, animated 3D interface with tilt effects, parallax scrolling, and live search autocomplete.

Under the hood, it's a lightweight **Node.js + Express** server rendering **EJS** templates, fetching real-time data from **The Movie Database (TMDB) API**. No frontend framework, no build step — just clean server-side rendering with a hand-crafted, glassy, cinematic UI.

<div align="center">

| 🔥 Trending & Popular | 🔍 Smart Search | 🎭 Cast Discovery | 🎞️ Rich Movie Pages |
|:---:|:---:|:---:|:---:|
| Daily/weekly trending, top-rated & upcoming feeds | Live autocomplete dropdown with debounce | Search movies by actor/actress | Trailers, cast, and recommendations |

</div>

---

## 🗺️ How It Works

```
┌─────────────┐        ┌──────────────────┐        ┌─────────────────┐
│   Browser   │  HTTP  │   Express Server   │  HTTPS │   TMDB API      │
│  (EJS Views │◄──────►│  app.js (routes)   │◄──────►│  themoviedb.org │
│  + script.js│        │  → axios requests  │        │                 │
│  3D Engine) │        └──────────────────┘        └─────────────────┘
└─────────────┘
      ▲
      │  renders
      ▼
┌────────────────────────────────────────────┐
│ EJS Views: index · search · category ·      │
│ categories · movie · error                  │
└────────────────────────────────────────────┘
```

**Routes at a glance:**

| Route | Description |
|---|---|
| `GET /` | Home page — daily trending movies |
| `GET /search?query=&type=` | Search by movie title or cast (`type=movie|cast`) |
| `GET /api/autocomplete?q=` | JSON endpoint powering the live search dropdown |
| `GET /movie/:id` | Movie detail page — cast, trailer, recommendations |
| `GET /popular` | Popular movies feed |
| `GET /top-rated` | Top rated movies feed |
| `GET /upcoming` | Upcoming releases feed |
| `GET /trending` | Weekly trending feed |
| `GET /categories` | List of all genres |
| `GET /genre/:id` | Movies filtered by genre |

---

## 🚀 Getting Started (for users)

Want to just run the app locally and start browsing movies? Here's all you need.

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- A free [TMDB API key](https://www.themoviedb.org/settings/api)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/cinescope.git
cd cinescope

# 2. Install dependencies
npm install

# 3. Add your TMDB API key
```

Create a `.env` file in the project root (or edit `app.js` directly) with your key:

```env
TMDB_API_KEY=your_tmdb_api_key_here
```

> **🔐 Security note:** The current codebase has the TMDB API key hardcoded in `app.js`. Before deploying or pushing to a public repo, swap this out for an environment variable (e.g. using [`dotenv`](https://www.npmjs.com/package/dotenv)) so your key isn't exposed in version control.

### Run it

```bash
node app.js
```

Then open your browser to:

```
http://localhost:3000
```

<details>
<summary>⌨️ Keyboard shortcuts (click to expand)</summary>

| Key | Action |
|---|---|
| `/` | Focus the search bar |
| `H` | Jump back to the home page |

</details>

---

## 🛠️ Contributing (for developers)

Love the project and want to help make it better? Here's how to get set up for development.

### Local dev setup

```bash
# Fork, then clone your fork
git clone https://github.com/your-username/cinescope.git
cd cinescope

# Install dependencies
npm install

# Run the server (no build step needed — EJS renders server-side)
node app.js

# For auto-restart on file changes during development, consider:
npx nodemon app.js
```

### Project structure

```
├── app.js               # Express routes & TMDB API calls
├── package.json
├── views/
│   ├── index.ejs        # Home / trending page
│   ├── search.ejs        # Search results page
│   ├── category.ejs      # Popular / top-rated / upcoming / genre pages
│   ├── categories.ejs    # Genre listing page
│   ├── movie.ejs         # Movie detail page
│   └── error.ejs         # 404 / error page
└── public/
    ├── style.css         # 3D cinematic styling
    └── script.js         # Scroll effects, tilt hover, autocomplete UX
```

### Ideas for contributions

- 🔧 Move the TMDB API key to environment variables via `dotenv`
- 🧪 Add automated tests (currently there are none configured)
- 📄 Add pagination controls beyond the current `page` query param
- 🌙 Add a light/dark theme toggle
- ♿ Accessibility pass on the 3D hover/tilt effects (respect `prefers-reduced-motion`)
- 📱 Mobile responsiveness improvements for the tilt/parallax interactions

---

## 🤝 Contributor Expectations

To keep collaboration smooth, please follow these guidelines:

1. **Open an issue first** for anything beyond a trivial fix — bugs, feature requests, or design changes — so we can discuss the approach before you invest time in code.
2. **One feature/fix per pull request.** Keep PRs focused and reviewable.
3. **Write clear commit messages.** Squashed, descriptive commits are preferred over a long trail of "wip" commits.
4. **Follow existing code style.** Match the formatting and structure already used in `app.js` and the EJS views.
5. **Test before submitting.** Make sure `node app.js` runs cleanly and the affected routes/pages work as expected.
6. **Describe your changes in the PR.** Explain *what* changed and *why* — screenshots or a short GIF are welcome for UI changes.
7. **Be respectful and collaborative.** This is a space to learn and build together — constructive feedback only.

---

## 📄 License

This project is licensed under the **ISC License**.

---

<div align="center">

Made with 🎥 and a little too much CSS `transform: translateZ()`

</div>
