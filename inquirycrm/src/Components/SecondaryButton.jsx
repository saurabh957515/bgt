import React from 'react';
import { classNames } from '../provider';

const SecondaryButton = ({ disabled, onClick, children, className, ...props }) => {
    return (
        <button {...props} onClick={onClick} disabled={disabled} className={classNames('px-8 py-2 my-2  font-semibold text-white rounded-lg bg-inquiryBlue-900', disabled && 'opacity-50', className)}>
            {children}

        </button>
    );
}

export default SecondaryButton;




