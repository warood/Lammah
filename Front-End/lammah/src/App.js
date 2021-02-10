// Others
import { BrowserRouter as Router, Route} from "react-router-dom";

// pages
import {Home} from "./pages/Home";

// components
import {NavBar} from './components/NavBar'

// styles
import "./css/home.css";
import "./css/nav-bar.css";


function App() {
  return (
    <div className="App">
      {/* Nav Bar */}
      <NavBar />
       
      <Router>
        {/* Home Page */}
        <Route exact path="/">
          <Home />
        </Route>

      </Router>
    </div>
  );
}

export default App;
