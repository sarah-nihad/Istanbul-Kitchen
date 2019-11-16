import React, { Component } from 'react';
import { Link ,NavLink} from 'react-router-dom'
import Mod2 from '../common/Mod2';
import Table2 from '../Table/Table2';
import {Row,Col} from 'react-bootstrap';




class Prepare extends Component {
    render() {
        
        return (
            <div id='main_sec'  >

                <div id='main_row' >

                     <div style={{width:'100%'}}>
                    
               
                  
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

                <Row style={{marginRight:0,width:'90%'}} >
                <Col xs={12} lg={3}  >

                </Col>

                  <Col xs={12} lg={5}  >

                </Col>

                  <Col xs={12} lg={4}  id='col_first'  >

                 <div id='div_kitch' >  رقم المطبخ       <select  id='kitchen_field' >
              <option value='1'>-</option>
                 <option value='1'>1</option>
              </select>  </div>
          
               
               <p style={{fontSize:'20px',fontWeight:'600',color:'gray'}} > الاضافات </p>
  <div id='div_kitch' >  رقم المطبخ  <input type='text' id='kitchen_field' placeholder='رقم المطبخ'  />  </div>

        <div id='div_kitch' >  الاصناف       <select  id='kitchen_field' >
              <option value='1'>-</option>
                 <option value='1'>1</option>
              </select>  </div>
               
                <div id='div_kitch' >  المواد       <select  id='kitchen_field' >
              <option value='1'>-</option>
                 <option value='1'>1</option>
              </select>  </div>


                 <div id='div_kitch' >   الكمية   <input type='text' id='kitchen_field' placeholder=' الكمية '  />  </div>
               
               <div id='kitchen_botn'  >

              
               <div id='done'  >  تم </div>
                <div   id='add'  onClick={()=> {this.add()}}  >  اضافة </div>
               </div>

               
                </Col>

                </Row>






            </div>
        );
    }
}

export default Prepare;