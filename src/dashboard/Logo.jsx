/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Nav, OverlayTrigger, Row, Table, Tooltip, Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import axios from "axios"

export default function Logo() {
  const [blogs, setBlogs] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [logotoEdit, setlogotoEdit] = useState(null);
  const [newBlog, setNewBlog] = useState({
    img: [], // This should be an array to store selected files
    imagePreviews: [], // Initialize imagePreviews as an empty array
  });


  const handleImageChange = (e) => {
    const files = e.target.files;
    const selectedImages = [];
    const imagePreviews = [];
  
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onloadend = () => {
        imagePreviews.push(reader.result);
        setNewBlog((prev) => ({
          ...prev,
          imagePreviews: [...imagePreviews],
        }));
      };
      reader.readAsDataURL(files[i]);
      selectedImages.push(files[i]);
    }
  
    setNewBlog({ ...newBlog, img: selectedImages });
    e.target.value = null;
  };
  



  const handleEditSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    newBlog.img.forEach((img) => {
      formData.append('logo', img);
    });

    axios
      .put(`http://localhost:3000/api/logo/${logotoEdit.logo_id}`, formData)
      .then((response) => {
        setShowEdit(false);
        fetchBlogs();
      })
      .catch((error) => {
        console.error("Error updating logo:", error);
      });
  };

const fetchBlogs = () => {

  axios
    .get("http://localhost:3000/api/logo")
    .then((response) => {
      setBlogs(response.data);
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
  
}

  useEffect(() => {
    fetchBlogs();
  }, []);


  return (
    <React.Fragment>
    <Header />
    <div className="main main-app p-3 p-lg-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <ol className="breadcrumb fs-sm mb-1">
            <li className="breadcrumb-item"><Link to="#">Dashboard</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Logo control</li>
          </ol>
          <h4 className="main-title mb-0">Logo control</h4>
        </div>
      </div>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.logo_id}>
              <td>{blog.logo_id}</td>
              <td><img src={`http://krungthepchemi.com/uploads/logo/${blog.logo_img}`} className="w-24" alt="slider" /></td>

              <td className="flex justify-center">
                <Button
                  variant="primary"
                  className="bg-blue-500 mx-auto"
                  onClick={() => {
                    setlogotoEdit(blog);
                    setShowEdit(true);
                  }}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Logo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group>
              <Form.Label>Logo</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
              <div>
                {newBlog.imagePreviews.map((preview, index) => (
                  <img key={index} src={preview} alt="preview" style={{ width: '100px', height: '100px', margin: '5px' }} />
                ))}
              </div>
            </Form.Group>
            <Button variant="primary" type="submit" className="bg-blue-500 mt-4">
              Update Logo
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Footer />
    </div>
  </React.Fragment>
  )
}