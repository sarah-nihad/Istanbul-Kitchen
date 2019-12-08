
import React from "react";
import ReactDOM from "react-dom";
import MaterialDatatable from "material-datatable";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import StoresEdit from '../common/StoresEdit';
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../assets/js/Host";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const cookies = new Cookies();
class StoresTable extends React.Component {

 constructor(props) {
    super(props);
    this.state = {
 data:[],
 uss:[],
  data1:[],
  ids:''
    }}


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
      .get(Host + "stores", {
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
             name: this.state.data[index].name,
             location: this.state.data[index].location,

             delete: 
               <i
                 className="far fa-trash-alt"
                 id="del" onClick={()=>{this.delete(this.state.ids)}}
                 ids={this.state.data[index].id}
               ></i>
             ,
             edit: <StoresEdit id={this.state.data[index].id} name="ss" />
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

delete(){
 let formData = new FormData();
    var headers = {
      "Content-Type": "application/json",
      Authorization: cookies.get("token")
    };
  axios({
    url: Host + `stores/${this.state.ids}`,
    method: "DELETE",
    data: formData,
    headers: headers
  })
    .then(response => {
      // toaster.success("experence has been deleted successfully");
      this.componentDidMount();
      // window.location.reload();
    })
    .catch(function(error) {});
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
      <div>
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
  }
}

// ReactDOM.render(<StoresTable />,
//  document.getElementById("root"));
export default StoresTable ;

