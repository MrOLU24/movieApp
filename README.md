This React app is a movie search and trending movie display application. Here’s how it works:

# 1. State Management:
searchValue: Stores the user's search input.
errorMessage: Stores any error messages.
movies: Stores the list of movies fetched from the API.
isLoading: Manages the loading state.
debounceSearchvalue: Stores a debounced version of searchValue (waits for 500ms before updating).
trendingMovies: Stores trending movies.

# 2. Debounced Search Handling:
The useDebounce hook waits for 500ms after the user stops typing before setting debounceSearchvalue.
This prevents too many API requests when a user is typing rapidly.

# 3. Fetching Movies (fetchMovies function):
Calls The Movie Database (TMDB) API to search for movies based on debounceSearchvalue.
If no query is provided, it fetches popular movies.
Updates state based on the API response.
If a search query is successful, it updates search statistics using updateSearchCount.

# 4. Fetching Trending Movies (LoadTrendingMovies function):
Calls getTrendingMovies (imported from appwrite).
Stores the fetched trending movies in trendingMovies.
# 5. useEffect Hooks for API Calls:
The first useEffect runs fetchMovies whenever debounceSearchvalue changes.
The second useEffect runs LoadTrendingMovies once when the component mounts.

# 6. Rendering Components:
Header: Displays a title and search bar (Search component).
Trending Movies Section: Shows a list of trending movies if available.
# All Movies Section:
Shows a loading spinner while fetching.
Displays an error message if fetching fails.
Renders a list of movies using the MovieCard component.

# 7. Environment Variables:
The TMDB API key is stored in import.meta.env.VITE_TMDB_API_KEY for security.
This setup ensures efficient API calls, smooth search experience, and proper UI updates while managing errors and loading states effectively. 🚀

# @2025 MrOLU 