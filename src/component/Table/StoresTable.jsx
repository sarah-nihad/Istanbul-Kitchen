
import React from "react";
import ReactDOM from "react-dom";
import MaterialDatatable from "material-datatable";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import StoresEdit from '../common/StoresEdit';
class StoresTable extends React.Component {
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
     
      { name: "حذف", field: "title" },
      { name: "تعديل", field: "location" },
        { name: "  العنوان", field: "city", },
       { name: "اسم المخزن", field: "name", },
    

    ];

    const data = [
      {
        name: "Name 1",
         city: "baghdad",
        title: <i class="far fa-trash-alt" id='del' ></i>,
        location: <StoresEdit />,
      
      },
      {
        name: "Name 2",
         city: "babil",
        title: <i class="far fa-trash-alt" id='del' ></i>,
        location: <i class="fas fa-edit" id='edit' ></i>,
      
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
     
         data={data} columns={columns} options={options}  bordered striped  />
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<StoresTable />, document.getElementById("root"));
export default StoresTable ;

