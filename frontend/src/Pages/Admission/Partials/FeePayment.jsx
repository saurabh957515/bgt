import React, { useEffect, useState } from "react";
import "flatpickr/dist/flatpickr.css";
import useApi from "../../../utils/UseApi";
import ReactSelect from "../../../Components/ReactSelect";
import { useLocation, useNavigate } from "react-router-dom";
import InputLabel from "../../../Components/InputLabel";
import InputError from "../../../Components/InputError";
import CancelButton from "../../../Components/CancelButton";
import SaveButton from "../../../Components/SaveButton";


const FeePayment = ({
  setSelected,
  feePaymentDetails,
  setFeePaymentDetails,
  bankOptions,
  setEditAdmission
}) => {
  const [admissionId, setAdmissionId] = useState("");
  const { postRoute, editRoute, getRoute } = useApi();
  const location = useLocation();
  const [editAdmissionId, setEditAdmissionId] = useState(
    location.state?.admissionId
  );
  const [createAdmission, setCreateAdmission] = useState(
    location.state?.makeAdmission
  );
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [errors, setErrors] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, data } = isEdit
      ? await editRoute(
        `/api/feepayment/${feePaymentDetails?.id}`,
        feePaymentDetails,{},true
      )
      : await postRoute(`api/feepayment`, feePaymentDetails);
    if (errors) {
      setErrors(errors);
    } else {
      setTimeout(() => {
        navigate("/total-admission");
      }, 1500);

      setAdmissionId(data?.admission_id);
    }
  };

  const handleFeePayment = (name, value) => {
    const updatedDetails = { ...feePaymentDetails };

    if (name !== "total_amount" && !updatedDetails.total_amount) {
      setErrors({ total_amount: "Add total amount first" });
      return;
    } else if (name === "current_amount") {
      const totalAmount = parseFloat(updatedDetails.total_amount) || 0;
      const currentAmount = parseFloat(value) || 0;
      updatedDetails["remaining_amount"] = totalAmount - currentAmount;
    }
    updatedDetails[name] = value;
    setFeePaymentDetails(updatedDetails);
    setErrors({});
  };

  useEffect(() => {
    const getData = async () => {
      if (editAdmissionId) {
        const { data, errors } = await getRoute(
          "/api/feepayment/filter",
          { admission_id: editAdmissionId },
          false
        );
        const editAdmisson = data[0];
        if (editAdmisson) {
          setFeePaymentDetails({
            id: editAdmisson?.id,
            inquiry_id: editAdmisson?.id,
            remaining_amount: editAdmisson?.remaining_amount,
            bank_details_id: editAdmisson?.bank_details_id,
            total_amount: editAdmisson?.total_amount,
            current_amount: editAdmisson?.current_amount,
            inquiry_id: editAdmisson?.inquiry_id,
            admission_id: admissionId,
          });
          setIsEdit(true);
          setEditAdmission(true)
        } else {
          setFeePaymentDetails({
            inquiry_id: createAdmission?.id,
            remaining_amount: createAdmission?.remaining_amount,
            bank_details_id: createAdmission?.bank_details_id,
            total_amount: createAdmission?.total_amount,
            current_amount: createAdmission?.current_amount,
            inquiry_id: createAdmission?.id,
            admission_id: admissionId,
          });
          setIsEdit(false);
          setEditAdmission(false)
        }
      } else {
        if (createAdmission) {
          setFeePaymentDetails({
            inquiry_id: createAdmission?.id,
            remaining_amount: createAdmission?.remaining_amount,
            bank_details_id: createAdmission?.bank_details_id,
            total_amount: createAdmission?.total_amount,
            current_amount: createAdmission?.current_amount,
            inquiry_id: createAdmission?.id,
            admission_id: admissionId,
          });
        }
        setIsEdit(false);
        setEditAdmission(false)
      }
    };
    getData();
  }, [editAdmissionId, createAdmission, admissionId]);

  useEffect(() => {
    const getAdmission = async () => {
      if (!editAdmissionId) {
        const { data, errors } = await getRoute(
          "/api/admission/filter",
          { inquiry_id: createAdmission?.id },
          false
        );
        if (!errors && data?.length === 1) {
          setAdmissionId(data[0]?.id);
          setEditAdmissionId(data[0]?.id);
        }
      }
    };
    getAdmission();
  }, []);
  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <h1 className="text-base font-bold">FeePayment Information</h1>
      <div className="grid gap-4 mt-4 sm:grid-cols-2">
        <div>
          <InputLabel required="required" value={'Total Amount'}></InputLabel>
          <input
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            value={feePaymentDetails?.total_amount || ""}
            required="required"
            onChange={(e) =>
              handleFeePayment("total_amount", e.target.value)
            }
          />
          <InputError message={errors["total_amount"]} />
        </div>
        <div>
          <InputLabel required="required" value={'Pay Amount'}></InputLabel>
          <input
            type="number"
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            value={feePaymentDetails?.current_amount || ""}
            required="required"
            onChange={(e) =>
              handleFeePayment("current_amount", e.target.value)
            }
          />
          <InputError message={errors["current_amount"]} />
        </div>
        <div>
          <InputLabel required="required" value={'Remaining Amount'}></InputLabel>
          <input
            type="number"
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            value={feePaymentDetails?.remaining_amount || ""}
            required="required"
            onChange={(e) =>
              handleFeePayment("remaining_amount", e.target.value)
            }
          />
          <InputError message={errors["remaining_amount"]} />
        </div>
        <div>
          <div className="form-group">
          <InputLabel required="required" value={'Select BankAccount'}></InputLabel>
            <ReactSelect
              value={feePaymentDetails?.bank_details_id || ""}
              required="required"
              onChange={(e) =>
                handleFeePayment("bank_details_id", e.value)
              }
              options={bankOptions}
            />
            <p className="mt-2 text-danger">{errors["bank_details"]}</p>
          </div>

          <InputError message={errors["bank_details"]} />
        </div>
      </div>
      <div className="mt-4">
      <CancelButton className="" onClick={(e) => {
          e.preventDefault();
          setSelected(2);
        }}>
          Back
        </CancelButton>
        <SaveButton className={'mr-4'}>
          Save
        </SaveButton>
             
              </div>
    </form>
  );
};

export default FeePayment;
