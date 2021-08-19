import React from 'react';
import Dashboard from './pages/Dashboard/Dashboard';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Password from './pages/password/password';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/services">Services</Link>
        <Link to="/">Dashboard</Link>
        <Link to="/password/services">Passwords</Link>
      </nav>
      <Switch>
        <Route path="/password/:service">
          <Password />
        </Route>
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
