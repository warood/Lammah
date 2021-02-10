import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//Pages
import Facilities from './pages/Facilities';

//Styles
import './style/facilities.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path='/facilities'>
          <Facilities/>
        </Route>
      </Router>
    </div>
  );
}

export default App;
