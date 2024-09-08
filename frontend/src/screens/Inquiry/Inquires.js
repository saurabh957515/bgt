import React, { useState } from "react";
import PageHeader from "../../components/PageHeader";
import ListTable from "./Partials/ListTable";
import moment from "moment";

const Inquires = () => {
  const [filterField, setFilterField] = useState({
    date: moment().format("YYYY-MM-DD"),
    name: "",
    order: "asc",
    telecaller_name:'',
  });

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
            filterField={filterField}
            setFilterField={setFilterField}
            showFilter={true}
            HeaderText="Inquiry List"
            Breadcrumb={[
              { name: "Inquiry", navigate: "" },
              { name: "Show", navigate: "" },
            ]}
          />
          <ListTable filterField={filterField} />
        </div>
      </div>
    </div>
  );
};

export default Inquires;
