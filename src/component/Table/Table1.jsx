
import React from "react";
import ReactDOM from "react-dom";
import MaterialDatatable from "material-datatable";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import EditSection from "../common/EditSection";
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../assets/js/Host";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const cookies = new Cookies();
class Table1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      uss: [],
      data1: [],
      ids: ''
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
      .get(Host + "cats", {
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
            name: this.state.data1[index].name,
            items_count: this.state.data1[index].items_count,
            delete: <i className="far fa-trash-alt" id="del"></i>,

            edit: <EditSection id={this.state.data1[index].id} name="ss" />
          };
          arr.push(obj);
        }
        this.setState({
          data: arr
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
      <MuiThemeProvider theme={this.getMuiTheme()}>
        <MaterialDatatable
          data={this.state.data}
          columns={columns}
          options={options}
          bordered
          striped
        />
      </MuiThemeProvider>
    );
  }
}

// ReactDOM.render(<Table1 />, document.getElementById("root"));
export default Table1 ;





