 import React from 'react';
 import {Pane,Dialog,Button} from 'evergreen-ui';
import Component from '@reactions/component';
import Select from 'react-select';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'يدات', label: 'يدات' },
  { value: 'vanilla', label: 'Vanilla' },
];
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


 class EditCard extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
 data:[],
  data2:[],
 type:'',
 num:'',
 material:'',
 number:22
    }


  }




   render(){
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
                       <div style={{ width: "35%", textAlign: "center" }}>
                         {" "}
                         الاصناف{" "}
                       </div>
                       <div
                         style={{
                           width: "55%",
                           textAlign: "center",
                           display: "flex",
                           justifyContent: "center"
                         }}
                       >
                         <Select
                           id="field2"
                           placeholder="  اختر الصنف"
                           onChange={e => {
                             this.setState({ type: e.value });
                           }}
                           value={selectedOption}
                           styles={customStyles}
                           options={options}
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
                       <div style={{ width: "35%", textAlign: "center" }}>
                         {" "}
                         المواد{" "}
                       </div>
                       <div
                         style={{
                           width: "55%",
                           textAlign: "center",
                           display: "flex",
                           justifyContent: "center"
                         }}
                       >
                         <Select
                           id="field2"
                           placeholder="  اختر المواد"
                           onChange={e => {
                             this.setState({ type: e.value });
                           }}
                           value={selectedOption}
                           styles={customStyles}
                           options={options}
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
                       <div style={{ width: "35%", textAlign: "center" }}>
                         {" "}
                         الكمية{" "}
                       </div>

                       <div style={{ width: "55%", textAlign: "center" }}>
                         <input type="text" id="field2" placeholder="الكمية " />
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