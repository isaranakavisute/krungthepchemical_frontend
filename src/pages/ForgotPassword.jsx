import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function ForgotPassword() {
  const [email, setEmail] = useState(""); // Add email state

  // Function to send a reset password request
  const sendRequest = async () => {
    try {
      // Send a PUT request to your API to initiate the password reset
      await axios.put("http://localhost:3000/api/forgot", { user_email: email });;
      toast.success("Password reset request sent successfully.");
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="page-auth">
    <ToastContainer position="top-right" autoClose={3000} />
      <div className="content">
        <Container>
          <Card className="card-auth">
            <Card.Body className="text-center">
              <Card.Title>Reset your password</Card.Title>
              <Card.Text className="mb-5">
                Enter your email address, and we will send you a link to reset
                your password.
              </Card.Text>

              <Row className="g-2">
                <Col sm="8">
                  <Form.Control
                    type="email"
                    placeholder="Enter email address"
                    value={email} // Bind input value to the email state
                    onChange={(e) => setEmail(e.target.value)} // Update email state when input changes
                  />
                </Col>
                <Col sm="4">
                  <Button
                    variant="primary"
                    className="bg-black border-none hover:bg-gray-500"
                    onClick={sendRequest}
                  >
                    Reset
                  </Button>
                </Col>
                <Link to="/signin" className="text-blue-500">
                  Back to sign in
                </Link>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
}
