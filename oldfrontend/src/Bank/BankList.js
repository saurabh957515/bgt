import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import useApi from "../utils/UseApi";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { setToastMessage, tostMessageLoad } from "../actions";
import { useDispatch } from "react-redux";

const BankList = () => {
  const [banks, setBanks] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const { getRoute, deleteById } = useApi();
  const [errors, setErrors] = useState({});
  const getBanks = async () => {
    const { data } = await getRoute("/api/bank", "", false);
    setBanks(data);
  };
  useEffect(() => {
    getBanks();
  }, []);
  const handleDelete = async (bank) => {
    const { data } = await getRoute("api/feepayment");
    const isBankAdded = data?.find(
      (admissionnData) => admissionnData?.bank_detail_id === bank?.id
    );
    if (isBankAdded) {
      setErrors({ [bank?.id]: "This Bank is Associated with the admission" });
      return;
    } else {
      const { data, error } = await deleteById(`api/bank/${bank?.id}`, true);
      if (data?.status == "success") {
        getBanks();
      }
    }
  };
  return (
    <div
      onClick={() => {
        document.body.classList.remove("offcanvas-active");
      }}
    >
      <div>
        <div className="container-fluid">
          <PageHeader HeaderText="Banks" Breadcrumb={[{ name: "Bank" }]} />
        </div>
        <div>
          <div className="clearfix row">
            {banks?.length > 0 ? (
              banks.map((bank, i) => (
                <div key={i} className="col-lg-3 col-md-6 col-sm-6">
                  <div
                    className="overflow-hidden card number-chart"
                    style={{ position: "relative" }}
                  >
                    <div className="body">
                      <div className="number">
                        <h6>{bank?.account_holder_name}</h6>
                        <div  style={{
                            fontSize: "14px",
                          }}>{bank?.bank_name}</div>
                        <span
                          style={{
                            fontSize: "12px",
                          }}
                        >
                          {bank?.account_number}
                        </span>
                      </div>
                      <small className="text-muted">{bank?.account_type}</small>
                    </div>

                    <div
                      id="main"
                      className="sparkline"
                      style={{ width: 0, height: 55 }}
                    ></div>

                    <div
                      className="d-flex justify-content-end"
                      style={{
                        position: "absolute",
                        bottom: "10px",
                        right: "10px",
                      }} // Position buttons at bottom right
                    >
                      <button
                        className="mr-2 btn btn-outline-primary btn-sm me-2"
                        onClick={() => {
                          history.push({
                            pathname: "/createbank",
                            state: { bankData: bank },
                          });
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(bank)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p
                    style={{ marginTop: "-20px" }}
                    className="absolute text-danger"
                  >
                    {errors[bank?.id]}
                  </p>
                </div>
              ))
            ) : (
              <div
                className="py-4 mt-3 text-center alert"
                style={{
                  backgroundColor: "#f9f9f9",
                  color: "black",
                  fontWeight: "bold",
                  opacity: "0.9",
                  margin: "20px",
                  width: "100%", // Set width to full
                }}
                role="alert"
              >
                No Bank found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankList;
