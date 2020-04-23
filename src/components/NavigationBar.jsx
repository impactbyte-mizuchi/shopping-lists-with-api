import React from 'react';
import { Link } from 'react-router-dom';

function NavigationBar() {
    return (
        <div>
            <ul>
                <li>
                    <Link to='/'>Beranda</Link>
                </li>
                <li>
                    <Link to='/signin'>Sign In</Link>
                </li>
                <li>
                    <Link to='/signup'>Sign Up</Link>
                </li>
            </ul>
        </div>
    );
}

export default NavigationBar;
