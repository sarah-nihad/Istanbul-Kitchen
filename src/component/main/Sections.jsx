import React, { Component } from 'react';
import { Link ,NavLink} from 'react-router-dom'
import Table1 from '../Table/Table1';
import Mod1 from '../common/Mod1';

class Section extends Component {
    render() {
        return (
            <div id='main_sec'  >

              <div id='main_row' >

                     <div style={{width:'100%'}}>
                    
                    <Mod1 />
                  
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



<Table1 />

            </div>
        );
    }
}

export default Section;