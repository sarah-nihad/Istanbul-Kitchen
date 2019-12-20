 import React from 'react';
 import {Pane,Dialog} from 'evergreen-ui';
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
       name: '',
       username: '',
        dept_id: '',
         role_id: '',
     };
   }


 edit() {
     var headers = {
       Authorization: cookies.get("token")
     };
  // console.log('vv',headers.Authorization);
  
     axios({
       url: Host + `users/${this.props.ids}`,
       method: "PUT",
       headers: headers,
       data:{
       username:this.state.username,
       name:this.state.name,
         dept_id:this.state.dept_id,
           role_id:this.state.role_id,
       },
     })
     
         .then(response => {
           toast.success("تم التعديل بنجاح");
           window.location.reload();
         })
         .catch(function(error) {
           if (error.response.data.error) {
             toast.error('تأكد من صحة المعلومات');  
           }
          
           
         });
   }



   render(){
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
                 title="انشاء مستخدم جديد "
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
                   <div id="new_itemnav"> تعديل بيانات المستخدم </div>
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
                       <div style={{ width: "30%" }}> اسم المستخدم </div>
                       <div style={{ width: "80%", textAlign: "center" }}>
                         <input
                           type="text"
                           id="field2"
                           placeholder=" اسم المستخدم"
                           value={this.state.username}
                           onChange={e =>
                             this.setState({ username: e.target.value })
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
                     >
                       <div style={{ width: "30%" }}> الاسم </div>
                       <div style={{ width: "80%", textAlign: "center" }}>
                         <input
                           type="text"
                           id="field2"
                           placeholder=" الاسم "
                           value={this.state.name}
                           onChange={e =>
                             this.setState({ name: e.target.value })
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
                     >
                       <div style={{ width: "30%" }}> القسم </div>

                       <div style={{ width: "80%", textAlign: "center" }}>
                         <input
                           type="text"
                           id="field2"
                           placeholder=" القسم "
                           value={this.state.dept_id}
                           onChange={e =>
                             this.setState({ dept_id: e.target.value })
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
                     >
                       <div style={{ width: "30%" }}> الصلاحية </div>

                       <div style={{ width: "80%", textAlign: "center" }}>
                         <input
                           type="text"
                           id="field2"
                           placeholder=" الصلاحية "
                           value={this.state.role_id}
                           onChange={e =>
                             this.setState({ role_id: e.target.value })
                           }
                         />{" "}
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
 export default EditUser;