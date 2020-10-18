import React, { Fragment } from 'react';

import { ReactComponent as InfoIcon } from '../../assets/info.svg';
import { ReactComponent as ReactionTimeIconSmall } from '../../assets/reaction-time-small.svg';

import './score-item.styles.css';

const ScoreItem = (props) => {
    return (
        <Fragment>
            <div className='body-container'>
                <div className='item-1'>{props.number}</div>
                <div className='item-2'>{props.initials}</div>
                <div className='item-3'>
                    <ReactionTimeIconSmall />
                </div>
                <div className='item-4'>{props.reactionTime}s</div>
                <div className='item-5'>{props.bestTime}s</div>
                <div className='item-6'>
                    <InfoIcon />
                </div>
            </div>
        </Fragment>
    );
};

export default ScoreItem;
