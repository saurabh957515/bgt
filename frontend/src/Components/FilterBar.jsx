import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { classNames } from '../provider';
import Flatpickr from "react-flatpickr";

import "flatpickr/dist/flatpickr.css";
const FilterBar = ({ setFilterField = () => { },
    filterField = {}, }) => {
    const sortOptions = [
        { name: 'Ascending', href: '#', current: true, value: "ASC" },
        { name: 'Descending', href: '#', current: false, value: "DESC" },
    ]
    return (
        <div className='flex items-center mr-4 gap-x-4'>
            <Menu as="div" className="relative inline-block">
                <div className="flex">
                    <MenuButton className="inline-flex justify-center text-sm font-medium text-gray-700 group hover:text-gray-900">
                        Sort
                        <ChevronDownIcon
                            aria-hidden="true"
                            className="flex-shrink-0 w-5 h-5 ml-1 -mr-1 text-gray-400 group-hover:text-gray-500"
                        />
                    </MenuButton>
                </div>

                <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                    <div className="py-1">
                        {sortOptions.map((option) => (
                            <MenuItem key={option.name}>
                                <div
                                    onClick={()=>{
                                        setFilterField(pre=>({
                                            ...pre,
                                            order:option?.value
                                        }))
                                    }}
                                    className={classNames(
                                        option.value === filterField?.order ? 'font-medium text-gray-900' : 'text-gray-500',
                                        'block px-4 py-2 text-sm data-[focus]:bg-gray-100',
                                    )}
                                >
                                    {option.name}
                                </div>
                            </MenuItem>
                        ))}
                    </div>
                </MenuItems>
            </Menu>
            <Flatpickr
                onChange={(data, date) => {
                    setFilterField((pre) => ({
                        ...pre,
                        date: date,
                    }));
                }}
                className='px-1'
                style={{
                    border: "1px solid #d1d5db",
                    borderRadius: "0.35rem",
                    width: "50%",
                    padding: "0.2rem 0.8rem",
                }}
                // options={{
                //     maxDate: tenYearsAgo,
                // }}
                required
                value={filterField?.date}
            />

            <div className="relative w-full">
                <input value={filterField?.first_name} onChange={(e) =>
                    setFilterField((pre) => ({
                        ...pre,
                        first_name: e.target.value,
                    }))
                } className="block p-2.5 w-full  text-sm  bg-white rounded-lg   border " placeholder="Name" required />
                <button type="submit" className="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white bg-white rounded-e-lg border  focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                    <MagnifyingGlassIcon className='w-6 h-6 text-gray-700' />

                </button>
            </div>

        </div>
    );
}

export default FilterBar;
