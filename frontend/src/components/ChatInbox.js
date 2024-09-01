import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Avatar1 from "../assets/images/xs/avatar1.jpg";
import Avatar7 from "../assets/images/xs/avatar7.jpg";
import useApi from "../utils/UseApi";

const ChatInbox = () => {
  const [numbers, setNumbers] = useState([]);
  const [message, setMessage] = useState("");
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getRoute, editRoute, postRoute } = useApi();
  const [selectedAdmission, setSelectedAdmission] = useState({});
  const getAdmissions = async () => {
    const admissionsData = await getRoute("/api/admission");
    setAdmissions(admissionsData);
  };
  useEffect(() => {
    getAdmissions();
  }, []);
  const sendMessage = async () => {
    if (!selectedAdmission?.admissionDetails_id) {
      return;
    }
    setLoading(true);
    let messageResponse;
    if (numbers.length > 1) {
      const sendMessageData = {
        recipients: numbers,
        message: message,
      };
      messageResponse = await postRoute(
        "/api/message/send-whatsapp-mass",
        sendMessageData
      );
    } else if (numbers.length <= 1) {
      const sendMessageData = {
        to: selectedAdmission?.contact_no,
        message: message,
      };
      messageResponse = await postRoute(
        "/api/message/send-whatsapp",
        sendMessageData
      );
    } else {
      console.log("No recipients selected");
      return;
    }
    setLoading(false);
    setMessage("");
  };

  return (
    <div className="row" style={{ height: "70vh", overflow: "hidden" }}>
      <div className="col-lg-12" style={{ height: "100%" }}>
        <div
          className="bg-blue-500 card chat-app d-flex flex-column"
          style={{ height: "100%" }}
        >
          <div className="people-list" style={{ maxHeight: "100%" }}>
            <div
              className="input-group"
              style={{
                overflow: "auto",
                position: "sticky",
                top: 0,
                zIndex: 1,
                backgroundColor: "#fff",
              }}
            >
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="icon-magnifier"></i>
                </span>
              </div>
              <input
                className="form-control"
                placeholder="Search..."
                type="text"
              />
              <button
                className="btn btn-outline-primary"
                style={{
                  marginLeft: "10px",
                  height: "100%",
                  borderRadius: "0 4px 4px 0",
                }}
                onClick={() => {
                  if (numbers?.length === admissions?.length) {
                    setNumbers([]);
                  } else {
                    const contactNumbers = [
                      ...admissions?.map((admission) => admission?.contact_no),
                    ];
                    setNumbers(contactNumbers);
                  }
                }}
              >
                Select All
              </button>
            </div>

            <ul
              className="mt-2 mb-0 list-unstyled chat-list"
              style={{
                overflowY: "auto",
                height: "80vh", // Adjust for the height of the search bar
              }}
            >
              {admissions?.length > 0 ? (
                admissions?.map((admission, index) => (
                  <li
                    onClick={() => {
                      setSelectedAdmission(admission);
                    }}
                    key={index}
                    className={`clearfix ${
                      admission?.id === selectedAdmission?.id && "bg-light"
                    }`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "10px",
                      cursor: "pointer",
                      overflow: "hidden", // Prevent overflow
                    }}
                  >
                    <input
                      type="checkbox"
                      onChange={() => {
                        const newNumbers = [...numbers];
                        const index = newNumbers.indexOf(admission?.contact_no);

                        if (index > -1) {
                          // If the number exists, remove it
                          newNumbers.splice(index, 1);
                        } else {
                          // If the number does not exist, add it
                          newNumbers.push(admission?.contact_no);
                        }
                        setNumbers(newNumbers);
                      }}
                      id={`flexCheckChecked-${index}`}
                      checked={numbers.includes(admission?.contact_no)} // Set checked based on presence in the array
                      style={{ marginRight: "10px", flexShrink: 0 }}
                    />

                    <img
                      alt="avatar"
                      src={Avatar1}
                      style={{
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        marginRight: "10px",
                        flexShrink: 0,
                      }}
                    />
                    <div className="about" style={{ flex: 1 }}>
                      <div
                        className="name"
                        style={{ fontWeight: "bold", overflow: "hidden" }}
                      >
                        {admission?.name}
                      </div>
                      <div className="status" style={{ overflow: "hidden" }}>
                        <i className="fa fa-circle offline"></i>
                        Created at: {admission?.createdAt || "N/A"}
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <div>No Data Found</div>
              )}
            </ul>
          </div>

          <div
            className="chat flex-grow-1 d-flex flex-column"
            style={{ overflowY: "auto", height: "100%" }}
          >
            <div className="clearfix chat-header">
              <div className="row">
                <div className="col-lg-6">
                  <div className="chat-about">
                    <h6 className="m-b-0">
                      {numbers?.length > 1
                        ? "Multiple Recepient Selected"
                        : selectedAdmission?.name || "No Admission Selected"}
                    </h6>
                    <small>Last changed: </small>
                  </div>
                </div>
                <div className="text-right col-lg-6 hidden-sm">
                  <Link to="#" className="mr-1 btn btn-outline-info">
                    <i className="icon-settings"></i>
                  </Link>
                  <Link to="#" className="mr-1 btn btn-outline-warning">
                    <i className="icon-question"></i>
                  </Link>
                </div>
              </div>
            </div>
            <div
              className="chat-history flex-grow-1 d-flex flex-column"
              style={{ overflow: "hidden" }}
            >
              <div className="overflow-auto flex-grow-1">
                {numbers?.length <= 1 && selectedAdmission?.id && (
                  <ul className="m-b-0">
                    <li className="clearfix">
                      <div className="text-right message-data">
                        <span className="message-data-time">
                          10:10 AM, Today
                        </span>
                        <img alt="avatar" src={Avatar7} />
                      </div>
                      <div className="float-right message other-message">
                        Hi Aiden, how are you? How is the project coming along?
                      </div>
                    </li>
                    <li className="clearfix">
                      <div className="message-data">
                        <span className="message-data-time">
                          10:12 AM, Today
                        </span>
                      </div>
                      <div className="message my-message">
                        Are we meeting today?
                      </div>
                    </li>
                    <li className="clearfix">
                      <div className="message-data">
                        <span className="message-data-time">
                          10:15 AM, Today
                        </span>
                      </div>
                      <div className="message my-message">
                        Project has been already finished and I have results to
                        show you.
                      </div>
                    </li>
                  </ul>
                )}
              </div>
              <div
                className="clearfix chat-message"
                style={{ borderTop: "1px solid #ddd" }}
              >
                <div className="mb-0 input-group">
                  <div onClick={sendMessage} className="input-group-prepend">
                    <span className="input-group-text">
                      {loading ? (
                       <div class="spinner-border spinner-border-sm text-secondary" role="status">
                     </div>
                      ) : (
                        <i className="icon-paper-plane"></i>
                      )}
                    </span>
                  </div>
                  <input
                    className="form-control"
                    placeholder="Enter text here..."
                    type="text"
                    value={message}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault(); // Prevent the default form submission behavior
                        sendMessage();
                      }
                    }}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInbox;
