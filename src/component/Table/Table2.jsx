import React from "react";
import ReactDOM from "react-dom";
import MaterialDatatable from "material-datatable";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import EditMat from '../common/EditMat';
import axios from "axios";
import Cookies from "universal-cookie";
import Host from "../../assets/js/Host";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Redirect} from 'react-router-dom';
import Lottie from 'lottie-react-web';
import animation from '../../assets/js/animation.json';
import Context from '../../assets/js/context';
const cookies = new Cookies();
class Table2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      uss: [],
      data1: [],
      ids: '',
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
            cat_id: this.state.data1[index].cat_id,
            delete: <i className="far fa-trash-alt" id="del" onClick={()=>{this.delete(this.state.data1[index].id) }} ></i>,

            edit: <EditMat id={this.state.data1[index].id} name="ss" />
          };
          arr.push(obj);
        }
        this.setState({
          data: arr,
           check:'login'
        });
      })
      .catch(err => {
        console.log("error:", err);
                 this.setState({
          check:'notlogin'
        });
      });
  }


delete(id){
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
    if (response.status === 202){
        toast.warning(' لا يمكنك الحذف  ')
    }
    else if(response.status === 200){
          this.componentDidMount();
      toast.success(' تم الحذف بنجاح ')
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
        <Context.Consumer>{ctx => {


        if (this.state.check==="notlogin") {
          return(
        <Redirect to="/"></Redirect>
          )
        }else if (this.state.check==="login") {
          return (
       <div style={{width:'100%',display:'flex',justifyContent:'center'}} >
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
          // title={"ACME Employee list"}
          data={this.state.data}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
       </div>
        )
        }else if (this.state.check==="") {
          return(
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}  >
   
   <Lottie
                 options={{
                   animationData: animation,
                 }}
                width={300}
                height={300}
               />
</div>
          )
        }
    
      }}

      </Context.Consumer>
    );
  }
}
export default Table2 ;