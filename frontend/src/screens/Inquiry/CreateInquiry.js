import React from "react";
import PageHeader from "../../components/PageHeader";
import Form from "./Partials/Form";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { connect } from "react-redux";
const CreateInquiry = ({ hisotry, nationalities }) => {
  const location = useLocation();
  const inquiryData = location.state?.inquiryData;
  return (
    <div
      style={{ flex: 1 }}
      onClick={() => {
        document.body.classList.remove("offcanvas-active");
      }}
    >
      <div>
        <div className="container-fluid">
          <PageHeader
            HeaderText={inquiryData?.name ? "Edit Inquiry" : "Create Inquiry"}
            Breadcrumb={[
              { name: "Inquiry", navigate: "" },
              {
                name: inquiryData?.name
                  ? `Edit ${inquiryData?.name}`
                  : "Create",
                navigate: "",
              },
            ]}
          />
          <Form nationalities={nationalities} inquiryEdit={inquiryData} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  nationalities: state?.nationalityReducer?.nationalities,
});

export default connect(mapStateToProps)(CreateInquiry);
