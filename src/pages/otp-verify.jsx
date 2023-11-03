import { useState } from 'react';
import axios from 'axios'; // Import Axios
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { login } from '../redux/auth/auth.actions';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function OtpVerify() {

  const { user_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    otp: '',
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
      const response = await axios.post('http://localhost:3000/api/verify-otp', {
        ...formData,
        user_id: user_id,
      });
      toast.success('Login succesful!');
      dispatch(login({ user_id: response.data.user_id, permission: response.data.permission }));
      navigate('/');
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };

  const handleResendOTP = async () => {
    try {
      await axios.post('http://localhost:3000/api/otp-resend', { user_id });
      toast.success('OTP has been resent to your email.');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="page-sign">
      <ToastContainer position="top-right" autoClose={3000} />
      <Card className="card-sign">
        <Card.Header>
          <Link to="/" className="header-logo mb-4"><img src="https://jpthinkofus.com/fiat/sandbox3/logo_poly.png"
            className="h-24 mx-auto" alt="Logo" /></Link>
          <Card.Title>OTP Verification</Card.Title>
          <Card.Text>OTP have sent to your email.</Card.Text>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}> {/* Use onSubmit to handle form submission */}
            <div className="mb-4">
              <Form.Label>OTP</Form.Label>
              <Form.Control
                type="text"
                name="otp"
                placeholder="Enter your OTP that sent to your email."
                value={formData.otp}  // Changed from formData.email to formData.otp
                onChange={handleInputChange}
                required
              />
            </div>
            <div className='flex gap-2'>
              <Button className="bg-gray-500 border-none transition-all hover:bg-white hover:text-[#2e3192]" onClick={handleResendOTP}>
                Resend OTP
              </Button>
              <Button type="submit" className="bg-[#2e3192] border-none transition-all hover:bg-white hover:text-[#2e3192]">
                Verify
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
