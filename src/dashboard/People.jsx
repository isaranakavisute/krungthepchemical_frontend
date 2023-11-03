import React, { useEffect, useState } from "react";
import Header from "../layouts/Header";
import { Link } from "react-router-dom";
import { Col, Row, Table, Modal, Button } from "react-bootstrap";
import axios from 'axios'
import Footer from "../layouts/Footer";
import AddUserModal from "./AddUserModal";
import { DefaultPagination } from "../components/pagination";
import 'react-toastify/dist/ReactToastify.css';


const ITEMS_PER_PAGE = 10;

export default function People() {
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastBlog = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstBlog = indexOfLastBlog - ITEMS_PER_PAGE;
  const currentBlogs = users.slice(indexOfFirstBlog, indexOfLastBlog);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteUser = () => {
    if (userToDelete) {
      axios.delete(`http://localhost:3000/api/users/${userToDelete.user_id}`)
        .then(() => {
          setUsers(users.filter((user) => user.user_id !== userToDelete.user_id));
          setShowDeleteModal(false);
        })
        .catch((error) => {
          console.error('Error deleting user:', error);
        });
    }
  };

  const fetchUser = () => {
    axios.get('http://localhost:3000/api/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  const filterBlogs = () => {
    if (!searchQuery) {
      return currentBlogs;
    }

    return users.filter((user) => {
      const full_name = user.full_name.toLowerCase();
      const email = user.email.toLowerCase();
      const user_id = String(user.user_id);
      const phone = String(user.phone);
      const query = searchQuery.toLowerCase();
      return full_name.includes(query) || email.includes(query) || user_id.includes(query) || phone.includes(query);
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
              <li className="breadcrumb-item active" aria-current="page">Users Control</li>
            </Col>
            <h2 className="main-title">Users Control</h2>
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
            <Button variant="primary" className="bg-blue-500 mb-4" onClick={() => setShowSignupModal(true)}>Add User</Button>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {filterBlogs().map((user) => (
                  <tr key={user.user_id}>
                    <td>{user.user_id}</td>
                    <td>{user.full_name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td className="flex justify-center">
                    
                      <Button
                        variant="danger"
                        className="bg-red-500 mx-auto"
                        onClick={() => {
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
            <AddUserModal show={showSignupModal} onClose={() => setShowSignupModal(false)} refetch={fetchUser} />
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
