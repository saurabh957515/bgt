import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ReactSelect from "../../components/ReactSelect";
import useApi from "../../utils/UseApi";
const bankObject = {
  account_holder_name: "",
  account_number: "",
  bank_name: "",
  branch_name: "",
  ifsc_code: "",
  account_type: "",
  branch_address: "",
};

const BankForm = ({ bankDetails }) => {
  const { postRoute, getRoute, editRoute } = useApi();
  const history = useHistory();
  const [typeOptions, setTypeOptions] = useState([]);
  const [details, setDetails] = useState(bankObject);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const getTypes = async () => {
      const { data } = await getRoute("/api/bank/gettypes", "", false);
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

      if (response?.status) {
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
                {/* Name */}
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
                </div>

                {/* Contact No */}
                <div className="form-group col-md-6">
                  <label>Account Number</label>
                  <input
                    className="form-control"
                    value={details?.account_number}
                    required
                    type="number"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\+?[0-9]*$/.test(value)) {
                        handleBankDetails("account_number", value.slice(0, 17));
                      }
                    }}
                  />
                </div>

                {/* Address */}
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
                </div>

                {/* Email */}
                <div className="form-group col-md-6">
                  <label>IFSC Code</label>
                  <input
                    className="form-control"
                    value={details?.ifsc_code}
                    required
                    type="text"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\+?[0-9]*$/.test(value)) {
                        handleBankDetails("ifsc_code", value.slice(0, 17));
                      }
                    }}
                  />
                </div>

                <div className="form-group col-md-6">
                  <label>Account Type</label>
                  <ReactSelect
                    value={details?.account_type}
                    required
                    options={typeOptions}
                    onChange={(e) => handleBankDetails("account_type", e.value)}
                  />
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
