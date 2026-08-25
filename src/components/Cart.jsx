import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useCart } from '../context/CartContext';

function Cart() {
  const { cartItems, removeFromCart } = useCart();

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Cart</h2>

      {cartItems.length === 0 ? (
        <h4 className="text-center">Your cart is empty</h4>
      ) : (
        cartItems.map((item) => (
          <Card className="mb-3" key={item.title}>
            <Card.Body>
              <Row className="align-items-center">
                <Col xs={3}>
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'contain',
                    }}
                  />
                </Col>

                <Col>
                  <h5>{item.title}</h5>
                  <p className="mb-1">Price: ₹{item.price}</p>
                  <p className="mb-0">
                    Quantity: {item.quantity}
                  </p>
                </Col>

                <Col xs="auto">
                  <Button
                    variant="danger"
                    onClick={() => removeFromCart(item.title)}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
}

export default Cart;