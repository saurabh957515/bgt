import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class BlogCommentCard extends React.Component {
  render() {
    const { CommentsList, HeaderText } = this.props;
    return (
      <div className="card">
        <div className="header">
          <h2>{HeaderText}</h2>
        </div>
        <div className="body">
          <ul className="comment-reply list-unstyled">
            {CommentsList
              ? CommentsList.map((data, i) => {
                  return (
                    <li className="row clearfix" key={"jdf546higho" + `${i}`}>
                      <div className="icon-box col-md-2 col-4">
                        <img
                          className="img-fluid img-thumbnail"
                          src={data.ImageUrl}
                          alt="Awesome"
                        />
                      </div>
                      <div className="text-box col-md-10 col-8 p-l-0 p-r0">
                        <h5 className="m-b-0">{data.Name}</h5>
                        <p>{data.comment}</p>
                        <ul className="list-inline">
                          <li>
                            <Link to="#">{data.Date}</Link>
                          </li>
                          <li>
                            <Link to="#">Reply</Link>
                          </li>
                        </ul>
                      </div>
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ mailInboxReducer }) => ({});

export default connect(mapStateToProps, {})(BlogCommentCard);
