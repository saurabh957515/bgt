import React, { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import moment from "moment/moment";
import useApi from "../../../utils/UseApi";
import { useHistory } from "react-router-dom";
import ReactSelect from "../../../components/ReactSelect";
import { countries } from "../../../helper.js";
const inquiryObject = {
  name: "john cena",
  email: "cena@123",
  contact_no: "96523485",
  alternate_no: "69523652",
  address: "jimsd@132",
  date_of_birth: "2001-09-03",
  interested_country: "USA",
  course_detail: "",
  city: "",
};

const Form = ({ inquiryEdit }) => {
  const { postRoute, editRoute } = useApi();
  const history = useHistory();
  const [inquiry, setInquiry] = useState(inquiryObject);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (inquiryEdit?.id) {
      setIsEdit(true);
      console.log(inquiryEdit);
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
        ? await editRoute(`/api/inquiry/${newInquiry?.id}`, newInquiry)
        : await postRoute("/api/inquiry", newInquiry);
     console.log(response)
      // if (response?.status) {
      //   history.push("/inquiry");
      // }
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
                  <label>Name</label>
                  <input
                    className="form-control"
                    value={inquiry?.name}
                    onChange={(e) => handleInquiry("name", e.target.value)}
                  />
                </div>

                {/* Contact No */}
                <div className="form-group col-md-6">
                  <label>Contact No</label>
                  <input
                    className="form-control"
                    value={inquiry?.contact_no}
                    type="number"
                    onChange={(e) =>
                      handleInquiry("contact_no", e.target.value)
                    }
                  />
                </div>

                {/* Address */}
                <div className="form-group col-md-6">
                  <label>Address</label>
                  <textarea
                    className="form-control"
                    value={inquiry?.address}
                    onChange={(e) => handleInquiry("address", e.target.value)}
                  />
                </div>

                {/* Email */}
                <div className="form-group col-md-6">
                  <label>Email</label>
                  <input
                    className="form-control"
                    value={inquiry?.email}
                    type="email"
                    onChange={(e) => handleInquiry("email", e.target.value)}
                  />
                </div>

                {/* Alternate No */}
                <div className="form-group col-md-6">
                  <label>Alternate No</label>
                  <input
                    className="form-control"
                    value={inquiry?.alternate_no}
                    type="number"
                    onChange={(e) =>
                      handleInquiry("alternate_no", e.target.value)
                    }
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Course Detail</label>
                  <input
                    className="form-control"
                    value={inquiry?.course_detail}
                    type="text"
                    onChange={(e) =>
                      handleInquiry("course_detail", e.target.value)
                    }
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>City</label>
                  <input
                    className="form-control"
                    value={inquiry?.city}
                    type="text"
                    onChange={(e) => handleInquiry("city", e.target.value)}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Country Interested</label>
                  <ReactSelect
                    options={Object.entries(countries)?.map(([key, value]) => ({
                      label: value,
                      value: key,
                    }))}
                    value={inquiry?.interested_country || ""}
                    onChange={(e) =>
                      handleInquiry("interested_country", e.value)
                    }
                  />
                </div>

                {/* Date of Birth */}
                <div className="form-group col-md-6">
                  <label>Date Of Birth</label>
                  <Flatpickr
                    style={{
                      border: "1px solid #d1d5db",
                      borderRadius: "0.35rem",
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
