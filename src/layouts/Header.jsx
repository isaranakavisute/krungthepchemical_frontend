/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from "react"
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import userAvatar from "../assets/img/img1.jpg";
import { useDispatch } from 'react-redux';
import Sidebar from "./Sidebar";
import { logout } from '../redux/auth/auth.actions';

export default function Header() {
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      to=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="dropdown-link"
    >
      {children}
    </Link>
  ));

  const toggleSidebar = (e) => {
    e.preventDefault();
    let isOffset = document.body.classList.contains("sidebar-offset");
    if (isOffset) {
      document.body.classList.toggle("sidebar-show");
    } else {
      if (window.matchMedia("(max-width: 991px)").matches) {
        document.body.classList.toggle("sidebar-show");
      } else {
        document.body.classList.toggle("sidebar-hide");
      }
    }
  }
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(logout());
  }


  return (
    <div className="header-main px-3 px-lg-4">
    <Sidebar />
      <Link onClick={toggleSidebar} className="menu-link me-3 me-lg-4"><i className="ri-menu-2-fill"></i></Link>

      <div className="me-auto">
      </div>


      <Dropdown className="dropdown-profile ms-3 ms-xl-4" align="end">
        <Dropdown.Toggle as={CustomToggle}>
          <div className="avatar online">
            <img src={userAvatar} alt="" />
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu className="mt-10-f">
          <div className="dropdown-menu-body">
            <hr />
            <nav className="nav">
            <Link to="/" onClick={handleSignOut}><i className="ri-logout-box-r-line"></i> Log Out</Link>
            </nav>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}