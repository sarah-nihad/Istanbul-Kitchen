 import React from 'react';
 import {Pane,Dialog,Button} from 'evergreen-ui';
import Component from '@reactions/component';
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../assets/js/Host";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const cookies = new Cookies();
 class EditPass extends React.Component{
 constructor(props) {
     super(props);
     this.state = {
       data: [],
       password: '',
       c_password: ''
     };
   }



 editpass() {
     var headers = {
       Authorization: cookies.get("token")
     };
  // console.log('vv',headers.Authorization);
  
     axios({
       url: Host + `auth/cp/${this.props.ids}`,
       method: "PUT",
       headers: headers,
       data:{
       password: this.state.password,
       c_password: this.state.c_password
       },
     })
     
         .then(response => {
           toast.success("تم التعديل بنجاح");
         })
         .catch(function(error) {
           if (error.response.data.Error.c_password) {
             toast.error('تأكد من صحة المعلومات');
           
             
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
                   this.editpass();
                 }}
      >
          <div >
        <div id='new_itemnav' >   تعديل  كلمة المرور </div>
         <div className='mod1'>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',
        height:'60px',direction:'rtl',fontWeight:'600',fontSize:'18px',width:'100%'}} >
          <div style={{width:'30%'}} >  كلمة المرور  </div> 
        <div style={{width:'80%',textAlign:'center'}} >  
          <input type='password'id='field2' placeholder=' ****** ' value={this.state.password} onChange={(e)=> 
              this.setState({password:e.target.value})} />  </div>
</div>
        

              <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',
        height:'60px',direction:'rtl',fontWeight:'600',fontSize:'18px',width:'100%'}} >
           <div style={{width:'30%'}} >   تأكيد كلمة المرور   </div>

            <div style={{width:'80%',textAlign:'center'}} >  
              <input type='password'id='field2' placeholder= ' ****** '
              value={this.state.c_password} onChange={(e)=> 
              this.setState({c_password:e.target.value})} /> </div>             
</div>


</div>
          </div>
      </Dialog>

      <div onClick={() => setState({ isShown: true })} id='pass_use' >
      
  <i className="fas fa-cog"></i>
      
      </div>
    </Pane>
  )}
</Component>

</div>
     );
   }
 }
 export default EditPass;