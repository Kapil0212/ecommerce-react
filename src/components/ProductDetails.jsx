import { Container, Row, Col, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

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

function ProductDetails() {
  const { productId } = useParams();

  const product = productsArr.find(
    (item) => item.id === productId
  );

  if (!product) {
    return (
      <Container className="py-5 text-center">
        <h2>Product not found</h2>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row>
        <Col md={6}>
          <div className="d-flex gap-3 flex-wrap">
            {product.imageUrls.map((image) => (
              <img
                key={image}
                src={image}
                alt={product.title}
                style={{
                  width: '180px',
                  height: '180px',
                  objectFit: 'contain',
                }}
              />
            ))}
          </div>
        </Col>

        <Col md={6}>
          <h1>{product.title}</h1>
          <h3>₹{product.price}</h3>
        </Col>
      </Row>

      <hr className="my-5" />

      <h2 className="mb-4">Reviews</h2>

      <Row>
        {product.reviews.map((review) => (
          <Col md={6} key={review.name}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>{review.name}</Card.Title>

                <Card.Text>
                  {review.review}
                </Card.Text>

                <Card.Text>
                  Rating: {review.rating}/5
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProductDetails;