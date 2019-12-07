import React, { Component } from "react";
import { TextInput, toaster } from "evergreen-ui";
import { Navbar, Nav } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../assets/js/Host";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const cookies = new Cookies();

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      username: '',
      password: ''
    };
  }

  login(e) {
    
 e.preventDefault()
      let formData = new FormData();
          formData.append("username",this.state.username);
        formData.append("password",this.state.password);
      axios({
        url: Host + `auth/login`,
        method: "POST",

        data: formData,
        

      })
        .then(response => {
          // window.location.href = "/Dashboard";
           
          cookies.set("token",response.data.success.token
          , {
            
            path: "/",
            expires: new Date(Date.now() + 60480000)
          
            
      });
           console.log("ss", response.data.success.token)
        })
        .catch(function(err) {
          if (err.response.data.Error) {
            toast.error('تأكد من ادخال')
          }
          console.log(err.response.data.Error);
          
        });
  }

  render() {
    return (
      <div>
      <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar
newestOnTop
closeOnClick
rtl
pauseOnVisibilityChange
draggable
pauseOnHover
/>
        <Navbar expand="lg" id="navmain">
          <Nav className="mr-auto"></Nav>
        </Navbar>

        <div id="login_main">
          <img
            src={require("../../assets/img/Logo.png")}
            alt="img"
            style={{ height: "125px" }}
          />

          <div
            style={{
              fontSize: 22,
              lineHeight: "40px",
              color: "#707070",
              fontWeight: "bold"
            }}
          >
            مطبخ اسطنبول
          </div>

          <div
            style={{
              fontSize: 20,
              lineHeight: "40px",
              color: "#707070",
              marginBottom: 30
            }}
          >
            نظام التعقب المخزني
          </div>

          <div className="Sign_container">
            <div className="up_field">
              <TextInput
                id="field1"
                placeholder="Username"
                value={this.state.username}
                onChange={e => {
                  this.setState({ username: e.target.value });
                }}
              />
              {/* <input
                type="password"
                id="field1"
                placeholder="******"
                value={this.state.password}
                onChange={e => {
                  this.setState({ password: e.target.value });
                }}
              /> */}
              <TextInput
                id="field1"
                name="text-input-name"
                type="password"
                placeholder=" Password "
                required
                value={this.state.password}
                onChange={e => {
                  this.setState({ password: e.target.value });
                }}
              />
            </div>

            <div className="down_field">
              <button
                id="sign_but"
                onClick={(e) => {
                  this.login(e);
                }}
              >
                Sign in
              </button>
            </div>
          </div>

          <div
            style={{
              fontSize: 18,
              color: "#707070",
              marginTop: 30,
              padding: 5,
              textAlign: "center"
            }}
          >
            Copyright @ 2019 | All rights reserved to isk company{" "}
          </div>

          <a href="/#">
            {" "}
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              Developed By ENG. Fadi Ramzi Mohammed
            </div>
          </a>
        </div>
      </div>
    );
  }
}

export default Login;
