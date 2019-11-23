import React ,{Component}from 'react';
import { Link ,NavLink} from 'react-router-dom'
import StoresTable from '../Table/StoresTable';
import NewStores from '../common/NewStores';


class Stores extends Component{
    render(){
        return(
           <div id='main_sec'  >

              <div id='main_row' >

                     <div style={{width:'100%'}}>
                    
                    <NewStores />
                  
                 </div>



                <div style={{width:'100%'}} id='rightdiv' > 
                

                    <NavLink  to='/Stores'   activeClassName='active'>  
                      <div id='sect1'>
                        المخازن
                    </div>    
                       </NavLink>
                       </div>
                </div>



<StoresTable />

            </div>
        );
    }
}

export default Stores;