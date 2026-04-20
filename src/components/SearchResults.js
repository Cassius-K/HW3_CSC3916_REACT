import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

const SearchResults = () => {
    const searchResults = useSelector(state => state.movie.searchResults);
    const loading = useSelector(state => state.movie.loading); // Optional: for loading state

    if (loading) return <div>Searching...</div>;

    return (
        <Container className="mt-4">
            <h2>Search Results</h2>
            {searchResults && searchResults.length > 0 ? (
                <Row xs={1} md={2} lg={4} className="g-4">
                    {searchResults.map((movie) => (
                        <Col key={movie._id}>
                            <Card as={Link} to={`/movie/${movie._id}`} className="h-100 text-decoration-none">
                                <Card.Img variant="top" src={movie.imageUrl} style={{ height: '300px', objectFit: 'cover' }} />
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                    <Card.Text>{movie.releaseDate}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <p>No movies found. Try another search!</p>
            )}
        </Container>
    );
};

export default SearchResults;
