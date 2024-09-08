// ProgressBarComponent.js
import React from 'react';
import './ProgressBarComponent.css'; // Optional, if you prefer separate CSS files

const ProgressBarComponent = ({ completedPhases }) => {
  return (
    <div className="progress-container">
      {Array.from({ length: 4 }, (_, index) => (
        <div key={index} className="d-flex align-items-center flex-grow-1">
          {/* Phase Circle */}
          <div
            className={`progress-step ${
              index < completedPhases ? 'completed' : ''
            }`}
          >
            {index + 1}
          </div>
          {/* Connecting Line */}
          {index < 3 && (
            <div
              className={`progress-line ${
                index < completedPhases - 1 ? 'completed' : ''
              } flex-grow-1`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressBarComponent;
