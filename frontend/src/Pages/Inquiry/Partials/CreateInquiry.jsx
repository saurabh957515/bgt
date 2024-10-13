import React, { useContext, useEffect, useState } from 'react';
import PrimaryContainer from '../../../Components/PrimaryContainer';
import PrimaryButton from '../../../Components/PrimaryButton';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.css";
import ReactSelect from '../../../Components/ReactSelect';
import useApi from '../../../utils/UseApi';
import { countries } from '../../../provider';
import { NationalitiesContext } from '../../../Nationalities';
import { FlashContext } from '../../../FlashContext';
import InputLabel from '../../../Components/InputLabel';
const CreateInquiry = () => {
    const inquiryObject = {
        date_of_birth: "",
        gender: "",
        interested_country: "Indian",
        contact_no: "",
        alternate_no: "",
        email: "",
        address: "",
        current_city: "",
        current_state: "",
        current_nationality: "",
        first_name: "",
        last_name: "",
        zip_code: "",
        telecaller_name: "",
        visa_type: "",
        progress_count: "0",
    };
    const location = useLocation();
    const { postRoute, editRoute, getRoute } = useApi();
    const { setFlash } = useContext(FlashContext)
    const [inquiry, setInquiry] = useState(inquiryObject);
    const [isEdit, setIsEdit] = useState(false);
    const [errors, setErrors] = useState({});
    const [genderOptions, setGenderOptions] = useState([]);
    const [visaOptions, setVisaOptions] = useState([]);
    const handleInquiry = (name, value) => {
        setInquiry((prev) => ({ ...prev, [name]: value }));
    };
    
    useEffect(() => {
        const optionValues = async () => {

            const genderOptions = await getRoute(
                "api/inquiry/enum-values/inquiry/gender"
            );
            const visaOptions = await getRoute(
                "api/inquiry/enum-values/inquiry/visa_type"
            );
            setVisaOptions(
                visaOptions?.data?.map((visa) => ({
                    label: visa.charAt(0).toUpperCase() + visa.slice(1).toLowerCase(),
                    value: visa,
                }))
            );
            setGenderOptions(
                genderOptions?.data?.map((gender) => ({
                    label: gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase(),
                    value: gender,
                }))
            );
        };
        optionValues();
        const inquiryExists=location?.state?.inquiryData;
        if(inquiryExists){
            setInquiry(inquiryExists);
            setIsEdit(true);
        }
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let newInquiry = {
                ...inquiry,
                date_of_birth: moment(inquiry?.date_of_birth).format("YYYY-MM-DD"),
            };
            const response = isEdit
                ? await editRoute(`/api/inquiry/${newInquiry?.id}`, newInquiry,{},true)
                : await postRoute("/api/inquiry", newInquiry,true);
            if (response?.errors) {
                setErrors(response?.errors);
            } else if (response?.data) {
                navigate('/inquiry')
            }
        } catch (error) {
            console.error("Submission error:", error);
        }
    };
    const tenYearsAgo = moment().subtract(10, "years").format("YYYY-MM-DD");
    const navigate = useNavigate();
    const { nationalities } = useContext(NationalitiesContext);
    return (
        <PrimaryContainer>
            <div className='flex flex-col w-full h-full gap-8'>
                <div className='flex items-center justify-between w-full p-4 bg-white rounded-lg '>
                    <div>
                        <h1 onClick={() => {
                            setFlash('message is comming', 'is it')
                        }} className='text-base font-semibold '>
                        {   isEdit ? "Edit Inquiry" : "Create Inquiry"}
                        </h1>
                    </div>
                    <div className='font-semibold'>
                        <PrimaryButton onClick={() => {
                            navigate('/inquiry')
                        }}>
                            Back
                        </PrimaryButton>
                    </div>
                </div>
                <div className=' grow scrollbar-hide'>
                    <form onSubmit={handleSubmit} className="w-full p-6 mx-auto bg-white rounded-lg shadow-md">
                        <div className="mb-4">
                            <h2 className="mb-4 text-xl font-bold">Basic Information</h2>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="form-group">
                                    <InputLabel value={'First Name'} required />
                                    <input
                                        required
                                        maxLength={320}
                                        className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                                        value={inquiry?.first_name}
                                        onChange={(e) => handleInquiry("first_name", e.target.value)}
                                    />
                                    <p className="mt-2 text-red-500">{errors["first_name"]}</p>
                                </div>
                                <div className="form-group">
                                    <InputLabel value={'Last Name'} required />
                                    <input
                                        required
                                        maxLength={320}
                                        className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                                        value={inquiry?.last_name}
                                        onChange={(e) => handleInquiry("last_name", e.target.value)}
                                    />
                                    <p className="mt-2 text-red-500">{errors["last_name"]}</p>
                                </div>
                                <div className="form-group">
                                    <InputLabel value={'Date Of Birth'} required />
                                    <Flatpickr
                                        style={{
                                            border: "1px solid #d1d5db",
                                            borderRadius: "0.35rem",
                                            width: "100%",
                                            boxSizing: "border-box",
                                            padding: "0.5rem",
                                        }}
                                        options={{
                                            maxDate: tenYearsAgo,
                                        }}
                                        required
                                        value={inquiry?.date_of_birth}
                                        onChange={(data, date) => {
                                            const newDate = moment(data[0]).format("YYYY-MM-DD");
                                            console.log(newDate, date);
                                            handleInquiry("date_of_birth", newDate);
                                        }}
                                    />
                                    <p className="mt-2 text-red-500">{errors["date_of_birth"]}</p>
                                </div>
                                <div className="form-group">
                                    <InputLabel value={'Gender'} required />
                                    <ReactSelect
                                        required
                                        className=''
                                        onChange={(e) => handleInquiry("gender", e.value)}
                                        value={inquiry?.gender || ""}
                                        options={genderOptions}
                                    />
                                    <p className="mt-2 text-red-500">{errors["gender"]}</p>
                                </div>
                                <div className="form-group">
                                    <InputLabel value={'Current Nationality'} required />
                                    <ReactSelect
                                        options={nationalities}
                                        value={inquiry?.current_nationality || ""}
                                        onChange={(e) => {
                                            handleInquiry("current_nationality", e.value);
                                        }}
                                    />
                                    <p className="mt-2 text-red-500">{errors["current_nationality"]}</p>
                                </div>
                                <div className="form-group">
                                    <InputLabel value={'Country Interested'} required />

                                    <ReactSelect
                                        options={Object.entries(countries)?.map(([key, value]) => ({
                                            label: value,
                                            value: key,
                                        }))}
                                        required
                                        value={inquiry?.interested_country || ""}
                                        onChange={(e) => {
                                            handleInquiry("interested_country", e.value);
                                        }}
                                    />
                                    <p className="mt-2 text-red-500">{errors["interested_country"]}</p>
                                </div>
                                <div className="form-group">
                                    <InputLabel value={'Phone Number'} required />

                                    <input
                                        required
                                        className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                                        value={inquiry?.contact_no}
                                        type="number"
                                        min="1"
                                        maxLength="12"
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\+?[0-9,\.]*$/.test(value)) {
                                                handleInquiry("contact_no", value.slice(0, 12));
                                            }
                                        }}
                                    />
                                    <p className="mt-2 text-red-500">{errors["contact_no"]}</p>
                                </div>
                                <div className="form-group">
                                    <InputLabel value={'Alternate Number'} required />


                                    <input
                                        required
                                        className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                                        value={inquiry?.alternate_no}
                                        type="text"
                                        maxLength="12"
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\+?[0-9,\.]*$/.test(value)) {
                                                handleInquiry("alternate_no", value.slice(0, 12));
                                            }
                                        }}
                                    />
                                    <p className="mt-2 text-red-500">{errors["alternate_no"]}</p>
                                </div>
                                <div className="form-group">

                                    <InputLabel value={'Email Address'} required />


                                    <input
                                        maxLength={320}
                                        required
                                        className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                                        value={inquiry?.email}
                                        type="email"
                                        onChange={(e) => handleInquiry("email", e.target.value)}
                                    />
                                    <p className="mt-2 text-red-500">{errors["email"]}</p>
                                </div>
                                <div className="form-group">
                                    <InputLabel value={'Permanent Home Address'} required />

                                    <textarea
                                        required
                                        className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                                        value={inquiry?.address}
                                        onChange={(e) => handleInquiry("address", e.target.value)}
                                    />
                                    <p className="mt-2 text-red-500">{errors["address"]}</p>
                                </div>
                                <div className="form-group">
                                    <InputLabel value={'Current City'} required />

                                    <input
                                        required
                                        className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                                        value={inquiry?.current_city}
                                        maxLength={320}
                                        type="text"
                                        onChange={(e) =>
                                            handleInquiry("current_city", e.target.value)
                                        }
                                    />
                                    <p className="mt-2 text-red-500">{errors["current_city"]}</p>
                                </div>
                                <div className="form-group">
                                    <InputLabel value={'Current State'} required />


                                    <input
                                        required
                                        className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                                        value={inquiry?.current_state}
                                        type="text"
                                        maxLength={320}
                                        onChange={(e) =>
                                            handleInquiry("current_state", e.target.value)
                                        }
                                    />
                                    <p className="mt-2 text-red-500">{errors["current_state"]}</p>
                                </div>
                                <div className="form-group">
                                    <InputLabel value={'Postal/Zip Code'} required />


                                    <input
                                        required
                                        maxLength={10}
                                        className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                                        value={inquiry?.zip_code}
                                        type="text"
                                        onChange={(e) => handleInquiry("zip_code", e.target.value)}
                                    />
                                    <p className="mt-2 text-red-500">{errors["zip_code"]}</p>
                                </div>
                                <div className="form-group">
                                    <InputLabel value={'Visa Type'} required />


                                    <ReactSelect
                                        options={visaOptions}
                                        required
                                        value={inquiry?.visa_type || ""}
                                        onChange={(e) => {
                                            handleInquiry("visa_type", e.value);
                                        }}
                                    />
                                    <p className="mt-2 text-red-500">{errors["visa_type"]}</p>
                                </div>
                                <div className="form-group">
                                    <InputLabel value={'Telecaller Name'} required />

                                    <input
                                        required
                                        maxLength={320}
                                        className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                                        value={inquiry?.telecaller_name}
                                        type="text"
                                        onChange={(e) =>
                                            handleInquiry("telecaller_name", e.target.value)
                                        }
                                    />
                                    <p className="mt-2 text-red-500">{errors["telecaller_name"]}</p>
                                </div>
                            </div>
                            <button className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md" type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </div></div>
        </PrimaryContainer>
    );
}

export default CreateInquiry;
