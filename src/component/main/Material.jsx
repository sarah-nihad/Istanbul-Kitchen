import React from 'react';
 import { Pane, Dialog } from "evergreen-ui";
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
import Select from "react-select";
 import loding from "../../assets/js/loding.json";
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
class Material extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      uss: [],
      data1: [],
      ids: "",
      check: "",
      code: "",
      cat_id: "",
      cat_id1: "",
      code1: "",
      sara: "",
      sara2: "",
      cats: [],
      catss:[]
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

 

  componentDidMount() {

      const { selectedOption } = this.state;
   axios
     .get(Host + "cats", {
       headers: {
         Authorization: cookies.get("token"),
         Accept: "application/json"
       }
     })
     .then(res => {
       this.setState({
         cats: res.data.data
       });

       let arr = [];
       for (let index = 0; index < this.state.cats.length; index++) {
         let obj = {
           value: this.state.cats[index].id,
           label: this.state.cats[index].name
         };
         arr.push(obj);
       }
       this.setState({
         catss: arr
       });
     })
     .catch(err => {
       console.log("error:", err);
     });





    axios
      .get(Host + "items", {
        headers: {
          Authorization: cookies.get("token"),
          Accept: "application/json"
        }
      })
      .then(res => {
        this.setState({
          data1: res.data.data
        });
        // console.log("data1", this.state.data1);
        let arr = [];
        for (let index = 0; index < this.state.data1.length; index++) {
          let obj = {
            code: this.state.data1[index].code,
            cat_id: this.state.data1[index].cat.name,
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
                  codes: res.data.data[index].code,
                  cats:res.data.data[index].cat.id,
                  selectvlaue:'',
                  spin:false
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
                        setState({ spin: true });
                        // this.edit(this.state.data1[index].id);
                         var headers = {
                           Authorization: cookies.get("token")
                         };
                         axios({
                           url: Host + `items/${this.state.data1[index].id}`,
                           method: "PUT",
                           headers: headers,
                           data: {
                             code: state.codes,
                             cat_id:state.cats
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
                        <div id="new_itemnav"> تعديل المادة </div>
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
                              رمز المادة
                            </div>
                            <div style={{ width: "80%", textAlign: "center" }}>
                              <input
                                type="text"
                                id="field2"
                                value={state.codes}
                                onChange={e => {
                                  setState({ codes: e.target.value });
                                 
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
                              الصنف
                            </div>

                            <div style={{ width: "80%", textAlign: "center" }}>
                              <Select
                                id="field2"
                             defaultValue={state.selectvlaue}
                                   onChange={e => {
                                  setState({ cats: e.value });
                                }}
                                
                                value={selectedOption}
                                styles={customStyles}
                                options={this.state.catss}
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

                    <div onClick={() => {

                
    
                  let getIndex=this.state.catss.findIndex((element) => element.label === res.data.data[index].cat.name);

                      setState({selectvlaue:this.state.catss[getIndex]})
                      console.log(res.data.data[index].code);
                      setState({codes:res.data.data[index].code})

                      
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
          data: arr,
          check: "login"
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
      url: Host + `items/${id}`,
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
      { name: " الصنف ", field: "cat_id" },
      { name: "رمز المادة ", field: "code" }
    ];

    const options = {
      selectableRows: false,
      print: false,
      rowCursorHand: false,
      sort: false,
      responsive: "scroll",
      filter: false,
      download:false,
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
                           <Component initialState={{ isShown: false,spin:false,errors:false }}>
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
                       toast.error( `  رمز المادة المدخل قصير ` )
                      );   
                  }
              else if (state.errors===false) {
                                    setState({ spin: true });
                                     let formData = new FormData();
    var headers = {
      Accept: "application/json",
      Authorization: cookies.get("token")
    };
    formData.append("code", this.state.code);
    formData.append("cat_id", this.state.cat_id);
    axios({
      url: Host + `items`,
      method: "POST",
      data: formData,
      headers: headers
    })
      .then(response => {
        toast.success("تمت الاضافة بنجاح");
       setState({ isShown: false });
        setState({ spin: false });
        this.componentDidMount();
      })
      .catch(function(error) {
        if (error.response) {
          setState({ spin: false });
          console.log(error.response.data.error);

          toast.error("تأكد من ادخال المعلومات");
        }
      });
                                   }}}
                                 >
                                   <div>
                                     <div id="new_itemnav">
                                    اضافة مادة جديدة{" "}
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
                                           {" "}
                                           رمز المادة{" "}
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
                                             placeholder=" رمز المادة "
                                             value={this.state.code}
                                             onChange={(e) =>{
                                               this.setState({code: e.target.value })
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
                                           صنف{" "}
                                         </div>

                                         <div
                                           style={{
                                             width: "80%",
                                             textAlign: "center"
                                           }}
                                         >
                                           <Select
                                             id="field2"
                                             placeholder=" الصنف "
                                             onChange={e => {
                                               this.setState({
                                                 cat_id: e.value
                                               });
                                             }}
                                             value={selectedOption}
                                             styles={customStyles}
                                             options={this.state.catss}
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

export default Material;