/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Nav, OverlayTrigger, Row, Table, Tooltip, Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import axios from "axios"

export default function BlogCtrl() {
  const [blogs, setBlogs] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);
  const [newBlog, setNewBlog] = useState({
    img: [], // This should be an array to store selected files
    title: "",
    content: "",
    imagePreviews: [], // Initialize imagePreviews as an empty array
  });
  const [editedBlog, setEditedBlog] = useState({
    title: "",
    content: "",
  });


  const chartOption = {
    indexAxis: 'y',
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        grid: {
          borderColor: '#000',
          color: '#f3f5f9'
        },
        ticks: {
          color: '#212830',
          font: {
            size: 10,
            weight: '500'
          }
        }
      },
      y: {
        grid: {
          borderWidth: 0,
          color: '#f3f5f9'
        },
        ticks: {
          color: '#212830',
          font: {
            size: 12
          }
        }
      }
    }
  };


  const currentSkin = (localStorage.getItem('skin-mode')) ? 'dark' : '';
  const [skin, setSkin] = useState(currentSkin);

  if (skin === 'dark') {
    chartOption.scales['x'].grid.color = '#222b41';
    chartOption.scales['x'].ticks.color = 'rgba(255,255,255,.65)';
    chartOption.scales['x'].grid.borderColor = '#222b41';
    chartOption.scales['y'].grid.color = '#222b41';
    chartOption.scales['y'].ticks.color = 'rgba(255,255,255,.65)';
  } else {
    chartOption.scales['x'].grid.color = '#edeff6';
    chartOption.scales['x'].ticks.color = '#42484e';
    chartOption.scales['x'].grid.borderColor = '#edeff6';
    chartOption.scales['y'].grid.color = '#edeff6';
    chartOption.scales['y'].ticks.color = '#42484e';
  }
 
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
      .post("http://localhost:3000/api/createBlogs", formData)
      .then((response) => {
        setBlogs([...blogs, response.data]);
        setShowCreateModal(false);
        setNewBlog({
          img: [],
          title: "",
          content: "",
        });
        fetchBlogs();
      })
      .catch((error) => {
        console.error("Error creating blog:", error);
      });
  };

  const handleEditProduct = () => {
    if (editedBlog) {
      axios
        .put(`http://localhost:3000/api/blogs/${editedBlog.blog_id}`, editedBlog)
        .then(() => {
          setBlogs((prevBlogs) =>
            prevBlogs.map((blog) =>
              blog.blog_id === editedBlog.blog_id ? { ...blog, ...editedBlog } : blog
            )
          );
          setShowEditModal(false);
        })
        .catch((error) => {
          console.error("Error editing blog:", error);
        });
    }
  };

  const handleDeleteProduct = () => {
    if (blogToDelete) {
      axios
        .delete(`http://localhost:3000/api/blogs/${blogToDelete.blog_id}`)
        .then(() => {
          setBlogs(blogs.filter((blog) => blog.blog_id !== blogToDelete.blog_id));
          setShowDeleteModal(false);
        })
        .catch((error) => {
          console.error("Error deleting blog:", error);
        });
    }
  };

const fetchBlogs = () => {

  axios
    .get("http://localhost:3000/api/blogs")
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
            <li className="breadcrumb-item active" aria-current="page">Blogs control</li>
          </ol>
          <h4 className="main-title mb-0">Blogs control</h4>
        </div>
        <Nav as="nav" className="nav-icon nav-icon-lg">
          <OverlayTrigger overlay={<Tooltip>Share</Tooltip>}>
            <Nav.Link href=""><i className="ri-share-line"></i></Nav.Link>
          </OverlayTrigger>
          <OverlayTrigger overlay={<Tooltip>Print</Tooltip>}>
            <Nav.Link href=""><i className="ri-printer-line"></i></Nav.Link>
          </OverlayTrigger>
          <OverlayTrigger overlay={<Tooltip>Report</Tooltip>}>
            <Nav.Link href=""><i className="ri-bar-chart-2-line"></i></Nav.Link>
          </OverlayTrigger>
        </Nav>
      </div>
      <Button variant="primary" className="bg-blue-500 mb-8" onClick={() => setShowCreateModal(true)}>
        Create Content
      </Button>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Title</th>
            <th>Content</th>
            <th>Create at</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.blog_id}>
              <td>{blog.blog_id}</td>
              <td><img src={`http://krungthepchemi.com/uploads/blogs/${blog.blog_img}`} className="w-24" alt="Blog" /></td>
              <td>{blog.title}</td>
              <td>{blog.content && blog.content.length > 25 ? `${blog.content.slice(0, 25)}...` : blog.content}</td>
              <td>{new Date(blog.create_at).toLocaleString()}</td>

              <td className="flex justify-center">
                <Button
                  variant="primary"
                  className="bg-blue-500 mx-auto"
                  onClick={() => {
                    setEditedBlog(blog);
                    setShowEditModal(true);
                  }}
                >
                  Edit
                </Button>
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
          <Modal.Title>Delete Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {blogToDelete && blogToDelete.title}?
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
          <Modal.Title>Create Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your blog title"
                value={newBlog.title}
                onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter blog content"
                value={newBlog.content}
                onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
              />
            </Form.Group>
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
        style={{ width: "80px", height: "auto" }}
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
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter edited blog title"
                value={editedBlog.title}
                onChange={(e) => setEditedBlog({ ...editedBlog, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="editContent">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter edited blog content"
                value={editedBlog.content}
                onChange={(e) => setEditedBlog({ ...editedBlog, content: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="bg-gray-500 border-none" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" className="bg-blue-500 border-none" onClick={handleEditProduct}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer />
    </div>
  </React.Fragment>
  )
}