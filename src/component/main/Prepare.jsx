import React from 'react';
import { Link ,NavLink} from 'react-router-dom'
import Mod2 from '../common/Mod2';
import Table2 from '../Table/Table2';
import {Row,Col} from 'react-bootstrap';
import CloseIcon from '@material-ui/icons/Close';
import ReactDOM from "react-dom";
import MaterialDatatable from "material-datatable";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class Prepare extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
 data:[],
  data2:[],
 type:'',
 num:'',
 material:'',
 number:22
    }


  }

add(){

   this.state.data.push( 
{
  'type':this.state.type,
  'num':this.state.num,
  'material':this.state.material,
},
       
   )

  console.log(this.state.data);
  this.componentDidMount()
}



  componentDidMount() {
this.setState({
  data2:this.state.data
})
 console.log(this.state.data2);
  }



del(index){
   this.state.data2.splice(index,1);
  this.setState({
    data:this.state.data2
  })
   this.componentDidMount()
}

   getMuiTheme = () => createMuiTheme({
    overrides: {
     MuiPaper: {
        elevation4: {
          width: "90%",
         
        }
      }
    },

  })

    render() {
        return (
            <div id='main_sec'  >
<ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar
newestOnTop
closeOnClick
rtl
pauseOnVisibilityChange
draggable
pauseOnHover
/>
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

                <Row style={{marginRight:0,width:'90%'}}  id='row_prep' >
                <Col xs={12} lg={3}  >
       
                </Col>

                  <Col xs={12} lg={5}  >
                           <div>
                     
</div>


    
<div>

{this.state.data2.map(p => (

<div id='noti_first'>
<div id='noti_titil' >
<div id='not_text' >  الصنف : <span> {p.type}  </span>   </div>
<div>  <CloseIcon style={{color:'red'}}  onClick={()=> {this.del()}} />  </div>
</div>
<div className='noti_body'>
<div id='noti_body'>
اقتربت المادة للنفاذ من المخزن
العدد المتبقي هو
</div>
</div>

<div style={{padding:10,fontSize:15}} > 2018-7-7 10:05  </div>

</div>

  ))}

</div>



 
   
 
                </Col>

                  <Col xs={12} lg={4}  id='col_first'  >

                 <div id='div_kitch' > 
                 
                 <div id='kitch_sid' >  رقم المطبخ   </div>
                      <select  id='kitchen_field' >
              <option value='1'>-</option>
                 <option value='1'>1</option>
              </select>  </div>
          
               
               <p style={{fontSize:'20px',fontWeight:'600',color:'gray'}} > الاضافات </p>


        <div id='div_kitch' > 
          <div id='kitch_sid' >  الاصناف      </div>
           <select  id='kitchen_field' value={this.state.type} onChange={(e)=> {
             this.setState({type:e.target.value})
           }} >
              <option >-</option>
                 <option >يدات</option>
                   <option >براغي</option>
                     <option >22</option>
              </select>  </div>
               
                <div id='div_kitch' > 
                  <div id='kitch_sid' >  المواد     </div>
                    <select  id='kitchen_field'  value={this.state.material} onChange={(e) =>{
                      this.setState({material:e.target.value})
                    } }  >
              <option value='-'>-</option>
                 <option value='1'>1</option>
                  <option value='2'>2</option>
                   <option value='3'>3</option>
              </select>  </div>


                 <div id='div_kitch' > 
                   <div id='kitch_sid' >   الكمية  </div>
                    <input type='text' id='kitchen_field' placeholder=' الكمية '
                     value={this.state.num} onChange={(e) => {
                                      this.setState({ num: e.target.value })
                                           if (e.target.value > this.state.number) {
                                                
                                                         toast.error('sss')
                                                    }
                                    }} />  </div>
               
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