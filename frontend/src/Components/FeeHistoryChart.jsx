import React from 'react';
import { Chart } from 'react-google-charts';

const FeeHistoryTimelineChart = ({ feeList }) => {
    const data = [['Label', 'Event', 'Start Date', 'End Date']];

    feeList.forEach(({ date, fee }, index) => {
        const startDate = new Date(date);
        const endDate = new Date(date);

        // Add time differentiation for multiple payments on the same day
        startDate.setHours(9 + index); // 9 AM + index hours for each additional fee
        endDate.setHours(9 + index + 1); // End event 1 hour later

        data.push([`Fee on ${date} (${index + 1})`, `Fee: ${fee}`, startDate, endDate]);
    });

    const options = {
        timeline: {
            showRowLabels: true,
        },
        title: 'Fee History Timeline',
        colors: ['#015ad6'],
    };

    return (
        <div className="w-full h-full">
            <Chart
                chartType="Timeline"
                data={data}
                options={options}
                width="100%"
                height="400px"
            />
        </div>
    );
};

export default FeeHistoryTimelineChart;
