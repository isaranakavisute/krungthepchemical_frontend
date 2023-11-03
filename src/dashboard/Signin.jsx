import { useState } from 'react';
import axios from 'axios'; // Import Axios
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/auth/auth.actions';

export default function AdminPageSignin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Send a POST request to your API with the form data
    try {
      const response = await axios.post('/api/admin-signin', formData);
      toast.success('Login succesfull!');
      dispatch(login({ user_id: response.data.user_id }));
      navigate('/admin/dashboard/sales');
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };

  return (
    <div className="page-sign">
    <ToastContainer position="top-right" autoClose={3000} />
      <Card className="card-sign">
        <Card.Header>
        <img src="https://jpthinkofus.com/fiat/sandbox3/logo_poly.png"
          className="h-24" alt="Logo" />
          <Card.Title>Admin Dashboard</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}> {/* Use onSubmit to handle form submission */}
            <div className="mb-4">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="text"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <Form.Label className="d-flex justify-content-between">
                Password
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit" className="bg-black border-none transition-all hover:bg-white hover:text-black hover:shadow">
              Sign In
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer>
        </Card.Footer>
      </Card>
    </div>
  );
}
