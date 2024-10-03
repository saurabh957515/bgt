import React, { useEffect, useState } from "react";
import "flatpickr/dist/flatpickr.css";
import useApi from "../../../utils/UseApi";
import ReactSelect from "../../../components/ReactSelect";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";

const FeePayment = ({
  setSelected,
  feePaymentDetails,
  setFeePaymentDetails,
  bankOptions,
}) => {
  const [admissionId, setAdmissionId] = useState("");
  const { postRoute, editRoute, getRoute } = useApi();
  const location = useLocation();
  const [editAdmissionId, setEditAdmissionId] = useState(
    location.state?.admissionId
  );
  const [createAdmission, setCreateAdmission] = useState(
    location.state?.makeAdmission
  );
  const history = useHistory();
  const [isEdit, setIsEdit] = useState(false);
  const [errors, setErrors] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, data } = isEdit
      ? await editRoute(
          `/api/feepayment/${feePaymentDetails?.id}`,
          feePaymentDetails
        )
      : await postRoute(`api/feepayment`, feePaymentDetails);
    if (errors) {
      setErrors(errors);
    } else {
      setTimeout(() => {
        history.push({
          pathname: "/totalAdmission",
        });
      }, 1500);

      setAdmissionId(data?.admission_id);
    }
  };

  const handleFeePayment = (name, value) => {
    const updatedDetails = { ...feePaymentDetails };

    if (name !== "total_amount" && !updatedDetails.total_amount) {
      setErrors({ total_amount: "Add total amount first" });
      return;
    } else if (name === "current_amount") {
      const totalAmount = parseFloat(updatedDetails.total_amount) || 0;
      const currentAmount = parseFloat(value) || 0;
      updatedDetails["remaining_amount"] = totalAmount - currentAmount;
    }
    updatedDetails[name] = value;
    setFeePaymentDetails(updatedDetails);
    setErrors({});
  };

  useEffect(() => {
    const getData = async () => {
      if (editAdmissionId) {
        const { data, errors } = await getRoute(
          "/api/feepayment/filter",
          { admission_id: editAdmissionId },
          false
        );
        const editAdmisson = data[0];
        if (editAdmisson) {
          setFeePaymentDetails({
            id: editAdmisson?.id,
            inquiry_id: editAdmisson?.id,
            remaining_amount: editAdmisson?.remaining_amount,
            bank_details_id: editAdmisson?.bank_details_id,
            total_amount: editAdmisson?.total_amount,
            current_amount: editAdmisson?.current_amount,
            inquiry_id: editAdmisson?.inquiry_id,
            admission_id: admissionId,
          });
          setIsEdit(true);
        } else {
          setFeePaymentDetails({
            inquiry_id: createAdmission?.id,
            remaining_amount: createAdmission?.remaining_amount,
            bank_details_id: createAdmission?.bank_details_id,
            total_amount: createAdmission?.total_amount,
            current_amount: createAdmission?.current_amount,
            inquiry_id: createAdmission?.id,
            admission_id: admissionId,
          });
          setIsEdit(false);
        }
      } else {
        if (createAdmission) {
          setFeePaymentDetails({
            inquiry_id: createAdmission?.id,
            remaining_amount: createAdmission?.remaining_amount,
            bank_details_id: createAdmission?.bank_details_id,
            total_amount: createAdmission?.total_amount,
            current_amount: createAdmission?.current_amount,
            inquiry_id: createAdmission?.id,
            admission_id: admissionId,
          });
        }
        setIsEdit(false);
      }
    };
    getData();
  }, [editAdmissionId, createAdmission, admissionId]);

  useEffect(() => {
    const getAdmission = async () => {
      if (!editAdmissionId) {
        const { data, errors } = await getRoute(
          "/api/admission/filter",
          { inquiry_id: createAdmission?.id },
          false
        );
        if (!errors && data?.length === 1) {
          setAdmissionId(data[0]?.id);
          setEditAdmissionId(data[0]?.id);
        }
      }
    };
    getAdmission();
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <div className="clearfix row">
        <div className="col-md-12">
          <div className="card">
            <div className="header">
              <h2 className=" font-weight-bold">FeePayment Information</h2>
            </div>
            <div className="body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Total Amount</label>
                    <input
                      className={`form-control`}
                      value={feePaymentDetails?.total_amount || ""}
                      required="required"
                      type="number"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\+?[0-9,\.]*$/.test(value)) {
                          handleFeePayment("total_amount", e.target.value);
                        }
                      }}
                    />
                    <p className="mt-2 text-danger">{errors["total_amount"]}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Pay Amount</label>
                    <input
                      className={`form-control`}
                      value={feePaymentDetails?.current_amount || ""}
                      required="required"
                      type="number"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\+?[0-9.,]*$/.test(value)) {
                          handleFeePayment("current_amount", e.target.value);
                        }
                      }}
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
              <div className="mt-4">
                <button
                  onClick={() => {
                    setSelected(3);
                  }}
                  className="btn btn-outline-info "
                  type="button"
                >
                  Back
                </button>
                <button className="ml-2 btn btn-outline-primary" type="submit">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default FeePayment;
