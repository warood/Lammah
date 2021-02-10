import './App.css';
import React from "react" ;
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import SignUp from './pages/SignUp'
import NewFacility from './pages/NewFacility'
import Login from './pages/Login'
import jwt_decode from "jwt-decode";


function App() {

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
    <Router>

        <Route path="/signup">

            <SignUp  />
        </Route>
        <Route path="/new">

            <NewFacility  />
        </Route>

        <Route  path="/login">

            <Login loginCallback={userLogin} auth={auth}  />
        </Route>
    </Router>
  );
}

export default App;
