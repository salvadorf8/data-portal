import React, { Fragment } from 'react';

import ScoreList from '../score-list/score-list.component';
import Sidebar from '../sidebar/sidebar.component';
import { getScoreData } from '../../firebase/firebase-utils';

import './data-portal.styles.css';

class DataPortal extends React.Component {
    state = { scores: [], searchField: '', sortBy: '' };

    handleChange = (e) => {
        this.setState({ searchField: e.target.value }, () => console.log(this.state.searchField));
    };

    handleSort = (e) => {
        console.log(e.target.value);
        this.setState({ sortBy: e.target.value });
    };

    componentDidMount = async () => {
        const scoresColRef = await getScoreData();
        const scoresColSnapshot = await scoresColRef.get();

        const collectionsMap = scoresColSnapshot.docs.map((doc) => {
            const { createdAt, initials, reactionTime, totalTime } = doc.data();

            return {
                id: doc.id,
                createdAt: new Date(createdAt.seconds * 1000),
                initials: initials,
                reactionTime: reactionTime.toFixed(3),
                bestTime: totalTime.toFixed(3)
            };
        });

        this.setState({ scores: collectionsMap });
    };

    render() {
        const { sortBy, searchField, scores } = this.state;

        const types = {
            createdat: 'createdAt',
            initials: 'initials',
            reactiontime: 'reactionTime',
            besttime: 'bestTime'
        };

        const sortProperty = types[sortBy];

        const filteredScores = scores.filter((score) => score.initials.toLowerCase().includes(searchField.toLowerCase()));
        const sortedScores = filteredScores.sort((a, b) => (b[sortProperty] < a[sortProperty] ? 1 : -1));

        return (
            <Fragment>
                <div className='item-sidebar'>
                    <Sidebar value={this.state.searchField} handleChange={this.handleChange} handleSort={this.handleSort} />
                </div>
                <ScoreList scores={sortedScores} />
            </Fragment>
        );
    }
}

export default DataPortal;
