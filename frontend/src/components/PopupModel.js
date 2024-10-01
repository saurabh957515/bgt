import React, { useState } from "react";

const PopupModel = ({ isModalOpen,title="empty title", onClick,setIsModalOpen = () => {} }) => {
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      {isModalOpen && (
        <div
          className="modal fade show"
          id="exampleModalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">
                  Modal title
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={closeModal} // React event handler for closing the modal
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">{title}</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal} // React event handler for closing the modal
                >
                  Cancel
                </button>
                <button onClick={onClick} type="button" className="btn btn-primary">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupModel;
