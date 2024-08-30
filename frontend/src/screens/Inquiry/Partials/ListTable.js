import React, { useEffect, useState } from "react";
import useApi from "../../../utils/UseApi";
import moment from "moment";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { countries } from "../../../helper";

const ListTable = () => {
  const { getRoute, deleteById } = useApi();
  const [inquiryList, setInquiryList] = useState([]);
  const history = useHistory();
  const getData = async () => {
    const inquiresData = await getRoute("/api/inquiry");
    setInquiryList(inquiresData);
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteInquiry = async (id) => {
    const inquiresData = await deleteById(`api/inquiry/${id}`);
    if (inquiresData?.status == "success") {
      getData();
    }
  };
  const makeAdmission = (inquiry) => {
    history.push({
      pathname: "/admission",
      state: { makeAdmission: inquiry },
    });
  };

  return (
    <div className="col-lg-12">
      <div className="card">
        <div className="header">
          <h2>
            Manage Your Inquires
            <small>you can confirm to make admission</small>
          </h2>
        </div>
        <div className="body table-responsive">
          {inquiryList && inquiryList.length > 0 ? (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>#</th>
                  <th style={{ textAlign: "center" }}>Country</th>
                  <th style={{ textAlign: "center" }}>NAME</th>
                  <th style={{ textAlign: "center" }}>EMAIL</th>
                  <th style={{ textAlign: "center" }}>CONTACT NO</th>
                  <th style={{ textAlign: "center" }}>DATE</th>
                  <th style={{ textAlign: "center" }}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {inquiryList.map((inquiry, index) => (
                  <tr key={inquiry?.id}>
                    <th style={{ textAlign: "center" }} scope="row">
                      {index + 1}
                    </th>
                    <td style={{ textAlign: "center" }}>
                      {countries[inquiry?.interested_country] || "-"}
                    </td>
                    <td style={{ textAlign: "center" }}>{inquiry?.name}</td>
                    <td style={{ textAlign: "center" }}>{inquiry?.email}</td>
                    <td style={{ textAlign: "center" }}>
                      {inquiry?.contact_no}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {moment(inquiry?.date).format("YYYY-MM-DD")}
                    </td>
                    <td>
                      <div className="d-flex justify-content-center">
                        <span
                          onClick={() => {
                            history.push({
                              pathname: "/createinquiry",
                              state: { inquiryData: inquiry },
                            });
                          }}
                          className="mr-2 cursor-pointer text-primary"
                        >
                          Edit
                        </span>
                        <span
                          onClick={() => deleteInquiry(inquiry?.id)}
                          className="mr-2 cursor-pointer text-danger"
                        >
                          Delete
                        </span>
                        <span
                          onClick={() => {
                            makeAdmission(inquiry);
                          }}
                          className="cursor-pointer text-success"
                        >
                          Confirm
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div
              className="py-4 mt-3 text-center alert"
              style={{ backgroundColor: "#f4f7f6", color: "", opacity: "0.9" }}
              role="alert"
            >
              No inquiries found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListTable;
