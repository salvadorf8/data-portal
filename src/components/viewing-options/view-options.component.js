import React, { Fragment } from 'react';

import { ReactComponent as ChevronRight } from '../../assets/chevron-double-right.svg';
import { ReactComponent as ArrowDown } from '../../assets/arrow-down-icon.svg';

import './view-options.styles.css';

const ViewOptions = ({ handleChange, handleSort }) => {
    return (
        <Fragment>
            <div className='form-group '>
                <label className='label-font'>Sort by</label>
                <div className='input-group-prepend set-relative'>
                    <select type='input' className='form-control custom-input' id='sort' onChange={handleSort}>
                        <option value=''>Select an option</option>
                        <option value='initials'>Initials</option>
                        <option value='reactiontime'>Average</option>
                        <option value='besttime'>Best</option>
                    </select>
                    <span className='set-absolute'>
                        <ArrowDown />
                    </span>
                </div>
            </div>
            <div className='form-group'>
                <label className='label-font'>Search Users</label>
                <div className='input-group-prepend set-relative'>
                    <input type='text' className='form-control custom-input' id='search' placeholder='Enter a name' onChange={handleChange} />
                    <span className='set-absolute'>
                        <ChevronRight />
                    </span>
                </div>
            </div>
        </Fragment>
    );
};

export default ViewOptions;
