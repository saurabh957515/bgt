import moment from "moment";
import React, { useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import useApi from "../../../utils/UseApi";

const FeePayment = ({
  setAdmissionId,
  setSelected,
  feePaymentDetails,
  setFeePaymentDetails,
  handleSubmit,
}) => {
  const { postRoute, editRoute } = useApi();

  const handleFeePayment = (name, value) => {
    setFeePaymentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="clearfix row">
        <div className="col-md-12">
          <div className="card">
            <div className="header">
              <h2>Basic Information</h2>
            </div>
            <div className="body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Current Amount</label>
                    <input
                      className={`form-control`}
                      value={feePaymentDetails?.paid_amount || ""}
                      required="required"
                      type="number"
                      onChange={(e) =>
                        handleFeePayment("paid_amount", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Remaining Amount</label>
                    <input
                      className={`form-control`}
                      value={feePaymentDetails?.remaining_amount || ""}
                      required="required"
                      type="number"
                      onChange={(e) =>
                        handleFeePayment("remaining_amount", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Total Amount</label>
                    <input
                      className={`form-control`}
                      value={feePaymentDetails?.total_amount || ""}
                      required="required"
                      type="number"
                      onChange={(e) =>
                        handleFeePayment("total_amount", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              <button className="btn btn-primary" type="submit">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FeePayment;
