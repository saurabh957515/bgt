import React from 'react';
import { classNames } from '../provider';

const CancelButton = ({ onClick, disabled, children ,className}) => {
    return (
        <button onClick={onClick} className={classNames("px-8 py-2 my-2  font-semibold text-gray-400 bg-white border rounded-lg", disabled && 'opacity-50',className)}>
            {children}

        </button>
    );
}

export default CancelButton;
