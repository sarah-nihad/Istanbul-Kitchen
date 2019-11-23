
import React, { Component } from 'react';

import { Navbar, Nav } from 'react-bootstrap';
// import { NavLink } from 'react-router-dom';


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }

    }
login(){
window.location.href='/Dashboard';
    
}


    render() {
        return (
            <div>





                <Navbar expand="lg" id="navmain">
                 
                 
                        <Nav className="mr-auto">

                        </Nav>
                 

                </Navbar>

                <div id='login_main'>
                  
                    <img src={require('../../assets/img/Logo.png')} alt='img' style={{height:'125px'}} />

                    <div style={{fontSize:22,lineHeight:'40px',color:'#707070',fontWeight:'bold'}} >مطبخ اسطنبول</div>

                    <div style={{fontSize:20,lineHeight:'40px',color:'#707070',marginBottom:30}}  >نظام التعقب المخزني</div>

                    <div className='Sign_container'>

                        <div className='up_field'>

                      <input type="text" id='field1' placeholder="Username" />
                      <input type="password" id='field1' placeholder="******" />
                      </div>


                      <div className='down_field'>
                    
                      <button  id='sign_but' onClick={()=> {this.login()}}  > Sign in   </button>
                   
                      </div>

                    </div>

                    <div style={{fontSize:18,color:'#707070',marginTop:30,padding:5,textAlign:'center'}}  >Copyright @ 2019 | All rights reserved to isk company </div>

                <a href='/#' >   <div style={{textAlign:'center',marginBottom:20}} >Developed By ENG. Fadi Ramzi Mohammed</div></a>










                </div>









            </div>
        );
    }
}

export default Login;