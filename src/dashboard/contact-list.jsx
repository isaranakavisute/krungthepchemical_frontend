/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import axios from "axios";
import { DefaultPagination } from "../components/pagination";
const ITEMS_PER_PAGE = 10;
export default function ContactList() {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastBlog = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstBlog = indexOfLastBlog - ITEMS_PER_PAGE;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const fetchBlogs = () => {
        axios
            .get("http://localhost:3000/api/contact_list")
            .then((response) => {
                setBlogs(response.data);
            })
            .catch((error) => {
                console.error("Error fetching blog data:", error);
            });
    };

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
                            <li className="breadcrumb-item">
                                <Link to="#">Dashboard</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                            Contact List
                            </li>
                        </ol>
                        <h4 className="main-title mb-0">Contact List</h4>
                    </div>
                </div>
                <Table responsive striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th>Contact at</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentBlogs.map((blog) => (
                            <tr key={blog.acc_id}>
                                <td>{blog.full_name}</td>
                                <td>{blog.email}</td>
                                <td>{blog.message}</td>
                                <td>{new Date(blog.contact_at).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <DefaultPagination
        currentPage={currentPage}
        totalPages={Math.ceil(blogs.length / ITEMS_PER_PAGE)}
        onPageChange={paginate}
      />
            <Footer />
        </React.Fragment>
    );
}
