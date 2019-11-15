import React ,{Component} from 'react';
import Login from './component/main/Login';
import Si from './component/common/Si';
import Nav2 from './component/common/Nav2';
import {BrowserRouter,Route} from 'react-router-dom';
import './App.css';
import './assets/css/css.css';
import './assets/css/scss1.scss';
class App extends Component{
render() {
  return (
    <BrowserRouter>
  
   <Route path exact='/' component={Login} />
  
    <Route path ='/Home' component={Nav2}   />
    <Route path ='/Users' component={Nav2}   />
    <Route path ='/Kitchen' component={Nav2}   />
    <Route path ='/Section' component={Nav2}   />
    <Route path ='/Material' component={Nav2}   />
  
    <Route path ='/Notification' component={Nav2}   />
    <Route path ='/Prepare' component={Nav2}   />
 
    </BrowserRouter>
  );
}}

export default App;
