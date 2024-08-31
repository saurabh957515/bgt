import moment from "moment";
import React, { useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import useApi from "../../../utils/UseApi";
import ReactSelect from "../../../components/ReactSelect";

const FeePayment = ({
  setAdmissionId,
  setSelected,
  feePaymentDetails,
  setFeePaymentDetails,
  handleSubmit,
  errors
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
              <h2>FeePayment Information</h2>
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
                    <p className="mt-2 text-danger">{errors["paid_amount"]}</p>
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
                    <p className="mt-2 text-danger">
                      {errors["remaining_amount"]}
                    </p>
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
                    <p className="mt-2 text-danger">{errors["total_amount"]}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Select BankAccount</label>
                    <ReactSelect
                      value={feePaymentDetails?.bank_detail || ""}
                      // required="required"
                      type="number"
                      onChange={(e) =>
                        handleFeePayment("bank_detail", e.target.value)
                      }
                    />
                    <p className="mt-2 text-danger">{errors["bank_detail"]}</p>
                  </div>
                </div>
              </div>
              <p className="mt-2 text-danger">{errors["amounts"]}</p>
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
