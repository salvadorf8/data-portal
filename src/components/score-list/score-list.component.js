import React from 'react';
import { format } from 'date-fns';
import ScoreItem from '../score-item/score-item.component';

import { ReactComponent as UserIcon } from '../../assets/users.svg';
import { ReactComponent as ReactionTimeIcon } from '../../assets/reactiontime.svg';
import { ReactComponent as LoadMore } from '../../assets/load-more-participants.svg';

import './score-list.styles.css';

class ScoreList extends React.Component {
    renderList = () => {
        let number = 1;
        return this.props.scores.map((score) => {
            return <ScoreItem key={score.id} number={number++} initials={score.initials} reactionTime={score.reactionTime} bestTime={score.bestTime} createdAt={format(new Date(score.createdAt), 'PPP')} />;
        });
    };

    render() {
        return (
            <div className='custom-table'>
                <div className='table-header'>
                    <div className='item-a1'>
                        <UserIcon />
                    </div>
                    <div className='item-a'>PARTICIPANT</div>
                    <div className='item-b1'>
                        <ReactionTimeIcon />
                    </div>
                    <div className='item-b'>REACTION TIME</div>
                    <div className='item-c'></div>
                    <div className='item-d1'></div>
                    <div className='item-d'>INITIALS</div>
                    <div className='item-e1'></div>
                    <div className='item-e'>AVG</div>
                    <div className='item-f'>BEST</div>
                </div>
                <div className='table-data'>{this.renderList()}</div>
                <div className='table-footer'>
                    <div className='option' onClick={this.props.handleClick}>
                        LOAD MORE PARTICIPANTS <LoadMore />
                    </div>
                </div>

                {/* <button onClick={this.props.handleClick}>LOAD MORE PARTICIPANTS</button> */}
            </div>
        );
    }
}

export default ScoreList;
