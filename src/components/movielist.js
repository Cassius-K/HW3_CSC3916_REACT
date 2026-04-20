import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, setMovie } from "../actions/movieActions";
import { Link } from 'react-router-dom';
import { Image, Nav, Carousel } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';

function MovieList() {
    const dispatch = useDispatch();
    const movies = useSelector(state => state.movie.movies);

    // Memoize the movies array
    const memoizedMovies = useMemo(() => {
        return movies;
    }, [movies]);

    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);

    const handleSelect = (selectedIndex) => {
        // Use memoizedMovies here
        dispatch(setMovie(memoizedMovies[selectedIndex]));
    };

    const handleClick = (movie) => {
        dispatch(setMovie(movie));
    };

    if (!memoizedMovies) { // Use memoizedMovies here
        return <div>Loading....</div>;
    }

    return (
        <Carousel onSelect={handleSelect} className="bg-dark text-light p-4 rounded">
          {memoizedMovies.map((movie) => (
            <Carousel.Item key={movie._id}>
              <Nav.Link
                as={Link}
                to={`/movie/${movie._id}`}
                onClick={() => handleClick(movie)}
              >
                {}
                <div style={{ height: '500px', backgroundColor: '#222', display: 'flex' }}>
                    <img 
                        className="d-block w-100" 
                        src={movie.imageUrl} 
                        alt={movie.title} 
                        style={{ 
                            maxHeight: '100%', 
                            objectFit: 'contain' 
                        }} 
                    />
                </div>
              </Nav.Link>
              
              {}
              <Carousel.Caption style={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.75)', 
                  borderRadius: '10px',
                  padding: '10px',
                  marginBottom: '20px' 
              }}>
                <h3>{movie.title}</h3>
                <p>
                    {}
                    <BsStarFill className="text-warning" /> {movie.avgRating ? movie.avgRating.toFixed(1) : 'N/A'} &nbsp;&nbsp;|&nbsp;&nbsp; {movie.releaseDate}
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      );
}
export default MovieList;
