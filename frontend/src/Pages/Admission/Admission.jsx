import React, { useContext, useEffect, useState } from 'react';
import PrimaryContainer from '../../Components/PrimaryContainer';
import { Tab } from "@headlessui/react";
import { classNames } from '../../provider';
import AdmissionForm from './Partials/AdmissionForm';
import EducationForm from './Partials/EducationForm';
import FeePayment from './Partials/FeePayment';
import UniversityDetails from './Partials/UniversityDetails';
import { useLocation } from 'react-router-dom';
import useApi from '../../utils/UseApi';
import { NationalitiesContext } from '../../Nationalities';

const Admission = () => {
    const tabs = ["Admission", "Education", "University", "Fee Details"]
    const [isEditAdmission,setEditAdmission]=useState(false);
    const [selected, setSelected] = useState(0);
    const [addmissionId, setAdmissionId] = useState("");
    const { getRoute, editRoute, postRoute, deleteById } = useApi();
    const { nationalities } = useContext(NationalitiesContext);
    const admissionObject = {
        inquiry_id: "",
        name: "",
        email: "",
        contact_no: "",
        alternate_no: "",
        address: "",
        date_of_birth: "",
        current_city: "",
        visa_type: "",
        telecaller_name: "",
    };
    const education_Details = {
        admission_id: "",
        highest_qualification: "",
        passing_year: 2012,
        name_of_institute: "",
        percentage_cgpa: "",
        is_employed: 0,
        current_company: "",
        current_designation: "",
        current_monthly_salary: 0,
        total_experience_years: 0,
        country_interested: "",
        visa_type: "",
        past_rejection_country_name: "",
        ielts_score: "",
        telecaller_name: "",
    };
    const [bankOptions, setBankOptions] = useState([]);
    const [genderOptions, setGenderOptions] = useState([]);
    const [visaOptions, setVisaOptions] = useState([]);
    const [educationDetails, setEducationDetail] = useState(education_Details);
    const [admissionDetail, setAdmissionDetail] = useState(admissionObject);
    const [employedOptions, setEmployedOptions] = useState([]);
    const [progressCount, setProgressCount] = useState(0);
    const [errors, setErrors] = useState({});
    const [stayInOptions, setStayInOptions] = useState([]);
    const location = useLocation();
    const createAdmission = location.state?.makeAdmission;
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        const getProgressCount = async () => {
            const { data } = await getRoute("/api/inquiry/filter", {
                id: createAdmission?.id,
            });
            setProgressCount(data[0]?.progress_count);

        };
        getProgressCount();
    }, [selected]);

    useEffect(() => {
        const getProgressCount = async () => {
            const { data } = await getRoute("/api/inquiry/filter", {
                id: createAdmission?.id,
            });
            const progressCount = data[0]?.progress_count
            setSelected(progressCount)
        };
        getProgressCount();
    }, []);

    useEffect(() => {
        const optionValues = async () => {
            const genderOptions = await getRoute(
                "api/inquiry/enum-values/inquiry/gender"
            );
            const visaOptions = await getRoute(
                "api/inquiry/enum-values/inquiry/visa_type"
            );
            const employedOptions = await getRoute(
                "api/inquiry/enum-values/education/employed_type"
            );
            const stayInOptions = await getRoute(
                "api/inquiry/enum-values/university/stay_in_type"
            );
            setEmployedOptions(
                employedOptions?.data?.map((type) => ({
                    label: type.charAt(0).toUpperCase() + type.slice(1).toLowerCase(),
                    value: type,
                }))
            );
            setStayInOptions(
                stayInOptions?.data?.map((stay) => ({
                    label: stay.charAt(0).toUpperCase() + stay.slice(1).toLowerCase(),
                    value: stay,
                }))
            );
            const { data, error } = await getRoute("/api/bank", "", false);
            setBankOptions(
                data?.map((bank) => ({
                    label: `${bank?.bank_name} : ${bank?.account_number} `,
                    value: bank?.id,
                }))
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
    }, []);

  
    return (
        <PrimaryContainer>
            <h2 className="sm:text-xl flex items-center justify-between w-full md:text-2xl font-extrabold text-[#283275] mb-4">
                <div>
                    Admission
                </div>
            </h2>
            <Tab.Group selectedIndex={selected} onChange={setSelected}>
                <Tab.List className="flex flex-col border-b-2 border-gray-300 sm:flex-row sm:space-x-9">
                    {tabs.map((tab, index) => (
                        <Tab
                            disabled={ isEditAdmission? false : progressCount < index}
                            key={tab}
                            className={({ selected }) =>
                                classNames(
                                    "text-base font-semibold text-seamlessBlue-700 focus:none leading-[60px]",
                                    selected ? "  font-semibold " : "font-semibold  mb-1"
                                )
                            }
                        >
                            {({ hover, selected }) => (
                                <>
                                    {tab}
                                    {selected && (
                                        <p className="w-full h-1 bg-inquiryBlue-800" />
                                    )}
                                </>
                            )}
                        </Tab>
                    ))}
                </Tab.List>

                <Tab.Panels>
                    <Tab.Panel>
                        <AdmissionForm
                        setEditAdmission={setEditAdmission}
                            nationalities={nationalities}
                            visaOptions={visaOptions}
                            admissionDetail={admissionDetail}
                            progressCount={progressCount}
                            setProgressCount={setProgressCount}
                            setAdmissionDetail={setAdmissionDetail}
                            setSelected={setSelected}
                            setAdmissionId={setAdmissionId}
                            errors={errors}
                            genderOptions={genderOptions}
                        />
                    </Tab.Panel>
                    <Tab.Panel>
                        <EducationForm
                        setEditAdmission={setEditAdmission}
                         setProgressCount={setProgressCount}
                            setIsModalOpen={setIsModalOpen}
                            progressCount={progressCount}
                            setAdmissionId={setAdmissionId}
                            employedOptions={employedOptions}
                            genderOptions={genderOptions}
                            setEducationDetail={setEducationDetail}
                            educationDetails={educationDetails}
                            addmissionId={addmissionId}
                            setSelected={setSelected}
                            errors={errors}
                        />
                    </Tab.Panel>
                    <Tab.Panel>
                        <UniversityDetails
                        setEditAdmission={setEditAdmission}
                         setProgressCount={setProgressCount}
                            progressCount={progressCount}
                            stayInOptions={stayInOptions}
                            universityDetails={admissionDetail}
                            setUniversityDetails={setAdmissionDetail}
                            setSelected={setSelected}
                            setAdmissionId={setAdmissionId}
                            errors={errors}
                            addmissionId={addmissionId}
                        />
                    </Tab.Panel>
                    <Tab.Panel>
                        <FeePayment
                        setEditAdmission={setEditAdmission}
                            progressCount={progressCount}
                            bankOptions={bankOptions}
                            feePaymentDetails={admissionDetail}
                            setFeePaymentDetails={setAdmissionDetail}
                            setSelected={setSelected}
                            setAdmissionId={setAdmissionId}
                            errors={errors}
                        />
                    </Tab.Panel>

                </Tab.Panels>
            </Tab.Group>
        </PrimaryContainer>

    );
}

export default Admission;
