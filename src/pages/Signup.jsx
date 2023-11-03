/* eslint-disable no-undef */
import { useState } from 'react';
import axios from 'axios';
import { Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullname: '',
    phone: '',
  });

  // Define a state variable to store success or error messages

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
    
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    // Send a POST request to your server for user registration
    try {
      await axios.post('http://localhost:3000/api/signup', formData);
  
         toast.success('Account created successfully!');
        navigate('/signin');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="page-sign">
    <ToastContainer position="top-right" autoClose={3000} />
      <Card className="card-sign">
        <Card.Header>
          <Card.Title>Sign Up</Card.Title>
          <Card.Text>Free to signup and only takes a minute.</Card.Text>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <div className="mb-3">
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
            <div className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                minLength="8"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>


            <div className="mb-3">
              <Form.Label>Full name</Form.Label>
              <Form.Control
                type="text"
                name="fullname"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <small>By clicking <strong>Create Account</strong> below, you agree to our terms of service and privacy statement.</small>
            </div>
            <Button variant="primary" className="btn-sign border-none bg-black" type="submit">Create Account</Button>
          </Form>
        </Card.Body>
        <Card.Footer>
          Already have an account? <Link to="/signin" className='text-black'>Sign In</Link>
        </Card.Footer>
      </Card>
    </div>
  );
}
