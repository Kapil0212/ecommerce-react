import { useState } from 'react';
import { Container, Card, Button, Spinner } from 'react-bootstrap';

function Films() {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFilms = async () => {
    setIsLoading(true);

    const response = await fetch('https://swapi.info/api/films');

    const data = await response.json();

    setFilms(data);
    setIsLoading(false);
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Star Wars Films</h1>

      <div className="text-center mb-4">
        <Button onClick={fetchFilms}>
          Get Films
        </Button>
      </div>

      {isLoading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}

      {!isLoading &&
        films.map((film) => (
          <Card className="mb-3" key={film.episode_id}>
            <Card.Body>
              <Card.Title>{film.title}</Card.Title>
              <Card.Text>
                Episode: {film.episode_id}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
    </Container>
  );
}

export default Films;