import React, { Component } from 'react';
import { Link ,NavLink} from 'react-router-dom'
import Mod2 from '../common/Mod2';
import Table2 from '../Table/Table2';

class Prepare extends Component {
    render() {
        return (
            <div id='main_sec'  >

                <div id='main_row' >

                     <div style={{width:'100%'}}>
                    
                    <Mod2 />
                  
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

<Table2 />

            </div>
        );
    }
}

export default Prepare;