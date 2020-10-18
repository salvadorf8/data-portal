import React from 'react';

import ViewOptions from '../viewing-options/view-options.component';

import './sidebar.styles.css';

const Sidebar = (props) => {
    return (
        <div className='sidebar'>
            <ViewOptions {...props} />
        </div>
    );
};

export default Sidebar;
