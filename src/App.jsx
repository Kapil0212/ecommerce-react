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

import {
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import Cart from './components/Cart';
import Films from './components/Films';
import Contact from './components/Contact';
import ProductDetails from './components/ProductDetails';

import { useCart } from './context/CartContext';

const productsArr = [
  {
    id: 'p1',
    title: 'Colors',
    price: 100,
    imageUrls: [
      'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
      'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
      'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
    ],
    reviews: [
      {
        name: 'John',
        review: 'Amazing product. Really good quality.',
        rating: 5,
      },
      {
        name: 'Sarah',
        review: 'Looks great and worth the price.',
        rating: 4,
      },
    ],
  },
  {
    id: 'p2',
    title: 'Black and white Colors',
    price: 50,
    imageUrls: [
      'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
      'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
      'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
    ],
    reviews: [
      {
        name: 'Mike',
        review: 'Good product for the price.',
        rating: 4,
      },
      {
        name: 'Emma',
        review: 'I liked the design.',
        rating: 5,
      },
    ],
  },
  {
    id: 'p3',
    title: 'Yellow and Black Colors',
    price: 70,
    imageUrls: [
      'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
      'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
      'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
    ],
    reviews: [
      {
        name: 'David',
        review: 'Nice colors and good quality.',
        rating: 5,
      },
    ],
  },
  {
    id: 'p4',
    title: 'Blue Color',
    price: 100,
    imageUrls: [
      'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
      'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
      'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
    ],
    reviews: [
      {
        name: 'Alex',
        review: 'Very good product.',
        rating: 4,
      },
    ],
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

          <NavLink
            to="/contact"
            className="text-white text-decoration-none"
          >
            Contact Us
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
          <h1 className="text-center mb-5">
            Products
          </h1>

          <Row className="g-4 justify-content-center">

            {productsArr.map((product) => (
              <Col
                key={product.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
              >
                <Card className="h-100 shadow-sm">

                  <NavLink
                    to={`/product/${product.id}`}
                    style={{
                      textDecoration: 'none',
                      color: 'black',
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={product.imageUrls[0]}
                      alt={product.title}
                      className="product-image"
                    />

                    <Card.Title className="text-center mt-3">
                      {product.title}
                    </Card.Title>
                  </NavLink>

                  <Card.Body className="text-center">

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
    <Switch>

      <Route path="/about">
        <About />
      </Route>

      <Route path="/contact">
        <Contact />
      </Route>

      <Route path="/films">
        <Films />
      </Route>

      {/* Dynamic Product Route */}
      <Route path="/product/:productId">
        <ProductDetails />
      </Route>

      <Route path="/store">
        <Store />
      </Route>

      <Route path="/">
        <Home />
      </Route>

    </Switch>
  );
}

export default App;