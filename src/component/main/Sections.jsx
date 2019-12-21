import React from 'react';
 import { Pane, Dialog} from "evergreen-ui";
 import Component from "@reactions/component";
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
 import loding from "../../assets/js/loding.json";
const cookies = new Cookies();
class Section extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      uss: [],
      data1: [],
      ids: "",
      check: "",
      names: "",
      descrs: "",
      name: "",
      name22: "",
      sect:''
     
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

  newitem() {
    let formData = new FormData();
    var headers = {
      Accept: "application/json",
      Authorization: cookies.get("token")
    };
    formData.append("name", this.state.sect);
    formData.append("descr", this.state.descrs);
    axios({
      url: Host + `cats`,
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

  edit(id) {
    var headers = {
      Authorization: cookies.get("token")
    };
    axios({
      url: Host + `cats/${id}`,
      method: "PATCH",
      headers: headers,
      data: {
        name: this.state.name22,
        descr: this.state.descr,
      }
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
      .get(Host + "cats", {
        headers: {
          Authorization: cookies.get("token"),
          Accept: "application/json"
        }
      })
      .then(res => {
        this.setState({
          data1: res.data.data,
         
          check: "login"
        });
        // console.log("data1", this.state.data1);
        let arr = [];
        for (let index = 0; index < this.state.data1.length; index++) {
         
          let obj = {
            name: res.data.data[index].name,

            items_count: this.state.data1[index].items_count,
            delete: (
              <i
                className="far fa-trash-alt"
                id="del"
                onClick={() => {
                  this.delete(this.state.data1[index].id);
                }}
              ></i>
            ),

            edit: (
              <Component
                initialState={{
                  isShown: false,
                  names: res.data.data[index].name,
                }}
              >
                {({ state, setState }) => (
                  <Pane>
                    <Dialog
                      isShown={state.isShown}
                      onCloseComplete={() => setState({ isShown: false ,spin:false})}
                      hasHeader={false}
                      shouldCloseOnOverlayClick={false}
                      confirmLabel=" حفظ"
                      cancelLabel="الغاء"
                      onConfirm={() => {
                      setState({ spin: true });
                        // this.edit(this.state.data1[index].id);
                         var headers = {
                           Authorization: cookies.get("token")
                         };
                         axios({
                           url: Host + `cats/${this.state.data1[index].id}`,
                           method: "PUT",
                           headers: headers,
                           data: {
                             name:state.names,
                             descr:state.descrs
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
                             if (error.response.data.Error) {
                               toast.error(
                                 " يجب عليك اجراء بعض التغيرات في قيمك للتحديث "
                               );
                             }
                           });
                      }}
                    >
                      <div>
                        <div id="new_itemnav"> تعديل الصنف </div>
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
                              اسم الصنف{" "}
                            </div>
                            <div style={{ width: "80%", textAlign: "center" }}>
                              <input
                                type="text"
                                id="field2"
                                placeholder=" اسم الصنف"
                                value={state.names}
                                onChange={e => {
                                  setState({ names: e.target.value });
                                }}
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
                                placeholder=" وصف"
                                value={this.state.data1[index].desc}
                                onChange={e =>
                                  this.setState({ descr: e.target.value })
                                }
                              />{" "}
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
                      onClick={() => {
                        console.log(res.data.data[index].name);
                        this.setState({ names: res.data.data[index].name });
                        setState({ isShown: true });
                      }}
                    >
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
          data: arr
        });
      })
      .catch(err => {
        console.log("error:", err);
        this.setState({
          check: "notlogin"
        });
      });
  }

  delete(id) {
    let formData = new FormData();
    var headers = {
      "Content-Type": "application/json",
      Authorization: cookies.get("token")
    };
    axios({
      url: Host + `cats/${id}`,
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

  render() {
    const columns = [
      { name: "حذف", field: "delete" },
      { name: "تعديل", field: "edit" },
      { name: " عدد المواد", field: "items_count" },
      { name: "اسم الصنف", field: "name" }
    ];

    const options = {
      selectableRows: false,
      print: false,
      responsive: "scroll",
      rowCursorHand: false,
      sort: false,
       filter: false,
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
                           <Component initialState={{ isShown: false ,spin:false }}>
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
                       toast.error( `اسم الصنف المدخل قصير` )
                      );   
                  }
              else if (state.errors===false) {
                                        setState({spin:true})
                                     let formData = new FormData();
    var headers = {
      Accept: "application/json",
      Authorization: cookies.get("token")
    };
    formData.append("name", this.state.sect);
    formData.append("descr", this.state.descrs);
    axios({
      url: Host + `cats`,
      method: "POST",
      data: formData,
      headers: headers
    })
      .then(response => {
        toast.success("تمت الاضافة بنجاح");
 setState({ isShown: false });
        this.componentDidMount();
        setState({spin:false})
      })
      .catch(function(error) {
        if (error.response) {
              setState({spin:false})
          console.log(error.response.data.error);

          toast.error("تأكد من ادخال المعلومات");
        }
      });
                                   }}}
                                 >
                                   <div>
                                     <div id="new_itemnav">
                                       {" "}
                                       انشاء صنف جديد{" "}
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
                                           اسم الصنف
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
                                             placeholder=" اسم الصنف"
                                             value={this.state.sect}
                                             onChange={(e) =>{
                                               this.setState({sect: e.target.value })
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
                                         <div
                                           style={{
                                             width: "30%",
                                             textAlign: "center"
                                           }}
                                         >
                                           {" "}
                                           وصف{" "}
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
                                             placeholder="وصف (اختياري) "
                                             value={this.state.descrs}
                                             onChange={e =>
                                               this.setState({
                                                 descrs: e.target.value
                                               })
                                             }
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

                       <MuiThemeProvider theme={this.getMuiTheme()}>
                         <MaterialDatatable
                           data={this.state.data}
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

export default Section;