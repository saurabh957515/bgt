import React from 'react';

const ProgressBarComponent = ({ completedPhases }) => {
  return (
    <div className="flex items-center w-full">
      {Array.from({ length: 4 }, (_, index) => (
        <div key={index} className="flex items-center w-full">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full text-white font-bold ${
              index < completedPhases ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            {index + 1}
          </div>
          {index < 3 && (
            <div
              className={`h-1 flex-grow mx-2 ${
                index < completedPhases - 1 ? 'bg-green-500' : 'bg-gray-300'
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressBarComponent;
