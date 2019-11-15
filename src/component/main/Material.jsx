import React, { Component } from 'react';
import { Link ,NavLink} from 'react-router-dom'
import Mod2 from '../common/Mod2';
import Table2 from '../Table/Table2';

class Material extends Component {
    render() {
        return (
            <div id='main_sec'  >

                <div id='main_row' >

                     <div style={{width:'100%'}}>
                    
                    <Mod2 />
                  
                 </div>



                <div style={{width:'100%'}} id='rightdiv' > 
                    <NavLink  to='/Material'   activeClassName='active'> 
                     <div id='sect1'>
                        المواد
                    </div>
                    </NavLink>

                    <NavLink  to='/Section'   activeClassName='active'>  
                      <div id='sect1'>
                        الاقسام
                    </div>    
                       </NavLink>
                       </div>
                </div>

<Table2 />

            </div>
        );
    }
}

export default Material;