import React from 'react';
import { observer } from 'mobx-react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SessionStore from './stores/session_store';
import Login from './Login';
import Home from './Home';
import Toast from './Toast';
import './App.css';

const App: React.FC = observer(() => {
  const store = new SessionStore();
  return (
    <div className='App'>
      <Toast store={store} />
      <Router>
        <Switch>
          <Route path='/login'>
            <Login store={store} />
          </Route>
          <Route path='/home'>
            <Home store={store} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
});

export default App;
