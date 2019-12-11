 import React from 'react';
 import {Pane,Dialog,Button} from 'evergreen-ui';
import Component from '@reactions/component';
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../assets/js/Host";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const cookies = new Cookies();
 class EditUser extends React.Component{
         constructor(props) {
     super(props);
     this.state = {
       data: [],
       code: '',
       cat_id: ''
     };
   }


 newmat(){
    let formData = new FormData();
        var headers = {
         Accept: "application/json",
          Authorization: cookies.get("token")
        };
           formData.append("code", this.state.code);
     formData.append("cat_id", this.state.cat_id);
    axios({
      url: Host + `items`,
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
          console.log(error.response.data.error);

          toast.error('تأكد من ادخال المعلومات');
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
                   this.newmat();
                 }}
      >
          <div >
        <div id='new_itemnav' >    اضافة مادة جديدة </div>
         <div className='mod1'>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',
        height:'60px',direction:'rtl',fontWeight:'600',fontSize:'18px',width:'100%'}} >
          <div style={{width:'30%',textAlign:'center'}} >  رمز المادة  </div> 
        <div style={{width:'80%',textAlign:'center'}} >  
          <input type='text'id='field2' placeholder=' رمز المادة ' value={this.state.code} onChange={(e)=>
          this.setState({code:e.target.value})} />  </div>
</div>
        

              <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',
        height:'60px',direction:'rtl',fontWeight:'600',fontSize:'18px',width:'100%'}} >
           <div style={{width:'30%',textAlign:'center'}} >   صنف   </div>

            <div style={{width:'80%',textAlign:'center'}} >  
              <input type='text'id='field2' placeholder= ' صنف '  value={this.state.cat_id} onChange={(e)=>
          this.setState({cat_id:e.target.value})}  /> </div>             
</div>


             

  


      
        
 </div>
          </div>
      </Dialog>

      <div onClick={() => setState({ isShown: true })} id='new'   >
      
    جديد
      
      </div>
    </Pane>
  )}
</Component>

</div>
     );
   }
 }
 export default EditUser;