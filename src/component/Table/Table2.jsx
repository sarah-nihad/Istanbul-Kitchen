import React from "react";
import ReactDOM from "react-dom";
import MaterialDatatable from "material-datatable";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import EditMat from '../common/EditMat';
class Table2 extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      data:[],
      data1:[
        {name:'sara',id:'1'},
         {name:'sara',id:'1'},
          {name:'sara',id:'1'},
      ],

    }
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
let arr=[];
for (let index = 0; index < this.state.data1.length; index++) {
 let obj={
   name:this.state.data1[index].name,
   type:this.state.data1[index].id,
  delete: <i className="far fa-trash-alt" id='del' ></i>,
  edit:<EditMat />,
 }
  arr.push(obj)
}
this.setState({
  data:arr
})
   }

  render() {


    const columns = [
     
      { name: "حذف", field: "delete" },
      { name: "تعديل", field: "edit" },
     { name: " الصنف ", field: "type" },
     { name: "رمز المادة ", field: "name" },
    
    ];

  
  const options = {
    selectableRows:false,
   print:false,
   rowCursorHand:false,
   sort:false,
   responsive:'scroll',
   filter:false,
   textLabels: {
    body: {
      noMatch: "  لم يتم العثور على سجلات مطابقة",
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
     <MuiThemeProvider theme={this.getMuiTheme()}>
        <MaterialDatatable 
        // title={"ACME Employee list"}
         data={this.state.data} columns={columns} options={options} />
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<Table2 />, document.getElementById("root"));
export default Table2 ;