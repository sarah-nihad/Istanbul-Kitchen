import React, { Component } from 'react';
import { Link ,NavLink} from 'react-router-dom'
import AddStore from '../common/AddStore';
import TableStore from '../Table/TableStore';

class Store extends Component {
    render() {
        return (
            <div id='main_sec'  >

                <div id='main_row' >

                     <div style={{width:'100%'}}>
                    
                    <AddStore />
                  
                 </div>



                <div style={{width:'100%'}} id='rightdiv' > 

   <NavLink  to='/Store'  activeClassName='active'>  
                      <div id='sect1'>
                        المخزون
                    </div>    
                       </NavLink>

                    <NavLink  to='/Material'   activeClassName='active'> 
                     <div id='sect1'>
                        المواد فقط
                    </div>
                    </NavLink>

                    <NavLink  to='/Section'   activeClassName='active'>  
                      <div id='sect1'>
                        الاصناف
                    </div>    
                       </NavLink>
                       </div>
                </div>

<TableStore />

            </div>
        );
    }
}

export default Store;