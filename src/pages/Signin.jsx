import { useState } from 'react';
import axios from 'axios'; // Import Axios
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function Signin() {
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
    try {
      const response = await axios.post('http://localhost:3000/api/signin', formData);
      const userID = response.data.user_id
      navigate(`/otp-verify/${userID}`);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  

  return (
    <div className="page-sign">
      <ToastContainer position="top-right" autoClose={5000} />
      <Card className="card-sign">
        <Card.Header>
          <Card.Title>Sign In</Card.Title>
          <Card.Text>Welcome back! Please sign in to continue.</Card.Text>
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
                Password <Link to="/forgot">Forgot password?</Link>
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
            <Button
              type="submit"
              className="bg-black border-none transition-all hover:bg-white hover:text-black hover:shadow"
              onClick={() => toast.success('Please wait OTP is sending.')}
            >
              Sign In
            </Button>

          </Form>
        </Card.Body>
        <Card.Footer>
          <Link to="/signup" className="text-black">Create an Account</Link>
        </Card.Footer>
      </Card>
    </div>
  );
}
