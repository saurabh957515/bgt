import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { onPressTagDropdown } from "../actions";

class FileFolderCard extends React.Component {
  render() {
    const { HeaderText } = this.props;
    return (
      <div className="col-lg-3 col-md-4 col-sm-12">
        <div className="card">
          <Link to="#" className="folder">
            <h6>
              <i className="fa fa-folder m-r-10"></i> {HeaderText}
            </h6>
          </Link>
        </div>
      </div>
    );
  }
}

FileFolderCard.propTypes = {};

const mapStateToProps = ({ mailInboxReducer }) => ({
  isTagDropDown: mailInboxReducer.isTagDropDown,
});

export default connect(mapStateToProps, {
  onPressTagDropdown,
})(FileFolderCard);
