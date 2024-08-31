import React from "react";
import { Dropdown, Nav, Toast } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
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
import Logo from "../assets/images/logo.svg";
import LogoWhite from "../assets/images/logo-white.svg";
import UserImage from "../assets/images/user.png";
import Avatar4 from "../assets/images/xs/avatar4.jpg";
import Avatar5 from "../assets/images/xs/avatar5.jpg";
import Avatar2 from "../assets/images/xs/avatar2.jpg";
import Avatar1 from "../assets/images/xs/avatar1.jpg";
import Avatar3 from "../assets/images/xs/avatar3.jpg";
import Logout from "../screens/Logout";

class NavbarMenu extends React.Component {
  state = {
    linkupdate: false,
  };
  componentDidMount() {
    this.props.tostMessageLoad(true);
    const { activeKey } = this.props;
    this.activeMenutabwhenNavigate("/" + activeKey);
  }

  activeMenutabwhenNavigate(activeKey) {
    if (
      activeKey === "/dashboard" ||
      activeKey === "/demographic" ||
      activeKey === "/ioT"
    ) {
      this.activeMenutabContainer("dashboradContainer");
    } else if (
      activeKey === "/appinbox" ||
      activeKey === "/appchat" ||
      activeKey === "/appcalendar" ||
      activeKey === "/appcontact" ||
      activeKey === "/apptaskbar"
    ) {
      this.activeMenutabContainer("AppContainer");
    } else if (
      activeKey === "/filemanagerdashboard" ||
      activeKey === "/filedocuments" ||
      activeKey === "/filemedia"
    ) {
      this.activeMenutabContainer("FileManagerContainer");
    } else if (
      activeKey === "/blognewpost" ||
      activeKey === "/bloglist" ||
      activeKey === "/blogdetails"
    ) {
      this.activeMenutabContainer("BlogContainer");
    } else if (
      activeKey === "/uitypography" ||
      activeKey === "/uitabs" ||
      activeKey === "/uibuttons" ||
      activeKey === "/bootstrapui" ||
      activeKey === "/uiicons" ||
      activeKey === "/uinotifications" ||
      activeKey === "/uicolors" ||
      activeKey === "/uilistgroup" ||
      activeKey === "/uimediaobject" ||
      activeKey === "/uimodal" ||
      activeKey === "/uiprogressbar"
    ) {
      this.activeMenutabContainer("UIElementsContainer");
    } else if (
      activeKey === "/widgetsdata" ||
      activeKey === "/widgetsweather" ||
      activeKey === "/widgetsblog" ||
      activeKey === "/widgetsecommers"
    ) {
      this.activeMenutabContainer("WidgetsContainer");
    } else if (activeKey === "/login") {
      this.activeMenutabContainer("WidgetsContainer");
    } else if (
      activeKey === "/teamsboard" ||
      activeKey === "/profilev2page" ||
      activeKey === "/helperclass" ||
      activeKey === "/searchresult" ||
      activeKey === "/invoicesv2" ||
      activeKey === "/invoices" ||
      activeKey === "/pricing" ||
      activeKey === "/timeline" ||
      activeKey === "/profilev1page" ||
      activeKey === "/blankpage" ||
      activeKey === "/imagegalleryprofile" ||
      activeKey === "/projectslist" ||
      activeKey === "/maintanance" ||
      activeKey === "/testimonials" ||
      activeKey === "/faqs"
    ) {
      this.activeMenutabContainer("PagesContainer");
    } else if (
      activeKey === "/formvalidation" ||
      activeKey === "/basicelements"
    ) {
      this.activeMenutabContainer("FormsContainer");
    } else if (activeKey === "/tablenormal") {
      this.activeMenutabContainer("TablesContainer");
    } else if (activeKey === "/echart") {
      this.activeMenutabContainer("chartsContainer");
    } else if (activeKey === "/leafletmap") {
      this.activeMenutabContainer("MapsContainer");
    }
  }

