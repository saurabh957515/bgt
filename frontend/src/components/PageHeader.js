import React, { useEffect, useState } from "react";
import moment from "moment";
import DatePicker from "./DatePicker";
const PageHeader = ({
  HeaderText,
  Breadcrumb,
  showFilter,
  setFilterField = () => {},
  filterField = {},
}) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [sortOrder, setSortOrder] = useState("");

  const onToggleMenu = () => {
    setToggleMenu((prevToggleMenu) => !prevToggleMenu);
  };
  useEffect(() => {
    setFilterField((pre) => ({
      ...pre,
      order: sortOrder,
    }));
  }, [sortOrder]);
  return (
    <div className="block-header">
      <div className="row">
        <div className="col-lg-5 col-md-6 col-sm-12">
          <h2>
            <a
              href="#!"
              className="btn btn-xs btn-link btn-toggle-fullwidth"
              onClick={(e) => {
                e.preventDefault();
                onToggleMenu();
              }}
            >
              <i
                className={
                  !toggleMenu ? `fa fa-arrow-left` : "fa fa-arrow-right"
                }
              ></i>
            </a>{" "}
            {HeaderText}
          </h2>
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="dashboard">
                <i className="icon-home"></i>
              </a>
            </li>
            {Breadcrumb.map((item, index) => (
              <li key={item.name + index} className="breadcrumb-item active">
                <a href={item.navigate ? item.navigate : null}>{item.name}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Filter Bar */}
        {showFilter && (
          <div className="text-right col-lg-7 col-md-6 col-sm-12">
            <div className="row align-items-center">
              {/* Date Picker */}
              <div className="mb-3 col-md-3 mb-md-0">
                <DatePicker
                  initialValue={filterField?.date}
                  onChange={(data) => {
                    const newDate =
                      data?.length > 0
                        ? moment(data[0]).format("YYYY-MM-DD")
                        : "";
                    setFilterField((pre) => ({
                      ...pre,
                      date: newDate,
                    }));
                  }}
                />
              </div>

              {/* Sort Order */}
              <div className="mb-3 col-md-3 mb-md-0">
                <select
                  className="form-control"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="" disabled hidden>
                    Select Order
                  </option>
                  <option value="ASC">Ascending</option>
                  <option value="DESC">Descending</option>
                </select>
              </div>

              {/* Search Input */}
              <div className="mb-3 col-md-3 mb-md-0">
                <div className="input-group">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search Name"
                    value={filterField?.name}
                    onChange={(e) =>
                      setFilterField((pre) => ({
                        ...pre,
                        name: e.target.value,
                      }))
                    }
                  />
                  <button type="button" className="btn btn-primary">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>

              {/* Telecaller Name Input */}
              <div className="mb-3 col-md-3 mb-md-0">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Telecaller Name"
                  value={filterField?.telecallerName}
                  onChange={(e) =>
                    setFilterField((pre) => ({
                      ...pre,
                      telecaller_name: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
