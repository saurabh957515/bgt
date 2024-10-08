import React, { useState, useEffect } from 'react';
import PrimaryButton from '../../../Components/PrimaryButton';
import PrimaryContainer from '../../../Components/PrimaryContainer';
import { useLocation, useNavigate } from 'react-router-dom';
import useApi from '../../../utils/UseApi';
import ReactSelect from '../../../Components/ReactSelect';
import InputLabel from '../../../Components/InputLabel';
import InputError from '../../../Components/InputError';
const bankObject = {
    account_holder_name: "",
    account_number: "",
    bank_name: "",
    branch_name: "",
    ifsc_code: "",
    account_type: "",
    branch_address: "",
};
const CreateBank = () => {
    const location = useLocation();
    const bankDetails = location.state?.bankData;
    const navigate = useNavigate();
    const { postRoute, getRoute, editRoute } = useApi();
    const [typeOptions, setTypeOptions] = useState([]);
    const [details, setDetails] = useState(bankObject);
    const [isEdit, setIsEdit] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const getTypes = async () => {
            const { data } = await getRoute("/api/bank/gettypes");
            setTypeOptions(
                Object.entries(data)?.map(([key, value]) => ({
                    label: key,
                    value: value,
                }))
            );
        };
        getTypes();
    }, []);

    useEffect(() => {
        if (bankDetails?.id) {
            setIsEdit(true);
            setDetails(bankDetails);
        } else {
            setDetails(bankObject);
            setIsEdit(false);
        }
    }, [bankDetails]);

    const handleBankDetails = (name, value) => {
        setDetails((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = isEdit
                ? await editRoute(`/api/bank/${details?.id}`, details)
                : await postRoute("/api/bank", details);
            if (response?.errors) {
                setErrors(response?.errors);
            } else {
                navigate("/bankDetails");
            }
        } catch (error) {
            console.error("Submission error:", error);
        }
    };
    return (
        <PrimaryContainer>
            <div className='flex flex-col w-full h-full gap-8'>
                <div className='flex items-center justify-between w-full p-4 bg-white rounded-lg '>
                    <div>
                        <h1 className='text-base font-semibold '>
                            Create Bank
                        </h1>
                    </div>
                    <div className='font-semibold'>
                        <PrimaryButton onClick={() => {
                            navigate('/bankdetails')
                        }}>
                            Back
                        </PrimaryButton>

                    </div>
                </div>
                <div className=' grow scrollbar-hide'>
                    <form onSubmit={handleSubmit} className="w-full p-6 mx-auto bg-white rounded-lg shadow-md">
                        <div className="mb-4">
                            <h2 className="mb-4 text-xl font-bold">Bank Information</h2>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                                <div className="form-group col-md-6">
                                    <InputLabel value={"Account HolderName"}></InputLabel>
                                    <input
                                        required
                                        value={details?.account_holder_name}
                                        className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                                        onChange={(e) =>
                                            handleBankDetails("account_holder_name", e.target.value)
                                        }
                                    />

                                    <InputError message={errors["account_holder_name"]} />
                                </div>

                                <div className="form-group col-md-6">

                                    <InputLabel value={"Account Number"}></InputLabel>
                                    <input
                                        required
                                        type="number"
                                        maxLength={18}
                                        value={details?.account_number}
                                        className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                                        onChange={(e) =>
                                            handleBankDetails("account_number", e.target.value)
                                        }
                                    />

                                    <InputError message={errors["account_number"]} />

                                </div>

                                <div className="form-group col-md-6">

                                    <InputLabel value={"Bank Name"}></InputLabel>
                                    <input
                                        required
                                        value={details?.bank_name}
                                        className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                                        onChange={(e) =>
                                            handleBankDetails("bank_name", e.target.value)
                                        }
                                    />

                                    <InputError message={errors["bank_name"]} />

                                </div>

                                <div className="form-group col-md-6">
                                    <InputLabel value={"IFSC Code"}></InputLabel>
                                    <input
                                        required
                                        maxLength={11}
                                        value={details?.ifsc_code}
                                        className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                                        onChange={(e) =>
                                            handleBankDetails("ifsc_code", e.target.value)
                                        }
                                    />
                                    <InputError message={errors["ifsc_code"]} />

                                </div>

                                <div className="form-group col-md-6">
                                    <InputLabel value={"Account Type"}></InputLabel>
                                    <ReactSelect
                                        value={details?.account_type}
                                        required
                                        options={typeOptions}
                                        onChange={(e) => handleBankDetails("account_type", e.value)}
                                    />
                                    <InputError message={errors["account_type"]} />

                                </div>
                                <div className="form-group col-md-6">
                                    <InputLabel value={"Branch Name"}></InputLabel>


                                    <input
                                        required
                                        maxLength={11}
                                        value={details?.branch_name}
                                        className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                                        onChange={(e) =>
                                            handleBankDetails("branch_name", e.target.value)
                                        }
                                    />
                                    <InputError message={errors["branch_name"]} />
                                </div>
                                <div className="form-group col-md-6">
                                    <InputLabel value={"Branch Name"}></InputLabel>
                                    <input
                                        required
                                        type="text"
                                        value={details?.branch_address}
                                        className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                                        onChange={(e) =>
                                            handleBankDetails("branch_address", e.target.value)
                                        }
                                    />
                                    <InputError message={errors["branch_name"]} />
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

export default CreateBank;
