import React from "react";
import PageHeader from "../../components/PageHeader";
import FeeLists from "./partials/FeeLists";

const Fee = () => {
  return (
    <div
      style={{ flex: 1 }}
      onClick={() => {
        document.body.classList.remove("offcanvas-active");
      }}
    >
      <div>
        <div className="sticky container-fluid">
          <PageHeader
            HeaderText="Fees"
            Breadcrumb={[
              { name: "Fees", navigate: "" },
              { name: "Show", navigate: "" },
            ]}
          />
          <FeeLists/>
        </div>
      </div>
    </div>
  );
};

export default Fee;
