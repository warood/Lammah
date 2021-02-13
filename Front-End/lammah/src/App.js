
// Others
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from 'react';
import SignUp from './pages/SignUp'
import NewFacility from './pages/NewFacility'
import Login from './pages/Login'
import jwt_decode from "jwt-decode";

//Pages
import Facilities from './pages/Facilities';
import { Home } from "./pages/Home";

import MyPage from './pages/MyPage'
import ManageBrand from "./pages/ManageBrand";
import Facility from "./pages/OneFacility";

//Styles
import './style/facilities.css';
import './style/manage-brand.css';
import './style/new-facility.css';
import './style/OneFacility.css'

// components
import { NavBar } from './components/NavBar'

// styles
import "./css/home.css";
import "./css/nav-bar.css";


function App() {
  const [selectFacility, setSelectFacility] = useState({})
  const [dataLoading, setDataloading] = useState(false)
  const [auth, setAuth] = useState({ currentUser: null, isLoggedIn: false });

  const userLogin = () => {
    if (localStorage.jwtToken) {
      const jwtToken = localStorage.jwtToken;
      const currentUser = jwt_decode(jwtToken, "SECRET").user;
      setAuth({ currentUser, isLoggedIn: true });
    } else {
      setAuth({ currentUser: null, isLoggedIn: false });
    }

    setDataloading(true)
  };
  console.log("The current User is: ", auth.currentUser, "data loading", dataLoading);

  useEffect(userLogin, []);
  return (

    <div className="App">

{dataLoading &&
      <Router>
        {/* Nav Bar */}
        <NavBar />

        
          {/* Home Page */}
          <Route exact path="/">
            <Home loginCallback={userLogin} auth={auth} />
          </Route>

          <Route exact path="/signup">
            <SignUp />
          </Route>

          <Route exact path="/new-facility">
            <NewFacility setAuth={setAuth} auth={auth} />
          </Route>


          <Route exact path="/login">
            <Login  />
          </Route>

          <Route exact path='/facilities/:id'>
            <Facility auth={auth} selectFacility={selectFacility} />
          </Route>

          <Route exact path='/facilities'>
            <Facilities setSelectFacility={setSelectFacility} />
          </Route>

          

          <Route exact path='/mypage'>
          <MyPage auth={auth} />
          </Route>


          <Route exact path='/manage-brand'>
            <ManageBrand />
          </Route>


        </Router>
}
    </div>
  );
}

export default App;

