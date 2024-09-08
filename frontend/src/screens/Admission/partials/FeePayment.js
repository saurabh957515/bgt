import moment from "moment";
import React, { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import useApi from "../../../utils/UseApi";
import ReactSelect from "../../../components/ReactSelect";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const FeePayment = ({
  setAdmissionId,
  setSelected,
  feePaymentDetails,
  setFeePaymentDetails,
  bankOptions,
}) => {
  const { postRoute, editRoute, getRoute } = useApi();
  const location = useLocation();
  const editAdmissionId = location.state?.admissionId;
  const createAdmission = location.state?.makeAdmission;
  const [isEdit, setIsEdit] = useState(false);
  const [errors, setErrors] = useState({});
  // feepayment
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, data } = await postRoute(
      `api/feepayment`,
      feePaymentDetails
    );
    if (errors) {
      setErrors(errors);
    } else {
      setAdmissionId(data?.admission_id);
      // setSelected(2);
    }
  };

  const handleFeePayment = (name, value) => {
    setFeePaymentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const getData = async () => {
      if (false) {
        const editAdmisson = await getRoute(
          "/api/admission/filter",
          { id: editAdmissionId },
          false
        );
        if (editAdmisson) {
          setFeePaymentDetails({
            id: editAdmisson?.id,
            inquiry_id: createAdmission?.inquiry_id || null,
            name: editAdmisson?.name,
            email: editAdmisson?.email,
            contact_no: editAdmisson?.contact_no,
            alternate_no: editAdmisson?.alternate_no,
            address: editAdmisson?.address,
            date_of_birth: moment(editAdmisson?.date_of_birth).format(
              "YYYY-MM-DD"
            ),
            current_city: editAdmisson?.current_city,
            visa_type: editAdmisson?.visa_type,
            telecaller_name: editAdmisson?.telecaller_name,
          });
        }
        setIsEdit(true);
      } else {
        if (createAdmission) {
          setFeePaymentDetails({
            inquiry_id: createAdmission?.id,
            remaining_amount: createAdmission?.remaining_amount,
            bank_details_id: createAdmission?.bank_details_id,
            total_amount: createAdmission?.total_amount,
            current_amount: createAdmission?.current_amount,
            inquiry_id: createAdmission?.inquiry_id,
            admission_id: "008ee915-e006-4a47-87ee-121686479f62",
          });
        }
        setIsEdit(false);
      }
    };
    getData();
  }, [editAdmissionId, createAdmission]);

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
                    <label>Pay Amount</label>
                    <input
                      className={`form-control`}
                      value={feePaymentDetails?.current_amount || ""}
                      required="required"
                      type="number"
                      onChange={(e) =>
                        handleFeePayment("current_amount", e.target.value)
                      }
                    />
                    <p className="mt-2 text-danger">
                      {errors["current_amount"]}
                    </p>
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
                      value={feePaymentDetails?.bank_details_id || ""}
                      required="required"
                      onChange={(e) =>
                        handleFeePayment("bank_details_id", e.value)
                      }
                      options={bankOptions}
                    />
                    <p className="mt-2 text-danger">{errors["bank_details"]}</p>
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
