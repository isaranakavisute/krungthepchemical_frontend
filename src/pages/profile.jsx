/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import OptionBar from '../components/option-bar';
import MiniHeader from '../components/mini-header';
import Contact from '../components/contact';
import Footer from '../components/footer';
import BurgerNav from '../components/burger-bar';
import { useNavigate } from 'react-router-dom';


const ProfilePage = () => {
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const user_id = useSelector((state) => state.auth.currentUser?.user_id);
  const [userOrders, setUserOrders] = useState([]);
  const [currentOrderDetails, setCurrentOrderDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenOrderDetail = async (order) => {
    setCurrentOrderDetails(order);
    try {
      const response = await axios.get(`http://localhost:3000/api/order-details/${order.order_id}`);
      setOrderItems(response.data);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
    setShowModal(true);
  };


  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/user-orders/${user_id}`);
        setUserOrders(response.data);
      } catch (error) {
        console.error("Error fetching user orders:", error);
        // Handle the error here.
      }
    };

    fetchUserOrders();
  }, [user_id]);

  useEffect(() => {
    getUserData();
  }, [user_id]);

  const getUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/user-profile/${user_id}`);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle the error here.
    }
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };

  const handleEditModalOpen = () => {
    setShowEditModal(true);
  };

  const handleSave = () => {
    // Implement the logic to save the edited user data to the backend.
    setIsEditing(false);
    handleEditModalClose();
  };

  const toPay = () => {
    navigate('/payment')
  }

  return (
    <>
      <MiniHeader />
      <div className="sticky top-0 z-50">
        <OptionBar />
        <BurgerNav />
      </div>
      <Container>
        <Row className="my-12">
          <Col>
            <Card className='mb-8'>
              <Card.Header>
                <h3 className='text-xl font-bold'>User Profile</h3>
              </Card.Header>
              <Card.Body>
                <div>
                  <p className='py-4 text-base'>
                    <strong>Full Name:</strong> {userData.full_name}
                  </p>
                  <p className='py-4 text-base'>
                    <strong>Email:</strong> {userData.email}
                  </p>
                  <p className='py-4 text-base'>
                    <strong>Full name:</strong> {userData.full_name}
                  </p>
                  <p className='py-4 text-base'>
                    <strong>Phone:</strong> {userData.phone}
                  </p>
                  <p className='py-4 text-base'>
                    <strong>Address:</strong> {userData.address}
                  </p>

                </div>
                <Button variant="secondary" className='bg-gray-500' onClick={handleEditModalOpen}>
                  Edit Profile
                </Button>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>
                <h3 className='text-xl font-bold'>My Order</h3>
              </Card.Header>
              <Card.Body>
                <div>
                  {userOrders.length ? (
                    userOrders.map(order => (
                      <div className='my-4' key={order.order_id}>
                        <p><strong>Order ID:</strong> {order.order_id}</p>
                        <p><strong>Date:</strong> {new Date(order.order_date).toLocaleDateString()}</p>
                        <p><strong>Total Price:</strong> {parseInt(order.total_price).toLocaleString()} ฿</p>
                        <p><strong>Tracking:</strong> {order.tracking}</p>
                        <p className='mb-2'><strong>Status:</strong> {order.order_status}</p>
                        <Button onClick={() => handleOpenOrderDetail(order)} variant="secondary" className='bg-gray-500 mb-4'>Detail</Button>
                        <hr />
                      </div>
                    ))
                  ) : (
                    <p>You have no orders.</p>
                  )}
                </div>
                <Button variant="primary" className='bg-blue-500' onClick={toPay}>
                  GO TO PAYMENT
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Modal show={showEditModal} onHide={handleEditModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Full Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={userData.full_name}
                  onChange={(e) => setUserData({ ...userData, full_name: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Phone:</Form.Label>
                <Form.Control
                  type="text"
                  value={userData.phone}
                  onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address:</Form.Label>
                <Form.Control
                  as="textarea"
                  value={userData.address}
                  onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                />
              </Form.Group>
              {/* Add more Form.Group elements for other user data fields */}
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" className='bg-gray-500' onClick={handleEditModalClose}>
              Close
            </Button>
            <Button variant="primary" className='bg-blue-500' onClick={handleSave}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Order Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul className="space-y-4">
              {orderItems.map(detail => (
                <li key={detail.order_detail_id} className="border-b pb-4">
                  <div className="flex items-center space-x-4 mb-2">
                    <img
                      src={`https://www.krungthepchemi.com/uploads/products/${detail.product_img1}`}
                      alt={detail.product_name}
                      className="w-20 h-20 object-cover"
                    />
                  </div>
                  <p><strong>{detail.product_name}</strong> </p>
                  <p>{parseInt(detail.unit_price).toLocaleString()} ฿</p>
                </li>
              ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className="bg-gray-300 hover:bg-gray-400 text-black" onClick={() => setShowModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

      </Container>
      <Contact />
      <Footer />
    </>
  );
};

export default ProfilePage;
