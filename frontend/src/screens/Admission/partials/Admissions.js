import React, { useEffect, useState } from "react";
import "./acordian.css";
import PageHeader from "../../../components/PageHeader";
import useApi from "../../../utils/UseApi";
import moment from "moment";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import PopupModel from "../../../components/PopupModel";

const Admissions = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [admissions, setAdmissions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletedAdmission, setDeleteAdmission] = useState({});
  const history = useHistory();
  const { getRoute, deleteById } = useApi();
  const getData = async () => {
    const { data } = await getRoute("api/admission/getall");
    console.log(data);
    setAdmissions(data);
  };

  useEffect(() => {
    getData();
  }, []);
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const handleDeleteAdmission = async (e) => {
    e.preventDefault();
    console.log('i am comming ')
    const { data } = await deleteById(`api/admission/${deletedAdmission?.id}`);
    if (data?.status == "success") {
      getData();
      setIsModalOpen(false);
      setDeleteAdmission({})
    }
  };
  const handleEditAdmission = (id) => {
    history.push({
      pathname: "/admission",
      state: { admissionId: id },
    });
  };
  return (
    <div
      style={{ flex: 1 }}
      onClick={() => {
        document.body.classList.remove("offcanvas-active");
      }}
    >
      <PopupModel
        title={`do you want to delete the admission of ${deletedAdmission?.first_name} ${deletedAdmission?.last_name}`}
        onClick={handleDeleteAdmission}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <div>
        <div className="container-fluid">
          <PageHeader
            showFilter={true}
            HeaderText="Admissions"
            Breadcrumb={[
              { name: "Admission", navigate: "" },
              { name: "Show", navigate: "" },
            ]}
          />
          <div className="accordion-wrap">
            {admissions?.map((admissionDetails, index) => (
              <div
                key={index}
                className={`accordion ${
                  activeIndex === index ? "" : "collapsed"
                }`}
                role="button"
                aria-expanded={activeIndex === index}
                onClick={() => toggleAccordion(index)}
              >
                <div className="teaser">
                  <div className="time">
                    <h5>
                      {moment(
                        admissionDetails?.admission?.date_of_admission
                      ).format("YYYY-MM-DD")}
                    </h5>
                  </div>
                  <div className="title">
                    <h3>
                      {admissionDetails?.admission?.first_name}
                      {admissionDetails?.admission?.last_name}
                    </h3>
                    <h6 className="theme">
                      {admissionDetails?.admission?.telecaller_name}
                    </h6>
                  </div>
                </div>

                <div
                  className={`collapse ${activeIndex === index ? "show" : ""}`}
                  id="collapseOne"
                >
                  <div className="d-flex justify-content-between align-items-center content">
                    {admissionDetails?.education?.id ? (
                      <>
                        <div>
                          <div>
                            <strong>Institute Name:</strong>{" "}
                            {admissionDetails?.education?.name_of_institute}
                          </div>
                          {/* <div>
                            <strong>Country Interested:</strong>{" "}
                            {education?.country_interested}
                          </div> */}
                          <div>
                            <strong>Highest Qualification:</strong>{" "}
                            {admissionDetails?.education?.highest_qualification}
                          </div>
                          <div>
                            <strong>IELTS Score:</strong>{" "}
                            {admissionDetails?.education?.ielts_score}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-danger">
                        No Education Details Added
                      </div>
                    )}
                    <div>
                      <button
                        onClick={() => {
                          handleEditAdmission(admissionDetails?.admission?.id);
                        }}
                        className="btn btn-primary me-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setIsModalOpen(true);
                          setDeleteAdmission(admissionDetails?.admission);
                          // handleDeleteAdmission(admissionDetails?.admission?.id)
                        }}
                        className="ml-2 btn btn-danger"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>

                <div className="accordion-toggle">
                  <span className="one"></span>
                  <span className="two"></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admissions;
