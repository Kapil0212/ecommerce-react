import { useState } from 'react';
import { Container, Row, Col, Card, Button, Navbar } from 'react-bootstrap';
import Cart from './components/Cart';

const productsArr = [
  {
    title: 'Colors',
    price: 100,
    imageUrl:
      'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
  },
  {
    title: 'Black and white Colors',
    price: 50,
    imageUrl:
      'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
  },
  {
    title: 'Yellow and Black Colors',
    price: 70,
    imageUrl:
      'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
  },
  {
    title: 'Blue Color',
    price: 100,
    imageUrl:
      'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
  },
];

function App() {
  const [showCart, setShowCart] = useState(false);

  return (
    <>
      <Navbar bg="dark" variant="dark" className="px-4">
        <Navbar.Brand>Ecommerce Store</Navbar.Brand>

        <Button
          variant="outline-light"
          className="ms-auto"
          onClick={() => setShowCart(!showCart)}
        >
          🛒 Cart
        </Button>
      </Navbar>

      {!showCart ? (
        <Container className="py-5">
          <h1 className="text-center mb-5">Products</h1>

          <Row className="g-4 justify-content-center">
            {productsArr.map((product) => (
              <Col key={product.title} xs={12} sm={6} md={4} lg={3}>
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={product.imageUrl}
                    alt={product.title}
                    className="product-image"
                  />

                  <Card.Body className="text-center">
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text className="fw-bold">
                      ₹{product.price}
                    </Card.Text>

                    <Button variant="primary">
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      ) : (
        <Cart />
      )}
    </>
  );
}

export default App;
