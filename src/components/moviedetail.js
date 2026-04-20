import React, { useEffect, useState } from 'react';
import { submitReview, fetchMovie } from '../actions/movieActions';
import { useDispatch, useSelector } from 'react-redux';
import { Card, ListGroup, ListGroupItem, Image, Form, Button } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
  const dispatch = useDispatch();
  const { movieId } = useParams(); 
  
  const selectedMovie = useSelector(state => state.movie.selectedMovie);
  const loading = useSelector(state => state.movie.loading); 
  const error = useSelector(state => state.movie.error); 
  //State for the review form
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    if (movieId) {
      dispatch(fetchMovie(movieId));
    }
  }, [dispatch, movieId]);

  //Handler for submitting the form
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    dispatch(submitReview({ movieId, rating, reviewText }));
    setSubmitMessage("Review submitted successfully!");
    setReviewText("");
    setRating(5);
    setTimeout(() => setSubmitMessage(""), 3000);
  };

  if (loading) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!selectedMovie) {
    return <div>No movie data available.</div>;
  }

  return (
    <Card className="bg-dark text-dark p-4 rounded">
      <Card.Header>Movie Detail</Card.Header>
      
      <Card.Body>
        {/* Added safety check in case imageUrl is missing */}
        {selectedMovie.imageUrl && (
            <Image className="image" src={selectedMovie.imageUrl} thumbnail />
        )}
      </Card.Body>

      <ListGroup>
        <ListGroupItem>{selectedMovie.title}</ListGroupItem>
        
        <ListGroupItem>
          {}
          {selectedMovie.actors?.map((actor, i) => (
            <p key={i}>
              <b>{actor.actorName}</b> as {actor.characterName}
            </p>
          ))}
        </ListGroupItem>

        <ListGroupItem>
          <h4>
            {/* Added fallback in case avgRating is null/undefined */}
            <BsStarFill /> {selectedMovie.avgRating ? selectedMovie.avgRating.toFixed(1) : 'No Rating'}
          </h4>
        </ListGroupItem>
      </ListGroup>

        <Card.Body className="card-body bg-white">
        <h3>Reviews</h3>
        {}
        {selectedMovie.reviews && selectedMovie.reviews.length > 0 ? (
          selectedMovie.reviews.map((review, i) => (
            <p key={i}>
              <b>{review.username}</b>&nbsp; {review.review} &nbsp; <BsStarFill />{' '}
              {review.rating}
            </p>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </Card.Body>

      {/* Review Submission Form */}
      <Card.Body className="card-body bg-light text-dark mt-3 rounded">
        <h3>Leave a Review</h3>
        {submitMessage && <p className="text-success">{submitMessage}</p>}
        <Form onSubmit={handleReviewSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Rating</Form.Label>
                <Form.Control 
                    type="number" 
                    min="1" max="5" 
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    required 
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Comment</Form.Label>
                <Form.Control 
                    as="textarea"
                    rows={3}
                    placeholder="What did you think?"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit Review
            </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default MovieDetail;
