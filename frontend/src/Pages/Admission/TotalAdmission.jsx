import React, { useEffect, useState } from 'react';
import PrimaryContainer from '../../Components/PrimaryContainer';
import FilterBar from '../../Components/FilterBar';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { classNames } from '../../provider';
import { MdOutlineDelete, MdOutlineModeEditOutline } from 'react-icons/md';
import useApi from '../../utils/UseApi';
import ViewImage from './Partials/ViewImage';
import { useNavigate } from 'react-router-dom';

const TotalAdmission = () => {
    const [filterField, setFilterField] = useState({
        date: "",
        first_name: "",
        order: "",
        telecaller_name: "",
    });
    const navigate = useNavigate()
    const [activeIndex, setActiveIndex] = useState(null);
    const [admissions, setAdmissions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deletedAdmission, setDeleteAdmission] = useState({});
    const { getRoute, deleteById } = useApi();
    const getData = async () => {
        const { data } = await getRoute("api/admission/getall", filterField);
        setAdmissions(data);
    };

    useEffect(() => {
        getData();
    }, [filterField]);
    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    const handleDeleteAdmission = async (id) => {
        const { data } = await deleteById(`api/admission/${id}`, true);
        if (data?.status == "success") {
            getData();
            setIsModalOpen(false);
        }
    };
    const handleEditAdmission = (id) => {
        navigate("/admission", {
            state: { admissionId: id },
        });
    };
    return (
        <PrimaryContainer>
            <div className='flex flex-col w-full h-full gap-8'>
                <div className='flex items-center justify-between w-full p-4 bg-white rounded-lg '>
                    <div className='flex items-center justify-between grow gap-x-4'>
                        <h1 className='text-base font-semibold '>
                            Admissions
                        </h1>
                        <FilterBar
                            filterField={filterField} setFilterField={setFilterField}
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-4 overflow-auto grow scrollbar-hide'>
                    {admissions?.map((allDetails, index) => <Disclosure key={allDetails?.admission?.id} as='div' className='w-full '>
                        {({ open }) => (
                            <>
                                <DisclosureButton className={classNames("flex items-center text-base font-medium bg-white justify-between w-full gap-2 py-3 px-4  ", open ? 'rounded-t-lg' : 'rounded-lg')}>
                                    <div className='flex items-start'>
                                        <div className='text-blue-700'>
                                            {index + 1}{")  "}
                                        </div>
                                        <div className='flex flex-col items-start ml-1'>
                                            {allDetails?.admission?.first_name}
                                            <div className='text-sm text-gray-500'>
                                                {allDetails?.admission?.telecaller_name}
                                            </div>
                                        </div>

                                    </div>
                                    <div className='flex gap-x-2'>
                                        <span onClick={(e) => {
                                            e.preventDefault();
                                            handleEditAdmission(allDetails?.admission?.id)
                                        }} className='font-medium text-blue-500'>
                                            <MdOutlineModeEditOutline className='w-6 h-6' />
                                        </span>
                                        <span onClick={(e) => {
                                            e.preventDefault();
                                            handleDeleteAdmission(allDetails?.admission?.id)
                                        }} className='font-medium text-red-500'>
                                            <MdOutlineDelete className='w-6 h-6' />
                                        </span>
                                        <ChevronDownIcon className={classNames('w-6 h-6', open && 'rotate-180')} />
                                    </div>

                                </DisclosureButton>
                                <DisclosurePanel className={'bg-white grid grid-cols-4 gap-4 px-4 font-normal py-4 text-sm w-full'}>

                                    <ViewImage imageDoc={allDetails?.admission?.photo_document} />
                                    <div className='flex flex-col w-full col-span-3 gap-4 p-4 '>

                                        <div className='flex items-center w-full text-sm font-semibold capitalize'><span className='w-1/5 mr-2'>Insitute Name</span> : <span className='ml-2 text-sm font-medium capitalize'>
                                            {allDetails?.education?.name_of_institute}</span></div>

                                        <div className='flex items-center w-full text-sm font-semibold capitalize'><span className='w-1/5 mr-2'>Course Details</span> : <span className='ml-2 text-sm font-medium capitalize'>
                                            {allDetails?.education?.course_details}</span></div>
                                        <div className='flex items-center w-full text-sm font-semibold capitalize'><span className='w-1/5 mr-2'>Percentage?CGPA</span> : <span className='ml-2 text-sm font-medium capitalize'>
                                            {allDetails?.education?.percentage_cgpa}</span></div>
                                        <div className='flex items-center w-full text-sm font-semibold capitalize'><span className='w-1/5 mr-2'>IELTS Score</span> : <span className='ml-2 text-sm font-medium capitalize'>
                                            {allDetails?.education?.ielts_score}</span></div>
                                        <div className='flex items-center w-full text-sm font-semibold capitalize'><span className='w-1/5 mr-2'>Passing Year</span> : <span className='ml-2 text-sm font-medium capitalize'>
                                            {allDetails?.education?.passing_year}</span></div>
                                    </div>
                                </DisclosurePanel>
                            </>
                        )}
                    </Disclosure>)}

                </div>
            </div>
        </PrimaryContainer>
    );
}

export default TotalAdmission;
