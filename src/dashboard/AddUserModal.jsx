/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';
import { Button, Form, Modal } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddUserModal({ show, onClose, refetch }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullname: '',
    phone: '',
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
    
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    // Send a POST request to your server for user registration
    try {
      await axios.post('http://localhost:3000/api/signup', formData);
      toast.success('Account created successfully!');
      onClose();
      refetch();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
          <Modal.Title>
            Create User
          </Modal.Title>
        </Modal.Header>
          <Modal.Body>
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
            <Button variant="primary" className="btn-sign border-none bg-black" type="submit">Create User</Button>
          </Form>
          </Modal.Body>
          <Modal.Footer>
<Button variant="secondary" className='bg-gray-500' onClick={onClose}>Close</Button>
</Modal.Footer>
      </Modal>
    </>
  );
}
