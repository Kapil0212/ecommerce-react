import { useEffect, useState } from 'react';
import { Container, Card } from 'react-bootstrap';

function Films() {
  const [films, setFilms] = useState([]);

  const fetchFilms = async () => {
    const response = await fetch('https://swapi.info/api/films');

    const data = await response.json();

    setFilms(data);
  };

  useEffect(() => {
    fetchFilms();
  }, []);

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Star Wars Films</h1>

      {films.map((film) => (
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