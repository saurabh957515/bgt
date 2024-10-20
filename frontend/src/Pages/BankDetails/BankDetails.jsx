import React, { useState, useEffect } from 'react';
import PrimaryContainer from '../../Components/PrimaryContainer';
import FilterBar from '../../Components/FilterBar';
import SecondaryButton from '../../Components/SecondaryButton';
import SaveButton from '../../Components/SaveButton';
import { useNavigate } from 'react-router-dom';
import useApi from '../../utils/UseApi';
import PrimaryButton from '../../Components/PrimaryButton';

const BankDetails = () => {
    const [filterField, setFilterField] = useState({
        date: "",
        first_name: "",
        order: "",
        telecaller_name: "",
    });
    const [banks, setBanks] = useState([]);
    const navigate = useNavigate();
    const { getRoute, deleteById } = useApi();
    const [errors, setErrors] = useState({});
    const getBanks = async () => {
        const { data } = await getRoute("/api/bank/filter", filterField,false);
        setBanks(data);
    };
    useEffect(() => {
        getBanks();
    }, [filterField]);
    const handleDelete = async (bank) => {
        const { data } = await getRoute("api/feepayment");
        const isBankAdded = data?.find(
            (admissionnData) => admissionnData?.bank_detail_id === bank?.id
        );
        if (isBankAdded) {
            setErrors({ [bank?.id]: "This Bank is Associated with the admission" });
            return;
        } else {
            const { data, error } = await deleteById(`api/bank/${bank?.id}`, true);
            if (data?.status == "success") {
                getBanks();
            }
        }
    };

    return (
        <PrimaryContainer>
            <div className='flex flex-col w-full h-full gap-8'>
                <div className='flex items-center justify-between w-full p-4 bg-white rounded-lg '>
                    <div className='flex items-center justify-between grow gap-x-4'>
                        <h1 className='text-base font-semibold '>
                            BankDetails
                        </h1>
                        <FilterBar filterField={filterField} setFilterField={setFilterField}
                        />
                    </div>
                    <div className='font-semibold'>
                        <PrimaryButton onClick={() => {
                            navigate('/create-bank')
                        }}>
                            Create Bank
                        </PrimaryButton>

                    </div>
                </div>
                <div className='flex flex-col h-full gap-4 overflow-auto sm:grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grow scrollbar-hide'>
                    {banks?.map(bank => <div key={bank?.id} className='flex flex-col p-4 space-y-2 overflow-auto bg-white rounded-lg shadow-sm h-fit grow min-h-40'>
                        <h1 className='flex text-base font-medium'>Name : <span className='ml-2 text-base text-blue-500 text-semibold'>
                            {bank?.
                                account_holder_name
                            }
                        </span> </h1>
                        <h1 className='text-base font-medium'>Bank Name :
                            <span className='ml-2 text-base text-blue-500 text-semibold'>
                                {bank?.branch_name}
                            </span>
                        </h1>
                        <div className='text-base font-medium'>
                            Account Number : <span className='ml-2 text-base text-blue-500 text-semibold'>
                                {bank?.account_number}    </span>
                        </div>
                        <div className='flex gap-2 max-md:flex-col'>
                            <SecondaryButton onClick={(e) => {
                                e.preventDefault();
                                navigate('/create-bank', { state: { bankData: bank } })
                            }}>
                                Edit
                            </SecondaryButton>
                            <SaveButton onClick={(e) => {
                                e.preventDefault();
                                handleDelete(bank)
                            }}>
                                Delete
                            </SaveButton>
                        </div>
                    </div>)}


                </div>
            </div>
        </PrimaryContainer>

    );
}

export default BankDetails;
