import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class FileDocumentCard extends React.Component {
  render() {
    const {
      DocumentIconClass,
      DocumentName,
      DocumentSize,
      DocumentDate,
      ImageUrl,
    } = this.props;
    return (
      <div className="col-lg-3 col-md-4 col-sm-12">
        <div className="card">
          <div className="file">
            <Link to="#">
              <div className="hover">
                <button type="button" className="btn btn-icon btn-danger">
                  <i className="fa fa-trash"></i>
                </button>
              </div>

              {ImageUrl ? (
                <div className="image">
                  <img src={ImageUrl} alt="img" className="img-fluid" />
                </div>
              ) : (
                <div className="icon">
                  <i className={DocumentIconClass}></i>
                </div>
              )}
              <div className="file-name">
                <p className="m-b-5 text-muted">{DocumentName}</p>
                <small>
                  Size: {DocumentSize}{" "}
                  <span className="date text-muted">{DocumentDate}</span>
                </small>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

FileDocumentCard.propTypes = {
  DocumentName: PropTypes.string.isRequired,
  DocumentSize: PropTypes.string.isRequired,
  DocumentDate: PropTypes.string.isRequired,
};

const mapStateToProps = ({ mailInboxReducer, analyticalReducer }) => ({});

export default connect(mapStateToProps, {})(FileDocumentCard);
