import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Chat from './comps/Chat';
import Login from './comps/Login';
import Sidebar from './comps/Sidebar';
import { useStateValue } from './StateProvider';

function App() {
  const [{ user }, ] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
              <Switch>
                <Route path="/rooms/:roomId" >
                  <Chat />
                </Route>
                
              </Switch>
          </Router>
        </div>
        )
      }
    
    </div>
  );
}

export default App;
