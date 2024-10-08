import React from "react";
import PageHeader from "../components/PageHeader";
import BankForm from "./partials/BankForm";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const CreateBanks = () => {
  const location = useLocation();
  const bankData = location.state?.bankData;

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
            HeaderText={"Add Bank"}
            Breadcrumb={[{ name: "Bank", navigate: "" }]}
          />
          <BankForm bankDetails={bankData} />
        </div>
      </div>
    </div>
  );
};

export default CreateBanks;
