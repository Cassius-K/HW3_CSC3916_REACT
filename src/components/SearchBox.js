import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovies } from "../actions/movieActions";

function MovieSearchBottom() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            dispatch(searchMovies(searchTerm.trim()));
            navigate('/search');
        }
    };

    if (!loggedIn) return null;

    return (
        <div style={{ backgroundColor: '#f8f9fa', padding: '40px 0', borderTop: '1px solid #dee2e6' }}>
            <Container className="d-flex flex-column align-items-center">
                <h3 className="mb-3">Find Your Next Movie</h3>
                <Form className="d-flex" style={{ width: '100%', maxWidth: '600px' }} onSubmit={handleSearch}>
                    <Form.Control
                        type="search"
                        placeholder="Search by Movie Title or Actor Name..."
                        className="me-2 p-3"
                        style={{ fontSize: '1.2rem' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button variant="success" type="submit" style={{ width: '150px' }}>
                        Search
                    </Button>
                </Form>
            </Container>
        </div>
    );
}

export default MovieSearchBottom;
