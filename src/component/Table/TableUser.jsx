import React from "react";
import ReactDOM from "react-dom";
import MaterialDatatable from "material-datatable";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import EditUser from '../common/EditUser';
import EditPass from '../common/EditPass';
class TableUser extends React.Component {
   getMuiTheme = () => createMuiTheme({
    overrides: {
     MuiPaper: {
        elevation4: {
          width: "90%",
         
        }
      }
    },

  })
  render() {
    
    const columns = [
     
      { name: "حذف", field: "delete" },
      { name: "تعديل", field: "edit" },
     { name: " كلمة المرور", field: "pass" },
     { name: " الصلاحية ", field: "lece" },
     { name: " القسم ", field: "depa" },
     { name: " اسم المستخدم ", field: "name" },
    
    ];

    const data = [
      {
        name: "Name 1",
          depa: "Name 1",
          lece: "Name 1",
           pass: <EditPass />,
        delete:<i class="far fa-trash-alt" id='del' ></i> ,
        edit:<EditUser />,
      
      },
      {
        name: "Name 2",
        depa: "Name 1",
          lece: "Name 1",
           pass: <EditPass />,
        delete: <i class="far fa-trash-alt" id='del' ></i>,
        edit:<EditUser />,
      
      }
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
      noMatch: "آسف ، لم يتم العثور على سجلات مطابقة",
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
         data={data} columns={columns} options={options} />
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<TableUser />, document.getElementById("root"));
export default TableUser ;