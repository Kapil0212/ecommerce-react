import { useState } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

const cartElements = [
  {
    title: 'Colors',
    price: 100,
    imageUrl:
      'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
    quantity: 2,
  },
  {
    title: 'Black and white Colors',
    price: 50,
    imageUrl:
      'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
    quantity: 3,
  },
  {
    title: 'Yellow and Black Colors',
    price: 70,
    imageUrl:
      'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
    quantity: 1,
  },
];

function Cart() {
  const [cartItems, setCartItems] = useState(cartElements);

  const removeItem = (title) => {
    setCartItems((items) =>
      items.filter((item) => item.title !== title)
    );
  };

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Cart</h2>

      {cartItems.map((item) => (
        <Card className="mb-3" key={item.title}>
          <Card.Body>
            <Row className="align-items-center">
              <Col xs={3}>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  style={{ width: '100px', height: '100px', objectFit: 'contain' }}
                />
              </Col>

              <Col>
                <h5>{item.title}</h5>
                <p className="mb-1">Price: ₹{item.price}</p>
                <p className="mb-0">Quantity: {item.quantity}</p>
              </Col>

              <Col xs="auto">
                <Button
                  variant="danger"
                  onClick={() => removeItem(item.title)}
                >
                  Remove
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default Cart;