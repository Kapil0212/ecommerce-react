import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Container, Card, Button, Spinner } from 'react-bootstrap';

function Films() {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [retrying, setRetrying] = useState(false);

  const retryTimeout = useRef(null);
  const cancelled = useRef(false);

  const fetchFilms = useCallback(async () => {
    setIsLoading(true);
    setError(false);
    cancelled.current = false;

    try {
      const response = await fetch(
        'https://swapi.info/api/films'
      );

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();

      setFilms(data);
      setIsLoading(false);
      setRetrying(false);
    } catch (error) {
      setIsLoading(false);
      setError(true);
      setRetrying(true);

      retryTimeout.current = setTimeout(() => {
        if (!cancelled.current) {
          fetchFilms();
        }
      }, 5000);
    }
  }, []);

  useEffect(() => {
    fetchFilms();

    return () => {
      cancelled.current = true;

      if (retryTimeout.current) {
        clearTimeout(retryTimeout.current);
      }
    };
  }, [fetchFilms]);

  const cancelRetry = () => {
    cancelled.current = true;

    if (retryTimeout.current) {
      clearTimeout(retryTimeout.current);
    }

    setRetrying(false);
    setError(false);
    setIsLoading(false);
  };

  const movieList = useMemo(() => {
    return films.map((film) => (
      <Card className="mb-3" key={film.episode_id}>
        <Card.Body>
          <Card.Title>{film.title}</Card.Title>

          <Card.Text>
            Episode: {film.episode_id}
          </Card.Text>
        </Card.Body>
      </Card>
    ));
  }, [films]);

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">
        Star Wars Films
      </h1>

      {isLoading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}

      {error && retrying && (
        <div className="text-center">
          <h4 className="text-danger">
            Something went wrong ....Retrying
          </h4>

          <p>Retrying after 5 seconds...</p>

          <Button
            variant="danger"
            onClick={cancelRetry}
          >
            Cancel Retry
          </Button>
        </div>
      )}

      {!isLoading && !error && movieList}
    </Container>
  );
}

export default Films;