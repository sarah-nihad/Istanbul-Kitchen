

 import React from 'react';
 import {Pane,Dialog,Button} from 'evergreen-ui';
import Component from '@reactions/component';
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../assets/js/Host";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const cookies = new Cookies();

 class StoresEdit extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       data: [],
       name: '',
       location: ''
     };
   }

   edit() {
     var headers = {
       Authorization: cookies.get("token")
     };
  // console.log('vv',headers.Authorization);
  
     axios({
       url: Host + `stores/${this.props.id}`,
       method: "PUT",
       headers: headers,
       data:{
       name: this.state.name,
       location: this.state.location
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
         <Component initialState={{ isShown: false }}>
           {({ state, setState }) => (
             <Pane>
               <Dialog
                 isShown={state.isShown}
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
                 <div>
                   <div id="new_itemnav"> تعديل معلومات المخزن </div>
                   <div className="mod1">
                     <div
                       style={{
                         display: "flex",
                         alignItems: "center",
                         justifyContent: "space-around",
                         height: "60px",
                         direction: "rtl",
                         fontWeight: "600",
                         fontSize: "18px",
                         width: "100%"
                       }}
                     >
                     
                       <div style={{ width: "30%" }}> اسم المخزن </div>
                       <div style={{ width: "80%", textAlign: "center" }}>
                         <input
                           type="text"
                           id="field2"
                           placeholder=" اسم المخزن"
                           value={this.state.name}
                           onChange={e => {
                             this.setState({ name: e.target.value });
                           }}
                         />
                       </div>
                     </div>

                     <div
                       style={{
                         display: "flex",
                         alignItems: "center",
                         justifyContent: "space-around",
                         height: "60px",
                         direction: "rtl",
                         fontWeight: "600",
                         fontSize: "18px",
                         width: "100%"
                       }}
                     >
                       <div style={{ width: "30%" }}> العنوان </div>
                       <div style={{ width: "80%", textAlign: "center" }}>
                         <input
                           type="text"
                           id="field2"
                           placeholder=" العنوان"
                           value={this.state.location}
                           onChange={e => {
                             this.setState({ location: e.target.value });
                           }}
                         />
                       </div>
                     </div>
                   </div>
                 </div>
               </Dialog>

               <div onClick={() => setState({ isShown: true })}>
                 <i className="fas fa-edit" id="edit"></i>
               </div>
             </Pane>
           )}
         </Component>
       </div>
     );
   }
 }
 export default StoresEdit;