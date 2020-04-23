import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import Home from './components/pages/Home';
import SignUpPage from './components/pages/SignUpPage';
import SignInPage from './components/pages/SignInPage';
import ShoppingListsPage from './components/pages/ShoppingListsPage';

import PrivateRoute from './components/helpers/PrivateRoute';

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
                <PrivateRoute exact path='/shopping-lists'>
                    <ShoppingListsPage />
                </PrivateRoute>
            </Switch>
        </Router>
    );
}

export default App;
