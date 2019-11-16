import React ,{Component}from 'react';
import { Link ,NavLink} from 'react-router-dom'
import TableUser from '../Table/TableUser';
import ModUser from '../common/ModUser';


class Users extends Component{
    render(){
        return(
           <div id='main_sec'  >

              <div id='main_row' >

                     <div style={{width:'100%'}}>
                    
                    <ModUser />
                  
                 </div>



                <div style={{width:'100%'}} id='rightdiv' > 
                

                    <NavLink  to='/Users'   activeClassName='active'>  
                      <div id='sect1'>
                        المستخدمين
                    </div>    
                       </NavLink>
                       </div>
                </div>



<TableUser />

            </div>
        );
    }
}

export default Users;