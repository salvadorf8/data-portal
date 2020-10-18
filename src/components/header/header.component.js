import React from 'react';
import { Link, BrowserRouter } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as SignIn } from '../../assets/login-logout.svg';
import { auth, signInAnonymously } from '../../firebase/firebase-utils';
import './header.styles.css';

const Header = ({ currentUser, handleSignOut }) => {
    return (
        <BrowserRouter>
            <div className='header'>
                <Link className='logo-container' to='/'>
                    <Logo />
                    <span className='app-name'>DATA PORTAL</span>
                </Link>

                <div className='options'>
                    {currentUser ? (
                        <Link to='/' className='option' onClick={() => auth.signOut()}>
                            SIGN OUT <SignIn />
                        </Link>
                    ) : (
                        <div className='option' onClick={() => signInAnonymously()}>
                            SIGN IN <SignIn />
                        </div>
                    )}
                </div>
            </div>
        </BrowserRouter>
    );
};

export default Header;
