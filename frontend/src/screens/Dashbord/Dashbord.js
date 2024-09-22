import React from "react";
import { connect } from "react-redux";
import ReactEcharts from "echarts-for-react";
import { Link } from "react-router-dom";
import "echarts-gl";
import echarts from "echarts";
import LogoiCON from "../../assets/images/logo-icon.svg";
import AwsomeImage from "../../assets/images/blog/blog-page-4.jpg";
import AwsomeImageOt from "../../assets/images/blog/blog-page-2.jpg";
import { Dropdown } from "react-bootstrap";
import ReferralsCard from "../../components/Dashboard/ReferralsCard";
import PageHeader from "../../components/PageHeader";
import {
  topProductOption,
  topRevenueOption,
  topRevenueMonthlyOption,
  saleGaugeOption,
  dataManagetOption,
  sparkleCardData,
} from "../../Data/DashbordData";
import {
  toggleMenuArrow,
  onPressTopProductDropDown,
  loadSparcleCard,
  onPressReferralsDropDown,
  onPressRecentChatDropDown,
  onPressDataManagedDropDown,
  facebookProgressBar,
  twitterProgressBar,
  affiliatesProgressBar,
  searchProgressBar,
} from "../../actions";

class Dashbord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardData: [],
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    // this.loadDataCard();
    // this.setState({
    //   cardData: [...sparkleCardData],
    // });

    // this.chartPlace();
  }

  // chartPlace = () => {
  //   var chartDom = document.getElementById("topsaleDonut");
  //   var myChart = echarts.init(chartDom);
  //   var option;
  //   option = saleGaugeOption;

  //   option && myChart.setOption(option);
  // };
  // async loadDataCard() {
  //   const { cardData } = this.state;
  //   var allCardData = cardData;
  //   cardData.map((data, i) => {
  //     var uData = [];
  //     data.sparklineData.data.map((d, j) => {
  //       return (uData[j] = Math.floor(Math.random() * 10) + 1);
  //     });
  //     return (allCardData[i].sparklineData.data = [...uData]);
  //   });
  //   return this.setState({ cardData: [...allCardData] });
  // }

  render() {
    const { loadingPage } = this.props;
    const { cardData } = this.state;
    if (loadingPage) {
      return (
        <div className="page-loader-wrapper">
          <div className="loader">
            <div className="m-t-30">
              <img src={LogoiCON} width="48" height="48" alt="Lucid" />
            </div>
            <p>Please wait...</p>
          </div>
        </div>
      );
    }
    return (
      <div
        onClick={() => {
          document.body.classList.remove("offcanvas-active");
        }}
      >
        <div>
          <div className="container-fluid">
            <PageHeader
              HeaderText="Dashboard"
              Breadcrumb={[{ name: "Dashboard" }]}
            />
              {/* <div className="clearfix row">
                <div className="col-lg-6 col-md-12">
                  <div className="card">
                    <div className="header">
                      <h2>Top Countries</h2>
                      <Dropdown as="ul" className="header-dropdown">
                        <Dropdown.Toggle
                          variant="success"
                          as="li"
                          id="dropdown-basic"
                        >
                          <Dropdown.Menu
                            as="ul"
                            className="dropdown-menu dropdown-menu-right"
                          >
                            <li>
                              <Link to="#">Action</Link>
                            </li>
                            <li>
                              <Link to="#">Another Action</Link>
                            </li>
                            <li>
                              <Link to="#">Something else</Link>
                            </li>
                          </Dropdown.Menu>
                        </Dropdown.Toggle>
                      </Dropdown>
                    </div>
                    <div className="body">
                      <ReactEcharts
                        option={topProductOption}
                        opts={{ renderer: "svg" }} // use svg to render the chart.
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <ReferralsCard />
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="card">
                    <div className="header">
                      <h2>Total OverView</h2>
                      <Dropdown as="ul" className="header-dropdown">
                        <Dropdown.Toggle
                          variant="success"
                          as="li"
                          id="dropdown-basic"
                        >
                          <Dropdown.Menu
                            as="ul"
                            className="dropdown-menu dropdown-menu-right"
                          >
                            <li>
                              <Link to="#">Action</Link>
                            </li>
                            <li>
                              <Link to="#">Another Action</Link>
                            </li>
                            <li>
                              <Link to="#">Something else</Link>
                            </li>
                          </Dropdown.Menu>
                        </Dropdown.Toggle>
                      </Dropdown>
                    </div>
                    <div className="text-center body">
                      <h4 className="margin-0">Total Overview</h4>
                      <div
                        id="topsaleDonut"
                        style={{ height: 125, width: "100%" }}
                      ></div>
                      <ReactEcharts
                        option={topRevenueOption}
                        opts={{ renderer: "svg" }}
                        style={{
                          height: "35px",
                          marginLeft: "35%",
                          marginRight: "35%",
                          bottom: 0,
                          top: 0,
                        }} // use svg to render the chart.
                      />
                      <h6 className="p-b-15">Weekly</h6>
                      <div className="sparkline">
                        <ReactEcharts
                          option={topRevenueMonthlyOption}
                          opts={{ renderer: "svg" }} // use svg to render the chart.
                          style={{
                            height: "35px",
                            marginLeft: "25%",
                            marginRight: "25%",
                            bottom: 0,
                            top: 0,
                          }}
                        />
                      </div>
                      <h6>Monthly </h6>
                    </div>
                  </div>
                </div>
              </div>

              <div className="clearfix row">
                <div className="col-lg-4 col-md-12">
                  <div className="card overflowhidden">
                    <div className="body top_counter bg-success">
                      <div className="bg-transparent icon">
                        <img
                          src={require("../../assets/images/xs/avatar2.jpg")}
                          className="rounded-circle"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="body">
                      <div className="list-group list-widget">
                        <Link to="#" className="list-group-item">
                          <span className="badge badge-success">654</span>
                          <i className="fa fa-envelope text-muted"></i>Inbox
                        </Link>
                        <Link to="#" className="list-group-item">
                          <span className="badge badge-info">364</span>
                          <i className="fa fa-eye text-muted"></i> Profile visits
                        </Link>
                        <Link to="#" className="list-group-item">
                          <span className="badge badge-warning">19</span>
                          <i className="fa fa-bookmark text-muted"></i> Bookmarks
                        </Link>
                        <Link to="#" className="list-group-item">
                          <span className="badge badge-warning">12</span>
                          <i className="fa fa-phone text-muted"></i> Call
                        </Link>
                        <Link to="#" className="list-group-item">
                          <span className="badge badge-danger">54</span>
                          <i className="fa fa-comments-o text-muted"></i> Messages
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  loginReducer,
  navigationReducer,
  analyticalReducer,
}) => ({
  email: loginReducer.email,
  menuArrowToggle: navigationReducer.menuArrowToggle,
  sparkleCardData: analyticalReducer.sparkleCardData,
  topProductDropDown: analyticalReducer.topProductDropDown,
  referralsDropDown: analyticalReducer.referralsDropDown,
  recentChatDropDown: analyticalReducer.recentChatDropDown,
  facebookShowProgressBar: analyticalReducer.facebookShowProgressBar,
  twitterShowProgressBar: analyticalReducer.twitterShowProgressBar,
  affiliatesShowProgressBar: analyticalReducer.affiliatesShowProgressBar,
  searchShowProgressBar: analyticalReducer.searchShowProgressBar,
  loadingPage: analyticalReducer.loadingPage,
});

export default connect(mapStateToProps, {
  toggleMenuArrow,
  loadSparcleCard,
  onPressTopProductDropDown,
  onPressReferralsDropDown,
  onPressRecentChatDropDown,
  onPressDataManagedDropDown,
  facebookProgressBar,
  twitterProgressBar,
  affiliatesProgressBar,
  searchProgressBar,
})(Dashbord);
