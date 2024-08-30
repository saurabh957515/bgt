import React from "react";
import PageHeader from "../../components/PageHeader";

const Fee = () => {
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
            HeaderText="Fees"
            Breadcrumb={[
              { name: "Fees", navigate: "" },
              { name: "Show", navigate: "" },
            ]}
          />
          <ul className="nav nav-tabs"></ul>
        </div>
      </div>
    </div>
  );
};

export default Fee;
