import React ,{Component} from 'react';
import Login from './component/main/Login';
import Si from './component/common/Si';

import {BrowserRouter,Route} from 'react-router-dom';
import './App.css';
import './assets/css/css.css';
import './assets/css/scss1.scss';
class App extends Component{
render() {
  return (
    <BrowserRouter>
   <Route path exact='/' component={Login} />
    <Route path ='/Home' component={Si}   />
    <Route path ='/Users' component={Si}   />
    <Route path ='/Kitchen' component={Si}   />
    <Route path ='/Section' component={Si}   />
    <Route path ='/Material' component={Si}   />
    <Route path ='/Notification' component={Si}   />
    <Route path ='/Dashboard' component={Si}   />
 
    </BrowserRouter>
  );
}}

export default App;
