import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AuthenticatedRoute from "./components/authentication/AuthenticationRoute";
import NavigationBar from "./components/layout/NavigationBar";
import {Layout} from "./components/layout/Layout";
import HomeAndLoginPage from './pages/HomeAndLoginPage';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import RegisterPage from "./pages/administrations/account/RegisterPage";
import AdministrationPage from "./pages/administrations/AdministrationPage";
import LogoutComponent from "./components/authentication/LogoutComponent";
import IncomingOrdersPage from "./pages/orders/IncomingOrdersPage";
import HistoryOrdersPage from "./pages/orders/HistoryOrdersPage";
import OrderDetailPage from "./pages/orders/OrderDetailPage";
import AuthRouteAdmin from "./components/authentication/AuthRouteAdmin";
import AccountPage from "./pages/administrations/account/AccountPage";
import AccountEditPage from "./pages/administrations/account/AccountEditPage";
import IngredientsEditPage from "./pages/administrations/ingredients/IngredientsEditPage";
import {NoMatchPage} from "./pages/NoMatchPage";

function App() {
  return (
    <div style={{height: '100%'}}>
      <Router>
        <NavigationBar/>
          <div className="Main-container">
              <Layout>
                  <Switch>
                      <Route exact path="/" component={HomeAndLoginPage}/>
                      <Route path="/logout" component={LogoutComponent}/>
                      <AuthenticatedRoute exact path="/order/incoming" component={IncomingOrdersPage}/>
                      <AuthenticatedRoute exact path="/order/history" component={HistoryOrdersPage}/>
                      <AuthenticatedRoute exact path="/order/detail/:id" component={OrderDetailPage}/>
                      <AuthRouteAdmin exact path="/administration" component={AdministrationPage}/>
                      <AuthRouteAdmin exact path="/administration/account" component={AccountPage}/>
                      <AuthRouteAdmin exact path="/administration/account/edit/:id" component={AccountEditPage}/>
                      <AuthRouteAdmin exact path="/administration/account/create" component={RegisterPage}/>
                      <AuthRouteAdmin exact path="/administration/ingredients" component={IngredientsEditPage}/>
                      <Route component={NoMatchPage}/>
                  </Switch>
              </Layout>
          </div>
      </Router>
    </div>
  );
}

export default App;
