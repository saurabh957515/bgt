import React, { useState, useEffect, useCallback } from "react";
import { Dropdown, Nav, Toast } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { VscAccount } from "react-icons/vsc";
import {
  onPressDashbord,
  onPressDashbordChild,
  onPressThemeColor,
  onPressGeneralSetting,
  onPressNotification,
  onPressEqualizer,
  onPressSideMenuToggle,
  onPressMenuProfileDropdown,
  onPressSideMenuTab,
  tostMessageLoad,
} from "../actions";
import Logo from "../assets/images/logoimage.png";
import LogoWhite from "../assets/images/logo-white.svg";
import Avatar4 from "../assets/images/xs/avatar4.jpg";
import Avatar5 from "../assets/images/xs/avatar5.jpg";
import Avatar2 from "../assets/images/xs/avatar2.jpg";
import Avatar1 from "../assets/images/xs/avatar1.jpg";
import Avatar3 from "../assets/images/xs/avatar3.jpg";
import Logout from "../screens/Logout";
import AuthUser from "./AuthUser";
import LogoIcon from "../assets/Icons/LogoIcon";

const NavbarMenu = ({
  activeKey,
  themeColor,
  toggleNotification,
  toggleEqualizer,
  sideMenuTab,
  isToastMessage,
  toastMessage,
  tostMessageLoad,
}) => {
  const [linkupdate, setLinkupdate] = useState(false);
  const [isFilereOpen, setIsFilterOpen] = useState(false);
  const activeMenutabContainer = useCallback(
    (id, toggle) => {
      const parents = document.getElementById("main-menu");
      const activeMenu = document.getElementById(id);

      for (let index = 0; index < parents.children.length; index++) {
        if (parents.children[index].id !== id) {
          parents.children[index].classList.remove("active");
          parents.children[index].children[1].classList.remove("in");
        } else {
          if (toggle) {
            activeMenu.classList.toggle("active");
            activeMenu.children[1].classList.toggle("in");
          } else {
            activeMenu.classList.add("active");
            activeMenu.children[1].classList.add("in");
          }
        }
      }
    },
    [activeKey]
  );

  const activeMenutabwhenNavigate = useCallback(
    (activeKey) => {
      if (
        activeKey === "/dashboard" ||
        activeKey === "/demographic" ||
        activeKey === "/ioT"
      ) {
        activeMenutabContainer("dashboradContainer");
      } else if (
        activeKey === "/appinbox" ||
        activeKey === "/appchat" ||
        activeKey === "/appcalendar" ||
        activeKey === "/appcontact" ||
        activeKey === "/apptaskbar"
      ) {
        activeMenutabContainer("AppContainer");
      } else if (activeKey === "/inquiry" || activeKey === "/createinquiry") {
        activeMenutabContainer("inquiryContainer");
      } else if (activeKey === "/totaladmission") {
        activeMenutabContainer("admissionContainer");
      } else if (activeKey === "/createBank" || activeKey === "/bankList") {
        activeMenutabContainer("bankDetails");
      } else if (activeKey === "/fees") {
        activeMenutabContainer("feesContainer");
      } else {
        activeMenutabContainer("");
      }
    },
    [activeMenutabContainer, activeKey]
  );

  useEffect(() => {
    tostMessageLoad(true);
    activeMenutabwhenNavigate("/" + activeKey);
  }, [activeKey, activeMenutabwhenNavigate]);

  useEffect(() => {
    document.body.classList.add(themeColor);
    return () => {
      document.body.classList.remove(themeColor);
    };
  }, [themeColor]);

  return (
    <div>
      {" "}
      {isToastMessage ? (
        <Toast
          id="toast-container"
          show={isToastMessage}
          onClose={() => {
            tostMessageLoad(false);
          }}
          className="toast-info toast-top-right"
          autohide={true}
          delay={5000}
        >
          {" "}
          <Toast.Header className="mb-0 toast-info justify-content-between">
            {" "}
            <strong className="me-auto">
              {" "}
              {toastMessage ? toastMessage : "Welcome to Inquiry Manager"}{" "}
            </strong>{" "}
          </Toast.Header>{" "}
        </Toast>
      ) : null}{" "}
      <nav className="navbar navbar-fixed-top">
        {" "}
        <div className="container-fluid">
          {" "}
          <div className="navbar-btn">
            {" "}
            <button
              className="btn-toggle-offcanvas"
              onClick={() => {
                onPressSideMenuToggle();
              }}
            >
              {" "}
              <i className="lnr lnr-menu fa fa-bars"></i>{" "}
            </button>{" "}
          </div>{" "}
          <div className="navbar-brand">
            {" "}
            <div>
              <LogoIcon/>
              {/* <img src={Logo} height="48" alt="Lucid" /> */}
              {/* <img
                src={
                  document.body.classList.contains("full-dark")
                    ? LogoWhite
                    : Logo
                }
                alt="Lucid Logo"
                className="img-responsive logo"
              />{" "} */}
            </div>{" "}
          </div>{" "}
          <div className="navbar-right">
            {" "}
            <div id="navbar-menu">
              {" "}
              <ul className="nav navbar-nav">
                {" "}
                <li className={toggleEqualizer ? "show dropdown" : "dropdown"}>
                  {" "}
                  <a
                    href="#!"
                    className="dropdown-toggle icon-menu"
                    data-toggle="dropdown"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsFilterOpen((pre) => !pre);
                    }}
                  >
                    {" "}
                    <i className="icon-equalizer"></i>{" "}
                  </a>{" "}
                  <ul
                    className={
                      isFilereOpen
                        ? "dropdown-menu user-menu menu-icon show"
                        : "dropdown-menu user-menu menu-icon"
                    }
                  >
                    {" "}
                    <li className="menu-heading">More Actions</li>{" "}
                    <li>
                      {" "}
                      <Logout />{" "}
                    </li>{" "}
                  </ul>{" "}
                </li>{" "}
                <li> </li>{" "}
              </ul>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </nav>{" "}
      <div id="left-sidebar" className="sidebar" style={{ zIndex: 9 }}>
        {" "}
        <div className="sidebar-scroll">
          {" "}
          <div
            className="flex user-account"
            style={{ alignItems: "center", display: "flex" }}
          >
            {" "}
            <div style={{ marginRight: "16px" }}>
              {" "}
              <VscAccount style={{ height: "32px", width: "32px" }} />{" "}
            </div>{" "}
            <Dropdown>
              <span>Welcome </span>{" "}
              <div>
                <AuthUser />
              </div>
            </Dropdown>{" "}
          </div>{" "}
          <ul className="nav nav-tabs">
            {" "}
            <li className="nav-item">
              {" "}
              <Link
                to="#"
                className={sideMenuTab[0] ? "nav-link active" : "nav-link"}
                data-toggle="tab"
                onClick={() => {
                  onPressSideMenuTab(0);
                }}
              >
                {" "}
                Menu{" "}
              </Link>{" "}
            </li>{" "}
          </ul>{" "}
          <div className="tab-content p-l-0 p-r-0">
            {" "}
            <div
              className={sideMenuTab[0] ? "tab-pane active show" : "tab-pane"}
              id="menu"
            >
              {" "}
              <Nav id="left-sidebar-nav" className="sidebar-nav">
                {" "}
                <ul id="main-menu" className="metismenu">
                  {" "}
                  <li className="" id="dashboradContainer">
                    {" "}
                    <a
                      href="#!"
                      className="has-arrow"
                      onClick={(e) => {
                        e.preventDefault();
                        activeMenutabContainer("dashboradContainer", true);
                      }}
                    >
                      {" "}
                      <i className="icon-home"></i> <span>Dashboard</span>{" "}
                    </a>{" "}
                    <ul className="collapse">
                      {" "}
                      <li className={activeKey === "dashboard" ? "active" : ""}>
                        {" "}
                        <Link to="dashboard">Analytical</Link>{" "}
                      </li>{" "}
                    </ul>{" "}
                  </li>{" "}
                  <li className="" id="inquiryContainer">
                    {" "}
                    <a
                      href="#!"
                      className="has-arrow"
                      onClick={(e) => {
                        e.preventDefault();
                        activeMenutabContainer("inquiryContainer", true);
                      }}
                    >
                      {" "}
                      <i className="icon-call-in"></i> <span>Inquiry</span>{" "}
                    </a>{" "}
                    <ul className="collapse">
                      {" "}
                      <li className={activeKey === "inquiry" ? "active" : ""}>
                        {" "}
                        <Link to="inquiry">Inquiry List</Link>{" "}
                      </li>{" "}
                      <li
                        className={
                          activeKey === "createinquiry" ? "active" : ""
                        }
                      >
                        {" "}
                        <Link to="createinquiry">Create New</Link>{" "}
                      </li>{" "}
                    </ul>{" "}
                  </li>{" "}
                  <li className="" id="admissionContainer">
                    {" "}
                    <a
                      href="#!"
                      className="has-arrow"
                      onClick={(e) => {
                        e.preventDefault();
                        activeMenutabContainer("admissionContainer", true);
                      }}
                    >
                      {" "}
                      <i className="icon-graduation"></i> <span>Admission</span>{" "}
                    </a>{" "}
                    <ul className="collapse">
                      {" "}
                      <li
                        className={
                          activeKey === "totaladmission" ? "active" : ""
                        }
                      >
                        {" "}
                        <Link to="totaladmission">Total Admissions</Link>{" "}
                      </li>{" "}
                    </ul>{" "}
                  </li>{" "}
                  <li id="AppContainer" className="">
                    {" "}
                    <a
                      href="#!"
                      className="has-arrow"
                      onClick={(e) => {
                        e.preventDefault();
                        activeMenutabContainer("AppContainer", true);
                      }}
                    >
                      {" "}
                      <i className="icon-grid"></i> <span>Messages</span>{" "}
                    </a>{" "}
                    <ul className="collapse">
                      {" "}
                      <li
                        className={activeKey === "appchat" ? "active" : ""}
                        onClick={() => {}}
                      >
                        {" "}
                        <Link to="appchat">Chat</Link>{" "}
                      </li>{" "}
                      {/* <li className={activeKey === "appcontact" ? "active" : ""} onClick={() => {}} > <Link to="appcontact">Contact Card</Link> </li> */}{" "}
                    </ul>{" "}
                  </li>{" "}
                  {/* <li id="FileManagerContainer" className=""> <a href="#!" className="has-arrow" onClick={(e) => { e.preventDefault();   activeMenutabContainer("FileManagerContainer"); }} > <i className="icon-folder"></i>{" "} <span>File Manager</span> </a> <ul className="collapse"> <li className={ activeKey === "filemanagerdashboard" ? "active" : "" } onClick={() => {}} > <Link to="filemanagerdashboard">Dashboard</Link> </li> <li className={ activeKey === "filedocuments" ? "active" : "" } onClick={() => {}} > <Link to="filedocuments">Documents</Link> </li> </ul> </li> */}{" "}
                  <li className="" id="feesContainer">
                    {" "}
                    <a
                      href="#!"
                      className="has-arrow"
                      onClick={(e) => {
                        e.preventDefault();
                        activeMenutabContainer("feesContainer", true);
                      }}
                    >
                      {" "}
                      <i className="">
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-1"
                          style={{
                            height: "28px",
                            width: "26px",
                            marginTop: "-8px",
                          }}
                        >
                          {" "}
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />{" "}
                        </svg>{" "}
                      </i>{" "}
                      <span>Fees </span>{" "}
                    </a>{" "}
                    <ul className="collapse">
                      {" "}
                      <li className={activeKey === "fees" ? "active" : ""}>
                        {" "}
                        <Link to="fees">Fee Details</Link>{" "}
                      </li>{" "}
                    </ul>{" "}
                  </li>{" "}
                  <li className="" id="bankDetails">
                    {" "}
                    <a
                      href="#!"
                      className="has-arrow"
                      onClick={(e) => {
                        e.preventDefault();
                        activeMenutabContainer("bankDetails", true);
                      }}
                    >
                      {" "}
                      <i className="">
                        {" "}
                        <svg
                          stroke="currentColor"
                          className="size-1"
                          style={{
                            height: "26px",
                            width: "26px",
                            marginTop: "-8px",
                          }}
                          fill="currentColor"
                          strokeWidth="0"
                          viewBox="0 0 1024 1024"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {" "}
                          <path d="M894 462c30.9 0 43.8-39.7 18.7-58L530.8 126.2a31.81 31.81 0 0 0-37.6 0L111.3 404c-25.1 18.2-12.2 58 18.8 58H192v374h-72c-4.4 0-8 3.6-8 8v52c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-52c0-4.4-3.6-8-8-8h-72V462h62zM512 196.7l271.1 197.2H240.9L512 196.7zM264 462h117v374H264V462zm189 0h117v374H453V462zm307 374H642V462h118v374z"></path>{" "}
                        </svg>{" "}
                      </i>{" "}
                      <span>Bank Details</span>{" "}
                    </a>{" "}
                    <ul className="collapse">
                      {" "}
                      <li className={activeKey === "bankList" ? "active" : ""}>
                        {" "}
                        <Link to="bankList">Total Banks</Link>{" "}
                      </li>{" "}
                      <li
                        className={activeKey === "createBank" ? "active" : ""}
                      >
                        {" "}
                        <Link to="createBank">Add Bank</Link>{" "}
                      </li>{" "}
                    </ul>{" "}
                  </li>{" "}
                </ul>{" "}
              </Nav>{" "}
            </div>{" "}
            <div
              className={
                sideMenuTab[1]
                  ? "tab-pane p-l-15 p-r-15 show active"
                  : "tab-pane p-l-15 p-r-15"
              }
              id="Chat"
            >
              {" "}
              <form>
                {" "}
                <div className="input-group m-b-20">
                  {" "}
                  <div className="input-group-prepend">
                    {" "}
                    <span className="input-group-text">
                      {" "}
                      <i className="icon-magnifier"></i>{" "}
                    </span>{" "}
                  </div>{" "}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                  />{" "}
                </div>{" "}
              </form>{" "}
              <ul className="right_chat list-unstyled">
                {" "}
                <li className="online">
                  {" "}
                  <Link to="#">
                    {" "}
                    <div className="media">
                      {" "}
                      <img
                        className="media-object "
                        src={Avatar4}
                        alt=""
                      />{" "}
                      <div className="media-body">
                        {" "}
                        <span className="name">Chris Fox</span>{" "}
                        <span className="message">Designer, Blogger</span>{" "}
                        <span className="badge badge-outline status"></span>{" "}
                      </div>{" "}
                    </div>{" "}
                  </Link>{" "}
                </li>{" "}
                <li className="online">
                  {" "}
                  <Link to="#">
                    {" "}
                    <div className="media">
                      {" "}
                      <img
                        className="media-object "
                        src={Avatar5}
                        alt=""
                      />{" "}
                      <div className="media-body">
                        {" "}
                        <span className="name">Joge Lucky</span>{" "}
                        <span className="message">Java Developer</span>{" "}
                        <span className="badge badge-outline status"></span>{" "}
                      </div>{" "}
                    </div>{" "}
                  </Link>{" "}
                </li>{" "}
                <li className="offline">
                  {" "}
                  <Link to="#">
                    {" "}
                    <div className="media">
                      {" "}
                      <img
                        className="media-object "
                        src={Avatar2}
                        alt=""
                      />{" "}
                      <div className="media-body">
                        {" "}
                        <span className="name">Isabella</span>{" "}
                        <span className="message">CEO, Thememakker</span>{" "}
                        <span className="badge badge-outline status"></span>{" "}
                      </div>{" "}
                    </div>{" "}
                  </Link>{" "}
                </li>{" "}
                <li className="offline">
                  {" "}
                  <Link to="#">
                    {" "}
                    <div className="media">
                      {" "}
                      <img
                        className="media-object "
                        src={Avatar1}
                        alt=""
                      />{" "}
                      <div className="media-body">
                        {" "}
                        <span className="name">Folisise Chosielie</span>{" "}
                        <span className="message">
                          {" "}
                          Art director, Movie Cut{" "}
                        </span>{" "}
                        <span className="badge badge-outline status"></span>{" "}
                      </div>{" "}
                    </div>{" "}
                  </Link>{" "}
                </li>{" "}
                <li className="online">
                  {" "}
                  <Link to="#">
                    {" "}
                    <div className="media">
                      {" "}
                      <img
                        className="media-object "
                        src={Avatar3}
                        alt=""
                      />{" "}
                      <div className="media-body">
                        {" "}
                        <span className="name">Alexander</span>{" "}
                        <span className="message">Writter, Mag Editor</span>{" "}
                        <span className="badge badge-outline status"></span>{" "}
                      </div>{" "}
                    </div>{" "}
                  </Link>{" "}
                </li>{" "}
              </ul>{" "}
            </div>{" "}
            <div
              className={
                sideMenuTab[2]
                  ? "tab-pane p-l-15 p-r-15 show active"
                  : "tab-pane p-l-15 p-r-15"
              }
              id="setting"
            >
              {" "}
              <h6>Choose Mode</h6>{" "}
              <ul className="choose-skin list-unstyled">
                {" "}
                <li
                  data-theme="white"
                  className={
                    document.body.classList.contains("full-dark")
                      ? ""
                      : "active"
                  }
                  onClick={() => {
                    // setState({ somethi: false });
                    document.body.classList.remove("full-dark");
                  }}
                >
                  {" "}
                  <div className="white"></div> <span>Light</span>{" "}
                </li>{" "}
                <li
                  data-theme="black"
                  className={
                    document.body.classList.contains("full-dark")
                      ? "active"
                      : ""
                  }
                  onClick={() => {
                    // this.setState({ somethi: true });
                    document.body.classList.add("full-dark");
                  }}
                >
                  {" "}
                  <div className="black"></div> <span>Dark</span>{" "}
                </li>{" "}
              </ul>{" "}
              <hr /> <h6>Choose Skin</h6>{" "}
              <ul className="choose-skin list-unstyled">
                {" "}
                <li
                  data-theme="purple"
                  className={themeColor === "theme-purple" ? "active" : ""}
                >
                  {" "}
                  <div
                    className="purple"
                    onClick={() => {
                      if (themeColor !== "theme-purple") {
                        document.body.classList.remove(themeColor);
                      }
                      onPressThemeColor("purple");
                    }}
                  ></div>{" "}
                  <span>Purple</span>{" "}
                </li>{" "}
                <li
                  data-theme="blue"
                  className={themeColor === "theme-blue" ? "active" : ""}
                >
                  {" "}
                  <div
                    className="blue"
                    onClick={() => {
                      if (themeColor !== "theme-blue") {
                        document.body.classList.remove(themeColor);
                      }
                      onPressThemeColor("blue");
                    }}
                  ></div>{" "}
                  <span>Blue</span>{" "}
                </li>{" "}
                <li
                  data-theme="cyan"
                  className={themeColor === "theme-cyan" ? "active" : ""}
                >
                  {" "}
                  <div
                    className="cyan"
                    onClick={() => {
                      if (themeColor !== "theme-cyan") {
                        document.body.classList.remove(themeColor);
                      }
                      onPressThemeColor("cyan");
                    }}
                  ></div>{" "}
                  <span>Cyan</span>{" "}
                </li>{" "}
                <li
                  data-theme="green"
                  className={themeColor === "theme-green" ? "active" : ""}
                >
                  {" "}
                  <div
                    className="green"
                    onClick={() => {
                      if (themeColor !== "theme-green") {
                        document.body.classList.remove(themeColor);
                      }
                      onPressThemeColor("green");
                    }}
                  ></div>{" "}
                  <span>Green</span>{" "}
                </li>{" "}
                <li
                  data-theme="orange"
                  className={themeColor === "theme-orange" ? "active" : ""}
                >
                  {" "}
                  <div
                    className="orange"
                    onClick={() => {
                      if (themeColor !== "theme-orange") {
                        document.body.classList.remove(themeColor);
                      }
                      onPressThemeColor("orange");
                    }}
                  ></div>{" "}
                  <span>Orange</span>{" "}
                </li>{" "}
                <li
                  data-theme="blush"
                  className={themeColor === "theme-blush" ? "active" : ""}
                >
                  {" "}
                  <div
                    className="blush"
                    onClick={() => {
                      if (themeColor !== "theme-blush") {
                        document.body.classList.remove(themeColor);
                      }
                      onPressThemeColor("blush");
                    }}
                  ></div>{" "}
                  <span>Blush</span>{" "}
                </li>{" "}
              </ul>{" "}
              <hr /> <h6>General Settings</h6>{" "}
              <ul className="setting-list list-unstyled">
                {" "}
                <li>
                  {" "}
                  <label className="fancy-checkbox">
                    {" "}
                    <input type="checkbox" name="checkbox" />{" "}
                    <span>Report Panel Usag</span>{" "}
                  </label>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <label className="fancy-checkbox">
                    {" "}
                    <input type="checkbox" name="checkbox" />{" "}
                    <span>Email Redirect</span>{" "}
                  </label>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <label className="fancy-checkbox">
                    {" "}
                    <input type="checkbox" name="checkbox" />{" "}
                    <span>Notifications</span>{" "}
                  </label>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <label className="fancy-checkbox">
                    {" "}
                    <input type="checkbox" name="checkbox" />{" "}
                    <span>Auto Updates</span>{" "}
                  </label>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <label className="fancy-checkbox">
                    {" "}
                    <input type="checkbox" name="checkbox" />{" "}
                    <span>Offline</span>{" "}
                  </label>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <label className="fancy-checkbox">
                    {" "}
                    <input type="checkbox" name="checkbox" />{" "}
                    <span>Location Permission</span>{" "}
                  </label>{" "}
                </li>{" "}
              </ul>{" "}
            </div>{" "}
            <div
              className={
                sideMenuTab[3]
                  ? "tab-pane p-l-15 p-r-15 show active"
                  : "tab-pane p-l-15 p-r-15"
              }
              id="question"
            >
              {" "}
              <form>
                {" "}
                <div className="input-group">
                  {" "}
                  <div className="input-group-prepend">
                    {" "}
                    <span className="input-group-text">
                      {" "}
                      <i className="icon-magnifier"></i>{" "}
                    </span>{" "}
                  </div>{" "}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                  />{" "}
                </div>{" "}
              </form>{" "}
              <ul className="list-unstyled question">
                {" "}
                <li className="menu-heading">HOW-TO</li>{" "}
                <li>
                  {" "}
                  <a
                    href="#!"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    {" "}
                    How to Create Campaign{" "}
                  </a>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <a
                    href="#!"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    {" "}
                    Boost Your Sales{" "}
                  </a>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <a
                    href="#!"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    {" "}
                    Website Analytics{" "}
                  </a>{" "}
                </li>{" "}
                <li className="menu-heading">ACCOUNT</li>{" "}
                <li>
                  {" "}
                  <a
                    href="registration"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    {" "}
                    Cearet New Account{" "}
                  </a>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <a
                    href="forgotpassword"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    {" "}
                    Change Password?{" "}
                  </a>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <a
                    href="#!"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    {" "}
                    Privacy &amp; Policy{" "}
                  </a>{" "}
                </li>{" "}
                <li className="menu-heading">BILLING</li>{" "}
                <li>
                  {" "}
                  <a
                    href="#!"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    {" "}
                    Payment info{" "}
                  </a>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <a
                    href="#!"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    {" "}
                    Auto-Renewal{" "}
                  </a>{" "}
                </li>{" "}
                <li className="menu-button m-t-30">
                  {" "}
                  <a
                    href="#!"
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    {" "}
                    <i className="icon-question"></i> Need Help?{" "}
                  </a>{" "}
                </li>{" "}
              </ul>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

