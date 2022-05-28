import React from 'react';
import logo from './logo.svg';
import './App.css';
import HeaderComponent from './components/layouts/header.component';
import FooterComponent from './components/layouts/footer.component';
import ContractPage from './components/pages/contract.page';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PointPage from './components/pages/point.page';
import InvoicePage from './components/pages/invoice.page';
import LoginPage from './components/pages/login.page';
import { connect } from "react-redux";
// import { history } from "./helper/history";

class App extends React.Component {

  state = {
    user: { isLoggedIn: false, user: null }
  }

  static getDerivedStateFromProps(props: any, state: any) {
    const { auth } = props;
    if (auth) {
      return {
        user: auth
      }
    }
    return {}
  }

  render = () => {
    return (
      <React.Fragment>
        <div>
          <HeaderComponent projectName={'Contract Management'} logo={logo} user={this.state.user} />
        </div>
        <div style={{ marginTop: '100px' }}>
          <Router>
            <Routes>
              {!!this.state.user && this.state.user.isLoggedIn ? (
                <>
                  <Route path="/contract" caseSensitive={false} element={<ContractPage title="Contract Page" />} />
                  <Route path="/point" caseSensitive={false} element={<PointPage title="Point Page" />} />
                  <Route path="/invoice" caseSensitive={false} element={<InvoicePage title="Invoice Page" />} />
                  <Route path="*" caseSensitive={false} element={<ContractPage title="Contract Page" />} />
                </>
              ) : (
                <>
                  <Route path="/" caseSensitive={false} element={<LoginPage title="Login Page" />} />
                  <Route path="/login" caseSensitive={false} element={<LoginPage title="Login Page" />} />
                  <Route path="*" caseSensitive={false} element={<LoginPage title="Login Page" />} />
                </>
              )}
            </Routes>
          </Router>
        </div>
        <div style={{ marginTop: '100px' }}>
          <FooterComponent copyRight={'LEI'} />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {

  }

}
export default connect(mapStateToProps, mapDispatchToProps)(App);
