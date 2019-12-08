import React from "react";
import ReactDOM from "react-dom";
import MaterialDatatable from "material-datatable";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import EditStore from '../common/EditStore';
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../assets/js/Host";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const cookies = new Cookies();
class TableStore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      uss: [],
      data1: [],
  
      name: "ssss",
      num: ""
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
        console.log("data1", this.state.data);
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
                  this.delete(this.state.ids);
                }}
                ids={this.state.data[index].id}
              ></i>
            ),
            edit: <EditStore id={this.state.data[index].id} name="ss" />
          };
          arr.push(obj);
        }
        this.setState({
          data1: arr
        });
      })
      .catch(err => {
        console.log("error:", err);
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
      // <div style={{width:'100%'}} >

      <MuiThemeProvider theme={this.getMuiTheme()}>
        <MaterialDatatable
       
          data={this.state.data1}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
      // </div>
    );
  }
}

// ReactDOM.render(<TableStore />, document.getElementById("root"));
export default TableStore ;