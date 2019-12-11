
 import React from 'react';
 import {Pane,Dialog,Button} from 'evergreen-ui';
import Component from '@reactions/component';
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../assets/js/Host";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const cookies = new Cookies();
 class EditSection extends React.Component{
   constructor(props) {
     super(props);
     this.state = {
       data: [],
       name: '',
       descr: ''
     };
   }


 edit() {
     var headers = {
       Authorization: cookies.get("token")
     };
  // console.log('vv',headers.Authorization);
  
     axios({
       url: Host + `cats/${this.props.id}`,
       method: "PATCH",
       headers: headers,
       data:{
       name:this.state.name,
       descr:this.state.descr
       },
     })
     
         .then(response => {
           toast.success("تم تعديل المعلومات بنجاح");
          window.location.reload();
         
         })
         .catch(function(error) {
           if (error.response.data.Error) {
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
        title="   "
        onCloseComplete={() => setState({ isShown: false })}
      hasHeader={false}
        shouldCloseOnOverlayClick={false}
         confirmLabel=" حفظ"
         cancelLabel="الغاء"
          onConfirm={() => {
                   setState({ isShown: false });
                   this.edit();
                 }}
      >
          <div >
        <div id='new_itemnav' >  تعديل الصنف </div>
         <div className='mod1'>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',
        height:'60px',direction:'rtl',fontWeight:'600',fontSize:'18px',width:'100%'}} >
          <div style={{width:'30%',textAlign:'center'}} > اسم الصنف  </div> 
        <div style={{width:'80%',textAlign:'center'}} >  
          <input type='text'id='field2' placeholder=' اسم الصنف' value={this.state.name} onChange={(e)=>
          this.setState({name:e.target.value})} />  </div>
</div>
        

              <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',
        height:'60px',direction:'rtl',fontWeight:'600',fontSize:'18px',width:'100%'}} >
           <div style={{width:'30%',textAlign:'center'}} >  وصف   </div>
            <div style={{width:'80%',textAlign:'center'}} >  
              <input type='text'id='field2' placeholder= ' وصف' value={this.state.descr} onChange={(e)=>
          this.setState({descr:e.target.value})}  /> </div> 
</div>
        
 </div>
          </div>
      </Dialog>

      <div onClick={() => setState({ isShown: true })}  >
      
       <i className="fas fa-edit" id='edit' ></i>
      
      </div>
    </Pane>
  )}
</Component>

</div>
     );
   }
 }
 export default EditSection;