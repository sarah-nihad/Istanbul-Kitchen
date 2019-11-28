import React ,{Component}from 'react';
import {Row,Col} from 'react-bootstrap';
import { Link ,NavLink} from 'react-router-dom';
import GroupIcon from '@material-ui/icons/Group';
import CategoryIcon from '@material-ui/icons/Category';
import LocalGroceryStoreSharpIcon from '@material-ui/icons/LocalGroceryStoreSharp';
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import ChangeHistoryOutlinedIcon from '@material-ui/icons/ChangeHistoryOutlined';
class Dashboard extends Component{
    render(){
        return(
            <div id='cuthome' >
           
              <Row style={{marginRight:0,width:'100%',display:'flex',justifyContent:'center'}} >
                    <div id='col_dash'  >
                    <NavLink to='/User' activeClassName='is'  >
                    <div className='card'>
                     <div className='round'>
                                      <GroupIcon />
                                    </div>
                        <div className='card-body'>
                            <div className='search-type-arrow' id='search' > </div>
                        
                                    <div className='m-l-10 '>
                                        <p className='mb-0'>المستخدمين</p>  
                                    </div>
                            
                            
                         
                           <div className='progress mt-3'>
                               <div className='progress-bar bg-danger' role='progressbar' aria-valuenow='15' aria-valuemin='0'
                               aria-valuemax='100'></div>
                           </div>
                        </div>

                    </div>
                    </NavLink>
                    
                    </div>

                    <div   id='col_dash' >
                    <NavLink to='/Card2' activeClassName='is-active'  >
                    <div className='card'>
                     <div className='round'>
                                        <i className='fas fa-user-plus'></i>
                                    </div>
                        <div className='card-body'>
                            <div className='search-type-arrow' id='search' > </div>
    
                                    <div className='m-l-10 '>
                                   
                                        <p className='mb-0'> الاقسام</p>
                                    </div>

                           <div className='progress mt-3'>
                               <div className='progress-bar bg-danger' role='progressbar' aria-valuenow='15' aria-valuemin='0'
                               aria-valuemax='100'></div>
                           </div>
                        </div>

                    </div>
                    </NavLink>
                    
                    </div>

                    <div  id='col_dash'  >
                    <NavLink to='/Card3' activeClassName='is-active'  >
                    <div className='card'>
                      <div className='round'>
                                        <CategoryIcon />
                                    </div>
                        <div className='card-body'>
                            <div className='search-type-arrow' id='search' > </div>
    
                                    <div className='m-l-10 '>
                                
                                        <p className='mb-0'>الاصناف </p>
                                    </div>
                           
                   
                           <div className='progress mt-3'>
                               <div className='progress-bar bg-danger' role='progressbar' aria-valuenow='15' aria-valuemin='0'
                               aria-valuemax='100'></div>
                           </div>
                        </div>

                    </div>
                    </NavLink>
                    
                    </div>


                      <div   id='col_dash' >
                    <NavLink to='/Card3' activeClassName='is-active'  >
                    <div className='card'>
                         <div className='round'>
                                        <ChangeHistoryOutlinedIcon />
                                    </div>
                        <div className='card-body'>
                            <div className='search-type-arrow' id='search' > </div>
        
                                    <div className='m-l-10 '>
                               
                                        <p className='mb-0'>المواد</p>
                                    </div>
                             
                           <div className='progress mt-3'>
                               <div className='progress-bar bg-danger' role='progressbar' aria-valuenow='15' aria-valuemin='0'
                               aria-valuemax='100'></div>
                           </div>
                        </div>

                    </div>
                    </NavLink>
                    
                    </div>
        <div   id='col_dash' >
                    <NavLink to='/Card3' activeClassName='is-active'  >
                    <div className='card'>
                         <div className='round'>
                                        <LocalGroceryStoreSharpIcon />
                                    </div>
                        <div className='card-body'>
                            <div className='search-type-arrow' id='search' > </div>
                        
                                
                                    <div className='m-l-10 '>
                                  
                                        <p className='mb-0'>المخازن</p>
                                    </div>
                             
                           <div className='progress mt-3'>
                               <div className='progress-bar bg-danger' role='progressbar' aria-valuenow='15' aria-valuemin='0'
                               aria-valuemax='100'></div>
                           </div>
                        </div>

                    </div>
                    </NavLink>
                    
                    </div>

                      <div  id='col_dash'  >
                    <NavLink to='/Usr' activeClassName='is-active'  >
                    <div className='card'>
                         <div className='round'>
                                        <StorefrontOutlinedIcon />
                                    </div>
                        <div className='card-body'>
                            <div className='search-type-arrow' id='search' > </div>
                         
                                    <div className='m-l-10 '>
                                  
                                        <p className='mb-0'>المطابخ </p>
                                    </div>
                             
                           <div className='progress mt-3'>
                               <div className='progress-bar bg-danger' role='progressbar' aria-valuenow='15' aria-valuemin='0'
                               aria-valuemax='100'></div>
                           </div>
                        </div>

                    </div>
                    </NavLink>
                    
                    </div>
                </Row>

            </div>
        );
    }
}

export default Dashboard;