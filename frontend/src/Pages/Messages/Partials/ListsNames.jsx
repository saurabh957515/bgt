import React from 'react';
import SearchBar from '../../../Components/SearchBar';
import CheckBox from '../../../Components/CheckBox'
const ListsNames = () => {
    return (
        <div className='mt-4'>
            <SearchBar placeholder='Search Inquiry' className="py-2" />
            <div className='flex justify-between px-3 py-2'>
            
                <div>
                   <CheckBox/>
                    Name
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    );
}

export default ListsNames;
