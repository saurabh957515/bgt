import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ReactSelect from "../../components/ReactSelect";
import useApi from "../../utils/UseApi";
const bankObject = {
  account_holder_name: "Good Holder",
  account_number: "12345678910",
  bank_name: "State bank of india",
  branch_name: "SBI Branch",
  ifsc_code: "SBIN0523698",
  account_type: "Savings",
  branch_address: "Good Addres",
};

const BankForm = ({ bankDetails }) => {
  const { postRoute, getRoute, editRoute } = useApi();
  const history = useHistory();
  const [typeOptions, setTypeOptions] = useState([]);
  const [details, setDetails] = useState(bankObject);
  const [isEdit, setIsEdit] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const getTypes = async () => {
      const { data } = await getRoute("/api/bank/gettypes",);
      setTypeOptions(
        Object.entries(data)?.map(([key, value]) => ({
          label: key,
          value: value,
        }))
      );
    };
    getTypes();
  }, []);

  useEffect(() => {
    if (bankDetails?.id) {
      setIsEdit(true);
      setDetails(bankDetails);
    } else {
      setDetails(bankObject);
      setIsEdit(false);
    }
  }, [bankDetails]);

  const handleBankDetails = (name, value) => {
    setDetails((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = isEdit
        ? await editRoute(`/api/bank/${details?.id}`, details)
        : await postRoute("/api/bank", details);
      if (response?.errors) {
        setErrors(response?.errors);
      } else {
        history.push("/bankList");
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
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
                <div className="form-group col-md-6">
                  <label>Account HolderName</label>
                  <input
                    className="form-control"
                    value={details?.account_holder_name}
                    required
                    onChange={(e) =>
                      handleBankDetails("account_holder_name", e.target.value)
                    }
                  />
                  <p className="mt-2 text-danger">
                    {errors["account_holder_name"]}
                  </p>
                </div>

                <div className="form-group col-md-6">
                  <label>Account Number</label>
                  <input
                    className="form-control"
                    value={details?.account_number}
                    required
                    type="number"
                    minLength={12}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\+?[0-9]*$/.test(value)) {
                        handleBankDetails("account_number", value.slice(0, 17));
                      }
                    }}
                  />
                  <p className="mt-2 text-danger">{errors["account_number"]}</p>
                </div>

                <div className="form-group col-md-6">
                  <label>Bank Name</label>
                  <input
                    className="form-control"
                    value={details?.bank_name}
                    required
                    onChange={(e) =>
                      handleBankDetails("bank_name", e.target.value)
                    }
                  />
                  <p className="mt-2 text-danger">{errors["bank_name"]}</p>
                </div>

                <div className="form-group col-md-6">
                  <label>IFSC Code</label>
                  <input
                    maxLength={11}
                    className="form-control"
                    value={details?.ifsc_code}
                    required
                    type="text"
                    onChange={(e) => {
                      handleBankDetails("ifsc_code", e.target.value);
                    }}
                  />
                  <p className="mt-2 text-danger">{errors["ifsc_code"]}</p>
                </div>

                <div className="form-group col-md-6">
                  <label>Account Type</label>
                  <ReactSelect
                    value={details?.account_type}
                    required
                    options={typeOptions}
                    onChange={(e) => handleBankDetails("account_type", e.value)}
                  />
                  <p className="mt-2 text-danger">{errors["account_type"]}</p>
                </div>
                <div className="form-group col-md-6">
                  <label>Branch Name</label>
                  <input
                    className="form-control"
                    value={details?.branch_name}
                    required
                    type="text"
                    onChange={(e) =>
                      handleBankDetails("branch_name", e.target.value)
                    }
                  />
                  <p className="mt-2 text-danger">{errors["branch_name"]}</p>
                </div>
                <div className="form-group col-md-6">
                  <label>Branch Address</label>
                  <input
                    className="form-control"
                    value={details?.branch_address}
                    required
                    type="text"
                    onChange={(e) =>
                      handleBankDetails("branch_address", e.target.value)
                    }
                  />
                  <p className="mt-2 text-danger">{errors["branch_address"]}</p>
                </div>
              </div>
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default BankForm;
