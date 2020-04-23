import React from 'react';
import './App.css';

import NavigationBar from './components/NavigationBar';
import Home from './components/pages/Home';
import SignUpPage from './components/pages/SignUpPage';
import SignInPage from './components/pages/SignInPage';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <NavigationBar />

            <Switch>
                <Route exact path='/'>
                    <Home />
                </Route>
                <Route exact path='/signup'>
                    <SignUpPage />
                </Route>
                <Route exact path='/signin'>
                    <SignInPage />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
