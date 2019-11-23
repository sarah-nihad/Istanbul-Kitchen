import React from "react";
import ReactDOM from "react-dom";
import MaterialDatatable from "material-datatable";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import EditUser from '../common/EditUser';
import EditKitchen from '../common/EditKitchen';
class TableKitchen extends React.Component {
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
     { name: "  المستخدم", field: "user" },
     { name: " عدد القطع الكلية ", field: "num" },
    
     { name: "  رقم المطبخ ", field: "kitchen" },
    
    ];

    const data = [
      {
        kitchen: "Name 1",
     
          num: "Name 1",
           user: 'rr',
        delete:<i className="far fa-trash-alt" id='del' ></i> ,
        edit:<EditKitchen />,
      
      },
      {
        kitchen: "Name 1",
       
          num: "Name 1",
           user: 'sarah',
        delete:<i className="far fa-trash-alt" id='del' ></i> ,
        edit:<EditKitchen />,
      
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

ReactDOM.render(<TableKitchen />, document.getElementById("root"));
export default TableKitchen ;