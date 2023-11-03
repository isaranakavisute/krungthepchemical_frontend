import React, { useEffect, useState } from "react";
import Header from "../layouts/Header";
import { Link } from "react-router-dom";
import { Col, Row, Table, Modal, Button } from "react-bootstrap";
import axios from 'axios'
import SignupModal from "./Signup";
import Footer from "../layouts/Footer";
import { DefaultPagination } from "../components/pagination";

const ITEMS_PER_PAGE = 10;

export default function AdminList() {

  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State to control delete confirmation modal
  const [userToDelete, setUserToDelete] = useState(null); // Store the user to be deleted
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
const indexOfLastBlog = currentPage * ITEMS_PER_PAGE;
const indexOfFirstBlog = indexOfLastBlog - ITEMS_PER_PAGE;
const currentBlogs = users.slice(indexOfFirstBlog, indexOfLastBlog);
const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleDeleteUser = () => {
    if (userToDelete) {
      // Send a DELETE request to your server to delete the user
      axios.delete(`http://localhost:3000/api/admin/${userToDelete.admin_id}`)
        .then(() => {
          // Update the user list by filtering out the deleted user
          setUsers(users.filter((user) => user.admin_id !== userToDelete.admin_id));
          // Close the modal
          setShowDeleteModal(false);
        })
        .catch((error) => {
          console.error('Error deleting user:', error);
          // Handle the error or display an error message
        });
    }
  };

  const fetchAdmin = () => {
// Make an Axios GET request to fetch user data from your server
axios.get('http://localhost:3000/api/admin') // Replace with your API endpoint
.then((response) => {
  // Set the user data in the state
  setUsers(response.data);
})
.catch((error) => {
  console.error('Error fetching user data:', error);
});

  }
  useEffect(() => {
    fetchAdmin();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const filterBlogs = () => {
      if (!searchQuery) {
          return currentBlogs; // Return all blogs if no search query
      }
  
      // Use filter to search by position or any other criteria
      return users.filter((user) => {
  
          const full_name = user.full_name.toLowerCase();
          const email = user.email.toLowerCase();
          const admin_id = String(user.admin_id); // Convert pay_id to a string
          const phone = String(user.phone); // Convert pay_id to a string
          const query = searchQuery.toLowerCase();
          return full_name.includes(query) || email.includes(query) || admin_id.includes(query)|| phone.includes(query);
      });
  };
  
  const handleSearchInputChange = (e) => {
      setSearchQuery(e.target.value);
  };

  return (
    <React.Fragment>
    <Header />
    <div className="main main-app p-3 p-lg-4">
      <Row className="g-5">
        <Col xl>
          <Col className="breadcrumb fs-sm mb-2">
            <li className="breadcrumb-item"><Link to="#">Dashboard</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Admin Control</li>
          </Col>
          <h2 className="main-title">Admin Control</h2>
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
          <Button variant="primary" className="bg-blue-500 mb-4" onClick={() => setShowSignupModal(true)}>Add Admin</Button>
          {/* User Control Table */}
           <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th className="text-center">Action</th> {/* Add an Action column */}
                </tr>
              </thead>
              <tbody>
                {filterBlogs().map((user) => (
                  <tr key={user.admin_id}>
                    <td>{user.admin_id}</td>
                    <td>{user.full_name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td className="flex justify-center">
                      <Button
                      variant="danger"
                      className="bg-red-500 mx-auto"
                        onClick={() => {
                          // Set the user to be deleted and open the modal
                          setUserToDelete(user);
                          setShowDeleteModal(true);
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <SignupModal show={showSignupModal} onClose={() => setShowSignupModal(false)} refetch={fetchAdmin} />
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Delete User</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete {userToDelete && userToDelete.full_name}?
              </Modal.Body>
              <Modal.Footer>
                <Button className="bg-gray-500" variant="secondary" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </Button>
                <Button className="bg-red-500" variant="danger" onClick={handleDeleteUser}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
        </Col>
      </Row>
      <DefaultPagination
        currentPage={currentPage}
        totalPages={Math.ceil(users.length / ITEMS_PER_PAGE)}
        onPageChange={paginate}
      />
      <Footer />
    </div>
  </React.Fragment>
  );
}