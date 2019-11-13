import React, { Component } from 'react';
import { Link ,NavLink} from 'react-router-dom'
import Mod1 from '../common/Mod1';


class Material extends Component {
    render() {
        return (
            <div id='main_sec'  >

                <div id='main_row' >

                     <div style={{width:'100%'}}>
                    
                    <Mod1 />
                  
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



            </div>
        );
    }
}

export default Material;