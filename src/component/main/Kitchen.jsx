import React from 'react';
 import { Pane, Dialog} from "evergreen-ui";
 import Component from "@reactions/component";
import {NavLink} from 'react-router-dom'
import MaterialDatatable from "material-datatable";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../assets/js/Host";
import { Redirect } from "react-router-dom";
import Lottie from "lottie-react-web";
import VisibilityIcon from "@material-ui/icons/Visibility";
import animation from "../../assets/js/animation.json";
import loding from "../../assets/js/loding.json";
import Context from "../../assets/js/context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const cookies = new Cookies();
class Kitchen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      uss: [],
      data1: [],
      ids: "",
      check: "",
      kitID: "",
      kitID3: "",
      errors:false
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
    formData.append("kitID", this.state.kitID3);

    axios({
      url: Host + `kmos`,
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
      url: Host + `kmos/${id}`,
      method: "PUT",
      headers: headers,
      data: {
        kitID: this.state.kitID
      }
    })
      .then(response => {
        toast.success("تم تعديل المعلومات بنجاح");
       this.componentDidMount();
      })
      .catch(function(error) {
        if (error.response.data.error) {
          toast.error(error.response.data.error);
        }
      });
  }

  componentDidMount() {
    axios
      .get(Host + "kmos", {
        headers: {
          Authorization: cookies.get("token"),
          Accept: "application/json"
        }
      })
      .then(res => {
        this.setState({
          data1: res.data,
          check: "login"
        });
        console.log("kitchen", this.state.data1);
        let arr = [];
        for (let index = 0; index < this.state.data1.length; index++) {
          let obj = {
            kitID: this.state.data1[index].kitID,
            kittrans_count: this.state.data1[index].kittrans_count,
            user: this.state.data1[index].user.name,
            delete: (
              <i
                className="far fa-trash-alt"
                id="del"
                onClick={() => {
                  this.delete(this.state.data1[index].id);
                }}
              ></i>
            ),
            detiels: (
              <VisibilityIcon
                style={{ cursor: "pointer" }}
                onClick={() => {
                  window.location.href = `/Detiels/?id=${this.state.data1[index].id}`;
                }}
              />
            ),
            edit: (
              <Component
                initialState={{
                  isShown: false,
                  kitIDs: res.data[index].kitID,
                  spin: false
                }}
              >
                {({ state, setState }) => (
                  <Pane>
                    <Dialog
                      isShown={state.isShown}
                      onCloseComplete={() =>
                        setState({ isShown: false, kitID: "" })
                      }
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
                          url: Host + `kmos/${this.state.data1[index].id}`,
                          method: "PUT",
                          headers: headers,
                          data: {
                            kitID: state.kitIDs
                          }
                        })
                          .then(response => {
                            toast.success("تم تعديل المعلومات بنجاح");
                            this.componentDidMount();
                            setState({ spin: false });
                            setState({ isShown: false });
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
                        <div id="new_itemnav"> تعديل المطبخ </div>
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
                            <div style={{ width: "30%" }}> رقم المطبخ </div>
                            <div style={{ width: "80%", textAlign: "center" }}>
                              <input
                                type="text"
                                id="field2"
                                placeholder="  رقم المطبخ"
                                value={state.kitIDs}
                                onChange={e =>
                                  setState({ kitIDs: e.target.value })
                                }
                              />
                            </div>
                          </div>

                          {state.spin ? (
                            <div
                              style={{
                                width: "100%",
                                position: "absolute",
                              }}>
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
          data: arr
        });
      })
      .catch(err => {
        console.log("error:", err);
        this.setState({check: "notlogin"});
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
      url: Host + `kmos/${id}`,
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
        console.log("eroor", err.response.data.error.error);
      });
  }

  render() {
    const columns = [
      { name: "حذف", field: "delete" },
      { name: "تعديل", field: "edit" },
      { name: "تفاصيل المطبخ", field: "detiels" },
      { name: "  المستخدم", field: "user" },
      { name: " عدد القطع الكلية ", field: "kittrans_count" },

      { name: "  رقم المطبخ ", field: "kitID" }
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
          noMatch: "آسف ، لم يتم العثور على سجلات مطابقة",
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
          } else if (this.state.check === "login") {
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
                    {cookies.get("role") === "Checker" ? null : (
                      <Component initialState={{ isShown: false, spin: false }}>
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
                                setState({ spin: true });
                                if (this.state.errors === true) {
                                  return toast.error(`تأكد من ادخال المعلومات`);
                                } else if (this.state.errors === false) {
                                  let formData = new FormData();
                                  var headers = {
                                    Accept: "application/json",
                                    Authorization: cookies.get("token")
                                  };
                                  formData.append("kitID", this.state.kitID3);

                                  axios({
                                    url: Host + `kmos`,
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

                                        toast.error(
                                          " رقم المطبخ موجود, قم بأدخال رقم اخر"
                                        );
                                      }
                                    });
                                }
                              }}
                            >
                              <div>
                                <div id="new_itemnav"> انشاء مطبخ جديد </div>
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
                                      رقم المطبخ{" "}
                                    </div>
                                    <div
                                      style={{
                                        width: "80%",
                                        textAlign: "center",
                                        position: "relative"
                                      }}
                                    >
                                      <input
                                        type="text"
                                        id="field2"
                                        placeholder="  رقم المطبخ"
                                        value={this.state.kitID3}
                                        onChange={e => {
                                          this.setState({
                                            kitID3: e.target.value
                                          });
                                          if (e.target.value.length < 1) {
                                            this.setState({
                                              errors: true
                                            });
                                          } else {
                                            this.setState({
                                              errors: false
                                            });
                                          }
                                        }}
                                      />
                                      {state.spin ? (
                                        <div
                                          style={{
                                            width: "100%",
                                            position: "absolute",
                                            top: "-30px"
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
                    )}
                  </div>

                  <div style={{ width: "100%" }} id="rightdiv">
                    <NavLink to="/Prepare" activeClassName="active">
                      <div id="sect1">التجهيز</div>
                    </NavLink>

                    <NavLink to="/Kitchen" activeClassName="active">
                      <div id="sect1">المطابخ</div>
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

export default Kitchen;