import React from 'react';
import { MDBDataTable } from 'mdbreact';

const DatatablePage = () => {
  const data = {
    columns: [
      {
        label: ' حذف',
        field: 'name',
        sort: 'asc',
        width: 650
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
        width: 200
      },
 
    ],
  
    rows: [
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
         {
        name: <i class="far fa-trash-alt" id='del' ></i>,
        position: <i class="fas fa-edit" id='edit' ></i>,
        office: 'Edinburgh',
     
      },
    
     
    
    ]
 
  };

  return (
    <MDBDataTable
    // striped
    bordered
    data={data}



    />
  );
}

export default DatatablePage;