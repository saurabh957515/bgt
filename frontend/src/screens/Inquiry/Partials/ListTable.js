import React, { useEffect, useState } from "react";
import useApi from "../../../utils/UseApi";
import moment from "moment";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

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
    const inquiresData = await deleteById(
      `api/inquiry/${id}`
    );
    if (inquiresData?.status == "success") {
      getData();
    }
  };
  console.log(inquiryList);
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
          <table className="table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>COTACT NO</th>
                <th>DATE</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {inquiryList?.map((inquiry, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{inquiry?.name}</td>
                  <td>{inquiry?.email}</td>
                  <td>{inquiry?.contact_no}</td>
                  <td>{moment(inquiry?.date).format("YYYY-MM-DD")}</td>
                  <td>
                    <div className="flex ">
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
                        onClick={() => {}}
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
        </div>
      </div>
    </div>
  );
};

export default ListTable;