  activeMenutabContainer(id) {
    var parents = document.getElementById("main-menu");
    var activeMenu = document.getElementById(id);

    for (let index = 0; index < parents.children.length; index++) {
      if (parents.children[index].id !== id) {
        parents.children[index].classList.remove("active");
        parents.children[index].children[1].classList.remove("in");
      }
    }
    setTimeout(() => {
      activeMenu.classList.toggle("active");
      activeMenu.children[1].classList.toggle("in");
    }, 10);
  }
  render() {
    const {
      addClassactive,
      addClassactiveChildAuth,
      addClassactiveChildMaps,
      themeColor,
      toggleNotification,
      toggleEqualizer,
      sideMenuTab,
      isToastMessage,
      activeKey,
      toastMessage,
    } = this.props;
    document.body.classList.add(themeColor);
    const handleLogout = () => {
      const isLogout = this.props.history.push("/login");
    };
    return (
      <div>
        {isToastMessage ? (
          <Toast
            id="toast-container"
            show={isToastMessage}
            onClose={() => {
              this.props.tostMessageLoad(false);
            }}
            className="toast-info toast-top-right"
            autohide={true}
            delay={5000}
          >
            <Toast.Header className="mb-0 toast-info justify-content-between">
              <strong className="me-auto">
                {toastMessage ? toastMessage : "Welcome to RR Overseas"}
              </strong>
            </Toast.Header>
          </Toast>
        ) : null}
        <nav className="navbar navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-btn">
              <button
                className="btn-toggle-offcanvas"
                onClick={() => {
                  this.props.onPressSideMenuToggle();
                }}
              >
                <i className="lnr lnr-menu fa fa-bars"></i>
              </button>
            </div>

            <div className="navbar-brand">
              <a href="dashboard">
                <img
                  src={
                    document.body.classList.contains("full-dark")
                      ? LogoWhite
                      : Logo
                  }
                  alt="Lucid Logo"
                  className="img-responsive logo"
                />
              </a>
            </div>

            <div className="navbar-right">
              <form id="navbar-search" className="navbar-form search-form">
                <input
                  className="form-control"
                  placeholder="Search here..."
                  type="text"
                />
                <button type="button" className="btn btn-default">
                  <i className="icon-magnifier"></i>
                </button>
              </form>

              <div id="navbar-menu">
                <ul className="nav navbar-nav">
                  {/* <li>
                    <Link
                      to="/filedocuments"
                      className="icon-menu d-none d-sm-block d-md-none d-lg-block"
                    >
                      <i className="fa fa-folder-open-o"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="appcalendar"
                      className="icon-menu d-none d-sm-block d-md-none d-lg-block"
                    >
                      <i className="icon-calendar"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="appchat" className="icon-menu d-none d-sm-block">
                      <i className="icon-bubbles"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="appinbox" className="icon-menu d-none d-sm-block">
                      <i className="icon-envelope"></i>
                      <span className="notification-dot"></span>
                    </Link>
                  </li> */}
                  {/* <li
                    className={
                      toggleNotification ? "show dropdown" : "dropdown"
                    }
                  >
                    <a
                      href="#!"
                      className="dropdown-toggle icon-menu"
                      data-toggle="dropdown"
                      onClick={(e) => {
                        e.preventDefault();
                        this.props.onPressNotification();
                      }}
                    >
                      <i className="icon-bell"></i>
                      <span className="notification-dot"></span>
                    </a>
                    <ul
                      className={
                        toggleNotification
                          ? "dropdown-menu notifications show"
                          : "dropdown-menu notifications"
                      }
                    >
                      <li className="header">
                        <strong>You have 4 new Notifications</strong>
                      </li>
                      <li>
                        <Link to="#">
                          <div className="media">
                            <div className="media-left">
                              <i className="icon-info text-warning"></i>
                            </div>
                            <div className="media-body">
                              <p className="text">
                                Campaign <strong>Holiday Sale</strong> is nearly
                                reach budget limit.
                              </p>
                              <span className="timestamp">10:00 AM Today</span>
                            </div>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <div className="media">
                            <div className="media-left">
                              <i className="icon-like text-success"></i>
                            </div>
                            <div className="media-body">
                              <p className="text">
                                Your New Campaign <strong>Holiday Sale</strong>{" "}
                                is approved.
                              </p>
                              <span className="timestamp">11:30 AM Today</span>
                            </div>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <div className="media">
                            <div className="media-left">
                              <i className="icon-pie-chart text-info"></i>
                            </div>
                            <div className="media-body">
                              <p className="text">
                                Website visits from Twitter is 27% higher than
                                last week.
                              </p>
                              <span className="timestamp">04:00 PM Today</span>
                            </div>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <div className="media">
                            <div className="media-left">
                              <i className="icon-info text-danger"></i>
                            </div>
                            <div className="media-body">
                              <p className="text">
                                Error on website analytics configurations
                              </p>
                              <span className="timestamp">Yesterday</span>
                            </div>
                          </div>
                        </Link>
                      </li>
                      <li className="footer">
                        <Link to="#" className="more">
                          See all notifications
                        </Link>
                      </li>
                    </ul>
                  </li> */}
                  <li
                    className={toggleEqualizer ? "show dropdown" : "dropdown"}
                  >
                    <a
                      href="#!"
                      className="dropdown-toggle icon-menu"
                      data-toggle="dropdown"
                      onClick={(e) => {
                        e.preventDefault();
                        this.props.onPressEqualizer();
                      }}
                    >
                      <i className="icon-equalizer"></i>
                    </a>
                    {/* <ul
                      className={
                        toggleEqualizer
                          ? "dropdown-menu user-menu menu-icon show"
                          : "dropdown-menu user-menu menu-icon"
                      }
                    >
                      <li className="menu-heading">ACCOUNT SETTINGS</li>
                      <li>
                        <Link to="#">
                          <i className="icon-note"></i> <span>Basic</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <i className="icon-equalizer"></i>{" "}
                          <span>Preferences</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <i className="icon-lock"></i> <span>Privacy</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <i className="icon-bell"></i>{" "}
                          <span>Notifications</span>
                        </Link>
                      </li>
                      <li className="menu-heading">BILLING</li>
                      <li>
                        <Link to="#">
                          <i className="icon-credit-card"></i>{" "}
                          <span>Payments</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <i className="icon-printer"></i> <span>Invoices</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <i className="icon-refresh"></i> <span>Renewals</span>
                        </Link>
                      </li>
                    </ul> */}
                  </li>
                  <li>
                    <Logout history={this.props.history} />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        <div id="left-sidebar" className="sidebar" style={{ zIndex: 9 }}>
          <div className="sidebar-scroll">
            <div className="user-account">
              <img
                src={UserImage}
                className="rounded-circle user-photo"
                alt="User Profile"
              />

              <Dropdown>
                <span>Welcome,</span>
                <Dropdown.Toggle
                  variant="none"
                  as="a"
                  id="dropdown-basic"
                  className="user-name"
                >
                  <strong>Alizee Thomas</strong>
                </Dropdown.Toggle>

                {/* <Dropdown.Menu className="dropdown-menu-right account">
                  <Dropdown.Item as="div">
                    <Link to="/profilev2page" className="dropdown-item">
                      <i className="icon-user"></i> My Profile
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item as="div">
                    <Link to="/appinbox" className="dropdown-item">
                      <i className="icon-envelope-open"></i> Messages
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item as="div">
                    <Link to="/settings" className="dropdown-item">
                      <i className="icon-settings"></i> Settings
                    </Link>
                  </Dropdown.Item>
                  <li className="divider"></li>
                  <Dropdown.Item as="div">
                    <button onClick={handleLogout} className="dropdown-item">
                      <i className="icon-power"></i> Logout
                    </button>
                  </Dropdown.Item>
                </Dropdown.Menu> */}
              </Dropdown>
            </div>
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <Link
                  to="#"
                  className={sideMenuTab[0] ? "nav-link active" : "nav-link"}
                  data-toggle="tab"
                  onClick={() => {
                    this.props.onPressSideMenuTab(0);
                  }}
                >
                  Menu
                </Link>
              </li>
            </ul>
            <div className="tab-content p-l-0 p-r-0">
              <div
                className={sideMenuTab[0] ? "tab-pane active show" : "tab-pane"}
                id="menu"
              >
                <Nav id="left-sidebar-nav" className="sidebar-nav">
                  <ul id="main-menu" className="metismenu">
                    <li className="" id="dashboradContainer">
                      <a
                        href="#!"
                        className="has-arrow"
                        onClick={(e) => {
                          e.preventDefault();
                          this.activeMenutabContainer("dashboradContainer");
                        }}
                      >
                        <i className="icon-home"></i> <span>Dashboard</span>
                      </a>
                      <ul className="collapse">
                        <li
                          className={activeKey === "dashboard" ? "active" : ""}
                        >
                          <Link to="dashboard">Analytical</Link>
                        </li>
                      </ul>
                    </li>
                    <li className="" id="inquiryContainer">
                      <a
                        href="#!"
                        className="has-arrow"
                        onClick={(e) => {
                          e.preventDefault();
                          this.activeMenutabContainer("inquiryContainer");
                        }}
                      >
                        <i className="icon-call-in"></i> <span>Inquiry</span>
                      </a>
                      <ul className="collapse">
                        <li className={activeKey === "inquiry" ? "active" : ""}>
                          <Link to="inquiry">Inquiry List</Link>
                        </li>
                        <li
                          className={
                            activeKey === "createinquiry" ? "active" : ""
                          }
                        >
                          <Link to="createinquiry">Create New</Link>
                        </li>
                      </ul>
                    </li>
                    <li className="" id="admissionContainer">
                      <a
                        href="#!"
                        className="has-arrow"
                        onClick={(e) => {
                          e.preventDefault();
                          this.activeMenutabContainer("admissionContainer");
                        }}
                      >
                        <i className="icon-graduation"></i>{" "}
                        <span>Admission</span>
                      </a>
                      <ul className="collapse">
                        <li
                          className={activeKey === "admission" ? "active" : ""}
                        >
                          <Link to="admission">Admission</Link>
                        </li>
                        <li
                          className={
                            activeKey === "totaladmission" ? "active" : ""
                          }
                        >
                          <Link to="totaladmission">Total Admissions</Link>
                        </li>
                      </ul>
                    </li>
                    <li id="AppContainer" className="">
                      <a
                        href="#!"
                        className="has-arrow"
                        onClick={(e) => {
                          e.preventDefault();
                          this.activeMenutabContainer("AppContainer");
                        }}
                      >
                        <i className="icon-grid"></i> <span>Messages</span>
                      </a>
                      <ul className="collapse">
                        <li
                          className={activeKey === "appchat" ? "active" : ""}
                          onClick={() => {}}
                        >
                          <Link to="appchat">Chat</Link>
                        </li>

                        <li
                          className={activeKey === "appcontact" ? "active" : ""}
                          onClick={() => {}}
                        >
                          <Link to="appcontact">Contact Card</Link>
                        </li>
                      </ul>
                    </li>
                    <li id="FileManagerContainer" className="">
                      <a
                        href="#!"
                        className="has-arrow"
                        onClick={(e) => {
                          e.preventDefault();
                          this.activeMenutabContainer("FileManagerContainer");
                        }}
                      >
                        <i className="icon-folder"></i>{" "}
                        <span>File Manager</span>
                      </a>
                      <ul className="collapse">
                        <li
                          className={
                            activeKey === "filemanagerdashboard" ? "active" : ""
                          }
                          onClick={() => {}}
                        >
                          <Link to="filemanagerdashboard">Dashboard</Link>
                        </li>
                        <li
                          className={
                            activeKey === "filedocuments" ? "active" : ""
                          }
                          onClick={() => {}}
                        >
                          <Link to="filedocuments">Documents</Link>
                        </li>
                      </ul>
                    </li>

                    <li className="" id="feesContainer">
                      <a
                        href="#!"
                        className="has-arrow"
                        onClick={(e) => {
                          e.preventDefault();
                          this.activeMenutabContainer("feesContainer");
                        }}
                      >
                        <i className="">
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
                            }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          </svg>
                        </i>{" "}
                        <span>Fees </span>
                      </a>
                      <ul className="collapse">
                        <li className={activeKey === "fees" ? "active" : ""}>
                          <Link to="fees">Fee Details</Link>
                        </li>
                      </ul>
                    </li>
                    <li className="" id="bankDetails">
                      <a
                        href="#!"
                        className="has-arrow"
                        onClick={(e) => {
                          e.preventDefault();
                          this.activeMenutabContainer("bankDetails");
                        }}
                      >
                        <i className="">
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
                            }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          </svg>
                        </i>{" "}
                        <span>Bank Details</span>
                      </a>
                      <ul className="collapse">
                        <li
                          className={activeKey === "bankList" ? "active" : ""}
                        >
                          <Link to="bankList">Total Banks</Link>
                        </li>
                        <li
                          className={activeKey === "createBank" ? "active" : ""}
                        >
                          <Link to="createBank">Add Bank</Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </Nav>
              </div>
              <div
                className={
                  sideMenuTab[1]
                    ? "tab-pane p-l-15 p-r-15 show active"
                    : "tab-pane p-l-15 p-r-15"
                }
                id="Chat"
              >
                <form>
                  <div className="input-group m-b-20">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="icon-magnifier"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search..."
                    />
                  </div>
                </form>
                <ul className="right_chat list-unstyled">
                  <li className="online">
                    <Link to="#">
                      <div className="media">
                        <img className="media-object " src={Avatar4} alt="" />
                        <div className="media-body">
                          <span className="name">Chris Fox</span>
                          <span className="message">Designer, Blogger</span>
                          <span className="badge badge-outline status"></span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="online">
                    <Link to="#">
                      <div className="media">
                        <img className="media-object " src={Avatar5} alt="" />
                        <div className="media-body">
                          <span className="name">Joge Lucky</span>
                          <span className="message">Java Developer</span>
                          <span className="badge badge-outline status"></span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="offline">
                    <Link to="#">
                      <div className="media">
                        <img className="media-object " src={Avatar2} alt="" />
                        <div className="media-body">
                          <span className="name">Isabella</span>
                          <span className="message">CEO, Thememakker</span>
                          <span className="badge badge-outline status"></span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="offline">
                    <Link to="#">
                      <div className="media">
                        <img className="media-object " src={Avatar1} alt="" />
                        <div className="media-body">
                          <span className="name">Folisise Chosielie</span>
                          <span className="message">
                            Art director, Movie Cut
                          </span>
                          <span className="badge badge-outline status"></span>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li className="online">
                    <Link to="#">
                      <div className="media">
                        <img className="media-object " src={Avatar3} alt="" />
                        <div className="media-body">
                          <span className="name">Alexander</span>
                          <span className="message">Writter, Mag Editor</span>
                          <span className="badge badge-outline status"></span>
                        </div>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
              <div
                className={
                  sideMenuTab[2]
                    ? "tab-pane p-l-15 p-r-15 show active"
                    : "tab-pane p-l-15 p-r-15"
                }
                id="setting"
              >
                <h6>Choose Mode</h6>
                <ul className="choose-skin list-unstyled">
                  <li
                    data-theme="white"
                    className={
                      document.body.classList.contains("full-dark")
                        ? ""
                        : "active"
                    }
                    onClick={() => {
                      this.setState({ somethi: false });
                      document.body.classList.remove("full-dark");
                    }}
                  >
                    <div className="white"></div>
                    <span>Light</span>
                  </li>
                  <li
                    data-theme="black"
                    className={
                      document.body.classList.contains("full-dark")
                        ? "active"
                        : ""
                    }
                    onClick={() => {
                      this.setState({ somethi: true });
                      document.body.classList.add("full-dark");
                    }}
                  >
                    <div className="black"></div>
                    <span>Dark</span>
                  </li>
                </ul>
                <hr />
                <h6>Choose Skin</h6>
                <ul className="choose-skin list-unstyled">
                  <li
                    data-theme="purple"
                    className={themeColor === "theme-purple" ? "active" : ""}
                  >
                    <div
                      className="purple"
                      onClick={() => {
                        if (themeColor !== "theme-purple") {
                          document.body.classList.remove(themeColor);
                        }
                        this.props.onPressThemeColor("purple");
                      }}
                    ></div>
                    <span>Purple</span>
                  </li>
                  <li
                    data-theme="blue"
                    className={themeColor === "theme-blue" ? "active" : ""}
                  >
                    <div
                      className="blue"
                      onClick={() => {
                        if (themeColor !== "theme-blue") {
                          document.body.classList.remove(themeColor);
                        }
                        this.props.onPressThemeColor("blue");
                      }}
                    ></div>
                    <span>Blue</span>
                  </li>
                  <li
                    data-theme="cyan"
                    className={themeColor === "theme-cyan" ? "active" : ""}
                  >
                    <div
                      className="cyan"
                      onClick={() => {
                        if (themeColor !== "theme-cyan") {
                          document.body.classList.remove(themeColor);
                        }
                        this.props.onPressThemeColor("cyan");
                      }}
                    ></div>
                    <span>Cyan</span>
                  </li>
                  <li
                    data-theme="green"
                    className={themeColor === "theme-green" ? "active" : ""}
                  >
                    <div
                      className="green"
                      onClick={() => {
                        if (themeColor !== "theme-green") {
                          document.body.classList.remove(themeColor);
                        }
                        this.props.onPressThemeColor("green");
                      }}
                    ></div>
                    <span>Green</span>
                  </li>
                  <li
                    data-theme="orange"
                    className={themeColor === "theme-orange" ? "active" : ""}
                  >
                    <div
                      className="orange"
                      onClick={() => {
                        if (themeColor !== "theme-orange") {
                          document.body.classList.remove(themeColor);
                        }
                        this.props.onPressThemeColor("orange");
                      }}
                    ></div>
                    <span>Orange</span>
                  </li>
                  <li
                    data-theme="blush"
                    className={themeColor === "theme-blush" ? "active" : ""}
                  >
                    <div
                      className="blush"
                      onClick={() => {
                        if (themeColor !== "theme-blush") {
                          document.body.classList.remove(themeColor);
                        }
                        this.props.onPressThemeColor("blush");
                      }}
                    ></div>
                    <span>Blush</span>
                  </li>
                </ul>
                <hr />
                <h6>General Settings</h6>
                <ul className="setting-list list-unstyled">
                  <li>
                    <label className="fancy-checkbox">
                      <input type="checkbox" name="checkbox" />
                      <span>Report Panel Usag</span>
                    </label>
                  </li>
                  <li>
                    <label className="fancy-checkbox">
                      <input type="checkbox" name="checkbox" />
                      <span>Email Redirect</span>
                    </label>
                  </li>
                  <li>
                    <label className="fancy-checkbox">
                      <input type="checkbox" name="checkbox" />
                      <span>Notifications</span>
                    </label>
                  </li>
                  <li>
                    <label className="fancy-checkbox">
                      <input type="checkbox" name="checkbox" />
                      <span>Auto Updates</span>
                    </label>
                  </li>
                  <li>
                    <label className="fancy-checkbox">
                      <input type="checkbox" name="checkbox" />
                      <span>Offline</span>
                    </label>
                  </li>
                  <li>
                    <label className="fancy-checkbox">
                      <input type="checkbox" name="checkbox" />
                      <span>Location Permission</span>
                    </label>
                  </li>
                </ul>
              </div>
              <div
                className={
                  sideMenuTab[3]
                    ? "tab-pane p-l-15 p-r-15 show active"
                    : "tab-pane p-l-15 p-r-15"
                }
                id="question"
              >
                <form>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="icon-magnifier"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search..."
                    />
                  </div>
                </form>
                <ul className="list-unstyled question">
                  <li className="menu-heading">HOW-TO</li>
                  <li>
                    <a
                      href="#!"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      How to Create Campaign
                    </a>
                  </li>
                  <li>
                    <a
                      href="#!"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      Boost Your Sales
                    </a>
                  </li>
                  <li>
                    <a
                      href="#!"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      Website Analytics
                    </a>
                  </li>
                  <li className="menu-heading">ACCOUNT</li>
                  <li>
                    <a
                      href="registration"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      Cearet New Account
                    </a>
                  </li>
                  <li>
                    <a
                      href="forgotpassword"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      Change Password?
                    </a>
                  </li>
                  <li>
                    <a
                      href="#!"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      Privacy &amp; Policy
                    </a>
                  </li>
                  <li className="menu-heading">BILLING</li>
                  <li>
                    <a
                      href="#!"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      Payment info
                    </a>
                  </li>
                  <li>
                    <a
                      href="#!"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      Auto-Renewal
                    </a>
                  </li>
                  <li className="menu-button m-t-30">
                    <a
                      href="#!"
                      className="btn btn-primary"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <i className="icon-question"></i> Need Help?
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

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
