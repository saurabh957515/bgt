import React, { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import moment from "moment/moment";
import useApi from "../../../utils/UseApi";
import { useHistory } from "react-router-dom";

const inquiryObject = {
  name: "john cena",
  email: "cena@123",
  contact_no: "96523485",
  alternate_no: "69523652",
  address: "jimsd@132",
  date_of_birth: "2001-09-03",
};

const Form = ({ inquiryEdit }) => {
  const { postRoute, editRoute } = useApi();
  const history = useHistory();
  const [inquiry, setInquiry] = useState(inquiryObject);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (inquiryEdit?.id) {
      setIsEdit(true);
      setInquiry(inquiryEdit);
    } else {
      setInquiry(inquiryObject);
      setIsEdit(false);
    }
  }, [inquiryEdit]);

  const handleInquiry = (name, value) => {
    setInquiry((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let newInquiry = {
        ...inquiry,
        date_of_birth: moment(inquiry?.date_of_birth).format("YYYY-MM-DD"),
      };
      const response = isEdit
        ? await editRoute(
            `http://localhost:9000/api/inquiry/${newInquiry?.id}`,
            newInquiry
          )
        : await postRoute("http://localhost:9000/api/inquiry", newInquiry);

      if (response?.status) {
        history.push("/inquiry");
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
                <div className="col-md-6">
                  {/* Name */}
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      className="form-control"
                      value={inquiry?.name}
                      required
                      onChange={(e) => handleInquiry("name", e.target.value)}
                    />
                  </div>

                  {/* Contact No */}
                  <div className="form-group">
                    <label>Contact No</label>
                    <input
                      className="form-control"
                      value={inquiry?.contact_no}
                      required
                      type="number"
                      onChange={(e) =>
                        handleInquiry("contact_no", e.target.value)
                      }
                    />
                  </div>

                  {/* Address */}
                  <div className="form-group">
                    <label>Address</label>
                    <textarea
                      className="form-control"
                      value={inquiry?.address}
                      required
                      onChange={(e) => handleInquiry("address", e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  {/* Email */}
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      className="form-control"
                      value={inquiry?.email}
                      required
                      type="email"
                      onChange={(e) => handleInquiry("email", e.target.value)}
                    />
                  </div>

                  {/* Alternate No */}
                  <div className="form-group">
                    <label>Alternate No</label>
                    <input
                      className="form-control"
                      value={inquiry?.alternate_no}
                      required
                      type="number"
                      onChange={(e) =>
                        handleInquiry("alternate_no", e.target.value)
                      }
                    />
                  </div>

                  {/* Date of Birth */}
                  <div className="form-group">
                    <label>Date Of Birth</label>
                    <Flatpickr
                      style={{
                        border: "1px solid #d1d5db",
                        borderRadius: "1rem",
                        width: "100%",
                        boxSizing: "border-box",
                        padding: "0.5rem",
                      }}
                      value={inquiry?.date_of_birth}
                      onChange={(data) => {
                        const newDate = moment(data[0]).format("YYYY-MM-DD");
                        handleInquiry("date_of_birth", newDate);
                      }}
                    />
                  </div>
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

export default Form;
