import React, { useState } from 'react';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from "../actions/authActions";
import { searchMovies } from "../actions/movieActions";

function MovieHeader() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedIn = useSelector((state) => state.auth.loggedIn);
    const selectedMovie = useSelector((state) => state.movie.selectedMovie);

    // State for the search input
    const [searchTerm, setSearchTerm] = useState("");

    const logout = () => {
        dispatch(logoutUser());
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            dispatch(searchMovies(searchTerm.trim()));
            navigate('/search');
        }
    };

    return (
        <div>
            <Navbar expand="lg" bg="dark" variant="dark">
                <Navbar.Brand as={NavLink} to="/">Movie App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/movielist" disabled={!loggedIn}>
                            Movie List
                        </Nav.Link>
                        <Nav.Link as={NavLink} to={'/movie/' + (selectedMovie ? selectedMovie._id : '')} disabled={!loggedIn || !selectedMovie}>
                            Movie Detail
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/signin">
                            {loggedIn ? (
                                <span onClick={logout} style={{ cursor: 'pointer' }}>
                                    Logout
                                </span>
                            ) : (
                                'Login'
                            )}
                        </Nav.Link>
                    </Nav>

                    {loggedIn && (
                        <Form className="d-flex" onSubmit={handleSearch}>
                            <Form.Control
                                type="search"
                                placeholder="Search Movies or Actors"
                                className="me-2"
                                aria-label="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Button variant="outline-success" type="submit">Search</Button>
                        </Form>
                    )}
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default MovieHeader;
