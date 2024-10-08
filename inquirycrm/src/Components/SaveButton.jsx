import React from 'react';
import { classNames } from '../provider';

const SaveButton = ({ disabled, onClick, children, className }) => {
    return (
        <button onClick={onClick} disabled={disabled} className={classNames('px-8 py-2 my-2 ml-4 font-semibold text-white rounded-lg bg-inquiryBlue-800', disabled && 'opacity-50', className)}>
            {children}

        </button>
    );
}

export default SaveButton;
