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

    const { getRoute, postRoute } = useApi();
    const [feePayment, setFeePayement] = useState({});
    const [totalPaiedAmount, setTotalPaiedAmount] = useState(0)
    const [lastFeePayment, setLastFeePayment] = useState([])
    const [admissionOptions, setAdmissionOptions] = useState([])
    const [selectedAdmission, setSelectedAdmission] = useState('');
    const [errors, setErrors] = useState({});
    const [bankOptions, setBankOptions] = useState([]);
    const [remainingAmount, setRemainingAmount] = useState(0);
    console.log(selectedAdmission)
    const getAdmissions = async () => {
        const { data } = await getRoute("api/admission");
        const admission_options = data?.filter(admission => admission?.fee_status !== 'completed').map(admission => ({
            value: admission?.id, label: `${admission?.first_name} ${admission?.last_name}`
        }))
        setAdmissionOptions(admission_options)
    };
    const handleFeePayment = (name, value) => {
        setFeePayement((pre) => ({
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
        const newremainingAmount = parseFloat(remainingAmount) || 0;
        const newtotalPaiedAmount = parseFloat(totalPaiedAmount) || 0;
        const newlastFeeTotalAmount = parseFloat(lastFeePayment?.total_amount) || 0;
        const currentRemaingAmount = newlastFeeTotalAmount - totalPaiedAmount - newremainingAmount;
        if (newremainingAmount + newtotalPaiedAmount > newlastFeeTotalAmount) {
            setErrors({ remaining_amount: "Remaining Amount is not valid" });
            return;
        } else {
            const { data } = await postRoute(`api/feepayment`, { ...lastFeePayment, current_amount: newremainingAmount, remaining_amount: currentRemaingAmount });
            setSelectedAdmission('')

        }
    };

    useEffect(() => {
        const getFeeHistory = async () => {
            const { data } = await getRoute("/api/feepayment/filter", {
                admission_id
                    : selectedAdmission
            }, false,);
            if (data) {
                const sortedData = data.sort((a, b) => {
                    return moment(b.updated_at).diff(moment(a.updated_at));
                });
                const lastFeePayment = sortedData[0];
                const totalPaiedAmount = sortedData?.reduce(
                    (sum, admission) => sum + (parseFloat(admission?.current_amount || 0)),
                    0
                );
                setTotalPaiedAmount(totalPaiedAmount)
                setRemainingAmount(lastFeePayment?.remaining_amount)
                setLastFeePayment(lastFeePayment);
            }
        };
        if (selectedAdmission) {
            getFeeHistory();
        }else{
            setTotalPaiedAmount('')
            setRemainingAmount('')
            setLastFeePayment('');
        }
    }, [selectedAdmission])
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
                                            <ReactSelect onChange={(option) => setSelectedAdmission(option?.value)} value={selectedAdmission || ""} options={admissionOptions} className='w-1/3' />
                                        </div>
                                        <div className='flex '>
                                            <label className="font-weight-bold">
                                                Last Amount
                                            </label> <span className='mx-4'>
                                                :
                                            </span>
                                            <p className="mb-0 text-muted">
                                                {lastFeePayment.current_amount || "N/A"}
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
                                                {lastFeePayment.total_amount || "N/A"}
                                            </p>
                                        </div>
                                        <div className="form-group">
                                            <InputLabel value={'Add Remaining Amount'}></InputLabel>
                                            <input
                                                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                                                value={remainingAmount}
                                                required="required"
                                                type="number"
                                                onChange={(e) =>
                                                    setRemainingAmount(e.target.value
                                                    )
                                                }
                                            />
                                            <InputError message={errors["remaining_amount"]} />
                                        </div>
                                        <div className="form-group">
                                            <InputLabel value={'Select BankAccount'}></InputLabel>
                                            <ReactSelect
                                                disabled={true}
                                                className='mt-1'
                                                value={lastFeePayment?.
                                                    bank_details_id
                                                    || ""}
                                                required="required"
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
