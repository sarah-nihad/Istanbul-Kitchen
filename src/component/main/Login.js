import React  from "react";
import { TextInput } from "evergreen-ui";
import { Navbar, Nav} from "react-bootstrap";
import axios from "axios";
import Component from "@reactions/component";
import Cookies from "universal-cookie";
import Host from "../../assets/js/Host";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lottie from "lottie-react-web";
 import loding from "../../assets/js/loding.json";
const cookies = new Cookies();

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      username: '',
      password: '',
      spin:false,
      errors:false
      
    };
  }



  

 

  render() {
   
    return (
      <div>
      <ToastContainer
position="bottom-center"
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

          <div className="Sign_container" style={{position:'relative'}} >
            <div className="up_field">
              <TextInput
                id="field1"
                placeholder="اسم المستخدم"
                value={this.state.username}
                onChange={e => {
                  this.setState({ username: e.target.value });
                     if (e.target.value.length < 4) {
                    this.setState({errors:true})
                  }
                  else{
                     this.setState({ errors: false });
                  }

                }}
              />
         
              <TextInput
                id="field1"
                name="text-input-name"
                type="password"
                placeholder=" كلمة المرور "
                required
                value={this.state.password}
                onChange={e => {
                  this.setState({ password: e.target.value });
                       if (e.target.value.length < 4) {
                    this.setState({errors:true})
                  }
                  else{
                     this.setState({ errors: false });
                  }


                }}
              />
            </div>

            <div className="down_field">
             <Component initialState={{ isShown: true, spin: false }}>
                {({ state, setState }) =>
      <button
                id="sign_but"
                onClick={(e) => {
                           if (this.state.errors===true) {
                    return(
                       toast.error( `اسم المستخدم او كلمة المرور المدخلة قصيرة` )
                      );   
                  }
              else if (this.state.errors===false) {
                 setState({ spin: true });
               
  let formData = new FormData();
          formData.append("username",this.state.username);
        formData.append("password",this.state.password);
      axios({
        url: Host + `auth/login`,
        method: "POST",

        data: formData,
        
      })
        .then(response => {
          window.location.href = "/Dashboard";
           let token="Bearer "+response.data.success.token
           let role= response.data.success.userInfo.role.name
           let names=response.data.success.userInfo.username
          cookies.set("token",token,{
            
            path: "/",
            expires: new Date(Date.now() + 60480000)
    
      });
      cookies.set("names",names)
       cookies.set("role",role)
          //  console.log("ss",role)
           setState({spin:false})
        })
        .catch(function(err) {
          setState({ spin: false });
          if (err.response.data.Error) {
            toast.error('تأكد من ادخال المعلومات')
           
          }
          // console.log(err.response.data.Error);
            
        });


              }
 
  
                }}
              >
               {state.spin===false ?(
<div>تسجيل الدخول  </div>
               ):(
                 <div>
                 <div> جاري تسجيل الدخول</div>
                  <div style={{ width: "100%",position: "absolute",top:'102px',right:'-7px'}}>
                                           <Lottie
                                             options={{
                                               animationData: loding
                                             }}
                                             width={300}
                                             height={150}
                                             position="absolute"
                                           />
                                         </div></div>
               ) } 






              </button> 
 
      
                }
                  
              </Component>

  



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
