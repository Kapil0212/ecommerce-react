import { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Navbar,
  Badge,
} from 'react-bootstrap';
import { Routes, Route, NavLink } from 'react-router-dom';

import Cart from './components/Cart';
import { useCart } from './context/CartContext';
import About from './components/About';

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

function Store() {
  const { addToCart, cartItemCount } = useCart();
  const [showCart, setShowCart] = useState(false);

  return (
    <>
      <Navbar bg="dark" variant="dark" className="px-4">
        <Navbar.Brand>Ecommerce Store</Navbar.Brand>

        <div className="d-flex align-items-center gap-3 ms-auto">
          <NavLink
            to="/"
            className="text-white text-decoration-none"
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className="text-white text-decoration-none"
          >
            About
          </NavLink>

          <Button
            variant="outline-light"
            onClick={() => setShowCart(!showCart)}
          >
            🛒 Cart <Badge bg="danger">{cartItemCount}</Badge>
          </Button>
        </div>
      </Navbar>

      {showCart ? (
        <Cart />
      ) : (
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

                    <Button
                      variant="primary"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Store />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;