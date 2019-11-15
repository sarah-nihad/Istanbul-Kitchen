import React from 'react';
import { MDBDataTable } from 'mdbreact';
import EditSection from "../common/EditSection";
const DatatablePage = () => {



  const data = {
    columns: [
      {
        label: ' حذف',
        field: 'name',
        sort: 'asc',
       
      },
      {
        label: 'تعديل',
        field: 'position',
        sort: 'asc',
      
      },
      {
        label: 'اسم القسم',
        field: 'office',
        sort: 'asc',
     
      },
 
    ],
  
    rows: [
      {
        name: <i class="far fa-trash-alt" id='del' ></i>,
        position: <EditSection />,
        office: 'Edinburgh',
     
      },
         {
        name: <i class="far fa-trash-alt" id='del' ></i>,
        position: <i class="fas fa-edit" id='edit' ></i>,
        office: 'Edinburgh',
     
      },
         {
        name: <i class="far fa-trash-alt" id='del' ></i>,
        position: <i class="fas fa-edit" id='edit' ></i>,
        office: 'Edinburgh',
     
      },
         {
        name: <i class="far fa-trash-alt" id='del' ></i>,
        position: <i class="fas fa-edit" id='edit' ></i>,
        office: 'Edinburgh',
     
      },
         {
        name: <i class="far fa-trash-alt" id='del' ></i>,
        position: <i class="fas fa-edit" id='edit' ></i>,
        office: 'Edinburgh',
     
      },
    
     
    
    ],
  
   
 
  };
 


  return (
    <MDBDataTable
  
    bordered
    data={data}



    />
  );
}

export default DatatablePage;






// import React from "react";
// import ReactDOM from "react-dom";
// import MaterialDatatable from "material-datatable";
// import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
// class Table1 extends React.Component {
//    getMuiTheme = () => createMuiTheme({
//     overrides: {
//      MuiPaper: {
//         elevation4: {
//           width: "90%",
         
//         }
//       }
//     },

//   })
//   render() {
    
//     const columns = [
     
//       { name: "حذف", field: "title" },
//       { name: "تعديل", field: "location" },
//        { name: "اسم القسم", field: "name", },
    

//     ];

//     const data = [
//       {
//         name: "Name 1",
//         title: <i class="far fa-trash-alt" id='del' ></i>,
//         location:<i class="fas fa-edit" id='edit' ></i>,
      
//       },
//       {
//         name: "Name 2",
//         title: <i class="far fa-trash-alt" id='del' ></i>,
//         location: <i class="fas fa-edit" id='edit' ></i>,
      
//       }
//     ];

//   const options = {
//     selectableRows:false,
//    print:false,
//    rowCursorHand:false,
//    sort:false,
//    filter:false,
//    textLabels: {
//     body: {
//       noMatch: "آسف ، لم يتم العثور على سجلات مطابقة",
//       toolTip: "فرز",
//     },
//     pagination: {
//       next: "الصفحة التالية",
//       previous: "الصفحة السابقة",
//       rowsPerPage: "عدد الصفوف",
//       displayRows: "من",
//     },
//     toolbar: {
//       search: "بحث",
//       downloadCsv: "تنزيل",
//       print: "Print",
//       viewColumns: " التحكم بالاعمدة",
//       filterTable: "فلتر",
//     },
//     filter: {
//       all: "الكل",
//       title: "فلتر",
//       reset: "إعادة تعيين",
//     },
//     viewColumns: {
//       title: "عرض الأعمدة",
//       titleAria: "إظهار / إخفاء أعمدة الجدول",
//     },

//   }

// }

//     return (
//      <MuiThemeProvider theme={this.getMuiTheme()}>
//         <MaterialDatatable 
     
//          data={data} columns={columns} options={options}  bordered striped  />
//       </MuiThemeProvider>
//     );
//   }
// }

// ReactDOM.render(<Table1 />, document.getElementById("root"));
// export default Table1 ;





