import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './header/header.component';
import LandingPage from '../pages/Landing-page/landing-page.component';
import DataPortal from './data-portal/data-portal.component';
import { auth } from '../firebase/firebase-utils';
import { MDBMask } from 'mdbreact';

import './app.styles.css';

class App extends React.Component {
    state = { currentUser: null };

    componentDidMount = async () => {
        this.unsubscribeFromAuth = auth.onAuthStateChanged((userAuth) => {
            this.setState({ currentUser: userAuth });
        });
    };

    componentWillUnmount = () => {
        this.unsubscribeFromAuth();
    };

    render() {
        return (
            <MDBMask className='gradient'>
                <div className='container'>
                    <BrowserRouter>
                        <div className='item-header'>
                            <Header currentUser={this.state.currentUser} />
                        </div>
                        <Switch>
                            <Route path='/' exact render={() => (this.state.currentUser ? <DataPortal /> : <LandingPage />)} />
                        </Switch>
                    </BrowserRouter>
                </div>
            </MDBMask>
        );
    }
}

export default App;
