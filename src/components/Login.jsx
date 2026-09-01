import React, { useState } from 'react';
import {
  Container,
  Form,
  Button,
  Alert,
  Spinner,
} from 'react-bootstrap';

import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

function Login() {
  const history = useHistory();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error?.message || 'Authentication failed'
        );
      }

      console.log('JWT / idToken:', data.idToken);

      // Store token in AuthContext
      login(data.idToken);

      // Store email for user-specific cart
      localStorage.setItem('email', email);

      // Redirect to Products page
      history.push('/store');

    } catch (error) {
      console.error('Login Error:', error);
      setError(error.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container
      className="py-5"
      style={{ maxWidth: '500px' }}
    >
      <h1 className="text-center mb-4">
        Login
      </h1>

      <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3">
          <Form.Label>
            Email
          </Form.Label>

          <Form.Control
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="Enter your email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            Password
          </Form.Label>

          <Form.Control
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            placeholder="Enter your password"
            required
          />
        </Form.Group>

        {error && (
          <Alert variant="danger">
            {error}
          </Alert>
        )}

        <div className="text-center">

          {isLoading ? (
            <Button disabled>
              <Spinner
                animation="border"
                size="sm"
                className="me-2"
              />
              Logging in...
            </Button>
          ) : (
            <Button type="submit">
              Login
            </Button>
          )}

        </div>

      </Form>
    </Container>
  );
}

export default Login;