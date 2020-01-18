import React from 'react';
 import { Pane, Dialog} from "evergreen-ui";
 import Component from "@reactions/component";
 import loding from "../../assets/js/loding.json";
import { NavLink} from 'react-router-dom'
import MaterialDatatable from "material-datatable";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../assets/js/Host";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Redirect } from "react-router-dom";
import Lottie from "lottie-react-web";
import animation from "../../assets/js/animation.json";
import Context from "../../assets/js/context";
const cookies = new Cookies();

class Stores extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      uss: [],
      data1: [],
      ids: "",
      check: "",
      location22: "",
      name2: "",
      location:''
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

 edit(id) {
     var headers = {
       Authorization: cookies.get("token")
     };
    axios({
       url: Host + `stores/${id}`,
       method: "PUT",
       headers: headers,
       data:{
       name: this.state.name2,
       location: this.state.location22
       },
     })
     
         .then(response => {
           toast.success("تم تعديل المعلومات بنجاح");
           this.componentDidMount();
         
         })
         .catch(function(error) {
           if (error.response.data.Error) {
            toast.error(" يجب عليك اجراء بعض التغيرات في قيمك للتحديث ");
           }
         });
 }



  componentDidMount() {
    axios
      .get(Host + "stores", {
        headers: {
          Authorization: cookies.get("token"),
          Accept: "application/json"
        }
      })
      .then(res => {
        this.setState({
          data: res.data,
          check: "login"
        });
        console.log("ids", this.state.ids);
        let arr = [];
        for (let index = 0; index < this.state.data.length; index++) {
          let obj = {
            name: this.state.data[index].name,
            location: this.state.data[index].location,

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
                  names: res.data[index].name,
                  locations: res.data[index].location
                }}
              >
                {({ state, setState }) => (
                  <Pane>
                    <Dialog
                      isShown={state.isShown}
                      onCloseComplete={() => setState({ isShown: false ,spin:false })}
                      hasHeader={false}
                      shouldCloseOnOverlayClick={false}
                      confirmLabel=" حفظ"
                      cancelLabel="الغاء"
                      onConfirm={() => {
                       setState({spin:true})
                        // this.edit(this.state.data[index].id);
                         var headers = {
                           Authorization: cookies.get("token")
                         };
                         axios({
                           url: Host + `stores/${this.state.data[index].id}`,
                           method: "PUT",
                           headers: headers,
                           data: {
                             name: state.names,
                             location: state.locations
                           }
                         })
                           .then(response => {
                             toast.success("تم تعديل المعلومات بنجاح");
                             this.componentDidMount();
                              setState({spin:false})
                              setState({ isShown: false });
                           })
                           .catch(function(error) {
                             setState({spin:false})
                             if (error.response.data.Error) {
                               toast.error(
                                 " يجب عليك اجراء بعض التغيرات في قيمك للتحديث "
                               );
                             }
                           });
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
                                value={state.names}
                                onChange={e => {
                                  setState({ names: e.target.value });
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
                                value={state.locations}
                                onChange={e => {
                                  setState({locations:e.target.value})
                                }}
                              />
                            </div>
                          </div>
                           {state.spin ? (
                                         <div
                                           style={{
                                             width: "100%",
                                             position: "absolute"
                                           }}
                                         >
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

                    <div onClick={() =>{
                    setState({ names: res.data[index].name,
                  locations: res.data[index].location})
                     setState({ isShown: true })}}>

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
          data1: arr
        });
      })
      .catch(err => {
        console.log("error:", err);
        this.setState({ check: "notlogin"});
         if (err.response.status === 403 || err.response.status === 401 ) {
         cookies.remove("token");
                  window.location.href= "/" 
          }
      });
  }

  delete(id) {
    let formData = new FormData();
    var headers = {
      "Content-Type": "application/json",
      Authorization: cookies.get("token")
    };
    axios({
      url: Host + `stores/${id}`,
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
      })
      .catch(function(err) {
        console.log(err.response.data.Error);
      });
  }

  add() {
    let formData = new FormData();
    var headers = {
      Accept: "application/json",
      Authorization: cookies.get("token")
    };
    formData.append("name", this.state.name);
    formData.append("location", this.state.location);
    axios({
      url: Host + `stores`,
      method: "POST",
      data: formData,
      headers: headers
    })
      .then(response => {
        toast.success("تمت الاضافة بنجاح");

       this.componentDidMount();
      })
      .catch(function(error) {
        if (error.response) {
          console.log(error.response.data.Error);

          toast.error(error.response.data.Error);
        }
      });
  }

  render() {
    const columns = [
      { name: "حذف", field: "delete" },
      { name: "تعديل", field: "edit" },
      { name: "  العنوان", field: "location" },
      { name: "اسم المخزن", field: "name" }
    ];

    const options = {
      selectableRows: false,
      print: false,
      rowCursorHand: false,
      sort: false,
      responsive: "scroll",
       filter: false,
      download:false,
      rowsPerPageOptions:[5,10,50,100],
      textLabels: {
        body: {
          noMatch: "  لم يتم العثور على سجلات مطابقة",
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
                           <Component
                             initialState={{
                               isShown: false,
                               spin: false,
                               errors: false
                             }}
                           >
                             {({ state, setState }) => (
                               <Pane>
                                 <Dialog
                                   isShown={state.isShown}
                                   onCloseComplete={() =>
                                     setState({ isShown: false })
                                   }
                                   hasHeader={false}
                                   shouldCloseOnOverlayClick={false}
                                   confirmLabel=" حفظ"
                                   cancelLabel="الغاء"
                                   onConfirm={() => {
                                                   if (state.errors===true) {
                    return(
                       toast.error( `تأكد من ادخال المعلومات` )
                      );   
                  }
              else if (state.errors===false) {
                                 setState({ spin: true });
                                     let formData = new FormData();
                                     var headers = {
                                       Accept: "application/json",
                                       Authorization: cookies.get("token")
                                     };
                                     formData.append("name",this.state.name);
                                     formData.append("location",this.state.location);
                                     axios({
                                       url: Host + `stores`,
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
                                           toast.error(
                                             "تأكد من ادخال المعلومات"
                                           );
                                         }
                                       });
                                   }}}
                                 >
                                   <div>
                                     <div id="new_itemnav">انشاء مخزن جديد
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
                                       
                                         <div style={{ width: "30%" }}>
                                    
                                           اسم المخزن{" "}
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
                                             placeholder=" اسم المخزن"
                                             value={this.state.name}
                                             onChange={e => {
                                               this.setState({name: e.target.value });
                                                    if (
                                                      e.target.value.length < 4
                                                    ) {
                                                     setState({errors: true});
                                                    } else {
                                                    setState({ errors: false});
                                                    }
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
                                         <div style={{ width: "30%" }}>
                                           العنوان
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
                                             placeholder=" العنوان"
                                             value={this.state.location}
                                             onChange={e => {
                                               this.setState({ location: e.target.value});
                                                  if (e.target.value.length < 4) {
                                                    setState({ errors: true });
                                                  } else {
                                                    setState({ errors: false });
                                                  }
                                             }}
                                           />
                                         </div>
                                       </div>
                                       {state.spin ? (
                                         <div
                                           style={{
                                             width: "100%",
                                             position: "absolute"
                                           }}
                                         >
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
                           <NavLink to="/Stores" activeClassName="active">
                             <div id="sect1">المخازن</div>
                           </NavLink>
                         </div>
                       </div>

                       <MuiThemeProvider theme={this.getMuiTheme()}>
                         <MaterialDatatable
                           data={this.state.data1}
                           columns={columns}
                           options={options}
                           bordered
                           striped
                         />
                       </MuiThemeProvider>
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

export default Stores;