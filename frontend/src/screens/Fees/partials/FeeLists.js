import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import useApi from "../../../utils/UseApi";
import moment from "moment";
import ReactSelect from "../../../components/ReactSelect";

const FeeLists = () => {
  const [admissions, setAdmissions] = useState([]);
  const { getRoute, editRoute } = useApi();
  const [selectedAdmission, setSelectedAdmission] = useState({});
  const [errors, setErrors] = useState({});
  const [bankOptions, setBankOptions] = useState([]);
  const getAdmissions = async () => {
    const admissionsData = await getRoute("/api/admission");
    setAdmissions(admissionsData?.filter((data) => +data?.remaining_amount));
  };
  const [remainingAmount, setRemainingAmount] = useState(0);
  const handleFeePayment = (name, value) => {
    setSelectedAdmission((pre) => ({
      ...pre,
      [name]: value,
    }));
  };
  useEffect(() => {
    getAdmissions();
    const getBankOption = async () => {
      const data = await getRoute("/api/bank", "", false);
      setBankOptions(
        data?.map((bank) => ({
          label: bank?.bank_name,
          value: bank?.id,
        }))
      );
    };
    getBankOption();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (+selectedAdmission?.remaining_amount !== +remainingAmount) {
      setErrors({ remaining_amount: "Remaining Amount is not valid" });
      return;
    } else {
      let newpaidAmount = +selectedAdmission?.paid_amount + +remainingAmount;
      const updatedAdmission = await editRoute(
        `api/admission/${selectedAdmission?.admissionDetails_id}`,
        {
          ...selectedAdmission,
          remaining_amount: "0",
          date_of_birth: moment(selectedAdmission?.date_of_birth).format(
            "YYYY-MM-DD"
          ),
          paid_amount: `${newpaidAmount}`,
        }
      );
      getAdmissions();
      setSelectedAdmission({});
    }
  };
  return (
    <div className="row" style={{ height: "70vh", overflow: "hidden" }}>
      <div className="col-lg-12" style={{ height: "100%" }}>
        <div
          className="card chat-app d-flex flex-column"
          style={{ height: "100%" }}
        >
          <div className="people-list" style={{ maxHeight: "100%" }}>
            <div
              className="input-group"
              style={{
                overflow: "auto",
                position: "sticky",
                top: 0,
                zIndex: 1,
                backgroundColor: "#fff", // Solid background to cover content behind
              }}
            >
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="icon-magnifier"></i>
                </span>
              </div>
              <input
                className="form-control"
                placeholder="Search..."
                type="text"
              />
            </div>
            <ul
              className="mt-2 mb-0 list-unstyled chat-list"
              style={{
                overflowY: "auto",
                height: "80vh", // Adjust for the height of the search bar
              }}
            >
              {admissions?.length > 0 ? (
                admissions?.map((admission, index) => (
                  <li
                    onClick={() => {
                      setSelectedAdmission(admission);
                      setRemainingAmount(admission?.remaining_amount);
                    }}
                    key={index}
                    className={`clearfix ${
                      admission?.id === selectedAdmission?.id && "bg-light"
                    }`}
                  >
                    <div className="about">
                      <div className="name">{admission?.name}</div>
                      <div className="status">
                        <i className="fa fa-circle offline"></i>
                        Created at:{" "}
                        {moment(admission?.created_at).startOf("day").fromNow()}
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <div>No Data Found</div>
              )}
            </ul>
          </div>

          <div
            className="chat flex-grow-1 d-flex flex-column"
            style={{ overflowY: "auto", height: "100%" }}
          >
            <div className="clearfix chat-header">
              <div className="row">
                <div className="col-lg-6">
                  <div className="chat-about">
                    <h6 className="m-b-0">
                      {selectedAdmission?.name || "No Admission Selected"}
                    </h6>
                    <small>
                      Last changed:{" "}
                      {moment(selectedAdmission?.updated_at)
                        .startOf("day")
                        .fromNow()}
                    </small>
                  </div>
                </div>
                <div className="text-right col-lg-6 hidden-sm">
                  <Link to="#" className="mr-1 btn btn-outline-info">
                    <i className="icon-settings"></i>
                  </Link>
                  <Link to="#" className="mr-1 btn btn-outline-warning">
                    <i className="icon-question"></i>
                  </Link>
                </div>
              </div>
            </div>
            <div
              className="chat-history flex-grow-1"
              style={{ overflowY: "auto" }}
            >
              {selectedAdmission?.admissionDetails_id && (
                <div className="">
                  <div className="header">
                    <h2>Complete Fee Payment</h2>
                  </div>
                  <div className="body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="font-weight-bold">
                            Last Amount:
                          </label>
                          <p className="mb-0 text-muted">
                            {selectedAdmission?.paid_amount || "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="font-weight-bold">
                            Total Amount:
                          </label>
                          <p className="mb-0 text-muted">
                            {selectedAdmission?.total_amount || "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Add Remaining Amount</label>
                          <input
                            className={`form-control`}
                            value={selectedAdmission?.remaining_amount || ""}
                            required="required"
                            type="number"
                            onChange={(e) =>
                              handleFeePayment(
                                "remaining_amount",
                                e.target.value
                              )
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
                            value={selectedAdmission?.bank_detail_id || ""}
                            required="required"
                            onChange={(e) =>
                              handleFeePayment("bank_detail_id", e.value)
                            }
                            options={bankOptions}
                          />
                          <p className="mt-2 text-danger">
                            {errors["bank_detail"]}
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 text-danger">{errors["amounts"]}</p>
                    <button
                      onClick={handleSubmit}
                      className="btn btn-primary"
                      type="button"
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeLists;
