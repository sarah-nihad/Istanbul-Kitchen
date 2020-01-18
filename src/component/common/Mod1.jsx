
 import React from 'react';
 import {Pane,Dialog,Button} from 'evergreen-ui';
import Component from '@reactions/component';
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../assets/js/Host";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const cookies = new Cookies();
 class Mod1 extends React.Component{
      constructor(props) {
     super(props);
     this.state = {
       data: [],
       name: '',
       descr: ''
     };
   }


    newitem(){
    let formData = new FormData();
        var headers = {
         Accept: "application/json",
          Authorization: cookies.get("token")
        };
           formData.append("name", this.state.name);
     formData.append("descr", this.state.descr);
    axios({
      url: Host + `cats`,
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
                   this.newitem();
                 }}
               >
                 <div>
                   <div id="new_itemnav"> انشاء صنف جديد </div>
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
                     
                       <div style={{ width: "30%", textAlign: "center" }}>
                       
                         اسم الصنف{" "}
                       </div>
                       <div style={{ width: "80%", textAlign: "center" }}>
                         <input
                           type="text"
                           id="field2"
                           placeholder=" اسم الصنف"
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
                       <div style={{ width: "30%", textAlign: "center" }}>
                         {" "}
                         وصف{" "}
                       </div>
                       <div style={{ width: "80%", textAlign: "center" }}>
                         <input
                           type="text"
                           id="field2"
                           placeholder="وصف (اختياري) "
                           value={this.state.descr}
                           onChange={e =>
                             this.setState({ descr: e.target.value })
                           }
                         />{" "}
                       </div>
                     </div>
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
 export default Mod1;