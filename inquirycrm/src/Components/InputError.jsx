import React from 'react';

const InputError = ({ message }) => {
    return (
        <p className='block text-sm font-medium text-red-500'>
            {message}
        </p>
    );
}

export default InputError;
