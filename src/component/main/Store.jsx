import React from 'react';
import { Link ,NavLink} from 'react-router-dom'
import AddStore from '../common/AddStore';
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../assets/js/Host";
import { Pane, Dialog, Button } from "evergreen-ui";
import Component from "@reactions/component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Redirect } from "react-router-dom";
import Lottie from "lottie-react-web";
import animation from "../../assets/js/animation.json";
import Context from "../../assets/js/context";
import Select from "react-select";
import MaterialDatatable from "material-datatable";
 import loding from "../../assets/js/loding.json";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
const cookies = new Cookies();

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px dotted pink",
    color: state.isSelected ? "#ffbf41e0" : "blue"
  }),
  control: () => ({
    direction: "rtl",
    textAlign: "center",
    display: "flex"
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  }
};
class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      uss: [],
      data1: [],
      num: "",
      check: "",
      trigger_value1: "",
      trigger_value33: "",
      count33: "",
      code1: "",
      store1: "",
      count1: "",
      item_id33: "",
      store_id33: "",
      item_id: "",
      store_id: ""
    };
  }

  getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MuiPaper: {
          elevation4: {
            width: "90%"
          }
        }
      }
    });

 

  delete(id) {
    let formData = new FormData();
    var headers = {
      "Content-Type": "application/json",
      Authorization: cookies.get("token")
    };
    axios({
      url: Host + `inventories/${id}`,
      method: "DELETE",
      data: formData,
      headers: headers
    })
      .then(response => {
        if (response.status === 202) {
          toast.warning(" لا يمكنك الحذف  ");
        } else if (response.status === 200) {
          this.componentDidMount();
          toast.success(" تم الحذف بنجاح ");
        }
        this.componentDidMount();
      })
      .catch(function(err) {
        console.log(err.response.data.Error);
      });
  }

  componentDidMount() {
    const { selectedOption } = this.state;

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

    axios
      .get(Host + "inventories", {
        headers: {
          Authorization: cookies.get("token"),
          Accept: "application/json"
        }
      })
      .then(res => {
        this.setState({
          data: res.data,
 
        });
        // console.log("data1", this.state.data);
        let arr = [];
        for (let index = 0; index < this.state.data.length; index++) {
          let obj = {
            code: this.state.data[index].item.code,
            store: this.state.data[index].store.name,
            trigger_value: this.state.data[index].trigger_value,
            count: this.state.data[index].count,

            delete: (
              <i
                className="far fa-trash-alt"
                id="del"
                onClick={() => {
                  this.delete(this.state.data[index].id);
                }}
              ></i>
            ),
            edit: (
              <Component
                initialState={{
                  isShown: false,
                  counts: res.data[index].count,
                  trigger_values: res.data[index].trigger_value
                }}
              >
                {({ state, setState }) => (
                  <Pane>
                    <Dialog
                      isShown={state.isShown}
                      onCloseComplete={() => setState({ isShown: false,spin:false,errors:false })}
                      hasHeader={false}
                      shouldCloseOnOverlayClick={false}
                      confirmLabel=" حفظ"
                      cancelLabel="الغاء"
                      onConfirm={() => {
                                       if (state.errors===true) {
                    return(
                       toast.error( `  يجب ان تكون قيمة الاشعار اقل من العدد المتوفر` )
                      );   
                  }
              else if (state.errors===false) {
                        setState({ spin: true });
                         var headers = {
      Authorization: cookies.get("token")
    };
    axios({
      url: Host + `inventories/${this.state.data[index].id}`,
      method: "PUT",
      headers: headers,
      data: {
        // item_id: this.state.item_id,
        // store_id: this.state.store_id,
        count: state.counts,
        trigger_value:state.trigger_values,
      }
    })
      .then(response => {
        toast.success("تم تعديل المعلومات بنجاح");
        setState({ isShown: false });
        setState({ spin: false });
        this.componentDidMount();
      })
      .catch(function(error) {
        setState({ spin: false });
        if (error.response.data.error) {
         toast.error(" يجب عليك اجراء بعض التغيرات في قيمك للتحديث ");
        }
      });
                      }}}
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
                              العدد المتوفر
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
                                value={state.counts}
                                onChange={e => {
                                  setState({ counts: e.target.value });
                              
                                }}
                              />
                            </div>
                          </div>

                          <div style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-around",
                              height: "60px",
                              direction: "rtl",
                              fontWeight: "600",
                              fontSize: "18px",
                              width: "100%"
                            }} >
                            <div style={{ width: "30%", textAlign: "center" }}> قيمة الاشعار</div>
                            <div style={{ width: "80%", textAlign: "center" }}>
                              <input
                                type="text"
                                id="field2"
                                placeholder="قيمة الاشعار"
                                value={state.trigger_values}
                                onChange={(e)=> {
                                  setState({ trigger_values: e.target.value });
                                  if ( e.target.value > state.counts ) {
                                                     setState({errors: true});
                                                    } else {
                                                    setState({ errors: false});
                                                    }
                                }}
                              />
                            </div>
                          </div>
                              {state.spin ? (
                                         <div style={{ width: "100%",position: "absolute"}}>
                                           <Lottie
                                             options={{
                                               animationData: loding
                                             }}
                                             width={300}
                                             height={150}
                                             position="absolute"
                                           />
                                         </div>
                                       ) : null}
                        </div>
                      </div>
                    </Dialog>

                    <div onClick={() => setState({ isShown: true })}>
                      <i className="fas fa-edit" id="edit"></i>
                    </div>
                  </Pane>
                )}
              </Component>
            )
          };
          arr.push(obj);
        }
        this.setState({
          data1: arr,
          check: "login"
        });
      })
      .catch(err => {
        console.log("error:", err);
        this.setState({
          check: "notlogin"
        });
      });
  }


  render() {
       const { selectedOption } = this.state;
    const columns = [
      { name: "حذف", field: "delete" },
      { name: "تعديل", field: "edit" },
      { name: "  قيمة الاشعار", field: "trigger_value" },
      { name: " العدد المتوفر ", field: "count" },
      { name: " المخزن ", field: "store" },
      { name: " رمز المادة ", field: "code" }
    ];

    const options = {
      selectableRows: false,
      print: false,
      responsive: "scroll",
      rowCursorHand: false,
      sort: false,
      filter: true,
      download:false,
      textLabels: {
        body: {
          noMatch: " لم يتم العثور على سجلات مطابقة",
          toolTip: "فرز"
        },
        pagination: {
          next: "الصفحة التالية",
          previous: "الصفحة السابقة",
          rowsPerPage: "عدد الصفوف",
          displayRows: "من"
        },
        toolbar: {
          search: "بحث",
          downloadCsv: "تنزيل",
          print: "Print",
          viewColumns: " التحكم بالاعمدة",
          filterTable: "فلتر"
        },
        filter: {
          all: "الكل",
          title: "فلتر",
          reset: "إعادة تعيين"
        },
        viewColumns: {
          title: "عرض الأعمدة",
          titleAria: "إظهار / إخفاء أعمدة الجدول"
        }
      }
    };

    return (
      <Context.Consumer>
        {ctx => {
          if (this.state.check === "notlogin") {
            return <Redirect to="/"></Redirect>;
          } else if (
                   this.state.check === "login" && cookies.get("role") !== "checker"
                 ) {
                   return (
                     <div id="main_sec">
                       <ToastContainer
                         position="bottom-center"
                         autoClose={5000}
                         hideProgressBar
                         newestOnTop
                         closeOnClick
                         rtl
                         pauseOnVisibilityChange
                         draggable
                         pauseOnHover
                       />
                       <div id="main_row">
                         <div style={{ width: "100%" }}>
                           <Component initialState={{ isShown: false,spin:false, errors:false }}>
                             {({ state, setState }) => (
                               <Pane>
                                 <Dialog
                                   isShown={state.isShown}
                                    onCloseComplete={() => setState({ isShown: false})}
                                   hasHeader={false}
                                   shouldCloseOnOverlayClick={false}
                                   confirmLabel=" حفظ"
                                   cancelLabel="الغاء"
                                   onConfirm={() => {
                                                         if (state.errors===true) {
                    return(
                       toast.error( `  يجب ان تكون قيمة الاشعار اقل من العدد المتوفر` )
                      );   
                  }
              else if (state.errors===false) {
                                     setState({ spin: true });
                                    let formData = new FormData();
    var headers = {
      Accept: "application/json",
      Authorization: cookies.get("token")
    };
    formData.append("trigger_value",this.state.trigger_value33);
    formData.append("item_id",this.state.item_id33);
    formData.append("store_id",this.state.store_id33);
    formData.append("count",this.state.count33);
    axios({
      url: Host + `inventories`,
      method: "POST",
      data: formData,
      headers: headers
    })
      .then(response => {
        toast.success("تمت الاضافة بنجاح");
  setState({ spin: false });
    setState({ isShown: false });
       this.componentDidMount();
      })
      .catch(function(error) {
        setState({ spin: false });
        if (error.response) {
          console.log(error.response.data.error);

          toast.error("تأكد من ادخال المعلومات");
        }
      });
                                   }}}
                                 >
                                   <div>
                                     <div id="new_itemnav">
                                       اضافة مخزون جديد{" "}
                                     </div>
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
                                             width: "30%",
                                             textAlign: "center"
                                           }}
                                         >
                                           رمز المادة
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
                                               this.setState({
                                                 item_id33: e.value
                                               });
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
                                         <div
                                           style={{
                                             width: "30%",
                                             textAlign: "center"
                                           }}
                                         >
                                           المخزن
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
                                               this.setState({
                                                 store_id33: e.value
                                               });
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
                                         <div
                                           style={{
                                             width: "30%",
                                             textAlign: "center"
                                           }}
                                         >
                                           العدد المتوفر
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
                                             value={this.state.count33}
                                             onChange={e => {
                                               this.setState({
                                                 count33: e.target.value
                                               });
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
                                         <div
                                           style={{
                                             width: "30%",
                                             textAlign: "center"
                                           }}
                                         >
                                           قيمة الاشعار
                                         </div>

                                         <div
                                           style={{
                                             width: "80%",
                                             textAlign: "center"
                                           }}
                                         >
                                           <input
                                             type="text"
                                             id="field2"
                                             placeholder="قيمة الاشعار"
                                             value={this.state.trigger_value33}
                                             onChange={e => {
                                               this.setState({trigger_value33: e.target.value});
                                                   if ( e.target.value > this.state.count33 ) {
                                                     setState({errors: true});
                                                    } else {
                                                    setState({ errors: false});
                                                    }
                                             }}
                                           />
                                         </div>
                                       </div>
                                           {state.spin ? (
                                         <div style={{ width: "100%",position: "absolute"}}>
                                           <Lottie
                                             options={{
                                               animationData: loding
                                             }}
                                             width={300}
                                             height={150}
                                             position="absolute"
                                           />
                                         </div>
                                       ) : null}
                                     </div>
                                   </div>
                                 </Dialog>

                                 <div
                                   onClick={() => setState({ isShown: true })}
                                   id="new"
                                 >
                                   جديد
                                 </div>
                               </Pane>
                             )}
                           </Component>
                         </div>

                         <div style={{ width: "100%" }} id="rightdiv">
                           <NavLink to="/Store" activeClassName="active">
                             <div id="sect1">المخزون</div>
                           </NavLink>

                           <NavLink to="/Material" activeClassName="active">
                             <div id="sect1">المواد فقط</div>
                           </NavLink>

                           <NavLink to="/Section" activeClassName="active">
                             <div id="sect1">الاصناف</div>
                           </NavLink>
                         </div>
                       </div>
                       <div
                         style={{
                           width: "100%",
                           display: "flex",
                           justifyContent: "center"
                         }}
                       >
                         <MuiThemeProvider>
                           <MaterialDatatable
                             data={this.state.data1}
                             columns={columns}
                             options={options}
                           />
                         </MuiThemeProvider>
                       </div>
                     </div>
                   );
                 } else if (this.state.check === "") {
                   return (
                     <div
                       style={{
                         display: "flex",
                         flexDirection: "column",
                         alignItems: "center",
                         justifyContent: "center"
                       }}
                     >
                       <Lottie
                         options={{
                           animationData: animation
                         }}
                         width={300}
                         height={300}
                       />
                     </div>
                   );
                 }
        }}
      </Context.Consumer>
    );
  }
}

export default Store;