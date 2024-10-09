import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React, { memo } from 'react';
import { classNames } from '../provider';

const SearchBar = ({ onChange, value,className,placeholder='Name' }) => {
    return (
        <div>
            <div className="relative w-full">
                <input value={value} onChange={onChange}
                    className={classNames("block p-2 w-full  text-sm  bg-white rounded-lg border",className )} placeholder={placeholder} required />
                <button type="submit" className="absolute top-0 h-full p-2 text-sm font-medium text-white bg-white border end-0 rounded-e-lg focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                    <MagnifyingGlassIcon className='w-6 h-6 text-gray-700' />
                </button>
            </div>
        </div>
    );
}

export default memo(SearchBar);
