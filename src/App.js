import React ,{Component} from 'react';
import Login from './component/main/Login';
import Nav2 from './component/common/Nav2';
import {BrowserRouter,Route, Switch} from 'react-router-dom';
import './App.css';
import './assets/css/css.css';
import './assets/css/scss1.scss';
import Context from './assets/js/context';
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "./assets/js/Host";
const cookies = new Cookies();
class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      ms: [],
      data1: [],
      Dash:[],
      check:'',
      che:'',
    };
  }





  componentDidMount() {

 if (cookies.get("token")) {
    this.setState({
      che:'login',
    })
 }
else{
     this.setState({
      che:'notlogin',
    })
}


if (cookies.get("token")) {
setInterval(() => {
   axios
      .get(Host + "notifications", {
        headers: {
          Authorization: cookies.get("token"),
          Accept: "application/json"
        }
      })
      .then(res => {
        this.setState({
          data: res.data.data.notifications,
          ms:res.data.data.msg,
              check:'login',
        });
      })
      .catch(err => {
        console.log("error:", err);
          this.setState({
      check:'notlogin',
    })
      });

 
}, 6000);


   
       axios.get(Host + "statistics", {
        headers: {
          Authorization: cookies.get("token"),
          Accept: "application/json"
        }
      })
      .then(res => {
        this.setState({
          Dash: res.data.data,
       
              check:'login',
        });
       
      })
      .catch(err => {
        console.log("error:", err);
          this.setState({
      check:'notlogin',
    })
      });




}




  }









render() {
  return (
    <BrowserRouter>
     <Context.Provider value={{
            value: this.state,
            action: {
            }}} >

   <Switch> 
   <Route  exact path ='/' component={Login} />
  
    <Route path ='/Home' component={Nav2}   />
    <Route path ='/Users' component={Nav2}   />
       <Route path ='/User' component={Nav2}   />
    <Route path ='/Kitchen' component={Nav2}   />
    <Route path ='/Section' component={Nav2}   />
     <Route path ='/Department' component={Nav2}   />
    <Route path ='/Material' component={Nav2}   />
   <Route path ='/Dashboard' component={Nav2}   />
    <Route path ='/Notification' component={Nav2}   />
    <Route path ='/Prepare' component={Nav2}   />
  <Route path ='/Store' component={Nav2}   />
    <Route path ='/Stores' component={Nav2}   />
     <Route path ='/Detiels' component={Nav2}   />
 </Switch> 
    </Context.Provider>
    </BrowserRouter>
  );
}}

export default App;
