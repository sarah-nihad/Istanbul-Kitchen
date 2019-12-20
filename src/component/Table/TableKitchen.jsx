import React from "react";
import MaterialDatatable from "material-datatable";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import EditKitchen from '../common/EditKitchen';
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../assets/js/Host";
import { Redirect} from 'react-router-dom';
import Lottie from 'lottie-react-web';
import animation from '../../assets/js/animation.json';
import Context from '../../assets/js/context';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const cookies = new Cookies();
class TableKitchen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      uss: [],
      data1: [],
      ids: "",
      check:''
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
            edit: <EditKitchen id={this.state.data1[index].id} name="ss" />
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


export default TableKitchen ;