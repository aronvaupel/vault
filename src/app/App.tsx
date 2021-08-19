import React from 'react';

import Dashboard from './pages/Dashboard/Dashboard';

import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/services">Services</Link>
        <Link to="/">Dashboard</Link>
      </nav>
      <Switch>
        <Route path="/services">
          <div>Services</div>
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
