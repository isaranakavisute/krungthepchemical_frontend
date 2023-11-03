/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Card, Col, Nav, OverlayTrigger, Row, Table, Tooltip } from "react-bootstrap";
import { Chart, LinearScale, CategoryScale, BarController, BarElement, Title, Tooltip as ChartTooltip, Legend } from 'chart.js';
import { Link } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import ReactApexChart from "react-apexcharts";
import { Bar } from 'react-chartjs-2';
import axios from "axios";

Chart.register(LinearScale, CategoryScale, BarController, BarElement, Title, ChartTooltip, Legend);


export default function SalesMonitoring() {
    const [pageViews, setPageviews] = useState([]);
    const [payments, setPayment] = useState([]);
    const [dailyPayments, setDailyPayment] = useState([]);
    const [recentSales, setRecentSales] = useState([]);
    const [users, setUsers] = useState([]);
    const [recentUser, setRecentUser] = useState([]);

    const [income, setIncome] = useState([]);
    const [allpremiumCount, setAllPremiumCount] = useState([]);
    const [payCount, setPayCount] = useState([]);
    const dp1 = [];
    const dp2 = [];
    const dp3 = [];
    const dp4 = [];


    useEffect(() => {
        // Fetch pageviews data
        axios.get("http://localhost:3000/api/dashboard/pageviews")
            .then((response) => {
                setPageviews(response.data);
            })
            .catch((error) => {
                console.error("Error fetching pageviews data:", error);
            });

        // Fetch payment data
        axios.get("http://localhost:3000/api/dashboard/payment-lists")
            .then((response) => {
                setPayment(response.data);
            })
            .catch((error) => {
                console.error("Error fetching payment data:", error);
            });
        axios.get("http://localhost:3000/api/dashboard/payment-week")
            .then((response) => {
                setDailyPayment(response.data);
            })
            .catch((error) => {
                console.error("Error fetching payment data:", error);
            });
        axios.get("http://localhost:3000/api/dashboard/count-payment")
            .then((response) => {
                setPayCount(response.data);
            })
            .catch((error) => {
                console.error("Error fetching payment data:", error);
            });
        axios.get("http://localhost:3000/api/dashboard/recent-signups")
            .then((response) => {
                setRecentUser(response.data);
            })
            .catch((error) => {
                console.error("Error fetching payment data:", error);
            });
        axios.get("http://localhost:3000/api/dashboard/recent-sales")
            .then((response) => {
                setRecentSales(response.data);
            })
            .catch((error) => {
                console.error("Error fetching payment data:", error);
            });
        // Fetch user data
        axios.get("http://localhost:3000/api/dashboard/users")
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
        axios.get("http://localhost:3000/api/dashboard/sales-count")
            .then((response) => {
                setAllPremiumCount(response.data);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
        axios.get("http://localhost:3000/api/dashboard/income")
            .then((response) => {
                setIncome(response.data);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    }, []);
    const monthlyRevenue = payments.map((item) => item.total_amount);

    // Calculate the month-over-month (MoM) growth rate
    const monthlyRevenueGrowth = monthlyRevenue.map((revenue, index) => {
        if (index === 0) {
            return 0; // No growth for the first month
        } else {
            const prevMonthRevenue = monthlyRevenue[index - 1];
            return ((revenue - prevMonthRevenue) / prevMonthRevenue) * 100;
        }
    });

    // Calculate the total growth for all months
    const totalMonthlyRevenueGrowth = monthlyRevenueGrowth.reduce((sum, growth) => sum + growth, 0);
    const months = payments.map(payment => `Month ${payment.month}`);
    const totalPrices = payments.map(payment => parseFloat(payment.total_price_for_month));

    const seriesOne = [
        {
            name: 'Revenue',
            data: totalPrices// This assumes totalPrices contains quarterly revenue data.
        }
    ];
    
    const optionOne = {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Monthly Revenue Growth'
        },
        xaxis: {
            categories: months
        },
        yaxis: {
            title: {
                text: 'Total Price'
            }
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return "฿ " + parseInt(val).toLocaleString()
                }
            }
        }
    };
    


    const monthAbbreviations = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // Sort the pageViews array by month in ascending order
    const sortedPageViews = [...pageViews].sort((a, b) => a.month.localeCompare(b.month));

    const seriesTwo = [
        {
            name: 'views',
            data: sortedPageViews.map((data) => parseInt(data.total_view_count)),
        },
    ];

    const optionsTwo = {
        chart: {
            height: 180,
            type: "line",
            toolbar: {
                show: false,
            },
        },
        stroke: {
            width: 1,
            colors: ["#506fd9"],
        },
        grid: {
            borderColor: "rgba(72,94,144, 0.07)",
            padding: {
                top: -20,
            },
        },
        xaxis: {
            categories: sortedPageViews.map((data) => {
                // Map the month value to English month names
                const [year, month] = data.month.split("-");
                const monthIndex = parseInt(month) - 1;
                return monthAbbreviations[monthIndex];
            }),
        },
        markers: {
            size: 6,
            colors: ["#506fd9"],
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val;
                },
            },
        },

        yaxis: {
            show: false
        },
    };

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weeklyPayments = new Array(7).fill(0);  // Initialize with zeros

    dailyPayments.forEach(payment => {
        const date = new Date(payment.date);
        const dayIndex = date.getUTCDay();
        weeklyPayments[dayIndex] += parseFloat(payment.total_price_daily) + "฿";
    });

    const series = [{
        name: 'Daily Payments',
        data: weeklyPayments
    }];
    
    const options = {
        chart: {
            type: 'bar'
        },
        plotOptions: {
            bar: {
                horizontal: true
            }
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: daysOfWeek,
            title: {
                text: 'Total Payment'
            },
            labels: {
                formatter: function (val) {
                    return "฿ " + parseInt(val).toLocaleString()
                }
            }
        }
    };



    return (
        <React.Fragment>
            <Header />
            <div className="main main-app p-3 p-lg-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div>
                        <ol className="breadcrumb fs-sm mb-1">
                            <li className="breadcrumb-item"><Link to="#">Dashboard</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Sales Monitoring</li>
                        </ol>
                        <h4 className="main-title mb-0">Welcome to Dashboard</h4>
                    </div>

                </div>

                <Row className="g-3">
                    {[
                        {
                            "label": "Total Users",
                            "icon": "ri-user-line",
                            "value": users.length > 0 ? users[0]["userCount"] : 0,
                        },
                        {
                            "label": "Total Income",
                            "icon": "ri-user-line",
                            "value": income.length > 0 ? parseInt(income[0]["income"]).toLocaleString() + "฿": 0 + "฿",
                        }, {
                            "label": "Sales Quantity",
                            "icon": "ri-user-line",
                            "value": allpremiumCount.length > 0 ? allpremiumCount[0]["sales_count"] : 0,
                        }, {
                            "label": "Order Quantity",
                            "icon": "ri-shopping-bag-line",
                            "value": payCount.length > 0 ? payCount[0]["COUNT(order_id)"] : 0,
                        }

                    ].map((card, index) => (
                        <Col xs="6" xl="3" key={index}>
                            <Card className="card-one">
                                <Card.Body>
                                    <Card.Title as="label" className="fs-sm fw-medium mb-1">{card.label}</Card.Title>
                                    <h3 className="card-value mb-1"><i className={card.icon}></i> {card.value}</h3>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                    <Col xl="7">
                        <Card className="card-one">
                            <Card.Body>
                                <ReactApexChart series={seriesOne} options={optionOne} type="line" height={360} className="apex-chart-one mb-4" />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="6" xl="5">
                        <Card className="card-one">
                            <Card.Header>
                                <Card.Title as="h6">Web Engagement</Card.Title>

                            </Card.Header>
                            <Card.Body>
                                <ReactApexChart series={seriesTwo} options={optionsTwo} type="bar" height={300} className="apex-chart-one mb-3" />
                                <p className="mb-3 fs-xs">Count of engagement all pages of website</p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="6" xl="4">
                        <Card className="card-one">
                            <Card.Header>
                                <Card.Title as="h6">Weekly Growth Revenue</Card.Title>

                            </Card.Header>
                            <Card.Body>
                                <div className="chart-bar-one">
                                    <ReactApexChart options={options} series={series} type="bar" height={180} />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="6" xl="4">
                        <Card className="card-one">
                            <Card.Header>
                                <Card.Title as="h6">Recent Sign up</Card.Title>
                            </Card.Header>
                            <Card.Body className="p-0">
                                <ul className="people-group">
                                    {recentUser.map((user) => (
                                        <li className="people-item" key={user.user_id}>

                                            <div className="people-body">
                                                <h6>{user.email}</h6>
                                                <span>USER ID#{user.user_id}</span>
                                                <span>{new Date(user.created_at).toLocaleString()}</span>
                                            </div>

                                        </li>
                                    ))}
                                </ul>
                            </Card.Body>
                            <Card.Footer className="d-flex justify-content-center">
                                <Link to="/backend/dashboard/user" className="fs-sm">Manage users</Link>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col md="6" xl="4">
                        <Card className="card-one">
                            <Card.Header>
                                <Card.Title as="h6">Recent Order</Card.Title>
                            </Card.Header>
                            <Card.Body className="p-0">
                                <ul className="people-group">
                                    {
                                        recentSales.map((item) => (
                                            <li className="people-item" key={item.pay_id}>
                                                <div className="people-body">
                                                    <h6>{item.full_name}</h6>
                                                    <span>{item.phone}</span>
                                                    <span>{new Date(item.order_date).toLocaleString()}</span>
                                                </div>
                                                <div className="text-end">
                                                    <div className="fs-sm">{parseInt(item.total_price).toLocaleString()} ฿</div>
                                                </div>
                                            </li>
                                        ))}
                                </ul>
                            </Card.Body>
                            <Card.Footer className="d-flex justify-content-center">
                                <Link to="/backend/dashboard/payment_list" className="fs-sm">View More</Link>
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>

                <Footer />
            </div>
        </React.Fragment>
    )
}
