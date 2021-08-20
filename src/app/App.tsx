import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Password from './pages/password/password';
import AddPage from './pages/AddPage/AddPage';
import SearchPage from './pages/SearchPage/SearchPage';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/password/:service">
          <Password />
        </Route>
        <Route path="/add">
          <AddPage />
        </Route>
        <Route path="/search">
          <SearchPage />
        </Route>
        <Route path="/:credentialID/edit">x</Route>
        <Route path="/:credentialID">x</Route>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
