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


         <Switch>
            <Route exact path='/'>
               <NavigationBar />
               <Home />
            </Route>
            <Route exact path='/signup'>
               <NavigationBar />
               <SignUpPage />
            </Route>
            <Route exact path='/signin'>
               <NavigationBar />
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
