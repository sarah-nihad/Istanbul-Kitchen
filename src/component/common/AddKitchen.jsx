 import React from 'react';
 import {Pane,Dialog,Button} from 'evergreen-ui';
import Component from '@reactions/component';
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../assets/js/Host";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const cookies = new Cookies();
 class AddKitchen extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       data: [],
       kitID: '',
     
     };
   }

   newitem() {
     let formData = new FormData();
     var headers = {
       Accept: "application/json",
       Authorization: cookies.get("token")
     };
     formData.append("kitID",this.state.kitID);
   
     axios({
       url: Host + `kmos`,
       method: "POST",
       data: formData,
       headers: headers
     })
       .then(response => {
         toast.success("تمت الاضافة بنجاح");

         window.location.reload();
       })
       .catch(function(error) {
         if (error.response) {
           console.log(error.response.data.error);

           toast.error("تأكد من ادخال المعلومات");
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
                 title=" "
                 onCloseComplete={() => setState({ isShown: false })}
                 hasHeader={false}
                 shouldCloseOnOverlayClick={false}
                 confirmLabel=" حفظ"
                 cancelLabel="الغاء"
                 onConfirm={() => {
                   setState({ isShown: false });
                   this.newitem();
                 }}
               >
                 <div>
                   <div id="new_itemnav"> انشاء مطبخ جديد </div>
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
                       <div style={{ width: "30%" }}> رقم المطبخ </div>
                       <div style={{ width: "80%", textAlign: "center" }}>
                         {" "}
                         <input
                           type="text"
                           id="field2"
                           placeholder="  رقم المطبخ"
                           value={this.state.kitID}
                           onChange={e =>
                             this.setState({ kitID: e.target.value })
                           }
                         />{" "}
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
                     ></div>
                   </div>
                 </div>
               </Dialog>

               <div onClick={() => setState({ isShown: true })} id="new">
                 جديد
               </div>
             </Pane>
           )}
         </Component>
       </div>
     );
   }
 }
 export default AddKitchen;