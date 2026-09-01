import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const DATABASE_URL =
  'https://ecommerce-react-d299b-default-rtdb.firebaseio.com/contact';

function Contact() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${DATABASE_URL}.json`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      alert('Contact details submitted successfully');

      setUser({
        name: '',
        email: '',
        phone: '',
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: '600px' }}>
      <h1 className="text-center mb-4">Contact Us</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Contact;