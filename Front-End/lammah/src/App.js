import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from 'react';

//Pages
import Facilities from './pages/Facilities';

//Styles
import './style/facilities.css';
import OneFacility from "./pages/OneFacility";

function App() {
  const [selectFacility, setSelectFacility]= useState({})
  return (
    <div className="App">
      <Router>
        <Route path='/facilities'>
          <Facilities setSelectFacility={setSelectFacility}/>
        </Route>
        <Route path='/facilities/:id'>
          <OneFacility selectFacility={selectFacility}/>
        </Route>
      </Router>
    </div>
  );
}

export default App;
