import moment from 'moment';
import React from 'react';

const FeeHistoryTable = ({ feeList }) => {
    return (  
        <div className="flex flex-col w-full h-full overflow-auto max-h-96">
            <table className="min-w-full border border-gray-300 grow">
                <thead>
                    <tr className="sticky top-0 bg-gray-100">
                        <th className="px-4 py-2 text-sm font-medium border">S.No</th>
                        <th className="px-4 py-2 font-medium border ">Date</th>
                        <th className="px-4 py-2 font-medium border ">Fee</th>
                        <th className="px-4 py-2 font-medium border ">Current Amount</th>
                        <th className="px-4 py-2 font-medium border ">Remaining Amount</th>
                        <th className="px-4 py-2 font-medium border ">Total Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {feeList?.map((item, index) => (
                        <tr key={item.id} className="text-center">
                            <td className="px-4 py-2 border">{index + 1}</td>
                            <td className="px-4 py-2 border">{moment(item?.updated_at).format('YYYY-MM-DD HH:mm:ss')}</td>
                            <td className="px-4 py-2 border">{item.fee}</td>
                            <td className="px-4 py-2 border">{item.current_amount}</td>
                            <td className="px-4 py-2 border">{item.remaining_amount}</td>
                            <td className="px-4 py-2 border">{item.total_amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FeeHistoryTable;
