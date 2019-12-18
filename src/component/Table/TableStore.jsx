import React from "react";
import ReactDOM from "react-dom";
import MaterialDatatable from "material-datatable";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import EditStore from '../common/EditStore';
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../assets/js/Host";
 import { Pane, Dialog, Button } from "evergreen-ui";
 import Component from "@reactions/component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Redirect} from 'react-router-dom';
import Lottie from 'lottie-react-web';
import animation from '../../assets/js/animation.json';
import Context from '../../assets/js/context';
import Select from "react-select";
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



class TableStore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      uss: [],
      data1: [],
      num: "",
      check: ""
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
    // console.log('vv',headers.Authorization);

    axios({
      url: Host + `inventories/${id}`,
      method: "PUT",
      headers: headers,
      data: {
        item_id: this.state.item_id,
        store_id: this.state.store_id,
        count: this.state.count,
        trigger_value: this.state.trigger_value
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
          data: res.data
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
                        this.edit(this.state.data[index].id);
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
                                  this.setState({
                                    trigger_value: e.target.value
                                  });
                                }}
                              />
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
      filter: false,
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
          } else if (this.state.check === "login") {
            return (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center"
                }}
              >
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

                <MuiThemeProvider theme={this.getMuiTheme()}>
                  <MaterialDatatable
                    data={this.state.data1}
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


export default TableStore ;