NavbarMenu.propTypes = {
  addClassactive: PropTypes.array.isRequired,
  addClassactiveChild: PropTypes.array.isRequired,
  addClassactiveChildApp: PropTypes.array.isRequired,
  addClassactiveChildFM: PropTypes.array.isRequired,
  addClassactiveChildBlog: PropTypes.array.isRequired,
  addClassactiveChildUI: PropTypes.array.isRequired,
  addClassactiveChildWidgets: PropTypes.array.isRequired,
  addClassactiveChildAuth: PropTypes.array.isRequired,
  addClassactiveChildPages: PropTypes.array.isRequired,
  addClassactiveChildForms: PropTypes.array.isRequired,
  addClassactiveChildTables: PropTypes.array.isRequired,
  addClassactiveChildChart: PropTypes.array.isRequired,
  addClassactiveChildMaps: PropTypes.array.isRequired,
  themeColor: PropTypes.string.isRequired,
  toastMessage: PropTypes.string.isRequired,
  generalSetting: PropTypes.array.isRequired,
  toggleNotification: PropTypes.bool.isRequired,
  toggleEqualizer: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ navigationReducer }) => {
  const {
    addClassactive,
    addClassactiveChild,
    addClassactiveChildApp,
    addClassactiveChildFM,
    addClassactiveChildBlog,
    addClassactiveChildUI,
    addClassactiveChildWidgets,
    addClassactiveChildAuth,
    addClassactiveChildPages,
    addClassactiveChildForms,
    addClassactiveChildTables,
    addClassactiveChildChart,
    addClassactiveChildMaps,
    themeColor,
    generalSetting,
    toggleNotification,
    toggleEqualizer,
    menuProfileDropdown,
    sideMenuTab,
    isToastMessage,
    toastMessage,
  } = navigationReducer;
  return {
    addClassactive,
    addClassactiveChild,
    addClassactiveChildApp,
    addClassactiveChildFM,
    addClassactiveChildBlog,
    addClassactiveChildUI,
    addClassactiveChildWidgets,
    addClassactiveChildAuth,
    addClassactiveChildPages,
    addClassactiveChildForms,
    addClassactiveChildTables,
    addClassactiveChildChart,
    addClassactiveChildMaps,
    themeColor,
    generalSetting,
    toggleNotification,
    toggleEqualizer,
    menuProfileDropdown,
    sideMenuTab,
    isToastMessage,
    toastMessage,
  };
};

export default connect(mapStateToProps, {
  onPressDashbord,
  onPressDashbordChild,
  onPressThemeColor,
  onPressGeneralSetting,
  onPressNotification,
  onPressEqualizer,
  onPressSideMenuToggle,
  onPressMenuProfileDropdown,
  onPressSideMenuTab,
  tostMessageLoad,
})(NavbarMenu);
