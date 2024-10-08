import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UISimpleTabCard extends React.Component {
  render() {
    const {
      TabData,
      ActiveTab,
      onPressTab,
      activeIndex,
      HeaderText,
      HeaderDetails,
      NavTabClass,
      keys,
      Wind,
      ContainerClass,
    } = this.props;

    return (
      <div className={ContainerClass ? ContainerClass : "col-lg-6 col-md-12"}>
        <div className="card">
          <div className="header">
            <h2>
              {HeaderText}
              <small>{HeaderDetails}</small>
            </h2>
          </div>
          <div className="body">
            <ul className={NavTabClass ? NavTabClass : "nav nav-tabs"}>
              {TabData
                ? TabData.map((data, index) => {
                    return (
                      <li
                        key={index + data.header}
                        onClick={() => onPressTab(index)}
                        className={
                          keys === Wind.perent
                            ? activeIndex[index]
                              ? "nav-item active show "
                              : "nav-item"
                            : keys > 0 && index === 0
                            ? "nav-item active show mr-1"
                            : "nav-item mr-1"
                        }
                      >
                        <Link
                          to="#"
                          className={
                            keys === Wind.perent
                              ? activeIndex[index]
                                ? "nav-link active show"
                                : "nav-link"
                              : keys > 0 && index === 0
                              ? "nav-link active show"
                              : "nav-link"
                          }
                          data-toggle="tab"
                        >
                          {data.IconClass ? (
                            <i
                              className={
                                data.IconClass
                                  ? data.IconClass + " mr-1"
                                  : "fa fa-home mr-1"
                              }
                            ></i>
                          ) : null}
                          {data.header}
                        </Link>
                      </li>
                    );
                  })
                : null}
            </ul>
            <div className="tab-content">
              <div
                className="tab-pane show active"
                id={
                  ActiveTab ? (keys === Wind ? ActiveTab.header : null) : null
                }
              >
                <h6>
                  {ActiveTab
                    ? ActiveTab[keys].TabData[
                        keys === Wind.perent ? Wind.index : 0
                      ].header
                    : null}
                </h6>
                <p>
                  {ActiveTab
                    ? ActiveTab[keys].TabData[
                        keys === Wind.perent ? Wind.index : 0
                      ].panData
                    : null}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ mailInboxReducer }) => ({});

export default connect(mapStateToProps, {})(UISimpleTabCard);
