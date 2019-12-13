 import React from 'react';
 import {Pane,Dialog,Button} from 'evergreen-ui';
import Component from '@reactions/component';
import Select from 'react-select';
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../assets/js/Host";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const cookies = new Cookies();

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? '#ffbf41e0' : 'blue',
   
  }),
  control: () => ({
     
    direction: 'rtl',
    textAlign: 'center',
  display: 'flex',
   
  }),
    singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}


 class EditCard extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       data: [],
       count: ""
     };
   }

   edit() {
     var headers = {
       Authorization: cookies.get("token")
     };
     // console.log('vv',headers.Authorization);

     axios({
       url: Host + `kittrans/${this.props.id}`,
       method: "PUT",
       headers: headers,
       data: {
         count: this.state.count
       }
     })
       .then(response => {
         toast.success("تم تعديل المعلومات بنجاح");
         window.location.reload();
       })
       .catch(function(error) {
         if (error.response.data.error) {
           toast.error(error.response.data.error);
         }
       });
   }

   render() {
     const { selectedOption } = this.state;
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
                   <div id="new_itemnav"> تعديل المعلومات </div>
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
                         <div style={{ width: "35%", textAlign: "center" }}>
                           {" "}
                           الكمية{" "}
                         </div>

                         <div style={{ width: "55%", textAlign: "center" }}>
                           <input
                             type="text"
                             id="field2"
                             placeholder="الكمية"
                             value={this.state.count}
                             onChange={e => {
                               this.setState({ count: e.target.value });
                             }}
                           />
                         </div>
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
 export default EditCard;