import moment from "moment";
import React, { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import useApi from "../../../utils/UseApi";
import ReactSelect from "../../../Components/ReactSelect";
import { countries } from "../../../provider";
import { useLocation } from "react-router-dom";
import InputLabel from "../../../Components/InputLabel";
import InputError from "../../../Components/InputError";
import CancelButton from "../../../Components/CancelButton";
import SaveButton from "../../../Components/SaveButton";
import SecondaryButton from "../../../Components/SecondaryButton";
const universityObject = {
  institute_name: "",
  country: "",
  course_detail: "",
  city: "",
  stay_in_type: "",
  stay_in_address: "",
  inquiry_id: "",
  admission_id: "",
};
const UniversityDetails = ({
  setSelected,
  universityDetails,
  setUniversityDetails,
  stayInOptions,
  progressCount,
  setProgressCount,
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
  const [isEdit, setIsEdit] = useState(false);
  const [errors, setErrors] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, data } = isEdit
      ? await editRoute(
        `api/university/${universityDetails?.id}`,
        universityDetails,{},true
      )
      : await postRoute(`api/university`, universityDetails);
    if (errors) {
      setErrors(errors);
    } else {
      setProgressCount(3)
      setTimeout(() => {
        setSelected(3);
      }, 300)
    }
  };

  const handleUniversity = (name, value) => {
    setUniversityDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    const getData = async () => {
      if (editAdmissionId) {
        const { data, errors } = await getRoute(
          "/api/university/filter",
          { admission_id: editAdmissionId },
          false
        );
        const editAdmisson = data?.[0];
        if (editAdmisson) {
          setUniversityDetails({
            id: editAdmisson?.id,
            inquiry_id: editAdmisson?.inquiry_id,
            institute_name: editAdmisson?.institute_name,
            country: editAdmisson?.country,
            course_detail: editAdmisson?.course_detail,
            city: editAdmisson?.city,
            stay_in_type: editAdmisson?.stay_in_type,
            admission_id: editAdmisson?.admission_id,
            stay_in_address: editAdmisson?.stay_in_address,
          });
          setIsEdit(true);
          setEditAdmission(true);
        } else {
          setUniversityDetails({
            inquiry_id: createAdmission?.id,
            country: createAdmission?.interested_country,
            course_detail: createAdmission?.course_detail,
            admission_id: admissionId,
          });
        }
      } else {
        if (createAdmission) {
          setUniversityDetails({
            inquiry_id: createAdmission?.id,
            country: createAdmission?.interested_country,
            course_detail: createAdmission?.course_detail,
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
      <h1 className="text-base font-bold">University Information</h1>
      <div className="grid gap-4 mt-4 sm:grid-cols-3">
        <div>
          <InputLabel required="required" value={'Interested University/Institute Name'}></InputLabel>
          <input
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            value={universityDetails?.institute_name || ""}
            required="required"
            onChange={(e) =>
              handleUniversity("institute_name", e.target.value)
            }
          />
          <InputError message={errors["institute_name"]} />
        </div>
        <div>
          <InputLabel required="required" value={'Country'}></InputLabel>
          <ReactSelect
            options={Object.entries(countries)?.map(
              ([key, value]) => ({
                label: value,
                value: key,
              })
            )}
            value={universityDetails?.country || ""}
            onChange={(e) => handleUniversity("country", e.value)}
          />
          <InputError message={errors["country"]} />
        </div>
        <div>
          <InputLabel required="required" value={'Course Detail'}></InputLabel>
          <input
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            value={universityDetails?.course_detail || ""}
            required="required"
            onChange={(e) =>
              handleUniversity("course_detail", e.target.value)
            }
          />
          <InputError message={errors["course_detail"]} />
        </div>
        <div>
          <InputLabel required="required" value={'Living options'}></InputLabel>
          <ReactSelect
            onChange={(option) =>
              handleUniversity("stay_in_type", option?.value)
            }
            value={universityDetails?.stay_in_type}
            options={stayInOptions}
          />
          <InputError message={errors["stay_in_type"]} />
        </div>
        <div>
          <InputLabel required="required" value={'Living Address'}></InputLabel>
          <input
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            value={universityDetails?.stay_in_address || ""}
            required="required"
            onChange={(e) =>
              handleUniversity("stay_in_address", e.target.value)
            }
          />
          <InputError message={errors["stay_in_address"]} />
        </div>
        <div>
          <InputLabel required="required" value={'city'}></InputLabel>
          <input
            className="w-full p-2 mt-1 border border-gray-300 rounded-md"
            value={universityDetails?.city || ""}
            required="required"
            onChange={(e) =>
              handleUniversity("city", e.target.value)
            }
          />
          <InputError message={errors["city"]} />
        </div>
      </div>
      <div className="mt-4">
        <CancelButton className="" onClick={(e) => {
          e.preventDefault();
          setSelected(1);
        }}>
          Back
        </CancelButton>
        <SaveButton className={'mr-4'}>
          Save
        </SaveButton>
        <SecondaryButton onClick={(e) => {
          e.preventDefault();
          setSelected(3);
        }}>
          Next
        </SecondaryButton>

      </div>
    </form>
  );
};

export default UniversityDetails;
