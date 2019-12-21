import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Component from "@reactions/component";
import { Pane, Dialog,  Spinner } from "evergreen-ui";
import Cookies from "universal-cookie";
import Host from "../../assets/js/Host";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Lottie from "lottie-react-web";
 import loding from "../../assets/js/loding.json";
import animation from "../../assets/js/animation.json";
import Context from "../../assets/js/context";
import MaterialDatatable from "material-datatable";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import Select from "react-select";

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
class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verified: "",
      data: [],
      data5: [],
      uss: [],
      check: "",
      dept: [],
      dapts: [],
      spin: false,
      rolee: [],
      rolees:[],
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
      url: Host + `users/${id}`,
      method: "PUT",
      headers: headers,
      data: {
        username: this.state.username,
        name: this.state.name,
        dept_id: this.state.dept_id,
        role_id: this.state.role_id
      }
    })
      .then(response => {
        toast.success("تم التعديل بنجاح");
        this.componentDidMount();
      })
      .catch(function(error) {
        if (error.response.data.error) {
          toast.error("تأكد من صحة المعلومات");
        }
      });
  }

  editpass(id) {
    var headers = {
      Authorization: cookies.get("token")
    };
    axios({
      url: Host + `auth/cp/${id}`,
      method: "PUT",
      headers: headers,
      data: {
        password: this.state.password,
        c_password: this.state.c_password
      }
    })
      .then(response => {
        toast.success("تم التعديل بنجاح");
      })
      .catch(function(error) {
        if (error.response.data.Error.c_password) {
          toast.error("تأكد من صحة المعلومات");
        }
      });
  }

 

  componentDidMount() {
       const { selectedOption } = this.state;
 axios
   .get(Host + "roles", {
     headers: {
       Authorization: cookies.get("token"),
       Accept: "application/json"
     }
   })
   .then(res => {
     this.setState({
       rolee: res.data.Data
     });

     let arr = [];
     for (let index = 0; index < this.state.rolee.length; index++) {
       let obj = {
         value: this.state.rolee[index].id,
         label: this.state.rolee[index].name,
       };
       arr.push(obj);
     }
     this.setState({
       rolees: arr
     });
   })
   .catch(err => {
     console.log("error:", err);
   });

    axios
      .get(Host + "depts", {
        headers: {
          Authorization: cookies.get("token"),
          Accept: "application/json"
        }
      })
      .then(res => {
        this.setState({
          dept: res.data.data
        });

        let arr = [];
        for (let index = 0; index < this.state.dept.length; index++) {
          let obj = {
            value: this.state.dept[index].id,
            label: this.state.dept[index].name
          };
          arr.push(obj);
        }
        this.setState({
          dapts: arr
        });
      })
      .catch(err => {
        console.log("error:", err);
      });

    axios
      .get(Host + "users", {
        headers: {
          Authorization: cookies.get("token"),
          Accept: "application/json"
        }
      })
      .then(res => {
        this.setState({
          uss: res.data.data,
          check: "login"
        });
        // console.log(this.state.uss);
        let arr = [];
        for (let index = 0; index < this.state.uss.length; index++) {
          let obj = {
            username: this.state.uss[index].username,
            name: this.state.uss[index].name,
            depa: this.state.uss[index].dept.name,
            lece: this.state.uss[index].role.name,
            pass: (
              <Component initialState={{ isShown: false ,pass:'',cpass:'',spin:false,errors:false  }}>
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
                       toast.error( ' كلمة المرور قصيرة او غير متطابقة' )
                      );   
                  }
              else if (state.errors===false) {
                        setState({ spin: true });
                      
                         var headers = {
                           Authorization: cookies.get("token")
                         };
                         axios({
                           url: Host + `auth/cp/${this.state.uss[index].id}`,
                           method: "PUT",
                           headers: headers,
                           data: {
                             password:state.pass,
                             c_password:state.cpass
                           }
                         })
                           .then(response => {
                             toast.success("تم التعديل بنجاح");
                              setState({ isShown: false });
                              setState({ spin: false });
                              this.componentDidMount();
                           })
                           .catch(function(error) {
                              setState({ spin: false });
                             if (error.response.data.Error.c_password) {
                               toast.error("تأكد من صحة المعلومات");
                             }
                           });
                      }}}
                    >
                      <div>
                        <div id="new_itemnav"> تعديل كلمة المرور </div>
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
                            <div style={{ width: "30%" }}> كلمة المرور </div>
                            <div style={{ width: "80%", textAlign: "center" }}>
                              <input
                                type="password"
                                id="field2"
                                placeholder=" ****** "
                                value={state.pass}
                                onChange={e =>{
                                 setState({ pass: e.target.value })
                                    if (e.target.value.length < 4) {
                                                     setState({errors: true});
                                                    } else {
                                                    setState({ errors: false});
                                                    }
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
                            <div style={{ width: "30%" }}>
                              {" "}
                              تأكيد كلمة المرور{" "}
                            </div>

                            <div style={{ width: "80%", textAlign: "center" }}>
                              <input
                                type="password"
                                id="field2"
                                placeholder=" ****** "
                                value={state.cpass}
                                onChange={e =>{
                                 setState({ cpass: e.target.value })
                                   if (e.target.value.length < 4 || e.target.value !== state.pass ) {
                                                     setState({errors: true});
                                                    } else {
                                                    setState({ errors: false});
                                                    }
                                }}
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
                      onClick={() => setState({ isShown: true })}
                      id="pass_use"
                    >
                      <i className="fas fa-cog"></i>
                    </div>
                  </Pane>
                )}
              </Component>
            ),

            status: (
              <Component initialState={{ isShown: true, spin: false }}>
                {({ state, setState }) =>
                   state.spin ? (
                 
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center'}} >  <Spinner size={16} /></div>
                  ) : this.state.uss[index].status == 1 ? (
                    <DoneIcon
                      style={{
                        color: "#5bb061",
                        fontSize: 30,
                        cursor: "pointer"
                      }}
                      onClick={() => {
                        setState({ spin: true });
                        var headers = {
                          Authorization: cookies.get("token")
                        };
                        axios({
                          url: Host + `auth/block/${this.state.uss[index].id}`,
                          method: "PUT",
                          headers: headers,
                          data: {
                            status: "0"
                          }
                        })
                          .then(response => {
                            toast.success("تم حظر المستخدم");
                            setState({ spin: false });
                            this.componentDidMount();
                          })
                          .catch(function(error) {
                            setState({ spin: false });
                            if (error.response.data.Error) {
                              toast.error(error.response.data.Error);
                            }
                          });
                      
                      }}
                    />
                  ) : (
                    <CloseIcon
                      style={{
                        color: "rgb(169, 16, 16)",
                        fontSize: 30,
                        cursor: "pointer"
                      }}
                      onClick={() => {
                        setState({ spin: true });
                        var headers = {
                          Authorization: cookies.get("token")
                        };
                        axios({
                          url: Host + `auth/block/${this.state.uss[index].id}`,
                          method: "PUT",
                          headers: headers,
                          data: {
                            status: "1"
                          }
                        })
                          .then(response => {
                            toast.success("تم تفعيل المستخدم");
                            setState({ spin: false });
                            this.componentDidMount();
                          })
                          .catch(function(error) {
                            setState({ spin: false });
                            if (error.response.data.Error) {
                              toast.error(error.response.data.Error);
                            }
                          });
                      }}
                    />
                  )
                }
              </Component>
            ),
            delete: (
              <i
                className="far fa-trash-alt"
                id="del"
                onClick={() => {
                  this.delete(this.state.uss[index].id);
                }}
              ></i>
            ),
            edit: (
              <Component
                initialState={{
                  isShown: false,
                  names: res.data.data[index].name,
                  usernames: res.data.data[index].username,
                  depas: '',
                  roles: '',
                  spin:false,errors:false,
                  dep:res.data.data[index].dept.id,
                  rol:res.data.data[index].role.id
                }}
              >
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
                       
                         if (state.errors===true) {
                    return(
                       toast.error( ` اسم المستخدم قصير او المعلومات غير مدخلة ` )
                      );   
                  }
              else if (state.errors===false) {
                        setState({ spin: true });
                        var headers = {
                          Authorization: cookies.get("token")
                        };
                        axios({
                          url: Host + `users/${res.data.data[index].id}`,
                          method: "PUT",
                          headers: headers,
                          data: {
                            username: state.usernames,
                            name: state.names,
                            dept_id:state.dep,
                            role_id:state.rol
                          }
                        })
                          .then(response => {
                            toast.success("تم التعديل بنجاح");
                            setState({ isShown: false });
                            setState({ spin: false });
                            this.componentDidMount();
                          })
                          .catch(function(error) {
                            setState({ spin: false });
                            if (error.response.data.error) {
                              toast.error(" قم بتغيير المعلومات من اجل تعديلها");
                            }
                          });
                      }}}
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
                                value={state.usernames}
                                onChange={(e)=>{
                                  setState({ usernames: e.target.value })
                                      if (
                                                      e.target.value.length < 4
                                                    ) {
                                                     setState({errors: true});
                                                    } else {
                                                    setState({ errors: false});
                                                    }
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
                            <div style={{ width: "30%" }}> الاسم </div>
                            <div style={{ width: "80%", textAlign: "center" }}>
                              <input
                                type="text"
                                id="field2"
                                placeholder=" الاسم "
                                value={state.names}
                                onChange={e =>{
                                  setState({ names: e.target.value })
                                      if ( e.target.value.length < 4) {
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
                            <div style={{ width: "30%" }}> القسم </div>

                            <div style={{ width: "80%", textAlign: "center" }}>
                              <Select
                                id="field2"
                                placeholder=" القسم   "
                                  onChange={e => {
                                  setState({ dep: e.value });
                                }}
                                defaultValue={state.depas}
                                value={selectedOption}
                                styles={customStyles}
                                options={this.state.dapts}
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
                            <div style={{ width: "30%" }}> الصلاحية </div>

                            <div style={{ width: "80%", textAlign: "center" }}>
                              <Select
                                id="field2"
                                placeholder=" الصلاحية   "
                                onChange={e => {
                                 setState({
                                    rol: e.value
                                  });
                                }}
                                defaultValue={state.roles}
                                value={selectedOption}
                                styles={customStyles}
                                options={this.state.rolees}
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

                    <div onClick={() =>{
                     setState({ isShown: true })
                       let getIndex=this.state.dapts.findIndex((element) => element.label === res.data.data[index].dept.name)
                       
                        const getIndex1=this.state.rolees.findIndex((element) => element.label === res.data.data[index].role.name)
                      setState({depas:this.state.dapts[getIndex]})
                     
                      // console.log(res.data.data[index].dept.id);
                      
                      setState({roles:this.state.rolees[getIndex1]})
                
                    }}>

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
      url: Host + `users/${id}`,
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
    const { selectedOption } = this.state;
    const columns = [
      { name: "حذف", field: "delete" },
      { name: "تعديل", field: "edit" },
      { name: "الحالة", field: "status" },
      { name: " كلمة المرور", field: "pass" },
      { name: " الصلاحية ", field: "lece" },
      { name: " القسم ", field: "depa" },
      { name: " الاسم  ", field: "name" },
      { name: " اسم المستخدم ", field: "username" },
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
          // if (this.state.check === "notlogin") {
          //   return <Redirect to="/"></Redirect>;
          // } else
          if (
            this.state.check === "login" 
            
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
                    <Component initialState={{ isShown: false,spin:false,errors:false,errorsname:false }}>
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
              if (state.errors===true ) {
                    return(toast.error( `     كلمة المرور قصيرة او غير متطابقة ` ));   
                  }
                  else if (state.errorsname===true) {
                    return(toast.error( `        اسم المستخدم او الاسم المدخل قصير ` ));  
                  }
              else if (state.errors===false && state.errorsname===false ) {

                              setState({ spin: true });
                                let formData = new FormData();
    var headers = {
      Accept: "application/json",
      Authorization: cookies.get("token")
    };
    formData.append("name", this.state.name);
    formData.append("username", this.state.username);
    formData.append("secret", this.state.secret);
    formData.append("status", this.state.status);
    formData.append("role_id", this.state.role_id);
    formData.append("dept_id", this.state.dept_id);
    formData.append("c_password", this.state.c_password);
    formData.append("password", this.state.password);
    axios({
      url: Host + `auth/reg`,
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
        if (error.response.data.Error) {
          console.log(error.response.data.Error);

          toast.error('تأكد من ادخال المعلومات');
        }
         else if (error.response.data.error.username) {
          console.log(error.response.data.error.username);

          toast.error('اسم المستخدم موجود بالفعل');
        }
      });
                            }}}
                          >
                            <div>
                              <div id="new_itemnav"> انشاء مستخدم جديد </div>
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
                                  <div style={{width: "30%",textAlign: "center"}}>
                                    اسم المستخدم </div>
                                  <div style={{ width: "80%",textAlign: "center"}}>
                                    <input type="text" id="field2" placeholder=" اسم المستخدم"
                                      value={this.state.username}
                                      onChange={e =>{
                                        this.setState({ username: e.target.value})
                                          if (e.target.value.length < 4) {
                                                     setState({errorsname: true});
                                                    } else {
                                                    setState({ errorsname: false});
                                                    }
                                      }}/>
                                  </div>
                                </div>

                                <div style={{ display: "flex",alignItems: "center",
                                    justifyContent: "space-around",
                                    height: "60px",
                                    direction: "rtl",
                                    fontWeight: "600",
                                    fontSize: "18px",
                                    width: "100%"
                                  }}
                                >
                                  <div style={{ width: "30%", textAlign: "center"}}>
                              الاسم
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
                                      placeholder=" الاسم "
                                      value={this.state.name}
                                      onChange={e =>{
                                        this.setState({ name: e.target.value })
                                          if (e.target.value.length < 2) {
                                                     setState({errorsname: true});
                                                    } else {
                                                    setState({ errorsname: false});
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
                                   
                                    كلمة المرور
                                  </div>

                                  <div
                                    style={{
                                      width: "80%",
                                      textAlign: "center"
                                    }}
                                  >
                                    <input
                                      type="password"
                                      id="field2"
                                      placeholder="****** "
                                      value={this.state.password}
                                      onChange={e =>{
                                        this.setState({password: e.target.value})
                                          if (e.target.value.length < 4) {
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
                                    تأكيد كلمة المرور{" "}
                                  </div>

                                  <div
                                    style={{
                                      width: "80%",
                                      textAlign: "center"
                                    }}
                                  >
                                    <input
                                      type="password"
                                      id="field2"
                                      placeholder=" ******* "
                                      value={this.state.c_password}
                                      onChange={e =>{
                                        this.setState({ c_password: e.target.value})
                                          if (e.target.value.length < 4 || e.target.value !== this.state.password ) {
                                                     setState({errors: true});
                                                    } else {
                                                    setState({ errors: false});
                                                    }
                                                   
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
                                  <div
                                    style={{
                                      width: "30%",
                                      textAlign: "center"
                                    }}
                                  >
                                    كلمة السر{" "}
                                  </div>

                                  <div
                                    style={{
                                      width: "80%",
                                      textAlign: "center"
                                    }}
                                  >
                                    <input
                                      type="password"
                                      id="field2"
                                      placeholder=" ******* "
                                      value={this.state.secret}
                                      onChange={e =>
                                        this.setState({
                                          secret: e.target.value
                                        })
                                      }
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
                                    الحالة
                                  </div>

                                  <div
                                    style={{
                                      width: "80%",
                                      textAlign: "center"
                                    }}
                                  >
                                    <select
                                      type="text"
                                      id="field2"
                                      placeholder=" الحالة "
                                      value={this.state.status}
                                      onChange={e =>
                                        this.setState({
                                          status: e.target.value
                                        })
                                      }
                                    >
                                      <option value="-">- </option>
                                      <option value="1">مفعل</option>
                                      <option value="0"> غير مفعل </option>
                                    </select>
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
                                  <div style={{ width: "30%", textAlign: "center" }} >
                                    القسم
                                  </div>

                                  <div style={{width: "80%",textAlign: "center"}}>
                                    <Select
                                      id="field2"
                                      placeholder=" القسم   "
                                      onChange={e => {
                                        this.setState({
                                          dept_id: e.value
                                        });
                                      }}
                                      value={selectedOption}
                                      styles={customStyles}
                                      options={this.state.dapts}
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
                                    الصلاحية{" "}
                                  </div>

                                  <div
                                    style={{
                                      width: "80%",
                                      textAlign: "center"
                                    }}
                                  >
                                    <Select
                                      id="field2"
                                      placeholder=" الصلاحية   "
                                      onChange={e => {
                                        this.setState({
                                          role_id: e.value
                                        });
                                      }}
                                      value={selectedOption}
                                      styles={customStyles}
                                      options={this.state.rolees}
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
                    <NavLink to="/Users" activeClassName="active">
                      <div id="sect1">المستخدمين</div>
                    </NavLink>
                  </div>
                </div>

                <MuiThemeProvider theme={this.getMuiTheme()}>
                  <MaterialDatatable
                    data={this.state.data}
                    columns={columns}
                    options={options}
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

export default Users;
