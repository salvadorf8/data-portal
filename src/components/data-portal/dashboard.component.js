import React, { Fragment } from 'react';

import ScoreList from '../score-list/score-list.component';
import Sidebar from '../sidebar/sidebar.component';
import { firestore, getMoreScoresV2 } from '../../firebase/firebase-utils';

import './dashboard.styles.css';

class DataPortal extends React.Component {
    state = { scores: [], searchField: '', sortBy: 'createdAt', listeners: [], start: null, end: null };

    handleChange = (e) => {
        this.setState({ searchField: e.target.value });
    };

    handleSort = (e) => {
        this.setState({ sortBy: e.target.value });
    };

    getScoresV2 = () => {
        let scoresColRef = firestore.collection('scores');
        // single query to get startAt snapshot
        scoresColRef
            .orderBy('createdAt', 'desc')
            .limit(4)
            .get()
            .then((snapshots) => {
                this.setState({ start: snapshots.docs[snapshots.docs.length - 1] });
                // create listener using startAt snapshot (starting boundary)
                let listener = scoresColRef
                    .orderBy('createdAt')
                    .startAt(this.state.start)
                    .onSnapshot((scores) => {
                        let newArray = [];

                        scores.forEach((doc) => {
                            const { createdAt, initials, reactionTime, totalTime } = doc.data();

                            newArray.push({
                                id: doc.id,
                                createdAt: new Date(createdAt.seconds * 1000),
                                initials: initials,
                                reactionTime: reactionTime.toFixed(3),
                                bestTime: totalTime.toFixed(3)
                            });
                        });
                        this.setState({ scores: newArray });
                    });
                this.setState({ listeners: this.state.listeners.concat(listener) });
            });
    };

    getMoreScoresV2 = () => {
        let scoresColRef = firestore.collection('scores');
        // single query to get new startAt snapshot
        scoresColRef
            .orderBy('createdAt', 'desc')
            .startAt(this.state.start)
            .limit(4)
            .get()
            .then((snapshots) => {
                // previous starting boundary becomes new ending boundary
                this.setState({ start: snapshots.docs[snapshots.docs.length - 1], end: this.state.start });
                // create another listener using new boundaries
                let listener = scoresColRef
                    .orderBy('createdAt')
                    .startAt(this.state.start)
                    .endBefore(this.state.end)
                    .onSnapshot((scores) => {
                        let newArray = [];

                        scores.forEach((doc) => {
                            const { createdAt, initials, reactionTime, totalTime } = doc.data();

                            newArray.push({
                                id: doc.id,
                                createdAt: new Date(createdAt.seconds * 1000),
                                initials: initials,
                                reactionTime: reactionTime.toFixed(3),
                                bestTime: totalTime.toFixed(3)
                            });
                        });
                        this.setState({ scores: this.state.scores.concat(newArray) });
                    });
                this.setState({ listeners: this.state.listeners.concat(listener) });
            });
    };

    componentDidMount = async () => {
        const scoresColRef = await this.getScoresV2();
    };

    componentWillUnmount() {
        this.state.listeners.forEach((listener) => listener());
    }

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
                <ScoreList scores={sortedScores} handleClick={this.getMoreScoresV2} />
            </Fragment>
        );
    }
}

export default DataPortal;
