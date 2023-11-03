/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Nav, OverlayTrigger, Row, Table, Tooltip, Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import axios from "axios"
import { DefaultPagination } from "../components/pagination";

const ITEMS_PER_PAGE = 10;

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State to control delete confirmation modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [newProduct, setNewProduct] = useState({
    product_img: [], // Array to store file objects for product images
    product_name: "",
    category: "",
    description: "",
    price: "",
    stock: ""
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    product_name: "",
    description: "",
    price: "",
    stock: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
const indexOfLastBlog = currentPage * ITEMS_PER_PAGE;
const indexOfFirstBlog = indexOfLastBlog - ITEMS_PER_PAGE;
const currentBlogs = products.slice(indexOfFirstBlog, indexOfLastBlog);
const paginate = (pageNumber) => setCurrentPage(pageNumber);


const [searchQuery, setSearchQuery] = useState("");
  const filterBlogs = () => {
      if (!searchQuery) {
          return currentBlogs; // Return all blogs if no search query
      }
  
      // Use filter to search by position or any other criteria
      return products.filter((user) => {
  
          const full_name = user.product_name.toLowerCase();
          const admin_id = String(user.product_id); // Convert pay_id to a string
          const query = searchQuery.toLowerCase();
          return full_name.includes(query) || admin_id.includes(query);
      });
  };
  const handleSearchInputChange = (e) => {
      setSearchQuery(e.target.value);
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const selectedImages = [];

    // Array to store image previews
    const imagePreviews = [];

    for (let i = 0; i < files.length; i++) {
      selectedImages.push(files[i]);

      // Create URL for image preview
      const imageURL = URL.createObjectURL(files[i]);
      imagePreviews.push(imageURL); // Add the preview URL to the array
    }

    // Update the state with selected images and image previews
    setNewProduct({ ...newProduct, product_img: selectedImages, imagePreviews });

    // Reset the file input
    e.target.value = null;
  };

  const handleEditProduct = () => {
    if (productToEdit && editedProduct) {
      // Send a PUT request to your server to update the product
      axios
        .put(`http://localhost:3000/api/products/${productToEdit.product_id}`, editedProduct)
        .then(() => {
          // Update the product list with the edited product
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.product_id === productToEdit.product_id ? { ...product, ...editedProduct } : product
            )
          );
          // Close the modal
          setShowEditModal(false);
        })
        .catch((error) => {
          console.error('Error editing product:', error);
          // Handle the error or display an error message
        });
    }
  };

  const handleCreateProduct = () => {
    const formData = new FormData();
    formData.append('product_name', newProduct.product_name);
    formData.append('category', newProduct.category);
    formData.append('description', newProduct.description);
    formData.append('price', newProduct.price);
    formData.append('stock', newProduct.stock);

    // Append each image to the FormData object
    for (let i = 0; i < newProduct.product_img.length; i++) {
      formData.append('image', newProduct.product_img[i]);
    }

    // Send a POST request to your server with FormData containing product data and images
    axios
      .post('http://localhost:3000/api/createProducts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        // Update the product list with the new product
        setProducts([...products, response.data]);
        // Close the modal
        setShowCreateModal(false);
        // Reset the newProduct state for the next creation
        setNewProduct({
          product_img: [],
          product_name: '',
          category: '',
          description: '',
          price: '',
          stock: '',
        });

        location.reload()
      })
      .catch((error) => {
        console.error('Error creating product:', error);
        // Handle the error or display an error message
      });
  };
  const handleDeleteProduct = () => {
    if (productToDelete) {
      // Send a DELETE request to your server to delete the product
      axios.delete(`http://localhost:3000/api/products/${productToDelete.product_id}`)
        .then(() => {
          // Update the product list by filtering out the deleted product
          setProducts(products.filter((product) => product.product_id !== productToDelete.product_id));
          // Close the modal
          setShowDeleteModal(false);
        })
        .catch((error) => {
          console.error('Error deleting product:', error);
          // Handle the error or display an error message
        });
    }
  };
  useEffect(() => {
    // Make an Axios GET request to fetch user data from your server
    axios.get('http://localhost:3000/api/products') // Replace with your API endpoint
      .then((response) => {
        // Set the user data in the state
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  useEffect(() => {
    if (productToEdit) {
      // Set editedProduct state with the productToEdit values
      setEditedProduct({
        product_name: productToEdit.product_name,
        description: productToEdit.description,
        price: productToEdit.price,
        stock: productToEdit.stock,
      });
    }
  }, [productToEdit]);
  return (
    <React.Fragment>
      <Header />
      <div className="main main-app p-3 p-lg-4">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <ol className="breadcrumb fs-sm mb-1">
              <li className="breadcrumb-item"><Link to="#">Dashboard</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Product</li>
            </ol>
            <h4 className="main-title mb-0">Product List</h4>
            
          </div>
          
        </div>
        <Button variant="primary" className="bg-blue-500 mb-8" onClick={() => setShowCreateModal(true)}>
          Create Product
        </Button>
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
              <th>ID</th>
              <th>Image</th>
              <th>Product</th>
              <th>Category</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th className="text-center">Action</th> {/* Add an Action column */}
            </tr>
          </thead>
          <tbody>
            {filterBlogs().map((prod) => (
              <tr key={prod.product_id}>
                <td>{prod.product_id}</td>
                <td><img src={`http://krungthepchemi.com/uploads/products/${prod.product_img1}`} className="w-24" /></td>
                <td>{prod.product_name}</td>
                <td>{prod.category}</td>
                <td>{prod.description.length > 25 ? `${prod.description.slice(0, 25)}...` : prod.description}</td>
                <td>{parseInt(prod.price).toLocaleString()} ฿</td>
                <td><td>{prod.stock === 0 ? "Sold out" : prod.stock}</td></td>
                <td className="flex justify-center">
                  <Button
                    variant="primary"
                    className="bg-blue-500 mx-auto"
                    onClick={() => {
                      setProductToEdit(prod);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="bg-red-500 mx-auto"
                    onClick={() => {
                      setProductToDelete(prod);
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
            <Modal.Title>Delete Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete {productToDelete && productToDelete.product_name}?
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
            <Modal.Title>Create Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Form fields for creating a new product */}
            <Form>
              <Form.Group controlId="productName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your product name"
                  value={newProduct.product_name}
                  onChange={(e) => setNewProduct({ ...newProduct, product_name: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="productCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product category"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="productDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter product description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="productPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter product price"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="productStock">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter product stock"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="productImage">
                <Form.Label>Product Images (Up to 5)</Form.Label>
                <Form.Control
                  type="file"
                  multiple
                  onChange={handleImageChange}
                />
              </Form.Group>
              <div className="flex mt-4 justify-center gap-2">
                {Array.isArray(newProduct.imagePreviews) &&
                  newProduct.imagePreviews.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`Product Preview ${index}`}
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
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Form fields for editing product */}
            <Form>
              <Form.Group controlId="editProductName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter edited product name"
                  value={editedProduct.product_name}
                  onChange={(e) => setEditedProduct({ ...editedProduct, product_name: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="editProductDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter edited product description"
                  value={editedProduct.description}
                  onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="editProductPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter edited product price"
                  value={editedProduct.price}
                  onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="editProductStock">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter edited product stock"
                  value={editedProduct.stock}
                  onChange={(e) => setEditedProduct({ ...editedProduct, stock: e.target.value })}
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
        <DefaultPagination
        currentPage={currentPage}
        totalPages={Math.ceil(products.length / ITEMS_PER_PAGE)}
        onPageChange={paginate}
      />
        <Footer />
      </div>
    </React.Fragment>
  )
}