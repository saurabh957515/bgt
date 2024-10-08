import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class PricingTableCard2 extends React.Component {
  render() {
    const { head, price, joined, imag } = this.props;
    return (
      <div className="col-lg-4 col-md-12">
        <div className="card pricing2">
          <div className="body">
            <div className="pricing-plan">
              <img alt="" className="pricing-img" src={imag} />
              <h2 className="pricing-header">{head}</h2>
              <ul className="pricing-features">
                <li>Responsive Design</li>
                <li>Color Customization</li>
                <li>HTML5 &amp; CSS3</li>
                <li>Styled elements</li>
              </ul>
              <span className="pricing-price">{price}</span>
              <Link
                to="#"
                className={
                  joined ? "btn btn-primary" : "btn btn-outline-primary"
                }
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ mailInboxReducer }) => ({});

export default connect(mapStateToProps, {})(PricingTableCard2);
