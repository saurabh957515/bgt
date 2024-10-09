import React, { useState, useEffect } from 'react';
import PrimaryContainer from '../../Components/PrimaryContainer';
import useApi from '../../utils/UseApi';
import moment from 'moment'
import ReactSelect from '../../Components/ReactSelect';
import { CurrencyRupeeIcon, ExclamationCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import InputLabel from '../../Components/InputLabel';
import InputError from '../../Components/InputError';
import { classNames } from '../../provider';
const Fees = () => {

    const [admissions, setAdmissions] = useState([]);
    const { getRoute, editRoute } = useApi();
    const [selectedAdmission, setSelectedAdmission] = useState({});
    const [errors, setErrors] = useState({});
    const [bankOptions, setBankOptions] = useState([]);
    const [selectedFeeDatails, setSelectedFeeDetails] = useState({});
    const getAdmissions = async () => {
        const { data } = await getRoute("api/admission/getall");
        setAdmissions(
            data?.filter((admission) => admission?.fee_details?.remaining_amount)
        );
    };
    const [remainingAmount, setRemainingAmount] = useState(0);
    const handleFeePayment = (name, value) => {
        setSelectedFeeDetails((pre) => ({
            ...pre,
            [name]: value,
        }));
    };
    useEffect(() => {
        getAdmissions();
        const getBankOption = async () => {
            const { data } = await getRoute("/api/bank", "", false);
            setBankOptions(
                data?.map((bank) => ({
                    label: `${bank?.bank_name} : ${bank?.account_number}`,
                    value: bank?.id,
                }))
            );
        };
        getBankOption();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (+selectedFeeDatails?.remaining_amount !== +remainingAmount) {
            setErrors({ remaining_amount: "Remaining Amount is not valid" });
            return;
        } else {
            let newpaidAmount = +selectedFeeDatails?.paid_amount + +remainingAmount;

            // const { errors, data } = await editRoute(
            //   `/api/feepayment/${selectedFeeDatails?.id}`,
            //   { ...selectedFeeDatails, paid_amount: `${newpaidAmount}` }
            // );

            const updatedAdmission = await editRoute(
                `api/admission/${selectedAdmission?.admissionDetails_id}`,
                {
                    ...selectedAdmission,
                    remaining_amount: "0",
                    date_of_birth: moment(selectedAdmission?.date_of_birth).format(
                        "YYYY-MM-DD"
                    ),
                    paid_amount: `${newpaidAmount}`,
                }
            );
            getAdmissions();
            setSelectedAdmission({});
        }
    };
    return (
        <PrimaryContainer>
            <div className='flex flex-col w-full h-full '>
                <h1 className='text-base font-semibold text-seamlessBlue-900'>
                    Fee Payment
                </h1>
                <div className='py-5 grow'>
                    <div className='flex w-full h-full bg-white rounded-lg overflow-clip'>
                        <div className='items-center grow'>
                            <form onSubmit={handleSubmit} className="w-full p-8">
                                <div className='w-full'>
                                    <h2 className='text-base font-semibold'>Complete Fee Payment</h2>
                                    <div className='grid w-full grid-cols-2 gap-4 mt-4 '>
                                        <div className='flex items-center col-span-2 gap-x-4'>
                                            <InputLabel value={"Name   :"} className="font-weight-bold">
                                            </InputLabel> 
                                            <ReactSelect className='w-1/3'/>
                                        </div>
                                        <div className='flex '>
                                            <label className="font-weight-bold">
                                                Last Amount
                                            </label> <span className='mx-4'>
                                                :
                                            </span>
                                            <p className="mb-0 text-muted">
                                                {selectedFeeDatails.paid_amount || "N/A"}
                                            </p>
                                        </div>
                                        <div className='flex '>
                                            <label className="font-weight-bold">
                                                Total Amount
                                            </label>
                                            <span className='mx-4'>
                                                :
                                            </span>
                                            <p className="mb-0 text-muted">
                                                {selectedFeeDatails.total_amount || "N/A"}
                                            </p>
                                        </div>
                                        <div className="form-group">
                                            <InputLabel value={'Add Remaining Amount'}></InputLabel>
                                            <input
                                                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                                                value={selectedFeeDatails?.remaining_amount || ""}
                                                required="required"
                                                type="number"
                                                onChange={(e) =>
                                                    handleFeePayment(
                                                        "remaining_amount",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <InputError message={errors["remaining_amount"]} />
                                        </div>
                                        <div className="form-group">
                                            <InputLabel value={'Select BankAccount'}></InputLabel>
                                            <ReactSelect
                                                className='mt-1'
                                                value={selectedFeeDatails?.bank_detail_id || ""}
                                                required="required"
                                                onChange={(e) =>
                                                    handleFeePayment("bank_detail_id", e.value)
                                                }
                                                options={bankOptions}
                                            />
                                            <InputError message={errors["bank_detail_id"]} />
                                        </div>
                                        <button className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md w-fit" type="submit">
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </PrimaryContainer>

    );
}

export default Fees;
