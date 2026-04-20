import './App.css';
import MovieHeader from './components/movieheader';
import MovieList from './components/movielist';
import Movie from './components/movie';
import Authentication from './components/authentication';
import {HashRouter, Routes,  Route} from 'react-router-dom';
import SearchResults from './components/SearchResults';
import SearchBox from './components/SearchBox';

function App() {
  return (
    <div className="App">
      <HashRouter> {/* The Router component */}
        <MovieHeader />
        <div style ={{ minheight: '90vh'}}>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movielist" element={<MovieList />}/>
          <Route path="/movie/:movieId" element={<Movie />}/>
          <Route path="/signin" element={<Authentication />}/>
          <Route path="/search" element={<SearchResults />} />
          {/*... other routes */}
        </Routes>
       </div>
       <SearchBox />
      </HashRouter>
    </div>
  );
}

export default App;
