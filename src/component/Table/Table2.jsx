import React from "react";
import ReactDOM from "react-dom";
import MaterialDatatable from "material-datatable";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import EditMat from '../common/EditMat';
class Table2 extends React.Component {
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
     { name: "  قيمة الاشعار", field: "value" },
     { name: " الصنف ", field: "type" },
     { name: " العدد المتوفر ", field: "number" },
     { name: "رمز المادة ", field: "name" },
    
    ];

    const data = [
      {
        name: "Name 1",
          number: "Name 1",
          type: "Name 1",
           value: "Name 1",
        delete: <i class="far fa-trash-alt" id='del' ></i>,
        edit:<EditMat />,
      
      },
      {
        name: "Name 2",
            number: "Name 1",
          type: "Name 1",
           value: "Name 1",
        delete: <i class="far fa-trash-alt" id='del' ></i>,
        edit: <EditMat />,
      
      }
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
         data={data} columns={columns} options={options} />
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<Table2 />, document.getElementById("root"));
export default Table2 ;