import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavigationBar from "./components/layout/NavigationBar";
import {Layout} from "./components/layout/Layout";
import HomeAndLoginPage from './pages/HomeAndLoginPage';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import RegisterPage from "./pages/administrations/account/RegisterPage";
import AdministrationPage from "./pages/administrations/AdministrationPage";

function App() {
  return (
    <div style={{height: '100%'}}>
      <Router>
        <NavigationBar/>
          <div className="Main-container">
              <Layout>
                  <Switch>
                      <Route exact path="/" component={HomeAndLoginPage}/>
                      <Route exact path="/administration" component={AdministrationPage}/>
                      <Route exact path="/account/create" component={RegisterPage}/>
                  </Switch>
              </Layout>
          </div>
      </Router>
    </div>
  );
}

export default App;
