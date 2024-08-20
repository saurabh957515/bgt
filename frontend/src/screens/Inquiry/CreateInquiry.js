import React from "react";
import PageHeader from "../../components/PageHeader";
import Form from "./Partials/Form";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const CreateInquiry = ({ hisotry }) => {
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

          <Form inquiryEdit={inquiryData} />
        </div>
      </div>
    </div>
  );
};

export default CreateInquiry;
