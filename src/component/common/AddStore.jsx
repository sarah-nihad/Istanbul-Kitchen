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
 class AddStore extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       item: [],
       items: [],
       store: [],
       stores: []
     };
   }

   componentDidMount() {
     axios
       .get(Host + "items", {
         headers: {
           Authorization: cookies.get("token"),
           Accept: "application/json"
         }
       })
       .then(res => {
         this.setState({
           item: res.data.data
         });

         let arr = [];
         for (let index = 0; index < this.state.item.length; index++) {
           let obj = {
             value: this.state.item[index].id,
             label: this.state.item[index].code
           };
           arr.push(obj);
         }
         this.setState({
           items: arr
         });
       })
       .catch(err => {
         console.log("error:", err);
       });

     axios
       .get(Host + "stores", {
         headers: {
           Authorization: cookies.get("token"),
           Accept: "application/json"
         }
       })
       .then(res => {
         this.setState({
           store: res.data
         });

         let arr = [];
         for (let index = 0; index < this.state.store.length; index++) {
           let obj = {
             value: this.state.store[index].id,
             label: this.state.store[index].name
           };
           arr.push(obj);
         }
         this.setState({
           stores: arr
         });
       })
       .catch(err => {
         console.log("error:", err);
       });
   }

   newitem() {
     let formData = new FormData();
     var headers = {
       Accept: "application/json",
       Authorization: cookies.get("token")
     };
     formData.append("trigger_value", this.state.trigger_value);
     formData.append("item_id", this.state.item_id);
      formData.append("store_id", this.state.store_id);
       formData.append("count", this.state.count);
     axios({
       url: Host + `inventories`,
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
                   this.newitem();
                 }}
               >
                 <div>
                   <div id="new_itemnav"> اضافة مخزون جديد </div>
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
                         {" "}
                         رمز المادة{" "}
                       </div>
                       <div
                         style={{
                           width: "80%",
                           textAlign: "center",
                           display: "flex",
                           justifyContent: "center"
                         }}
                       >
                         <Select
                           id="field2"
                           placeholder="  رمز المادة "
                           onChange={e => {
                             this.setState({ item_id: e.value });
                           }}
                           value={selectedOption}
                           styles={customStyles}
                           options={this.state.items}
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
                       <div style={{ width: "30%", textAlign: "center" }}>
                         {" "}
                         المخزن{" "}
                       </div>

                       <div
                         style={{
                           width: "80%",
                           textAlign: "center",
                           display: "flex",
                           justifyContent: "center"
                         }}
                       >
                         <Select
                           id="field2"
                           placeholder=" المخزن "
                           onChange={e => {
                             this.setState({ store_id: e.value });
                           }}
                           value={selectedOption}
                           styles={customStyles}
                           options={this.state.stores}
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
                       <div style={{ width: "30%", textAlign: "center" }}>
                         {" "}
                         العدد المتوفر{" "}
                       </div>

                       <div
                         style={{
                           width: "80%",
                           textAlign: "center",
                           display: "flex",
                           justifyContent: "center"
                         }}
                       >
                         <input
                           type="text"
                           id="field2"
                           placeholder=" العدد المتوفر   "
                           value={this.state.count}
                           onChange={e => {
                             this.setState({ count: e.target.value });
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
                       <div style={{ width: "30%", textAlign: "center" }}>
                         {" "}
                         قيمة الاشعار{" "}
                       </div>

                       <div style={{ width: "80%", textAlign: "center" }}>
                         <input
                           type="text"
                           id="field2"
                           placeholder="قيمة الاشعار"
                           value={this.state.trigger_value}
                           onChange={e => {
                             this.setState({ trigger_value: e.target.value });
                           }}
                         />
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
 export default AddStore;