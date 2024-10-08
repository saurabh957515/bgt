import React, { useEffect, useState } from 'react';
import PrimaryContainer from '../../Components/PrimaryContainer';
import PrimaryButton from '../../Components/PrimaryButton';
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import useApi from '../../utils/UseApi';
import { countries } from '../../provider';
import ProgressBarComponent from '../../Components/ProgressBarComponent';

import FilterBar from '../../Components/FilterBar';
const Inquiry = () => {

    const { getRoute, deleteById, postRoute } = useApi();
    const [inquiryList, setInquiryList] = useState([]);
    const [filterField, setFilterField] = useState({
        date: "",
        first_name: "",
        order: "",
        telecaller_name: "",
    });

    const navigate = useNavigate();
    const getData = async () => {
        const inquiresData = await getRoute(
            "/api/inquiry/filter",
            filterField,
            false
        );
        setInquiryList(inquiresData?.data);
    };

    useEffect(() => {
        getData();
    }, [filterField]);

    const deleteInquiry = async (id) => {
        const inquiresData = await deleteById(`api/inquiry/${id}`, true);
        if (inquiresData?.data?.status == "success") {
            getData();
        }
    };

    const makeAdmission = (inquiry) => {
        navigate('/admission', { state: { makeAdmission: inquiry } })
    };

    return (
        <PrimaryContainer>
            <div className='flex flex-col w-full h-full gap-8'>
                <div className='flex items-center justify-between w-full p-4 bg-white rounded-lg '>
                    <div className='flex items-center justify-between grow gap-x-4'>
                        <h1 className='text-base font-semibold '>
                            Inquiry
                        </h1>
                        <FilterBar 
                        
                        filterField={filterField} setFilterField = { setFilterField}
                        />
                    </div>
                    <div className='font-semibold'>
                        <PrimaryButton onClick={() => {
                            navigate('/create-inquiry')
                        }}>
                            Create Inquiry
                        </PrimaryButton>

                    </div>
                </div>
                <div className='overflow-auto grow scrollbar-hide'>
                    <div className="w-full h-full overflow-x-auto ">
                        {inquiryList && inquiryList?.length > 0 ? (
                            <table className="min-w-full table-auto">
                                <thead className='sticky top-0 '>
                                    <tr className="text-base uppercase bg-gray-200">
                                        <th className="px-4 py-2 font-semibold text-center">No</th>
                                        <th className="px-4 py-2 font-semibold text-center">DATE</th>
                                        <th className="w-1/4 px-4 py-2 font-semibold text-center">NAME</th>
                                        <th className="px-4 py-2 font-semibold text-center">CONTACT NO</th>
                                        <th className="px-4 py-2 font-semibold text-center">Country</th>
                                        <th className="px-4 py-2 font-semibold text-center">TYPE</th>
                                        <th className="px-4 py-2 font-semibold text-center">ACTION</th>
                                        <th className="px-4 py-2 font-semibold text-center">PROGRESS</th>
                                    </tr>
                                </thead>
                                <tbody className='h-full text-sm bg-white'>
                                    {inquiryList.map((inquiry, index) => (
                                        <tr key={inquiry?.id} className="border-t">
                                            <td className="px-4 py-2 font-bold text-center">{index + 1}</td>
                                            <td className="px-4 py-2 text-center">
                                                {moment(inquiry?.date).format("YYYY-MM-DD")}
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                {inquiry?.first_name} {inquiry?.last_name}
                                            </td>
                                            <td className="px-4 py-2 text-center">{inquiry?.contact_no}</td>
                                            <td className="px-4 py-2 text-center">
                                                {countries[inquiry?.interested_country] || "-"}
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                {inquiry?.visa_type?.replace(/visa/gi, "Type")}
                                            </td>
                                            <td className="px-4 py-2">
                                                <div className="flex justify-center space-x-2">
                                                    <span
                                                        onClick={() =>
                                                            history.push({
                                                                pathname: "/createinquiry",
                                                                state: { inquiryData: inquiry },
                                                            })
                                                        }
                                                        className="cursor-pointer text-primary "
                                                    >
                                                        Edit
                                                    </span>
                                                    <span
                                                        onClick={() => deleteInquiry(inquiry?.id)}
                                                        className="text-red-600 cursor-pointer "
                                                    >
                                                        Delete
                                                    </span>
                                                    <span
                                                        onClick={() => makeAdmission(inquiry)}
                                                        className="text-green-600 cursor-pointer "
                                                    >
                                                        Confirm
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                <ProgressBarComponent
                                                    completedPhases={inquiry?.progress_count}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div
                                className="py-4 mt-3 text-center bg-gray-100 rounded-md opacity-90"
                                role="alert"
                            >
                                No inquiries found.
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </PrimaryContainer>

    );
}

export default Inquiry;
