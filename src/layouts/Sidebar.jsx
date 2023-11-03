/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Link, NavLink } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import userAvatar from "../assets/img/img1.jpg";
import {
    dashboardMenu,
    applicationsMenu,
} from "../data/Menu";


export default class Sidebar extends Component {

    constructor(props) {
        super(props);
    }


    toggleFooterMenu = (e) => {
        e.preventDefault();

        let parent = e.target.closest(".sidebar");
        parent.classList.toggle("footer-menu-show");
    }

    handleSignOut = () => {
        // Dispatch the logout action
        this.props.dispatch(logout());
    };

    render() {
        return (
            <div className="sidebar">
                <div className="sidebar-header">
                <img src='https://jpthinkofus.com/fiat/sandbox3/logo_1.png' className="h-24 p-2" alt="Logo"/>
                </div>
                <PerfectScrollbar className="sidebar-body" ref={ref => this._scrollBarRef = ref}>
                    <SidebarMenu onUpdateSize={() => this._scrollBarRef.updateScroll()} />
                </PerfectScrollbar>
                <div className="sidebar-footer">
                    <div className="sidebar-footer-top">
                        <div className="sidebar-footer-thumb">
                            <img src={userAvatar} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class SidebarMenu extends Component {
    toggleMenu = (e) => {
        e.preventDefault();

        let parent = e.target.closest('.nav-group');
        parent.classList.toggle('show');

        this.props.onUpdateSize();
    }

    toggleSubMenu = (e) => {
        e.preventDefault();

        let parent = e.target.closest('.nav-item');
        let node = parent.parentNode.firstChild;

        while (node) {
            if (node !== parent && node.nodeType === Node.ELEMENT_NODE)
                node.classList.remove('show');
            node = node.nextElementSibling || node.nextSibling;
        }

        parent.classList.toggle('show');

        this.props.onUpdateSize();
    }

    populateMenu = (m) => {
        const menu = m.map((m, key) => {
            let sm;
            if (m.submenu) {
                sm = m.submenu.map((sm, key) => {
                    return (
                        <NavLink to={sm.link} className="nav-sub-link" key={key}>{sm.label}</NavLink>
                    )
                })
            }

            return (
                <li key={key} className="nav-item">
                    {(!sm) ? (
                        <NavLink to={m.link} className="nav-link"><i className={m.icon}></i> <span>{m.label}</span></NavLink>
                    ) : (
                        <div onClick={this.toggleSubMenu} className="nav-link has-sub"><i className={m.icon}></i> <span>{m.label}</span></div>
                    )}
                    {m.submenu && <nav className="nav nav-sub">{sm}</nav>}
                </li>
            )
        });

        return (
            <ul className="nav nav-sidebar">
                {menu}
            </ul>
        );
    }

    render() {
        return (
            <React.Fragment>
                <div className="nav-group show">
                    <div className="nav-label" onClick={this.toggleMenu}>Dashboard</div>
                    {this.populateMenu(dashboardMenu)}
                </div>
                <div className="nav-group show">
                    <div className="nav-label" onClick={this.toggleMenu}>Front-end Controller</div>
                    {this.populateMenu(applicationsMenu)}
                </div>
            </React.Fragment>
        )
    }
}

window.addEventListener("click", function (e) {
    let tar = e.target;
    let sidebar = document.querySelector(".sidebar");
    if (!tar.closest(".sidebar-footer") && sidebar) {
        sidebar.classList.remove("footer-menu-show");
    }

    if (!tar.closest(".sidebar") && !tar.closest(".menu-link")) {
        document.querySelector("body").classList.remove("sidebar-show");
    }
});

window.addEventListener("load", function () {
    let skinMode = localStorage.getItem("sidebar-skin");
    let HTMLTag = document.querySelector("html");

    if (skinMode) {
        HTMLTag.setAttribute("data-sidebar", skinMode);
    }
});
