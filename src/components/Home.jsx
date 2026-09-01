import { Container, Button, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const tours = [
  {
    date: 'JUL 16',
    location: 'DETROIT, MI',
    venue: 'DTE ENERGY MUSIC THEATRE',
  },
  {
    date: 'JUL 19',
    location: 'TORONTO, ON',
    venue: 'BUDWEISER STAGE',
  },
  {
    date: 'JUL 22',
    location: 'BRISTOW, VA',
    venue: 'JIGGY LUBE LIVE',
  },
  {
    date: 'JUL 29',
    location: 'PHOENIX, AZ',
    venue: 'AK-CHIN PAVILION',
  },
  {
    date: 'AUG 2',
    location: 'LAS VEGAS, NV',
    venue: 'T-MOBILE ARENA',
  },
];

function Home() {
  return (
    <>
      <Navbar bg="dark" variant="dark" className="justify-content-center">
        <div className="d-flex gap-5">
          <NavLink to="/" className="nav-link text-white">
            HOME
          </NavLink>

          <NavLink to="/store" className="nav-link text-white">
            STORE
          </NavLink>

          <NavLink to="/about" className="nav-link text-white">
            ABOUT
          </NavLink>
          <NavLink to="/login" className="nav-link text-white">
           LOGIN
         </NavLink>
        </div>
      </Navbar>

      <section className="home-hero">
        <h1>The Generics</h1>

        <Button variant="outline-light" size="lg">
          Get our Latest Album
        </Button>

        <button className="play-button">▶</button>
      </section>

      <Container className="tours-section">
        <h2>TOURS</h2>

        <div className="tours-list">
          {tours.map((tour) => (
            <div className="tour-row" key={tour.date}>
              <span>{tour.date}</span>
              <span>{tour.location}</span>
              <span>{tour.venue}</span>

              <Button variant="info" className="ticket-button">
                BUY TICKETS
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}

export default Home;