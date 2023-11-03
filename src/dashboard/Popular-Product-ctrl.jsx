/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Card, Form, Nav, OverlayTrigger, Button, Table, Tooltip, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { dp1, dp2, dp3 } from "../data/DashboardData";
import axios from "axios"

export default function PopProductCtrl() {

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


  const currentSkin = (localStorage.getItem('skin-mode'))? 'dark' : '';
  const [skin, setSkin] = useState(currentSkin);
  const [newProducts, setNewProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [productToDelete, setProductToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if(skin === 'dark') {
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
  const fetchPopData = () => {
    // Make an Axios GET request to fetch updated product data
    axios.get('http://localhost:3000/api/pop-products') // Replace with your API endpoint
      .then((response) => {
        // Set the user data in the state
        setNewProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
};
const handleProductChange = (e) => {
  setSelectedProduct(e.target.value);
};
  useEffect(() => {
    fetchPopData();
  }, []);

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

  const handleNewStatus = () => {
    // Make an Axios PUT request to update the selected product
    axios.put(`http://localhost:3000/api/pop-products/${selectedProduct}`, {
      pop_status: 1 // or 0, depending on your use case
  })
    .then((response) => {
        // Handle the response accordingly (if needed)
        console.log('Product updated successfully:', response.data);
        // Close the modal after successful product update
        setShowCreateModal(false);
        fetchPopData();

    })
    .catch((error) => {
        console.error('Error updating product:', error);
    });
};
const handleDeleteProduct = () => {
  axios.put(`http://localhost:3000/api/del-pop-products/${productToDelete.product_id}`, {
    pop_status: 0 // or 0, depending on your use case
})
  .then((response) => {
      // Handle the response accordingly (if needed)
      console.log('Product updated successfully:', response.data);
      fetchPopData();
      setShowDeleteModal(false);
  })
  .catch((error) => {
      console.error('Error updating product:', error);
  });
};
  return (
    <React.Fragment>
      <Header onSkin={setSkin} />
      <div className="main main-app p-3 p-lg-4">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <ol className="breadcrumb fs-sm mb-1">
              <li className="breadcrumb-item"><Link to="#">Dashboard</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Popular Product Control</li>
            </ol>
            <h4 className="main-title mb-0">Popular Product Control</h4>
          </div>
        </div>
        <Button variant="primary" className="bg-blue-500 mb-8" onClick={() => setShowCreateModal(true)}>
          Set Popular Product
        </Button>
        
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
            {newProducts.map((newprod) => (
              <tr key={newprod.product_id}>
                <td>{newprod.product_id}</td>
                <td><img src={`http://krungthepchemi.com/uploads/products/${newprod.product_img1}`} className="w-24" /></td>
                <td>{newprod.product_name}</td>
                <td>{newprod.category}</td>
                <td>{newprod.description.length > 25 ? `${newprod.description.slice(0, 25)}...` : newprod.description}</td>
                <td>{parseInt(newprod.price).toLocaleString()} ฿</td>
                <td>{newprod.stock}</td>
                <td className="flex justify-center">
                  <Button
                    variant="danger"
                    className="bg-red-500 mx-auto"
                    onClick={() => {
                      setProductToDelete(newprod);
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
        <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Popular Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Form fields for creating a new product */}
            <Form>
          <Form.Group controlId="productName">
            <Form.Label>Select Product to set as New Product</Form.Label>
            <Form.Select aria-label="Default select example" onChange={handleProductChange} value={selectedProduct}>
              <option value="">Select a product</option>
              {products.map((prod) => (
                <option key={prod.product_id} value={prod.product_id}>
                  {prod.product_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className="bg-gray-500 border-none" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" className="bg-blue-500 border-none" onClick={handleNewStatus}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Popular</Modal.Title>
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
        <Footer />
      </div>
    </React.Fragment>
  )
}