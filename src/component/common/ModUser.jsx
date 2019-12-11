 import React from 'react';
 import {Pane,Dialog,Button} from 'evergreen-ui';
import Component from '@reactions/component';
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../assets/js/Host";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const cookies = new Cookies();
 class ModUser extends React.Component{
    constructor(props) {
     super(props);
     this.state = {
       data: [],
       password: '',
       c_password: '',
       name:'',
       username:'',
       dept_id: '',
       role_id: '',
       status:'',
       secret:'',
     };
   }


  newuser(){
    let formData = new FormData();
        var headers = {
         Accept: "application/json",
          Authorization: cookies.get("token")
        };
           formData.append("name", this.state.name);
     formData.append("username", this.state.username);
       formData.append("secret", this.state.secret);
         formData.append("status", this.state.status);
           formData.append("role_id", this.state.role_id);
             formData.append("dept_id", this.state.dept_id);
               formData.append("c_password", this.state.c_password);
                 formData.append("password", this.state.password);
    axios({
      url: Host + `auth/reg`,
      method: "POST",
      data: formData,
      headers: headers
    })
      .then(response => {
          toast.success('تمت الاضافة بنجاح');
    
 window.location.reload();
      })
      .catch(function(error) {
        if (error.response) {
          console.log(error.response.data.Error);

          toast.error(error.response.data.Error);
        }
      });

  
    }




   render(){
     return(
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
<Component initialState={{ isShown: false }}    >
  {({ state, setState }) => (
    <Pane >
      <Dialog 
        isShown={state.isShown}
        title="انشاء مستحدم جديد "
        onCloseComplete={() => setState({ isShown: false })}
      hasHeader={false}
        shouldCloseOnOverlayClick={false}
         confirmLabel=" حفظ"
         cancelLabel="الغاء"
           onConfirm={() => {
                   setState({ isShown: false });
                   this.newuser();
                 }}
      >
          <div >
        <div id='new_itemnav' >   انشاء مستخدم جديد </div>
         <div className='mod1'>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',
        height:'60px',direction:'rtl',fontWeight:'600',fontSize:'18px',width:'100%'}} >
          <div style={{width:'30%'}} > اسم المستخدم  </div> 
        <div style={{width:'80%',textAlign:'center'}} >  
          <input type='text'id='field2' placeholder=' اسم المستخدم'  value={this.state.username} onChange={(e)=>
              this.setState({username:e.target.value})} />  </div>
</div>
        
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',
        height:'60px',direction:'rtl',fontWeight:'600',fontSize:'18px',width:'100%'}} >
          <div style={{width:'30%'}} > الاسم   </div> 
        <div style={{width:'80%',textAlign:'center'}} >  
          <input type='text'id='field2' placeholder=' الاسم '  value={this.state.name} onChange={(e)=>
              this.setState({name:e.target.value})} />  </div>
</div>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',
        height:'60px',direction:'rtl',fontWeight:'600',fontSize:'18px',width:'100%'}} >
           <div style={{width:'30%'}} >  كلمة المرور   </div>

            <div style={{width:'80%',textAlign:'center'}} >  
              <input type='password'id='field2' placeholder= '****** '  value={this.state.password} onChange={(e)=>
              this.setState({password:e.target.value})} /> </div>             
</div>

              <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',
        height:'60px',direction:'rtl',fontWeight:'600',fontSize:'18px',width:'100%'}} >
           <div style={{width:'30%'}} >  تأكيد كلمة المرور   </div>

            <div style={{width:'80%',textAlign:'center'}} >  
              <input type='password'id='field2' placeholder= ' ******* '  value={this.state.c_password} onChange={(e)=>
              this.setState({c_password:e.target.value})} /> </div>             
</div>

              <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',
        height:'60px',direction:'rtl',fontWeight:'600',fontSize:'18px',width:'100%'}} >
           <div style={{width:'30%'}} >   القسم   </div>

            <div style={{width:'80%',textAlign:'center'}} >  
              <input type='text'id='field2' placeholder= ' القسم ' value={this.state.dept_id} onChange={(e)=>
              this.setState({dept_id:e.target.value})} /> </div>             
</div>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',
        height:'60px',direction:'rtl',fontWeight:'600',fontSize:'18px',width:'100%'}} >
           <div style={{width:'30%'}} >   secret   </div>

            <div style={{width:'80%',textAlign:'center'}} >  
              <input type='text'id='field2' placeholder= ' secret 'value={this.state.secret} onChange={(e)=>
              this.setState({secret:e.target.value})} /> </div>             
</div>

              <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',
        height:'60px',direction:'rtl',fontWeight:'600',fontSize:'18px',width:'100%'}} >
           <div style={{width:'30%'}} >   الحالة   </div>

            <div style={{width:'80%',textAlign:'center'}} >  
              <select type='text'id='field2' placeholder= ' الحالة ' value={this.state.status} onChange={(e)=>
              this.setState({status:e.target.value})} > 
              <option value='-' >- </option>
               <option value='1'  >مفعل</option>
                <option value='0' > غير مفعل </option>
                </select>
              </div>             
</div>

              <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',
        height:'60px',direction:'rtl',fontWeight:'600',fontSize:'18px',width:'100%'}} >
           <div style={{width:'30%'}} >    الصلاحية   </div>

            <div style={{width:'80%',textAlign:'center'}} >  
              <input type='text'id='field2' placeholder= ' الصلاحية '  value={this.state.role_id} onChange={(e)=>
              this.setState({role_id:e.target.value})} /> </div>             
</div>
        
 </div>
          </div>
      </Dialog>

      <div onClick={() => setState({ isShown: true })} id='new'  >
      
      جديد 
      
      </div>
    </Pane>
  )}
</Component>

</div>
     );
   }
 }
 export default ModUser;