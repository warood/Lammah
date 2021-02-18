import API_URL from './apiConfig.js'

// Others
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect,   useState } from 'react';
import SignUp from './pages/SignUp'
import NewFacility from './pages/NewFacility'
import Login from './pages/Login'
import jwt_decode from "jwt-decode";
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./components/GlobalStyles";
import { lightTheme, darkTheme } from "./components/Themes"
import { CgSun } from "react-icons/cg";
import { HiMoon } from "react-icons/hi";
import './i18nextInit';

//Pages
import Facilities from './pages/Facilities';
import { Home } from "./pages/Home";

import MyPage from './pages/MyPage'
import ManageBrand from "./pages/ManageBrand";
import Facility from "./pages/OneFacility";
import Admin from "./pages/Admin";
import Footer from "./components/Footer";

//Styles
import './style/facilities.css';
import './style/manage-brand.css';
import './style/new-facility.css';
import './style/OneFacility.css';
import "./style/admin.css";
import "./style/my-page.css";
import "./style/OneComment.css";
import "./style/footer.css";
// styles
import "./css/home.css";
import "./css/nav-bar.css";

// components
import { NavBar } from './components/NavBar'



const LightTheme = {
  pageBackground: "white",
  titleColor: "#dc658b",
  tagLineColor: "black"
};

const DarkTheme = {
  pageBackground: "#282c36",
  titleColor: "lightpink",
  tagLineColor: "lavender"
}

const themes = {
  light: LightTheme,
  dark: DarkTheme,
}

function App() {
  const [selectFacility, setSelectFacility] = useState({})
  const [dataLoading, setDataloading] = useState(false)
  const [auth, setAuth] = useState({ currentUser: null, isLoggedIn: false });
  const [theme, setTheme] = useState('light');
  const [search, setSearch] = useState("");
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
}
  const userLogin = () => {
    if (localStorage.jwtToken) {
      const jwtToken = localStorage.jwtToken;
      const currentUser = jwt_decode(jwtToken, process.env.SECRET_KEY).user;
      setAuth({ currentUser, isLoggedIn: true });
    } else {
      setAuth({ currentUser: null, isLoggedIn: false });
    }

    setDataloading(true)
  };
  console.log("The current User is: ", auth.currentUser, "data loading", dataLoading);
  useEffect(userLogin, []);

  const ToSetSearch = (text)=>{ setSearch(text)}
  return (

    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
    <>
    
    <GlobalStyles/>
      <div className="App">
      
        
{dataLoading &&

      <Router>
        {/* Nav Bar */}
        <NavBar loginCallback={userLogin} auth={auth} ToSetSearch={ToSetSearch}
        themeToggler={themeToggler}/>

        
          {/* Home Page */}
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/signup">
            <SignUp />
          </Route>

          <Route exact path="/login">
            <Login  />
          </Route>

          <Route exact path='/facilities/:id'>
            <Facility auth={auth} selectFacility={selectFacility} />
          </Route>

          <Route exact path='/facilities'>
            <Facilities  search={search} setSelectFacility={setSelectFacility} ToSetSearch={ToSetSearch}/>
          </Route>

          
          {auth.isLoggedIn?<>
          
          <Route exact path='/my-page'>
          <MyPage auth={auth} />
          </Route>


          <Route exact path='/manage-brand'>
            <ManageBrand auth={auth}/>
          </Route>




         <Route path="/admin" >
         <Admin   auth={auth} />
         </Route>

          

          <Route exact path="/new-facility">
            <NewFacility setAuth={setAuth} auth={auth} />
          </Route>
          
          
          </>: <>
          <Redirect to='/' />
          
          </>}
          
         
        </Router>
} 


<Footer />


    </div> 
    </>
    </ThemeProvider>
  );
}

export default App;

