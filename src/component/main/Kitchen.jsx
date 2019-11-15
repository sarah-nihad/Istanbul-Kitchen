import React, { Component } from 'react';
import { Link ,NavLink} from 'react-router-dom'
import AddKitchen from '../common/AddKitchen';
import TableKitchen from '../Table/TableKitchen';

class Kitchen extends Component {
    render() {
        return (
            
            <div id='main_sec'  >

                <div id='main_row' >

                     <div style={{width:'100%'}}>
                    
                    <AddKitchen />
                  
                 </div>



                <div style={{width:'100%'}} id='rightdiv' > 
                    <NavLink  to='/Prepare'   activeClassName='active'> 
                     <div id='sect1'>
                        التجهيز
                    </div>
                    </NavLink>

                    <NavLink  to='/Kitchen'  activeClassName='active'>  
                      <div id='sect1'>
                        المطابخ
                    </div>    
                       </NavLink>
                       </div>
                </div>

<TableKitchen />

            </div>
        );
    }
}

export default Kitchen;