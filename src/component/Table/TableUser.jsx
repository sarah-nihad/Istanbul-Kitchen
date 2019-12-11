import React from "react";
import ReactDOM from "react-dom";
import MaterialDatatable from "material-datatable";
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import EditUser from '../common/EditUser';
import EditPass from '../common/EditPass';
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
class TableUser extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      verified: '',
      data: [],
      data5: [],
      uss: [],
      check:''
    };
  }

   getMuiTheme = () => createMuiTheme({
    overrides: {
     MuiPaper: {
        elevation4: {
          width: "90%",
         
        }
      }
    },

  })
  

  componentDidMount(){

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
        check:'login',
      });
      // console.log(this.state.uss);
        let arr = [];
        for (let index = 0; index < this.state.uss.length; index++) {
          let obj = {
            name: this.state.uss[index].name,
            depa: this.state.uss[index].dept.name,
            lece: this.state.uss[index].role.name,
            pass: <EditPass ids={this.state.uss[index].id}  />,
            status:
              this.state.uss[index].status == 1 ? (
                <DoneIcon style={{ color: "#5bb061", fontSize: 30,cursor:'pointer' }} onClick={()=>{this.done(this.state.uss[index].id)}}  />
              ) : (
                <CloseIcon
                  style={{ color: "rgb(169, 16, 16)", fontSize: 30,cursor:'pointer' }} onClick={()=>{this.block(this.state.uss[index].id)}} />
              ),

            delete: <i className="far fa-trash-alt" id="del" onClick={()=>{this.delete(this.state.uss[index].id) }}></i>,
            edit: <EditUser   ids={this.state.uss[index].id} />
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
        check:'notlogin',
      });
    }); 
  }

    done(id){
     var headers = {
       Authorization: cookies.get("token")
     };
     axios({
       url: Host + `auth/block/${id}`,
       method: "PUT",
       headers: headers,
       data:{
       status:'0',
    
       },
     })
         .then(response => {
           toast.success("تم حظر المستخدم");
         this.componentDidMount();
         
         })
         .catch(function(error) {
           if (error.response.data.Error) {
             toast.error(error.response.data.Error);
           }
         });
}


 block(id){
     var headers = {
       Authorization: cookies.get("token")
     };
     axios({
       url: Host + `auth/block/${id}`,
       method: "PUT",
       headers: headers,
       data:{
       status:'1',
    
       },
     })
         .then(response => {
           toast.success("تم تفعيل المستخدم");
         this.componentDidMount();
         
         })
         .catch(function(error) {
           if (error.response.data.Error) {
             toast.error(error.response.data.Error);
           }
         });
}

delete(id){
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
        { name: "الحالة", field: "status" },
     { name: " كلمة المرور", field: "pass" },
     { name: " الصلاحية ", field: "lece" },
     { name: " القسم ", field: "depa" },
     { name: " اسم المستخدم ", field: "name" },
    
    ];

  
  const options = {
    selectableRows:false,
   print:false,
     responsive:'scroll',
   rowCursorHand:false,
   sort:false,
   filter:false,
   textLabels: {
    body: {
      noMatch: " لم يتم العثور على سجلات مطابقة",
      toolTip: "فرز",
    },
    pagination: {
      next: "الصفحة التالية",
      previous: "الصفحة السابقة",
      rowsPerPage: "عدد الصفوف",
      displayRows: "من",
    },
    toolbar: {
      search: "بحث",
      downloadCsv: "تنزيل",
      print: "Print",
      viewColumns: " التحكم بالاعمدة",
      filterTable: "فلتر",
    },
    filter: {
      all: "الكل",
      title: "فلتر",
      reset: "إعادة تعيين",
    },
    viewColumns: {
      title: "عرض الأعمدة",
      titleAria: "إظهار / إخفاء أعمدة الجدول",
    },

  }

}

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


export default TableUser ;