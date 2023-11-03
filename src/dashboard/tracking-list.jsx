/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DefaultPagination } from "../components/pagination";
const ITEMS_PER_PAGE = 10;
export default function TrackingUpdate() {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTracking, setCurrentTracking] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastBlog = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstBlog = indexOfLastBlog - ITEMS_PER_PAGE;
  const currentBlogs = orders.slice(indexOfFirstBlog, indexOfLastBlog);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  
  const [searchQuery, setSearchQuery] = useState("");
    const filterBlogs = () => {
        if (!searchQuery) {
            return currentBlogs; // Return all blogs if no search query
        }
    
        // Use filter to search by position or any other criteria
        return orders.filter((user) => {
    
            const full_name = user.full_name.toLowerCase();
            const admin_id = String(user.admin_id); // Convert pay_id to a string
            const phone = String(user.phone); // Convert pay_id to a string
            const query = searchQuery.toLowerCase();
            return full_name.includes(query) || admin_id.includes(query)|| phone.includes(query);
        });
    };

    const handleSearchInputChange = (e) => {
      setSearchQuery(e.target.value);
  };


  const getOrder = () => {
     axios.get('http://localhost:3000/api/Approvedorders')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error("Error fetching orders:", error);
      });
  }

  const handleOpenModal = (order) => {
    setCurrentTracking(order.tracking);
    setSelectedOrder(order);
    setShowModal(true);
  }

const handleModalClose = () => {
    setShowModal(false);
    setSelectedOrder(null);
  }
  
  const handleUpdateTracking = () => {
    if (selectedOrder) {
      // Assuming you have an API endpoint to update tracking
      axios.put(`http://localhost:3000/api/UpdateOrder/${selectedOrder.order_id}`, {
        tracking: currentTracking
      })
      .then(response => {
        toast.success("Tracking updated successfully!");
        getOrder();
        setCurrentTracking('')
        setShowModal(false);

      })
      .catch(error => {
        toast.error("Error updating tracking.");
      });
    }
  }
  
  useEffect(() => {
    // Assuming there's an API endpoint to fetch the orders
    getOrder();
  }, []);


  return (
    <React.Fragment>
      <Header />
      <ToastContainer />

      <div className="main main-app p-3 p-lg-4">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <ol className="breadcrumb fs-sm mb-1">
              <li className="breadcrumb-item"><Link to="#">Dashboard</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Tracking Update</li>
            </ol>
            <h4 className="main-title mb-0">Tracking Update</h4>
          </div>
        </div>
        <div className="form-search me-auto mb-4">
                <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    />
        <i className="ri-search-line"></i>
      </div>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Tracking Number</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.map((order) => (
              <tr key = {order.order_id}>
            <td>{order.order_id}</td>
            <td>{order.full_name}</td>
            <td>{order.phone}</td>
            <td>{order.shipping_address}</td>
            <td>{order.tracking}</td>
           <td className="flex justify-center">
           <Button 
          variant="info"
          className="bg-cyan-300"
          onClick={() => handleOpenModal(order)}
        >
      Update Tracking
    </Button>
</td>
          </tr>
            ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleModalClose}>
  <Modal.Header closeButton>
    <Modal.Title>Update Tracking Number</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <input
      type="text"
      className="form-control"
      placeholder="Enter Tracking Number"
      defaultValue={selectedOrder && selectedOrder.tracking}
      onChange={(e) => setCurrentTracking(e.target.value)}
    />
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" className='bg-gray-500' onClick={handleModalClose}>Close</Button>
    <Button variant="primary" className='bg-blue-500' onClick={handleUpdateTracking}>Update</Button>
  </Modal.Footer>
</Modal>
      <DefaultPagination
        currentPage={currentPage}
        totalPages={Math.ceil(orders.length / ITEMS_PER_PAGE)}
        onPageChange={paginate}
      />
      <Footer />
    </div>
    </React.Fragment >
  )
}
