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
export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [currentOrderDetails, setCurrentOrderDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentImage, setCurrentImage] = useState('');

  const handleShowImageModal = (imageUrl) => {
    setCurrentImage(imageUrl);
    setShowImageModal(true);
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

  const getOrder = () => {
     axios.get('http://localhost:3000/api/orders')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error("Error fetching orders:", error);
      });
  }

  useEffect(() => {
    // Assuming there's an API endpoint to fetch the orders
    getOrder();
  }, []);
  const handleApproveOrder = (order) => {
    axios.put(`http://localhost:3000/api/approve-order/${order.order_id}`)
      .then(() => {
        getOrder();
        toast.success('Order approved successfully!');
      })
      .catch(error => {
        console.error("Error updating order status and stock:", error);
      });
};

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
          const admin_id = String(user.order_id); // Convert pay_id to a string
          const phone = String(user.phone); // Convert pay_id to a string
          const query = searchQuery.toLowerCase();
          return full_name.includes(query) || admin_id.includes(query)|| phone.includes(query);
      });
  };
  const handleSearchInputChange = (e) => {
      setSearchQuery(e.target.value);
  };

  function printNameAndAddress(order) {
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<html><head><title>Print</title></head><body>');
    printWindow.document.write('<div style="width: 50%;">'); // Open div with 50% width and centered
    printWindow.document.write('<p>' + order.full_name + '</p>');
    printWindow.document.write('<p>' + order.phone + '</p>');
    printWindow.document.write('<p>' + order.shipping_address + '</p>');
    printWindow.document.write('</div>'); // Close div
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  }
  

  return (
    <React.Fragment>
      <Header />
      <ToastContainer />

      <div className="main main-app p-3 p-lg-4">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <ol className="breadcrumb fs-sm mb-1">
              <li className="breadcrumb-item"><Link to="#">Dashboard</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Order list</li>
            </ol>
            <h4 className="main-title mb-0">Order list</h4>
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
              <th>Price</th>
              <th>Status</th>
              <th>หลักฐานการชำระเงิน</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filterBlogs() && orders.map((order) => (
              <tr key = {order.order_id}>
            <td>{order.order_id}</td>
            <td>{order.full_name}</td>
            <td>{order.phone}</td>
            <td>{order.shipping_address}</td>
            <td>{parseInt(order.total_price).toLocaleString()} ฿</td>
            <td>{order.order_status}</td>
            <td><img
              src={`https://krungthepchemi.com/uploads/proof/${order.proof}`}
              className="w-24 cursor-pointer"
              alt="Payment Proof"
              onClick={() => handleShowImageModal(`https://krungthepchemi.com/uploads/proof/${order.proof}`)}
            /></td>
           <td>
  {order.order_status !== 'ตรวจสอบแล้ว' ? (
    <Button
      variant="primary"
      className="bg-blue-500"
      onClick={() => handleApproveOrder(order)}
    >
      Approve
    </Button>
  ) : (
    <Button 
  onClick={() => printNameAndAddress(order)} 
  variant="info"
  className="bg-cyan-300"
>
      Print
    </Button>
  )}

  <Button 
    onClick={() => handleOpenOrderDetail(order)} 
    variant="secondary" 
    className='bg-gray-500 ml-2'
  >
    Detail
  </Button>
</td>


          </tr>
            ))}
        </tbody>
      </Table>

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

      <Modal show={showImageModal} onHide={() => setShowImageModal(false)} size="lg">
        <Modal.Body className="d-flex align-items-center justify-content-center">
          <img src={currentImage} alt="Full-size Payment Proof" style={{ maxWidth: "100%", maxHeight: "80vh" }} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowImageModal(false)} className="bg-gray-300 hover:bg-gray-400 text-black">
            Close
          </Button>
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
