import React from "react";
import PageHeader from "../../components/PageHeader";
import ListTable from "./Partials/ListTable";

const Inquires = () => {
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
            HeaderText="Inquiry List"
            Breadcrumb={[
              { name: "Inquiry", navigate: "" },
              { name: "Show", navigate: "" },
            ]}
          />
        <ListTable/>
        </div>
      </div>
    </div>
  );
};

export default Inquires;
