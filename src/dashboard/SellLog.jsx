/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Card, Col, Nav, OverlayTrigger, Row, Table, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { dp1, dp2, dp3 } from "../data/DashboardData";


export default function SellLog() {

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

  return (
    <React.Fragment>
      <Header onSkin={setSkin} />
      <div className="main main-app p-3 p-lg-4">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <ol className="breadcrumb fs-sm mb-1">
              <li className="breadcrumb-item"><Link to="#">Dashboard</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Product Stock</li>
            </ol>
            <h4 className="main-title mb-0">Product Stock</h4>
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

        <Footer />
      </div>
    </React.Fragment>
  )
}