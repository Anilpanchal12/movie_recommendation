import express from "express";
import axios from "axios";
import env from "dotenv";

const app = express();
const PORT = 3000;

const API_KEY =  process.env.API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


// ==========================
// HOME PAGE
// Trending Movies
// ==========================
app.get("/", async (req, res) => {
    try {
        const page = req.query.page || 1;
        const response = await axios.get(`${BASE_URL}/trending/movie/day`, {
            params: { api_key: API_KEY, page }
        });
        res.render("index", {
            movies: response.data.results,
            page: response.data.page,
            totalPages: response.data.total_pages,
            endpoint: "/"
        });
    } catch (err) {
        console.log(err.message);
        res.render("index", { movies: [], page: 1, totalPages: 1, endpoint: "/" });
    }
});


// ==========================
// SEARCH MOVIES
// ==========================
app.get("/search", async (req, res) => {
    try {
        const query = req.query.query;
        const type = req.query.type || 'movie';
        const page = req.query.page || 1;
        
        let movies = [];
        let totalPages = 1;

        if (type === 'cast') {
            const personRes = await axios.get(`${BASE_URL}/search/person`, {
                params: { api_key: API_KEY, query, page: 1 }
            });
            if (personRes.data.results.length > 0) {
                const personId = personRes.data.results[0].id;
                const movieRes = await axios.get(`${BASE_URL}/discover/movie`, {
                    params: { api_key: API_KEY, with_cast: personId, page }
                });
                movies = movieRes.data.results;
                totalPages = movieRes.data.total_pages;
            }
        } else {
            const response = await axios.get(`${BASE_URL}/search/movie`, {
                params: { api_key: API_KEY, query, page }
            });
            movies = response.data.results;
            totalPages = response.data.total_pages;
        }

        res.render("search", {
            movies: movies,
            query,
            type,
            page: type === 'cast' ? page : (req.query.page || 1),
            totalPages: totalPages
        });
    } catch (err) {
        console.log(err.message);
        res.render("search", { movies: [], query: "", type: "movie", page: 1, totalPages: 1 });
    }
});

// ==========================
// SEARCH AUTOCOMPLETE API
// ==========================
app.get("/api/autocomplete", async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.json([]);
        }
        const response = await axios.get(`${BASE_URL}/search/movie`, {
            params: { api_key: API_KEY, query, page: 1 }
        });
        
        // Return only the top 5 results to keep the payload light
        const results = response.data.results.slice(0, 5).map(movie => ({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            release_date: movie.release_date ? movie.release_date.split('-')[0] : ''
        }));
        
        res.json(results);
    } catch (err) {
        res.json([]);
    }
});

// ==========================
// MOVIE DETAILS
// ==========================
app.get("/movie/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const [movie, credits, videos, recommendations] = await Promise.all([
            axios.get(`${BASE_URL}/movie/${id}`, { params: { api_key: API_KEY } }),
            axios.get(`${BASE_URL}/movie/${id}/credits`, { params: { api_key: API_KEY } }),
            axios.get(`${BASE_URL}/movie/${id}/videos`, { params: { api_key: API_KEY } }),
            axios.get(`${BASE_URL}/movie/${id}/recommendations`, { params: { api_key: API_KEY } })
        ]);

        const trailer = videos.data.results.find(
            video => video.site === "YouTube" && video.type === "Trailer"
        );

        res.render("movie", {
            movie: movie.data,
            cast: credits.data.cast.slice(0, 10),
            trailer,
            recommendations: recommendations.data.results
        });
    } catch (err) {
        console.log(err.message);
        res.render("error");
    }
});


// ==========================
// POPULAR MOVIES
// ==========================
app.get("/popular", async (req, res) => {
    try {
        const page = req.query.page || 1;
        const response = await axios.get(`${BASE_URL}/movie/popular`, {
            params: { api_key: API_KEY, page }
        });
        res.render("category", {
            title: "Popular Movies",
            movies: response.data.results,
            page: response.data.page,
            totalPages: response.data.total_pages,
            endpoint: "/popular"
        });
    } catch (err) {
        res.render("error");
    }
});



// ==========================
// TOP RATED
// ==========================
app.get("/top-rated", async (req, res) => {
    try {
        const page = req.query.page || 1;
        const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
            params: { api_key: API_KEY, page }
        });
        res.render("category", {
            title: "Top Rated Movies",
            movies: response.data.results,
            page: response.data.page,
            totalPages: response.data.total_pages,
            endpoint: "/top-rated"
        });
    } catch {
        res.render("error");
    }
});


// ==========================
// UPCOMING
// ==========================
app.get("/upcoming", async (req, res) => {
    try {
        const page = req.query.page || 1;
        const response = await axios.get(`${BASE_URL}/movie/upcoming`, {
            params: { api_key: API_KEY, page }
        });
        res.render("category", {
            title: "Upcoming Movies",
            movies: response.data.results,
            page: response.data.page,
            totalPages: response.data.total_pages,
            endpoint: "/upcoming"
        });
    } catch {
        res.render("error");
    }
});


// ==========================
// TRENDING
// ==========================
app.get("/trending", async (req, res) => {
    try {
        const page = req.query.page || 1;
        const response = await axios.get(`${BASE_URL}/trending/movie/week`, {
            params: { api_key: API_KEY, page }
        });
        res.render("category", {
            title: "Trending Movies",
            movies: response.data.results,
            page: response.data.page,
            totalPages: response.data.total_pages,
            endpoint: "/trending"
        });
    } catch {
        res.render("error");
    }
});

// ==========================
// CATEGORIES (GENRES)
// ==========================
app.get("/categories", async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
            params: { api_key: API_KEY }
        });
        res.render("categories", {
            genres: response.data.genres
        });
    } catch {
        res.render("error");
    }
});


// ==========================
// GENRE
// ==========================
app.get("/genre/:id", async (req, res) => {
    try {
        const page = req.query.page || 1;
        
        const [movieRes, genreRes] = await Promise.all([
            axios.get(`${BASE_URL}/discover/movie`, {
                params: { api_key: API_KEY, with_genres: req.params.id, page }
            }),
            axios.get(`${BASE_URL}/genre/movie/list`, {
                params: { api_key: API_KEY }
            })
        ]);
        
        const genres = genreRes.data.genres;
        const currentGenre = genres.find(g => g.id.toString() === req.params.id);
        const genreName = currentGenre ? currentGenre.name : "Category";

        res.render("category", {
            title: `${genreName} Movies`,
            movies: movieRes.data.results,
            page: movieRes.data.page,
            totalPages: movieRes.data.total_pages,
            endpoint: `/genre/${req.params.id}`
        });
    } catch {
        res.render("error");
    }
});


// ==========================
// ERROR PAGE
// ==========================
app.use((req, res) => {
    res.status(404).render("error");
});


// ==========================
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
