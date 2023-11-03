/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Nav, OverlayTrigger, Row, Table, Tooltip, Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import axios from "axios"

export default function SliderCtrl() {
  const [blogs, setBlogs] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
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
  

  const handleCreateProduct = () => {
    const formData = new FormData();
    newBlog.img.forEach((image) => {
      formData.append("image", image);
    });
    formData.append("title", newBlog.title);
    formData.append("content", newBlog.content);

    axios
      .post("http://localhost:3000/api/addSlider", formData)
      .then((response) => {
        setBlogs([...blogs, response.data]);
        setShowCreateModal(false);
        setNewBlog({
          img: [],
        });
        fetchBlogs();
      })
      .catch((error) => {
        console.error("Error creating blog:", error);
      });
  };


  const handleDeleteProduct = () => {
    if (blogToDelete) {
      axios
        .delete(`http://localhost:3000/api/slider/${blogToDelete.slide_id}`)
        .then(() => {
          setBlogs(blogs.filter((blog) => blog.slide_id !== blogToDelete.slide_id));
          setShowDeleteModal(false);
        })
        .catch((error) => {
          console.error("Error deleting blog:", error);
        });
    }
  };

const fetchBlogs = () => {

  axios
    .get("http://localhost:3000/api/slider")
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
            <li className="breadcrumb-item active" aria-current="page">Slider control</li>
          </ol>
          <h4 className="main-title mb-0">Slider control</h4>
        </div>
      </div>
      <Button variant="primary" className="bg-blue-500 mb-8" onClick={() => setShowCreateModal(true)}>
        Add Slider
      </Button>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Create at</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.slide_id}>
              <td>{blog.slide_id}</td>
              <td><img src={`http://krungthepchemi.com/uploads/slider/${blog.slide_img}`} className="w-24" alt="slider" /></td>
              <td>{new Date(blog.create_at).toLocaleString()}</td>

              <td className="flex justify-center">
                <Button
                  variant="danger"
                  className="bg-red-500 mx-auto"
                  onClick={() => {
                    setBlogToDelete(blog);
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
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete ?
        </Modal.Body>
        <Modal.Footer>
          <Button className="bg-gray-500" variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button className="bg-red-500" variant="danger" onClick={handleDeleteProduct}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="blogImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={handleImageChange}
                multiple
              />
            </Form.Group>
            <div className="flex mt-4 justify-center gap-2">
  {Array.isArray(newBlog.imagePreviews) &&
    newBlog.imagePreviews.map((preview, index) => (
      <img
        key={index}
        src={preview}
        alt={`Blog Preview ${index}`}
        style={{ width: "500px", height: "auto" }}
      />
    ))}
</div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="bg-gray-500 border-none" onClick={() => setShowCreateModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" className="bg-blue-500 border-none" onClick={handleCreateProduct}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer />
    </div>
  </React.Fragment>
  )
}