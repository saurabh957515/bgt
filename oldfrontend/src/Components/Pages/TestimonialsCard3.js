import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import avatar1 from "../../assets/images/xs/avatar1.jpg";
import avatar2 from "../../assets/images/xs/avatar2.jpg";
import avatar6 from "../../assets/images/xs/avatar6.jpg";
import avatar5 from "../../assets/images/xs/avatar5.jpg";

class TestimonialsCard3 extends React.Component {
  render() {
    return (
      <div className="col-lg-12">
        <div className="card">
          <div className="body">
            <div className="row clearfix">
              <div className="col-lg-6 col-md-12">
                <div className="testimonial2 default">
                  <div className="testimonial-section">
                    {" "}
                    Denim you probably haven't heard of. Lorem ipsum dolor met
                    consectetur adipisicing sit amet, consectetur adipisicing
                    elit, of them jean shorts sed magna aliqua. Lorem ipsum
                    dolor met.
                  </div>
                  <div className="testimonial-desc">
                    <img
                      alt=""
                      className="media-object rounded-circle shadow"
                      src={avatar1}
                    />
                    <div className="testimonial-writer">
                      <h6>Zahed Kamal</h6>
                      <span>Front End Developer</span>
                      <p>
                        <Link to="#">Touch Base Inc</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="testimonial2 primary">
                  <div className="testimonial-section">
                    {" "}
                    Denim you probably haven't heard of. Lorem ipsum dolor met
                    consectetur adipisicing sit amet, consectetur adipisicing
                    elit, of them jean shorts sed magna aliqua. Lorem ipsum
                    dolor met.
                  </div>
                  <div className="testimonial-desc">
                    <img
                      alt=""
                      className="media-object rounded-circle shadow"
                      src={avatar2}
                    />
                    <div className="testimonial-writer">
                      <h6>Gary Camara</h6>
                      <span>Web Designer</span>
                      <p>
                        <Link to="#">Wraptech Inc</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="row clearfix">
              <div className="col-lg-6 col-md-12">
                <div className="testimonial3 default">
                  <div className="testimonial-section">
                    {" "}
                    Denim you probably haven't heard of. Lorem ipsum dolor met
                    consectetur adipisicing sit amet, consectetur adipisicing
                    elit, of them jean shorts sed magna aliqua. Lorem ipsum
                    dolor met.
                  </div>
                  <div className="testimonial-desc">
                    <img
                      alt=""
                      className="media-object rounded-circle shadow"
                      src={avatar1}
                    />
                    <div className="testimonial-writer">
                      <h6>Zahed Kamal</h6>
                      <span>Front End Developer</span>
                      <p>
                        <Link to="#">Touch Base Inc</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="testimonial3 primary">
                  <div className="testimonial-section">
                    {" "}
                    Denim you probably haven't heard of. Lorem ipsum dolor met
                    consectetur adipisicing sit amet, consectetur adipisicing
                    elit, of them jean shorts sed magna aliqua. Lorem ipsum
                    dolor met.
                  </div>
                  <div className="testimonial-desc">
                    <img
                      alt=""
                      className="media-object rounded-circle shadow"
                      src={avatar2}
                    />
                    <div className="testimonial-writer">
                      <h6>Gary Camara</h6>
                      <span>Web Designer</span>
                      <p>
                        <Link to="#">Wraptech Inc</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="testimonial3 warning">
                  <div className="testimonial-section">
                    {" "}
                    Denim you probably haven't heard of. Lorem ipsum dolor met
                    consectetur adipisicing sit amet, consectetur adipisicing
                    elit, of them jean shorts sed magna aliqua. Lorem ipsum
                    dolor met.
                  </div>
                  <div className="testimonial-desc">
                    <img
                      alt=""
                      className="media-object rounded-circle shadow"
                      src={avatar5}
                    />
                    <div className="testimonial-writer">
                      <h6>Frank Camly</h6>
                      <span>Angular Developer</span>
                      <p>
                        <Link to="#">ABC Base Inc</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="testimonial3 danger">
                  <div className="testimonial-section">
                    {" "}
                    Denim you probably haven't heard of. Lorem ipsum dolor met
                    consectetur adipisicing sit amet, consectetur adipisicing
                    elit, of them jean shorts sed magna aliqua. Lorem ipsum
                    dolor met.
                  </div>
                  <div className="testimonial-desc">
                    <img
                      alt=""
                      className="media-object rounded-circle shadow"
                      src={avatar6}
                    />
                    <div className="testimonial-writer">
                      <h6>Gary Camara</h6>
                      <span>ASP MVC</span>
                      <p>
                        <Link to="#">ThemeTech Inc</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ mailInboxReducer }) => ({});

export default connect(mapStateToProps, {})(TestimonialsCard3);
