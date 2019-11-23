import React,{Component} from 'react';
import { Row,Col} from 'react-bootstrap';
import { Link ,NavLink} from 'react-router-dom';
class User extends Component{

    render(){
        return(
            <div id='cuthome' >
           
               <Row style={{marginRight:0,width:'100%'}} id='row_dashnon'  >
                    <div id='col_dash'  >
                    <NavLink to='/User' activeClassName='is'  >
                    <div className='card'>
                        <div className='card-body'>
                            <div className='search-type-arrow' id='search' > </div>
                            <div className='d-flex flex-row'>
                                <div className='col-3 align-self-center'>
                                    <div className='round'>
                                        <i className='fas fa-user-plus'></i>
                                    </div>
                                </div>
                                <div className='col-9 text-center align-self-center'>
                                    <div className='m-l-10 '>
                                        <h5 className='mt-0'>562</h5>
                                        <p className='mb-0'>المستخدمين</p>
                                    </div>
                                </div>
                            
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
                        <div className='card-body'>
                            <div className='search-type-arrow' id='search' > </div>
                            <div className='d-flex flex-row'>
                                <div className='col-3 align-self-center'>
                                    <div className='round'>
                                        <i className='fas fa-user-plus'></i>
                                    </div>
                                </div>
                                <div className='col-9 text-center align-self-center'>
                                    <div className='m-l-10 '>
                                        <h5 className='mt-0'>562</h5>
                                        <p className='mb-0'>الاقسام </p>
                                    </div>
                                </div>
                           
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
                        <div className='card-body'>
                            <div className='search-type-arrow' id='search' > </div>
                            <div className='d-flex flex-row'>
                                <div className='col-3 align-self-center'>
                                    <div className='round'>
                                        <i className='fas fa-user-plus'></i>
                                    </div>
                                </div>
                                <div className='col-9 text-center align-self-center'>
                                    <div className='m-l-10 '>
                                        <h5 className='mt-0'>562</h5>
                                        <p className='mb-0'>الاصناف </p>
                                    </div>
                                </div>
                              
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
                        <div className='card-body'>
                            <div className='search-type-arrow' id='search' > </div>
                            <div className='d-flex flex-row'>
                                <div className='col-3 align-self-center'>
                                    <div className='round'>
                                        <i className='fas fa-user-plus'></i>
                                    </div>
                                </div>
                                <div className='col-9 text-center align-self-center'>
                                    <div className='m-l-10 '>
                                        <h5 className='mt-0'>562</h5>
                                        <p className='mb-0'>المواد </p>
                                    </div>
                                </div>
                              
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
                    <NavLink to='/Ur' activeClassName='is-active'  >
                    <div className='card'>
                        <div className='card-body'>
                            <div className='search-type-arrow' id='search' > </div>
                            <div className='d-flex flex-row'>
                                <div className='col-3 align-self-center'>
                                    <div className='round'>
                                        <i className='fas fa-user-plus'></i>
                                    </div>
                                </div>
                                <div className='col-9 text-center align-self-center'>
                                    <div className='m-l-10 '>
                                        <h5 className='mt-0'>562</h5>
                                        <p className='mb-0'> المطابخ</p>
                                    </div>
                                </div>
                              
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
export default User;
