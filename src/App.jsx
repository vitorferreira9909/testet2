import { BrowserRouter, Route,Switch } from 'react-router-dom/cjs/react-router-dom.min';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import {Sidebar} from "./components/Sidebar";
import "./css/colors.css";

import RegisterCompany from "./Pages/RegisterCompany"
import Login from "./Pages/Login"

import "./Global.css";
import Home from './Pages/Home';

 import { ThemeContextProvider } from "./context/ThemeContext";

  function App() {
   
   return (
    <>
      <BrowserRouter>
      <div>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path = '/RegisterCompany' component={RegisterCompany}/>
        <Route exact path = '/Login' component={Login}/>

      </Switch>
      </div>
      
      </BrowserRouter>
    </>
  )
}
export default App;
